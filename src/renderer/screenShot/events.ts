import { ipcRenderer, remote } from 'electron'

/**
 * 取消截图
 */
export const hide = () => {
	ipcRenderer.send('ShortcutCapture::HIDE')
}

/**
 * 下载图片
 */

export const download = (canvas: HTMLCanvasElement) => {
	const dataURL = canvas.toDataURL('image/png')
	const currWin = remote.getCurrentWindow
	ipcRenderer.send('download', { currWin, dataURL })
}
