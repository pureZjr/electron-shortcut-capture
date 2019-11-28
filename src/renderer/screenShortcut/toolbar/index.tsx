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
			icon: <IconComplete width={16} height={16} color="#47c65b" />,
			click: () => {
				clipboard(canvasRef)
			}
		},
		{
			icon: <IconCancel width={16} height={16} color="#ee4418" />,
			click: () => {
				close()
			}
		},
		{
			icon: <IconDownload width={16} height={16} color="#fff" />,
			click: () => {
				download(canvasRef)
			}
		},
		{
			icon: (
				<IconBackout
					width={16}
					height={16}
					color={hasDraw ? '#fff' : '#736b66'}
				/>
			),
			click: () => {
				if (hasDraw) {
					setHasDraw(backout(canvasRef))
				}
			}
		},
		{
			icon: <div className="line"></div>
		},
		{
			icon: (
				<div className="tool">
					<IconPen
						width={16}
						height={16}
						color={currToolId === '#pen' ? '#47c65b' : '#fff'}
						id="pen"
					/>
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
						width={16}
						height={16}
						color={currToolId === '#circle' ? '#47c65b' : '#fff'}
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
					<IconRect
						width={16}
						height={16}
						color={currToolId === '#rect' ? '#47c65b' : '#fff'}
						id="rect"
					/>
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
					<IconArrow
						width={16}
						height={16}
						color={currToolId === '#arrow' ? '#47c65b' : '#fff'}
						id="arrow"
					/>
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
