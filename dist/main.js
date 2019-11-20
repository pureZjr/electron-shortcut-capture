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

/***/ "./node_modules/electron-debug sync recursive":
/*!******************************************!*\
  !*** ./node_modules/electron-debug sync ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/electron-debug sync recursive";

/***/ }),

/***/ "./node_modules/electron-debug/index.js":
/*!**********************************************!*\
  !*** ./node_modules/electron-debug/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  app,
  BrowserWindow
} = __webpack_require__(/*! electron */ "electron");

const localShortcut = __webpack_require__(/*! electron-localshortcut */ "./node_modules/electron-localshortcut/index.js");

const isDev = __webpack_require__(/*! electron-is-dev */ "./node_modules/electron-is-dev/index.js");

const isMacOS = process.platform === 'darwin';
const devToolsOptions = {};

function toggleDevTools(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    const {
      webContents
    } = win;

    if (webContents.isDevToolsOpened()) {
      webContents.closeDevTools();
    } else {
      webContents.openDevTools(devToolsOptions);
    }
  }
}

function devTools(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    toggleDevTools(win);
  }
}

function openDevTools(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    win.webContents.openDevTools(devToolsOptions);
  }
}

function refresh(win = BrowserWindow.getFocusedWindow()) {
  if (win) {
    win.webContents.reloadIgnoringCache();
  }
}

function inspectElements() {
  const win = BrowserWindow.getFocusedWindow();

  const inspect = () => {
    win.devToolsWebContents.executeJavaScript('DevToolsAPI.enterInspectElementMode()');
  };

  if (win) {
    if (win.webContents.isDevToolsOpened()) {
      inspect();
    } else {
      win.webContents.once('devtools-opened', inspect);
      win.openDevTools();
    }
  }
}

const addExtensionIfInstalled = (name, getPath) => {
  const isExtensionInstalled = name => {
    return BrowserWindow.getDevToolsExtensions && {}.hasOwnProperty.call(BrowserWindow.getDevToolsExtensions(), name);
  };

  try {
    if (!isExtensionInstalled(name)) {
      BrowserWindow.addDevToolsExtension(getPath(name));
    }
  } catch (_) {}
};

module.exports = options => {
  options = {
    isEnabled: null,
    showDevTools: true,
    devToolsMode: 'previous',
    ...options
  };

  if (options.isEnabled === false || options.isEnabled === null && !isDev) {
    return;
  }

  if (options.devToolsMode !== 'previous') {
    devToolsOptions.mode = options.devToolsMode;
  }

  app.on('browser-window-created', (event, win) => {
    if (options.showDevTools) {
      /// Workaround for https://github.com/electron/electron/issues/12438
      win.webContents.once('dom-ready', () => {
        openDevTools(win, options.showDevTools, false);
      });
    }
  });

  (async () => {
    await app.whenReady();
    addExtensionIfInstalled('devtron', name => __webpack_require__("./node_modules/electron-debug sync recursive")(name).path);
    addExtensionIfInstalled('electron-react-devtools', name => __webpack_require__("./node_modules/electron-debug sync recursive")(name).path);
    localShortcut.register('CommandOrControl+Shift+C', inspectElements);
    localShortcut.register(isMacOS ? 'Command+Alt+I' : 'Control+Shift+I', devTools);
    localShortcut.register('F12', devTools);
    localShortcut.register('CommandOrControl+R', refresh);
    localShortcut.register('F5', refresh);
  })();
};

module.exports.refresh = refresh;
module.exports.devTools = devTools;
module.exports.openDevTools = openDevTools;

/***/ }),

/***/ "./node_modules/electron-is-accelerator/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/electron-is-accelerator/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const modifiers = /^(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super)$/;
const keyCodes = /^([0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]']|F1*[1-9]|F10|F2[0-4]|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/;

module.exports = function (str) {
  let parts = str.split("+");
  let keyFound = false;
  return parts.every((val, index) => {
    const isKey = keyCodes.test(val);
    const isModifier = modifiers.test(val);

    if (isKey) {
      // Key must be unique
      if (keyFound) return false;
      keyFound = true;
    } // Key is required


    if (index === parts.length - 1 && !keyFound) return false;
    return isKey || isModifier;
  });
};

/***/ }),

