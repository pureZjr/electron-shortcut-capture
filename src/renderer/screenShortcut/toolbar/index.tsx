import React from 'react'

import IconComplete from '@assets/svg/sure.svg'
import IconCancel from '@assets/svg/cancel.svg'
import IconDownload from '@assets/svg/download.svg'
import IconPen from '@assets/svg/pen.svg'
import IconCircle from '@assets/svg/circle.svg'
import IconRect from '@assets/svg/rect.svg'
import IconArrow from '@assets/svg/arrow.svg'
import IconBackout from '@assets/svg/backout.svg'
import IconMosaic from '@assets/svg/mosaic.svg'
import IconText from '@assets/svg/text.svg'
import { close, download, clipboard } from '@utils'
import { makecurve, frame, arrow, backout, mosaic, text } from './tools'
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
	const [drawMosaic, setDrawMosaic] = React.useState<{
		update: (args: { lineWidth?: number }) => void
	}>(null)
	const [drawText, setDrawText] = React.useState<{
		update: (args: { fontSize?: number; color: string }) => void
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
			case '#mosaic':
				drawMosaic.update({
					lineWidth: args.thicknessNum
				})
				break
			case '#text':
				drawText.update({
					fontSize: args.fontSize,
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
				<IconText
					width={16}
					height={16}
					color={currToolId === '#text' ? '#47c65b' : '#fff'}
					id="text"
				/>
			),
			click: () => {
				if (currToolId === '#text') {
					return
				}
				setCurrToolId('#text')
				onHandleToolbar()
				setDrawText(
					text({
						rect,
						canvasRef,
						setHasDraw
					})
				)
			}
		},
		{
			icon: (
				<IconMosaic
					width={16}
					height={16}
					color={currToolId === '#mosaic' ? '#47c65b' : '#fff'}
					id="mosaic"
				/>
			),
			click: () => {
				if (currToolId === '#mosaic') {
					return
				}
				setCurrToolId('#mosaic')
				onHandleToolbar()
				setDrawMosaic(
					mosaic({
						rect,
						canvasRef,
						setHasDraw
					})
				)
			}
		},
		{
			icon: (
				<IconPen
					width={16}
					height={16}
					color={currToolId === '#pen' ? '#47c65b' : '#fff'}
					id="pen"
				/>
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
				<IconArrow
					width={16}
					height={16}
					color={currToolId === '#arrow' ? '#47c65b' : '#fff'}
					id="arrow"
				/>
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
		},
		{
			icon: (
				<IconCircle
					width={16}
					height={16}
					color={currToolId === '#circle' ? '#47c65b' : '#fff'}
					id="circle"
				/>
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
				<IconRect
					width={16}
					height={16}
					color={currToolId === '#rect' ? '#47c65b' : '#fff'}
					id="rect"
				/>
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
