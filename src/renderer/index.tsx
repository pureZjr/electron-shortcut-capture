import ReactDom from 'react-dom'
import React from 'react'

import ScreenShot from './screenShortcut'
import './index.scss'

const render = () => {
	ReactDom.render(<ScreenShot />, document.querySelector('#app'))
}
render()