/***/ "./node_modules/electron-is-dev/index.js":
/*!***********************************************!*\
  !*** ./node_modules/electron-is-dev/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const electron = __webpack_require__(/*! electron */ "electron");

const app = electron.app || electron.remote.app;
const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
module.exports = isEnvSet ? getFromEnv : !app.isPackaged;

/***/ }),

/***/ "./node_modules/electron-localshortcut/index.js":
/*!******************************************************!*\
  !*** ./node_modules/electron-localshortcut/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  app,
  BrowserWindow
} = __webpack_require__(/*! electron */ "electron");

const isAccelerator = __webpack_require__(/*! electron-is-accelerator */ "./node_modules/electron-is-accelerator/index.js");

const equals = __webpack_require__(/*! keyboardevents-areequal */ "./node_modules/keyboardevents-areequal/index.js");

const {
  toKeyEvent
} = __webpack_require__(/*! keyboardevent-from-electron-accelerator */ "./node_modules/keyboardevent-from-electron-accelerator/index.js");

const _debug = __webpack_require__(/*! debug */ "./node_modules/electron-localshortcut/node_modules/debug/src/index.js");

const debug = _debug('electron-localshortcut'); // A placeholder to register shortcuts
// on any window of the app.


const ANY_WINDOW = {};
const windowsWithShortcuts = new WeakMap();

const title = win => {
  if (win) {
    try {
      return win.getTitle();
    } catch {
      return 'A destroyed window';
    }
  }

  return 'An falsy value';
};

function _checkAccelerator(accelerator) {
  if (!isAccelerator(accelerator)) {
    const w = {};
    Error.captureStackTrace(w);
    const stack = w.stack ? w.stack.split('\n').slice(4).join('\n') : w.message;
    const msg = `
WARNING: ${accelerator} is not a valid accelerator.

${stack}
`;
    console.error(msg);
  }
}
/**
 * Disable all of the shortcuts registered on the BrowserWindow instance.
 * Registered shortcuts no more works on the `window` instance, but the module
 * keep a reference on them. You can reactivate them later by calling `enableAll`
 * method on the same window instance.
 * @param  {BrowserWindow} win BrowserWindow instance
 */


function disableAll(win) {
  debug(`Disabling all shortcuts on window ${title(win)}`);
  const wc = win.webContents;
  const shortcutsOfWindow = windowsWithShortcuts.get(wc);

  for (const shortcut of shortcutsOfWindow) {
    shortcut.enabled = false;
  }
}
/**
 * Enable all of the shortcuts registered on the BrowserWindow instance that
 * you had previously disabled calling `disableAll` method.
 * @param  {BrowserWindow} win BrowserWindow instance
 */


function enableAll(win) {
  debug(`Enabling all shortcuts on window ${title(win)}`);
  const wc = win.webContents;
  const shortcutsOfWindow = windowsWithShortcuts.get(wc);

  for (const shortcut of shortcutsOfWindow) {
    shortcut.enabled = true;
  }
}
/**
 * Unregisters all of the shortcuts registered on any focused BrowserWindow
 * instance. This method does not unregister any shortcut you registered on
 * a particular window instance.
 * @param  {BrowserWindow} win BrowserWindow instance
 */


function unregisterAll(win) {
  debug(`Unregistering all shortcuts on window ${title(win)}`);
  const wc = win.webContents;
  const shortcutsOfWindow = windowsWithShortcuts.get(wc);

  if (shortcutsOfWindow && shortcutsOfWindow.removeListener) {
    // Remove listener from window
    shortcutsOfWindow.removeListener();
    windowsWithShortcuts.delete(wc);
  }
}

