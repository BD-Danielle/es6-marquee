(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function i(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,n(r.key),r)}}function n(e){var i=function(e,i){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(i)?i:String(i)}var r=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=document.querySelector(e),this.wrapper=this.element.parentElement,this.items=this.element.querySelectorAll(i.itemSelector),this.settings={enable:!0,direction:i.direction||"vertical",itemSelector:i.itemSelector||"li",delay:i.delay||3e3,speed:i.speed||1,timing:i.timing||1,mouse:i.mouse||!0},this.next=0,this.timeoutHandle,this.intervalHandle,this.settings.enable&&this.init()}var r,o;return r=t,o=[{key:"init",value:function(){var t,i=this;try{if((t=this.items,function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,i){if(t){if("string"==typeof t)return e(t,i);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,i):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).reduce((function(t,e){return t+(i.isHorizontal()?e.offsetWidth:e.offsetHeight)}),0)<(this.isHorizontal()?this.element.offsetWidth:this.element.offsetHeight))return;this.setupStyles(),this.cloneAllItems(),this.settings.mouse&&this.addHoverEvent(),this.timer()}catch(t){console.error("Marquee initialization error:",t)}}},{key:"setupStyles",value:function(){var t,e,i;Object.assign(this.wrapper.style,{position:"relative",overflow:"hidden"}),Object.assign(this.element.style,(t={position:"absolute",top:"0",left:"0",paddingLeft:"0",marginTop:"0"},e=this.isHorizontal()?"width":"height",i=this.isHorizontal()?this.element.offsetWidth+"px":this.element.offsetHeight+"px",(e=n(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t))}},{key:"timer",value:function(){var t=this;this.timeoutHandle=setTimeout((function(){return t.play()}),this.settings.delay)}},{key:"play",value:function(){var t=this;this.clearTimeout();for(var e=0,i=0;i<=this.next;i++)e-=this.isHorizontal()?this.items[i].offsetWidth:this.items[i].offsetHeight;this.intervalHandle=setInterval((function(){return t.animate(e)}),this.settings.timing)}},{key:"animate",value:function(t){var e=this.isHorizontal()?"left":"top",i=parseInt(this.element.style[e],10);i>t?i-this.settings.speed<=t?this.element.style[e]=t+"px":this.element.style[e]=i-this.settings.speed+"px":(this.clearInterval(),this.next>=this.items.length-1?(this.element.style[e]="0px",this.next=0):this.next++,this.timer())}},{key:"isHorizontal",value:function(){return"horizontal"===this.settings.direction}},{key:"cloneAllItems",value:function(){var t=this;this.items.forEach((function(e){return t.element.appendChild(e.cloneNode(!0))}))}},{key:"addHoverEvent",value:function(){var t=this;["mouseenter","mouseleave"].forEach((function(e){return t.wrapper.addEventListener(e,(function(){return t["mouseenter"===e?"clearInterval":"play"]()}))}))}},{key:"clearTimeout",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){clearTimeout(this.timeoutHandle)}))},{key:"clearInterval",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){clearInterval(this.intervalHandle)}))}],o&&i(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),t}();window.Marquee=r})();