import debug from 'electron-debug'
import { app } from 'electron'
import ShortcutCapture from './shortcut-capture'

app.on('ready', () => {
	// debug({ devToolsMode: 'right', showDevTools: true })
	// 调试F12
	// globalShortcut.register('f12', () => {
	// 	debug({ devToolsMode: 'right', showDevTools: true })
	// })
	new ShortcutCapture()
	// sc.on("capture", ({ dataURL, bounds }) => console.log("capture", bounds));
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
