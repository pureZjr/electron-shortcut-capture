import React from 'react'

import './index.scss'

interface IProps {
	rect: { x1: number; y1: number; x2: number; y2: number }
	onShift: ({ x1, y1, x2, y2 }) => void
	onResize: ({ x1, y1, x2, y2 }) => void
	setRectangleCtx: (ctx: CanvasRenderingContext2D) => void
}

const Rectangle: React.FC<IProps> = ({
	rect,
	onShift,
	onResize,
	setRectangleCtx
}) => {
	const [dragPointIs, setDragPointIs] = React.useState('')
	const [dragpoint, setDragpoint] = React.useState(null)
	const [oRect, setoRect] = React.useState(null)

	React.useEffect(() => {
		window.addEventListener('mousemove', mousemove)
		window.addEventListener('mouseup', mouseup)
	}, [])

	React.useEffect(() => {
		const { x1, y1, x2, y2 } = rect
		const width = x2 - x1
		const height = y2 - y1
		canvasRef.current.getContext('2d').clearRect(0, 0, width, height)
	}, [rect])

	const canvasRef = React.useRef<HTMLCanvasElement>(null)

	React.useEffect(() => {
		if (!!canvasRef.current) {
			setRectangleCtx(canvasRef.current.getContext('2d'))
		}
	}, [canvasRef.current])

	const x = React.useMemo(() => {
		const { x1, x2 } = rect
		return x1 < x2 ? x1 : x2
	}, [rect])

	const y = React.useMemo(() => {
		const { y1, y2 } = rect
		return y1 < y2 ? y1 : y2
	}, [rect])

	const width = React.useMemo(() => {
		return Math.abs(rect.x2 - rect.x1)
	}, [rect])

	const height = React.useMemo(() => {
		return Math.abs(rect.y2 - rect.y1)
	}, [rect])

	const style: React.CSSProperties = React.useMemo(() => {
		return {
			width: `${width}px`,
			height: `${height}px`,
			left: `${x}px`,
			top: `${y}px`,
			visibility: width && height ? 'visible' : 'hidden'
		}
	}, [x, y, width, height])

	const mousemove = e => {
		switchDragPoint(e)
	}

	const mousedown = (
		e: React.MouseEvent<HTMLDivElement | HTMLCanvasElement, MouseEvent>,
		dragPoint: string
	) => {
		setDragPointIs(dragPoint)
		setDragpoint({ x: e.clientX, y: e.clientY })
		setoRect(rect)
		switchDragPoint(e)
	}

	const mouseup = e => {
		switchDragPoint(e)
		setDragPointIs(null)
	}

	const shift = e => {
		const x = e.clientX - dragpoint.x
		const y = e.clientY - dragpoint.y
		let { x1, y1, x2, y2 } = oRect
		x1 += x
		y1 += y
		x2 += x
		y2 += y
		onShift({ x1, y1, x2, y2 })
	}

	const resize = e => {
		const x = e.clientX - dragpoint.x
		const y = e.clientY - dragpoint.y
		let { x1, y1, x2, y2 } = oRect
		switch (dragPointIs) {
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
		onResize({ x1, y1, x2, y2 })
	}

	const switchDragPoint = e => {
		switch (dragPointIs) {
			case 'm':
				shift(e)
				break
			case 'n':
			case 'ne':
			case 'e':
			case 'se':
			case 's':
			case 'sw':
			case 'w':
			case 'nw':
				resize(e)
				break
			default:
				break
		}
	}

	return (
		<div className="rectangle" style={{ ...style }}>
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				onMouseDown={e => mousedown(e, 'm')}
			></canvas>
			<div className="rectangle-border rectangle-border-n"></div>
			<div className="rectangle-border rectangle-border-e"></div>
			<div className="rectangle-border rectangle-border-s"></div>
			<div className="rectangle-border rectangle-border-w"></div>
			<div
				className="rectangle-pointer rectangle-pointer-n"
				onMouseDown={e => mousedown(e, 'n')}
			></div>
			<div
				className="rectangle-border rectangle-border-ne"
				onMouseDown={e => mousedown(e, 'ne')}
			></div>
			<div
				className="rectangle-border rectangle-border-e"
				onMouseDown={e => mousedown(e, 'e')}
			></div>
			<div
				className="rectangle-border rectangle-border-se"
				onMouseDown={e => mousedown(e, 'se')}
			></div>
			<div
				className="rectangle-border rectangle-border-s"
				onMouseDown={e => mousedown(e, 's')}
			></div>
			<div
				className="rectangle-border rectangle-border-sw"
				onMouseDown={e => mousedown(e, 'sw')}
			></div>
			<div
				className="rectangle-border rectangle-border-w"
				onMouseDown={e => mousedown(e, 'w')}
			></div>
			<div
				className="rectangle-border rectangle-border-nw"
				onMouseDown={e => mousedown(e, 'nw')}
			></div>
		</div>
	)
}

export default Rectangle
