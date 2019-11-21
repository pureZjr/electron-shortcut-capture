/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/browserWindowProps.ts":
/*!****************************************!*\
  !*** ./src/main/browserWindowProps.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var browserWindowProps = function (display) {
    return {
        title: 'shortcut-capture',
        width: display.bounds.width,
        height: display.bounds.height,
        x: display.bounds.x,
        y: display.bounds.y,
        type: 'desktop',
        useContentSize: true,
        frame: false,
        show: true,
        autoHideMenuBar: true,
        transparent: process.platform === 'darwin' || process.platform === 'win32',
        // 窗口不可以可以改变尺寸
        resizable: false,
        // 窗口不可以拖动
        movable: false,
        focusable: process.platform === 'win32',
        // 全屏窗口
        fullscreen: true,
        // 在 macOS 上使用 pre-Lion 全屏
        simpleFullscreen: true,
        backgroundColor: '#30000000',
        // 隐藏标题栏, 内容充满整个窗口
        titleBarStyle: 'hidden',
        // 窗口永远在别的窗口的上面
        alwaysOnTop:  false ||
            process.platform === 'darwin',
        // 窗口允许大于屏幕
        enableLargerThanScreen: true,
        // 是否在任务栏中显示窗口
        skipTaskbar: "development" === 'production',
        // 窗口不可以最小化
        minimizable: false,
        // 窗口不可以最大化
        maximizable: false,
        webPreferences: {
            //集成Node
            nodeIntegration: true
        }
    };
};
/* harmony default export */ __webpack_exports__["default"] = (browserWindowProps);


/***/ }),

/***/ "./src/main/events.ts":
/*!****************************!*\
  !*** ./src/main/events.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);


var Events = /** @class */ (function () {
    function Events(props) {
        // 显示器数组
        this.captureWins = [];
        // 正在截屏
        this.isCapturing = false;
        this.captureWins = props.captureWins;
        this.bindOnShow();
        this.bindOnHide();
        this.bindEsc();
        this.show();
        this.bindDownload();
        this.bindClipboard();
        this.listenCapturingDisplayId();
    }
    /**
     * 绑定窗口显示事件
     */
    Events.prototype.bindOnShow = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on('ShortcutCapture::SHOW', function () {
            _this.show();
        });
    };
    Events.prototype.show = function () {
        if (this.isCapturing) {
            return;
        }
        else {
            this.isCapturing = true;
            this.captureWins.map(function (v, idx) {
                v.loadURL("http://localhost:8081");
                v.setVisibleOnAllWorkspaces(true);
                v.setAlwaysOnTop(true, 'screen-saver');
            });
        }
    };
    /**
     * 绑定窗口隐藏事件
     */
    Events.prototype.bindOnHide = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on('ShortcutCapture::HIDE', function () {
            _this.hide();
        });
    };
    Events.prototype.hide = function () {
        this.isCapturing = false;
        this.captureWins.map(function (v, idx) {
            v.setVisibleOnAllWorkspaces(false);
            v.hide();
            v.close();
            v = null;
        });
        this.captureWins = [];
        this.unBindEsc();
    };
    /**
     * 绑定esc退出截图
     */
    Events.prototype.bindEsc = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_0__["globalShortcut"].register('esc', function () {
            _this.hide();
        });
    };
    /**
     * 解绑esc退出截图
     */
    Events.prototype.unBindEsc = function () {
        electron__WEBPACK_IMPORTED_MODULE_0__["globalShortcut"].unregister('esc');
    };
    /**
     * 监听下载事件
     */
    Events.prototype.bindDownload = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on('download', function (_, _a) {
            var currWin = _a.currWin, dataURL = _a.dataURL;
            var base64Data = dataURL.replace(/^data:image\/\w+;base64,/, '');
            var dataBuffer = new Buffer(base64Data, 'base64');
            var filename = new Date().getTime() + '.png';
            var path = electron__WEBPACK_IMPORTED_MODULE_0__["dialog"].showSaveDialogSync(currWin, {
                defaultPath: filename
            });
            try {
                fs__WEBPACK_IMPORTED_MODULE_1___default.a.writeFileSync(path, dataBuffer);
            }
            catch (err) {
                console.log('下载失败：' + err);
            }
            _this.hide();
        });
    };
    /**
     * 绑定剪贴板事件
     */
    Events.prototype.bindClipboard = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on('clipboard', function (_, dataURL) {
            electron__WEBPACK_IMPORTED_MODULE_0__["clipboard"].writeImage(electron__WEBPACK_IMPORTED_MODULE_0__["nativeImage"].createFromDataURL(dataURL));
            _this.hide();
        });
    };
    /**
     * 监听接收的操作截图的显示器id
     */
    Events.prototype.listenCapturingDisplayId = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on('setCapturingDisplayId', function (_, displayId) {
            _this.captureWins.map(function (v) {
                v.webContents.send('receiveCapturingDisplayId', displayId);
            });
        });
    };
    return Events;
}());
/* harmony default export */ __webpack_exports__["default"] = (Events);


/***/ }),

/***/ "./src/main/index.ts":
/*!***************************!*\
  !*** ./src/main/index.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shortcut_capture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shortcut-capture */ "./src/main/shortcut-capture.ts");


electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('ready', function () {
    // debug({ devToolsMode: 'right', showDevTools: true })
    // 调试F12
    // globalShortcut.register('f12', () => {
    // 	debug({ devToolsMode: 'right', showDevTools: true })
    // })
    new _shortcut_capture__WEBPACK_IMPORTED_MODULE_1__["default"]();
    // sc.on("capture", ({ dataURL, bounds }) => console.log("capture", bounds));
});
electron__WEBPACK_IMPORTED_MODULE_0__["app"].on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();
    }
});


/***/ }),

/***/ "./src/main/shortcut-capture.ts":
/*!**************************************!*\
  !*** ./src/main/shortcut-capture.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _browserWindowProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browserWindowProps */ "./src/main/browserWindowProps.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./src/main/events.ts");



var ShortcutCapture = /** @class */ (function () {
    function ShortcutCapture() {
        // 显示器数组
        this.captureWins = [];
        // 是否已经注册开启事件
        this.hasRegisterShortcutCapture = false;
        this.bindShortcutCapture();
    }
    /**
     * 初始化窗口
     */
    ShortcutCapture.prototype.initWin = function () {
        // 获取设备所有显示器
        var displays = electron__WEBPACK_IMPORTED_MODULE_0__["screen"].getAllDisplays();
        this.captureWins = displays.map(function (display) {
            var captureWin = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"](Object(_browserWindowProps__WEBPACK_IMPORTED_MODULE_1__["default"])(display));
            captureWin.loadURL("" + ShortcutCapture.URL);
            // 清除simpleFullscreen状态
            captureWin.on("close", function () { return captureWin.setSimpleFullScreen(false); });
            return captureWin;
        });
        new _events__WEBPACK_IMPORTED_MODULE_2__["default"]({ captureWins: this.captureWins });
    };
    /**
     * 绑定快捷键开启截图
     */
    ShortcutCapture.prototype.bindShortcutCapture = function () {
        var _this = this;
        if (!this.hasRegisterShortcutCapture) {
            electron__WEBPACK_IMPORTED_MODULE_0__["globalShortcut"].register("shift+alt+w", function () {
                _this.hasRegisterShortcutCapture = true;
                _this.initWin();
            });
        }
    };
    ShortcutCapture.URL = "http://localhost:8081";
    return ShortcutCapture;
}());
/* harmony default export */ __webpack_exports__["default"] = (ShortcutCapture);


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });