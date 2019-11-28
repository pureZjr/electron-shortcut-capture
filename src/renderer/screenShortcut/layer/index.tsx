import React from 'react'

import { colorHex } from '../utils'
import './index.scss'

interface IProps {
	backgroundCtx: CanvasRenderingContext2D
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
	onDraw,
	setDestoryLayer
}) => {
	const [isMoving, setIsMoving] = React.useState(false)
	const [startShortCut, setStartShortCut] = React.useState(false)
	// 框图起始点
	const [point, setPoint] = React.useState({ x: 0, y: 0 })
	const [pixelBoxProps, setPixelBoxProps] = React.useState<IPixelBoxProps>(
		null
	)
	const refFocus = React.useRef<HTMLCanvasElement>(null)
	const refFocusImg = React.useRef<HTMLImageElement>(null)

	React.useEffect(() => {
		window.addEventListener('mouseup', mouseup)
	}, [])

	const mousedown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setPixelBoxProps(null)
		setPoint({ x: e.clientX, y: e.clientY })
		setIsMoving(true)
		setStartShortCut(true)
		;(e.target as HTMLDivElement).style.background = 'rgba(0, 0, 0, 0.3)'
	}
	const mousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isMoving) {
			draw(e)
		} else {
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
					backgroundCtx.getImageData(x, y, 20, 20),
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
	// 框完图就销毁事件，不准再重复框，只能调整大小或者位置
	const mouseup = () => {
		window.removeEventListener('mouseup', mouseup)
		setIsMoving(false)
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
		e.target.style.background = 'rgba(255, 255, 255, 0.1)'
	}
	const onBlur = e => {
		if (startShortCut) {
			return false
		}
		e.target.style.background = 'rgba(0, 0, 0, 0.3)'
	}
	const renderPixelBox = () => {
		if (!pixelBoxProps) {
			return null
		}
		const { x, y, rgb } = pixelBoxProps
		return (
			<div
				className="pixel-box"
				style={{
					left: x - 120,
					top: y + 20
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
						坐标:（
						<div>
							{x},{y}
						</div>
						）
					</div>
					RGB:{colorHex(rgb.replace(',255)', ')'))}
				</div>
			</div>
		)
	}

	return (
		<div
			className={'layer'}
			onMouseDown={mousedown}
			onMouseMove={mousemove}
			onMouseOver={onHover}
			onMouseOut={onBlur}
		>
			{renderPixelBox()}
		</div>
	)
}

export default Layer
