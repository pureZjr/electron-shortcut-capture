import React from 'react'

import completePng from '../assets/imgs/complete.png'
import cancelPng from '../assets/imgs/cancel.png'
import downloadPng from '../assets/imgs/download.png'
import './index.scss'

const ToolBar: React.FC = () => {
	const tools = [
		{ icon: completePng, click: () => {} },
		{ icon: cancelPng, click: () => {} },
		{ icon: downloadPng, click: () => {} }
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
