import { ipcRenderer } from 'electron'

export const show = bounds => {
    ipcRenderer.send('ShortcutCapture::SHOW', bounds)
}

export const hide = () => {
    ipcRenderer.send('ShortcutCapture::HIDE', {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })
}
