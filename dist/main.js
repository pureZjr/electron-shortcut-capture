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

/***/ "./node_modules/7zip/index.js":
/*!************************************!*\
  !*** ./node_modules/7zip/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var resolve = __webpack_require__(/*! path */ "path").resolve;

var bin = __webpack_require__(/*! ./package */ "./node_modules/7zip/package.json").bin;

module.exports = map_obj(bin, function (v) {
  return resolve(__dirname, v);
});

function map_obj(obj, fn) {
  return Object.keys(obj).reduce(function (m, k) {
    m[k] = fn(obj[k]);
    return m;
  }, {});
}

/***/ }),

/***/ "./node_modules/7zip/package.json":
/*!****************************************!*\
  !*** ./node_modules/7zip/package.json ***!
  \****************************************/
/*! exports provided: name, version, description, keywords, repository, bin, main, scripts, license, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"7zip\",\"version\":\"0.0.6\",\"description\":\"7zip Windows Package via Node.js\",\"keywords\":[\"7z\",\"7zip\",\"7-zip\",\"windows\",\"install\"],\"repository\":\"git@github.com:fritx/win-7zip.git\",\"bin\":{\"7z\":\"7zip-lite/7z.exe\"},\"main\":\"index.js\",\"scripts\":{\"test\":\"mocha\"},\"license\":\"GNU LGPL\"}");

/***/ }),

/***/ "./node_modules/balanced-match/index.js":
/*!**********************************************!*\
  !*** ./node_modules/balanced-match/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = balanced;

function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);
  var r = range(a, b, str);
  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;

function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();

        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [left, right];
    }
  }

  return result;
}

/***/ }),

/***/ "./node_modules/brace-expansion/index.js":
/*!***********************************************!*\
  !*** ./node_modules/brace-expansion/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(/*! concat-map */ "./node_modules/concat-map/index.js");

var balanced = __webpack_require__(/*! balanced-match */ "./node_modules/balanced-match/index.js");

module.exports = expandTop;
var escSlash = '\0SLASH' + Math.random() + '\0';
var escOpen = '\0OPEN' + Math.random() + '\0';
var escClose = '\0CLOSE' + Math.random() + '\0';
var escComma = '\0COMMA' + Math.random() + '\0';
var escPeriod = '\0PERIOD' + Math.random() + '\0';

function numeric(str) {
  return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
} // Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}


function parseCommaParts(str) {
  if (!str) return [''];
  var parts = [];
  var m = balanced('{', '}', str);
  if (!m) return str.split(',');
  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');
  p[p.length - 1] += '{' + body + '}';
  var postParts = parseCommaParts(post);

  if (post.length) {
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);
  return parts;
}

function expandTop(str) {
  if (!str) return []; // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}

  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}

function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}

function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];
  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];
  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;

  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }

    return [str];
  }

  var n;

  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);

    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);

      if (n.length === 1) {
        var post = m.post.length ? expand(m.post, false) : [''];
        return post.map(function (p) {
          return m.pre + n[0] + p;
        });
      }
    }
  } // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.
  // no need to expand pre, since it is guaranteed to be free of brace-sets


  var pre = m.pre;
  var post = m.post.length ? expand(m.post, false) : [''];
  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length);
    var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
    var test = lte;
    var reverse = y < x;

    if (reverse) {
      incr *= -1;
      test = gte;
    }

    var pad = n.some(isPadded);
    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;

      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\') c = '';
      } else {
        c = String(i);

        if (pad) {
          var need = width - c.length;

          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0) c = '-' + z + c.slice(1);else c = z + c;
          }
        }
      }

      N.push(c);
    }
  } else {
    N = concatMap(n, function (el) {
      return expand(el, false);
    });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion) expansions.push(expansion);
    }
  }

  return expansions;
}

/***/ }),

/***/ "./node_modules/concat-map/index.js":
/*!******************************************!*\
  !*** ./node_modules/concat-map/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    var x = fn(xs[i], i);
    if (isArray(x)) res.push.apply(res, x);else res.push(x);
  }

  return res;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

/***/ }),

/***/ "./node_modules/cross-unzip/index.js":
/*!*******************************************!*\
  !*** ./node_modules/cross-unzip/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var spawn = __webpack_require__(/*! child_process */ "child_process").spawn;

var slice = Array.prototype.slice;
var unzip = process.platform === 'win32' ? forWin32 : forUnix;
unzip.unzip = unzip;
module.exports = unzip; // todo: progress feedback
// https://github.com/fritx/win-7zip

function forWin32(inPath, outPath, callback) {
  var _7z = __webpack_require__(/*! 7zip */ "./node_modules/7zip/index.js")['7z']; // very 奇葩
  // eg. 7z x archive.zip -oc:\Doc


  run(_7z, ['x', inPath, '-y', '-o' + outPath], callback);
}

function forUnix(inPath, outPath, callback) {
  run('unzip', ['-o', inPath, '-d', outPath], callback);
} // https://nodejs.org/api/child_process.html#child_process_event_error
// Note that the 'exit' event may or may not fire after an error has occurred.
// If you are listening to both the 'exit' and 'error' events,
// it is important to guard against accidentally invoking handler functions multiple times.


function run(bin, args, callback) {
  callback = onceify(callback);
  var prc = spawn(bin, args, {
    stdio: 'ignore'
  });
  prc.on('error', function (err) {
    callback(err);
  });
  prc.on('exit', function (code) {
    callback(code ? new Error('Exited with code ' + code) : null);
  });
} // http://stackoverflow.com/questions/30234908/javascript-v8-optimisation-and-leaking-arguments
// javascript V8 optimisation and “leaking arguments”
// making callback to be invoked only once


function onceify(fn) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    fn.apply(this, slice.call(arguments)); // slice arguments
  };
}

/***/ }),

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

/***/ "./node_modules/electron-devtools-installer/dist/downloadChromeExtension.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/electron-devtools-installer/dist/downloadChromeExtension.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _rimraf = __webpack_require__(/*! rimraf */ "./node_modules/rimraf/rimraf.js");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _crossUnzip = __webpack_require__(/*! cross-unzip */ "./node_modules/cross-unzip/index.js");

var _crossUnzip2 = _interopRequireDefault(_crossUnzip);

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/electron-devtools-installer/dist/utils.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var downloadChromeExtension = function downloadChromeExtension(chromeStoreID, forceDownload) {
  var attempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  var extensionsStore = (0, _utils.getPath)();

  if (!_fs2.default.existsSync(extensionsStore)) {
    _fs2.default.mkdirSync(extensionsStore);
  }

  var extensionFolder = _path2.default.resolve(extensionsStore + '/' + chromeStoreID);

  return new Promise(function (resolve, reject) {
    if (!_fs2.default.existsSync(extensionFolder) || forceDownload) {
      if (_fs2.default.existsSync(extensionFolder)) {
        _rimraf2.default.sync(extensionFolder);
      }

      var fileURL = 'https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D' + chromeStoreID + '%26uc&prodversion=32'; // eslint-disable-line

      var filePath = _path2.default.resolve(extensionFolder + '.crx');

      (0, _utils.downloadFile)(fileURL, filePath).then(function () {
        (0, _crossUnzip2.default)(filePath, extensionFolder, function (err) {
          if (err && !_fs2.default.existsSync(_path2.default.resolve(extensionFolder, 'manifest.json'))) {
            return reject(err);
          }

          (0, _utils.changePermissions)(extensionFolder, 755);
          resolve(extensionFolder);
        });
      }).catch(function (err) {
        console.log('Failed to fetch extension, trying ' + (attempts - 1) + ' more times'); // eslint-disable-line

        if (attempts <= 1) {
          return reject(err);
        }

        setTimeout(function () {
          downloadChromeExtension(chromeStoreID, forceDownload, attempts - 1).then(resolve).catch(reject);
        }, 200);
      });
    } else {
      resolve(extensionFolder);
    }
  });
};

exports.default = downloadChromeExtension;

/***/ }),

/***/ "./node_modules/electron-devtools-installer/dist/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/electron-devtools-installer/dist/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOBX_DEVTOOLS = exports.APOLLO_DEVELOPER_TOOLS = exports.CYCLEJS_DEVTOOL = exports.REACT_PERF = exports.REDUX_DEVTOOLS = exports.VUEJS_DEVTOOLS = exports.ANGULARJS_BATARANG = exports.JQUERY_DEBUGGER = exports.BACKBONE_DEBUGGER = exports.REACT_DEVELOPER_TOOLS = exports.EMBER_INSPECTOR = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _electron = __webpack_require__(/*! electron */ "electron");

var _electron2 = _interopRequireDefault(_electron);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _semver = __webpack_require__(/*! semver */ "./node_modules/semver/semver.js");

var _semver2 = _interopRequireDefault(_semver);

var _downloadChromeExtension = __webpack_require__(/*! ./downloadChromeExtension */ "./node_modules/electron-devtools-installer/dist/downloadChromeExtension.js");

var _downloadChromeExtension2 = _interopRequireDefault(_downloadChromeExtension);

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/electron-devtools-installer/dist/utils.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _ref = _electron.remote || _electron2.default,
    BrowserWindow = _ref.BrowserWindow;

var IDMap = {};

var IDMapPath = _path2.default.resolve((0, _utils.getPath)(), 'IDMap.json');

if (_fs2.default.existsSync(IDMapPath)) {
  try {
    IDMap = JSON.parse(_fs2.default.readFileSync(IDMapPath, 'utf8'));
  } catch (err) {
    console.error('electron-devtools-installer: Invalid JSON present in the IDMap file');
  }
}

