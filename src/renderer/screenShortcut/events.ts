import { ipcRenderer } from 'electron'

import { events } from '../../constant'

/**
 * 取消截图
 */
export const close = () => {
	ipcRenderer.send(events.close)
}

/**
 * 下载图片
 */
export const download = (canvas: HTMLCanvasElement) => {
	const dataURL = canvas.toDataURL('image/png')
	ipcRenderer.send(events.download, { dataURL })
}

/**
 * 剪贴板
 */
export const clipboard = (canvas: HTMLCanvasElement) => {
	const dataURL = canvas.toDataURL('image/png')
	ipcRenderer.send(events.clipboard, dataURL)
}

/**
 * 当前正在截图的显示器
 */
export const setCapturingDisplay = (displayId: number) => {
	ipcRenderer.send(events.setCapturingDisplayId, displayId)
}
