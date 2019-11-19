import React from 'react'

import './index.scss'

interface IProps {
	onDraw: ({ x1: x, y1: y, x2, y2 }) => void
}

const Layer: React.FC<IProps> = ({ onDraw }) => {
	const [isMoving, setIsMoving] = React.useState(false)
	const [point, setPoint] = React.useState({ x: 0, y: 0 })

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

	return (
		<div
			className="layer"
			onMouseDown={mousedown}
			onMouseMove={mousemove}
			onMouseUp={mouseup}
		></div>
	)
}

export default Layer
