import { remote, ipcRenderer } from 'electron'

import { events } from '../../../constant/index'

/**
 * 获取显示器资源
 */
export const getSource = (
	cb: (source: ElectronShortcutCapture.ISource) => void
) => {
	ipcRenderer.once(
		events.screenSourcesToPng,
		(_, { toPngSource, width, height }) => {
			cb({
				width,
				height,
				toPngSource
			})
		}
	)
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
