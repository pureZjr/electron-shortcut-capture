import React from 'react'
import ToolTip from 'react-portal-tooltip'

export enum LineWidth {
	small = 4,
	middle = 9,
	large = 12
}

export enum Color {
	red = '#d02726',
	blue = '#148cc1',
	green = '#41a51d',
	yellow = '#b8991f',
	black = '#483d3e',
	white = '#afa6a5'
}

interface IProps {
	toolId: string
	onHandleClick: (args: ElectronShortcutCapture.ISettingProps) => void
}

const style = {
	style: {
		padding: 0,
		zIndex: 104
	},
	arrowStyle: {
		color: '#302b29',
		borderColor: false
	}
}

const Setting: React.FC<IProps> = ({ toolId, onHandleClick }) => {
	const [thicknessNum, setThicknessNum] = React.useState(LineWidth.small)
	const [color, setColor] = React.useState(Color.red)
	const [visible, setSetVisible] = React.useState(false)

	React.useEffect(() => {
		onHandleClick({
			thicknessNum,
			color
		})
	}, [thicknessNum, color])

	React.useEffect(() => {
		setSetVisible(false)
		setTimeout(() => {
			setSetVisible(true)
		}, 0)
		setColor(Color.red)
		setThicknessNum(LineWidth.small)
	}, [toolId])

	// 粗细
	const renderThickness = () => {
		return (
			<div className="setting-thickness">
				<div
					className={`point small ${
						thicknessNum === LineWidth.small ? 'active' : ''
					} `}
					onClick={() => {
						setThicknessNum(LineWidth.small)
					}}
				></div>
				<div
					className={`point middle ${
						thicknessNum === LineWidth.middle ? 'active' : ''
					} `}
					onClick={() => {
						setThicknessNum(LineWidth.middle)
					}}
				></div>
				<div
					className={`point large ${
						thicknessNum === LineWidth.large ? 'active' : ''
					} `}
					onClick={() => {
						setThicknessNum(LineWidth.large)
					}}
				></div>
			</div>
		)
	}

	// 颜色
	const renderColor = () => {
		return (
			<div className="setting-color">
				<div
					className={`red ${color === Color.red ? 'active' : ''}`}
					style={{
						background: Color.red
					}}
					onClick={() => setColor(Color.red)}
				></div>
				<div
					className={`blue ${color === Color.blue ? 'active' : ''}`}
					style={{
						background: Color.blue
					}}
					onClick={() => setColor(Color.blue)}
				></div>
				<div
					className={`green ${color === Color.green ? 'active' : ''}`}
					style={{
						background: Color.green
					}}
					onClick={() => setColor(Color.green)}
				></div>
				<div
					className={`yellow ${
						color === Color.yellow ? 'active' : ''
					}`}
					style={{
						background: Color.yellow
					}}
					onClick={() => setColor(Color.yellow)}
				></div>
				<div
					className={`black ${color === Color.black ? 'active' : ''}`}
					style={{
						background: Color.black
					}}
					onClick={() => setColor(Color.black)}
				></div>
				<div
					className={`white ${color === Color.white ? 'active' : ''}`}
					style={{
						background: Color.white
					}}
					onClick={() => setColor(Color.white)}
				></div>
			</div>
		)
	}

	if (!toolId) {
		return null
	}

	return (
		<ToolTip
			active={visible}
			position="top"
			arrow="center"
			parent={toolId}
			style={style}
		>
			<div className="setting-container">
				{renderThickness()}
				{renderColor()}
			</div>
		</ToolTip>
	)
}

export default Setting
