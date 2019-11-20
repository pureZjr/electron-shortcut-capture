import React, { Component } from 'react'
import { ipcRenderer } from 'electron'

import Toolbar from '../toolbar'
import { getCurrentDisplay } from '../utils'
import { setCapturingDisplay } from '../events'
import './index.scss'

interface IProps {
	rect: { x1: number; y1: number; x2: number; y2: number }
	onShift: ({ x1, y1, x2, y2 }) => void
	onResize: ({ x1, y1, x2, y2 }) => void
	bounds: { x: number; y: number; width: number; height: number }
	setRectangleCtx: (ctx: CanvasRenderingContext2D) => void
}

interface IState {
	dragType: string
	dragpoint: { x: number; y: number }
	oRect: any
	canvasRef: HTMLCanvasElement
	style: React.CSSProperties
	// 截取全屏
	isShortcutFullScreen: boolean
	// 正在操作截图的显示器id
	capturingDisplayId: number
}

class Rectangle extends Component<IProps, IState> {
	constructor(props) {
		super(props)
		this.state = {
			dragType: null,
			dragpoint: null,
			oRect: null,
			canvasRef: null,
			style: {},
			isShortcutFullScreen: false,
			capturingDisplayId: null
		}
	}

	setCanvasRef = (ref: HTMLCanvasElement) => {
		if (!!ref) {
			this.setState({ canvasRef: ref })
			this.props.setRectangleCtx(ref.getContext('2d'))
			const { x1, y1, x2, y2 } = this.props.rect
			const width = x2 - x1
			const height = y2 - y1
			ref.getContext('2d').clearRect(0, 0, width, height)
		}
	}

	mousemove = e => {
		this.switchDragType(e)
	}

	mousedown = (
		e: React.MouseEvent<HTMLDivElement | HTMLCanvasElement, MouseEvent>,
		dragType: string
	) => {
		if (this.shortcutDisabled()) {
			return false
		}
		const { x1, y1, x2, y2 } = this.props.rect
		const width = x2 - x1
		const height = y2 - y1
		this.state.canvasRef.getContext('2d').clearRect(0, 0, width, height)
		this.setState({
			dragType,
			dragpoint: { x: e.clientX, y: e.clientY },
			oRect: this.props.rect
		})
	}

	mouseup = () => {
		const { x1, y1, x2, y2 } = this.props.rect
		if (!x1 && !y1 && !x2 && !y2) {
			// 点击显示器，没有框图，全屏选择
			const { width, height } = this.props.bounds
			this.setState({
				isShortcutFullScreen: true
			})
			this.props.onResize({ x1: 0, y1: 0, x2: width, y2: height })
		} else {
			if (!this.state.dragType) {
				this.props.onResize({ x1, y1, x2, y2 })
			} else {
				this.setState({
					dragType: null
				})
			}
		}
		if (!this.state.capturingDisplayId) {
			const displayId = getCurrentDisplay().id
			setCapturingDisplay(displayId)
		}
	}

	shift = (e: MouseEvent) => {
		const { dragpoint, oRect } = this.state
		const x = e.clientX - dragpoint.x
		const y = e.clientY - dragpoint.y
		let { x1, y1, x2, y2 } = oRect
		x1 += x
		y1 += y
		x2 += x
		y2 += y
		this.props.onShift({ x1, y1, x2, y2 })
	}

	resize = (e: MouseEvent) => {
		const { dragpoint, oRect, dragType } = this.state
		const x = e.clientX - dragpoint.x
		const y = e.clientY - dragpoint.y
		let { x1, y1, x2, y2 } = oRect
		switch (dragType) {
			case 'n':
				y1 += y
				break
			case 'ne':
				y1 += y
				x2 += x
				break
			case 'e':
				x2 += x
				break
			case 'se':
				x2 += x
				y2 += y
				break
			case 's':
				y2 += y
				break
			case 'sw':
				x1 += x
				y2 += y
				break
			case 'w':
				x1 += x
				break
			case 'nw':
				x1 += x
				y1 += y
				break
			default:
				return
		}
		this.props.onResize({ x1, y1, x2, y2 })
	}

	/**
	 * 拖动选框/调整选框大小
	 */
	switchDragType = (e: MouseEvent) => {
		const { dragType } = this.state
		switch (dragType) {
			case 'm':
				this.shift(e)
				break
			case 'n':
			case 'ne':
			case 'e':
			case 'se':
			case 's':
			case 'sw':
			case 'w':
			case 'nw':
				this.resize(e)
				break
			default:
				break
		}
	}

