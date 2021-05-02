function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _createForOfIteratorHelper(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,e=function(){};return{s:e,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return o=t.done,t},e:function(t){i=!0,a=t},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw a}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}import{EMAIL_REG_EXP,SuccessHTTPStatusRange,URL,SHOW_TIME,ErrorDescription}from"./const.js";import{toast,checkValidity}from"./utils.js";var wrapperElement=document.querySelector(".social__form"),formElement=wrapperElement,inputEmailElement=formElement.querySelector("#social-email"),buttonElement=formElement.querySelector(".social__button"),setElementValidityMarker=function(t,e){e.isInvalid?t.classList.add("social__input--invalid"):t.classList.remove("social__input--invalid")};wrapperElement.style.minHeight=wrapperElement.offsetHeight+"px",formElement.setAttribute("novalidate",!0);var toastContainer=document.createElement("div");toastContainer.classList.add("toast"),document.body.append(toastContainer),formElement.addEventListener("submit",function(t){t.preventDefault();var e=checkValidity(inputEmailElement,EMAIL_REG_EXP,ErrorDescription.EMAIL);if(e.isInvalid&&(setElementValidityMarker(inputEmailElement,e),toast(ErrorDescription.EMAIL,toastContainer)),!e.isInvalid){var r,n={},a=_createForOfIteratorHelper(new FormData(t.target).entries());try{for(a.s();!(r=a.n()).done;){var o=r.value;n[o[0]]=_toConsumableArray(o).pop()}}catch(t){a.e(t)}finally{a.f()}inputEmailElement.disabled=!0,buttonElement.disabled=!0,buttonElement.classList.add("social__button--sending"),fetch(URL,{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(function(t){if(t.status<SuccessHTTPStatusRange.MIN||t.status>SuccessHTTPStatusRange.MAX)throw new Error("".concat(t.status,": ").concat(t.statusText));wrapperElement.innerHTML='<p class="social__success">Thanks for subscribing!</p>'}).catch(function(){toast(ErrorDescription.SUBMIT,toastContainer),inputEmailElement.disabled=!1,buttonElement.disabled=!1,buttonElement.classList.remove("social__button--sending")})}});
//# sourceMappingURL=subscribe.js.map
