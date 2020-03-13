import React from 'react'
import { ipcRenderer } from 'electron'

import { getCurrentDisplay } from '@utils'
import { events } from '@constant'
import './index.scss'

interface IProps {
	// 框图坐标参数
	rect: ElectronShortcutCapture.IRect
	// 框图Canvas
	rectangle: HTMLCanvasElement
	// 屏幕截图资源
	source: ElectronShortcutCapture.ISource
	setBackgroundCtx: (ctx: CanvasRenderingContext2D) => void
	setBgHasDraw: (boo: boolean) => void
}

const Background: React.FC<IProps> = ({
	rect,
	rectangle,
	source,
	setBackgroundCtx,
	setBgHasDraw
}) => {
	const canvasRef = React.useRef<HTMLCanvasElement>(null)
	const [screenImg, setScreenImg] = React.useState<HTMLImageElement>(null)
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
				rectangle.width = (x2 - x1) * source.scaleFactor
				rectangle.height = (y2 - y1) * source.scaleFactor
				rectangleCx.drawImage(
					screenImg,
					x1 * source.scaleFactor,
					y1 * source.scaleFactor,
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
		const { toPngSource } = source
		const $img = new Image()
		const blob = new Blob([toPngSource], { type: 'image/png' })
		$img.src = URL.createObjectURL(blob)
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

			Object.assign(window, { scaleFactor: source.scaleFactor })
			setScreenImg($img)
			setBackgroundCtx(canvasRef.current.getContext('2d'))
		})
	}
	// 清空背景
	const clearBackground = () => {
		const currCtx = canvasRef.current.getContext('2d')
		const { width, height } = canvasRef.current
		currCtx.clearRect(0, 0, width, height)
		canvasRef.current.width = 0
		canvasRef.current.height = 0
		const currDisplay = getCurrentDisplay()
		setPageLoadedDisplayId(currDisplay.id)
	}

	const setPageLoadedDisplayId = (currDisplayId: number) => {
		ipcRenderer.send(events.loadedPageDisplayId, currDisplayId)
	}

	return <canvas ref={canvasRef}></canvas>
}

export default Background
