import { desktopCapturer, remote } from 'electron'

export interface ISource {
	x: number
	y: number
	width: number
	height: number
	thumbnail: any
}

/**
 * 获取显示器资源
 */
export const getSource: (display: Electron.Display) => Promise<ISource> = (
	display: Electron.Display
) => {
	return new Promise((resolve, reject) => {
		desktopCapturer.getSources(
			{
				types: ['screen', 'window'],
				thumbnailSize: {
					width: display.size.width,
					height: display.size.height
				}
			},
			(error, sources) => {
				console.log(sources)
				if (error) return reject(error)
				const currSourceItem = sources.filter(
					v => Number(display.id) === Number(v.display_id)
				)
				if (!currSourceItem.length)
					return reject(
						new Error(`Not find display ${display.id} source`)
					)
				resolve({
					x: 0,
					y: 0,
					width: display.size.width,
					height: display.size.height,
					thumbnail: currSourceItem[0].thumbnail
				})
			}
		)
	})
}

/**
 * 获取当前显示器
 */
export const getCurrentDisplay: () => Electron.Display = () => {
	const { x, y } = remote.getCurrentWindow().getBounds()
	const display = remote.screen
		.getAllDisplays()
		.filter(d => d.bounds.x === x && d.bounds.y === y)[0]
	return display
}
