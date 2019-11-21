import { BrowserWindow, screen, globalShortcut } from 'electron'

import browserWindowProps from './browserWindowProps'
import BindEvents from './events'

export default class ShortcutCapture {
	constructor() {
		this.bindShortcutCapture()
	}
	// 显示器数组
	private captureWins: BrowserWindow[] = []
	// 是否已经注册开启事件
	private hasRegisterShortcutCapture = false

	/**
	 * 初始化窗口
	 */
	initWin() {
		// 获取设备所有显示器
		const displays = screen.getAllDisplays()
		this.captureWins = displays.map(display => {
			const captureWin = new BrowserWindow(browserWindowProps(display))
			// 清除simpleFullscreen状态
			captureWin.on('close', () => captureWin.setSimpleFullScreen(false))
			return captureWin
		})
		new BindEvents({ captureWins: this.captureWins })
	}

	/**
	 * 绑定快捷键开启截图
	 */
	bindShortcutCapture() {
		if (!this.hasRegisterShortcutCapture) {
			globalShortcut.register('shift+alt+w', () => {
				this.hasRegisterShortcutCapture = true
				this.initWin()
			})
		}
	}
}
