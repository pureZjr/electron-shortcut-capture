import React from 'react'

import './index.scss'

interface IProps {
	// 框图坐标参数
	rect: ElectronShortcutCapture.IRect
	// 框图Context
	rectangleCtx: CanvasRenderingContext2D
	// 屏幕截图资源
	source: ElectronShortcutCapture.ISource
	bounds: ElectronShortcutCapture.IBounds
	setBackgroundCtx: (ctx: CanvasRenderingContext2D) => void
	setBgHasDraw: (boo: boolean) => void
}

const Background: React.FC<IProps> = ({
	rect,
	rectangleCtx,
	source,
	bounds,
	setBackgroundCtx,
	setBgHasDraw
}) => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null)

	/**
	 * 一旦接收到屏幕截图就开始画canvas
	 */
	React.useEffect(() => {
		if (!!source) {
			setBgHasDraw(true)
			drawBackground()
		}
	}, [source])

	/**
	 * 监听框图坐标参数，参数改变重新画图
	 */
	React.useEffect(() => {
		// 画框中的图
		const { x1, y1 } = rect
		const { width, height } = bounds
		if (!!rectangleCtx) {
			rectangleCtx.drawImage(
				canvasRef.current,
				x1,
				y1,
				width,
				height,
				0,
				0,
				width,
				height
			)
		}
	}, [rect])

	// 画背景
	const drawBackground = () => {
		const currCtx = canvasRef.current.getContext('2d')
		const {
			width,
			height,
			actuallyWidth,
			actuallyHeight,
			toPngSource
		} = source
		const $img = new Image()
		const blob = new Blob([toPngSource], { type: 'image/png' })
		$img.src = URL.createObjectURL(blob)
		$img.addEventListener('load', () => {
			currCtx.drawImage(
				$img,
				0,
				0,
				actuallyWidth,
				actuallyHeight,
				0,
				0,
				width,
				height
			)
			setBackgroundCtx(canvasRef.current.getContext('2d'))
		})
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
