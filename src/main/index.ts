import { app, globalShortcut } from 'electron'
const debug = require('electron-debug')

import ElectronShortcutCapture from './electron-shortcut-capture'

app.on('ready', () => {
	// undocked
	debug({ devToolsMode: 'right', showDevTools: true })
	const electronShortcutCapture = new ElectronShortcutCapture({
		multiScreen: true,
		downloadFileprefix: '云聊_'
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
