import React from 'react'

import { getSource, getCurrentDisplay } from '../utils'
import './index.scss'

interface IProps {
	rect: { x1: number; y1: number; x2: number; y2: number }
	rectangleCtx: CanvasRenderingContext2D
	setDisplay: (display: Electron.Display) => void
}

const Background: React.FC<IProps> = ({ rect, rectangleCtx, setDisplay }) => {
	const [width, setWidth] = React.useState(0)
	const [height, setHeight] = React.useState(0)

	const canvasRef = React.useRef<HTMLCanvasElement>(null)

	React.useEffect(() => {
		const currDisplay = getCurrentDisplay()
		setWidth(currDisplay.size.width)
		setHeight(currDisplay.size.height)
		setDisplay(currDisplay)
		drawBackground(currDisplay)
	}, [])

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

	const drawBackground = async (display: Electron.Display) => {
		const source = await getSource(display)
		const currCtx = canvasRef.current.getContext('2d')
		const { width, height, x, y, thumbnail } = source
		const $img = new Image()
		const blob = new Blob([thumbnail.toPNG()], { type: 'image/png' })
		$img.src = URL.createObjectURL(blob)
		$img.addEventListener('load', () => {
			currCtx.drawImage($img, 0, 0, width, height, x, y, width, height)
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