	/**
	 * 监听接收的操作截图的显示器id
	 */
	listenCapturingDisplayId = () => {
		ipcRenderer.on('receiveCapturingDisplayId', (_, displayId: number) => {
			if (!this.state.capturingDisplayId) {
				this.setState({
					capturingDisplayId: displayId
				})
			}
		})
	}

	shortcutDisabled = () => {
		const { capturingDisplayId } = this.state
		// 判断capturingDisplayId是否等于currDisplayId，不是的话返回
		if (
			!!capturingDisplayId &&
			capturingDisplayId !== getCurrentDisplay().id
		) {
			return true
		} else {
			return false
		}
	}

	componentDidMount() {
		window.addEventListener('mousemove', this.mousemove)
		window.addEventListener('mouseup', this.mouseup)
		this.listenCapturingDisplayId()
	}

	componentWillUpdate(nextProps) {
		const { rect } = nextProps
		const { x1, x2, y1, y2 } = rect
		const x = x1 < x2 ? x1 : x2
		const y = y1 < y2 ? y1 : y2
		const width = Math.abs(x2 - x1)
		const height = Math.abs(y2 - y1)

		const style: React.CSSProperties = {
			width: `${width}px`,
			height: `${height}px`,
			left: `${x}px`,
			top: `${y}px`,
			visibility: width && height ? 'visible' : 'hidden'
		}
		if (JSON.stringify(this.state.style) !== JSON.stringify(style)) {
			this.setState({
				style
			})
		}
	}

	componentWillUnmount() {
		window.removeEventListener('mousemove', this.mousemove)
		window.removeEventListener('mouseup', this.mouseup)
	}

