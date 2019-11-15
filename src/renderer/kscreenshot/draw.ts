import { remote } from "electron";

interface IProps {}

class Draw {
  constructor(props: IProps) {}

  /**
   * 取消右键事件
   */
  cancelContextMenu() {
    document.addEventListener("contextmenu", e => {
      e.preventDefault();
      hide();
    });
  }

  /**
   * 开始框图
   */
  startDrawDown = e => {
    //
    document.addEventListener("mouseup", this.cancelDrawingStatus);
    document.addEventListener("contextmenu", this.preventContextMenu);
    // 当不是鼠标左键时立即返回
    if (e.button !== 0) {
      return;
    }

    if (this.drawingStatus !== null) {
      return;
    }
    this.drawingStatus = 1;

    this.startX = e.clientX;
    this.startY = e.clientY;
    //移除并添加
    remove(document.getElementById("kssScreenShotWrapper"));
    const kssScreenShotWrapper = document.createElement("div");
    kssScreenShotWrapper.id = "kssScreenShotWrapper";
    this.kssScreenShotWrapper = kssScreenShotWrapper;
    const kssTextLayer = document.createElement("div");
    kssTextLayer.id = "kssTextLayer";
    this.kssTextLayer = kssTextLayer;
    kssScreenShotWrapper.appendChild(kssTextLayer);
    document.body.appendChild(kssScreenShotWrapper);
    document.addEventListener("mousemove", this.drawing);
    document.addEventListener("mouseup", this.endDraw);
  };

  /**
   * 取消截图
   */
  cancelDrawingStatus = e => {
    if (e.button === 2) {
      // 鼠标右键取消框图
      if (this.drawingStatus === null) {
        document.removeEventListener("mouseup", this.cancelDrawingStatus);
        document.removeEventListener("contextmenu", this.preventContextMenu);
        endAndClear(this);
        this.cancelCB();
        return;
      }
      remove(this.kssScreenShotWrapper);
      this.kssScreenShotWrapper = null;
      this.kssTextLayer = null;
      this.rectangleCanvas = null;
      this.drawingStatus = null;
      this.isEdit = false;
      this.snapshootList = [];
      this.currentToolType = null;
      this.toolmousedown = null;
      this.toolmousemove = null;
      this.toolmouseup = null;
      this.kss.addEventListener("mousedown", this.startDrawDown);
    }
  };
}

export default Draw;