function _normalizeEvent(input) {
  const normalizedEvent = {
    code: input.code,
    key: input.key
  };
  ['alt', 'shift', 'meta'].forEach(prop => {
    if (typeof input[prop] !== 'undefined') {
      normalizedEvent[`${prop}Key`] = input[prop];
    }
  });

  if (typeof input.control !== 'undefined') {
    normalizedEvent.ctrlKey = input.control;
  }

  return normalizedEvent;
}

function _findShortcut(event, shortcutsOfWindow) {
  let i = 0;

  for (const shortcut of shortcutsOfWindow) {
    if (equals(shortcut.eventStamp, event)) {
      return i;
    }

    i++;
  }

  return -1;
}

const _onBeforeInput = shortcutsOfWindow => (e, input) => {
  if (input.type === 'keyUp') {
    return;
  }

  const event = _normalizeEvent(input);

  debug(`before-input-event: ${input} is translated to: ${event}`);

  for (const {
    eventStamp,
    callback
  } of shortcutsOfWindow) {
    if (equals(eventStamp, event)) {
      debug(`eventStamp: ${eventStamp} match`);
      callback();
      return;
    }

    debug(`eventStamp: ${eventStamp} no match`);
  }
};
/**
 * Registers the shortcut `accelerator`on the BrowserWindow instance.
 * @param  {BrowserWindow} win - BrowserWindow instance to register.
 * This argument could be omitted, in this case the function register
 * the shortcut on all app windows.
 * @param  {String|Array<String>} accelerator - the shortcut to register
 * @param  {Function} callback    This function is called when the shortcut is pressed
 * and the window is focused and not minimized.
 */


function register(win, accelerator, callback) {
  let wc;

  if (typeof callback === 'undefined') {
    wc = ANY_WINDOW;
    callback = accelerator;
    accelerator = win;
  } else {
    wc = win.webContents;
  }

  if (Array.isArray(accelerator) === true) {
    accelerator.forEach(accelerator => {
      if (typeof accelerator === 'string') {
        register(win, accelerator, callback);
      }
    });
    return;
  }

  debug(`Registering callback for ${accelerator} on window ${title(win)}`);

  _checkAccelerator(accelerator);

  debug(`${accelerator} seems a valid shortcut sequence.`);
  let shortcutsOfWindow;

  if (windowsWithShortcuts.has(wc)) {
    debug('Window has others shortcuts registered.');
    shortcutsOfWindow = windowsWithShortcuts.get(wc);
  } else {
    debug('This is the first shortcut of the window.');
    shortcutsOfWindow = [];
    windowsWithShortcuts.set(wc, shortcutsOfWindow);

    if (wc === ANY_WINDOW) {
      const keyHandler = _onBeforeInput(shortcutsOfWindow);

      const enableAppShortcuts = (e, win) => {
        const wc = win.webContents;
        wc.on('before-input-event', keyHandler);
        wc.once('closed', () => wc.removeListener('before-input-event', keyHandler));
      }; // Enable shortcut on current windows


      const windows = BrowserWindow.getAllWindows();
      windows.forEach(win => enableAppShortcuts(null, win)); // Enable shortcut on future windows

      app.on('browser-window-created', enableAppShortcuts);

      shortcutsOfWindow.removeListener = () => {
        const windows = BrowserWindow.getAllWindows();
        windows.forEach(win => win.webContents.removeListener('before-input-event', keyHandler));
        app.removeListener('browser-window-created', enableAppShortcuts);
      };
    } else {
      const keyHandler = _onBeforeInput(shortcutsOfWindow);

      wc.on('before-input-event', keyHandler); // Save a reference to allow remove of listener from elsewhere

      shortcutsOfWindow.removeListener = () => wc.removeListener('before-input-event', keyHandler);

      wc.once('closed', shortcutsOfWindow.removeListener);
    }
  }

  debug('Adding shortcut to window set.');
  const eventStamp = toKeyEvent(accelerator);
  shortcutsOfWindow.push({
    eventStamp,
    callback,
    enabled: true
  });
  debug('Shortcut registered.');
}
/**
 * Unregisters the shortcut of `accelerator` registered on the BrowserWindow instance.
 * @param  {BrowserWindow} win - BrowserWindow instance to unregister.
 * This argument could be omitted, in this case the function unregister the shortcut
 * on all app windows. If you registered the shortcut on a particular window instance, it will do nothing.
 * @param  {String|Array<String>} accelerator - the shortcut to unregister
 */


