var KeyName={ESCAPE:"Escape",ESC:"Esc"},setPlayHandler=function(){var e=document.querySelector(".video__link");setupVideo(e)},setupVideo=function(e){var n=parseURL(e);e.addEventListener("click",function(e){e.preventDefault();var t=document.createElement("div");t.classList.add("popup");e=createIframe(n);t.innerHTML='<div class="popup__wrapper">\n                              '.concat(e.outerHTML,'\n                              <button class="popup__button" type="button" aria-label="Close popup">\n                            </div>'),t.querySelector(".popup__button").addEventListener("click",onCloseButtonClick),document.addEventListener("keydown",onEscKeyDown),document.body.appendChild(t)})},onCloseButtonClick=function(e){e.preventDefault(),closePopup()},onEscKeyDown=function e(t){t.key!==KeyName.ESCAPE&&t.key!==KeyName.ESC||(t.preventDefault(),closePopup(),document.removeEventListener("keydown",e))},closePopup=function(){return document.querySelector(".popup").remove()},parseURL=function(e){return e.href.match(/https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)\/*/i)[1]},createIframe=function(e){var t=document.createElement("iframe");return t.setAttribute("allowfullscreen",""),t.setAttribute("allow","autoplay"),t.setAttribute("src",generateURL(e)),t.classList.add("popup__video"),t},generateURL=function(e){return"https://www.youtube.com/embed/"+e+"?rel=0&showinfo=0&autoplay=1"};setPlayHandler();
//# sourceMappingURL=video.js.map