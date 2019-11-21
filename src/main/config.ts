import path from 'path'

export const URL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8888'
		: `file://${path.join(__dirname, '../../dist/renderer/index.html')}`
