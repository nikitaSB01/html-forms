/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 930:
/***/ (() => {

document.addEventListener("DOMContentLoaded", () => {
  const popoverBtn = document.getElementById("popover-btn");

  // Создание элемента popover
  const popover = document.createElement("div");
  popover.className = "popover";

  // Установка HTML для заголовка и содержимого popover
  popover.innerHTML = `
      <div class="popover-title">Типа зоголовок Popover</div>
      <div class="popover-content">А это типа интересный контент заголовка Popover.</div>
    `;
  document.body.appendChild(popover);

  // Функция для переключения видимости popover
  function togglePopover() {
    if (popover.style.display === "block") {
      popover.style.display = "none";
    } else {
      popover.style.display = "block";

      // Получение позиции и размера кнопки
      const rect = popoverBtn.getBoundingClientRect();

      // Установка позиции popover относительно кнопки
      const popoverWidth = popover.offsetWidth;
      popover.style.top = `${rect.top - popover.offsetHeight}px`;
      popover.style.left = `${rect.left + rect.width / 2 - popoverWidth / 2}px`;
    }
  }

  // Добавление обработчика событий для кнопки
  popoverBtn.addEventListener("click", togglePopover);

  // Закрытие popover при клике вне его области
  document.addEventListener("click", event => {
    if (!popover.contains(event.target) && event.target !== popoverBtn) {
      popover.style.display = "none";
    }
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(930);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_app__WEBPACK_IMPORTED_MODULE_0__);


})();

/******/ })()
;