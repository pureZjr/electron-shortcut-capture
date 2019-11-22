// import debug from 'electron-debug'
import { app } from 'electron'
import ElectronShortcutCapture from './electron-shortcut-capture'

app.on('ready', () => {
	// debug({ devToolsMode: 'right', showDevTools: true })
	new ElectronShortcutCapture().show()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
