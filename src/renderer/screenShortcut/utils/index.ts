import { remote, ipcRenderer } from 'electron'

import { events } from '@constant'

/**
 * 获取显示器资源
 */
export const getSource = (
	cb: (source: ElectronShortcutCapture.ISource) => void
) => {
	ipcRenderer.on(
		events.screenSourcesToPng,
		(
			_,
			{
				toPngSource,
				width,
				height,
				mouseX,
				mouseY,
				displayId,
				scaleFactor
			}
		) => {
			cb({
				toPngSource,
				width,
				height,
				mouseX,
				mouseY,
				displayId,
				scaleFactor
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

// 处理canvas
function handleCanvas(canvas: HTMLCanvasElement) {
	const scaleFactor = window['scaleFactor']
	const inputAreas = document.getElementsByClassName('input-area')
	if (!!inputAreas.length) {
		for (let i = 0; i < inputAreas.length; i++) {
			const ctx = canvas.getContext('2d')
			const inputArea = inputAreas[i] as HTMLDivElement
			const x = (inputArea.offsetLeft + 6) * scaleFactor
			const y = (inputArea.offsetTop + 10) * scaleFactor
			const maxWidth = inputArea.clientWidth * scaleFactor
			const fontSize = parseInt(inputArea.style.fontSize) * scaleFactor
			const color = inputArea.style.color
			const itemHeight =
				((inputArea.clientHeight - 12) / inputArea.childNodes.length) *
				scaleFactor
			ctx.font = `${fontSize}px Arial`
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
export const close = (notification = true) => {
	ipcRenderer.send(events.close, notification)
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
export const onShortcutScreenClose = cd => {
	ipcRenderer.on(events.close, () => {
		cd()
	})
}
