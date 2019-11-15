import { BrowserWindowConstructorOptions } from "electron";

const browserWindowProps = (
  display: Electron.Display
): BrowserWindowConstructorOptions => {
  return {
    title: "shortcut-capture",
    width: display.bounds.width,
    height: display.bounds.height,
    x: display.bounds.x,
    y: display.bounds.y,
    type: "desktop",
    useContentSize: true,
    frame: false,
    show: true,
    autoHideMenuBar: true,
    transparent: process.platform === "darwin" || process.platform === "win32",
    // 窗口不可以可以改变尺寸
    resizable: false,
    // 窗口不可以拖动
    movable: false,
    focusable: process.platform === "win32",
    // 全屏窗口
    fullscreen: true,
    // 在 macOS 上使用 pre-Lion 全屏
    simpleFullscreen: true,
    backgroundColor: "#30000000",
    // 隐藏标题栏, 内容充满整个窗口
    titleBarStyle: "hidden",
    // 窗口永远在别的窗口的上面
    alwaysOnTop:
      process.env.NODE_ENV === "production" || process.platform === "darwin",
    // 窗口允许大于屏幕
    enableLargerThanScreen: true,
    // 是否在任务栏中显示窗口
    skipTaskbar: process.env.NODE_ENV === "production",
    // 窗口不可以最小化
    minimizable: false,
    // 窗口不可以最大化
    maximizable: false,
    webPreferences: {
      //集成Node
      nodeIntegration: true
    }
  };
};

export default browserWindowProps;