function unregister(win, accelerator) {
  let wc;

  if (typeof accelerator === 'undefined') {
    wc = ANY_WINDOW;
    accelerator = win;
  } else {
    if (win.isDestroyed()) {
      debug('Early return because window is destroyed.');
      return;
    }

    wc = win.webContents;
  }

  if (Array.isArray(accelerator) === true) {
    accelerator.forEach(accelerator => {
      if (typeof accelerator === 'string') {
        unregister(win, accelerator);
      }
    });
    return;
  }

  debug(`Unregistering callback for ${accelerator} on window ${title(win)}`);

  _checkAccelerator(accelerator);

  debug(`${accelerator} seems a valid shortcut sequence.`);

  if (!windowsWithShortcuts.has(wc)) {
    debug('Early return because window has never had shortcuts registered.');
    return;
  }

  const shortcutsOfWindow = windowsWithShortcuts.get(wc);
  const eventStamp = toKeyEvent(accelerator);

  const shortcutIdx = _findShortcut(eventStamp, shortcutsOfWindow);

  if (shortcutIdx === -1) {
    return;
  }

  shortcutsOfWindow.splice(shortcutIdx, 1); // If the window has no more shortcuts,
  // we remove it early from the WeakMap
  // and unregistering the event listener

  if (shortcutsOfWindow.length === 0) {
    // Remove listener from window
    shortcutsOfWindow.removeListener(); // Remove window from shortcuts catalog

    windowsWithShortcuts.delete(wc);
  }
}
/**
 * Returns `true` or `false` depending on whether the shortcut `accelerator`
 * is registered on `window`.
 * @param  {BrowserWindow} win - BrowserWindow instance to check. This argument
 * could be omitted, in this case the function returns whether the shortcut
 * `accelerator` is registered on all app windows. If you registered the
 * shortcut on a particular window instance, it return false.
 * @param  {String} accelerator - the shortcut to check
 * @return {Boolean} - if the shortcut `accelerator` is registered on `window`.
 */


function isRegistered(win, accelerator) {
  _checkAccelerator(accelerator);

  const wc = win.webContents;
  const shortcutsOfWindow = windowsWithShortcuts.get(wc);
  const eventStamp = toKeyEvent(accelerator);
  return _findShortcut(eventStamp, shortcutsOfWindow) !== -1;
}

module.exports = {
  register,
  unregister,
  isRegistered,
  unregisterAll,
  enableAll,
  disableAll
};

/***/ }),

/***/ "./node_modules/electron-localshortcut/node_modules/debug/src/browser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/electron-localshortcut/node_modules/debug/src/browser.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log(...args) {
  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return typeof console === 'object' && console.log && console.log(...args);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  let r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/electron-localshortcut/node_modules/debug/src/common.js")(exports);
const {
  formatters
} = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),

/***/ "./node_modules/electron-localshortcut/node_modules/debug/src/common.js":
/*!******************************************************************************!*\
  !*** ./node_modules/electron-localshortcut/node_modules/debug/src/common.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    let hash = 0;

    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    let prevTime;

    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      const self = debug; // Set `diff` timestamp

      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        const formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    const index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      const instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    let i;
    let len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

/***/ }),

/***/ "./node_modules/electron-localshortcut/node_modules/debug/src/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/electron-localshortcut/node_modules/debug/src/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/electron-localshortcut/node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/electron-localshortcut/node_modules/debug/src/node.js");
}

/***/ }),

/***/ "./node_modules/electron-localshortcut/node_modules/debug/src/node.js":
/*!****************************************************************************!*\
  !*** ./node_modules/electron-localshortcut/node_modules/debug/src/node.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
const tty = __webpack_require__(/*! tty */ "tty");

