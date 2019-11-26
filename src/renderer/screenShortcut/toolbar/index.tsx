import React from 'react'

import IconComplete from '../assets/svg/sure.svg'
import IconCancel from '../assets/svg/cancel.svg'
import IconDownload from '../assets/svg/download.svg'
import IconPen from '../assets/svg/pen.svg'
import { close, download, clipboard } from '../events'
import { makecurve } from './utils'
import Setting from './setting'
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
	const [currToolId, setCurrToolId] = React.useState('')
	const [pen, setPen] = React.useState<{
		start: () => void
		close: () => void
		update: (args: { color?: string; lineWidth?: number }) => void
	}>(null)

	const onHandleToolbar = () => {
		controlToolbar()
	}

	const onHandlePenClick = (args: ElectronShortcutCapture.ISettingProps) => {
		if (!pen) {
			return
		}
		pen.update({
			lineWidth: args.thicknessNum,
			color: args.color
		})
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
					<Setting
						toolId="#pen"
						settingVisible={currToolId === '#pen'}
						onHandleClick={onHandlePenClick}
					/>
				</div>
			),
			click: () => {
				if (handlePean) {
					return
				}
				setCurrToolId('#pen')
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
