import { desktopCapturer } from 'electron'

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
				types: ['screen'],
				thumbnailSize: {
					width: display.size.width,
					height: display.size.height
				}
			},
			(error, sources) => {
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
