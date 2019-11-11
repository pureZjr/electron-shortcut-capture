import { remote } from 'electron'
import kscreenshot from './kscreenshot/kss'

// remote.screen.removeListener('display-metrics-changed', displayMetricsChanged)

// remote.screen.on('display-metrics-changed', displayMetricsChanged)
// const displayMetricsChanged = () => {
//     const currDisplay = getDisplay()
//     setDisplay(currDisplay)
// }
const kss = new kscreenshot({
    key: 65,
    copyPath: dataUrl => {},
    cancelCB: () => {
        console.log('cancelCB')
    }
})
kss.init(65)
kss.startScreenShot()
