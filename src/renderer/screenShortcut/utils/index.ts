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
		(
			_,
			{
				toPngSource,
				width,
				height,
				actuallyWidth,
				actuallyHeight,
				mouseX,
				mouseY
			}
		) => {
			cb({
				width,
				height,
				toPngSource,
				actuallyWidth,
				actuallyHeight,
				mouseX,
				mouseY
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

/**
 * rgb转16进制
 */
export const colorHex = function(rgb: string) {
	// 如果是rgb颜色表示
	const aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
	let strHex = '#'
	for (let i = 0; i < aColor.length; i++) {
		let hex = Number(aColor[i]).toString(16)
		if (hex === '0') {
			hex += hex
		}
		strHex += hex
	}
	if (strHex.length !== 7) {
		strHex = rgb
	}
	return strHex
}