var install = function install(extensionReference) {
  var forceDownload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Array.isArray(extensionReference)) {
    return Promise.all(extensionReference.map(function (extension) {
      return install(extension, forceDownload);
    }));
  }

  var chromeStoreID = void 0;

  if ((typeof extensionReference === 'undefined' ? 'undefined' : _typeof(extensionReference)) === 'object' && extensionReference.id) {
    chromeStoreID = extensionReference.id;
    var electronVersion = process.versions.electron.split('-')[0];

    if (!_semver2.default.satisfies(electronVersion, extensionReference.electron)) {
      return Promise.reject(new Error('Version of Electron: ' + electronVersion + ' does not match required range ' + extensionReference.electron + ' for extension ' + chromeStoreID) // eslint-disable-line
      );
    }
  } else if (typeof extensionReference === 'string') {
    chromeStoreID = extensionReference;
  } else {
    return Promise.reject(new Error('Invalid extensionReference passed in: "' + extensionReference + '"'));
  }

  var extensionName = IDMap[chromeStoreID];
  var extensionInstalled = extensionName && BrowserWindow.getDevToolsExtensions && BrowserWindow.getDevToolsExtensions()[extensionName];

  if (!forceDownload && extensionInstalled) {
    return Promise.resolve(IDMap[chromeStoreID]);
  }

  return (0, _downloadChromeExtension2.default)(chromeStoreID, forceDownload).then(function (extensionFolder) {
    // Use forceDownload, but already installed
    if (extensionInstalled) {
      BrowserWindow.removeDevToolsExtension(extensionName);
    }

    var name = BrowserWindow.addDevToolsExtension(extensionFolder); // eslint-disable-line

    _fs2.default.writeFileSync(IDMapPath, JSON.stringify(Object.assign(IDMap, _defineProperty({}, chromeStoreID, name))));

    return Promise.resolve(name);
  });
};

exports.default = install;
var EMBER_INSPECTOR = exports.EMBER_INSPECTOR = {
  id: 'bmdblncegkenkacieihfhpjfppoconhi',
  electron: '>=1.2.1'
};
var REACT_DEVELOPER_TOOLS = exports.REACT_DEVELOPER_TOOLS = {
  id: 'fmkadmapgofadopljbjfkapdkoienihi',
  electron: '>=1.2.1'
};
var BACKBONE_DEBUGGER = exports.BACKBONE_DEBUGGER = {
  id: 'bhljhndlimiafopmmhjlgfpnnchjjbhd',
  electron: '>=1.2.1'
};
var JQUERY_DEBUGGER = exports.JQUERY_DEBUGGER = {
  id: 'dbhhnnnpaeobfddmlalhnehgclcmjimi',
  electron: '>=1.2.1'
};
var ANGULARJS_BATARANG = exports.ANGULARJS_BATARANG = {
  id: 'ighdmehidhipcmcojjgiloacoafjmpfk',
  electron: '>=1.2.1'
};
var VUEJS_DEVTOOLS = exports.VUEJS_DEVTOOLS = {
  id: 'nhdogjmejiglipccpnnnanhbledajbpd',
  electron: '>=1.2.1'
};
var REDUX_DEVTOOLS = exports.REDUX_DEVTOOLS = {
  id: 'lmhkpmbekcpmknklioeibfkpmmfibljd',
  electron: '>=1.2.1'
};
var REACT_PERF = exports.REACT_PERF = {
  id: 'hacmcodfllhbnekmghgdlplbdnahmhmm',
  electron: '>=1.2.6'
};
var CYCLEJS_DEVTOOL = exports.CYCLEJS_DEVTOOL = {
  id: 'dfgplfmhhmdekalbpejekgfegkonjpfp',
  electron: '>=1.2.1'
};
var APOLLO_DEVELOPER_TOOLS = exports.APOLLO_DEVELOPER_TOOLS = {
  id: 'jdkknkkbebbapilgoeccciglkfbmbnfm',
  electron: '>=1.2.1'
};
var MOBX_DEVTOOLS = exports.MOBX_DEVTOOLS = {
  id: 'pfgnfdagidkfgccljigdamigbcnndkod',
  electron: '>=1.2.1'
};

/***/ }),

/***/ "./node_modules/electron-devtools-installer/dist/utils.js":
/*!****************************************************************!*\
  !*** ./node_modules/electron-devtools-installer/dist/utils.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePermissions = exports.downloadFile = exports.getPath = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

var _electron2 = _interopRequireDefault(_electron);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _https = __webpack_require__(/*! https */ "https");

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var getPath = exports.getPath = function getPath() {
  var savePath = (_electron.remote || _electron2.default).app.getPath('userData');

  return _path2.default.resolve(savePath + '/extensions');
}; // Use https.get fallback for Electron < 1.4.5


var _ref = _electron.remote || _electron2.default,
    net = _ref.net;

var request = net ? net.request : _https2.default.get;

var downloadFile = exports.downloadFile = function downloadFile(from, to) {
  return new Promise(function (resolve, reject) {
    var req = request(from);
    req.on('response', function (res) {
      // Shouldn't handle redirect with `electron.net`, this is for https.get fallback
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, to).then(resolve).catch(reject);
      }

      res.pipe(_fs2.default.createWriteStream(to)).on('close', resolve);
    });
    req.on('error', reject);
    req.end();
  });
};

var changePermissions = exports.changePermissions = function changePermissions(dir, mode) {
  var files = _fs2.default.readdirSync(dir);

  files.forEach(function (file) {
    var filePath = _path2.default.join(dir, file);

    _fs2.default.chmodSync(filePath, parseInt(mode, 8));

    if (_fs2.default.statSync(filePath).isDirectory()) {
      changePermissions(filePath, mode);
    }
  });
};

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

/***/ "./node_modules/fs.realpath/index.js":
/*!*******************************************!*\
  !*** ./node_modules/fs.realpath/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath;
realpath.realpath = realpath;
realpath.sync = realpathSync;
realpath.realpathSync = realpathSync;
realpath.monkeypatch = monkeypatch;
realpath.unmonkeypatch = unmonkeypatch;

var fs = __webpack_require__(/*! fs */ "fs");

var origRealpath = fs.realpath;
var origRealpathSync = fs.realpathSync;
var version = process.version;
var ok = /^v[0-5]\./.test(version);

var old = __webpack_require__(/*! ./old.js */ "./node_modules/fs.realpath/old.js");

function newError(er) {
  return er && er.syscall === 'realpath' && (er.code === 'ELOOP' || er.code === 'ENOMEM' || er.code === 'ENAMETOOLONG');
}

function realpath(p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb);
  }

  if (typeof cache === 'function') {
    cb = cache;
    cache = null;
  }

  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb);
    } else {
      cb(er, result);
    }
  });
}

function realpathSync(p, cache) {
  if (ok) {
    return origRealpathSync(p, cache);
  }

  try {
    return origRealpathSync(p, cache);
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache);
    } else {
      throw er;
    }
  }
}

function monkeypatch() {
  fs.realpath = realpath;
  fs.realpathSync = realpathSync;
}

function unmonkeypatch() {
  fs.realpath = origRealpath;
  fs.realpathSync = origRealpathSync;
}

/***/ }),

/***/ "./node_modules/fs.realpath/old.js":
/*!*****************************************!*\
  !*** ./node_modules/fs.realpath/old.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var pathModule = __webpack_require__(/*! path */ "path");

var isWindows = process.platform === 'win32';

var fs = __webpack_require__(/*! fs */ "fs"); // JavaScript implementation of realpath, ported from node pre-v6


var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;

  if (DEBUG) {
    var backtrace = new Error();
    callback = debugCallback;
  } else callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation) throw err; // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
          var msg = 'fs: missing callback ' + (err.stack || err.message);
          if (process.traceDeprecation) console.trace(msg);else console.error(msg);
        }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize; // Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']

if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
} // Regex to find the device root, including trailing slash. E.g. 'c:\\'.


if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {}; // current character position in p

  var pos; // the partial path so far, including a trailing slash if any

  var current; // the partial path without a trailing slash (except when pointing at a root)

  var base; // the partial path scanned in the previous round, with slash

  var previous;
  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = ''; // On windows, check that the root exists. On unix there is no need.

    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  } // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.


  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex; // continue if not a symlink

    if (knownHard[base] || cache && cache[base] === base) {
      continue;
    }

    var resolvedLink;

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);

      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      } // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.


      var linkTarget = null;

      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);

        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }

      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }

      resolvedLink = pathModule.resolve(previous, linkTarget); // track this, if given a cache.

      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    } // resolve the link, then start over


    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;
  return p;
};

exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  } // make p is absolute


  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {}; // current character position in p

  var pos; // the partial path so far, including a trailing slash if any

  var current; // the partial path without a trailing slash (except when pointing at a root)

  var base; // the partial path scanned in the previous round, with slash

  var previous;
  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = ''; // On windows, check that the root exists. On unix there is no need.

    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function (err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  } // walk down the path, swapping out linked pathparts for their real
  // values


  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    } // find the next part


    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex; // continue if not a symlink

    if (knownHard[base] || cache && cache[base] === base) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err); // if not a symlink, skip to the next path part

    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    } // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.


    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);

      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }

    fs.stat(base, function (err) {
      if (err) return cb(err);
      fs.readlink(base, function (err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);
    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};

/***/ }),

/***/ "./node_modules/glob/common.js":
/*!*************************************!*\
  !*** ./node_modules/glob/common.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort;
exports.alphasorti = alphasorti;
exports.setopts = setopts;
exports.ownProp = ownProp;
exports.makeAbs = makeAbs;
exports.finish = finish;
exports.mark = mark;
exports.isIgnored = isIgnored;
exports.childrenIgnored = childrenIgnored;

function ownProp(obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field);
}

var path = __webpack_require__(/*! path */ "path");

var minimatch = __webpack_require__(/*! minimatch */ "./node_modules/minimatch/minimatch.js");

var isAbsolute = __webpack_require__(/*! path-is-absolute */ "./node_modules/path-is-absolute/index.js");

var Minimatch = minimatch.Minimatch;

function alphasorti(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

function alphasort(a, b) {
  return a.localeCompare(b);
}

function setupIgnores(self, options) {
  self.ignore = options.ignore || [];
  if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap);
  }
} // ignore patterns are always in dot:true mode.


function ignoreMap(pattern) {
  var gmatcher = null;

  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '');
    gmatcher = new Minimatch(gpattern, {
      dot: true
    });
  }

  return {
    matcher: new Minimatch(pattern, {
      dot: true
    }),
    gmatcher: gmatcher
  };
}

