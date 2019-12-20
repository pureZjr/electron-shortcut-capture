import {
	BrowserWindow,
	screen,
	ipcMain,
	dialog,
	clipboard,
	nativeImage,
	globalShortcut
} from 'electron'
import { EventEmitter } from 'events'

import browserWindowProps from './browserWindowProps'
import { events } from '../constant'

export default class electronShortcutCapture {
	constructor(props?: ElectronShortcutCapture.IElectronShortcutCaptureProps) {
		this.multiScreen = !!props ? !!props.multiScreen : false
		this.downloadFileprefix = !!props ? props.downloadFileprefix || '' : ''
		this.onClipboard = !!props ? props.onClipboard : null
		this.key = !!props ? props.key : ''
		this.onHide = !!props ? props.onHide : null
		this.initWin()
		this.bindHide()
		this.bindClipboard()
		this.bindDownload()
		this.listenCapturingDisplayId()
		this.bindKey()
	}

	// 显示器数组
	private captureWins: BrowserWindow[] = []
	// 当前需要操作显示器数组
	private handleCaptureWins: BrowserWindow[] = []
	// 允许多屏幕
	private multiScreen: boolean = false
	// 快捷键
	private key: string = ''
	// 屏幕信息
	private displays: Electron.Display[] = []
	// 正在截图
	private shortcuting: boolean = false
	private downloadFileprefix: string = ''
	private onClipboard: (data: Electron.NativeImage) => void = null
	private onHide: () => void = null

	static URL =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8888'
			: `file://${require('path').join(
					__dirname,
					'../renderer/index.html'
			  )}`

	/**
	 * 获取当前鼠标所在的屏幕
	 */
	private getCurrentFocusDisplay = () => {
		const mousePoint = screen.getCursorScreenPoint()
		const display = screen.getDisplayNearestPoint(mousePoint)
		return display
	}

	/**
	 * 初始化窗口,打开预备窗口供使用，不用每次重新创建
	 */
	private initWin() {
		// 获取设备所有显示器
		this.displays = screen.getAllDisplays()
		this.captureWins = this.displays.map(display => {
			const captureWin = new BrowserWindow(browserWindowProps(display))
			return captureWin
		})
		this.captureWins.forEach(v => {
			v.loadURL(electronShortcutCapture.URL)
		})
	}

	/**
	 * 打开截图
	 */
	show() {
		if (this.shortcuting) {
			return console.log('正在截图')
		}
		this.listenEsc()
		this.shortcuting = true
		this.handleCaptureWins = this.captureWins
		let currentFocusDisplay = this.getCurrentFocusDisplay()
		if (!this.multiScreen) {
			this.handleCaptureWins = this.captureWins.filter((_, idx) => {
				return this.displays[idx].id === currentFocusDisplay.id
			})
		}
		this.handleCaptureWins.forEach((v, idx) => {
			currentFocusDisplay = !this.multiScreen
				? currentFocusDisplay
				: this.displays[idx]

			this.getScreenSources({
				win: v,
				displayId: currentFocusDisplay.id,
				width: currentFocusDisplay.size.width,
				height: currentFocusDisplay.size.height
			})

			// 设置窗口可以在全屏窗口之上显示。
			v.setVisibleOnAllWorkspaces(true)
			v.setAlwaysOnTop(true, 'screen-saver')
			v.setBackgroundColor('#00000000')
			v.show()
		})
	}

	/**
	 * 绑定窗口隐藏事件
	 */
	private bindHide() {
		ipcMain.on(events.close, () => {
			this.hide(true)
		})
	}

	hide(autoRunReopen?: boolean) {
		this.handleCaptureWins.forEach(v => {
			v.setVisibleOnAllWorkspaces(false)
			v.hide()
			v.webContents.send(events.close)
			v.setBackgroundColor('#30000000')
		})
		this.shortcuting = false
		this.unListenEsc()
		if (autoRunReopen && require('os').platform() !== 'darwin') {
			this.reopen()
		}
		if (this.onHide) {
			this.onHide()
		}
	}

