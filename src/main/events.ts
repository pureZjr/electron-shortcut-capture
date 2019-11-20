import { ipcMain, BrowserWindow, globalShortcut, dialog } from 'electron'
import fs from 'fs'

class Events {
	constructor(props) {
		console.log('init')
		this.captureWins = props.captureWins
		this.bindOnShow()
		this.bindOnHide()
		this.bindEsc()
		this.show()
		this.bindDownload()
	}

	// 显示器数组
	private captureWins: BrowserWindow[] = []
	// 正在截屏
	private isCapturing = false

	/**
	 * 绑定窗口显示事件
	 */
	bindOnShow() {
		ipcMain.on('ShortcutCapture::SHOW', () => {
			this.show()
		})
	}

	show() {
		if (this.isCapturing) {
			return
		} else {
			this.isCapturing = true
			this.captureWins.map((v, idx) => {
				v.loadURL(`http://localhost:8081`)
				v.setVisibleOnAllWorkspaces(true)
				v.show()
			})
		}
	}

	/**
	 * 绑定窗口隐藏事件
	 */
	bindOnHide() {
		ipcMain.on('ShortcutCapture::HIDE', () => {
			this.hide()
		})
	}

	hide() {
		this.isCapturing = false
		this.captureWins.map((v, idx) => {
			v.setVisibleOnAllWorkspaces(false)
			v.hide()
			v.close()
			v = null
		})
		this.captureWins = []
		this.unBindEsc()
	}

	/**
	 * 绑定esc退出截图
	 */
	bindEsc() {
		globalShortcut.register('esc', () => {
			this.hide()
		})
	}

	/**
	 * 解绑esc退出截图
	 */
	unBindEsc() {
		globalShortcut.unregister('esc')
	}

	/**
	 * 监听下载事件
	 */
	bindDownload() {
		ipcMain.on('download', (_, { currWin, dataURL }) => {
			const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')
			const dataBuffer = new Buffer(base64Data, 'base64')
			const filename = new Date().getTime() + '.png'
			const path = dialog.showSaveDialogSync(currWin, {
				defaultPath: filename
			})
			try {
				fs.writeFileSync(path, dataBuffer)
			} catch (err) {
				console.log('下载失败：' + err)
			}
			this.hide()
		})
	}
}

export default Events
