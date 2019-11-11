import React from 'react'
import ReactDom from 'react-dom'
import { ipcRenderer, remote, desktopCapturer } from 'electron'
import kscreenshot from './kscreenshot/kss'

interface IDisplay {
    id: number
    scaleFactor: any
    x: number
    y: number
    width: number
    height: number
}

interface ISource {
    x: number
    y: number
    width: number
    height: number
    thumbnail: any
}

const App = () => {
    const [display, setDisplay] = React.useState<IDisplay>(null)
    const [kss, setKss] = React.useState(null)

    const bgRef = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        setTimeout(() => {
            init()
        }, 0)
    }, [])

    React.useEffect(() => {
        return () => {
            remote.screen.removeListener('display-metrics-changed', displayMetricsChanged)
        }
    })

    const bounds = React.useMemo(() => {
        if (!display) {
            return {}
        }
        return {
            x: display.x,
            y: display.y,
            width: display.width,
            height: display.height
        }
    }, [display])

    const displayMetricsChanged = () => {
        const currDisplay = getDisplay()
        setDisplay(currDisplay)
    }

    const getSource: (display: any) => Promise<ISource> = display => {
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

    const getDisplay = () => {
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
    const drawBackground = ({ x, y, width, height, thumbnail }, currCtx) => {
        // 确保dom更新后再更新canvas
        currCtx.clearRect(0, 0, width, height)
        const $img = new Image()
        const blob = new Blob([thumbnail.toPNG()], { type: 'image/png' })
        $img.src = URL.createObjectURL(blob)
        $img.addEventListener('load', () => {
            currCtx.drawImage($img, 0, 0, width, height, x, y, width, height)
        })
    }

    const init = async () => {
        const currDisplay = getDisplay()
        setDisplay(currDisplay)
        const currSource = await getSource(currDisplay)
        const currCtx = bgRef.current.getContext('2d')
        drawBackground(currSource, currCtx)
        remote.screen.once('display-metrics-changed', displayMetricsChanged)
        const currKss = new kscreenshot({
            key: 65,
            copyPath: dataUrl => {
                ok(dataUrl)
            },
            cancelCB: () => {
                console.log('cancelCB')
            }
        })
        currKss.init(65)
        setKss(currKss)
        show({
            x: currDisplay.x,
            y: currDisplay.y,
            width: currDisplay.width,
            height: currDisplay.height
        })
        currKss.startScreenShot()
    }

    const show = bounds => {
        ipcRenderer.send('ShortcutCapture::SHOW', bounds)
    }

    const hide = () => {
        ipcRenderer.send('ShortcutCapture::HIDE', bounds)
    }

    const ok = dataUrl => {}

    if (!display) {
        return null
    }

    const canvasStyles: React.CSSProperties = {
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    return <canvas style={canvasStyles} ref={bgRef}></canvas>
}
const render = () => {
    ReactDom.render(<App />, document.querySelector('#app'))
}
render()
