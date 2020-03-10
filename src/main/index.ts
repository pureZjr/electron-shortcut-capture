import { app, globalShortcut } from 'electron'
const debug = require('electron-debug')

import ElectronShortcutCapture from './electron-shortcut-capture'

app.on('ready', () => {
	// undocked
	debug({ devToolsMode: 'right', showDevTools: false })
	const electronShortcutCapture = new ElectronShortcutCapture({
		multiScreen: false,
		downloadFileprefix: '云聊_',
		winHD: true
	})

	globalShortcut.register('ctrl+shift+w', () => {
		electronShortcutCapture.show()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
