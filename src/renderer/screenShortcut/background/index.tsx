import React from 'react'

import { getCurrentDisplay } from '../utils'
import './index.scss'

interface IProps {
	rect: ElectronShortcutCapture.IRect
	rectangleCtx: CanvasRenderingContext2D
	source: ElectronShortcutCapture.ISource
	setDisplay: (display: Electron.Display) => void
}

const Background: React.FC<IProps> = ({
	rect,
	rectangleCtx,
	setDisplay,
	source
}) => {
	const [width, setWidth] = React.useState(0)
	const [height, setHeight] = React.useState(0)

	const canvasRef = React.useRef<HTMLCanvasElement>(null)

	React.useEffect(() => {
		const currDisplay = getCurrentDisplay()
		setWidth(currDisplay.size.width)
		setHeight(currDisplay.size.height)
		setDisplay(currDisplay)
	}, [])

	React.useEffect(() => {
		if (!!source) {
			drawBackground()
		}
	}, [source])

	React.useEffect(() => {
		// 画框中的图
		const { x1, y1 } = rect
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

	const drawBackground = () => {
		const currCtx = canvasRef.current.getContext('2d')
		const { width, height, toPngSource } = source
		const $img = new Image()
		const blob = new Blob([toPngSource], { type: 'image/png' })
		$img.src = URL.createObjectURL(blob)
		$img.addEventListener('load', () => {
			currCtx.drawImage($img, 0, 0, width, height, 0, 0, width, height)
		})
	}

	return (
		<canvas
			id="bg-container"
			ref={canvasRef}
			width={width}
			height={height}
		></canvas>
	)
}

export default Background
