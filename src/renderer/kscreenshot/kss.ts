import { remote, ipcRenderer } from "electron";

import {
  css,
  remove,
  typeChecking,
  getSource,
  initLineWidth,
  drawBackground
} from "./util";
import createDragDom from "./createDragDom";
import createToolbar from "./toolbar/toolbar";
import drawMiddleImage from "./toolbar/middleImage/drawMiddleImage";
import clearMiddleImage from "./toolbar/middleImage/clearMiddleImage";
import endAndClear from "./toolbar/endAndClear";
import backRightClient from "./backRightClient";
import toolbarPosition from "./toolbar/toolbarPosition";
import { bindKey } from "./events";
import "./kss.scss";

interface IToolShow {
  complete: boolean; // 控制确认按键显示
  quit: boolean; // 控制退出按键显示
  back: boolean; // 控制后退按键显示
  arrow: boolean; // 控制箭头按键显示
  drawLine: boolean; // 控制线条按键显示（可以输入数字，初始化线条粗细，[1-10]
  rect: boolean; // 控制矩形按键显示
  ellipse: boolean; // 控制椭圆按键显示
  text: boolean; // 控制文字按键显示
  color: boolean; // 控制颜色版按键显示
}

interface IProps {
  // 截图触发按键（例：shift+w）
  key?: string;
  toolShow?: IToolShow;
  // 是否下载截图后的图片
  needDownload?: boolean;
  // 是否立即开启截图
  immediately?: boolean;
  /**
   * 参数为base64格式的图片（该功能不建议使用，最好是结合nw electron等工具实现复制功能。
   * js目前暂未找到能兼容各客户端的方法，因此最好return null）
   * */
  copyPath?: (dataUrl: string) => void;
  // 成功结束截图后的回调函数
  endCB?: () => void;
  // 撤销截图后的回调函数
  cancelCB?: () => void;
}

class Kss {
  constructor(props: IProps) {
    this.key = props.key;
    this.toolShow = props.toolShow;
    this.copyPath = props.copyPath;
    this.needDownload = props.needDownload;
    this.endCB = props.endCB;
    this.cancelCB = props.cancelCB;
    bindKey(props.key);
    this.init();
  }

  private kss = null;
  private style = null;
  private kssScreenShotWrapper = null;
  private kssTextLayer = null;
  private rectangleCanvas = null;
  private toolbar = null;
  private scale = window.devicePixelRatio || 1;
  private scrollTop = 0;
  // 存储当前快照的元素
  private currentImgDom = null;
  /**
   * 截图状态
   * */
  private isScreenshot = false;
  // 快照组
  private snapshootList = [];
  /*
   * 1: 点下左键，开始状态
   * 2: 鼠标移动，进行状态
   * 3: 放开左键，结束状态
   * */
  private drawingStatus = null;
  private currentToolType = null;
  private imgBase64 = null;
  private isEdit = false;
  private startX = null;
  private startY = null;
  private width = null;
  private height = null;
  private dotSize = 6;
  private lineSize = 2;
  // 工具显示状态
  private toolShow = null;
  // 工具栏样式
  private toolbarWidth = null;
  private toolbarHeight = 30;
  private toolbarMarginTop = 5;
  private toolbarColor = "#fb3838";
  private toolbarLineWidth =
    typeChecking(this.toolShow) === "[object Object]"
      ? initLineWidth(this.toolShow.drawLine)
      : 10;

  // 工具栏事件
  private toolmousedown = null;
  private toolmousemove = null;
  private toolmouseup = null;

  // 根据base64获取绝对地址
  private copyPath = null;
  // 是否下载
  private needDownload = null;

  // 成功回调
  private endCB = null;
  // 撤销回调
  private cancelCB = null;
  // 快捷键
  private key = "shift+w";

