var EmailsInput=function(){"use strict";var t=function(t,e,n){var a=document.createElement("li");a.classList.add("email-box__item"),a.classList.add("tag"),e?(a.setAttribute("data-valid",""),a.classList.add("tag--valid")):a.classList.add("tag--invalid");return a.appendChild(function(t){var e=document.createElement("span");return e.classList.add("tag__content"),e.textContent=t,e}(t)),a.appendChild(function(t,e){var n=document.createElement("button");return n.innerHTML="&times;",n.classList.add("tag__delete"),n.addEventListener("click",e),n.setAttribute("aria-label","Delete ".concat(t)),n}(t,(function(){n(a)}))),a},e=function(){return"".concat(Math.random().toString(36).substring(9),"@mail.com")};!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var a=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&a.firstChild?a.insertBefore(i,a.firstChild):a.appendChild(i),i.styleSheet?i.styleSheet.cssText=t:i.appendChild(document.createTextNode(t))}}('@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");.EmailsInput button,.EmailsInput input{margin:0;overflow:visible;font-size:100%;font-family:inherit;line-height:1.15}.EmailsInput button{text-transform:none;-webkit-appearance:button}.EmailsInput button::-moz-focus-inner{padding:0;border-style:none}.EmailsInput button:-moz-focusring{outline:1px dotted ButtonText}.EmailsInput *{box-sizing:border-box}.EmailsInput{border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.2)}.EmailsInput .content{padding:2rem 3.125rem 1.5rem;background:#f8f8f7;border-top-left-radius:8px;border-top-right-radius:8px}.EmailsInput .content__title{font-size:1.25rem;font-family:Open Sans,sans-serif;line-height:1.6875rem}.EmailsInput .email-box{display:flex;flex-wrap:wrap;align-content:flex-start;height:6rem;padding:.5rem;overflow-y:scroll;list-style-type:none;background:#fff;border:1px solid #c3c2cf;border-radius:4px}.EmailsInput .email-box__item{height:1.5rem;margin-top:.25rem;overflow:hidden;color:#050038}.EmailsInput .email-box__input,.EmailsInput .email-box__item{font-size:.875rem;font-family:Open Sans,sans-serif;line-height:1.5rem}.EmailsInput .email-box__input{padding:0 0 0 .5rem;border:none;outline:none}.EmailsInput .email-box__input::placeholder{color:#c3c2cf;opacity:1}.EmailsInput .email-box__input::-ms-clear{display:none}.EmailsInput .email-box .tag--valid{margin-right:.125rem;padding:0 .5rem 0 .625rem;background:rgba(102,153,255,.2);border-radius:100px}.EmailsInput .email-box .tag--invalid{margin-right:.5rem;margin-left:.625rem;border-bottom:1px dashed #d92929}.EmailsInput .email-box .tag__content{line-height:1.5rem}.EmailsInput .email-box .tag__delete{margin-left:.4375rem;padding:0;font-size:1.0625rem;font-family:Open Sans,sans-serif;line-height:1.5rem;vertical-align:top;background-color:transparent;border:none;cursor:pointer}.EmailsInput .email-box .tag__delete:hover{color:#d92929}.EmailsInput .footer{padding:1rem 3.125rem 2rem;background:#fff;border-bottom-right-radius:8px;border-bottom-left-radius:8px}.EmailsInput .footer__add-button{margin-top:.5rem;margin-right:1rem;padding:.5rem 1rem;color:#fff;font-size:.875rem;font-family:Open Sans,sans-serif;text-align:center;background-color:#4262ff;border:none;border-radius:6px;cursor:pointer}.EmailsInput .footer__add-button:hover{filter:brightness(110%)}.EmailsInput .footer__count-button{margin-top:.5rem;margin-right:1rem;padding:.5rem 1rem;color:#fff;font-size:.875rem;font-family:Open Sans,sans-serif;text-align:center;background-color:#4262ff;border:none;border-radius:6px;cursor:pointer}.EmailsInput .footer__count-button:hover{filter:brightness(110%)}');var n=[",",";"," "],a=["Enter"].concat(n);return function(i){i.classList.add("EmailsInput"),i.innerHTML='\n<div class="content">\n    <span class="content__title">Share <b>Board name</b> with others</span>\n    <ul class="email-box" aria-live="polite" data-el-box><li class=\'email-box__item\'><input data-el-input class=\'email-box__input\' type="email" placeholder="add more people..."></li></ul>\n</div>\n<div class="footer">\n    <button data-add-button class="footer__add-button">\n        Add email\n    </button>\n    <button data-count-button class="footer__count-button">\n        Get emails count\n    </button>\n</div>\n';var o=i.querySelector("input[data-el-input]"),r=i.querySelector("ul[data-el-box]"),l=i.querySelector("button[data-add-button]"),d=i.querySelector("button[data-count-button]"),s=function(){o.value=""},u=function(t){o.value=t},m=function(){return r.querySelectorAll("li[data-valid]")},c=function(t){Array.prototype.some.call(m(),(function(e){return e.textContent===t.textContent}))||r.insertBefore(t,r.childNodes[r.childNodes.length-1])},p=function(t){var e;null===(e=t.parentNode)||void 0===e||e.removeChild(t),o.focus()};o.addEventListener("paste",(function(e){var n=(e.clipboardData||window.clipboardData).getData("text");null==n||n.trim().split(",").filter((function(t){return""!==t})).forEach((function(e){u(e),c(t(e,o.validity.valid,p))})),s(),e.preventDefault()})),o.addEventListener("keyup",(function(e){if(a.indexOf(e.key)>-1){var i=(r=o.value,l=n,r.split("").filter((function(t){return-1===l.indexOf(t)})).join(""));""!==i&&(u(i),c(t(i,o.validity.valid,p))),s()}var r,l})),o.addEventListener("focusout",(function(){""!==o.value&&(c(t(o.value,o.validity.valid,p)),s())})),l.addEventListener("click",(function(){c(t(e(),!0,p)),s()})),d.addEventListener("click",(function(){alert(m().length)}))}}();