function setopts(self, pattern, options) {
  if (!options) options = {}; // base-matching: just use globstar for that.

  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar");
    }

    pattern = "**/" + pattern;
  }

  self.silent = !!options.silent;
  self.pattern = pattern;
  self.strict = options.strict !== false;
  self.realpath = !!options.realpath;
  self.realpathCache = options.realpathCache || Object.create(null);
  self.follow = !!options.follow;
  self.dot = !!options.dot;
  self.mark = !!options.mark;
  self.nodir = !!options.nodir;
  if (self.nodir) self.mark = true;
  self.sync = !!options.sync;
  self.nounique = !!options.nounique;
  self.nonull = !!options.nonull;
  self.nosort = !!options.nosort;
  self.nocase = !!options.nocase;
  self.stat = !!options.stat;
  self.noprocess = !!options.noprocess;
  self.absolute = !!options.absolute;
  self.maxLength = options.maxLength || Infinity;
  self.cache = options.cache || Object.create(null);
  self.statCache = options.statCache || Object.create(null);
  self.symlinks = options.symlinks || Object.create(null);
  setupIgnores(self, options);
  self.changedCwd = false;
  var cwd = process.cwd();
  if (!ownProp(options, "cwd")) self.cwd = cwd;else {
    self.cwd = path.resolve(options.cwd);
    self.changedCwd = self.cwd !== cwd;
  }
  self.root = options.root || path.resolve(self.cwd, "/");
  self.root = path.resolve(self.root);
  if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/"); // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')

  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
  if (process.platform === "win32") self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
  self.nomount = !!options.nomount; // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.

  options.nonegate = true;
  options.nocomment = true;
  self.minimatch = new Minimatch(pattern, options);
  self.options = self.minimatch.options;
}

function finish(self) {
  var nou = self.nounique;
  var all = nou ? [] : Object.create(null);

  for (var i = 0, l = self.matches.length; i < l; i++) {
    var matches = self.matches[i];

    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i];
        if (nou) all.push(literal);else all[literal] = true;
      }
    } else {
      // had matches
      var m = Object.keys(matches);
      if (nou) all.push.apply(all, m);else m.forEach(function (m) {
        all[m] = true;
      });
    }
  }

  if (!nou) all = Object.keys(all);
  if (!self.nosort) all = all.sort(self.nocase ? alphasorti : alphasort); // at *some* point we statted all of these

  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i]);
    }

    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !/\/$/.test(e);
        var c = self.cache[e] || self.cache[makeAbs(self, e)];
        if (notDir && c) notDir = c !== 'DIR' && !Array.isArray(c);
        return notDir;
      });
    }
  }

  if (self.ignore.length) all = all.filter(function (m) {
    return !isIgnored(self, m);
  });
  self.found = all;
}

function mark(self, p) {
  var abs = makeAbs(self, p);
  var c = self.cache[abs];
  var m = p;

  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c);
    var slash = p.slice(-1) === '/';
    if (isDir && !slash) m += '/';else if (!isDir && slash) m = m.slice(0, -1);

    if (m !== p) {
      var mabs = makeAbs(self, m);
      self.statCache[mabs] = self.statCache[abs];
      self.cache[mabs] = self.cache[abs];
    }
  }

  return m;
} // lotta situps...


function makeAbs(self, f) {
  var abs = f;

  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f);
  } else if (isAbsolute(f) || f === '') {
    abs = f;
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f);
  } else {
    abs = path.resolve(f);
  }

  if (process.platform === 'win32') abs = abs.replace(/\\/g, '/');
  return abs;
} // Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents


function isIgnored(self, path) {
  if (!self.ignore.length) return false;
  return self.ignore.some(function (item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
  });
}

function childrenIgnored(self, path) {
  if (!self.ignore.length) return false;
  return self.ignore.some(function (item) {
    return !!(item.gmatcher && item.gmatcher.match(path));
  });
}

/***/ }),

/***/ "./node_modules/glob/glob.js":
/*!***********************************!*\
  !*** ./node_modules/glob/glob.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.
module.exports = glob;

var fs = __webpack_require__(/*! fs */ "fs");

var rp = __webpack_require__(/*! fs.realpath */ "./node_modules/fs.realpath/index.js");

var minimatch = __webpack_require__(/*! minimatch */ "./node_modules/minimatch/minimatch.js");

var Minimatch = minimatch.Minimatch;

var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits.js");

var EE = __webpack_require__(/*! events */ "events").EventEmitter;

var path = __webpack_require__(/*! path */ "path");

var assert = __webpack_require__(/*! assert */ "assert");

var isAbsolute = __webpack_require__(/*! path-is-absolute */ "./node_modules/path-is-absolute/index.js");

var globSync = __webpack_require__(/*! ./sync.js */ "./node_modules/glob/sync.js");

var common = __webpack_require__(/*! ./common.js */ "./node_modules/glob/common.js");

var alphasort = common.alphasort;
var alphasorti = common.alphasorti;
var setopts = common.setopts;
var ownProp = common.ownProp;

var inflight = __webpack_require__(/*! inflight */ "./node_modules/inflight/inflight.js");

var util = __webpack_require__(/*! util */ "util");

var childrenIgnored = common.childrenIgnored;
var isIgnored = common.isIgnored;

var once = __webpack_require__(/*! once */ "./node_modules/once/once.js");

function glob(pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {};
  if (!options) options = {};

  if (options.sync) {
    if (cb) throw new TypeError('callback provided to sync glob');
    return globSync(pattern, options);
  }

  return new Glob(pattern, options, cb);
}

glob.sync = globSync;
var GlobSync = glob.GlobSync = globSync.GlobSync; // old api surface

glob.glob = glob;

function extend(origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin;
  }

  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_);
  options.noprocess = true;
  var g = new Glob(pattern, options);
  var set = g.minimatch.set;
  if (!pattern) return false;
  if (set.length > 1) return true;

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string') return true;
  }

  return false;
};

glob.Glob = Glob;
inherits(Glob, EE);

function Glob(pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = null;
  }

  if (options && options.sync) {
    if (cb) throw new TypeError('callback provided to sync glob');
    return new GlobSync(pattern, options);
  }

  if (!(this instanceof Glob)) return new Glob(pattern, options, cb);
  setopts(this, pattern, options);
  this._didRealPath = false; // process each pattern in the minimatch set

  var n = this.minimatch.set.length; // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.

  this.matches = new Array(n);

  if (typeof cb === 'function') {
    cb = once(cb);
    this.on('error', cb);
    this.on('end', function (matches) {
      cb(null, matches);
    });
  }

  var self = this;
  this._processing = 0;
  this._emitQueue = [];
  this._processQueue = [];
  this.paused = false;
  if (this.noprocess) return this;
  if (n === 0) return done();
  var sync = true;

  for (var i = 0; i < n; i++) {
    this._process(this.minimatch.set[i], i, false, done);
  }

  sync = false;

  function done() {
    --self._processing;

    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish();
        });
      } else {
        self._finish();
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob);
  if (this.aborted) return;
  if (this.realpath && !this._didRealpath) return this._realpath();
  common.finish(this);
  this.emit('end', this.found);
};

Glob.prototype._realpath = function () {
  if (this._didRealpath) return;
  this._didRealpath = true;
  var n = this.matches.length;
  if (n === 0) return this._finish();
  var self = this;

  for (var i = 0; i < this.matches.length; i++) this._realpathSet(i, next);

  function next() {
    if (--n === 0) self._finish();
  }
};

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index];
  if (!matchset) return cb();
  var found = Object.keys(matchset);
  var self = this;
  var n = found.length;
  if (n === 0) return cb();
  var set = this.matches[index] = Object.create(null);
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p);
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er) set[real] = true;else if (er.syscall === 'stat') set[p] = true;else self.emit('error', er); // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set;
        cb();
      }
    });
  });
};

Glob.prototype._mark = function (p) {
  return common.mark(this, p);
};

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f);
};

Glob.prototype.abort = function () {
  this.aborted = true;
  this.emit('abort');
};

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true;
    this.emit('pause');
  }
};

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume');
    this.paused = false;

    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0);

      this._emitQueue.length = 0;

      for (var i = 0; i < eq.length; i++) {
        var e = eq[i];

        this._emitMatch(e[0], e[1]);
      }
    }

    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0);

      this._processQueue.length = 0;

      for (var i = 0; i < pq.length; i++) {
        var p = pq[i];
        this._processing--;

        this._process(p[0], p[1], p[2], p[3]);
      }
    }
  }
};

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob);
  assert(typeof cb === 'function');
  if (this.aborted) return;
  this._processing++;

  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb]);

    return;
  } //console.error('PROCESS %d', this._processing, pattern)
  // Get the first [n] parts of pattern that are all strings.


  var n = 0;

  while (typeof pattern[n] === 'string') {
    n++;
  } // now n is the index of the first one that is *not* a string.
  // see if there's anything else


  var prefix;

  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb);

      return;

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null;
      break;

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/');
      break;
  }

  var remain = pattern.slice(n); // get the list of entries.

  var read;
  if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
    read = prefix;
  } else read = prefix;

  var abs = this._makeAbs(read); //if ignored, skip _processing


  if (childrenIgnored(this, read)) return cb();
  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
  if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
};

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this;

  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
  });
};

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  // if the abs isn't a dir, then nothing can match!
  if (!entries) return cb(); // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.

  var pn = remain[0];
  var negate = !!this.minimatch.negate;
  var rawGlob = pn._glob;
  var dotOk = this.dot || rawGlob.charAt(0) === '.';
  var matchedEntries = [];

  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];

    if (e.charAt(0) !== '.' || dotOk) {
      var m;

      if (negate && !prefix) {
        m = !e.match(pn);
      } else {
        m = e.match(pn);
      }

      if (m) matchedEntries.push(e);
    }
  } //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)


  var len = matchedEntries.length; // If there are no matched entries, then nothing matches.

  if (len === 0) return cb(); // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index]) this.matches[index] = Object.create(null);

    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];

      if (prefix) {
        if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e);
      }

      this._emitMatch(index, e);
    } // This was the last one, and no stats were needed


    return cb();
  } // now test all matched entries as stand-ins for that part
  // of the pattern.


  remain.shift();

  for (var i = 0; i < len; i++) {
    var e = matchedEntries[i];
    var newPattern;

    if (prefix) {
      if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
    }

    this._process([e].concat(remain), index, inGlobStar, cb);
  }

  cb();
};

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted) return;
  if (isIgnored(this, e)) return;

  if (this.paused) {
    this._emitQueue.push([index, e]);

    return;
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e);
  if (this.mark) e = this._mark(e);
  if (this.absolute) e = abs;
  if (this.matches[index][e]) return;

  if (this.nodir) {
    var c = this.cache[abs];
    if (c === 'DIR' || Array.isArray(c)) return;
  }

  this.matches[index][e] = true;
  var st = this.statCache[abs];
  if (st) this.emit('stat', e, st);
  this.emit('match', e);
};

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted) return; // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation

  if (this.follow) return this._readdir(abs, false, cb);
  var lstatkey = 'lstat\0' + abs;
  var self = this;
  var lstatcb = inflight(lstatkey, lstatcb_);
  if (lstatcb) fs.lstat(abs, lstatcb);

  function lstatcb_(er, lstat) {
    if (er && er.code === 'ENOENT') return cb();
    var isSym = lstat && lstat.isSymbolicLink();
    self.symlinks[abs] = isSym; // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.

    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE';
      cb();
    } else self._readdir(abs, false, cb);
  }
};

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted) return;
  cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
  if (!cb) return; //console.error('RD %j %j', +inGlobStar, abs)

  if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs];
    if (!c || c === 'FILE') return cb();
    if (Array.isArray(c)) return cb(null, c);
  }

  var self = this;
  fs.readdir(abs, readdirCb(this, abs, cb));
};

