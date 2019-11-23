import { remote, ipcRenderer } from 'electron'

import { events } from '../../../constant/index'

export interface ISource {
	x: number
	y: number
	width: number
	height: number
	toPngSource: any
}

/**
 * 获取显示器资源
 */
export const getSource: (display: Electron.Display) => Promise<ISource> = (
	display: Electron.Display
) => {
	return new Promise((resolve, reject) => {
		ipcRenderer.on(events.screenSourcesToPng, (_, toPngSource) => {
			resolve({
				x: 0,
				y: 0,
				width: display.size.width,
				height: display.size.height,
				toPngSource
			})
		})
	})
}

/**
 * 获取当前显示器
 */
export const getCurrentDisplay: () => Electron.Display = () => {
	const { x, y } = remote.getCurrentWindow().getBounds()
	const display = remote.screen
		.getAllDisplays()
		.filter(d => d.bounds.x === x && d.bounds.y === y)[0]
	return display
}
