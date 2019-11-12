import img from '../../assets/imgs/cancel.png'
import endAndClear from '../endAndClear'

/**
 * 取消截图按钮
 * */

export default function quitBT(kss) {
    const quitBT = document.createElement('span')
    quitBT.id = 'kssQuitBT'
    quitBT.className = 'kssToolbarItemBT'
    quitBT.title = '退出截图'

    const quitImg = document.createElement('img')
    quitImg.className = 'kssToolbarItemImg'
    quitImg.src = img
    kss.quitBT = quitImg
    quitBT.appendChild(quitImg)
    quitBT.addEventListener('click', function() {
        kss.isEdit = true
        endAndClear(kss)
        kss.cancelCB()
    })

    return quitBT
}
