import debug from "electron-debug";
import { app } from "electron";
import ShortcutCapture from "./shortcut-capture";

app.on("ready", () => {
  // 调试
  debug({ showDevTools: true, devToolsMode: "bottom" });
  new ShortcutCapture();
  // sc.on("capture", ({ dataURL, bounds }) => console.log("capture", bounds));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
