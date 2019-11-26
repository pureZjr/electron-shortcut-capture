import React from 'react'
import ToolTip from 'react-portal-tooltip'

import IconComplete from '../assets/svg/sure.svg'
import IconCancel from '../assets/svg/cancel.svg'
import IconDownload from '../assets/svg/download.svg'
import IconPen from '../assets/svg/pen.svg'
import { close, download, clipboard } from '../events'
import { makecurve } from './utils'
import './index.scss'

interface IProps {
	canvasRef: HTMLCanvasElement
	style: React.CSSProperties
	rect: ElectronShortcutCapture.IRect
	controlToolbar: () => void
}

const ToolBar: React.FC<IProps> = ({
	canvasRef,
	style,
	controlToolbar,
	rect
}) => {
	const [handlePean, setHandlePean] = React.useState(false)
	const [settingVisible, setSettingVisible] = React.useState(false)
	const [thicknessNum, setThicknessNum] = React.useState(4)
	const [pen, setPen] = React.useState(null)

	const onHandleToolbar = () => {
		controlToolbar()
	}

	// 粗细
	const renderThickness = () => {
		return (
			<div className="thickness">
				<div
					className={`point small ${
						thicknessNum === 4 ? 'active' : ''
					} `}
					onClick={() => {
						pen.update({ lineWidth: 4 })
						setThicknessNum(4)
					}}
				></div>
				<div
					className={`point middle ${
						thicknessNum === 9 ? 'active' : ''
					} `}
					onClick={() => {
						pen.update({ lineWidth: 9 })
						setThicknessNum(9)
					}}
				></div>
				<div
					className={`point large ${
						thicknessNum === 12 ? 'active' : ''
					} `}
					onClick={() => {
						pen.update({ lineWidth: 12 })
						setThicknessNum(12)
					}}
				></div>
			</div>
		)
	}

	// 画图配置
	const renderSetting = id => {
		const style = {
			style: {
				marginTop: 10,
				padding: 0
			},
			arrowStyle: {
				color: '#302b29',
				borderColor: false
			}
		}

		return (
			<ToolTip
				active={settingVisible}
				position="bottom"
				arrow="center"
				parent={id}
				style={style}
			>
				<div className="setting-container">{renderThickness()}</div>
			</ToolTip>
		)
	}

	const tools = [
		{
			icon: <IconComplete width={18} height={18} color="#4a6a39" />,
			click: () => {
				clipboard(canvasRef)
			}
		},
		{
			icon: <IconCancel width={18} height={18} color="#a13940" />,
			click: () => {
				close()
			}
		},
		{
			icon: <IconDownload width={18} height={18} color="#c5b3a5" />,
			click: () => {
				download(canvasRef)
			}
		},
		{
			icon: (
				<div className="tool">
					<IconPen width={18} height={18} color="#c5b3a5" id="pen" />
					{renderSetting('#pen')}
				</div>
			),
			click: () => {
				if (handlePean) {
					return
				}
				setSettingVisible(true)
				onHandleToolbar()
				setHandlePean(true)
				const p = makecurve(rect, canvasRef)
				setPen(p)
				p.start()
			}
		}
	]

	return (
		<div className="toolbar" style={style}>
			{tools.map((v, idx) => {
				return (
					<div className="item" key={idx} onClick={v.click}>
						{v.icon}
					</div>
				)
			})}
		</div>
	)
}

export default ToolBar
