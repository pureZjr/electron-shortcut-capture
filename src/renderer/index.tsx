import ReactDom from 'react-dom'
import React from 'react'
import { ipcRenderer } from 'electron'

import ScreenShot from './screenShot'

window.addEventListener('contextmenu', () => {
	ipcRenderer.send('ShortcutCapture::HIDE')
})

const render = () => {
	ReactDom.render(<ScreenShot />, document.querySelector('#app'))
}
render()
