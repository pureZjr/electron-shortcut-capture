import { app, globalShortcut } from 'electron'
import ElectronShortcutCapture from './electron-shortcut-capture'

app.on('ready', () => {
	require('electron-debug')({ devToolsMode: 'right', showDevTools: true })
	const electronShortcutCapture = new ElectronShortcutCapture({
		multiScreen: false
	})

	globalShortcut.register('alt+shift+w', () => {
		electronShortcutCapture.show()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
