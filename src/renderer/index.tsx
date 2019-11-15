import kscreenshot from "./kscreenshot/kss";

new kscreenshot({
  key: "shift+alt+w",
  copyPath: dataUrl => {},
  cancelCB: () => {
    console.log("cancelCB");
  }
});
