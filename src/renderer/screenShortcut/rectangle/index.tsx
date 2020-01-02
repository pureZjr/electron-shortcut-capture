import React, { Component, Fragment } from 'react'

import Toolbar from '../toolbar'
import { setCapturingDisplay, clipboard } from '@utils'

import './index.scss'

interface IProps {
	bounds: { x: number; y: number; width: number; height: number }
	currDisplayId: number
	rect: ElectronShortcutCapture.IRect
	bgHasDraw: boolean
	capturingDisplayId: number
	onShift: (args: ElectronShortcutCapture.IRect) => void
	onResize: (args: ElectronShortcutCapture.IRect) => void
	setRectangleCtx: (ctx: CanvasRenderingContext2D) => void
	shortcutDisabled: () => Boolean
}

interface IState {
	dragType: string
	dragpoint: { x: number; y: number }
	currRect: ElectronShortcutCapture.IRect
	canvasRef: HTMLCanvasElement
	style: React.CSSProperties
	// 截取全屏
	isShortcutFullScreen: boolean
	// 取消缩放
	cancelZoom: boolean
}

class Rectangle extends Component<IProps, IState> {
	constructor(props) {
		super(props)
		this.state = {
			dragType: null,
			dragpoint: null,
			currRect: null,
			canvasRef: null,
			style: {},
			isShortcutFullScreen: false,
			cancelZoom: false
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
			ref.addEventListener('mousedown', this.mousedownToMove)
		}
	}

	mousedownToMove = e => {
		this.mousedown(e, 'm')
	}

	mousemove = e => {
		this.switchDragType(e)
	}

	mousedown = (
		e:
			| React.MouseEvent<HTMLDivElement | HTMLCanvasElement, MouseEvent>
			| MouseEvent,
		dragType: string
	) => {
		if (this.props.shortcutDisabled()) {
			return false
		}
		this.setState({
			dragType,
			dragpoint: { x: e.clientX, y: e.clientY },
			currRect: this.props.rect
		})
	}

	mouseup = () => {
		const { x1, y1, x2, y2 } = this.props.rect
		if (!x1 && !y1 && !x2 && !y2) {
			// 点击显示器，没有框图，全屏选择
			const { width, height } = this.props.bounds
			const style: React.CSSProperties = {
				width: `${width}px`,
				height: `${height}px`,
				left: `0px`,
				top: `0px`,
				visibility: width && height ? 'visible' : 'hidden'
			}
			this.setState({
				isShortcutFullScreen: true,
				style
			})
			this.props.onResize({ x1: 0, y1: 0, x2: width, y2: height })
			window.removeEventListener('mouseup', this.mouseup)
			this.controlToolbar()
		} else {
			if (!this.state.dragType) {
				this.props.onResize({ x1, y1, x2, y2 })
			} else {
				this.setState({
					dragType: null
				})
			}
		}
		if (!this.props.capturingDisplayId) {
			// 防止在多个屏幕同时操作截图，发送当前操作的displayid给主线程，主线程将这个id通知给其他屏幕
			setCapturingDisplay(this.props.currDisplayId)
			setTimeout(() => {
				this.state.canvasRef.addEventListener(
					'dblclick',
					this.onHandleDoubleClick
				)
			}, 200)
		}
	}

	shift = (e: MouseEvent) => {
		const { dragpoint, currRect } = this.state
		const x = e.clientX - dragpoint.x
		const y = e.clientY - dragpoint.y
		let { x1, y1, x2, y2 } = currRect
		x1 += x
		y1 += y
		x2 += x
		y2 += y
		this.props.onShift({ x1, y1, x2, y2 })
	}

	resize = (e: MouseEvent) => {
		const { dragpoint, currRect, dragType } = this.state
		const x = e.clientX - dragpoint.x
		const y = e.clientY - dragpoint.y
		let { x1, y1, x2, y2 } = currRect
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
	 * 只要操作了toolbar，移动、缩放功能就关闭
	 */
	controlToolbar = () => {
		if (this.state.cancelZoom) {
			return
		}
		this.setState({
			cancelZoom: true
		})
		window.removeEventListener('mousemove', this.mousemove)
		window.removeEventListener('mouseup', this.mouseup)

		this.state.canvasRef.removeEventListener(
			'mousedown',
			this.mousedownToMove
		)
	}

	/**
	 * 缩放点
	 */
	renderDragPoint() {
		return (
			<Fragment>
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
			</Fragment>
		)
	}

	onHandleDoubleClick = () => {
		clipboard(this.state.canvasRef)
		this.state.canvasRef.removeEventListener(
			'dblclick',
			this.onHandleDoubleClick
		)
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

	componentDidMount() {
		window.addEventListener('mousemove', this.mousemove)
		window.addEventListener('mouseup', this.mouseup)
	}

	componentWillUnmount() {
		window.removeEventListener('mousemove', this.mousemove)
		window.removeEventListener('mouseup', this.mouseup)
	}

	render() {
		const {
			style,
			canvasRef,
			isShortcutFullScreen,
			cancelZoom
		} = this.state
		const { rect } = this.props
		if (this.props.shortcutDisabled()) {
			return null
		}

		const bottom = `${
			isShortcutFullScreen ||
			this.props.bounds.height -
				rect.y1 -
				parseInt(style.height as any, 0) <=
				60
				? '5px'
				: '-55px'
		}`

		const styles =
			isShortcutFullScreen || rect.y1 <= 40
				? { top: '5px', left: '4px' }
				: { top: '-40px', left: '4px' }

		let toolbarRight = 4

		if (rect.x2 - rect.x1 < 470 && rect.x2 < 470) {
			toolbarRight = rect.x2 - 470
		}
		return (
			<div className="rectangle" style={style}>
				<div
					className="size"
					style={styles}
				>{`${style.width} * ${style.height}`}</div>
				<Toolbar
					canvasRef={canvasRef}
					style={{
						bottom,
						right: toolbarRight
					}}
					controlToolbar={this.controlToolbar}
					rect={rect}
				/>
				<canvas
					ref={this.setCanvasRef}
					width={style.width}
					height={style.height}
				></canvas>
				<div className="rectangle-border rectangle-border-n"></div>
				<div className="rectangle-border rectangle-border-e"></div>
				<div className="rectangle-border rectangle-border-s"></div>
				<div className="rectangle-border rectangle-border-w"></div>
				{cancelZoom ? null : this.renderDragPoint()}
			</div>
		)
	}
}

export default Rectangle
