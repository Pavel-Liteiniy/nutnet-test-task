import{SHOW_TIME,ErrorDescription}from"./const.js";var toast=function(t,i){var e=document.createElement("div");e.textContent=t,e.classList.add("toast__item"),i.append(e),setTimeout(function(){e.remove()},SHOW_TIME)},checkValidity=function(t,i){var e=t.value,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:ErrorDescription.DEFAULT,o=!(3<arguments.length&&void 0!==arguments[3])||arguments[3];return 0===e.length&&o?{isInvalid:!0,description:"Required field"}:0===e.length&&!o||i.test(e)?{isInvalid:!1,description:"Valid"}:{isInvalid:!0,description:n}};export{toast,checkValidity};
//# sourceMappingURL=utils.js.map