const util = __webpack_require__(/*! util */ "util");
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  const supportsColor = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/index.js");

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(key => {
  return /^debug_/i.test(key);
}).reduce((obj, key) => {
  // Camel-case
  const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  let val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  const {
    namespace: name,
    useColors
  } = this;

  if (useColors) {
    const c = this.color;
    const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
    const prefix = `  ${colorCode};1m${name} \u001B[0m`;
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log(...args) {
  return process.stderr.write(util.format(...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  const keys = Object.keys(exports.inspectOpts);

  for (let i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/electron-localshortcut/node_modules/debug/src/common.js")(exports);
const {
  formatters
} = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (flag, argv) => {
  argv = argv || process.argv;
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
  const pos = argv.indexOf(prefix + flag);
  const terminatorPos = argv.indexOf('--');
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

/***/ }),

/***/ "./node_modules/keyboardevent-from-electron-accelerator/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/keyboardevent-from-electron-accelerator/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const modifiers = /^(CommandOrControl|CmdOrCtrl|Command|Cmd|Control|Ctrl|AltGr|Option|Alt|Shift|Super)/i;
const keyCodes = /^(Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen|F24|F23|F22|F21|F20|F19|F18|F17|F16|F15|F14|F13|F12|F11|F10|F9|F8|F7|F6|F5|F4|F3|F2|F1|[0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]'])/i;
const UNSUPPORTED = {};

function _command(accelerator, event, modifier) {
  if (process.platform !== 'darwin') {
    return UNSUPPORTED;
  }

  if (event.metaKey) {
    throw new Error('Double `Command` modifier specified.');
  }

  return {
    event: Object.assign({}, event, {
      metaKey: true
    }),
    accelerator: accelerator.slice(modifier.length)
  };
}

function _super(accelerator, event, modifier) {
  if (event.metaKey) {
    throw new Error('Double `Super` modifier specified.');
  }

  return {
    event: Object.assign({}, event, {
      metaKey: true
    }),
    accelerator: accelerator.slice(modifier.length)
  };
}

function _commandorcontrol(accelerator, event, modifier) {
  if (process.platform === 'darwin') {
    if (event.metaKey) {
      throw new Error('Double `Command` modifier specified.');
    }

    return {
      event: Object.assign({}, event, {
        metaKey: true
      }),
      accelerator: accelerator.slice(modifier.length)
    };
  }

  if (event.ctrlKey) {
    throw new Error('Double `Control` modifier specified.');
  }

  return {
    event: Object.assign({}, event, {
      ctrlKey: true
    }),
    accelerator: accelerator.slice(modifier.length)
  };
}

function _alt(accelerator, event, modifier) {
  if (modifier === 'option' && process.platform !== 'darwin') {
    return UNSUPPORTED;
  }

  if (event.altKey) {
    throw new Error('Double `Alt` modifier specified.');
  }

  return {
    event: Object.assign({}, event, {
      altKey: true
    }),
    accelerator: accelerator.slice(modifier.length)
  };
}

function _shift(accelerator, event, modifier) {
  if (event.shiftKey) {
    throw new Error('Double `Shift` modifier specified.');
  }

  return {
    event: Object.assign({}, event, {
      shiftKey: true
    }),
    accelerator: accelerator.slice(modifier.length)
  };
}

function _control(accelerator, event, modifier) {
  if (event.ctrlKey) {
    throw new Error('Double `Control` modifier specified.');
  }

  return {
    event: Object.assign({}, event, {
      ctrlKey: true
    }),
    accelerator: accelerator.slice(modifier.length)
  };
}

function reduceModifier({
  accelerator,
  event
}, modifier) {
  switch (modifier) {
    case 'command':
    case 'cmd':
      {
        return _command(accelerator, event, modifier);
      }

    case 'super':
      {
        return _super(accelerator, event, modifier);
      }

    case 'control':
    case 'ctrl':
      {
        return _control(accelerator, event, modifier);
      }

    case 'commandorcontrol':
    case 'cmdorctrl':
      {
        return _commandorcontrol(accelerator, event, modifier);
      }

    case 'option':
    case 'altgr':
    case 'alt':
      {
        return _alt(accelerator, event, modifier);
      }

    case 'shift':
      {
        return _shift(accelerator, event, modifier);
      }

    default:
      console.error(modifier);
  }
}

function reducePlus({
  accelerator,
  event
}) {
  return {
    event,
    accelerator: accelerator.trim().slice(1)
  };
}

const virtualKeyCodes = {
  0: 'Digit0',
  1: 'Digit1',
  2: 'Digit2',
  3: 'Digit3',
  4: 'Digit4',
  5: 'Digit5',
  6: 'Digit6',
  7: 'Digit7',
  8: 'Digit8',
  9: 'Digit9',
  '-': 'Minus',
  '=': 'Equal',
  Q: 'KeyQ',
  W: 'KeyW',
  E: 'KeyE',
  R: 'KeyR',
  T: 'KeyT',
  Y: 'KeyY',
  U: 'KeyU',
  I: 'KeyI',
  O: 'KeyO',
  P: 'KeyP',
  '[': 'BracketLeft',
  ']': 'BracketRight',
  A: 'KeyA',
  S: 'KeyS',
  D: 'KeyD',
  F: 'KeyF',
  G: 'KeyG',
  H: 'KeyH',
  J: 'KeyJ',
  K: 'KeyK',
  L: 'KeyL',
  ';': 'Semicolon',
  '\'': 'Quote',
  '`': 'Backquote',
  '/': 'Backslash',
  Z: 'KeyZ',
  X: 'KeyX',
  C: 'KeyC',
  V: 'KeyV',
  B: 'KeyB',
  N: 'KeyN',
  M: 'KeyM',
  ',': 'Comma',
  '.': 'Period',
  '\\': 'Slash',
  ' ': 'Space'
};

function reduceKey({
  accelerator,
  event
}, key) {
  if (key.length > 1 || event.key) {
    throw new Error(`Unvalid keycode \`${key}\`.`);
  }

  const code = key.toUpperCase() in virtualKeyCodes ? virtualKeyCodes[key.toUpperCase()] : null;
  return {
    event: Object.assign({}, event, {
      key
    }, code ? {
      code
    } : null),
    accelerator: accelerator.trim().slice(key.length)
  };
}

const domKeys = Object.assign(Object.create(null), {
  plus: 'Add',
  space: 'Space',
  tab: 'Tab',
  backspace: 'Backspace',
  delete: 'Delete',
  insert: 'Insert',
  return: 'Return',
  enter: 'Return',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  escape: 'Escape',
  esc: 'Escape',
  volumeup: 'AudioVolumeUp',
  volumedown: 'AudioVolumeDown',
  volumemute: 'AudioVolumeMute',
  medianexttrack: 'MediaTrackNext',
  mediaprevioustrack: 'MediaTrackPrevious',
  mediastop: 'MediaStop',
  mediaplaypause: 'MediaPlayPause',
  printscreen: 'PrintScreen'
}); // Add function keys

for (let i = 1; i <= 24; i++) {
  domKeys[`f${i}`] = `F${i}`;
}

function reduceCode({
  accelerator,
  event
}, {
  code,
  key
}) {
  if (event.code) {
    throw new Error(`Duplicated keycode \`${key}\`.`);
  }

  return {
    event: Object.assign({}, event, {
      key
    }, code ? {
      code
    } : null),
    accelerator: accelerator.trim().slice(key && key.length || 0)
  };
}
/**
 * This function transform an Electron Accelerator string into
 * a DOM KeyboardEvent object.
 *
 * @param  {string} accelerator an Electron Accelerator string, e.g. `Ctrl+C` or `Shift+Space`.
 * @return {object} a DOM KeyboardEvent object derivate from the `accelerator` argument.
 */


function toKeyEvent(accelerator) {
  let state = {
    accelerator,
    event: {}
  };

  while (state.accelerator !== '') {
    const modifierMatch = state.accelerator.match(modifiers);

    if (modifierMatch) {
      const modifier = modifierMatch[0].toLowerCase();
      state = reduceModifier(state, modifier);

      if (state === UNSUPPORTED) {
        return {
          unsupportedKeyForPlatform: true
        };
      }
    } else if (state.accelerator.trim()[0] === '+') {
      state = reducePlus(state);
    } else {
      const codeMatch = state.accelerator.match(keyCodes);

      if (codeMatch) {
        const code = codeMatch[0].toLowerCase();

        if (code in domKeys) {
          state = reduceCode(state, {
            code: domKeys[code],
            key: code
          });
        } else {
          state = reduceKey(state, code);
        }
      } else {
        throw new Error(`Unvalid accelerator: "${state.accelerator}"`);
      }
    }
  }

  return state.event;
}

module.exports = {
  UNSUPPORTED,
  reduceModifier,
  reducePlus,
  reduceKey,
  reduceCode,
  toKeyEvent
};

/***/ }),

/***/ "./node_modules/keyboardevents-areequal/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/keyboardevents-areequal/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _lower(key) {
  if (typeof key !== 'string') {
    return key;
  }

  return key.toLowerCase();
}

function areEqual(ev1, ev2) {
  if (ev1 === ev2) {
    // Same object
    // console.log(`Events are same.`)
    return true;
  }

  for (const prop of ['altKey', 'ctrlKey', 'shiftKey', 'metaKey']) {
    const [value1, value2] = [ev1[prop], ev2[prop]];

    if (Boolean(value1) !== Boolean(value2)) {
      // One of the prop is different
      // console.log(`Comparing prop ${prop}: ${value1} ${value2}`);
      return false;
    }
  }

  if (_lower(ev1.key) === _lower(ev2.key) && ev1.key !== undefined || ev1.code === ev2.code && ev1.code !== undefined) {
    // Events are equals
    return true;
  } // Key or code are differents
  // console.log(`key or code are differents. ${ev1.key} !== ${ev2.key} ${ev1.code} !== ${ev2.code}`);


  return false;
}

module.exports = areEqual;

/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),

/***/ "./node_modules/supports-color/index.js":
/*!**********************************************!*\
  !*** ./node_modules/supports-color/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const os = __webpack_require__(/*! os */ "os");

const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const {
  env
} = process;
let forceColor;

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) {
  forceColor = 0;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
  forceColor = 1;
}

if ('FORCE_COLOR' in env) {
  if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
    forceColor = 1;
  } else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
    forceColor = 0;
  } else {
    forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
  }
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}

