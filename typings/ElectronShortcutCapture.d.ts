declare namespace ElectronShortcutCapture {
	interface IRect {
		x1: number
		y1: number
		x2: number
		y2: number
	}

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
		// window单屏幕高清方案
		winHD?: boolean
		// 点击完成返回剪贴板内容
		onClipboard?: (data: Electron.NativeImage) => void
		// 关闭截图回调
		onHide?: () => void
		// 打开截图回调
		onShow?: () => void
		// 快捷键打开截图回调
		onShowByKey?: () => Promise<void>
	}

	interface ISource {
		width: number
		height: number
		toPngSource: any
		actuallyWidth?: number
		actuallyHeight?: number
		mouseX?: number
		mouseY?: number
		displayId: number
	}

	interface ISettingProps {
		thicknessNum?: number
		color?: string
		fontSize?: number
	}

	interface IBounds {
		height: number
		width: number
		x: number
		y: number
	}
}
