(()=>{"use strict";var e={10:(e,t,n)=>{n.d(t,{Z:()=>r});var i=n(537),s=n.n(i),a=n(645),o=n.n(a)()(s());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const r=o},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,a){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(i)for(var r=0;r<this.length;r++){var l=this[r][0];null!=l&&(o[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);i&&o[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),s&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=s):c[4]="".concat(s)),t.push(c))}},t}},537:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),a="/*# ".concat(s," */");return[t].concat([a]).join("\n")}return[t].join("\n")}},379:e=>{var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var a={},o=[],r=0;r<e.length;r++){var l=e[r],d=i.base?l[0]+i.base:l[0],c=a[d]||0,p="".concat(d," ").concat(c);a[d]=c+1;var f=n(p),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)t[f].references++,t[f].updater(h);else{var u=s(h,i);i.byIndex=r,t.splice(r,0,{identifier:p,updater:u,references:1})}o.push(p)}return o}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var a=i(e=e||[],s=s||{});return function(e){e=e||[];for(var o=0;o<a.length;o++){var r=n(a[o]);t[r].references--}for(var l=i(e,s),d=0;d<a.length;d++){var c=n(a[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}a=l}}},569:e=>{var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={id:i,exports:{}};return e[i](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{var e=n(379),t=n.n(e),i=n(795),s=n.n(i),a=n(569),o=n.n(a),r=n(565),l=n.n(r),d=n(216),c=n.n(d),p=n(589),f=n.n(p),h=n(10),u={};u.styleTagTransform=f(),u.setAttributes=l(),u.insert=o().bind(null,"head"),u.domAPI=s(),u.insertStyleElement=c(),t()(h.Z,u),h.Z&&h.Z.locals&&h.Z.locals;const m="shake";class v{#e=null;constructor(){if(new.target===v)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(m),setTimeout((()=>{this.element.classList.remove(m),e?.()}),600)}}const b="afterbegin";function _(e,t,n="beforeend"){if(!(e instanceof v))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function y(e,t){if(!(e instanceof v&&t instanceof v))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function g(e){if(null!==e){if(!(e instanceof v))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}const C=1e4,w="fullDate",k="monthDay",E="time",$=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],A="everything",T="future",M="present",F="past",B="default",x="edit";function D(e,t){const n=Math.ceil(Math.min(Math.abs(e),Math.abs(t))),i=Math.floor(Math.max(Math.abs(e),Math.abs(t))),s=Math.random()*(i-n+1)+n;return Math.floor(s)}function P(e){return 0===e.length?e:e.charAt(0).toUpperCase()+e.slice(1)}const S=[{id:"cdfc6dee-3b1d-43f7-9f70-f60ca05b5b06",name:"Madrid",description:'The capital of Spain, recognized as one of the most beautiful cities in the world. And it\'s no wonder, because here modern and medieval architecture blend harmoniously, and the park complexes are worthy for royal figures to stroll along their alleys. Madrid is located in the central part of the Iberian Peninsula. The "heart of Spain" also serves as the administrative center of the province and autonomous community of the same name.',photos:Array.from({length:D(0,5)},(()=>`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`))},{id:"185f6061-5967-4a65-8a41-dd923c470eb3",name:"London",description:"The capital of the United Kingdom and one of the greatest cities in history and modernity. In Westminster, the government operates, and it is also home to Buckingham Palace, the best national galleries, museums, theaters, and clubs. London is constantly changing: from a Roman, and then an early-medieval fortress, it transformed into a major city. After the Great Fire of London in 1666, it literally rose from the ashes, astonishing everyone with its Baroque-style buildings. During the Georgian era, it embodied the dream of elegance, and during Queen Victoria's reign, it became the embodiment of the British Empire. Today, it is a major financial center.",photos:Array.from({length:D(0,5)},(()=>`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`))},{id:"9adb05f5-5a7e-4df1-a47b-079853d44bb3",name:"Lissabon",description:"The capital of Portugal, the starting point for legendary sailors' routes, and one of the oldest cities on the planet, situated at the mouth of the Tagus River, just 15 km from the Atlantic Ocean. Lisbon’s main distinguishing feature is its stunning harmony, which is rarely found in places with such outstanding and truly glorious pasts. The orange roofs of residential houses, Berber ornaments on walls, and modern business centers not only do not contrast with Gothic, Baroque, and Manueline architectural objects but also add pleasant variety to the overall picture.",photos:Array.from({length:D(0,5)},(()=>`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`))},{id:"9428ea55-9370-48c4-9ff8-8b13b593cd00",name:"Reykjavik",description:'The capital and one of the municipalities of Iceland, also known as the "tourist gateway" of the country. Despite being the largest city on the island, it can be walked through in less than a day. Its compact size—just 274.5 square kilometers—doesn’t prevent Reykjavik from being an important scientific and economic hub. Only here will you have the opportunity to learn one of the world\'s oldest languages, visit an ice café, and taste ice cream with fish.',photos:Array.from({length:D(0,5)},(()=>`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`))},{id:"468d5bf7-33ee-45f1-b2ac-e5d374b63df1",name:"Helsinki",description:"The capital of Finland, political, scientific, and cultural center of the country. This unique, diverse, intriguing city is capable of surprising even those who know it well. There may be countless reasons to come to Helsinki: to enjoy the silence and fresh air in the epicenter of city life, admire Art Nouveau architecture, see the Northern Lights, relax in a famous Finnish sauna—the result is always the same: the local atmosphere settles forever in your heart.",photos:Array.from({length:D(0,5)},(()=>`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`))},{id:"5255dda8-f44d-45b6-8cb9-c8d7a73aeac4",name:"Tenerife",description:"The largest of the Canary Islands, covering an area of 2,045 square kilometers, with a population of 700 thousand people. Tourists can find numerous attractions, entertainment, and interesting cities here. The island is divided between the southern coast with a dry climate and golden beaches, and the more humid and windy northern coast, whose black sands under steep cliffs remind us of Tenerife's volcanic origin. Between them rises the highest peak in Spain, Mount Teide, reaching a height of 3,718 meters.",photos:Array.from({length:D(0,5)},(()=>`https://loremflickr.com/248/152?random=${crypto.randomUUID()}`))}],L=[{type:"taxi",offers:[{id:"95397f5c-3d7e-42b6-b62d-d39cf0b1419b",title:"Upgrade to a business class",price:270},{id:"f72e0be1-108c-4e6f-89dc-92ecd5f4ddac",title:"Choose the radio station",price:155},{id:"c436fa7b-bdc2-4f60-a221-2e694a519d28",title:"Choose temperature",price:88},{id:"aca032e4-00ff-45be-a876-50a74ba4554f",title:"Drive quickly, I am in a hurry",price:92},{id:"e06fa574-d489-4a35-a72b-3a9e705d35bd",title:"Drive slowly",price:130}]},{type:"bus",offers:[{id:"7c120c44-1c29-4b14-8b2e-8b205eade4eb",title:"Add console games",price:425},{id:"f864bc3d-6f1a-426a-ad2b-174e140b6202",title:"Choose seats",price:65},{id:"843cd331-e078-4b11-81d6-5fa8b3bde177",title:"Order meal",price:31}]},{type:"train",offers:[{id:"31e3598e-784f-4b67-bcff-d67b029d885a",title:"Book a taxi at the railway station",price:66},{id:"a8dc90a1-4685-446f-a0a7-2abc11186d8f",title:"Order a breakfast",price:78},{id:"9a514bd6-ede6-48e3-9e25-f521c490f426",title:"Wake up at a certain time",price:155}]},{type:"flight",offers:[{id:"5f266e65-b356-47c0-b2da-a9aacc523e8d",title:"Upgrade to comfort class",price:33},{id:"0bc0fe2a-bad1-4224-a4c8-2f1756aeba0f",title:"Choose meal",price:200},{id:"157dfad9-c81e-48dc-b628-b8512b33861b",title:"Choose seats",price:111},{id:"c07d29bf-61cd-45f3-8b63-5d0661f6af4d",title:"Upgrade to business class",price:97},{id:"fc627993-f3bf-4c17-aaf8-2988700da717",title:"Add luggage",price:222},{id:"b1128158-af82-4f6c-8984-cdc93df0aa2f",title:"Bring newspapers",price:159}]},{type:"check-in",offers:[{id:"7414160d-e41d-40f0-bd24-7be169056290",title:"Add breakfast",price:133},{id:"763c7a6c-5801-4442-867a-1b8416515bb7",title:"Make laundry",price:67},{id:"3dfc3c3b-5fc1-44bd-b936-738a50e751ac",title:"Order a meal from the restaurant",price:77},{id:"8ff29063-eab3-412b-827c-8f8a0820c0d4",title:"Choose the time of check-in",price:175},{id:"e04b9aeb-31c8-4fea-ba59-eba585fd8ada",title:"Choose the time of check-out",price:45}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"47efc2a2-475a-446c-87bb-40775187f180",title:"Choose meal",price:160},{id:"79b86f21-8fe4-414b-b890-140948ea1a02",title:"Choose seats",price:156},{id:"1cd5da85-d187-4433-b4d1-b1cf0f16ce39",title:"Upgrade to comfort class",price:166},{id:"52308de7-135b-4a29-8190-e0be9eee3089",title:"Upgrade to business class",price:128},{id:"9e08734a-328f-4d12-84cd-567dd7c77e8a",title:"Add luggage",price:35}]},{type:"drive",offers:[{id:"4007f2d6-4d45-46ea-9026-d3c0fb32e93d",title:"With automatic transmission",price:102},{id:"9a0dae5b-6dc1-4ec4-aeff-227a2e0a246e",title:"With air conditioning",price:100}]},{type:"restaurant",offers:[{id:"f751ee67-5dd9-4ad7-8374-f03df95656f2",title:"Choose live music",price:30},{id:"57ffeccf-0052-4528-8993-843e4fdeb47c",title:"Choose VIP area",price:195}]}],I=[{id:"9d633166-6a3b-4e7d-9273-34b02554719a",basePrice:D(10,C),dateFrom:"2024-04-23T08:00:05.048Z",dateTo:"2024-04-23T09:59:05.048Z",destination:"cdfc6dee-3b1d-43f7-9f70-f60ca05b5b06",isFavorite:Boolean(D(0,1)),offers:["95397f5c-3d7e-42b6-b62d-d39cf0b1419b","f72e0be1-108c-4e6f-89dc-92ecd5f4ddac","c436fa7b-bdc2-4f60-a221-2e694a519d28","aca032e4-00ff-45be-a876-50a74ba4554f"],type:"taxi"},{id:"8d633166-6b3b-4e7d-9273-34b02554719b",basePrice:D(10,C),dateFrom:"2024-05-26T03:14:05.048Z",dateTo:"2024-05-27T02:38:05.048Z",destination:"185f6061-5967-4a65-8a41-dd923c470eb3",isFavorite:Boolean(D(0,1)),offers:["a8dc90a1-4685-446f-a0a7-2abc11186d8f","9a514bd6-ede6-48e3-9e25-f521c490f426"],type:"train"},{id:"7d633166-6c3b-4e7d-9273-34b02554719c",basePrice:D(10,C),dateFrom:"2024-06-23T01:15:05.048Z",dateTo:"2024-06-25T22:41:05.048Z",destination:"9428ea55-9370-48c4-9ff8-8b13b593cd00",isFavorite:Boolean(D(0,1)),offers:["0bc0fe2a-bad1-4224-a4c8-2f1756aeba0f","c07d29bf-61cd-45f3-8b63-5d0661f6af4d"],type:"flight"},{id:"6d633166-6d3b-4e7d-9273-34b02554719d",basePrice:D(10,C),dateFrom:"2025-07-08T05:55:05.048Z",dateTo:"2025-07-20T15:38:05.048Z",destination:"5255dda8-f44d-45b6-8cb9-c8d7a73aeac4",isFavorite:Boolean(D(0,1)),offers:[],type:"sightseeing"},{id:"6d633166-6d3b-4e7d-9288-55b02554719d",basePrice:D(10,C),dateFrom:"2025-02-11T05:55:05.048Z",dateTo:"2025-02-28T15:38:05.048Z",destination:"468d5bf7-33ee-45f1-b2ac-e5d374b63df1",isFavorite:Boolean(D(0,1)),offers:["47efc2a2-475a-446c-87bb-40775187f180","1cd5da85-d187-4433-b4d1-b1cf0f16ce39","9e08734a-328f-4d12-84cd-567dd7c77e8a"],type:"ship"}];class O extends v{get template(){return'<p class="trip-events__msg">\n      Click New Event to create your first point\n    </p>'}}class U extends v{get template(){return'<section class="trip-events">\n          <h2 class="visually-hidden">Trip events</h2>\n        </section>'}}class j extends v{get template(){return'<ul class="trip-events__list"></ul>'}}class H extends v{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}}function q(e){return e<10?`0${e}`:e}function Z(e,t){const n=new Date(e),i=n.getFullYear(),s=n.getMonth()+1,a=n.getDate(),o=n.getUTCHours(),r=n.getMinutes();switch(t){case w:return`${q(a)}/${q(s)}/${i.toString().slice(-2)} ${q(o)}:${q(r)}`;case k:return`${$[s-1]} ${a}`;case E:return`${q(o)}:${q(r)}`;default:return`${i}-${q(s)}-${q(a)}`}}class N extends v{#t=null;#n=[];#i=[];#s=null;#a=[];#o=null;constructor({point:e,offers:t,checkedOffers:n,destination:i,destinations:s,onFormSubmit:a}){super(),this.#t=e,this.#n=t,this.#i=n,this.#s=i,this.#a=s,this.#o=a,this.element.querySelector(".event__save-btn").addEventListener("submit",this.#r),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#r)}get template(){return function(e,t,n,i,s){const{id:a,type:o,dateFrom:r,dateTo:l,basePrice:d}=e,{name:c,description:p}=i,f=L.map((e=>e.type));return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-${a}">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${a}" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${f.map((e=>function(e,t){return`<div class="event__type-item">\n    <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${t} ${t===e?"checked":""}>\n    <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${P(t)}</label>\n  </div>`}(o,e))).join("")}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${P(o)}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${c} list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      ${s.map((e=>function(e){return`<option value=${e.name}></option>`}(e))).join("")}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${Z(r,w)}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${Z(l,w)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${d}>\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  ${function(e,t){return 0!==e.length?`<section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n    ${e.map((e=>function(e,t){const{id:n,title:i,price:s}=e;return`<div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${n}-1" type="checkbox" name="event-offer-${n}" ${t.map((e=>e.id)).includes(n)?"checked":""}>\n    <label class="event__offer-label" for="event-offer-${n}-1">\n      <span class="event__offer-title">${i}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${s}</span>\n    </label>\n  </div>`}(e,t))).join("")}\n    </div>\n  </section>`:""}(t,n)}\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${p}</p>\n                  </section>\n                </section>\n              </form>\n            </li>`}(this.#t,this.#n,this.#i,this.#s,this.#a)}#r=e=>{e.preventDefault(),this.#o()}}class R extends v{#t=null;#n=[];#s=null;#l=null;#d=null;constructor({point:e,offers:t,destination:n,onEditClick:i,onFavoriteClick:s}){super(),this.#t=e,this.#n=t,this.#s=n,this.#l=i,this.#d=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#c),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#p)}get template(){return function(e,t,n){const{type:i,dateFrom:s,dateTo:a,isFavorite:o,basePrice:r}=e,{name:l}=n;return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime=${s}>${Z(s,k)}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${i} ${l}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${s}>${Z(s,E)}</time>\n            &mdash;\n            <time class="event__end-time" datetime=${a}>${Z(a,E)}</time>\n          </p>\n          <p class="event__duration">${function(e,t){const n=new Date(e),i=new Date(t)-n,s=Math.floor(i/864e5),a=Math.floor(i%864e5/36e5),o=Math.floor(i%36e5/6e4);let r="";return r+=s>0?`${s}D `:"",r+=a>0?`${a}H `:"",r+=o>0?`${o}M`:"",r}(s,a)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${r}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${t.map((e=>function(e){const{title:t,price:n}=e;return`<li class="event__offer">\n            <span class="event__offer-title">${t}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${n}</span>\n          </li>`}(e))).join("")}\n        </ul>\n        <button class="event__favorite-btn ${o?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.#t,this.#n,this.#s)}#c=e=>{e.preventDefault(),this.#l()};#p=e=>{e.preventDefault(),this.#d()}}class V{#f=null;#h=null;#u=null;#m=null;#t=null;#v=null;#b=B;#_=null;constructor({pointsListContainer:e,pointsModel:t,onDataChange:n,onModeChange:i}){this.#f=e,this.#m=t,this.#v=n,this.#_=i}init(e){this.#t=e;const t=this.#h,n=this.#u;this.#h=new R({point:this.#t,offers:[...this.#m.getOffersById(this.#t.type,this.#t.offers)],destination:this.#m.getDestinationById(this.#t.destination),onEditClick:this.#l,onFavoriteClick:this.#y}),this.#u=new N({point:this.#t,offers:this.#m.getOffersByType(this.#t.type),checkedOffers:[...this.#m.getOffersById(this.#t.type,this.#t.offers)],destination:this.#m.getDestinationById(this.#t.destination),destinations:this.#m.destinations,onFormSubmit:this.#o}),null!==t&&null!==n?(this.#b===B&&y(this.#h,t),this.#b===x&&y(this.#u,n),g(t),g(n)):_(this.#h,this.#f)}resetView(){this.#b!==B&&this.#g()}destroy(){g(this.#h),g(this.#u)}#C(){y(this.#u,this.#h),document.addEventListener("keydown",this.#w),this.#_(),this.#b=x}#g(){y(this.#h,this.#u),document.removeEventListener("keydown",this.#w),this.#b=B}#w=e=>{"Escape"===e.key&&(e.preventDefault(),this.#g())};#l=()=>{this.#C()};#o=()=>{this.#g()};#y=()=>{this.#v({...this.#t,isFavorite:!this.#t.isFavorite})}}const W={[A]:e=>[...e],[F]:e=>e.filter((e=>function(e){return new Date(e.dateTo)<new Date}(e))),[T]:e=>e.filter((e=>function(e){return new Date(e.dateFrom)>new Date}(e))),[M]:e=>e.filter((e=>function(e){const t=new Date;return new Date(e.dateFrom)<=t&&new Date(e.dateTo)>=t}(e)))};const X=document.querySelector(".trip-main"),z=document.querySelector(".trip-events"),G=document.querySelector(".trip-controls__filters"),J=new class{#k=function(){return I}();#n=L;#a=S;#E=A;get points(){return this.#k}get offers(){return this.#n}get destinations(){return this.#a}getOffersByType(e){return this.offers.find((t=>t.type===e)).offers}getOffersById(e,t){return this.getOffersByType(e).filter((e=>t.find((t=>e.id===t))))}getDestinationById(e){return this.destinations.find((t=>t.id===e))}get currentFilter(){return this.#E}},K=(Y=J.points,Object.entries(W).map((([e,t])=>({type:e,count:t(Y).length}))));var Y;const Q=J.currentFilter,ee=new class{#$=null;#m=null;#A=[];#T=new Map;#M=new H;#F=new j;#B=new U;#x=new O;constructor({pointsBoardContainer:e,pointsModel:t}){this.#$=e,this.#m=t}init(){this.#A=[...this.#m.points],this.#D()}#P(e){const t=new V({pointsListContainer:this.#F.element,pointsModel:this.#m,onDataChange:this.#v,onModeChange:this.#_});t.init(e),this.#T.set(e.id,t)}#D(){_(this.#B,this.#$),0!==this.#A.length?(this.#S(),this.#L()):this.#I()}#S(){_(this.#M,this.#B.element,b)}#I(){_(this.#x,this.#B.element,b)}#L(){_(this.#F,this.#B.element),this.#O()}#U(){this.#T.forEach((e=>e.destroy())),this.#T.clear()}#O(){this.#A.forEach((e=>this.#P(e)))}#v=e=>{var t,n;this.#A=(t=this.#A,n=e,t.map((e=>e.id===n.id?n:e))),this.#T.get(e.id).init(e)};#_=()=>{this.#T.forEach((e=>e.resetView()))}}({pointsBoardContainer:z,pointsModel:J});_(new class extends v{get template(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}},X,b),_(new class extends v{#j=null;#E=null;constructor({filters:e,currentFilter:t}){super(),this.#j=e,this.#E=t}get template(){return function(e,t){return`<form class="trip-filters" action="#" method="get">\n    ${e.map((e=>function(e,t){const{type:n,count:i}=e;return`<div class="trip-filters__filter">\n        <input id="filter-${n}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${n} ${0===i?"disabled":""} ${n===t?"checked":""}>\n        <label class="trip-filters__filter-label" for="filter-${n}">${P(n)}</label>\n      </div>`}(e,t))).join("")}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`}(this.#j,this.#E)}}({filters:K,currentFilter:Q}),G),_(new class extends v{get template(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'}},X),ee.init()})()})();
//# sourceMappingURL=bundle.749301d1f14d76143d4f.js.map