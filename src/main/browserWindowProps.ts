import { BrowserWindowConstructorOptions } from 'electron'

const browserWindowProps = (
	display: Electron.Display
): BrowserWindowConstructorOptions => {
	return {
		title: 'shortcut-capture',
		width: display.bounds.width,
		height: display.bounds.height,
		x: display.bounds.x,
		y: display.bounds.y,
		// type: 'textured',
		useContentSize: true,
		frame: false,
		show: false,
		transparent:
			process.platform === 'darwin' || process.platform === 'win32',
		// 窗口不可以可以改变尺寸
		resizable: false,
		// 窗口不可以拖动
		movable: false,
		// 全屏窗口
		fullscreen: process.platform === 'darwin' ? false : true,
		// 在 macOS 上使用 pre-Lion 全屏
		simpleFullscreen: true,
		backgroundColor: '#30000000',
		// 隐藏标题栏, 内容充满整个窗口
		titleBarStyle: 'default',
		// 窗口允许大于屏幕
		focusable: true,
		enableLargerThanScreen: true,
		// 是否在任务栏中显示窗口
		skipTaskbar: process.platform === 'darwin' ? false : true,
		// 窗口不可以最小化
		minimizable: false,
		// 窗口不可以最大化
		maximizable: false,
		hasShadow: false,
		webPreferences: {
			//集成Node
			nodeIntegration: true,
			// 允许渲染线程使用remote模块
			enableRemoteModule: true
		}
	}
}

export default browserWindowProps
