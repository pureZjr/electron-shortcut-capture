import React from 'react'
import ToolTip from 'react-portal-tooltip'

import IconDown from '../assets/svg/down.svg'

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

export enum Fontsize {
	大 = 16,
	中 = 14,
	小 = 12
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
	const [fontSize, setFontSize] = React.useState(Fontsize.小)
	const [fontSizeVisible, setFontSizeVisible] = React.useState(false)

	React.useEffect(() => {
		onHandleClick({
			thicknessNum,
			color,
			fontSize
		})
	}, [thicknessNum, color, fontSize])

	React.useEffect(() => {
		setSetVisible(false)
		setTimeout(() => {
			setSetVisible(true)
		}, 0)
		setColor(Color.red)
		setThicknessNum(LineWidth.small)
	}, [toolId])

	const onShowFontsize = () => {
		setFontSizeVisible(true)
	}

	const onChangeFontsize = (fontsize: number) => {
		setFontSize(fontsize)
		setFontSizeVisible(false)
	}

	// 字号
	const renderFontSize = () => {
		return (
			<div className="setting-fontsize">
				<div className="selected" onClick={onShowFontsize}>
					<span style={{ padding: '0 6px' }} />
					{fontSize === 12 ? '小' : fontSize === 14 ? '中' : '大'}
					<IconDown color="#797471" width="12" height="12" />
				</div>
				<div className={`list ${fontSizeVisible ? 'active' : ''}`}>
					<div onClick={() => onChangeFontsize(Fontsize.大)}>大</div>
					<div onClick={() => onChangeFontsize(Fontsize.中)}>中</div>
					<div onClick={() => onChangeFontsize(Fontsize.小)}>小</div>
				</div>
			</div>
		)
	}

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
				{['#text'].includes(toolId) ? renderFontSize() : null}
				{['#text'].includes(toolId) ? null : renderThickness()}
				{['#mosaic'].includes(toolId) ? null : renderColor()}
			</div>
		</ToolTip>
	)
}

export default Setting
