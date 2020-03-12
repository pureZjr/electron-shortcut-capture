# electron-shortcut-capture

**electron-shortcut-capture 是一个用在 electron 上使用的截图工具。**

###工具原理

1. 开启截图后，用 electron 生成一个全屏窗口。
2. 截取当前屏幕的图片，并用 canvas 画出来。
3. 步骤 1 的全屏窗口加载步骤 2 的页面，这样你就可以对 canvas 做例如 QQ 截图的操作了。

![流程](https://ydy-staff.ydjai.com/desktop/8f1e1ab8a9e32795aea6c70572494e67.png '流程')

###已知问题：

1. mac 下面在一个已经全屏的窗口下启动不会去覆盖当前的窗口，只会在一个非全屏的窗口下打开。
2. 没法做类似微信等 IM 软件的选择应用窗口等窗口的选择。

## 安装

[![NPM](https://nodei.co/npm/electron-shortcut-capture.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/electron-shortcut-capture/)

## 用法

```js
...
import ElectronShortcutCapture from 'electron-shortcut-capture'
const electronShortcutCapture = new ElectronShortcutCapture({
	multiScreen: false
})

electronShortcutCapture.show()

...
```

## 选项

```typescript
new ShortcutCapture({
	multiScreen: false
})
```

| 名称               | 类型                                 | 说明                           | 默认值  |
| ------------------ | ------------------------------------ | ------------------------------ | ------- |
| multiScreen        | boolean                              | 是否使用多显示器截图，默认关闭 | `false` |
| downloadFileprefix | string                               | 下载文件前缀                   | ' '     |
| key                | string                               | 快捷键                         | ' '     |
| onClipboard        | (data: Electron.NativeImage) => void | 点击完成返回剪贴板内容         |         |
| onHide             | () => void                           | 关闭截图回调                   |         |
| onShow             | () => void                           | 打开截图回调                   |         |
| onShowByKey        | () => Promise<void>                  | 快捷键打开截图回调             |         |  |

## 方法

| 名称          | 说明       | 参数                                         | 返回值 |
| ------------- | ---------- | -------------------------------------------- | ------ |
| show          | 调用截图   | -                                            | -      |
| hide          | 关闭截图   | autoRunReopen?: boolean 是否重新出初始化打开 | -      |
| updateBindKey | 更新快捷键 | key: string                                  | -      |

## 展示

![展示](https://ydy-disk.ydjai.com/c0438457a05061760a1a31357830a8f1_1575078711717_424389.gif '展示')

## 支持

-   [x] 截图剪贴板
-   [x] 下载截图
-   [x] 多显示器
-   [x] 画笔
-   [x] 画圆
-   [x] 画方框
-   [x] 画箭头
-   [x] 撤销
-   [x] 放大镜
-   [x] 右键、esc 退出
-   [x] 马赛克
-   [x] 文字
-   [x] 双加选中截取部分，相当于点击完成
