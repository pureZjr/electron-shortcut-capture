import commonControl from './utils'

let control = null
const canvasStore = []

/**
 * 保存每次绘图后的图像
 */
function setCanvasImageData(ctx) {
	const canvas = ctx.canvas
	canvasStore.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
}

/**
 * 画曲线
 */
export const makecurve: (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	setHasDraw: (boo: boolean) => void
}) => {
	update: (args: { color?: string; lineWidth?: number }) => void
} = (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	setHasDraw: (boo: boolean) => void
}) => {
	const { rect, canvasRef, setHasDraw } = args
	let points = []
	let beginPoint: { x: number; y: number } = null
	const ctx = canvasRef.getContext('2d')
	let hasMove = false

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
		setCanvasImageData(ctx)
	}
	function onMousemove({ x, y }) {
		hasMove = true
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
		if (hasMove) {
			setHasDraw(true)
		} else {
			canvasStore.pop()
		}
		hasMove = false

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
export const frame = (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	type: string
	setHasDraw: (boo: boolean) => void
}) => {
	const { rect, canvasRef, type, setHasDraw } = args
	const ctx = canvasRef.getContext('2d')
	let beginPoint: { x: number; y: number } = null
	let tempCanvas
	let hasMove = false

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
		setCanvasImageData(ctx)
	}
	function onMousemove({ x, y }) {
		hasMove = true
		drawFrame(x, y)
	}
	function onMouseup() {
		if (hasMove) {
			setHasDraw(true)
		} else {
			canvasStore.pop()
		}
		hasMove = false
	}
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
export const arrow = (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	setHasDraw: (boo: boolean) => void
}) => {
	const { rect, canvasRef, setHasDraw } = args
	const ctx = canvasRef.getContext('2d')
	let beginPoint: { x: number; y: number } = null
	let tempCanvas
	let hasMove = false

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
		setCanvasImageData(ctx)
	}
	function onMousemove({ x, y }) {
		hasMove = true
		drawArrow(x, y)
	}
	function onMouseup() {
		if (hasMove) {
			setHasDraw(true)
		} else {
			canvasStore.pop()
		}
		hasMove = false
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

/**
 * 撤销
 */
export const backout = (canvasRef: HTMLCanvasElement) => {
	if (!canvasStore.length) {
		return
	}
	const ctx = canvasRef.getContext('2d')
	const canvas = ctx.canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.putImageData(canvasStore.pop(), 0, 0, 0, 0, canvas.width, canvas.height)
	return !!canvasStore.length
}

/**
 * 马赛克
 */
export const mosaic = (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	setHasDraw: (boo: boolean) => void
}) => {
	const { rect, canvasRef } = args
	const ctx = canvasRef.getContext('2d')
	let hasMove = false

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

	let size = 10
	let lastPosiX = 0
	let lastPosiY = 0

	function getRgb(x, y) {
		const c = ctx.getImageData(x, y, 1, 1).data
		const red = c[0]
		const green = c[1]
		const blue = c[2]
		return `rgb(${red},${green},${blue})`
	}
	function setRgb(x, y) {
		ctx.fillStyle = getRgb(x, y)
		ctx.fillRect(x, y, size, size)
	}

	function onMousedown({ x, y }) {
		lastPosiX = x
		lastPosiY = y
		setRgb(x, y)
		setCanvasImageData(ctx)
	}
	function onMousemove({ x, y }) {
		hasMove = true
		if (Math.abs(x - lastPosiX) > size || Math.abs(y - lastPosiY) > size) {
			lastPosiX = x
			lastPosiY = y
			setRgb(x, y)
		}
	}
	function onMouseup() {
		if (hasMove) {
			args.setHasDraw(true)
		} else {
			canvasStore.pop()
		}
		hasMove = false
	}

	return {
		update: (args: { lineWidth?: number }) => {
			size = args.lineWidth === 4 ? 10 : args.lineWidth === 9 ? 14 : 18
		}
	}
}
