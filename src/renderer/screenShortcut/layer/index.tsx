import React from 'react'

import './index.scss'

interface IProps {
	onDraw: ({ x1: x, y1: y, x2, y2 }) => void
}

const Layer: React.FC<IProps> = ({ onDraw }) => {
	const [isMoving, setIsMoving] = React.useState(false)
	const [point, setPoint] = React.useState({ x: 0, y: 0 })
	const [bgColor, setBgColor] = React.useState('rgba(0, 0, 0, 0.3)')

	React.useEffect(() => {
		window.addEventListener('mouseup', mouseup)
		window.addEventListener('mouseover', focusDisplay)
		window.addEventListener('mouseout', blurDisplay)
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

	const focusDisplay = () => {
		setBgColor('rgba(255, 255, 255, 0.1)')
	}

	const blurDisplay = () => {
		setBgColor('rgba(0, 0, 0, 0.3)')
	}

	return (
		<div
			style={{
				backgroundColor: bgColor
			}}
			className="layer"
			onMouseDown={mousedown}
			onMouseMove={mousemove}
		></div>
	)
}

export default Layer
