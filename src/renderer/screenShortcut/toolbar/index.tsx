import React from 'react'

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
	const [hasBeginPath, setHasBeginPath] = React.useState(false)
	const [handlePean, setHandlePean] = React.useState(false)

	const createBeginPath = () => {
		if (hasBeginPath) {
			return
		}
		setHasBeginPath(true)
		canvasRef.getContext('2d').beginPath()
	}

	const onHandleToolbar = () => {
		createBeginPath()
		controlToolbar()
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
			icon: <IconPen width={18} height={18} color="#c5b3a5" />,
			click: () => {
				if (handlePean) {
					return
				}
				onHandleToolbar()
				setHandlePean(true)
				makecurve(rect, canvasRef).start()
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
