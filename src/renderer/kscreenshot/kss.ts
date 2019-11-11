import html2canvas from './html2canvas.min.js'
import { css, remove, typeChecking, getSource, getDisplay } from './util'
import createDragDom from './createDragDom'
import createToolbar from './toolbar/toolbar'
import drawMiddleImage from './toolbar/middleImage/drawMiddleImage'
import clearMiddleImage from './toolbar/middleImage/clearMiddleImage'
import endAndClear from './toolbar/endAndClear'
import backRightClient from './backRightClient'
import toolbarPosition from './toolbar/toolbarPosition'
import './kss.scss'

function initLineWidth(initLine) {
    if (isNaN(initLine)) {
        return 10
    } else {
        if (initLine > 10) {
            return 10
        } else if (initLine < 1) {
            return 1
        } else {
            return initLine
        }
    }
}

interface IProps {
    key?: number
    toolShow?: boolean
    needDownload?: boolean
    copyPath?: (dataUrl: string) => void
    endCB?: () => void
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
    //截图状态
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

    endDraw = e => {
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

        document.addEventListener('keydown', isRightKey.bind(null, key))

        function isRightKey(key, e) {
            if (e.keyCode === key && e.shiftKey && !this.isScreenshot) {
                this.start()
                this.end()
            }
        }
    }

