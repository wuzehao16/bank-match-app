module.exports =
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/_document.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_document__ = __webpack_require__("next/document");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_document___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_document__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_components__ = __webpack_require__("styled-components");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_styled_components__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_jss_lib_JssProvider__ = __webpack_require__("react-jss/lib/JssProvider");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_jss_lib_JssProvider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_jss_lib_JssProvider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_styled_jsx_server__ = __webpack_require__("styled-jsx/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_styled_jsx_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_styled_jsx_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_getPageContext__ = __webpack_require__("./src/getPageContext.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = 'D:\\project\\bank-match-app\\pages\\_document.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var MyDocument = function (_Document) {
  _inherits(MyDocument, _Document);

  function MyDocument() {
    _classCallCheck(this, MyDocument);

    return _possibleConstructorReturn(this, (MyDocument.__proto__ || Object.getPrototypeOf(MyDocument)).apply(this, arguments));
  }

  _createClass(MyDocument, [{
    key: 'render',
    value: function render() {
      var pageContext = this.props.pageContext;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'html',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1_next_document__["Head"],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'title',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 21
              }
            },
            'My page'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { charSet: 'utf-8', __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            }
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', {
            name: 'viewport',
            content: 'user-scalable=0, initial-scale=1, ' + 'minimum-scale=1, width=device-width, height=device-height',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            }
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            }
          }),
          this.props.styleTags
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'body',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 39
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_document__["Main"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 40
            }
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_document__["NextScript"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 41
            }
          })
        )
      );
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var renderPage = _ref.renderPage;

      var sheet = new __WEBPACK_IMPORTED_MODULE_2_styled_components__["ServerStyleSheet"]();
      var page = renderPage(function (App) {
        return function (props) {
          return sheet.collectStyles(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(App, _extends({}, props, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 10
            }
          })));
        };
      });
      var styleTags = sheet.getStyleElement();
      return _extends({}, page, { styleTags: styleTags });
    }
  }]);

  return MyDocument;
}(__WEBPACK_IMPORTED_MODULE_1_next_document___default.a);

/* harmony default export */ __webpack_exports__["default"] = (MyDocument);

/***/ }),

/***/ "./src/getPageContext.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jss__ = __webpack_require__("jss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_material_ui_styles__ = __webpack_require__("material-ui/styles");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_material_ui_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_purple__ = __webpack_require__("material-ui/colors/purple");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_purple___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_material_ui_colors_purple__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_green__ = __webpack_require__("material-ui/colors/green");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_green___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_material_ui_colors_green__);
/* eslint-disable no-underscore-dangle */






// A theme with custom primary and secondary color.
// It's optional.
var theme = Object(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles__["createMuiTheme"])({
  palette: {
    primary: {
      light: __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_purple___default.a[300],
      main: __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_purple___default.a[500],
      dark: __WEBPACK_IMPORTED_MODULE_2_material_ui_colors_purple___default.a[700]
    },
    secondary: {
      light: __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_green___default.a[300],
      main: __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_green___default.a[500],
      dark: __WEBPACK_IMPORTED_MODULE_3_material_ui_colors_green___default.a[700]
    }
  }
});

function createPageContext() {
  return {
    theme: theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new __WEBPACK_IMPORTED_MODULE_0_jss__["SheetsRegistry"](),
    // The standard class name generator.
    generateClassName: Object(__WEBPACK_IMPORTED_MODULE_1_material_ui_styles__["createGenerateClassName"])()
  };
}

function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/_document.js");


/***/ }),

/***/ "jss":
/***/ (function(module, exports) {

module.exports = require("jss");

/***/ }),

/***/ "material-ui/colors/green":
/***/ (function(module, exports) {

module.exports = require("material-ui/colors/green");

/***/ }),

/***/ "material-ui/colors/purple":
/***/ (function(module, exports) {

module.exports = require("material-ui/colors/purple");

/***/ }),

/***/ "material-ui/styles":
/***/ (function(module, exports) {

module.exports = require("material-ui/styles");

/***/ }),

/***/ "next/document":
/***/ (function(module, exports) {

module.exports = require("next/document");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-jss/lib/JssProvider":
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/JssProvider");

/***/ }),

/***/ "styled-components":
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "styled-jsx/server":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/server");

/***/ })

/******/ });
//# sourceMappingURL=_document.js.map