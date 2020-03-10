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
import { execFile } from 'child_process'

import browserWindowProps from './browserWindowProps'
import { events } from '../constant'

interface IBrowserWindow extends BrowserWindow {
	displayId: number
}

export default class electronShortcutCapture {
	constructor(props?: ElectronShortcutCapture.IElectronShortcutCaptureProps) {
		this.multiScreen = !!props ? !!props.multiScreen : false
		this.downloadFileprefix = !!props ? props.downloadFileprefix || '' : ''
		this.onClipboard = !!props ? props.onClipboard : null
		this.key = !!props ? props.key : ''
		this.onHide = !!props ? props.onHide : null
		this.onShow = !!props ? props.onShow : null
		this.onShowByKey = !!props ? props.onShowByKey : null
		this.winHD = !!props ? props.winHD : false
		this.initWin()
		this.bindHide()
		this.bindClipboard()
		this.bindDownload()
		this.listenCapturingDisplayId()
		this.bindKey()
		this.listenDisplayNumChange()
		this.getLoadedPageDisplayId()
	}

	// 显示器数组
	private captureWins: IBrowserWindow[] = []
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
	private onShow: () => void = null
	private onShowByKey: () => Promise<void> = null
	// 屏幕大小以及获取屏幕资源的宽高
	private screenInfo: any = {}
	// 正在下载
	private isDownloading: boolean = false
	// 已经加载完毕的页面的displayId
	private loadedPageDisplayIds: number[] = []

