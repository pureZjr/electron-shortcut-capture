import { ipcRenderer } from "electron";

/**
 * 调用开启截图
 */
export const show = () => {
  ipcRenderer.send("ShortcutCapture::SHOW");
};

/**
 * 调用关闭截图
 */
export const hide = () => {
  ipcRenderer.send("ShortcutCapture::HIDE");
};

/**
 * 绑定截图快捷键
 */
export const bindKey = (key: string) => {
  ipcRenderer.send("key", key);
};
