import React from 'react'

import completePng from '../assets/imgs/complete.png'
import cancelPng from '../assets/imgs/cancel.png'
import downloadPng from '../assets/imgs/download.png'
import { hide, download, clipboard } from '../events'
import './index.scss'

interface IProps {
	canvasRef: HTMLCanvasElement
}

const ToolBar: React.FC<IProps> = ({ canvasRef }) => {
	const tools = [
		{
			icon: completePng,
			click: () => {
				clipboard(canvasRef)
			}
		},
		{
			icon: cancelPng,
			click: () => {
				hide()
			}
		},
		{
			icon: downloadPng,
			click: () => {
				download(canvasRef)
			}
		}
	]

	return (
		<div className="container">
			{tools.map(v => {
				return (
					<div className="item" onClick={v.click}>
						<img src={v.icon} width={30} height={30} />
					</div>
				)
			})}
		</div>
	)
}

export default ToolBar