function readdirCb(self, abs, cb) {
  return function (er, entries) {
    if (er) self._readdirError(abs, er, cb);else self._readdirEntries(abs, entries, cb);
  };
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted) return; // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.

  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (abs === '/') e = abs + e;else e = abs + '/' + e;
      this.cache[e] = true;
    }
  }

  this.cache[abs] = entries;
  return cb(null, entries);
};

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted) return; // handle errors, and cache the information

  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205

    case 'ENOTDIR':
      // totally normal. means it *does* exist.
      var abs = this._makeAbs(f);

      this.cache[abs] = 'FILE';

      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
        error.path = this.cwd;
        error.code = er.code;
        this.emit('error', error);
        this.abort();
      }

      break;

    case 'ENOENT': // not terribly unusual

    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false;
      break;

    default:
      // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false;

      if (this.strict) {
        this.emit('error', er); // If the error is handled, then we abort
        // if not, we threw out of here

        this.abort();
      }

      if (!this.silent) console.error('glob error', er);
      break;
  }

  return cb();
};

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this;

  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
  });
};

Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)
  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries) return cb(); // test without the globstar, and with every child both below
  // and replacing the globstar.

  var remainWithoutGlobStar = remain.slice(1);
  var gspref = prefix ? [prefix] : [];
  var noGlobStar = gspref.concat(remainWithoutGlobStar); // the noGlobStar pattern exits the inGlobStar state

  this._process(noGlobStar, index, false, cb);

  var isSym = this.symlinks[abs];
  var len = entries.length; // If it's a symlink, and we're in a globstar, then stop

  if (isSym && inGlobStar) return cb();

  for (var i = 0; i < len; i++) {
    var e = entries[i];
    if (e.charAt(0) === '.' && !this.dot) continue; // these two cases enter the inGlobStar state

    var instead = gspref.concat(entries[i], remainWithoutGlobStar);

    this._process(instead, index, true, cb);

    var below = gspref.concat(entries[i], remain);

    this._process(below, index, true, cb);
  }

  cb();
};

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this;

  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb);
  });
};

Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {
  //console.error('ps2', prefix, exists)
  if (!this.matches[index]) this.matches[index] = Object.create(null); // If it doesn't exist, then just mark the lack of results

  if (!exists) return cb();

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix);

    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix);
    } else {
      prefix = path.resolve(this.root, prefix);
      if (trail) prefix += '/';
    }
  }

  if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/'); // Mark this as a match

  this._emitMatch(index, prefix);

  cb();
}; // Returns either 'DIR', 'FILE', or false


Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f);

  var needDir = f.slice(-1) === '/';
  if (f.length > this.maxLength) return cb();

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs];
    if (Array.isArray(c)) c = 'DIR'; // It exists, but maybe not how we need it

    if (!needDir || c === 'DIR') return cb(null, c);
    if (needDir && c === 'FILE') return cb(); // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists;
  var stat = this.statCache[abs];

  if (stat !== undefined) {
    if (stat === false) return cb(null, stat);else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE';
      if (needDir && type === 'FILE') return cb();else return cb(null, type, stat);
    }
  }

  var self = this;
  var statcb = inflight('stat\0' + abs, lstatcb_);
  if (statcb) fs.lstat(abs, statcb);

  function lstatcb_(er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er) self._stat2(f, abs, null, lstat, cb);else self._stat2(f, abs, er, stat, cb);
      });
    } else {
      self._stat2(f, abs, er, lstat, cb);
    }
  }
};

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false;
    return cb();
  }

  var needDir = f.slice(-1) === '/';
  this.statCache[abs] = stat;
  if (abs.slice(-1) === '/' && stat && !stat.isDirectory()) return cb(null, false, stat);
  var c = true;
  if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
  this.cache[abs] = this.cache[abs] || c;
  if (needDir && c === 'FILE') return cb();
  return cb(null, c, stat);
};

/***/ }),

/***/ "./node_modules/glob/sync.js":
/*!***********************************!*\
  !*** ./node_modules/glob/sync.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync;
globSync.GlobSync = GlobSync;

var fs = __webpack_require__(/*! fs */ "fs");

var rp = __webpack_require__(/*! fs.realpath */ "./node_modules/fs.realpath/index.js");

var minimatch = __webpack_require__(/*! minimatch */ "./node_modules/minimatch/minimatch.js");

var Minimatch = minimatch.Minimatch;

var Glob = __webpack_require__(/*! ./glob.js */ "./node_modules/glob/glob.js").Glob;

var util = __webpack_require__(/*! util */ "util");

var path = __webpack_require__(/*! path */ "path");

var assert = __webpack_require__(/*! assert */ "assert");

var isAbsolute = __webpack_require__(/*! path-is-absolute */ "./node_modules/path-is-absolute/index.js");

var common = __webpack_require__(/*! ./common.js */ "./node_modules/glob/common.js");

var alphasort = common.alphasort;
var alphasorti = common.alphasorti;
var setopts = common.setopts;
var ownProp = common.ownProp;
var childrenIgnored = common.childrenIgnored;
var isIgnored = common.isIgnored;

function globSync(pattern, options) {
  if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
  return new GlobSync(pattern, options).found;
}

function GlobSync(pattern, options) {
  if (!pattern) throw new Error('must provide pattern');
  if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
  if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);
  setopts(this, pattern, options);
  if (this.noprocess) return this;
  var n = this.minimatch.set.length;
  this.matches = new Array(n);

  for (var i = 0; i < n; i++) {
    this._process(this.minimatch.set[i], i, false);
  }

  this._finish();
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync);

  if (this.realpath) {
    var self = this;
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null);

      for (var p in matchset) {
        try {
          p = self._makeAbs(p);
          var real = rp.realpathSync(p, self.realpathCache);
          set[real] = true;
        } catch (er) {
          if (er.syscall === 'stat') set[self._makeAbs(p)] = true;else throw er;
        }
      }
    });
  }

  common.finish(this);
};

GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync); // Get the first [n] parts of pattern that are all strings.

  var n = 0;

  while (typeof pattern[n] === 'string') {
    n++;
  } // now n is the index of the first one that is *not* a string.
  // See if there's anything else


  var prefix;

  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index);

      return;

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null;
      break;

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/');
      break;
  }

  var remain = pattern.slice(n); // get the list of entries.

  var read;
  if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
    read = prefix;
  } else read = prefix;

  var abs = this._makeAbs(read); //if ignored, skip processing


  if (childrenIgnored(this, read)) return;
  var isGlobStar = remain[0] === minimatch.GLOBSTAR;
  if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
};

GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar); // if the abs isn't a dir, then nothing can match!


  if (!entries) return; // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.

  var pn = remain[0];
  var negate = !!this.minimatch.negate;
  var rawGlob = pn._glob;
  var dotOk = this.dot || rawGlob.charAt(0) === '.';
  var matchedEntries = [];

  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];

    if (e.charAt(0) !== '.' || dotOk) {
      var m;

      if (negate && !prefix) {
        m = !e.match(pn);
      } else {
        m = e.match(pn);
      }

      if (m) matchedEntries.push(e);
    }
  }

  var len = matchedEntries.length; // If there are no matched entries, then nothing matches.

  if (len === 0) return; // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index]) this.matches[index] = Object.create(null);

    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];

      if (prefix) {
        if (prefix.slice(-1) !== '/') e = prefix + '/' + e;else e = prefix + e;
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e);
      }

      this._emitMatch(index, e);
    } // This was the last one, and no stats were needed


    return;
  } // now test all matched entries as stand-ins for that part
  // of the pattern.


  remain.shift();

  for (var i = 0; i < len; i++) {
    var e = matchedEntries[i];
    var newPattern;
    if (prefix) newPattern = [prefix, e];else newPattern = [e];

    this._process(newPattern.concat(remain), index, inGlobStar);
  }
};

GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e)) return;

  var abs = this._makeAbs(e);

  if (this.mark) e = this._mark(e);

  if (this.absolute) {
    e = abs;
  }

  if (this.matches[index][e]) return;

  if (this.nodir) {
    var c = this.cache[abs];
    if (c === 'DIR' || Array.isArray(c)) return;
  }

  this.matches[index][e] = true;
  if (this.stat) this._stat(e);
};

GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow) return this._readdir(abs, false);
  var entries;
  var lstat;
  var stat;

  try {
    lstat = fs.lstatSync(abs);
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null;
    }
  }

  var isSym = lstat && lstat.isSymbolicLink();
  this.symlinks[abs] = isSym; // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.

  if (!isSym && lstat && !lstat.isDirectory()) this.cache[abs] = 'FILE';else entries = this._readdir(abs, false);
  return entries;
};

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries;
  if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs];
    if (!c || c === 'FILE') return null;
    if (Array.isArray(c)) return c;
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs));
  } catch (er) {
    this._readdirError(abs, er);

    return null;
  }
};

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (abs === '/') e = abs + e;else e = abs + '/' + e;
      this.cache[e] = true;
    }
  }

  this.cache[abs] = entries; // mark and cache dir-ness

  return entries;
};

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205

    case 'ENOTDIR':
      // totally normal. means it *does* exist.
      var abs = this._makeAbs(f);

      this.cache[abs] = 'FILE';

      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd);
        error.path = this.cwd;
        error.code = er.code;
        throw error;
      }

      break;

    case 'ENOENT': // not terribly unusual

    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false;
      break;

    default:
      // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false;
      if (this.strict) throw er;
      if (!this.silent) console.error('glob error', er);
      break;
  }
};

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar); // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt


  if (!entries) return; // test without the globstar, and with every child both below
  // and replacing the globstar.

  var remainWithoutGlobStar = remain.slice(1);
  var gspref = prefix ? [prefix] : [];
  var noGlobStar = gspref.concat(remainWithoutGlobStar); // the noGlobStar pattern exits the inGlobStar state

  this._process(noGlobStar, index, false);

  var len = entries.length;
  var isSym = this.symlinks[abs]; // If it's a symlink, and we're in a globstar, then stop

  if (isSym && inGlobStar) return;

  for (var i = 0; i < len; i++) {
    var e = entries[i];
    if (e.charAt(0) === '.' && !this.dot) continue; // these two cases enter the inGlobStar state

    var instead = gspref.concat(entries[i], remainWithoutGlobStar);

    this._process(instead, index, true);

    var below = gspref.concat(entries[i], remain);

    this._process(below, index, true);
  }
};

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix);

  if (!this.matches[index]) this.matches[index] = Object.create(null); // If it doesn't exist, then just mark the lack of results

  if (!exists) return;

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix);

    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix);
    } else {
      prefix = path.resolve(this.root, prefix);
      if (trail) prefix += '/';
    }
  }

  if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/'); // Mark this as a match

  this._emitMatch(index, prefix);
}; // Returns either 'DIR', 'FILE', or false


GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f);

  var needDir = f.slice(-1) === '/';
  if (f.length > this.maxLength) return false;

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs];
    if (Array.isArray(c)) c = 'DIR'; // It exists, but maybe not how we need it

    if (!needDir || c === 'DIR') return c;
    if (needDir && c === 'FILE') return false; // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists;
  var stat = this.statCache[abs];

  if (!stat) {
    var lstat;

    try {
      lstat = fs.lstatSync(abs);
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false;
        return false;
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs);
      } catch (er) {
        stat = lstat;
      }
    } else {
      stat = lstat;
    }
  }

  this.statCache[abs] = stat;
  var c = true;
  if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
  this.cache[abs] = this.cache[abs] || c;
  if (needDir && c === 'FILE') return false;
  return c;
};

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p);
};

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f);
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

/***/ "./node_modules/inflight/inflight.js":
/*!*******************************************!*\
  !*** ./node_modules/inflight/inflight.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(/*! wrappy */ "./node_modules/wrappy/wrappy.js");

var reqs = Object.create(null);

var once = __webpack_require__(/*! once */ "./node_modules/once/once.js");

module.exports = wrappy(inflight);

function inflight(key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb);
    return null;
  } else {
    reqs[key] = [cb];
    return makeres(key);
  }
}

function makeres(key) {
  return once(function RES() {
    var cbs = reqs[key];
    var len = cbs.length;
    var args = slice(arguments); // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.

    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        delete reqs[key];
      }
    }
  });
}

function slice(args) {
  var length = args.length;
  var array = [];

  for (var i = 0; i < length; i++) array[i] = args[i];

  return array;
}

/***/ }),

/***/ "./node_modules/inherits/inherits.js":
/*!*******************************************!*\
  !*** ./node_modules/inherits/inherits.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(/*! util */ "util");
  /* istanbul ignore next */


  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(/*! ./inherits_browser.js */ "./node_modules/inherits/inherits_browser.js");
}

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;

      var TempCtor = function () {};

      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

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

/***/ "./node_modules/minimatch/minimatch.js":
/*!*********************************************!*\
  !*** ./node_modules/minimatch/minimatch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch;
minimatch.Minimatch = Minimatch;
var path = {
  sep: '/'
};

try {
  path = __webpack_require__(/*! path */ "path");
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};

var expand = __webpack_require__(/*! brace-expansion */ "./node_modules/brace-expansion/index.js");

var plTypes = {
  '!': {
    open: '(?:(?!(?:',
    close: '))[^/]*?)'
  },
  '?': {
    open: '(?:',
    close: ')?'
  },
  '+': {
    open: '(?:',
    close: ')+'
  },
  '*': {
    open: '(?:',
    close: ')*'
  },
  '@': {
    open: '(?:',
    close: ')'
  }
}; // any single thing other than /
// don't need to escape / when using new RegExp()

var qmark = '[^/]'; // * => any number of characters

var star = qmark + '*?'; // ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.

var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'; // not a ^ or / followed by a dot,
// followed by anything, any number of times.

var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'; // characters that need to be escaped in RegExp.

var reSpecials = charSet('().*{}+?[]^$\\!'); // "abc" -> { a:true, b:true, c:true }

function charSet(s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true;
    return set;
  }, {});
} // normalizes slashes.


var slashSplit = /\/+/;
minimatch.filter = filter;

function filter(pattern, options) {
  options = options || {};
  return function (p, i, list) {
    return minimatch(p, pattern, options);
  };
}

function ext(a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function (k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function (k) {
    t[k] = a[k];
  });
  return t;
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch;
  var orig = minimatch;

  var m = function minimatch(p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options));
  };

  m.Minimatch = function Minimatch(pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options));
  };

  return m;
};

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch;
  return minimatch.defaults(def).Minimatch;
};

function minimatch(p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required');
  }

  if (!options) options = {}; // shortcut: comments match nothing.

  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false;
  } // "" only matches ""


  if (pattern.trim() === '') return p === '';
  return new Minimatch(pattern, options).match(p);
}

function Minimatch(pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options);
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required');
  }

  if (!options) options = {};
  pattern = pattern.trim(); // windows support: need to use /, not \

  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/');
  }

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false; // make the set of regexps etc.

  this.make();
}

Minimatch.prototype.debug = function () {};

Minimatch.prototype.make = make;

function make() {
  // don't do it more than once.
  if (this._made) return;
  var pattern = this.pattern;
  var options = this.options; // empty patterns and comments match nothing.

  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return;
  }

  if (!pattern) {
    this.empty = true;
    return;
  } // step 1: figure out negation, etc.


  this.parseNegate(); // step 2: expand braces

  var set = this.globSet = this.braceExpand();
  if (options.debug) this.debug = console.error;
  this.debug(this.pattern, set); // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters

  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit);
  });
  this.debug(this.pattern, set); // glob --> regexps

  set = set.map(function (s, si, set) {
    return s.map(this.parse, this);
  }, this);
  this.debug(this.pattern, set); // filter out everything that didn't compile properly.

  set = set.filter(function (s) {
    return s.indexOf(false) === -1;
  });
  this.debug(this.pattern, set);
  this.set = set;
}

Minimatch.prototype.parseNegate = parseNegate;

function parseNegate() {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;
  if (options.nonegate) return;

  for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
    negate = !negate;
    negateOffset++;
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
} // Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c


minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options);
};

Minimatch.prototype.braceExpand = braceExpand;

function braceExpand(pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }

  pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern');
  }

  if (options.nobrace || !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern];
  }

  return expand(pattern);
} // parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.


Minimatch.prototype.parse = parse;
var SUBPARSE = {};

function parse(pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long');
  }

  var options = this.options; // shortcuts

  if (!options.noglobstar && pattern === '**') return GLOBSTAR;
  if (pattern === '') return '';
  var re = '';
  var hasMagic = !!options.nocase;
  var escaping = false; // ? => one single character

  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1; // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.

  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
  var self = this;

  function clearStateChar() {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star;
          hasMagic = true;
          break;

        case '?':
          re += qmark;
          hasMagic = true;
          break;

        default:
          re += '\\' + stateChar;
          break;
      }

      self.debug('clearStateChar %j %j', stateChar, re);
      stateChar = false;
    }
  }

  for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c); // skip over any that are escaped.

    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue;
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false;

      case '\\':
        clearStateChar();
        escaping = true;
        continue;
      // the various stateChar values
      // for the "extglob" stuff.

      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c); // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp

        if (inClass) {
          this.debug('  in class');
          if (c === '!' && i === classStart + 1) c = '^';
          re += c;
          continue;
        } // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.


        self.debug('call clearStateChar %j', stateChar);
        clearStateChar();
        stateChar = c; // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.

        if (options.noext) clearStateChar();
        continue;

      case '(':
        if (inClass) {
          re += '(';
          continue;
        }

        if (!stateChar) {
          re += '\\(';
          continue;
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        }); // negation is (?:(?!js)[^/]*)

        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
        this.debug('plType %j %j', stateChar, re);
        stateChar = false;
        continue;

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)';
          continue;
        }

        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop(); // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>

        re += pl.close;

        if (pl.type === '!') {
          negativeLists.push(pl);
        }

        pl.reEnd = re.length;
        continue;

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|';
          escaping = false;
          continue;
        }

        clearStateChar();
        re += '|';
        continue;
      // these are mostly the same in regexp and glob

      case '[':
        // swallow any state-tracking char before the [
        clearStateChar();

        if (inClass) {
          re += '\\' + c;
          continue;
        }

        inClass = true;
        classStart = i;
        reClassStart = re.length;
        re += c;
        continue;

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c;
          escaping = false;
          continue;
        } // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"


        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i);

          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue;
          }
        } // finish up the class.


        hasMagic = true;
        inClass = false;
        re += c;
        continue;

      default:
        // swallow any state char that wasn't consumed
        clearStateChar();

        if (escaping) {
          // no need
          escaping = false;
        } else if (reSpecials[c] && !(c === '^' && inClass)) {
          re += '\\';
        }

        re += c;
    } // switch

  } // for
  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"


  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  } // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.


  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug('setting tail', re, pl); // maybe some even number of \, then maybe 1 \, followed by a |

    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\';
      } // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.


      return $1 + $1 + $2 + '|';
    });
    this.debug('tail=%j\n   %s', tail, tail, pl, re);
    var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  } // handle trailing things that only matter at the very end.


  clearStateChar();

  if (escaping) {
    // trailing \\
    re += '\\\\';
  } // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot


  var addPatternStart = false;

  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(':
      addPatternStart = true;
  } // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.


  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];
    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);
    nlLast += nlAfter; // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.

    var openParensBefore = nlBefore.split('(').length - 1;
    var cleanAfter = nlAfter;

    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
    }

    nlAfter = cleanAfter;
    var dollar = '';

    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$';
    }

    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  } // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.


  if (re !== '' && hasMagic) {
    re = '(?=.)' + re;
  }

  if (addPatternStart) {
    re = patternStart + re;
  } // parsing just a piece of a larger pattern.


  if (isSub === SUBPARSE) {
    return [re, hasMagic];
  } // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.


  if (!hasMagic) {
    return globUnescape(pattern);
  }

  var flags = options.nocase ? 'i' : '';

  try {
    var regExp = new RegExp('^' + re + '$', flags);
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.');
  }

  regExp._glob = pattern;
  regExp._src = re;
  return regExp;
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe();
};

