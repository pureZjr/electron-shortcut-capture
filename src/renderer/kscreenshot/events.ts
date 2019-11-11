import { ipcRenderer } from 'electron'

export const show = bounds => {
    ipcRenderer.send('ShortcutCapture::SHOW', bounds)
}

export const hide = bounds => {
    ipcRenderer.send('ShortcutCapture::HIDE', bounds)
}