	/**
	 * 重新打开，win上面用获取的截图有问题
	 */
	private reopen() {
		this.handleCaptureWins.forEach(v => {
			v.close()
		})
		this.captureWins = []
		this.initWin()
	}

	/**
	 * 监听下载事件
	 */
	private bindDownload() {
		ipcMain.on(events.download, (_, { dataURL }) => {
			this.hide()
			const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')
			const dataBuffer = Buffer.from(base64Data, 'base64')
			const filename =
				this.downloadFileprefix + new Date().getTime() + '.png'
			const path = dialog.showSaveDialogSync({
				defaultPath: filename
			})
			if (!path) {
				return console.log('取消下载')
			}
			try {
				require('fs').writeFileSync(path, dataBuffer)
			} catch (err) {
				console.log('下载失败：' + err)
			}
			if (require('os').platform() !== 'darwin') {
				this.reopen()
			}
		})
	}

	/**
	 * 绑定剪贴板事件
	 */
	private bindClipboard() {
		ipcMain.on(events.clipboard, (_, dataURL) => {
			const data = nativeImage.createFromDataURL(dataURL)
			clipboard.writeImage(data)
			if (typeof this.onClipboard === 'function') {
				this.onClipboard(dataURL)
			}
			this.hide(true)
		})
	}

	/**
	 * 监听接收的操作截图的显示器id
	 */
	private listenCapturingDisplayId() {
		ipcMain.on(events.setCapturingDisplayId, (_, displayId: number) => {
			this.handleCaptureWins.forEach(v => {
				v.webContents.send(events.receiveCapturingDisplayId, displayId)
			})
		})
	}

	/**
	 * 主线程调用desktopCapturer获取显示器背景
	 */
	private getScreenSources = (args: {
		win: BrowserWindow
		displayId: number
		width: number
		height: number
	}) => {
		let desktopCapture = (process as any)
			.electronBinding('desktop_capturer')
			.createDesktopCapturer()

		const stopRunning = () => {
			if (desktopCapture) {
				desktopCapture.emit = null
				desktopCapture = null
			}
		}
		const emitter = new EventEmitter()
		emitter.once(
			'finished',
			(_, sources: Electron.DesktopCapturerSource[]) => {
				stopRunning()
				for (let i = 0; i < sources.length; i++) {
					// 这里正常情况下是要判断display_id的,不知道win7的display为毛是空的，所以多做一个判断display_id为空的判断
					if (
						Number(sources[i].display_id) ===
							Number(args.displayId) ||
						sources[i].display_id === ''
					) {
						args.win.webContents.send(events.screenSourcesToPng, {
							toPngSource: sources[i].thumbnail.toPNG(),
							width: args.width,
							height: args.height
						})
						break
					}
				}
			}
		)
		desktopCapture.emit = emitter.emit.bind(emitter)
		desktopCapture.startHandling(
			false,
			true,
			{ width: args.width, height: args.height },
			true
		)
	}

	/**
	 * 监听esc退出
	 */
	private listenEsc = () => {
		globalShortcut.register('esc', () => {
			this.hide(true)
		})
	}

	/**
	 * 取消监听esc退出
	 */
	private unListenEsc = () => {
		globalShortcut.unregister('esc')
	}

	/**
	 * 绑定截图快捷键
	 */
	private bindKey = () => {
		if (this.key) {
			globalShortcut.register(this.key, () => {
				this.show()
			})
		}
	}
	/**
	 * 更新快捷键
	 */
	updateBindKey = (key: string) => {
		if (key) {
			try {
				if (this.key) {
					globalShortcut.unregister(this.key)
				}
				this.key = key
				globalShortcut.register(key, () => {
					this.show()
				})
			} catch {
				this.key = ''
			}
		} else {
			try {
				globalShortcut.unregister(this.key)
				this.key = key
			} catch {
				this.key = ''
			}
		}
	}
}
