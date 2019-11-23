import {
	BrowserWindow,
	screen,
	ipcMain,
	dialog,
	clipboard,
	nativeImage
} from 'electron'

import browserWindowProps from './browserWindowProps'
import { events } from '../constant'

export default class electronShortcutCapture {
	constructor(props?: ElectronShortcutCapture.IElectronShortcutCaptureProps) {
		this.bindClose()
		this.bindClipboard()
		this.bindDownload()
		this.listenCapturingDisplayId()
		this.multiScreen = !!props ? !!props.multiScreen : false
	}
	// 显示器数组
	private captureWins: BrowserWindow[] = []
	// 允许多屏幕
	private multiScreen: boolean = false

	static URL =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8888'
			: `file://${require('path').join(
					__dirname,
					'../renderer/index.html'
			  )}`

	/**
	 * 初始化窗口
	 */
	private initWin() {
		let displays: Electron.Display[] = []
		if (!this.multiScreen) {
			const mousePoint = screen.getCursorScreenPoint()
			const display = screen.getDisplayNearestPoint(mousePoint)
			displays = [display]
		} else {
			// 获取设备所有显示器
			displays = screen.getAllDisplays()
		}
		this.captureWins = displays.map(display => {
			const captureWin = new BrowserWindow(browserWindowProps(display))
			return captureWin
		})

		this.captureWins.map((v, idx) => {
			v.loadURL(electronShortcutCapture.URL)
			v.setVisibleOnAllWorkspaces(true)
			v.setAlwaysOnTop(true, 'screen-saver')
		})
	}

	/**
	 * 打开截图
	 */
	show() {
		this.initWin()
	}

	/**
	 * 绑定窗口隐藏事件
	 */
	private bindClose() {
		ipcMain.on(events.close, () => {
			this.close()
		})
	}

	close() {
		this.captureWins.map((v, idx) => {
			v.setVisibleOnAllWorkspaces(false)
			v.close()
			v = null
		})
		this.captureWins = []
	}

	private hide() {
		this.captureWins.map((v, idx) => {
			v.hide()
		})
	}

	/**
	 * 监听下载事件
	 */
	private bindDownload() {
		ipcMain.on(events.download, (_, { currWin, dataURL }) => {
			this.hide()
			const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')
			const dataBuffer = Buffer.from(base64Data, 'base64')
			const filename = new Date().getTime() + '.png'
			const path = dialog.showSaveDialogSync({
				defaultPath: filename
			})
			try {
				require('fs').writeFileSync(path, dataBuffer)
			} catch (err) {
				console.log('下载失败：' + err)
			}
			this.close()
		})
	}

	/**
	 * 绑定剪贴板事件
	 */
	private bindClipboard() {
		ipcMain.on(events.clipboard, (_, dataURL) => {
			clipboard.writeImage(nativeImage.createFromDataURL(dataURL))
			this.close()
		})
	}

	/**
	 * 监听接收的操作截图的显示器id
	 */
	private listenCapturingDisplayId() {
		ipcMain.on(events.setCapturingDisplayId, (_, displayId: number) => {
			this.captureWins.map(v => {
				v.webContents.send(events.receiveCapturingDisplayId, displayId)
			})
		})
	}
}
