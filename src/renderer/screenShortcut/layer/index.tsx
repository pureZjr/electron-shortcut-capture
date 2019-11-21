import React from 'react'

import './index.scss'

interface IProps {
	capturingDisplayId: number
	onDraw: ({ x1: x, y1: y, x2, y2 }) => void
}

const Layer: React.FC<IProps> = ({ onDraw, capturingDisplayId }) => {
	const [isMoving, setIsMoving] = React.useState(false)
	const [point, setPoint] = React.useState({ x: 0, y: 0 })

	React.useEffect(() => {
		window.addEventListener('mouseup', mouseup)
	}, [])

	const mousedown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setPoint({ x: e.clientX, y: e.clientY })
		setIsMoving(true)
	}
	const mousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isMoving) {
			draw(e)
		}
	}
	const mouseup = () => {
		setIsMoving(false)
	}

	const draw = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const { x, y } = point
		const x2 = e.clientX
		const y2 = e.clientY
		if (Math.abs(x2 - x) >= 7 && Math.abs(y2 - y) >= 7) {
			onDraw({ x1: x, y1: y, x2, y2 })
		}
	}

	const bgColor = () => {
		if (!capturingDisplayId) {
			return {}
		} else {
			return { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
		}
	}

	return (
		<div
			className={`layer ${!!capturingDisplayId ? 'no-hover' : ''}`}
			style={bgColor()}
			onMouseDown={mousedown}
			onMouseMove={mousemove}
		></div>
	)
}

export default Layer
