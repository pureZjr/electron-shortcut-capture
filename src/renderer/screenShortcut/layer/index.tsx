import React from 'react'

import './index.scss'

interface IProps {
	onDraw: (args: ElectronShortcutCapture.IRect) => void
}

const Layer: React.FC<IProps> = ({ onDraw }) => {
	const [isMoving, setIsMoving] = React.useState(false)
	const [startShortCut, setStartShortCut] = React.useState(false)
	// 框图起始点
	const [point, setPoint] = React.useState({ x: 0, y: 0 })

	React.useEffect(() => {
		window.addEventListener('mouseup', mouseup)
	}, [])

	const mousedown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setPoint({ x: e.clientX, y: e.clientY })
		setIsMoving(true)
		setStartShortCut(true)
		;(e.target as HTMLDivElement).style.background = 'rgba(0, 0, 0, 0.3)'
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
	const onHover = e => {
		if (startShortCut) {
			return false
		}
		e.target.style.background = 'rgba(255, 255, 255, 0.1)'
	}
	const onBlur = e => {
		if (startShortCut) {
			return false
		}
		e.target.style.background = 'rgba(0, 0, 0, 0.3)'
	}

	return (
		<div
			className={'layer'}
			onMouseDown={mousedown}
			onMouseMove={mousemove}
			onMouseOver={onHover}
			onMouseOut={onBlur}
		></div>
	)
}

export default Layer
