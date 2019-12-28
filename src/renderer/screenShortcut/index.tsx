import React, { Fragment } from 'react'
import { ipcRenderer } from 'electron'

import Background from './background'
import Rectangle from './rectangle'
import Layer from './layer'
import { close } from './events'
import { events } from '../../constant'
import { getSource, getCurrentDisplay } from './utils'

const ScreenShot: React.FC = () => {
	// 框图坐标参数
	const [rect, setRect] = React.useState<ElectronShortcutCapture.IRect>({
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0
	})
	// 框图Context
	const [rectangleCtx, setRectangleCtx] = React.useState<
		CanvasRenderingContext2D
	>(null)
	// 背景Context
	const [backgroundCtx, setBackgroundCtx] = React.useState<
		CanvasRenderingContext2D
	>(null)
	const [source, setSource] = React.useState<ElectronShortcutCapture.ISource>(
		null
	)
	const [destoryLayer, setDestoryLayer] = React.useState(false)
	const [bounds, setBounds] = React.useState<ElectronShortcutCapture.IBounds>(
		{
			width: 0,
			height: 0,
			x: 0,
			y: 0
		}
	)
	const [currDisplayId, setCurrDisplayId] = React.useState(0)
	const [bgHasDraw, setBgHasDraw] = React.useState(false)
	// 正在截图的显示器的id
	const [capturingDisplayId, setCapturingDisplayId] = React.useState(0)

	React.useEffect(() => {
		getSource(setSource)
		// 鼠标右键关闭截图
		window.addEventListener('contextmenu', () => {
			close()
		})
		const currDisplay = getCurrentDisplay()
		setCurrDisplayId(currDisplay.id)
		setBounds(currDisplay.bounds)
		listenCapturingDisplayId()
	}, [])

	const onResize = (rect: ElectronShortcutCapture.IRect) => {
		drawRectangle(rect)
	}

	const onShift = (rect: ElectronShortcutCapture.IRect) => {
		drawRectangle(rect)
	}

	/**
	 * 画矩形
	 */
	const onDraw = (rect: ElectronShortcutCapture.IRect) => {
		drawRectangle(rect)
	}

	/**
	 * 修正矩形坐标
	 */
	const getRect = ({ x1, y1, x2, y2 }: ElectronShortcutCapture.IRect) => {
		const { width, height } = bounds
		const x = x1
		const y = y1
		if (x1 > x2) {
			x1 = x2
			x2 = x
		}
		if (y1 > y2) {
			y1 = y2
			y2 = y
		}
		const rectWidth = x2 - x1
		const rectHeight = y2 - y1
		if (x1 < 0) {
			x1 = 0
			x2 = rectWidth
		}
		if (x2 > width) {
			x2 = width
			x1 = width - rectWidth
		}

		if (y1 < 0) {
			y1 = 0
			y2 = rectHeight
		}
		if (y2 > height) {
			y2 = height
			y1 = height - rectHeight
		}
		return { x1, y1, x2, y2 }
	}

	const drawRectangle = (rect: ElectronShortcutCapture.IRect) => {
		setRect(getRect(rect))
	}

	/**
	 * 监听接收的操作截图的显示器id
	 */
	const listenCapturingDisplayId = () => {
		ipcRenderer.on(
			events.receiveCapturingDisplayId,
			(_, displayId: number) => {
				if (!capturingDisplayId) {
					setCapturingDisplayId(displayId)
				}
			}
		)
	}

	const shortcutDisabled = () => {
		// 判断capturingDisplayId是否等于currDisplayId，不是的话返回
		if (!!capturingDisplayId && capturingDisplayId !== currDisplayId) {
			return true
		} else {
			return false
		}
	}

	return (
		<Fragment>
			<Background
				rectangleCtx={rectangleCtx}
				rect={rect}
				source={source}
				setBackgroundCtx={setBackgroundCtx}
				bounds={bounds}
				setBgHasDraw={setBgHasDraw}
			/>
			<Rectangle
				onResize={onResize}
				onShift={onShift}
				rect={rect}
				setRectangleCtx={setRectangleCtx}
				bounds={bounds}
				currDisplayId={currDisplayId}
				bgHasDraw={bgHasDraw}
				capturingDisplayId={capturingDisplayId}
				shortcutDisabled={shortcutDisabled}
			/>
			{!destoryLayer && bgHasDraw && !shortcutDisabled() && (
				<Layer
					onDraw={onDraw}
					setDestoryLayer={setDestoryLayer}
					backgroundCtx={backgroundCtx}
					bounds={bounds}
				/>
			)}
		</Fragment>
	)
}

export default ScreenShot