Minimatch.prototype.makeRe = makeRe;

function makeRe() {
  if (this.regexp || this.regexp === false) return this.regexp; // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.

  var set = this.set;

  if (!set.length) {
    this.regexp = false;
    return this.regexp;
  }

  var options = this.options;
  var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
  var flags = options.nocase ? 'i' : '';
  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
    }).join('\\\/');
  }).join('|'); // must match entire pattern
  // ending in a * or ** will make it less strict.

  re = '^(?:' + re + ')$'; // can match anything, as long as it's not this.

  if (this.negate) re = '^(?!' + re + ').*$';

  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }

  return this.regexp;
}

minimatch.match = function (list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function (f) {
    return mm.match(f);
  });

  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }

  return list;
};

Minimatch.prototype.match = match;

function match(f, partial) {
  this.debug('match', f, this.pattern); // short-circuit in the case of busted things.
  // comments, etc.

  if (this.comment) return false;
  if (this.empty) return f === '';
  if (f === '/' && partial) return true;
  var options = this.options; // windows: need to use /, not \

  if (path.sep !== '/') {
    f = f.split(path.sep).join('/');
  } // treat the test path as a set of pathparts.


  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f); // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set;
  this.debug(this.pattern, 'set', set); // Find the basename of the path by looking for the last non-empty segment

  var filename;
  var i;

  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename) break;
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;

    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }

    var hit = this.matchOne(file, pattern, partial);

    if (hit) {
      if (options.flipNegate) return true;
      return !this.negate;
    }
  } // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.


  if (options.flipNegate) return false;
  return this.negate;
} // set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.


Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options;
  this.debug('matchOne', {
    'this': this,
    file: file,
    pattern: pattern
  });
  this.debug('matchOne', file.length, pattern.length);

  for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
    this.debug('matchOne loop');
    var p = pattern[pi];
    var f = file[fi];
    this.debug(pattern, p, f); // should be impossible.
    // some invalid regexp stuff in the set.

    if (p === false) return false;

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f]); // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit

      var fr = fi;
      var pr = pi + 1;

      if (pr === pl) {
        this.debug('** at the end'); // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.

        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
        }

        return true;
      } // ok, let's see if we can swallow whatever we can.


      while (fr < fl) {
        var swallowee = file[fr];
        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee); // XXX remove this slice.  Just pass the start index.

        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee); // found a match.

          return true;
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
            this.debug('dot detected!', file, fr, pattern, pr);
            break;
          } // ** swallows a segment, and continue.


          this.debug('globstar swallow a segment, and continue');
          fr++;
        }
      } // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then


      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
        if (fr === fl) return true;
      }

      return false;
    } // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.


    var hit;

    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }

      this.debug('string match', p, f, hit);
    } else {
      hit = f.match(p);
      this.debug('pattern match', p, f, hit);
    }

    if (!hit) return false;
  } // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*
  // now either we fell off the end of the pattern, or we're done.


  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true;
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial;
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = fi === fl - 1 && file[fi] === '';
    return emptyFileEnd;
  } // should be unreachable.


  throw new Error('wtf?');
}; // replace stuff like \* with *


function globUnescape(s) {
  return s.replace(/\\(.)/g, '$1');
}

function regExpEscape(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

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

/***/ "./node_modules/once/once.js":
/*!***********************************!*\
  !*** ./node_modules/once/once.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(/*! wrappy */ "./node_modules/wrappy/wrappy.js");

module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);
once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this);
    },
    configurable: true
  });
  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this);
    },
    configurable: true
  });
});

function once(fn) {
  var f = function () {
    if (f.called) return f.value;
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };

  f.called = false;
  return f;
}

function onceStrict(fn) {
  var f = function () {
    if (f.called) throw new Error(f.onceError);
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };

  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f;
}

/***/ }),

/***/ "./node_modules/path-is-absolute/index.js":
/*!************************************************!*\
  !*** ./node_modules/path-is-absolute/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
  return path.charAt(0) === '/';
}

function win32(path) {
  // https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
  var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
  var result = splitDeviceRe.exec(path);
  var device = result[1] || '';
  var isUnc = Boolean(device && device.charAt(1) !== ':'); // UNC paths are always absolute

  return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;

/***/ }),

/***/ "./node_modules/rimraf/rimraf.js":
/*!***************************************!*\
  !*** ./node_modules/rimraf/rimraf.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = rimraf;
rimraf.sync = rimrafSync;

var assert = __webpack_require__(/*! assert */ "assert");

var path = __webpack_require__(/*! path */ "path");

var fs = __webpack_require__(/*! fs */ "fs");

var glob = undefined;

try {
  glob = __webpack_require__(/*! glob */ "./node_modules/glob/glob.js");
} catch (_err) {// treat glob as optional.
}

var _0666 = parseInt('666', 8);

var defaultGlobOpts = {
  nosort: true,
  silent: true
}; // for EMFILE handling

var timeout = 0;
var isWindows = process.platform === "win32";

function defaults(options) {
  var methods = ['unlink', 'chmod', 'stat', 'lstat', 'rmdir', 'readdir'];
  methods.forEach(function (m) {
    options[m] = options[m] || fs[m];
    m = m + 'Sync';
    options[m] = options[m] || fs[m];
  });
  options.maxBusyTries = options.maxBusyTries || 3;
  options.emfileWait = options.emfileWait || 1000;

  if (options.glob === false) {
    options.disableGlob = true;
  }

  if (options.disableGlob !== true && glob === undefined) {
    throw Error('glob dependency not found, set `options.disableGlob = true` if intentional');
  }

  options.disableGlob = options.disableGlob || false;
  options.glob = options.glob || defaultGlobOpts;
}

function rimraf(p, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  assert(p, 'rimraf: missing path');
  assert.equal(typeof p, 'string', 'rimraf: path should be a string');
  assert.equal(typeof cb, 'function', 'rimraf: callback function required');
  assert(options, 'rimraf: invalid options argument provided');
  assert.equal(typeof options, 'object', 'rimraf: options should be object');
  defaults(options);
  var busyTries = 0;
  var errState = null;
  var n = 0;
  if (options.disableGlob || !glob.hasMagic(p)) return afterGlob(null, [p]);
  options.lstat(p, function (er, stat) {
    if (!er) return afterGlob(null, [p]);
    glob(p, options.glob, afterGlob);
  });

  function next(er) {
    errState = errState || er;
    if (--n === 0) cb(errState);
  }

  function afterGlob(er, results) {
    if (er) return cb(er);
    n = results.length;
    if (n === 0) return cb();
    results.forEach(function (p) {
      rimraf_(p, options, function CB(er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
            busyTries++;
            var time = busyTries * 100; // try again, with the same exact callback as this one.

            return setTimeout(function () {
              rimraf_(p, options, CB);
            }, time);
          } // this one won't happen if graceful-fs is used.


          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB);
            }, timeout++);
          } // already gone


          if (er.code === "ENOENT") er = null;
        }

        timeout = 0;
        next(er);
      });
    });
  }
} // Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.


function rimraf_(p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function'); // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.

  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT") return cb(null); // Windows can EPERM on stat.  Life is suffering.

    if (er && er.code === "EPERM" && isWindows) fixWinEPERM(p, options, er, cb);
    if (st && st.isDirectory()) return rmdir(p, options, er, cb);
    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT") return cb(null);
        if (er.code === "EPERM") return isWindows ? fixWinEPERM(p, options, er, cb) : rmdir(p, options, er, cb);
        if (er.code === "EISDIR") return rmdir(p, options, er, cb);
      }

      return cb(er);
    });
  });
}

function fixWinEPERM(p, options, er, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function');
  if (er) assert(er instanceof Error);
  options.chmod(p, _0666, function (er2) {
    if (er2) cb(er2.code === "ENOENT" ? null : er);else options.stat(p, function (er3, stats) {
      if (er3) cb(er3.code === "ENOENT" ? null : er);else if (stats.isDirectory()) rmdir(p, options, er, cb);else options.unlink(p, cb);
    });
  });
}

function fixWinEPERMSync(p, options, er) {
  assert(p);
  assert(options);
  if (er) assert(er instanceof Error);

  try {
    options.chmodSync(p, _0666);
  } catch (er2) {
    if (er2.code === "ENOENT") return;else throw er;
  }

  try {
    var stats = options.statSync(p);
  } catch (er3) {
    if (er3.code === "ENOENT") return;else throw er;
  }

  if (stats.isDirectory()) rmdirSync(p, options, er);else options.unlinkSync(p);
}

