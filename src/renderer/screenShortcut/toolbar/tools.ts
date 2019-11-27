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
		drawLine(x, y)
	}
	function onMouseup({ x, y }) {}

	function drawLine(x, y) {
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
