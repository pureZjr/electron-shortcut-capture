import html2canvas from './html2canvas.min.js'
import { css, remove, typeChecking, getSource, getDisplay, initLineWidth, drawBackground } from './util'
import createDragDom from './createDragDom'
import createToolbar from './toolbar/toolbar'
import drawMiddleImage from './toolbar/middleImage/drawMiddleImage'
import clearMiddleImage from './toolbar/middleImage/clearMiddleImage'
import endAndClear from './toolbar/endAndClear'
import backRightClient from './backRightClient'
import toolbarPosition from './toolbar/toolbarPosition'
import { show } from './events'
import './kss.scss'

interface IToolShow {
    complete: boolean // 控制确认按键显示
    quit: boolean // 控制退出按键显示
    back: boolean // 控制后退按键显示
    arrow: boolean // 控制箭头按键显示
    drawLine: boolean // 控制线条按键显示（可以输入数字，初始化线条粗细，[1-10]
    rect: boolean // 控制矩形按键显示
    ellipse: boolean // 控制椭圆按键显示
    text: boolean // 控制文字按键显示
    color: boolean // 控制颜色版按键显示
}

interface IProps {
    // 截图触发按键（例：65时则同时按下shit + A则触发截图）
    key?: number
    toolShow?: IToolShow
    // 是否下载截图后的图片
    needDownload?: boolean
    // 是否立即开启截图
    immediately?: boolean
    /**
     * 参数为base64格式的图片（该功能不建议使用，最好是结合nw electron等工具实现复制功能。
     * js目前暂未找到能兼容各客户端的方法，因此最好return null）
     * */
    copyPath?: (dataUrl: string) => void
    // 成功结束截图后的回调函数
    endCB?: () => void
    // 撤销截图后的回调函数
    cancelCB?: () => void
}

class Kss {
    constructor(props: IProps) {
        this.toolShow = props.toolShow
        this.copyPath = props.copyPath
        this.needDownload = props.needDownload
        this.endCB = props.endCB
        this.cancelCB = props.cancelCB
    }

    kss = null
    style = null
    kssScreenShotWrapper = null
    kssTextLayer = null
    rectangleCanvas = null
    toolbar = null
    scale = window.devicePixelRatio || 1
    scrollTop = 0
    //存储当前快照的元素
    currentImgDom = null
    /**
     * 截图状态
     * */
    isScreenshot = false
    //快照组
    snapshootList = []
    /*
     * 1: 点下左键，开始状态
     * 2: 鼠标移动，进行状态
     * 3: 放开左键，结束状态
     * */
    drawingStatus = null
    currentToolType = null
    imgBase64 = null
    isEdit = false
    startX = null
    startY = null
    width = null
    height = null
    dotSize = 6
    lineSize = 2
    //工具显示状态
    toolShow = null
    //工具栏样式
    toolbarWidth = null
    toolbarHeight = 30
    toolbarMarginTop = 5
    toolbarColor = '#fb3838'
    toolbarLineWidth = typeChecking(this.toolShow) === '[object Object]' ? initLineWidth(this.toolShow.drawLine) : 10

    //工具栏事件
    toolmousedown = null
    toolmousemove = null
    toolmouseup = null

    //根据base64获取绝对地址
    copyPath = null
    //是否下载
    needDownload = null

    //成功回调
    endCB = null
    //撤销回调
    cancelCB = null

    startDrawDown = e => {
        document.addEventListener('mouseup', this.cancelDrawingStatus)
        document.addEventListener('contextmenu', this.preventContextMenu)
        //当不是鼠标左键时立即返回
        if (e.button !== 0) {
            return
        }

        if (this.drawingStatus !== null) {
            return
        }
        this.drawingStatus = 1

        this.startX = e.clientX
        this.startY = e.clientY
        //移除并添加
        remove(document.getElementById('kssScreenShotWrapper'))
        const kssScreenShotWrapper = document.createElement('div')
        kssScreenShotWrapper.id = 'kssScreenShotWrapper'
        this.kssScreenShotWrapper = kssScreenShotWrapper
        const kssTextLayer = document.createElement('div')
        kssTextLayer.id = 'kssTextLayer'
        this.kssTextLayer = kssTextLayer

        kssScreenShotWrapper.appendChild(kssTextLayer)
        document.body.appendChild(kssScreenShotWrapper)

        document.addEventListener('mousemove', this.drawing)
        document.addEventListener('mouseup', this.endDraw)
    }

    drawing = e => {
        this.drawingStatus = 2

        const client = backRightClient(e)
        const clientX = client[0]
        const clientY = client[1]

        css(this.kssScreenShotWrapper, {
            height: Math.abs(clientY - this.startY) + 'px',
            width: Math.abs(clientX - this.startX) + 'px',
            top: Math.min(this.startY, clientY) + 'px',
            left: Math.min(this.startX, clientX) + 'px'
        })
    }