function rmdir(p, options, originalEr, cb) {
  assert(p);
  assert(options);
  if (originalEr) assert(originalEr instanceof Error);
  assert(typeof cb === 'function'); // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.

  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options, cb);else if (er && er.code === "ENOTDIR") cb(originalEr);else cb(er);
  });
}

function rmkids(p, options, cb) {
  assert(p);
  assert(options);
  assert(typeof cb === 'function');
  options.readdir(p, function (er, files) {
    if (er) return cb(er);
    var n = files.length;
    if (n === 0) return options.rmdir(p, cb);
    var errState;
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState) return;
        if (er) return cb(errState = er);
        if (--n === 0) options.rmdir(p, cb);
      });
    });
  });
} // this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.


function rimrafSync(p, options) {
  options = options || {};
  defaults(options);
  assert(p, 'rimraf: missing path');
  assert.equal(typeof p, 'string', 'rimraf: path should be a string');
  assert(options, 'rimraf: missing options');
  assert.equal(typeof options, 'object', 'rimraf: options should be object');
  var results;

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p];
  } else {
    try {
      options.lstatSync(p);
      results = [p];
    } catch (er) {
      results = glob.sync(p, options.glob);
    }
  }

  if (!results.length) return;

  for (var i = 0; i < results.length; i++) {
    var p = results[i];

    try {
      var st = options.lstatSync(p);
    } catch (er) {
      if (er.code === "ENOENT") return; // Windows can EPERM on stat.  Life is suffering.

      if (er.code === "EPERM" && isWindows) fixWinEPERMSync(p, options, er);
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory()) rmdirSync(p, options, null);else options.unlinkSync(p);
    } catch (er) {
      if (er.code === "ENOENT") return;
      if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
      if (er.code !== "EISDIR") throw er;
      rmdirSync(p, options, er);
    }
  }
}

function rmdirSync(p, options, originalEr) {
  assert(p);
  assert(options);
  if (originalEr) assert(originalEr instanceof Error);

  try {
    options.rmdirSync(p);
  } catch (er) {
    if (er.code === "ENOENT") return;
    if (er.code === "ENOTDIR") throw originalEr;
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options);
  }
}

function rmkidsSync(p, options) {
  assert(p);
  assert(options);
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options);
  }); // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.

  var retries = isWindows ? 100 : 1;
  var i = 0;

  do {
    var threw = true;

    try {
      var ret = options.rmdirSync(p, options);
      threw = false;
      return ret;
    } finally {
      if (++i < retries && threw) continue;
    }
  } while (true);
}

/***/ }),

/***/ "./node_modules/semver/semver.js":
/*!***************************************!*\
  !*** ./node_modules/semver/semver.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports = module.exports = SemVer;
var debug;
/* istanbul ignore next */

if (typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift('SEMVER');
    console.log.apply(console, args);
  };
} else {
  debug = function () {};
} // Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.


exports.SEMVER_SPEC_VERSION = '2.0.0';
var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */
9007199254740991; // Max safe segment length for coercion.

var MAX_SAFE_COMPONENT_LENGTH = 16; // The actual regexps go on exports.re

var re = exports.re = [];
var src = exports.src = [];
var R = 0; // The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'; // ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'; // ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')'; // ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')'; // ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'; // ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'; // ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'; // ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
src[FULL] = '^' + FULLPLAIN + '$'; // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.

var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';
var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)'; // Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.

var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'; // Coercion.
// Extract anything that could conceivably be a part of a valid semver

var COERCE = R++;
src[COERCE] = '(?:^|[^\\d])' + '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' + '(?:$|[^\\d])'; // Tilde ranges.
// Meaning is "reasonably at or greater than"

var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';
var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';
var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'; // Caret ranges.
// Meaning is "at least and backwards compatible with"

var LONECARET = R++;
src[LONECARET] = '(?:\\^)';
var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';
var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'; // A simple gt/lt/eq thing, or just "" to indicate "any version"

var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'; // An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`

var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'; // this one has to use the /g flag

re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3'; // Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.

var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$'; // Star ranges basically just allow anything at all.

var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*'; // Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.

for (var i = 0; i < R; i++) {
  debug(i, src[i]);

  if (!re[i]) {
    re[i] = new RegExp(src[i]);
  }
}

exports.parse = parse;

function parse(version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (version instanceof SemVer) {
    return version;
  }

  if (typeof version !== 'string') {
    return null;
  }

  if (version.length > MAX_LENGTH) {
    return null;
  }

  var r = options.loose ? re[LOOSE] : re[FULL];

  if (!r.test(version)) {
    return null;
  }

  try {
    return new SemVer(version, options);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;

function valid(version, options) {
  var v = parse(version, options);
  return v ? v.version : null;
}

exports.clean = clean;

function clean(version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version;
    } else {
      version = version.version;
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options);
  }

  debug('SemVer', version, options);
  this.options = options;
  this.loose = !!options.loose;
  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);

  if (!m) {
    throw new TypeError('Invalid Version: ' + version);
  }

  this.raw = version; // these are actually numbers

  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version');
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version');
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version');
  } // numberify any prerelease numeric ids


  if (!m[4]) {
    this.prerelease = [];
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;

        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num;
        }
      }

      return id;
    });
  }

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch;

  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.');
  }

  return this.version;
};

SemVer.prototype.toString = function () {
  return this.version;
};

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other);

  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  }

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  }

  return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options);
  } // NOT having a prerelease is > having one


  if (this.prerelease.length && !other.prerelease.length) {
    return -1;
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1;
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0;
  }

  var i = 0;

  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);

    if (a === undefined && b === undefined) {
      return 0;
    } else if (b === undefined) {
      return 1;
    } else if (a === undefined) {
      return -1;
    } else if (a === b) {
      continue;
    } else {
      return compareIdentifiers(a, b);
    }
  } while (++i);
}; // preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.


SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;

    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;

    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.

    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier);
      }

      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
        this.major++;
      }

      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;

    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++;
      }

      this.patch = 0;
      this.prerelease = [];
      break;

    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++;
      }

      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.

    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0];
      } else {
        var i = this.prerelease.length;

        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }

        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0);
        }
      }

      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0];
          }
        } else {
          this.prerelease = [identifier, 0];
        }
      }

      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }

  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;

function inc(version, release, loose, identifier) {
  if (typeof loose === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;

function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    var prefix = '';

    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre';
      var defaultResult = 'prerelease';
    }

    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key;
        }
      }
    }

    return defaultResult; // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers;
var numeric = /^[0-9]+$/;

function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
}

exports.rcompareIdentifiers = rcompareIdentifiers;

function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;

function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;

function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;

function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;

function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;

function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;

function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;

function sort(list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;

function rsort(list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;

function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;

function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;

function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;

function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;

function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;

function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;

function cmp(a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      return a === b;

    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      return a !== b;

    case '':
    case '=':
    case '==':
      return eq(a, b, loose);

    case '!=':
      return neq(a, b, loose);

    case '>':
      return gt(a, b, loose);

    case '>=':
      return gte(a, b, loose);

    case '<':
      return lt(a, b, loose);

    case '<=':
      return lte(a, b, loose);

    default:
      throw new TypeError('Invalid operator: ' + op);
  }
}

exports.Comparator = Comparator;

function Comparator(comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp;
    } else {
      comp = comp.value;
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options);
  }

  debug('comparator', comp, options);
  this.options = options;
  this.loose = !!options.loose;
  this.parse(comp);

  if (this.semver === ANY) {
    this.value = '';
  } else {
    this.value = this.operator + this.semver.version;
  }

  debug('comp', this);
}

var ANY = {};

Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp);
  }

  this.operator = m[1];

  if (this.operator === '=') {
    this.operator = '';
  } // if it literally is just '>' or '' then allow anything.


  if (!m[2]) {
    this.semver = ANY;
  } else {
    this.semver = new SemVer(m[2], this.options.loose);
  }
};

Comparator.prototype.toString = function () {
  return this.value;
};

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose);

  if (this.semver === ANY) {
    return true;
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options);
  }

  return cmp(version, this.operator, this.semver, this.options);
};

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options);
    return satisfies(this.value, rangeTmp, options);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options);
    return satisfies(comp.semver, rangeTmp, options);
  }

  var sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
  var oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
  return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};

exports.Range = Range;

function Range(range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    };
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
      return range;
    } else {
      return new Range(range.raw, options);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options);
  }

  if (!(this instanceof Range)) {
    return new Range(range, options);
  }

  this.options = options;
  this.loose = !!options.loose;
  this.includePrerelease = !!options.includePrerelease; // First, split based on boolean or ||

  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim());
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function () {
  return this.range;
};

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose;
  range = range.trim(); // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`

  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range); // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`

  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]); // `~ 1.2.3` => `~1.2.3`

  range = range.replace(re[TILDETRIM], tildeTrimReplace); // `^ 1.2.3` => `^1.2.3`

  range = range.replace(re[CARETTRIM], caretTrimReplace); // normalize spaces

  range = range.split(/\s+/).join(' '); // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options);
  }, this).join(' ').split(/\s+/);

  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe);
    });
  }

  set = set.map(function (comp) {
    return new Comparator(comp, this.options);
  }, this);
  return set;
};

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options);
        });
      });
    });
  });
}; // Mostly just for testing and legacy API reasons


exports.toComparators = toComparators;

function toComparators(range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
} // comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.


function parseComparator(comp, options) {
  debug('comp', comp, options);
  comp = replaceCarets(comp, options);
  debug('caret', comp);
  comp = replaceTildes(comp, options);
  debug('tildes', comp);
  comp = replaceXRanges(comp, options);
  debug('xrange', comp);
  comp = replaceStars(comp, options);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
} // ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0


function replaceTildes(comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options);
  }).join(' ');
}

function replaceTilde(comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    } else if (pr) {
      debug('replaceTilde pr', pr);
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
    }

    debug('tilde return', ret);
    return ret;
  });
} // ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0


function replaceCarets(comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options);
  }).join(' ');
}

