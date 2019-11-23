import { app, globalShortcut } from 'electron'
import ElectronShortcutCapture from './electron-shortcut-capture'

app.on('ready', () => {
	require('electron-debug')({ devToolsMode: 'right', showDevTools: false })

	globalShortcut.register('alt+shift+w', () => {
		new ElectronShortcutCapture({
			multiScreen: false
		}).show()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
