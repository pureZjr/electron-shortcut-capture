import Events from 'events'
import { ipcMain, clipboard, nativeImage, BrowserWindow, globalShortcut } from 'electron'

export default class ShortcutCapture extends Events {
    /**
     * html文件路径地址
     */

    static URL = 'http://localhost:8081'

    // 截图窗口对象
    $win = null

    /**
     * isUseClipboard是否把内容写入到剪切板
     * @param {*} params
     */
    constructor({ isUseClipboard = true } = {}) {
        super()
        this.onShortcutCapture(isUseClipboard)
        this.onShow()
        this.onHide()
    }

    /**
     * 初始化窗口
     */
    initWin() {
        const $win = new BrowserWindow({
            title: 'shortcut-capture',
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            type: 'desktop',
            useContentSize: true,
            frame: false,
            show: false,
            autoHideMenuBar: true,
            transparent: process.platform === 'darwin' || process.platform === 'win32',
            // 窗口不可以可以改变尺寸
            resizable: false,
            // 窗口不可以拖动
            movable: false,
            focusable: process.platform === 'win32',
            // 全屏窗口
            fullscreen: true,
            // 在 macOS 上使用 pre-Lion 全屏
            simpleFullscreen: true,
            backgroundColor: '#30000000',
            // 隐藏标题栏, 内容充满整个窗口
            titleBarStyle: 'hidden',
            // 窗口永远在别的窗口的上面
            alwaysOnTop: process.env.NODE_ENV === 'production' || process.platform === 'darwin',
            // 窗口允许大于屏幕
            enableLargerThanScreen: true,
            // 是否在任务栏中显示窗口
            skipTaskbar: process.env.NODE_ENV === 'production',
            // 窗口不可以最小化
            minimizable: false,
            // 窗口不可以最大化
            maximizable: false,
            webPreferences: {
                //集成Node
                nodeIntegration: true
            }
        })

        // 清除simpleFullscreen状态
        $win.on('close', () => $win.setSimpleFullScreen(false))
        $win.loadURL(ShortcutCapture.URL)
        return $win
    }

    /**
     * 调用截图
     */
    shortcutCapture() {
        if (this.$win) this.$win.close()
        this.$win = this.initWin()
        this.registerESC()
    }

    /**
     * 绑定截图确定后的时间回调
     * @param {*} isUseClipboard
     */
    onShortcutCapture(isUseClipboard) {
        ipcMain.on('ShortcutCapture::CAPTURE', (e, dataURL, bounds) => {
            if (isUseClipboard) {
                clipboard.writeImage(nativeImage.createFromDataURL(dataURL))
            }
            this.emit('capture', { dataURL, bounds })
        })
    }

    /**
     * 绑定窗口显示事件
     */
    onShow() {
        ipcMain.on('ShortcutCapture::SHOW', (e, bounds) => {
            if (!this.$win) return
            this.$win.show()
            console.log('bounds', bounds)
            this.$win.setBounds(bounds)
            this.$win.focus()
            this.$win.on('show', () => {
                this.$win.setBounds(bounds)
                this.$win.focus()
            })
        })
    }

    /**
     * 关闭截图
     */
    close() {
        if (!this.$win) return
        this.$win.hide()
        this.$win.setSimpleFullScreen(false)
        this.$win.close()
        this.$win = null
        globalShortcut.unregister('esc')
    }

    /**
     * 绑定窗口隐藏事件
     */
    onHide() {
        ipcMain.on('ShortcutCapture::HIDE', (e, bounds) => {
            if (!this.$win) return
            this.$win.hide()
            this.$win.setSimpleFullScreen(false)
            this.$win.close()
            this.$win = null
        })
    }

    /**
     * 按esc关闭截图
     */
    registerESC() {
        globalShortcut.register('esc', () => this.close())
    }
}
