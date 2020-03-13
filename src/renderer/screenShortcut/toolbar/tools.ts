import commonControl from './utils'

export let control = null
const canvasStore = []

/**
 * 保存每次绘图后的图像/或者节点
 */
function setCanvasImageData(ctx) {
	const canvas = ctx.canvas
	if (!!canvas) {
		canvasStore.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
	} else {
		canvasStore.push(ctx)
	}
}

/**
 * 画曲线
 */
export const makecurve = (args: {
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

	// 鼠标移动
	function move(e) {
		const isWinBind = !!e.target
		hasMove = true
		let x = e.clientX
		let y = e.clientY

		if (isWinBind) {
			x = e.clientX - rect.x1
			y = e.clientY - rect.y1
		}
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

	// canvas上的鼠标移动
	function onMousemove({ x, y }) {
		move({
			clientX: x,
			clientY: y
		})
	}

	// window上面的鼠标移动
	function winMouseup({ clientX, clientY }) {
		const scaleFactor = window['scaleFactor']

		window.removeEventListener('mousemove', move)
		setHasDraw(true)
		hasMove = false
		points.push({
			x: (clientX - rect.x1) * scaleFactor,
			y: (clientY - rect.y1) * scaleFactor
		})
		if (points.length > 3) {
			const lastTwoPoints = points.slice(-2)
			const controlPoint = lastTwoPoints[0]
			const endPoint = lastTwoPoints[1]
			drawLine(beginPoint, controlPoint, endPoint)
		}
		beginPoint = null
		points = []
		setTimeout(() => {
			window.removeEventListener('mouseup', winMouseup)
		}, 0)
	}

	/**
	 * 鼠标起
	 * 由于鼠标进过文字的时候会触发，所以下面加以判断鼠标位置是否在canvas里面
	 * 是：立刻绑定window移动事件接着画
	 * 否：结束
	 * 其他工具如此类推
	 * */

	function onMouseup({ x, y }) {
		const width = args.canvasRef.clientWidth
		const height = args.canvasRef.clientHeight
		const isOut = 0 > x || x > width || 0 > y || y > height
		if (!isOut) {
			// 穿过文字
			window.addEventListener('mousemove', move)
			window.addEventListener('mouseup', winMouseup)
			return
		}
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

	// 鼠标移动
	function move(e) {
		const isWinBind = !!e.target
		hasMove = true
		let x = e.clientX
		let y = e.clientY
		if (isWinBind) {
			x = e.clientX - rect.x1
			y = e.clientY - rect.y1
		}
		drawFrame(x, y)
	}

	function onMousemove({ x, y }) {
		move({
			clientX: x,
			clientY: y
		})
	}

	// window上面的鼠标移动
	function winMouseup() {
		window.removeEventListener('mousemove', move)
		setHasDraw(true)
		hasMove = false
		setTimeout(() => {
			window.removeEventListener('mouseup', winMouseup)
		}, 0)
	}

	function onMouseup({ x, y }) {
		const width = args.canvasRef.clientWidth
		const height = args.canvasRef.clientHeight
		const isOut = 0 > x || x > width || 0 > y || y > height
		if (!isOut) {
			// 穿过文字
			window.addEventListener('mousemove', move)
			window.addEventListener('mouseup', winMouseup)
			return
		}
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

	// 鼠标移动
	function move(e) {
		const isWinBind = !!e.target
		hasMove = true
		let x = e.clientX
		let y = e.clientY
		if (isWinBind) {
			x = e.clientX - rect.x1
			y = e.clientY - rect.y1
		}
		drawArrow(x, y)
	}

	function onMousemove({ x, y }) {
		move({
			clientX: x,
			clientY: y
		})
	}

	// window上面的鼠标移动
	function winMouseup() {
		window.removeEventListener('mousemove', move)
		setHasDraw(true)
		hasMove = false
		setTimeout(() => {
			window.removeEventListener('mouseup', winMouseup)
		}, 0)
	}

	function onMouseup({ x, y }) {
		const width = args.canvasRef.clientWidth
		const height = args.canvasRef.clientHeight
		const isOut = 0 > x || x > width || 0 > y || y > height
		if (!isOut) {
			// 穿过文字
			window.addEventListener('mousemove', move)
			window.addEventListener('mouseup', winMouseup)
			return
		}
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
	const last = canvasStore.pop()
	const isFragment = !!last.nodeName
	if (isFragment) {
		const inputAreas = document.getElementsByClassName('input-area')
		for (let i = inputAreas.length - 1; i > -1; i--) {
			inputAreas[i].remove()
		}
		canvasRef.parentElement.appendChild(last)
	} else {
		const ctx = canvasRef.getContext('2d')
		const canvas = ctx.canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.putImageData(last, 0, 0, 0, 0, canvas.width, canvas.height)
	}
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
		ctx.fillRect(x - size / 2, y - size / 2, size, size)
	}

	function move(e) {
		const isWinBind = !!e.target
		hasMove = true
		let x = e.clientX
		let y = e.clientY
		if (isWinBind) {
			x = e.clientX - rect.x1
			y = e.clientY - rect.y1
		}
		if (Math.abs(x - lastPosiX) > size || Math.abs(y - lastPosiY) > size) {
			lastPosiX = x
			lastPosiY = y
			setRgb(x, y)
		}
	}

	function onMousedown({ x, y }) {
		lastPosiX = x
		lastPosiY = y
		setRgb(x, y)
		setCanvasImageData(ctx)
	}
	function onMousemove({ x, y }) {
		move({
			clientX: x,
			clientY: y
		})
	}

	// window上面的鼠标移动
	function winMouseup() {
		window.removeEventListener('mousemove', move)
		args.setHasDraw(true)
		hasMove = false
		setTimeout(() => {
			window.removeEventListener('mouseup', winMouseup)
		}, 0)
	}

	function onMouseup({ x, y }) {
		const width = args.canvasRef.clientWidth
		const height = args.canvasRef.clientHeight
		const isOut = 0 > x || x > width || 0 > y || y > height
		if (!isOut) {
			// 穿过文字
			window.addEventListener('mousemove', move)
			window.addEventListener('mouseup', winMouseup)
			return
		}

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

/**
 * 文字
 */
export const text = (args: {
	rect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	setHasDraw: (boo: boolean) => void
}) => {
	const { rect, canvasRef } = args
	let fontSize = 14
	let color = '#d02726'
	// 1：开始 2：结束
	let editStatus: 1 | 2 = 2
	let currElement: HTMLDivElement = null
	let hasClickToolTipPortal = false
	// 是否拖动
	let hasMoving = false

	if (!!control) {
		window.removeEventListener('click', clickOutside)
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

	window.addEventListener('click', clickOutside)

	// 点击外部
	function clickOutside(e) {
		const existToolTipPortal = e.path.filter(v => {
			return v.className === 'ToolTipPortal'
		})
		hasClickToolTipPortal = !!existToolTipPortal.length
	}

	function inputAreaBindBlur(inputTarget: HTMLDivElement) {
		inputTarget.onblur = () => {
			editStatus = 2
			setTimeout(() => {
				if (editStatus === 1 || hasClickToolTipPortal) {
					return
				}
				currElement = null
				inputTarget.contentEditable = 'false'
				inputTarget.style.boxShadow = 'unset'
				if (!inputTarget.textContent) {
					// 没有输入文字
					inputTarget.remove()
					canvasStore.pop()
				} else {
					args.setHasDraw(true)
				}
			}, 120)
		}
	}

	// inputArea绑定事件
	function inputAreaBindEvent() {
		let currentControlInputArea: HTMLDivElement = null

		function cleanInputAreaShadow() {
			const inputAreas = document.getElementsByClassName('input-area')
			for (let i = 0; i < inputAreas.length; i++) {
				;(inputAreas[i] as HTMLDivElement).style.boxShadow = 'unset'
			}
		}

		// 单击选中文字
		args.canvasRef.parentElement.addEventListener('click', e => {
			const target = e.target as HTMLDivElement
			const isChild = target.parentElement.className === 'input-area'
			const isCurrent = target.className === 'input-area'

			if (isChild || isCurrent) {
				const inputTarget = (isChild
					? target.parentElement
					: target) as HTMLDivElement
				inputAreaBindBlur(inputTarget)
				cleanInputAreaShadow()
				currElement = inputTarget
				inputTarget.style.boxShadow = '0 0 1px red'
			}
		})

		const drag = ({ clientY, clientX }) => {
			hasMoving = true
			const width = currentControlInputArea.clientWidth
			const height = currentControlInputArea.clientHeight
			currentControlInputArea.style.top = `${clientY -
				rect.y1 -
				height / 2}px`
			currentControlInputArea.style.left = `${clientX -
				rect.x1 -
				width / 2}px`
		}

		const mouseout = () => {
			window.addEventListener('mousemove', drag)
		}

		const mouseenter = () => {
			window.removeEventListener('mousemove', drag)
		}

		// 拖动
		args.canvasRef.parentElement.addEventListener('mousedown', e => {
			const target = e.target as HTMLDivElement
			const isChild = target.parentElement.className === 'input-area'
			const isCurrent = target.className === 'input-area'

			if (isChild || isCurrent) {
				const inputTarget = (isChild
					? target.parentElement
					: target) as HTMLDivElement
				currentControlInputArea = inputTarget
				currentControlInputArea.style.zIndex = '111'
				if (inputTarget.contentEditable === 'false') {
					save()
					console.log(
						'绑定mousemove，mouseout，mouseenter，超过一次有bug'
					)
					currentControlInputArea.addEventListener('mousemove', drag)

					currentControlInputArea.addEventListener(
						'mouseout',
						mouseout
					)

					currentControlInputArea.addEventListener(
						'mouseenter',
						mouseenter
					)
				}
			}
		})

		// 结束拖动
		args.canvasRef.parentElement.addEventListener('mouseup', e => {
			const target = e.target as HTMLDivElement
			const isChild = target.parentElement.className === 'input-area'
			const isCurrent = target.className === 'input-area'

			if (isChild || isCurrent) {
				const inputTarget = isChild ? target.parentElement : target
				if (inputTarget.contentEditable === 'false') {
					if (!hasMoving) {
						canvasStore.pop()
					}
					hasMoving = false
					currentControlInputArea.style.zIndex = '110'
					console.log('结束拖动')
					currentControlInputArea.removeEventListener(
						'mouseout',
						mouseout
					)
					window.removeEventListener('mousemove', drag)
					currentControlInputArea.removeEventListener(
						'mousemove',
						drag
					)
				}
			}
		})

		// 双击重新获取焦点
		args.canvasRef.parentElement.addEventListener('dblclick', e => {
			const target = e.target as HTMLDivElement
			const isChild = target.parentElement.className === 'input-area'
			const isCurrent = target.className === 'input-area'

			if (isChild || isCurrent) {
				const inputTarget = isChild ? target.parentElement : target
				editStatus = 1
				inputTarget.contentEditable = 'true'
				setTimeout(() => {
					inputTarget.focus()
					inputTarget.value = inputTarget.value
				}, 100)
			}
		})
	}

	inputAreaBindEvent()

	// 创建输入框
	function createInputArea(x, y) {
		const scaleFactor = window['scaleFactor']
		const inputArea = document.createElement('div')
		canvasRef.parentElement.appendChild(inputArea)
		styles(inputArea)
		inputArea.style.top = `${y / scaleFactor}px`
		inputArea.style.left = `${x / scaleFactor}px`
		inputArea.contentEditable = 'true'
		inputArea.className = 'input-area'
		inputArea.style.boxShadow = '0 0 1px red'
		setTimeout(() => {
			inputArea.focus()
		}, 100)
		if (!!currElement) {
			currElement.style.boxShadow = 'unset'
		}
		currElement = inputArea

		inputArea.onblur = () => {
			editStatus = 2
			setTimeout(() => {
				if (editStatus === 1 || hasClickToolTipPortal) {
					return
				}
				currElement = null
				inputArea.contentEditable = 'false'
				inputArea.style.boxShadow = 'unset'
				if (!inputArea.textContent) {
					// 没有输入文字
					inputArea.remove()
					canvasStore.pop()
				} else {
					args.setHasDraw(true)
				}
			}, 120)
		}
	}

	// 更新文字样式
	function updateCurrElement() {
		if (!!currElement) {
			styles(currElement)
			editStatus = 1
			setTimeout(() => {
				currElement.focus()
			}, 100)
		}
	}

	// 文字样式
	function styles(ele) {
		ele.style.color = color
		ele.style.fontSize = `${fontSize}px`
	}

	// 保存
	function save() {
		const fragment = document.createDocumentFragment()
		const inputAreas = document.getElementsByClassName('input-area')
		for (let i = 0; i < inputAreas.length; i++) {
			fragment.appendChild(inputAreas[i].cloneNode(true))
		}
		setCanvasImageData(fragment)
	}

	function onMousedown({ x, y }) {
		if (editStatus === 2) {
			save()
			editStatus = 1
			createInputArea(x, y)
		}
	}

	function onMousemove() {}
	function onMouseup() {}

	return {
		update: (args: { fontSize?: number; color?: string }) => {
			fontSize = args.fontSize
			color = args.color
			updateCurrElement()
		}
	}
}
