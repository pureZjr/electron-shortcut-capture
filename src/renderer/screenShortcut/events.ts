import { ipcRenderer } from 'electron'

import { events } from '../../constant'

// 处理canvas
function handleCanvas(canvas: HTMLCanvasElement) {
	const inputAreas = document.getElementsByClassName('input-area')
	if (!!inputAreas.length) {
		for (let i = 0; i < inputAreas.length; i++) {
			const ctx = canvas.getContext('2d')
			const inputArea = inputAreas[i] as HTMLDivElement
			const x = inputArea.offsetLeft + 6
			const y = inputArea.offsetTop + 10
			const maxWidth = inputArea.clientWidth
			const fontSize = inputArea.style.fontSize
			const color = inputArea.style.color
			const itemHeight =
				(inputArea.clientHeight - 12) / inputArea.childNodes.length
			ctx.font = `${fontSize} Arial`
			ctx.fillStyle = color
			let lastTextY = y
			ctx.textBaseline = 'alphabetic'
			inputArea.childNodes.forEach((v, idx) => {
				const text = v.textContent
				const textY = lastTextY + (!!idx ? itemHeight : itemHeight / 2)
				lastTextY = textY
				ctx.fillText(text, x, textY, maxWidth)
			})
			inputArea.style.display = 'none'
		}
	}

	const dataURL = canvas.toDataURL('image/png')
	return dataURL
}

/**
 * 关闭截图
 */
export const close = () => {
	ipcRenderer.send(events.close)
}

/**
 * 下载图片
 */
export const download = (canvas: HTMLCanvasElement) => {
	ipcRenderer.send(events.download, { dataURL: handleCanvas(canvas) })
}

/**
 * 剪贴板
 */
export const clipboard = (canvas: HTMLCanvasElement) => {
	ipcRenderer.send(events.clipboard, handleCanvas(canvas))
}

/**
 * 当前正在截图的显示器
 */
export const setCapturingDisplay = (displayId: number) => {
	ipcRenderer.send(events.setCapturingDisplayId, displayId)
}

/**
 * 监听关闭截图
 */
export const listenClose = () => {
	ipcRenderer.on(events.close, () => {
		window.location.reload()
	})
}
