import { remote, ipcRenderer, desktopCapturer } from 'electron'

import { events } from '../../../constant/index'

/**
 * 获取显示器资源(mac)
 */
export const getSourceMac = (
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
 * 获取显示器资源(win)
 */

export const getSourceWin = (
	cb: (source: ElectronShortcutCapture.ISource) => void
) => {
	const { x, y } = remote.getCurrentWindow().getBounds()
	const display = remote.screen
		.getAllDisplays()
		.filter(d => d.bounds.x === x && d.bounds.y === y)[0]
	desktopCapturer.getSources(
		{
			types: ['screen'],
			thumbnailSize: {
				width: display.size.width,
				height: display.size.height
			}
		},
		(error, sources) => {
			const currSourceItem = sources.filter(
				v => Number(display.id) === Number(v.display_id)
			)
			if (!currSourceItem.length || error) {
				cb(null)
			}
			cb({
				width: display.size.width,
				height: display.size.height,
				toPngSource: currSourceItem[0].thumbnail.toPNG()
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
