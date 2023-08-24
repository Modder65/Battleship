(()=>{"use strict";var t={426:(t,e,n)=>{n.d(e,{Z:()=>c});var r=n(81),o=n.n(r),i=n(645),a=n.n(i)()(o());a.push([t.id,"body {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n  margin: 0;\n  padding: 0;\n}\n\n.container {\n  display: flex;\n  justify-content: center;\n  padding: 20px;\n}\n\n.board {\n  width: 320px;\n  border: 2px solid #000;\n  padding: 10px;\n  background-color: #fff;\n  text-align: center;\n}\n\nh2 {\n  margin-bottom: 10px;\n}\n\n#grid {\n  display: grid;\n  grid-template-columns: repeat(10, 30px);\n  grid-template-rows: repeat(10, 30px);\n  gap: 2px;\n}\n\n.cell {\n  width: 30px;\n  height: 30px;\n  border: 1px solid #000;\n  background-color: #e0e0e0;\n}\n\n.highlight {\n  background-color: #ff0;\n}\n\n.ship {\n  background-color: #00f;\n}\n\n#start-game-button:disabled {\n  background-color: grey;\n  cursor: not-allowed;\n}\n\n.computer-ship {\n  background-color: #00f /* same color as the board's background */;\n}\n",""]);const c=a},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,o,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(a[s]=!0)}for(var u=0;u<t.length;u++){var l=[].concat(t[u]);r&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var i={},a=[],c=0;c<t.length;c++){var s=t[c],u=r.base?s[0]+r.base:s[0],l=i[u]||0,f="".concat(u," ").concat(l);i[u]=l+1;var d=n(f),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==d)e[d].references++,e[d].updater(p);else{var h=o(p,r);r.byIndex=c,e.splice(c,0,{identifier:f,updater:h,references:1})}a.push(f)}return a}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var i=r(t=t||[],o=o||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var c=n(i[a]);e[c].references--}for(var s=r(t,o),u=0;u<i.length;u++){var l=n(i[u]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}i=s}}},569:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return t[r](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{var t=n(379),e=n.n(t),r=n(795),o=n.n(r),i=n(569),a=n.n(i),c=n(565),s=n.n(c),u=n(216),l=n.n(u),f=n(589),d=n.n(f),p=n(426),h={};function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==m(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===m(o)?o:String(o)),r)}var o}h.styleTagTransform=d(),h.setAttributes=s(),h.insert=a().bind(null,"head"),h.domAPI=o(),h.insertStyleElement=l(),e()(p.Z,h),p.Z&&p.Z.locals&&p.Z.locals;var y=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.length=e,this.timesHit=0,this.sunk=!1}var e,n;return e=t,(n=[{key:"hit",value:function(){this.timesHit++}},{key:"isSunk",value:function(){return this.length==this.timesHit?this.sunk=!0:this.sunk=!1,this.sunk}}])&&v(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==b(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===b(o)?o:String(o)),r)}var o}var k=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.ships=[],this.missedHits=[],this.takenSpots=[]}var e,n;return e=t,n=[{key:"placeShip",value:function(t,e,n,r){for(var o,i=this,a=[],c=new y(t),s=[],u=function(){var t="horizontal"===e?n:n+l,o="horizontal"===e?r+l:r;if(t>=10||o>=10||i.takenSpots.some((function(e){return e.row===t&&e.column===o})))return alert("spot is taken or out of bounds, choose another spot"),{v:void 0};a.push({row:t,column:o}),s.push({row:t,column:o})},l=0;l<c.length;l++)if(o=u())return o.v;this.takenSpots=this.takenSpots.concat(s);var f={ship:c,coordinates:a};return this.ships.push(f),f}},{key:"receiveAttack",value:function(t,e){for(var n=!1,r=0;r<this.ships.length;r++){for(var o=0;o<this.ships[r].coordinates.length;o++)if(t==this.ships[r].coordinates[o].row&&e==this.ships[r].coordinates[o].column){this.ships[r].ship.hit(),n=!0;break}if(n)break}n||this.missedHits.push({row:t,column:e})}},{key:"allShipsSunk",value:function(){return this.ships.every((function(t){return t.ship.isSunk()}))}}],n&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==S(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===S(o)?o:String(o)),r)}var o}var E,x,M=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.isComputer=e,this.gameBoard=new k,this.previousAttacks=[]}var e,n;return e=t,(n=[{key:"attack",value:function(t,e,n){t.receiveAttack(e,n),this.previousAttacks.push({row:e,column:n})}},{key:"makeRandomMove",value:function(t){var e,n;do{e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random())}while(this.previousAttacks.some((function(t){return t.row===e&&t.column===n})));this.attack(t,e,n)}}])&&w(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),j=new M(!1),I=new M(!0),T=[5,4,3,3,2],P=0,B="horizontal";function C(){var t=document.createElement("div");t.id="grid";for(var e=0;e<100;e++){var n=document.createElement("div");n.className="cell",n.addEventListener("mouseover",A),n.addEventListener("click",L),t.appendChild(n)}return t}function A(t){var e=document.getElementById("grid"),n=Array.from(e.children),r=n.indexOf(t.target),o=T[P];n.forEach((function(t){return t.classList.remove("highlight")}));for(var i=0;i<o;i++){var a="horizontal"===B?r+i:r+10*i;a<n.length&&n[a].classList.add("highlight")}}function L(t){var e=document.getElementById("grid"),n=Array.from(e.children),r=n.indexOf(t.target),o=Math.floor(r/10),i=r%10,a=T[P];if(j.gameBoard.placeShip(a,B,o,i)){for(var c=0;c<a;c++){var s="horizontal"===B?r+c:r+10*c;s<n.length&&(n[s].classList.add("ship"),n[s].classList.remove("highlight"))}++P>=T.length&&(document.getElementById("start-game-button").disabled=!1)}}E=document.getElementById("grid-container"),x=document.getElementById("computer-grid-container"),E.innerHTML="",x.innerHTML="",E.appendChild(C()),x.appendChild(C()),document.getElementById("rotate-button").addEventListener("click",(function(){B="horizontal"===B?"vertical":"horizontal"})),document.getElementById("start-game-button").addEventListener("click",(function(){var t,e;document.getElementById("computer-board").style.display="block",document.getElementById("start-game-button").style.display="none",document.getElementById("rotate-button").style.display="none",t=document.getElementById("computer-grid-container"),e=Array.from(t.children[0].children),T.forEach((function(t){for(var n=!1;!n;){var r=Math.floor(100*Math.random()),o=Math.random()<.5?"horizontal":"vertical",i=Math.floor(r/10),a=r%10;if(!("horizontal"===o&&a+t>10||"vertical"===o&&i+t>10)){for(var c=!1,s=function(){var t="horizontal"===o?i:i+u,e="horizontal"===o?a+u:a;if(I.gameBoard.takenSpots.some((function(n){return n.row===t&&n.column===e})))return c=!0,1},u=-1;u<=t&&!s();u++);if(!c&&(n=I.gameBoard.placeShip(t,o,i,a)))for(var l=0;l<t;l++){var f="horizontal"===o?r+l:r+10*l;f<e.length&&e[f].classList.add("computer-ship")}}}}))}))})()})();