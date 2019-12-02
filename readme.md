# electron-shortcut-capture

electron-shortcut-capture 是一个用在 electron 上使用的截图工具。

_由于用 mac 开发，在 window 测试较少，有什么问题欢迎[issue](https://github.com/pureZjr/electron-shortcut-capture/issues 'issue')_

## theory

**工具原理：**

1. 开启截图后，用 electron 生成一个全屏窗口；
2. 截取当前屏幕的图片，并用 canvas 画出来。
3. 步骤 1 的全屏窗口加载步骤 2 的页面，这样你就可以对 canvas 做例如 QQ 截图的操作了。

## issue

**已知问题：**

1. 相比起 QQ 等截图工具，打开截图工具没有那么流畅，毕竟人家不是用这种方式的。
2. mac 下面在一个已经全屏的窗口下启动不会去覆盖当前的窗口，只会在一个非全屏的窗口下打开。

## Install

[![NPM](https://nodei.co/npm/electron-shortcut-capture.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/electron-shortcut-capture/)

## Usage

```js
...
import ElectronShortcutCapture from 'electron-shortcut-capture'
const electronShortcutCapture = new ElectronShortcutCapture({
	multiScreen: false
})

electronShortcutCapture.show()

...
```

## Options

```typescript
new ShortcutCapture({
	multiScreen: false
})
```

| 名称               | 类型                                 | 说明                         | 默认值  |
| ------------------ | ------------------------------------ | ---------------------------- | ------- |
| multiScreen        | boolean                              | 是否使用多屏幕截图，默认关闭 | `false` |
| downloadFileprefix | string                               | 下载文件前缀                 |         |
| onClipboard        | (data: Electron.NativeImage) => void | 点击完成返回剪贴板内容       |         |

## Methods

| 名称  | 说明     | 参数 | 返回值 |
| ----- | -------- | ---- | ------ |
| show  | 调用截图 | -    | -      |
| close | 关闭截图 | -    | -      |

## Show

![展示](https://ydy-disk.ydjai.com/c0438457a05061760a1a31357830a8f1_1575078711717_424389.gif '展示')

## TODOS

-   [x] 截图剪贴板
-   [x] 下载截图
-   [x] Mac 多显示，可能会卡顿
-   [x] 画笔
-   [x] 画圆
-   [x] 画方框
-   [x] 画箭头
-   [x] 撤销
-   [x] 放大镜
-   [x] 右键、esc 退出
-   [x] 马赛克