	static isWin = require('os').platform() !== 'darwin'
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
		const currDisplay = screen.getDisplayNearestPoint(mousePoint)
		return { currDisplay, mousePoint }
	}

	/**
	 * 设置屏幕大小以及获取屏幕资源的宽高
	 */
	setScreenInfo = (display: Electron.Display) => {
		this.screenInfo[display.id] = {
			width: display.size.width,
			height: display.size.height
		}
		this.screenInfo['cutWidth'] =
			!!this.screenInfo['cutWidth'] &&
			this.screenInfo['cutWidth'] > display.size.width
				? this.screenInfo['cutWidth']
				: display.size.width
		this.screenInfo['cutHeight'] =
			!!this.screenInfo['cutHeight'] &&
			this.screenInfo['cutHeight'] > display.size.height
				? this.screenInfo['cutHeight']
				: display.size.height
	}

	/**
	 * 初始化窗口,打开预备窗口供使用，不用每次重新创建
	 */
	private async initWin() {
		// 获取设备所有显示器
		this.displays = screen.getAllDisplays()
		this.captureWins = this.displays.map(display => {
			this.setScreenInfo(display)
			const captureWin = new BrowserWindow(browserWindowProps(display))
			captureWin['displayId'] = display.id
			return captureWin
		}) as IBrowserWindow[]
		this.captureWins.forEach(v => {
			v.loadURL(electronShortcutCapture.URL)
		})
	}

	/**
	 * 打开截图
	 */
	async show() {
		if (this.shortcuting && this.shortCutScreenIsOpened()) {
			return console.log('正在截图')
		}
		if (this.isDownloading) {
			return console.log('正在执行下载操作')
		}
		if (!this.captureWins.length) {
			return console.log('当前没有窗口')
		}
		if (this.loadedPageDisplayIds.length !== this.captureWins.length) {
			return console.log('页面没完全加载')
		}

		// 只处理一个显示器
		const handleSingleDisplay =
			!this.multiScreen || this.captureWins.length === 1
		const isGetWinHD =
			electronShortcutCapture.isWin && handleSingleDisplay && this.winHD
		try {
			// window平台、单屏幕模式、只有一个屏幕使用高清截图方案
			if (isGetWinHD) {
				await this.getPrintScreen()
			}
		} catch {
			return false
		}

		this.shortcuting = true
		if (this.onShow) {
			this.onShow()
		}
		/**
		 * 获取显示器信息
		 * 用不同显示器的最大宽高去获取资源，减少获取资源的次数
		 */
		const cutWidth = this.screenInfo.cutWidth
		const cutHeight = this.screenInfo.cutHeight

		const sources = await this.getScreenSources(cutWidth, cutHeight)
		// 判断获取DisplayId是否为空
		const displayIdEmpty = sources.some(v => !v.display_id)
		if (displayIdEmpty) {
			this.multiScreen = false
		}

		// 当前显示器和鼠标位置
		const { currDisplay, mousePoint } = this.getCurrentFocusDisplay()
		const mouseX = mousePoint.x
		const mouseY = mousePoint.y
		console.log(currDisplay)
		if (this.multiScreen) {
			for (let i = 0; i < sources.length; i++) {
				const win = this.captureWins[i]

				const source = sources[i]
				const sourcePng = this.getSourcePng(source)

				const width = this.screenInfo[source.display_id].width
				const height = this.screenInfo[source.display_id].height
				const actuallyWidth = win.getBounds().width
				const actuallyHeight = win.getBounds().height

				win.webContents.send(events.screenSourcesToPng, {
					toPngSource: sourcePng,
					width,
					height,
					actuallyWidth,
					actuallyHeight,
					mouseX,
					mouseY,
					displayId: sources[i].display_id,
					isWinHD: isGetWinHD
				})
				// 设置窗口可以在全屏窗口之上显示。
				win.setVisibleOnAllWorkspaces(true)
				win.setAlwaysOnTop(true, 'screen-saver')
				win.setBackgroundColor('#00000000')
				// 等资源传到渲染线程再打开截图
				win.setOpacity(0)
				win.show()
				setTimeout(() => {
					win.setOpacity(1)
				}, 300)
			}
		} else {
			let source
			/**
			 * 根据鼠标位置选择source
			 */
			const currentFocusDisplayId = currDisplay.id.toString()
			source = sources.filter(
				v => v.display_id === currentFocusDisplayId
			)[0]
			if (!source) {
				const sourceIndex = Object.keys(this.screenInfo).findIndex(
					displayId => displayId === currentFocusDisplayId
				)
				source = sources[sourceIndex]
			}

			const win = this.captureWins.filter(v => {
				return v.displayId === currDisplay.id
			})[0]
			const { width, height } = this.screenInfo[currDisplay.id]
			const actuallyWidth = win.getBounds().width
			const actuallyHeight = win.getBounds().height
			win.webContents.send(events.screenSourcesToPng, {
				toPngSource: this.getSourcePng(isGetWinHD ? null : source),
				width: width,
				height: height,
				actuallyWidth,
				actuallyHeight,
				mouseX,
				mouseY,
				displayId: currentFocusDisplayId,
				isWinHD: isGetWinHD
			})

			// 设置窗口可以在全屏窗口之上显示。
			win.setVisibleOnAllWorkspaces(true)
			win.setAlwaysOnTop(true, 'screen-saver')
			win.setBackgroundColor('#00000000')
			win.setOpacity(0)
			win.show()
			setTimeout(() => {
				win.setOpacity(1)
			}, 300)
		}
		// 等页面打开再绑定关闭截图事件
		this.listenEsc()
	}

	/**
	 * 绑定窗口隐藏事件
	 */
	private bindHide() {
		ipcMain.on(events.close, (_, notification) => {
			this.hide(notification)
		})
	}

	/**
	 * @param notification 是否需要通知渲染线程
	 * */

	hide(notification = true) {
		if (!this.shortCutScreenIsOpened()) {
			return console.log('截图没完全打开')
		}
		this.loadedPageDisplayIds = []
		this.shortcuting = false
		this.captureWins.forEach(v => {
			v.webContents.send(events.receiveCapturingDisplayId, 0)
			v.setVisibleOnAllWorkspaces(false)
			v.hide()
			if (notification) {
				v.webContents.send(events.close)
			}
			v.setBackgroundColor('#30000000')
		})
		this.unListenEsc()
		if (this.onHide) {
			this.onHide()
		}
	}

	/**
	 * 监听下载事件
	 */
	private bindDownload() {
		ipcMain.on(events.download, (_, { dataURL }) => {
			this.isDownloading = true
			this.hide()
			const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '')
			const dataBuffer = Buffer.from(base64Data, 'base64')
			const filename =
				this.downloadFileprefix + new Date().getTime() + '.png'
			const path = dialog.showSaveDialogSync({
				defaultPath: filename
			})
			if (!path) {
				this.isDownloading = false
				return console.log('取消下载')
			}
			try {
				require('fs').writeFileSync(path, dataBuffer)
			} catch (err) {
				console.log('下载失败：' + err)
			}
			this.isDownloading = false
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
			this.hide()
		})
	}

	/**
	 * 监听接收的操作截图的显示器id
	 */
	private listenCapturingDisplayId() {
		ipcMain.on(events.setCapturingDisplayId, (_, displayId: number) => {
			this.captureWins.forEach(v => {
				v.webContents.send(events.receiveCapturingDisplayId, displayId)
			})
		})
	}

	/**
	 * 获取显示器资源
	 */
	private getScreenSources: (
		width: number,
		height: number
	) => Promise<Electron.DesktopCapturerSource[]> = (
		width: number,
		height: number
	) => {
		return new Promise((resolve, reject) => {
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
					resolve(sources)
				}
			)
			desktopCapture.emit = emitter.emit.bind(emitter)
			desktopCapture.startHandling(
				false,
				true,
				{ width: width, height: height },
				true
			)
		})
	}

	/**
	 * 监听esc退出
	 */
	private listenEsc = () => {
		globalShortcut.register('esc', () => {
			this.hide()
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
			globalShortcut.register(this.key, async () => {
				if (!!this.onShowByKey) {
					await this.onShowByKey()
				}
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
				globalShortcut.register(key, async () => {
					if (!!this.onShowByKey) {
						await this.onShowByKey()
					}
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

	/**
	 * 监听显示器数量变化
	 */
	listenDisplayNumChange = () => {
		screen.on('display-metrics-changed', () => {
			console.log('重新初始化')
			this.loadedPageDisplayIds = []
			this.captureWins.forEach(v => {
				v.close()
			})
			this.initWin()
		})
	}

	/**
	 * 获取加载完的显示器的id
	 */
	getLoadedPageDisplayId = () => {
		ipcMain.on(events.loadedPageDisplayId, (_, displayId) => {
			if (this.loadedPageDisplayIds.includes(displayId)) {
				return
			}
			this.loadedPageDisplayIds.push(displayId)
		})
	}

	/**
	 * window 通过剪贴板获取截图
	 */
	getSourcesOnClipboard = () => {
		const source = clipboard.readImage()
		return source
	}

	/**
	 * window 通过剪贴板获取base64
	 */
	getBase64OnClipboard = () => {
		const base64 = clipboard.readText()
		return `data:image/jpeg;base64,${base64}`
	}

	/**
	 * 截图放到剪贴板
	 */
	getPrintScreen = () => {
		return new Promise((resolve, reject) => {
			try {
				const getPrintScreen = execFile(
					require('path').resolve(__dirname, './printScreen.exe')
				)
				getPrintScreen.once('exit', () => {
					resolve(true)
				})
			} catch {
				reject(false)
			}
		})
	}

	/**
	 * 截图窗口完全打开
	 */
	shortCutScreenIsOpened = () => {
		return this.multiScreen
			? this.captureWins.every(win => win.isVisible())
			: this.captureWins.some(win => win.isVisible())
	}

	/**
	 * 获取图片资源
	 */
	getSourcePng = (source?: Electron.DesktopCapturerSource) => {
		if (!!source) {
			return source.thumbnail.toJPEG(100)
		} else {
			return this.getBase64OnClipboard()
		}
	}
}
