import { Color, LineWidth } from './setting'

interface IPoint {
	x: number
	y: number
}

const commonControl: (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	onMousedown?: (args: IPoint) => void
	onMousemove?: (args: IPoint) => void
	onMouseup?: (args: IPoint) => void
}) => {
	update: (args: { color?: string; lineWidth?: number }) => void
	init: () => void
	unbind: () => void
} = (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	onMousedown?: (args: IPoint) => void
	onMousemove?: (args: IPoint) => void
	onMouseup?: (args: IPoint) => void
}) => {
	let isDown = false
	const scaleFactor = window['scaleFactor']
	const canvasRef = args.canvasRef
	const ctx = canvasRef.getContext('2d')
	// 设置线条颜色
	ctx.strokeStyle = Color.red
	ctx.lineWidth = LineWidth.small

	// 绑定操作
	function bind() {
		canvasRef.addEventListener('mousedown', mousedown)
		canvasRef.addEventListener('mousemove', mousemove)
		canvasRef.addEventListener('mouseup', mouseup)
		canvasRef.addEventListener('mouseout', mouseup)
	}

	// 解绑操作
	function unbind() {
		canvasRef.removeEventListener('mousedown', mousedown)
		canvasRef.removeEventListener('mousemove', mousemove)
		canvasRef.removeEventListener('mouseup', mouseup)
		canvasRef.removeEventListener('mouseout', mouseup)
	}

	// mousedown
	function mousedown(evt: MouseEvent) {
		isDown = true
		const { x, y } = getPos(evt)
		canvasRef.getContext('2d').beginPath()
		if (typeof args.onMousedown === 'function') {
			args.onMousedown({ x, y })
		}
	}

	// mousemove
	function mousemove(evt: MouseEvent) {
		if (!isDown) return
		if (typeof args.onMousemove === 'function') {
			const { x, y } = getPos(evt)
			args.onMousemove({ x, y })
		}
	}

	// mouseup
	function mouseup(evt: MouseEvent) {
		if (!isDown) return
		isDown = false
		if (typeof args.onMouseup === 'function') {
			const { x, y } = getPos(evt)
			args.onMouseup({ x, y })
		}
	}

	// 获取起始点
	function getPos(evt: MouseEvent): IPoint {
		const { x1, y1 } = args.rect
		return {
			x: (evt.clientX - x1) * scaleFactor,
			y: (evt.clientY - y1) * scaleFactor
		}
	}

	// 更新样式
	function update(args: { color?: string; lineWidth?: number }) {
		ctx.lineWidth = args.lineWidth || LineWidth.small
		ctx.strokeStyle = args.color || Color.red
	}

	function init() {
		bind()
	}

	return {
		update,
		init,
		unbind
	}
}

export default commonControl