function supportsColor(stream) {
  if (forceColor === 0) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (stream && !stream.isTTY && forceColor === undefined) {
    return 0;
  }

  const min = forceColor || 0;

  if (env.TERM === 'dumb') {
    return min;
  }

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    const osRelease = os.release().split('.');

    if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }

  if (env.COLORTERM === 'truecolor') {
    return 3;
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;

      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  return min;
}

function getSupportLevel(stream) {
  const level = supportsColor(stream);
  return translateLevel(level);
}

module.exports = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr)
};

/***/ }),

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
                v.show();
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
/* harmony import */ var electron_debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron-debug */ "./node_modules/electron-debug/index.js");
/* harmony import */ var electron_debug__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_debug__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shortcut_capture__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shortcut-capture */ "./src/main/shortcut-capture.ts");



electron__WEBPACK_IMPORTED_MODULE_1__["app"].on('ready', function () {
    // 调试
    electron_debug__WEBPACK_IMPORTED_MODULE_0___default()({ showDevTools: true, devToolsMode: 'right' });
    new _shortcut_capture__WEBPACK_IMPORTED_MODULE_2__["default"]();
    // sc.on("capture", ({ dataURL, bounds }) => console.log("capture", bounds));
});
electron__WEBPACK_IMPORTED_MODULE_1__["app"].on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron__WEBPACK_IMPORTED_MODULE_1__["app"].quit();
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

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });