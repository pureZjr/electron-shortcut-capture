export function makecurve(
	rect: ElectronShortcutCapture.IRect,
	canvasRef: HTMLCanvasElement
) {
	let isDown = false
	let points = []
	let beginPoint = null
	const ctx = canvasRef.getContext('2d')

	// 设置线条颜色
	ctx.strokeStyle = 'red'
	ctx.lineWidth = 4
	ctx.lineJoin = 'round'
	ctx.lineCap = 'round'

	function bind() {
		canvasRef.addEventListener('mousedown', down)
		canvasRef.addEventListener('mousemove', move)
		canvasRef.addEventListener('mouseup', up)
		canvasRef.addEventListener('mouseout', up)
	}

	function unbind() {
		canvasRef.removeEventListener('mousedown', down, false)
		canvasRef.removeEventListener('mousemove', move, false)
		canvasRef.removeEventListener('mouseup', up, false)
		canvasRef.removeEventListener('mouseout', up, false)
	}

	function down(evt) {
		isDown = true
		const { x, y } = getPos(evt)
		points.push({ x, y })
		beginPoint = { x, y }
		canvasRef.getContext('2d').beginPath()
	}

	function move(evt) {
		if (!isDown) return

		const { x, y } = getPos(evt)
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

	function up(evt) {
		if (!isDown) return
		const { x, y } = getPos(evt)
		points.push({ x, y })
		if (points.length > 3) {
			const lastTwoPoints = points.slice(-2)
			const controlPoint = lastTwoPoints[0]
			const endPoint = lastTwoPoints[1]
			drawLine(beginPoint, controlPoint, endPoint)
		}
		ctx.save()
		beginPoint = null
		isDown = false
		points = []
		canvasRef.getContext('2d').closePath()
	}

	function getPos(evt) {
		const { x1, y1 } = rect
		return {
			x: evt.clientX - x1,
			y: evt.clientY - y1
		}
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
		start: () => bind(),
		close: () => unbind(),
		update: (args: { color?: string; lineWidth?: number }) => {
			ctx.lineWidth = args.lineWidth || 4
			ctx.strokeStyle = args.color || 'red'
		}
	}
}
