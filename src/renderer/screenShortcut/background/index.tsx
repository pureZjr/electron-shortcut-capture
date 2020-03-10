import React from 'react'

import './index.scss'

interface IProps {
	// 框图坐标参数
	rect: ElectronShortcutCapture.IRect
	// 框图Canvas
	rectangle: HTMLCanvasElement
	// 屏幕截图资源
	source: ElectronShortcutCapture.ISource
	bounds: ElectronShortcutCapture.IBounds
	setBackgroundCtx: (ctx: CanvasRenderingContext2D) => void
	setBgHasDraw: (boo: boolean) => void
}

const Background: React.FC<IProps> = ({
	rect,
	rectangle,
	source,
	bounds,
	setBackgroundCtx,
	setBgHasDraw
}) => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null)
	const [screenImg, setScreenImg] = React.useState<HTMLImageElement>(null)
	const [ratio, setRatio] = React.useState({
		widthR: 1,
		heightR: 1
	})
	/**
	 * 一旦接收到屏幕截图就开始画canvas
	 */
	React.useEffect(() => {
		if (!!source && !!source.toPngSource) {
			setBgHasDraw(true)
			drawBackground()
		} else if (!!source && !source.toPngSource) {
			clearBackground()
		}
	}, [source])

	/**
	 * 监听框图坐标参数，参数改变重新画图
	 */
	React.useEffect(() => {
		// 画框中的图
		const { x1, y1, x2, y2 } = rect
		if (!!rectangle && !!screenImg) {
			try {
				const rectangleCx = rectangle.getContext('2d')
				rectangle.width = (x2 - x1) / ratio.widthR
				rectangle.height = (y2 - y1) / ratio.heightR
				rectangleCx.drawImage(
					screenImg,
					x1 / ratio.widthR,
					y1 / ratio.heightR,
					rectangle.width,
					rectangle.height,
					0,
					0,
					rectangle.width,
					rectangle.height
				)
				rectangle.style.width = '100%'
			} catch {}
		}
	}, [rect])

	// 画背景
	const drawBackground = () => {
		const currCtx = canvasRef.current.getContext('2d')
		const { toPngSource, isWinHD } = source
		const { width, height } = bounds
		const $img = new Image()

		if (isWinHD) {
			$img.src = toPngSource
		} else {
			const blob = new Blob([toPngSource], { type: 'image/png' })
			$img.src = URL.createObjectURL(blob)
		}

		$img.addEventListener('load', () => {
			canvasRef.current.width = $img.width
			canvasRef.current.height = $img.height
			currCtx.drawImage(
				$img,
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			)
			canvasRef.current.style.width = '100%'

			// electron可用区域大小跟图片实际大小比率
			const xR = width / $img.width
			const yR = height / $img.height
			setRatio({ widthR: xR, heightR: yR })
			Object.assign(window, { ratio: { widthR: xR, heightR: yR } })
			setScreenImg($img)
			setBackgroundCtx(canvasRef.current.getContext('2d'))
		})
	}
	// 清空背景
	const clearBackground = () => {
		const currCtx = canvasRef.current.getContext('2d')
		const { actuallyWidth, actuallyHeight } = source
		currCtx.clearRect(0, 0, actuallyWidth, actuallyHeight)
	}

	return (
		<canvas
			id="bg-container"
			ref={canvasRef}
			width={bounds.width}
			height={bounds.height}
		></canvas>
	)
}

export default Background
