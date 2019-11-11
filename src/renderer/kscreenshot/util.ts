import { remote, desktopCapturer } from 'electron'

export interface ISource {
    x: number
    y: number
    width: number
    height: number
    thumbnail: any
}

export interface IDisplay {
    id: number
    scaleFactor: number
    x: number
    y: number
    width: number
    height: number
}

export function css(dom, obj) {
    for (let i in obj) {
        dom.style[i] = obj[i]
    }
}

export function remove(dom) {
    if (dom instanceof HTMLElement) {
        dom.parentNode.removeChild(dom)
    } else if (dom instanceof HTMLCollection) {
        Array.prototype.forEach.call(dom, function(obj) {
            obj.parentNode.removeChild(obj)
        })
    }
}

export function domType(dom) {
    return Object.prototype.toString.call(dom)
}

export function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export function addClass(obj, cls) {
    if (!hasClass(obj, cls)) {
        obj.className += ' ' + cls
    }
}

export function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg, ' ')
    }
}

export function computed(obj, baseProperty, changeProperty, cb) {
    Object.defineProperty(obj, baseProperty, {
        set: function(val) {
            changeProperty.forEach((it, index) => {
                cb[index](obj, val, changeProperty[index])
            })
        }
    })
}

export function typeChecking(val) {
    return Object.prototype.toString.call(val)
}

export const getSource: (display: any) => Promise<ISource> = display => {
    return new Promise((resolve, reject) => {
        desktopCapturer.getSources(
            {
                types: ['screen'],
                thumbnailSize: {
                    width: display.width,
                    height: display.width
                }
            },
            (error, sources) => {
                if (error) return reject(error)
                const index = remote.screen.getAllDisplays().findIndex(({ id }) => id === display.id)
                if (index === -1) return reject(new Error(`Not find display ${display.id} source`))
                resolve({
                    x: 0,
                    y: 0,
                    width: display.width,
                    height: display.height,
                    thumbnail: sources[index].thumbnail
                })
            }
        )
    })
}

export const getDisplay = () => {
    // 鼠标指针的当前绝对位置
    const point = remote.screen.getCursorScreenPoint()
    // 主显示器
    const primaryDisplay = remote.screen.getPrimaryDisplay()
    const { id, bounds, workArea, scaleFactor } = remote.screen.getDisplayNearestPoint(point)
    // win32 darwin linux平台分别处理
    const scale = process.platform === 'darwin' ? 1 : scaleFactor / primaryDisplay.scaleFactor
    const display = process.platform === 'linux' ? workArea : bounds
    return {
        id,
        scaleFactor,
        x: display.x * (scale >= 1 ? scale : 1),
        y: display.y * (scale >= 1 ? scale : 1),
        width: display.width * scale,
        height: display.height * scale
    }
}

// 画背景
export const drawBackground = ({ x, y, width, height, thumbnail, currCtx }) => {
    // 确保dom更新后再更新canvas
    currCtx.clearRect(0, 0, width, height)
    const $img = new Image()
    const blob = new Blob([thumbnail.toPNG()], { type: 'image/png' })
    $img.src = URL.createObjectURL(blob)
    $img.addEventListener('load', () => {
        currCtx.drawImage($img, 0, 0, width, height, x, y, width, height)
    })
}
