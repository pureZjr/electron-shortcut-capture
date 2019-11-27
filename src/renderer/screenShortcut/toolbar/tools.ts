import commonControl from './utils'

let control = null
/**
 * 画曲线
 */
export const makecurve: (
	rect: ElectronShortcutCapture.IRect,
	canvasRef: HTMLCanvasElement
) => {
	update: (args: { color?: string; lineWidth?: number }) => void
} = (rect: ElectronShortcutCapture.IRect, canvasRef: HTMLCanvasElement) => {
	let points = []
	let beginPoint: { x: number; y: number } = null
	const ctx = canvasRef.getContext('2d')

	ctx.lineJoin = 'round'
	ctx.lineCap = 'round'

	if (!!control) {
		control.unbind()
	}

	control = commonControl({
		rect,
		canvasRef,
		onMousedown,
		onMousemove,
		onMouseup
	})

	control.init()

	function onMousedown({ x, y }) {
		beginPoint = { x, y }
		points.push({ x, y })
	}

	function onMousemove({ x, y }) {
		points.push({ x, y })

		if (points.length > 3) {
			const lastTwoPoints = points.slice(-2)
			const controlPoint = lastTwoPoints[0]
			const endPoint = {
				x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
				y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2
			}
			drawLine(beginPoint, controlPoint, endPoint)
			beginPoint = endPoint
		}
	}

	function onMouseup({ x, y }) {
		points.push({ x, y })
		if (points.length > 3) {
			const lastTwoPoints = points.slice(-2)
			const controlPoint = lastTwoPoints[0]
			const endPoint = lastTwoPoints[1]
			drawLine(beginPoint, controlPoint, endPoint)
		}
		beginPoint = null
		points = []
	}

	function drawLine(beginPoint, controlPoint, endPoint) {
		ctx.moveTo(beginPoint.x, beginPoint.y)
		ctx.quadraticCurveTo(
			controlPoint.x,
			controlPoint.y,
			endPoint.x,
			endPoint.y
		)
		ctx.stroke()
	}

	return {
		update: (args: { color?: string; lineWidth?: number }) => {
			control.update(args)
		}
	}
}

/**
 * 画框（圆圈/方形）
 */
export const frame = (
	rect: ElectronShortcutCapture.IRect,
	canvasRef: HTMLCanvasElement,
	type: string
) => {
	const ctx = canvasRef.getContext('2d')
	let beginPoint: { x: number; y: number } = null
	let tempCanvas

	if (!!control) {
		control.unbind()
	}
	control = commonControl({
		rect,
		canvasRef,
		onMousedown,
		onMousemove,
		onMouseup
	})
	control.init()

	function onMousedown({ x, y }) {
		beginPoint = { x, y }
		const canvas = ctx.canvas
		tempCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height)
	}
	function onMousemove({ x, y }) {
		drawFrame(x, y)
	}
	function onMouseup({ x, y }) {}

	function drawFrame(x, y) {
		const canvas = ctx.canvas
		ctx.beginPath()
		ctx.putImageData(tempCanvas, 0, 0, 0, 0, canvas.width, canvas.height)
		if (type === 'rect') {
			ctx.rect(
				beginPoint.x,
				beginPoint.y,
				x - beginPoint.x,
				y - beginPoint.y
			)
		} else if (type === 'circle') {
			const r = Math.sqrt(
				Math.pow(beginPoint.x - x, 2) + Math.pow(beginPoint.y - y, 2)
			)
			ctx.arc(x, y, r, 0, 2 * Math.PI)
		} else {
		}
		ctx.stroke()
	}

	return {
		update: (args: { color?: string; lineWidth?: number }) => {
			control.update(args)
		}
	}
}

/**
 * 画箭头
 */

export const arrow = (
	rect: ElectronShortcutCapture.IRect,
	canvasRef: HTMLCanvasElement
) => {
	const ctx = canvasRef.getContext('2d')
	let beginPoint: { x: number; y: number } = null
	let tempCanvas

	if (!!control) {
		control.unbind()
	}
	control = commonControl({
		rect,
		canvasRef,
		onMousedown,
		onMousemove
	})
	control.init()

	function onMousedown({ x, y }) {
		beginPoint = { x, y }
		const canvas = ctx.canvas
		tempCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height)
	}
	function onMousemove({ x, y }) {
		drawArrow(x, y)
	}

	function drawArrow(x, y) {
		const canvas = ctx.canvas
		// 三角斜边一直线夹角
		const theta = 30
		// 三角斜边长度
		const headlen = 10
		// 计算各角度和对应的P2,P3坐标
		const angle =
				(Math.atan2(beginPoint.y - y, beginPoint.x - x) * 180) /
				Math.PI,
			angle1 = ((angle + theta) * Math.PI) / 180,
			angle2 = ((angle - theta) * Math.PI) / 180,
			topX = headlen * Math.cos(angle1),
			topY = headlen * Math.sin(angle1),
			botX = headlen * Math.cos(angle2),
			botY = headlen * Math.sin(angle2)
		ctx.save()
		ctx.beginPath()
		ctx.putImageData(tempCanvas, 0, 0, 0, 0, canvas.width, canvas.height)

		let arrowX = beginPoint.x - topX,
			arrowY = beginPoint.y - topY

		ctx.moveTo(arrowX, arrowY)
		ctx.moveTo(beginPoint.x, beginPoint.y)
		ctx.lineTo(x, y)
		arrowX = x + topX
		arrowY = y + topY
		ctx.moveTo(arrowX, arrowY)
		ctx.lineTo(x, y)
		arrowX = x + botX
		arrowY = y + botY
		ctx.lineTo(arrowX, arrowY)
		ctx.stroke()
		ctx.restore()
	}

	return {
		update: (args: { color?: string; lineWidth?: number }) => {
			control.update(args)
		}
	}
}