    start = () => {
        if (this.isScreenshot) {
            return
        }
        this.isScreenshot = true
        html2canvas(document.body, { useCORS: true, scrollY: 200 }).then(canvas => {
            this.kss = canvas
            this.scrollTop = document.documentElement.scrollTop
            canvas.id = 'kss'

            document.body.appendChild(canvas)

            css(canvas, {
                top: `-${this.scrollTop}px`
            })

            canvas.addEventListener('mousedown', this.startDrawDown)
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

    // init(options.key, options.immediately)
}

// let kss = (function() {
//     let instance

//     //单例模式
//     let kss = function(options) {
//         if (instance) {
//             return instance
//         }

//         this.kss = null
//         this.style = null
//         this.kssScreenShotWrapper = null
//         this.kssTextLayer = null
//         this.rectangleCanvas = null
//         this.toolbar = null
//         this.scale = window.devicePixelRatio || 1
//         //存储当前快照的元素
//         this.currentImgDom = null
//         //截图状态
//         this.isScreenshot = false
//         //快照组
//         this.snapshootList = []
//         /*
//          * 1: 点下左键，开始状态
//          * 2: 鼠标移动，进行状态
//          * 3: 放开左键，结束状态
//          * */
//         this.drawingStatus = null
//         this.currentToolType = null
//         this.imgBase64 = null
//         this.isEdit = false
//         this.startX = null
//         this.startY = null
//         this.width = null
//         this.height = null
//         this.dotSize = 6
//         this.lineSize = 2
//         //工具显示状态
//         this.toolShow = options.toolShow
//         //工具栏样式
//         this.toolbarWidth = null
//         this.toolbarHeight = 30
//         this.toolbarMarginTop = 5
//         this.toolbarColor = '#fb3838'
//         this.toolbarLineWidth =
//             typeChecking(options.toolShow) === '[object Object]' ? initLineWidth(options.toolShow.drawLine) : 10

//         //工具栏事件
//         this.toolmousedown = null
//         this.toolmousemove = null
//         this.toolmouseup = null

//         //根据base64获取绝对地址
//         this.copyPath = options.copyPath
//         //是否下载
//         this.needDownload = options.needDownload

//         //成功回调
//         this.endCB = options.endCB
//         //撤销回调
//         this.cancelCB = options.cancelCB

//         this.startDrawDown = e => {
//             const that = this
//             document.addEventListener('mouseup', that.cancelDrawingStatus)
//             document.addEventListener('contextmenu', that.preventContextMenu)
//             //当不是鼠标左键时立即返回
//             if (e.button !== 0) {
//                 return
//             }

//             if (that.drawingStatus !== null) {
//                 return
//             }
//             that.drawingStatus = 1

//             that.startX = e.clientX
//             that.startY = e.clientY
//             //移除并添加
//             remove(document.getElementById('kssScreenShotWrapper'))
//             let kssScreenShotWrapper = document.createElement('div')
//             kssScreenShotWrapper.id = 'kssScreenShotWrapper'
//             that.kssScreenShotWrapper = kssScreenShotWrapper
//             let kssTextLayer = document.createElement('div')
//             kssTextLayer.id = 'kssTextLayer'
//             that.kssTextLayer = kssTextLayer

//             kssScreenShotWrapper.appendChild(kssTextLayer)
//             document.body.appendChild(kssScreenShotWrapper)

//             document.addEventListener('mousemove', that.drawing)
//             document.addEventListener('mouseup', that.endDraw)
//         }

//         this.drawing = e => {
//             const that = this
//             that.drawingStatus = 2

//             let client = backRightClient(e)
//             let clientX = client[0]
//             let clientY = client[1]

//             css(that.kssScreenShotWrapper, {
//                 height: Math.abs(clientY - that.startY) + 'px',
//                 width: Math.abs(clientX - that.startX) + 'px',
//                 top: Math.min(that.startY, clientY) + 'px',
//                 left: Math.min(that.startX, clientX) + 'px'
//             })
//         }

//         this.endDraw = e => {
//             if (e.button !== 0) {
//                 return
//             }
//             const that = this
//             that.drawingStatus = 3

//             if (that.startX === e.clientX && that.startY === e.clientY) {
//                 let clientHeight = document.documentElement.clientHeight
//                 let clientWidth = document.documentElement.clientWidth
//                 that.startX = 2
//                 that.startY = 2
//                 that.height = clientHeight - 4
//                 that.width = clientWidth - 4
//                 css(that.kssScreenShotWrapper, {
//                     height: that.height + 'px',
//                     width: that.width + 'px',
//                     top: that.startY + 'px',
//                     left: that.startX + 'px'
//                 })
//             } else {
//                 let client = backRightClient(e)
//                 let clientX = client[0]
//                 let clientY = client[1]

//                 that.width = Math.abs(clientX - that.startX)
//                 that.height = Math.abs(clientY - that.startY)
//                 that.startX = Math.min(that.startX, clientX)
//                 that.startY = Math.min(that.startY, clientY)
//             }
//             document.removeEventListener('mousemove', that.drawing)

//             let canvas = document.createElement('canvas')
//             canvas.id = 'kssRectangleCanvas'

//             that.kssScreenShotWrapper.appendChild(canvas)
//             that.rectangleCanvas = canvas
//             canvas.addEventListener('mousedown', function(event) {
//                 if (that.isEdit || event.button === 2) {
//                     return
//                 }
//                 clearMiddleImage(that)
//                 let startX = event.clientX
//                 let startY = event.clientY
//                 document.addEventListener('mousemove', canvasMoveEvent)
//                 document.addEventListener('mouseup', canvasUpEvent)
//                 //最后左上角的top和left
//                 let top
//                 let left

//                 function canvasMoveEvent(e) {
//                     let clientHeight = document.documentElement.clientHeight
//                     let clientWidth = document.documentElement.clientWidth

//                     top = that.startY + e.clientY - startY

//                     if (that.startY + e.clientY - startY + that.height > clientHeight) {
//                         top = clientHeight - that.height
//                     }

//                     if (that.startY + e.clientY - startY < 0) {
//                         top = 0
//                     }

//                     left = that.startX + e.clientX - startX

//                     if (that.startX + e.clientX - startX + that.width > clientWidth) {
//                         left = clientWidth - that.width
//                     }

//                     if (that.startX + e.clientX - startX < 0) {
//                         left = 0
//                     }

//                     css(that.kssScreenShotWrapper, {
//                         top: top + 'px',
//                         left: left + 'px'
//                     })

//                     toolbarPosition(that, that.width, that.height, top, left, that.toolbar)
//                 }

//                 function canvasUpEvent(e) {
//                     if (top === undefined) {
//                         top = that.startY
//                     }

//                     if (left === undefined) {
//                         left = that.startX
//                     }
//                     that.startY = top
//                     that.startX = left
//                     document.removeEventListener('mousemove', canvasMoveEvent)
//                     document.removeEventListener('mouseup', canvasUpEvent)
//                     drawMiddleImage(that)
//                 }
//             })
//             that.kss.removeEventListener('mousedown', that.startDrawDown)
//             document.removeEventListener('mouseup', that.endDraw)

//             createDragDom(that.kssScreenShotWrapper, that.dotSize, that.lineSize, that)
//             let img = document.createElement('img')
//             img.id = 'kssCurrentImgDom'

//             that.kssScreenShotWrapper.appendChild(img)
//             that.currentImgDom = img
//             drawMiddleImage(that)
//             that.toolbar = createToolbar(that)
//         }

//         this.preventContextMenu = e => {
//             e.preventDefault()
//         }

//         this.cancelDrawingStatus = e => {
//             const that = this
//             if (e.button === 2) {
//                 if (that.drawingStatus === null) {
//                     document.removeEventListener('mouseup', that.cancelDrawingStatus)
//                     setTimeout(function() {
//                         document.removeEventListener('contextmenu', that.preventContextMenu)
//                     }, 0)

//                     endAndClear(that)
//                     that.cancelCB()
//                     return
//                 }
//                 remove(that.kssScreenShotWrapper)
//                 that.kssScreenShotWrapper = null
//                 that.kssTextLayer = null
//                 that.rectangleCanvas = null
//                 that.drawingStatus = null
//                 that.isEdit = false
//                 that.snapshootList = []
//                 that.currentToolType = null
//                 that.toolmousedown = null
//                 that.toolmousemove = null
//                 that.toolmouseup = null
//                 that.kss.addEventListener('mousedown', that.startDrawDown)
//             }
//         }
//         this.startScreenShot = () => {
//             this.start()
//         }
//         this.endScreenShot = () => {
//             endAndClear(this)
//         }

//         this.init(options.key, options.immediately)
//         return (instance = this)
//     }

//     // kss.prototype.init = function(key, immediately) {
//     //     const that = this

//     //     if (immediately === true) {
//     //         that.start()
//     //         that.end()
//     //     }

//     //     if (key === undefined) {
//     //         key = 65
//     //     } else if (key === null) {
//     //         return
//     //     }

//     //     document.addEventListener('keydown', isRightKey.bind(null, key))

//     //     function isRightKey(key, e) {
//     //         if (e.keyCode === key && e.shiftKey && !that.isScreenshot) {
//     //             that.start()
//     //             that.end()
//     //         }
//     //     }
//     // }

//     // kss.prototype.start = function() {
//     //     const that = this
//     //     if (that.isScreenshot) {
//     //         return
//     //     }
//     //     that.isScreenshot = true
//     //     html2canvas(document.body, { useCORS: true, scrollY: 200 }).then(canvas => {
//     //         that.kss = canvas
//     //         console.log(canvas)
//     //         that.scrollTop = document.documentElement.scrollTop
//     //         canvas.id = 'kss'

//     //         document.body.appendChild(canvas)

//     //         css(canvas, {
//     //             top: `-${that.scrollTop}px`
//     //         })

//     //         canvas.addEventListener('mousedown', that.startDrawDown)
//     //     })
//     // }

//     // kss.prototype.end = function() {
//     //     const that = this

//     //     that.endScreenShot = function(e) {
//     //         if (e.keyCode === 27) {
//     //             endAndClear(that)
//     //             that.cancelCB()
//     //         }
//     //     }

//     //     document.addEventListener('keydown', that.endScreenShot)
//     // }

//     return kss
// })()

export default Kss
