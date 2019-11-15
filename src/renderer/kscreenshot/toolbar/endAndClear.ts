import { remove, removeClass } from "../util";

export default function endAndClear(me) {
  removeClass(document.body, "kssBody");

  // 移除canvas
  me.kss && remove(me.kss);
  // 移除框图的div
  me.kssScreenShotWrapper && remove(me.kssScreenShotWrapper);
  // 移除样式
  me.style && remove(me.style);
  me.kss = null;
  me.rectangleCanvas = null;
  me.kssTextLayer = null;
  me.kssScreenShotWrapper = null;
  me.drawingStatus = null;
  me.toolbar = null;
  me.currentToolType = null;
  me.snapshootList = [];
  me.isScreenshot = false;
  me.isEdit = false;
  me.toolmousedown = null;
  me.toolmousemove = null;
  me.toolmouseup = null;
  document.removeEventListener("keydown", me.endScreenShot);
  setTimeout(function() {
    document.removeEventListener("contextmenu", me.preventContextMenu);
  }, 0);
  document.removeEventListener("keydown", me.endScreenShot);
  document.removeEventListener("mouseup", me.cancelDrawingStatus);
}