    endDraw = async (e: MouseEvent) => {
        console.log('endDraw')
        if (e.button !== 0) {
            return
        }
        this.drawingStatus = 3

        if (this.startX === e.clientX && this.startY === e.clientY) {
            const clientHeight = document.documentElement.clientHeight
            const clientWidth = document.documentElement.clientWidth
            this.startX = 2
            this.startY = 2
            this.height = clientHeight - 4
            this.width = clientWidth - 4
            css(this.kssScreenShotWrapper, {
                height: this.height + 'px',
                width: this.width + 'px',
                top: this.startY + 'px',
                left: this.startX + 'px'
            })
        } else {
            const client = backRightClient(e)
            const clientX = client[0]
            const clientY = client[1]

            this.width = Math.abs(clientX - this.startX)
            this.height = Math.abs(clientY - this.startY)
            this.startX = Math.min(this.startX, clientX)
            this.startY = Math.min(this.startY, clientY)
        }
        document.removeEventListener('mousemove', this.drawing)

        const canvas = document.createElement('canvas')
        canvas.id = 'kssRectangleCanvas'

        this.kssScreenShotWrapper.appendChild(canvas)
        this.rectangleCanvas = canvas

        canvas.addEventListener('mousedown', (event: MouseEvent) => {
            if (this.isEdit || event.button === 2) {
                return
            }
            clearMiddleImage(this)
            const startX = event.clientX
            const startY = event.clientY

            //最后左上角的top和left
            let top
            let left

            const canvasMoveEvent = (e: MouseEvent) => {
                const clientHeight = document.documentElement.clientHeight
                const clientWidth = document.documentElement.clientWidth

                top = this.startY + e.clientY - startY

                if (this.startY + e.clientY - startY + this.height > clientHeight) {
                    top = clientHeight - this.height
                }

                if (this.startY + e.clientY - startY < 0) {
                    top = 0
                }

                left = this.startX + e.clientX - startX

                if (this.startX + e.clientX - startX + this.width > clientWidth) {
                    left = clientWidth - this.width
                }

                if (this.startX + e.clientX - startX < 0) {
                    left = 0
                }

                css(this.kssScreenShotWrapper, {
                    top: top + 'px',
                    left: left + 'px'
                })

                toolbarPosition(this, this.width, this.height, top, left, this.toolbar)
            }

            const canvasUpEvent = () => {
                if (top === undefined) {
                    top = this.startY
                }

                if (left === undefined) {
                    left = this.startX
                }
                this.startY = top
                this.startX = left
                document.removeEventListener('mousemove', canvasMoveEvent)
                document.removeEventListener('mouseup', canvasUpEvent)
                drawMiddleImage(this)
            }

            document.addEventListener('mousemove', canvasMoveEvent)
            document.addEventListener('mouseup', canvasUpEvent)
        })
        this.kss.removeEventListener('mousedown', this.startDrawDown)
        document.removeEventListener('mouseup', this.endDraw)

        createDragDom(this.kssScreenShotWrapper, this.dotSize, this.lineSize, this)
        const img = document.createElement('img')
        img.id = 'kssCurrentImgDom'

        this.kssScreenShotWrapper.appendChild(img)
        this.currentImgDom = img
        drawMiddleImage(this)
        this.toolbar = createToolbar(this)
    }

    preventContextMenu = e => {
        e.preventDefault()
    }

    cancelDrawingStatus = e => {
        if (e.button === 2) {
            if (this.drawingStatus === null) {
                document.removeEventListener('mouseup', this.cancelDrawingStatus)
                setTimeout(function() {
                    document.removeEventListener('contextmenu', this.preventContextMenu)
                }, 0)

                endAndClear(this)
                this.cancelCB()
                return
            }
            remove(this.kssScreenShotWrapper)
            this.kssScreenShotWrapper = null
            this.kssTextLayer = null
            this.rectangleCanvas = null
            this.drawingStatus = null
            this.isEdit = false
            this.snapshootList = []
            this.currentToolType = null
            this.toolmousedown = null
            this.toolmousemove = null
            this.toolmouseup = null
            this.kss.addEventListener('mousedown', this.startDrawDown)
        }
    }

    startScreenShot = () => {
        this.start()
    }
    endScreenShot = () => {
        endAndClear(this)
    }

    // 初始化
    init = (key: number, immediately?: boolean) => {
        if (immediately === true) {
            this.start()
            this.end()
        }

        if (key === undefined) {
            key = 65
        } else if (key === null) {
            return
        }

        function isRightKey(key, e) {
            if (e.keyCode === key && e.shiftKey && !this.isScreenshot) {
                this.start()
                this.end()
            }
        }
        document.addEventListener('keydown', isRightKey.bind(null, key))
        const currDisplay = getDisplay()

        show({
            x: currDisplay.x,
            y: currDisplay.y,
            width: currDisplay.width,
            height: currDisplay.height
        })
    }

    // 启动截图
    start = async () => {
        if (this.isScreenshot) {
            // 已经启动截图，直接返回
            return
        }
        const currDisplay = getDisplay()
        const currSource = await getSource(currDisplay)
        this.isScreenshot = true
        console.log(document.body)
        html2canvas(document.body, { useCORS: true, scrollY: 200, scale: 1 }).then((canvas: HTMLCanvasElement) => {
            this.kss = canvas
            this.scrollTop = document.documentElement.scrollTop
            canvas.id = 'kss'
            console.log(canvas)
            document.body.appendChild(canvas)
            css(canvas, {
                top: `-${this.scrollTop}px`
            })
            canvas.addEventListener('mousedown', this.startDrawDown)
            const currCtx = canvas.getContext('2d')
            drawBackground({ ...currSource, currCtx })
        })
    }

    end = () => {
        function endScreenShot(e) {
            if (e.keyCode === 27) {
                endAndClear(this)
                this.cancelCB()
            }
        }
        document.addEventListener('keydown', endScreenShot)
    }
}

export default Kss
