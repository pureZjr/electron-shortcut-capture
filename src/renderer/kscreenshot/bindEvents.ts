import { remote } from "electron";
import { ipcRenderer } from "electron";

interface IProps {
  key: string;
  startScreenShot: () => void;
  cancelCB: () => void;
}

class BindEvents {
  constructor(props: IProps) {
    this.key = props.key;
    this.startScreenShot = props.startScreenShot;
    this.bindStart();
    this.bindEnd();
  }

  private key = "";
  private startScreenShot = null;
  private cancelCB = null;

  /**
   * 调用开启截图
   */
  show = () => {
    ipcRenderer.send("ShortcutCapture::SHOW");
  };

  /**
   * 调用关闭截图
   */
  hide = () => {
    ipcRenderer.send("ShortcutCapture::HIDE");
  };

  bindStart = () => {
    remote.globalShortcut.register(this.key, () => {
      if (typeof this.startScreenShot === "function") {
        this.startScreenShot();
      }
      this.show();
    });
  };

  bindEnd = () => {
    remote.globalShortcut.register("esc", () => {
      endAndClear(this);
      if (typeof this.cancelCB === "function") {
        this.cancelCB();
      }
      this.hide();
    });
  };
}

export default BindEvents;