	render() {
		const { style, canvasRef, isShortcutFullScreen } = this.state
		if (this.shortcutDisabled()) {
			return null
		}
		return (
			<div className="rectangle" style={style}>
				<div className="size">{`${style.width} * ${style.height}`}</div>
				<Toolbar
					canvasRef={canvasRef}
					style={{
						bottom: `${isShortcutFullScreen ? '5px' : '-35px'}`
					}}
				/>
				<canvas
					ref={this.setCanvasRef}
					width={style.width}
					height={style.height}
					onMouseDown={e => this.mousedown(e, 'm')}
				></canvas>
				<div className="rectangle-border rectangle-border-n"></div>
				<div className="rectangle-border rectangle-border-e"></div>
				<div className="rectangle-border rectangle-border-s"></div>
				<div className="rectangle-border rectangle-border-w"></div>
				<div
					className="rectangle-pointer rectangle-pointer-n"
					onMouseDown={e => this.mousedown(e, 'n')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-ne"
					onMouseDown={e => this.mousedown(e, 'ne')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-e"
					onMouseDown={e => this.mousedown(e, 'e')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-se"
					onMouseDown={e => this.mousedown(e, 'se')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-s"
					onMouseDown={e => this.mousedown(e, 's')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-sw"
					onMouseDown={e => this.mousedown(e, 'sw')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-w"
					onMouseDown={e => this.mousedown(e, 'w')}
				></div>
				<div
					className="rectangle-pointer rectangle-pointer-nw"
					onMouseDown={e => this.mousedown(e, 'nw')}
				></div>
			</div>
		)
	}
}

// const Rectangle1: React.FC<IProps> = ({
// 	rect,
// 	onShift,
// 	onResize,
// 	setRectangleCtx
// }) => {
// 	const [dragType, setType] = React.useState(null)
// 	const [dragpoint, setDragpoint] = React.useState(null)
// 	const [oRect, setoRect] = React.useState(null)

// 	React.useEffect(() => {
// 		window.addEventListener('mousemove', mousemove)
// 	}, [])

// 	React.useEffect(() => {
// 		const { x1, y1, x2, y2 } = rect
// 		const width = x2 - x1
// 		const height = y2 - y1
// 		canvasRef.current.getContext('2d').clearRect(0, 0, width, height)
// 	}, [rect])

// 	const canvasRef = React.useRef<HTMLCanvasElement>(null)

// 	React.useEffect(() => {
// 		if (!!canvasRef.current) {
// 			setRectangleCtx(canvasRef.current.getContext('2d'))
// 		}
// 	}, [canvasRef.current])

// 	const x = React.useMemo(() => {
// 		const { x1, x2 } = rect
// 		return x1 < x2 ? x1 : x2
// 	}, [rect])

// 	const y = React.useMemo(() => {
// 		const { y1, y2 } = rect
// 		return y1 < y2 ? y1 : y2
// 	}, [rect])

// 	const width = React.useMemo(() => {
// 		return Math.abs(rect.x2 - rect.x1)
// 	}, [rect])

// 	const height = React.useMemo(() => {
// 		return Math.abs(rect.y2 - rect.y1)
// 	}, [rect])

// 	const style: React.CSSProperties = React.useMemo(() => {
// 		return {
// 			width: `${width}px`,
// 			height: `${height}px`,
// 			left: `${x}px`,
// 			top: `${y}px`,
// 			visibility: width && height ? 'visible' : 'hidden'
// 		}
// 	}, [x, y, width, height])

// 	const mousemove = e => {
// 		console.log('mousemove')
// 		switchDragType(e)
// 	}

// 	const mousedown = (
// 		e: React.MouseEvent<HTMLDivElement | HTMLCanvasElement, MouseEvent>,
// 		dragPoint: string
// 	) => {
// 		setType(dragPoint)
// 		setDragpoint({ x: e.clientX, y: e.clientY })
// 		setoRect(rect)
// 	}

// 	const mouseup = () => {
// 		setType(null)
// 	}

// 	const shift = e => {
// 		const x = e.clientX - dragpoint.x
// 		const y = e.clientY - dragpoint.y
// 		let { x1, y1, x2, y2 } = oRect
// 		x1 += x
// 		y1 += y
// 		x2 += x
// 		y2 += y
// 		onShift({ x1, y1, x2, y2 })
// 	}

// 	const resize = e => {
// 		const x = e.clientX - dragpoint.x
// 		const y = e.clientY - dragpoint.y
// 		let { x1, y1, x2, y2 } = oRect
// 		switch (dragType) {
// 			case 'n':
// 				y1 += y
// 				break
// 			case 'ne':
// 				y1 += y
// 				x2 += x
// 				break
// 			case 'e':
// 				x2 += x
// 				break
// 			case 'se':
// 				x2 += x
// 				y2 += y
// 				break
// 			case 's':
// 				y2 += y
// 				break
// 			case 'sw':
// 				x1 += x
// 				y2 += y
// 				break
// 			case 'w':
// 				x1 += x
// 				break
// 			case 'nw':
// 				x1 += x
// 				y1 += y
// 				break
// 			default:
// 				return
// 		}
// 		onResize({ x1, y1, x2, y2 })
// 	}

// 	/**
// 	 * 拖动选框/调整选框大小
// 	 */
// 	const switchDragType = e => {
// 		console.log(dragType)
// 		switch (dragType) {
// 			case 'm':
// 				shift(e)
// 				break
// 			case 'n':
// 			case 'ne':
// 			case 'e':
// 			case 'se':
// 			case 's':
// 			case 'sw':
// 			case 'w':
// 			case 'nw':
// 				resize(e)
// 				break
// 			default:
// 				break
// 		}
// 	}

// 	return (
// 		<div className="rectangle" style={{ ...style }}>
// 			<canvas
// 				ref={canvasRef}
// 				width={width}
// 				height={height}
// 				onMouseDown={e => mousedown(e, 'm')}
// 				onMouseUp={mouseup}
// 			></canvas>
// 			<div className="rectangle-border rectangle-border-n"></div>
// 			<div className="rectangle-border rectangle-border-e"></div>
// 			<div className="rectangle-border rectangle-border-s"></div>
// 			<div className="rectangle-border rectangle-border-w"></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-n"
// 				onMouseDown={e => mousedown(e, 'n')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-ne"
// 				onMouseDown={e => mousedown(e, 'ne')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-e"
// 				onMouseDown={e => mousedown(e, 'e')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-se"
// 				onMouseDown={e => mousedown(e, 'se')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-s"
// 				onMouseDown={e => mousedown(e, 's')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-sw"
// 				onMouseDown={e => mousedown(e, 'sw')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-w"
// 				onMouseDown={e => mousedown(e, 'w')}
// 			></div>
// 			<div
// 				className="rectangle-pointer rectangle-pointer-nw"
// 				onMouseDown={e => mousedown(e, 'nw')}
// 			></div>
// 		</div>
// 	)
// }

export default Rectangle