  /**
   * 开始框图
   */
  startDrawDown = e => {
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

  drawing = e => {
    this.drawingStatus = 2;
    const client = backRightClient(e);
    const clientX = client[0];
    const clientY = client[1];
    css(this.kssScreenShotWrapper, {
      height: Math.abs(clientY - this.startY) + "px",
      width: Math.abs(clientX - this.startX) + "px",
      top: Math.min(this.startY, clientY) + "px",
      left: Math.min(this.startX, clientX) + "px"
    });
  };

  endDraw = async (e: MouseEvent) => {
    console.log("endDraw");
    if (e.button !== 0) {
      return;
    }
    this.drawingStatus = 3;

    if (this.startX === e.clientX && this.startY === e.clientY) {
      const clientHeight = document.documentElement.clientHeight;
      const clientWidth = document.documentElement.clientWidth;
      this.startX = 2;
      this.startY = 2;
      this.height = clientHeight - 4;
      this.width = clientWidth - 4;
      css(this.kssScreenShotWrapper, {
        height: this.height + "px",
        width: this.width + "px",
        top: this.startY + "px",
        left: this.startX + "px"
      });
    } else {
      const client = backRightClient(e);
      const clientX = client[0];
      const clientY = client[1];

      this.width = Math.abs(clientX - this.startX);
      this.height = Math.abs(clientY - this.startY);
      this.startX = Math.min(this.startX, clientX);
      this.startY = Math.min(this.startY, clientY);
    }
    document.removeEventListener("mousemove", this.drawing);

    const canvas = document.createElement("canvas");
    canvas.id = "kssRectangleCanvas";

    this.kssScreenShotWrapper.appendChild(canvas);
    this.rectangleCanvas = canvas;

    canvas.addEventListener("mousedown", (event: MouseEvent) => {
      if (this.isEdit || event.button === 2) {
        return;
      }
      clearMiddleImage(this);
      const startX = event.clientX;
      const startY = event.clientY;

      //最后左上角的top和left
      let top;
      let left;

      const canvasMoveEvent = (e: MouseEvent) => {
        const clientHeight = document.documentElement.clientHeight;
        const clientWidth = document.documentElement.clientWidth;

        top = this.startY + e.clientY - startY;

        if (this.startY + e.clientY - startY + this.height > clientHeight) {
          top = clientHeight - this.height;
        }

        if (this.startY + e.clientY - startY < 0) {
          top = 0;
        }

        left = this.startX + e.clientX - startX;

        if (this.startX + e.clientX - startX + this.width > clientWidth) {
          left = clientWidth - this.width;
        }

        if (this.startX + e.clientX - startX < 0) {
          left = 0;
        }

        css(this.kssScreenShotWrapper, {
          top: top + "px",
          left: left + "px"
        });

        toolbarPosition(this, this.width, this.height, top, left, this.toolbar);
      };

      const canvasUpEvent = () => {
        if (top === undefined) {
          top = this.startY;
        }

        if (left === undefined) {
          left = this.startX;
        }
        this.startY = top;
        this.startX = left;
        document.removeEventListener("mousemove", canvasMoveEvent);
        document.removeEventListener("mouseup", canvasUpEvent);
        drawMiddleImage(this);
      };

      document.addEventListener("mousemove", canvasMoveEvent);
      document.addEventListener("mouseup", canvasUpEvent);
    });
    this.kss.removeEventListener("mousedown", this.startDrawDown);
    document.removeEventListener("mouseup", this.endDraw);

    createDragDom(this.kssScreenShotWrapper, this.dotSize, this.lineSize, this);
    const img = document.createElement("img");
    img.id = "kssCurrentImgDom";

    this.kssScreenShotWrapper.appendChild(img);
    this.currentImgDom = img;
    drawMiddleImage(this);
    this.toolbar = createToolbar(this);
  };

  /**
   * 鼠标右键不做操作
   */
  preventContextMenu = e => {
    e.preventDefault();
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

  /**
   * 绘制canvas
   */
  drawCanvas = () => {
    if (this.isScreenshot) {
      // 已经启动截图，直接返回
      return;
    }
    const displays = () => {
      let { x, y } = remote.getCurrentWindow().getBounds();
      return remote.screen
        .getAllDisplays()
        .filter(d => d.bounds.x === x && d.bounds.y === y);
    };
    displays().map(async display => {
      this.isScreenshot = true;
      const canvas = document.createElement("canvas");
      this.kss = canvas;
      this.scrollTop = document.documentElement.scrollTop;
      document.body.appendChild(canvas);
      const { height, width } = display.size;
      canvas.id = `kss_${display.id}`;
      canvas.height = height;
      canvas.width = width;
      canvas.addEventListener("mousedown", this.startDrawDown);
      const source = await getSource(display);
      const currCtx = canvas.getContext("2d");
      drawBackground({ ...source, currCtx });
    });
  };

  /**
   * 初始化
   * */
  init = () => {
    this.drawCanvas();
  };

  /**
   * 主线程通知渲染线程关闭截图
   */
  end = () => {
    ipcRenderer.on("close", () => {
      endAndClear(this);
      this.cancelCB();
    });
  };
}

export default Kss;
