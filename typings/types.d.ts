interface IElectronShortcutCaptureProps {
	/**
	 * 允许多屏幕，默认false，只对当前操作的屏幕进行截图
	 * 使用多屏幕截图有可能导致打开截图变慢
	 */
	multiScreen?: boolean
	// 下载文件前缀
	downloadFileprefix?: string
	// 快捷键
	key?: string
	// 点击完成返回剪贴板内容
	onClipboard?: (data: Electron.NativeImage) => void
	// 结束截图触发
	onHide?: () => void
}

declare class ElectronShortcutCapture {
	constructor(props?: IElectronShortcutCaptureProps)

	show: () => void
	hide: (autoRunReopen?: boolean) => void
	// 更新快捷键
	updateBindKey: (key: string) => void
}

declare module 'electron-shortcut-capture' {
	export = ElectronShortcutCapture
}
