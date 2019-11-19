import ReactDom from "react-dom";
import React from "react";

import ScreenShot from "./screenShot";

const render = () => {
  ReactDom.render(<ScreenShot />, document.querySelector("#app"));
};
render();
