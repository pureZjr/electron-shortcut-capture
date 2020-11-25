import {
	BrowserWindow,
	screen,
	ipcMain,
	dialog,
	clipboard,
	nativeImage,
	globalShortcut
} from 'electron'

interface Process extends NodeJS.Process {
	_linkedBinding: (name: string) => any
}

const util = require('util')

import browserWindowProps from './browserWindowProps'
import { events } from '../constant'

interface IBrowserWindow extends BrowserWindow {
	displayId: number
}

export default class ElectronShortcutCapture {
	constructor(props?: ElectronShortcutCapture.IElectronShortcutCaptureProps) {
		this.multiScreen = !!props ? !!props.multiScreen : false
		this.downloadFileprefix = !!props ? props.downloadFileprefix || '' : ''
		this.onClipboard = !!props ? props.onClipboard : null
		this.key = !!props ? props.key : ''
		this.onHide = !!props ? props.onHide : null
		this.onShow = !!props ? props.onShow : null
		this.onShowByKey = !!props ? props.onShowByKey : null
		this.getLogger =
			!!props && !!props.getLogger
				? (logger: string) => {
						props.getLogger(logger)
				  }
				: (logger: string) => {
						console.log(logger)
				  }
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
	private multiScreen = false
	// 快捷键
	private key = ''
	// 屏幕信息
	private displays: Electron.Display[] = []
	// 正在截图
	private shortcuting = false
	private downloadFileprefix = ''
	// 屏幕大小以及获取屏幕资源的宽高
	private screenInfo = {}
	// 正在下载
	private isDownloading = false
	// 已经加载完毕的页面的displayId
	private loadedPageDisplayIds: number[] = []
	// 点击完成返回剪贴板内容
	private onClipboard: (data: Electron.NativeImage) => void = null
	// 关闭截图回调
	private onHide: () => void = null
	// 打开截图回调
	private onShow: () => void = null
	// 快捷键打开截图回调
	private onShowByKey: () => Promise<void> = null
	// 截图logger
	private getLogger: (log: string) => void = null

	static isWin = require('os').platform() !== 'darwin'
	static URL =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8888'
			: `file://${require('path').join(
					__dirname,
					'../renderer/index.html'
			  )}`

	/**
	 * 获取当前鼠标位置和所在的屏幕
	 */
	private getCurrentFocusDisplay = () => {
		const mousePoint = screen.getCursorScreenPoint()
		const currDisplay = screen.getDisplayNearestPoint(mousePoint)
		return { mousePoint, currDisplay }
	}

	/**
	 * 设置屏幕大小以及获取屏幕资源的宽高
	 */
	setScreenInfo = (display: Electron.Display) => {
		this.getLogger(`setScreenInfo-display${util.inspect(display)}`)
		this.screenInfo[display.id] = {}
		this.screenInfo['cutWidth'] =
			!!this.screenInfo['cutWidth'] &&
			this.screenInfo['cutWidth'] >
				display.size.width * display.scaleFactor
				? this.screenInfo['cutWidth']
				: display.size.width * display.scaleFactor
		this.screenInfo['cutHeight'] =
			!!this.screenInfo['cutHeight'] &&
			this.screenInfo['cutHeight'] >
				display.size.height * display.scaleFactor
				? this.screenInfo['cutHeight']
				: display.size.height * display.scaleFactor
	}

	/**
	 * 初始化窗口,打开预备窗口供使用，不用每次重新创建
	 */
	private async initWin() {
		// 获取设备所有显示器
		this.displays = screen.getAllDisplays()
		this.getLogger('初始化截图')
		this.captureWins = this.displays.map(display => {
			this.setScreenInfo(display)
			const captureWin = new BrowserWindow(browserWindowProps(display))
			captureWin['displayId'] = display.id
			return captureWin
		}) as IBrowserWindow[]
		this.getLogger(`设备数量：${this.captureWins.length}`)
		this.captureWins.forEach(v => {
			v.loadURL(ElectronShortcutCapture.URL)
		})
	}

	/**
	 * 打开截图
	 */
	async show() {
		try {
			if (this.shortcuting && this.shortCutScreenIsOpened()) {
				return this.getLogger('正在截图')
			}
			if (this.isDownloading) {
				return this.getLogger('正在执行下载操作')
			}
			if (!this.captureWins.length) {
				return this.getLogger('当前没有窗口')
			}
			if (this.loadedPageDisplayIds.length !== this.captureWins.length) {
				return this.getLogger('页面没完全加载')
			}

			this.shortcuting = true
			this.getLogger('开始截图')
			// 打开截图回调
			if (typeof this.onShow === 'function') {
				this.onShow()
			}
			/**
			 * 获取显示器信息
			 * 用不同显示器的最大宽高去获取资源，减少获取资源的次数
			 */
			const cutWidth = this.screenInfo['cutWidth']
			const cutHeight = this.screenInfo['cutHeight']
			this.getLogger(`screenInfo：${util.inspect(this.screenInfo)}`)
			this.getLogger(`截图宽高：${cutWidth} X ${cutHeight}`)
			const sources = await this.getScreenSources(cutWidth, cutHeight)
			console.log(sources)
			this.getLogger(
				`截图sources：${util.inspect(sources, { depth: null })}`
			)
			/**
			 * 判断获取DisplayId是否为空,
			 * 有些电脑获取到的id为空的，就将截图操作重置为单显示器方式
			 */
			const displayIdEmpty = sources.some(v => !v.display_id)
			this.getLogger(
				`${
					displayIdEmpty
						? '存在DisplayId是否为空问题'
						: '不存在DisplayId是否为空问题'
				}`
			)
			if (displayIdEmpty) {
				this.multiScreen = false
			}

			// 当前显示器和鼠标位置
			const { currDisplay, mousePoint } = this.getCurrentFocusDisplay()
			const mouseX = mousePoint.x - currDisplay.bounds.x
			const mouseY = mousePoint.y - currDisplay.bounds.y

			const noticeToRenderer = ({
				win,
				source,
				width,
				height,
				displayId,
				scaleFactor
			}) => {
				win.webContents.send(events.screenSourcesToPng, {
					toPngSource: this.getSourcePng(
						source,
						width * scaleFactor,
						height * scaleFactor
					),
					width,
					height,
					mouseX,
					mouseY,
					displayId,
					scaleFactor
				})
				// 设置窗口可以在全屏窗口之上显示。
				win.setVisibleOnAllWorkspaces(true)
				win.setAlwaysOnTop(true, 'screen-saver')
				win.setBackgroundColor('#00000000')
				win.show()
			}

			if (this.multiScreen) {
				for (let i = 0; i < sources.length; i++) {
					const win = this.captureWins[i]
					const display = this.displays[i]
					const source = sources[i]
					const { width, height } = win.getBounds()
					this.getLogger(
						`noticeToRenderer：${util.inspect(
							{
								win,
								source,
								width,
								height,
								displayId: display.id,
								scaleFactor: display.scaleFactor
							},
							{ depth: null }
						)}`
					)
					noticeToRenderer({
						win,
						source,
						width,
						height,
						displayId: display.id,
						scaleFactor: display.scaleFactor
					})
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
				/**
				 * 不能通过displayId获取屏幕资源的话
				 * 就根据显示器的位置去找对应的屏幕资源
				 */
				if (!source) {
					const sourceIndex = Object.keys(this.screenInfo).findIndex(
						displayId => displayId === currentFocusDisplayId
					)
					source = sources[sourceIndex]
				}
				const win = this.captureWins.filter(v => {
					return v.displayId === currDisplay.id
				})[0]
				const { width, height } = win.getBounds()
				this.getLogger(
					`noticeToRenderer：${util.inspect(
						{
							win,
							source,
							width,
							height,
							displayId: currentFocusDisplayId,
							scaleFactor: currDisplay.scaleFactor
						},
						{ depth: null }
					)}`
				)
				noticeToRenderer({
					win,
					source,
					width,
					height,
					displayId: currentFocusDisplayId,
					scaleFactor: currDisplay.scaleFactor
				})
			}
			// 绑定关闭截图事件
			this.listenEsc()
		} catch (err) {
			this.getLogger(
				`打开截图失败：${util.inspect(err, { depth: null })}`
			)
		}
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
	 * 关闭截图
	 * @param notification 是否需要通知渲染线程
	 */

	hide(notification = true) {
		if (!this.shortCutScreenIsOpened()) {
			return this.getLogger('截图没完全打开')
		}
		this.loadedPageDisplayIds = []
		this.shortcuting = false
		this.captureWins.forEach(v => {
			v.webContents.send(events.receiveCapturingDisplayId, 0)
			v.setVisibleOnAllWorkspaces(false)
			if (notification) {
				v.webContents.send(events.close)
			}
			if (this.isDownloading) {
				v.hide()
			}
		})
		this.unListenEsc()
		if (typeof this.onHide === 'function') {
			this.onHide()
		}
		this.getLogger(
			'关闭截图————————————————————————————————————————————————————'
		)
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
				return this.getLogger('取消下载')
			}
			try {
				require('fs').writeFileSync(path, dataBuffer)
			} catch (err) {
				this.getLogger('下载失败：' + err)
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
	private getScreenSources = (
		width: number,
		height: number
	): Promise<Electron.DesktopCapturerSource[]> => {
		return new Promise((resolve, reject) => {
			let desktopCapture = (process as Process)
				._linkedBinding('electron_browser_desktop_capturer')
				.createDesktopCapturer()

			desktopCapture._onerror = (error: string) => {
				stopRunning()
				reject(error)
			}

			desktopCapture._onfinished = (
				sources: Electron.DesktopCapturerSource[]
			) => {
				stopRunning()
				resolve(sources)
			}

			const stopRunning = () => {
				if (desktopCapture) {
					desktopCapture.emit = null
					desktopCapture = null
				}
			}
			desktopCapture.startHandling(
				false,
				true,
				{ width: Math.ceil(width), height: Math.ceil(height) },
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
				if (typeof this.onShowByKey === 'function') {
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
					if (typeof this.onShowByKey === 'function') {
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
			this.reInit()
		})
		screen.on('display-added', () => {
			this.reInit()
		})

		screen.on('display-removed', () => {
			this.reInit()
		})
	}

	/**
	 * 重新初始化
	 */
	reInit = () => {
		this.getLogger(`重新初始化`)
		this.screenInfo = {}
		this.loadedPageDisplayIds = []
		this.captureWins.forEach(v => {
			v.close()
		})
		this.initWin()
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
			this.getLogger(`加载完的显示器id：${displayId}`)
			if (this.loadedPageDisplayIds.length === this.captureWins.length) {
				this.captureWins.forEach(win => {
					win.hide()
				})
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
	getSourcePng = (
		source: Electron.DesktopCapturerSource,
		width: number,
		height: number
	) => {
		return source.thumbnail.resize({ width, height }).toJPEG(100)
	}
}
