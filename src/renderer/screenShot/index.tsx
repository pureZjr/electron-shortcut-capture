import React, { Fragment } from 'react'
import { get } from 'lodash'

import Background from './background'
import Rectangle from './rectangle'
import Layer from './layer'

const ScreenShot: React.FC = () => {
	const [rect, setRect] = React.useState({ x1: 0, y1: 0, x2: 0, y2: 0 })
	const [display, setDisplay] = React.useState<Electron.Display>(null)
	const [rectangleCtx, setRectangleCtx] = React.useState<
		CanvasRenderingContext2D
	>(null)

	React.useEffect(() => {}, [])

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

	const onResize = rect => {
		drawRectangle(rect)
	}

	const onShift = rect => {
		drawRectangle(rect)
	}

	/**
	 * 画矩形
	 */
	const onDraw = rect => {
		drawRectangle(rect)
	}

	/**
	 * 修正矩形坐标
	 */
	const getRect = ({ x1, y1, x2, y2 }) => {
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

	const drawRectangle = rect => {
		setRect(getRect(rect))
	}

	return (
		<Fragment>
			<Background
				setDisplay={setDisplay}
				rectangleCtx={rectangleCtx}
				rect={rect}
			/>
			<Rectangle
				onResize={onResize}
				onShift={onShift}
				rect={rect}
				setRectangleCtx={setRectangleCtx}
			/>
			<Layer onDraw={onDraw} />
		</Fragment>
	)
}

export default ScreenShot
