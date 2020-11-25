import * as React from 'react'

import { colorHex } from '@utils'
import './index.scss'

interface IProps {
	backgroundCtx: CanvasRenderingContext2D
	bounds: { x: number; y: number; width: number; height: number }
	mouseX: number
	mouseY: number
	scaleFactor: number
	onDraw: (args: ElectronShortcutCapture.IRect) => void
	setDestoryLayer: (destoryLayer: boolean) => void
}

interface IPixelBoxProps {
	x: number
	y: number
	rgb: string
}

const Layer: React.FC<IProps> = ({
	backgroundCtx,
	bounds,
	mouseX,
	mouseY,
	scaleFactor,
	onDraw,
	setDestoryLayer
}) => {
	// 是否开始框图
	const [startShortCut, setStartShortCut] = React.useState(false)
	// 框图起始点
	const [point, setPoint] = React.useState({ x: 0, y: 0 })
	const [pixelBoxProps, setPixelBoxProps] = React.useState<IPixelBoxProps>(
		null
	)
	const [hasBingHover, setHasBingHover] = React.useState(false)
	const refFocus = React.useRef<HTMLCanvasElement>(null)
	const refFocusImg = React.useRef<HTMLImageElement>(null)

	// 没移动鼠标时候，鼠标初始位置
	let defMouseX = mouseX
	let defMouseY = mouseY

	React.useEffect(() => {
		window.addEventListener('mouseup', mouseup)
	}, [])

	React.useEffect(() => {
		return () => {
			setStartShortCut(false)
			window.removeEventListener('mouseup', mouseup)
		}
	}, [])

	const layerRef = React.useRef<HTMLDivElement>(null)

	const mousedown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setPixelBoxProps(null)
		setPoint({ x: e.clientX, y: e.clientY })
		setStartShortCut(true)
		;(e.target as HTMLDivElement).style.background =
			'rgba(255, 255, 255, 0)'
	}
	const mousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		/**
		 * 刚打开的时候有可能回触发，这里根据鼠标初始位置判断是否继续执行
		 */
		if (defMouseX === e.clientX || defMouseY === e.clientY) {
			defMouseX = 0
			defMouseY = 0
			return
		}
		if (!hasBingHover) {
			setHasBingHover(true)
			layerRef.current.addEventListener('mouseenter', onHover)
		}

		if (startShortCut) {
			draw(e)
		} else {
			if (!backgroundCtx) {
				return
			}
			;(e.target as HTMLDivElement).style.background =
				'rgba(255, 255, 255, 0)'
			setPixelBoxProps({
				rgb: `(${backgroundCtx
					.getImageData(e.clientX, e.clientY, 1, 1)
					.data.join(',')})`,
				x: e.clientX,
				y: e.clientY
			})
			if (refFocus.current) {
				const ctx = refFocus.current.getContext('2d')
				// 放大五倍
				const x = e.clientX - 10 > 0 ? e.clientX - 10 : 0
				const y = e.clientY - 10 > 0 ? e.clientY - 10 : 0
				ctx.putImageData(
					backgroundCtx.getImageData(
						x * scaleFactor,
						y * scaleFactor,
						20,
						20
					),
					0,
					0,
					0,
					0,
					20,
					20
				)
				const url = refFocus.current.toDataURL('image/jpeg', 1.0)
				refFocusImg.current.src = url
			}
		}
	}
	// 框完图就销毁事件，不准再重复框，只能调整大小或者移动位置
	const mouseup = () => {
		setDestoryLayer(true)
	}
	const draw = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const { x, y } = point
		const x2 = e.clientX
		const y2 = e.clientY
		if (Math.abs(x2 - x) >= 7 && Math.abs(y2 - y) >= 7) {
			onDraw({ x1: x, y1: y, x2, y2 })
		}
	}
	const onHover = e => {
		if (startShortCut) {
			return false
		}
		e.target.style.background = 'rgba(255, 255, 255, 0)'
	}
	const onBlur = e => {
		setPixelBoxProps(null)
		if (
			startShortCut ||
			(e.clientX > 10 && e.clientX < bounds.width - 10)
		) {
			return false
		}
		e.target.style.background = 'rgba(0, 0, 0, 0.6)'
	}
	/**
	 * 放大镜
	 */
	const renderPixelBox = () => {
		if (!pixelBoxProps) {
			return null
		}
		const { x, y, rgb } = pixelBoxProps
		let left = x - 120 < 1 ? 20 : x - 120
		let top = y + 20 > bounds.height - 140 ? bounds.height - 160 : y + 20
		// 左下角位置
		if (bounds.height - y < 170 && x < 150) {
			top = y - 160
			left = x + 20
		}
		return (
			<div
				className="pixel-box"
				style={{
					left,
					top
				}}
			>
				<div className="focus">
					<canvas
						ref={refFocus}
						id="focus"
						style={{ display: 'none' }}
						width="20"
						height="20"
					></canvas>
					<img
						ref={refFocusImg}
						id="focus-img"
						width="100"
						height="100"
					/>
				</div>
				<div className="footer">
					<div className="position">
						坐标:
						<div>
							({Math.ceil(x * scaleFactor)},
							{Math.ceil(y * scaleFactor)})
						</div>
					</div>
					rgb:{colorHex(rgb.replace(',255)', ')'))}
				</div>
			</div>
		)
	}

	return (
		<div
			ref={layerRef}
			className={'layer'}
			onMouseDown={mousedown}
			onMouseMove={mousemove}
			onMouseOut={onBlur}
		>
			{renderPixelBox()}
		</div>
	)
}

export default Layer