function replaceCaret(comp, options) {
  debug('caret', comp, options);
  var r = options.loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M)) {
      ret = '';
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
      }
    } else if (pr) {
      debug('replaceCaret pr', pr);

      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + m + '.' + (+p + 1);
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + M + '.' + (+m + 1) + '.0';
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr + ' <' + (+M + 1) + '.0.0';
      }
    } else {
      debug('no pr');

      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);
        } else {
          ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
      }
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, options) {
  debug('replaceXRanges', comp, options);
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options);
  }).join(' ');
}

function replaceXRange(comp, options) {
  comp = comp.trim();
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX) {
      gtlt = '';
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0;
      }

      p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';

        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';

        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);
    return ret;
  });
} // Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.


function replaceStars(comp, options) {
  debug('replaceStars', comp, options); // Looseness is ignored here.  star is always as loose as it gets!

  return comp.trim().replace(re[STAR], '');
} // This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0


function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = '';
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0';
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0';
  } else {
    from = '>=' + from;
  }

  if (isX(tM)) {
    to = '';
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0';
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  } else {
    to = '<=' + to;
  }

  return (from + ' ' + to).trim();
} // if ANY of the sets match ALL of its comparators, then pass


Range.prototype.test = function (version) {
  if (!version) {
    return false;
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options);
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true;
    }
  }

  return false;
};

function testSet(set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver);

      if (set[i].semver === ANY) {
        continue;
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;

        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    } // Version has a -pre, but it's not one of the ones we like.


    return false;
  }

  return true;
}

exports.satisfies = satisfies;

function satisfies(version, range, options) {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false;
  }

  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;

function maxSatisfying(versions, range, options) {
  var max = null;
  var maxSV = null;

  try {
    var rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }

  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, options);
      }
    }
  });
  return max;
}

exports.minSatisfying = minSatisfying;

function minSatisfying(versions, range, options) {
  var min = null;
  var minSV = null;

  try {
    var rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }

  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, options);
      }
    }
  });
  return min;
}

exports.minVersion = minVersion;

function minVersion(range, loose) {
  range = new Range(range, loose);
  var minver = new SemVer('0.0.0');

  if (range.test(minver)) {
    return minver;
  }

  minver = new SemVer('0.0.0-0');

  if (range.test(minver)) {
    return minver;
  }

  minver = null;

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];
    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version);

      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }

          compver.raw = compver.format();

        /* fallthrough */

        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver;
          }

          break;

        case '<':
        case '<=':
          /* Ignore maximum versions */
          break;

        /* istanbul ignore next */

        default:
          throw new Error('Unexpected operation: ' + comparator.operator);
      }
    });
  }

  if (minver && range.test(minver)) {
    return minver;
  }

  return null;
}

exports.validRange = validRange;

function validRange(range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*';
  } catch (er) {
    return null;
  }
} // Determine if version is less than all the versions possible in the range


exports.ltr = ltr;

function ltr(version, range, options) {
  return outside(version, range, '<', options);
} // Determine if version is greater than all the versions possible in the range.


exports.gtr = gtr;

function gtr(version, range, options) {
  return outside(version, range, '>', options);
}

exports.outside = outside;

function outside(version, range, hilo, options) {
  version = new SemVer(version, options);
  range = new Range(range, options);
  var gtfn, ltefn, ltfn, comp, ecomp;

  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;

    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;

    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  } // If it satisifes the range it is not outside


  if (satisfies(version, range, options)) {
    return false;
  } // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.


  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];
    var high = null;
    var low = null;
    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0');
      }

      high = high || comparator;
      low = low || comparator;

      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator;
      }
    }); // If the edge version comparator has a operator then our version
    // isn't outside it

    if (high.operator === comp || high.operator === ecomp) {
      return false;
    } // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range


    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }

  return true;
}

exports.prerelease = prerelease;

function prerelease(version, options) {
  var parsed = parse(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
}

exports.intersects = intersects;

function intersects(r1, r2, options) {
  r1 = new Range(r1, options);
  r2 = new Range(r2, options);
  return r1.intersects(r2);
}

exports.coerce = coerce;

function coerce(version) {
  if (version instanceof SemVer) {
    return version;
  }

  if (typeof version !== 'string') {
    return null;
  }

  var match = version.match(re[COERCE]);

  if (match == null) {
    return null;
  }

  return parse(match[1] + '.' + (match[2] || '0') + '.' + (match[3] || '0'));
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

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

/***/ }),

/***/ "./node_modules/wrappy/wrappy.js":
/*!***************************************!*\
  !*** ./node_modules/wrappy/wrappy.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy;

function wrappy(fn, cb) {
  if (fn && cb) return wrappy(fn)(cb);
  if (typeof fn !== 'function') throw new TypeError('need wrapper function');
  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });
  return wrapper;

  function wrapper() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    var ret = fn.apply(this, args);
    var cb = args[args.length - 1];

    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }

    return ret;
  }
}

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
/* harmony import */ var electron_devtools_installer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron-devtools-installer */ "./node_modules/electron-devtools-installer/dist/index.js");
/* harmony import */ var electron_devtools_installer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron_devtools_installer__WEBPACK_IMPORTED_MODULE_3__);




electron__WEBPACK_IMPORTED_MODULE_1__["app"].on('ready', function () {
    electron_devtools_installer__WEBPACK_IMPORTED_MODULE_3___default()(electron_devtools_installer__WEBPACK_IMPORTED_MODULE_3__["VUEJS_DEVTOOLS"]).catch(function (err) {
        console.log('Unable to install `vue-devtools`: \n', err);
    });
    var sc = new _shortcut_capture__WEBPACK_IMPORTED_MODULE_2__["default"]();
    electron__WEBPACK_IMPORTED_MODULE_1__["globalShortcut"].register('shift+q', function () {
        sc.shortcutCapture();
    });
    sc.on('capture', function (_a) {
        var dataURL = _a.dataURL, bounds = _a.bounds;
        return console.log('capture', bounds);
    });
    electron_debug__WEBPACK_IMPORTED_MODULE_0___default()({ showDevTools: true, devToolsMode: 'undocked' });
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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);



var ShortcutCapture = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ShortcutCapture, _super);
    /**
     * isUseClipboard是否把内容写入到剪切板
     * @param {*} params
     */
    function ShortcutCapture(_a) {
        var _b = (_a === void 0 ? {} : _a).isUseClipboard, isUseClipboard = _b === void 0 ? true : _b;
        var _this = _super.call(this) || this;
        // 截图窗口对象
        _this.$win = null;
        _this.onShortcutCapture(isUseClipboard);
        _this.onShow();
        _this.onHide();
        return _this;
    }
    /**
     * 初始化窗口
     */
    ShortcutCapture.prototype.initWin = function () {
        var $win = new electron__WEBPACK_IMPORTED_MODULE_2__["BrowserWindow"]({
            title: 'shortcut-capture',
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            type: 'desktop',
            useContentSize: true,
            frame: false,
            show: false,
            autoHideMenuBar: true,
            transparent: process.platform === 'darwin' || process.platform === 'win32',
            resizable: false,
            movable: false,
            focusable: process.platform === 'win32',
            fullscreen: true,
            // 设为true mac全屏窗口没有桌面滚动效果
            simpleFullscreen: true,
            backgroundColor: '#30000000',
            titleBarStyle: 'hidden',
            alwaysOnTop:  false || process.platform === 'darwin',
            enableLargerThanScreen: true,
            skipTaskbar: "development" === 'production',
            minimizable: false,
            maximizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        // 清除simpleFullscreen状态
        $win.on('close', function () { return $win.setSimpleFullScreen(false); });
        $win.loadURL(ShortcutCapture.URL);
        return $win;
    };
    /**
     * 调用截图
     */
    ShortcutCapture.prototype.shortcutCapture = function () {
        if (this.$win)
            this.$win.close();
        this.$win = this.initWin();
        this.registerESC();
    };
    /**
     * 绑定截图确定后的时间回调
     * @param {*} isUseClipboard
     */
    ShortcutCapture.prototype.onShortcutCapture = function (isUseClipboard) {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_2__["ipcMain"].on('ShortcutCapture::CAPTURE', function (e, dataURL, bounds) {
            if (isUseClipboard) {
                electron__WEBPACK_IMPORTED_MODULE_2__["clipboard"].writeImage(electron__WEBPACK_IMPORTED_MODULE_2__["nativeImage"].createFromDataURL(dataURL));
            }
            _this.emit('capture', { dataURL: dataURL, bounds: bounds });
        });
    };
    /**
     * 绑定窗口显示事件
     */
    ShortcutCapture.prototype.onShow = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_2__["ipcMain"].on('ShortcutCapture::SHOW', function (e, bounds) {
            if (!_this.$win)
                return;
            _this.$win.show();
            console.log('bounds', bounds);
            _this.$win.setBounds(bounds);
            _this.$win.focus();
            _this.$win.on('show', function () {
                _this.$win.setBounds(bounds);
                _this.$win.focus();
            });
        });
    };
    /**
     * 关闭截图
     */
    ShortcutCapture.prototype.close = function () {
        if (!this.$win)
            return;
        this.$win.hide();
        this.$win.setSimpleFullScreen(false);
        this.$win.close();
        this.$win = null;
        electron__WEBPACK_IMPORTED_MODULE_2__["globalShortcut"].unregister('esc');
    };
    /**
     * 绑定窗口隐藏事件
     */
    ShortcutCapture.prototype.onHide = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_2__["ipcMain"].on('ShortcutCapture::HIDE', function (e, bounds) {
            if (!_this.$win)
                return;
            _this.$win.hide();
            _this.$win.setSimpleFullScreen(false);
            _this.$win.close();
            _this.$win = null;
        });
    };
    /**
     * 按esc关闭截图
     */
    ShortcutCapture.prototype.registerESC = function () {
        var _this = this;
        electron__WEBPACK_IMPORTED_MODULE_2__["globalShortcut"].register('esc', function () { return _this.close(); });
    };
    /**
     * html文件路径地址
     */
    ShortcutCapture.URL = 'http://localhost:8080';
    return ShortcutCapture;
}(events__WEBPACK_IMPORTED_MODULE_1___default.a));
/* harmony default export */ __webpack_exports__["default"] = (ShortcutCapture);


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

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