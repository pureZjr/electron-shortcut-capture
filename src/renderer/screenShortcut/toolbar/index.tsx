import React from 'react'

import IconComplete from '../assets/svg/sure.svg'
import IconCancel from '../assets/svg/cancel.svg'
import IconDownload from '../assets/svg/download.svg'
import IconPen from '../assets/svg/pen.svg'
import IconCircle from '../assets/svg/circle.svg'
import IconRect from '../assets/svg/rect.svg'
import IconArrow from '../assets/svg/arrow.svg'
import IconBackout from '../assets/svg/backout.svg'
import { close, download, clipboard } from '../events'
import { makecurve, frame, arrow, backout } from './tools'
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
	const [currToolId, setCurrToolId] = React.useState('')
	const [pen, setPen] = React.useState<{
		update: (args: { color?: string; lineWidth?: number }) => void
	}>(null)
	const [drawFrame, setDrawFrame] = React.useState<{
		update: (args: { color?: string; lineWidth?: number }) => void
	}>(null)
	const [drawArrow, setDrawArrow] = React.useState<{
		update: (args: { color?: string; lineWidth?: number }) => void
	}>(null)
	// 是否有绘图
	const [hasDraw, setHasDraw] = React.useState(false)

	const onHandleToolbar = () => {
		controlToolbar()
	}

	const onHandleClick = (args: ElectronShortcutCapture.ISettingProps) => {
		switch (currToolId) {
			case '#pen':
				pen.update({
					lineWidth: args.thicknessNum,
					color: args.color
				})
				break
			case '#circle':
			case '#rect':
				drawFrame.update({
					lineWidth: args.thicknessNum,
					color: args.color
				})
				break
			case '#arrow':
				drawArrow.update({
					lineWidth: args.thicknessNum,
					color: args.color
				})
				break
		}
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
			icon: <IconDownload width={18} height={18} color="#fff" />,
			click: () => {
				download(canvasRef)
			}
		},
		{
			icon: (
				<IconBackout
					width={18}
					height={18}
					color={hasDraw ? '#fff' : '#c5b3a5'}
				/>
			),
			click: () => {
				if (hasDraw) {
					setHasDraw(backout(canvasRef))
				}
			}
		},
		{
			icon: (
				<div className="tool">
					<IconPen width={18} height={18} color="#fff" id="pen" />
				</div>
			),
			click: () => {
				if (currToolId === '#pen') {
					return
				}
				setCurrToolId('#pen')
				onHandleToolbar()
				setPen(
					makecurve({
						rect,
						canvasRef,
						setHasDraw
					})
				)
			}
		},
		{
			icon: (
				<div className="tool">
					<IconCircle
						width={18}
						height={18}
						color="#fff"
						id="circle"
					/>
				</div>
			),
			click: () => {
				if (currToolId === '#circle') {
					return
				}
				setCurrToolId('#circle')
				onHandleToolbar()
				setDrawFrame(
					frame({
						rect,
						canvasRef,
						type: 'circle',
						setHasDraw
					})
				)
			}
		},
		{
			icon: (
				<div className="tool">
					<IconRect width={18} height={18} color="#fff" id="rect" />
				</div>
			),
			click: () => {
				if (currToolId === '#rect') {
					return
				}
				setCurrToolId('#rect')
				onHandleToolbar()
				setDrawFrame(
					frame({
						rect,
						canvasRef,
						type: 'rect',
						setHasDraw
					})
				)
			}
		},
		{
			icon: (
				<div className="tool">
					<IconArrow width={18} height={18} color="#fff" id="arrow" />
				</div>
			),
			click: () => {
				if (currToolId === '#arrow') {
					return
				}
				setCurrToolId('#arrow')
				onHandleToolbar()
				setDrawArrow(
					arrow({
						rect,
						canvasRef,
						setHasDraw
					})
				)
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
			<Setting toolId={currToolId} onHandleClick={onHandleClick} />
		</div>
	)
}

export default ToolBar
