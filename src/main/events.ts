import { ipcMain, BrowserWindow, globalShortcut } from "electron";

class Events {
  constructor(props) {
    console.log("init");
    this.captureWins = props.captureWins;
    this.bindOnShow();
    this.bindOnHide();
    this.bindEsc();
    this.show();
  }

  // 显示器数组
  private captureWins: BrowserWindow[] = [];
  // 正在截屏
  private isCapturing = false;

  /**
   * 绑定窗口显示事件
   */
  bindOnShow() {
    ipcMain.on("ShortcutCapture::SHOW", () => {
      this.show();
    });
  }

  show() {
    console.log("show", this.isCapturing);
    if (this.isCapturing) {
      return;
    } else {
      this.isCapturing = true;
      this.captureWins.map((v, idx) => {
        v.loadURL(`http://localhost:8081`);
        v.setVisibleOnAllWorkspaces(true);
        v.show();
      });
    }
  }

  /**
   * 绑定窗口隐藏事件
   */
  bindOnHide() {
    ipcMain.on("ShortcutCapture::HIDE", () => {
      this.hide();
    });
  }

  hide() {
    this.isCapturing = false;
    this.captureWins.map((v, idx) => {
      v.setVisibleOnAllWorkspaces(false);
      v.hide();
      v.close();
      v = null;
    });
    this.captureWins = [];
    this.unBindEsc();
  }

  /**
   * 绑定esc退出截图
   */
  bindEsc() {
    globalShortcut.register("esc", () => {
      this.hide();
    });
  }

  /**
   * 解绑esc退出截图
   */
  unBindEsc() {
    globalShortcut.unregister("esc");
  }
}

export default Events;
