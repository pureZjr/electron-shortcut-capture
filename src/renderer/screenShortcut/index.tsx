import React, { Fragment } from 'react'
import { get } from 'lodash'
import os from 'os'

import Background from './background'
import Rectangle from './rectangle'
import Layer from './layer'
import { close } from './events'
import { getSourceMac, getSourceWin } from './utils'

const ScreenShot: React.FC = () => {
	const [rect, setRect] = React.useState<ElectronShortcutCapture.IRect>({
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0
	})
	const [display, setDisplay] = React.useState<Electron.Display>(null)
	const [rectangleCtx, setRectangleCtx] = React.useState<
		CanvasRenderingContext2D
	>(null)
	// 正在操作截图的显示器id
	const [capturingDisplayId, setCapturingDisplayId] = React.useState<number>(
		null
	)
	const [source, setSource] = React.useState<ElectronShortcutCapture.ISource>(
		null
	)

	React.useEffect(() => {
		if (os.platform() === 'darwin') {
			getSourceMac(setSource)
		} else {
			getSourceWin(setSource)
		}

		window.addEventListener('contextmenu', () => {
			close()
		})
	}, [])

	const bounds = React.useMemo(() => {
		return {
			x: 0,
			y: 0,
			width: get(display, 'size.width', 0),
			height: get(display, 'size.height', 0)
		}
	}, [display])

	const width = React.useMemo(() => {
		return bounds.width
	}, [bounds])

	const height = React.useMemo(() => {
		return bounds.height
	}, [bounds])

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

	return (
		<Fragment>
			<Background
				setDisplay={setDisplay}
				rectangleCtx={rectangleCtx}
				rect={rect}
				source={source}
			/>
			<Rectangle
				onResize={onResize}
				onShift={onShift}
				rect={rect}
				setRectangleCtx={setRectangleCtx}
				bounds={bounds}
				capturingDisplayId={capturingDisplayId}
				setCapturingDisplayId={setCapturingDisplayId}
			/>
			<Layer onDraw={onDraw} />
		</Fragment>
	)
}

export default ScreenShot
