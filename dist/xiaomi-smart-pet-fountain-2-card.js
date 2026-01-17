function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:g},_="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const s=this[t];this[e]=o,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{i?t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):o.forEach(i=>{const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)})})(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var o;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,s=o._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=o.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=s,this[s]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var m;v[_]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,b=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,x="?"+A,S=`<${x}>`,E=document,C=()=>E.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,R="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,L=/>/g,z=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,M=/"/g,N=/^(?:script|style|textarea|title)$/i,T=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),I=new WeakMap,B=E.createTreeWalker(E,129,null,!1);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":"",r=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=U:void 0!==l[1]?r=L:void 0!==l[2]?(N.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=s?s:O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?M:H):r===M||r===H?r=z:r===U||r===L?r=O:(r=z,s=void 0);const h=r===z&&t[e+1].startsWith("/>")?" ":"";n+=r===O?i+S:c>=0?(o.push(a),i.slice(0,c)+w+i.slice(c)+A+h):i+A+(-2===c?(o.push(void 0),e):h)}return[W(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[l,c]=F(t,e);if(this.el=V.createElement(l,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=B.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(w)||e.startsWith(A)){const i=c[n++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+w).split(A),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Z:"@"===e[1]?Y:G})}else a.push({type:6,index:s})}for(const e of t)o.removeAttribute(e)}if(N.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],C()),B.nextNode(),a.push({type:2,index:++s});o.append(t[e],C())}}}else if(8===o.nodeType)if(o.data===x)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)a.push({type:7,index:s}),t+=A.length-1}s++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){var s,n,r,a;if(e===D)return e;let l=void 0!==o?null===(s=i._$Co)||void 0===s?void 0:s[o]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=X(t,l._$AS(t,e.values),l,o)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);B.currentNode=s;let n=B.nextNode(),r=0,a=0,l=o[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new K(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new tt(n,this,t)),this._$AV.push(e),l=o[++a]}r!==(null==l?void 0:l.index)&&(n=B.nextNode(),r++)}return B.currentNode=E,s}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,o){var s;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(s=null==o?void 0:o.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),k(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=V.createElement(W(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(i);else{const t=new q(s,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new V(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,o,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=X(this,t,e,0),n=!k(t)||t!==this._$AH&&t!==D,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=X(this,o[i+r],e,r),a===D&&(a=this._$AH[r]),n||(n=!k(a)||a!==this._$AH[r]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Q=$?$.emptyScript:"";class Z extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends G{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=X(this,t,e,0))&&void 0!==i?i:j)===D)return;const o=this._$AH,s=t===j&&o!==j||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==j&&(o===j||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(V,K),(null!==(m=y.litHtmlVersions)&&void 0!==m?m:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,ot;class st extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,s;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let r=n._$litPart$;if(void 0===r){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;n._$litPart$=r=new K(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}}st.finalized=!0,st._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e),at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return lt({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var dt;function ht(t){if(!t)return null;const e=t.split(".")[1];if(!e)return null;const i=["_pet_drinking_fountain","_filter_life_level","_filter_left_time","_battery_level","_charging_state","_status","_water_shortage_status","_physical_control_locked","_no_disturb","_out_water_interval","_out_water_interval_2","_mode","_reset_filter_life"];for(const t of i)if(e.endsWith(t))return e.slice(0,-t.length);return e}function ut(t,e){if(!t||!e)return{};const i={},o=t.states,s={powerSwitch:`switch.${e}_pet_drinking_fountain`,mode:`select.${e}_mode`,filterLifeLevel:`sensor.${e}_filter_life_level`,filterLeftTime:`sensor.${e}_filter_left_time`,batteryLevel:`sensor.${e}_battery_level`,chargingState:`sensor.${e}_charging_state`,status:`sensor.${e}_status`,waterShortage:`binary_sensor.${e}_water_shortage_status`,physicalControlLock:`switch.${e}_physical_control_locked`,noDisturb:`switch.${e}_no_disturb`,outWaterInterval:`number.${e}_out_water_interval`,outWaterInterval2:`number.${e}_out_water_interval_2`,resetFilterButton:`button.${e}_reset_filter_life`};for(const[t,e]of Object.entries(s))o[e]&&(i[t]=e);return i}null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;var pt={version:"Version",entity:"Entity"},gt={entity:"Entity (Required)",entity_helper:"Select any entity from your Xiaomi Smart Pet Fountain 2"},ft={turn_on:"Turn on",turn_off:"Turn off",no_disturb_mode:"No disturb",physical_control_lock:"Physical control lock",water_interval:"Water interval",reset_filter:"Reset filter life",operating_mode:"Operating mode",battery:"Battery",charging:"Charging",charge_full:"Charge full",no_charge:"On battery",no_pump:"Water pump not working",water_shortage:"Water shortage !",entity_not_found:"Entity not found"},_t={reset_filter_message:"Do you want to reset the filter life?",cancel:"Cancel",confirm:"Confirm"},vt={common:pt,editor:gt,card:ft,dialog:_t},mt={version:"Version",entity:"Entité"},yt={entity:"Entité (Obligatoire)",entity_helper:"Sélectionnez n'importe quelle entité de votre Fontaine Xiaomi Smart Pet 2"},$t={turn_on:"Allumer",turn_off:"Éteindre",no_disturb_mode:"Ne pas déranger",physical_control_lock:"Verrouillage des commandes physiques",water_interval:"Intervalle d'eau",reset_filter:"Réinitialiser la durée de vie du filtre",operating_mode:"Mode de fonctionnement",battery:"Batterie",charging:"En charge",charge_full:"Charge complète",no_charge:"Sur batterie",no_pump:"Pompe à eau non fonctionnelle",water_shortage:"Manque d'eau !",entity_not_found:"Entité non trouvée"},bt={reset_filter_message:"Voulez-vous réinitialiser la durée d'utilisation du filtre ?",cancel:"Annuler",confirm:"Confirmer"},wt={common:mt,editor:yt,card:$t,dialog:bt};const At={en:Object.freeze({__proto__:null,card:ft,common:pt,default:vt,dialog:_t,editor:gt}),fr:Object.freeze({__proto__:null,card:$t,common:mt,default:wt,dialog:bt,editor:yt})},xt="en";function St(t,e,i="",o=""){const s=t?.locale?.language??xt;let n;try{n=e.split(".").reduce((t,e)=>t[e],At[s])}catch(t){n=e.split(".").reduce((t,e)=>t[e],At[xt])}return void 0===n&&(n=e.split(".").reduce((t,e)=>t[e],At[xt])),""!==i&&""!==o&&(n=n.replace(i,o)),n||e}function Et(t,e){try{return t.split(".").reduce((t,e)=>t[e],At[e])}catch(t){return}}let Ct=class extends st{constructor(){super(...arguments),this._computeLabel=t=>{const e=(i=this.hass,function(t){let e=Et(t,i?.locale?.language??xt);return e||(e=Et(t,xt)),e??t});var i;return"entity"===t.name?e("editor.entity"):"name"===t.name?e("editor.name"):t.name}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement())}setConfig(t){this._config={...t}}render(){if(!this.hass||!this._config)return T``;const t=[{name:"entity",required:!0,selector:{entity:{include_domains:["switch","sensor","select","number","binary_sensor","button"]}}}];return T`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){const e=t.detail.value,i=new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}});this.dispatchEvent(i)}static get styles(){return r`
      ha-form {
        width: 100%;
      }
    `}};t([lt({attribute:!1})],Ct.prototype,"hass",void 0),t([ct()],Ct.prototype,"_config",void 0),Ct=t([rt("xiaomi-smart-pet-fountain-2-card-editor")],Ct);var kt=Object.freeze({__proto__:null,get XiaomiSmartPetFountainCardEditor(){return Ct}});console.info("%c  XIAOMI-SMART-PET-FOUNTAIN-2-CARD  \n%c  Version 1.0.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),function(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}({type:"xiaomi-smart-pet-fountain-2-card",name:"Xiaomi Smart Pet Fountain 2 Card",description:"A custom card for controlling Xiaomi Smart Pet Fountain 2"});let Pt=class extends st{constructor(){super(...arguments),this._showResetDialog=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return kt}),document.createElement("xiaomi-smart-pet-fountain-2-card-editor")}static async getStubConfig(t){return{type:"custom:xiaomi-smart-pet-fountain-2-card",entity:"switch.xiaomi_iv02_b820_pet_drinking_fountain"}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t}getCardSize(){return 4}render(){if(!this.hass||!this.config)return T`
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div
              style="text-align: center; color: var(--secondary-text-color);"
            >
              Loading...
            </div>
          </div>
        </ha-card>
      `;const t=this.hass.states[this.config.entity];if(!t)return T`
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div style="text-align: center;">
              <div
                style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"
              >
                Xiaomi Smart Pet Fountain 2
              </div>
              <div style="color: var(--secondary-text-color); font-size: 14px;">
                ${St(this.hass,"card.entity_not_found")}:
                ${this.config.entity}
              </div>
              <div
                style="color: var(--secondary-text-color); font-size: 12px; margin-top: 8px;"
              >
                Please select a valid entity in the configuration
              </div>
            </div>
          </div>
        </ha-card>
      `;const e=ht(this.config.entity),i=ut(this.hass,e),o=this.config.entity.startsWith("switch.")?this.config.entity:i.powerSwitch,s=o?this.hass.states[o]:t,n=i.mode,r=n?this.hass.states[n]:null,a=r?r.state:"auto",l=r&&r.attributes.options?r.attributes.options:["auto","interval","constant"],c=i.batteryLevel,d=c?this.hass.states[c]:null,h=d&&parseFloat(d.state)||0,u=i.chargingState,p=u?this.hass.states[u]:null,g=p?p.state:"no charge",f=i.status,_=f?this.hass.states[f]:null,v=_?_.state:"waterless",m=i.waterShortage,y=m?this.hass.states[m]:null,$=!!y&&"on"===y.state,b=i.filterLifeLevel,w=b?this.hass.states[b]:null,A=w&&parseFloat(w.state)||0,x=i.outWaterInterval,S=x?this.hass.states[x]:null,E=S&&parseFloat(S.state)||10,C=S?.attributes?.min??0,k=S?.attributes?.max??120,P=S?.attributes?.step??15,R=[];for(let t=Math.max(10,C);t<=k;t+=P)R.push(t);const O="on"===s.state;this.config.name||t.attributes.friendly_name;const U=170*Math.PI*(250/360);return T`
      <ha-card>
        <div class="card-content">
          <!-- Filter Life Circular Gauge -->
          <div class="gauge-container">
            <svg class="gauge-svg" viewBox="0 0 200 200">
              <!-- Background arc (3/4 circle) -->
              <path
                class="gauge-background"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke="var(--disabled-text-color)"
                stroke-width="12"
                stroke-linecap="round"
              />
              <!-- Progress arc (3/4 circle) -->
              <path
                class="gauge-progress ${O?"on":"off"} ${0===A?"critical":""}"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${0===A?U:A/100*U+" "+U}"
                stroke-dashoffset="0"
                style="transition: stroke-dasharray 0.3s ease, stroke 0.3s ease;"
              />
            </svg>

            <!-- Status Icons Row (above percentage) -->
            <div class="status-icons-row">
              <!-- Battery/Charging Icon -->
              <div class="icon-indicator">
                <ha-icon
                  icon="${function(t,e){if(0===e)return"mdi:battery-alert";if(!t)return"mdi:battery";const i=t.toLowerCase();return i.includes("charging")&&!i.includes("full")?"mdi:battery-charging":i.includes("full")?"mdi:power-plug":e>=90?"mdi:battery":e>=70?"mdi:battery-80":e>=50?"mdi:battery-60":e>=30?"mdi:battery-40":e>=10?"mdi:battery-20":"mdi:battery-alert"}(g,h)}"
                  class="${function(t,e){return 0===e?"critical-icon-pulse":t&&t.toLowerCase().includes("charging")&&!t.toLowerCase().includes("full")?"charging":""}(g,h)}"
                  title="${function(t,e,i){if(!e)return`${St(t,"card.battery")}: ${i}%`;const o=e.toLowerCase();return o.includes("charging")&&!o.includes("full")?`${St(t,"card.charging")}: ${i}%`:o.includes("full")?St(t,"card.charge_full"):`${St(t,"card.no_charge")}: ${i}%`}(this.hass,g,h)}"
                ></ha-icon>
              </div>

              <!-- Watering Status Icon -->
              <div class="icon-indicator">
                <ha-icon
                  icon="mdi:water-pump-off"
                  class="watering-status ${v&&"waterless"===v.toLowerCase()?"critical-icon-pulse":"hidden"}"
                  title="${St(this.hass,"card.no_pump")}"
                ></ha-icon>
              </div>

              <!-- Water Shortage Icon -->
              ${m?T`
                    <div class="icon-indicator">
                      <ha-icon
                        icon="mdi:water-alert"
                        class="water-shortage ${$?"critical-icon-pulse":"hidden"}"
                        title="${St(this.hass,"card.water_shortage")}"
                      ></ha-icon>
                    </div>
                  `:""}
            </div>

            <!-- Center Percentage Value-->
            <div class="gauge-center">
              <div class="gauge-value">${A}%</div>
            </div>

            <!-- Horizontal Line -->
            <div class="separator-line"></div>

            <!-- Additional Control Buttons -->
            <div class="container-controls additional-controls">
              <button
                class="control-button ${"on"===this.hass.states[i.noDisturb||""]?.state?"on":"off"}"
                @click=${()=>this._toggleSwitch(i.noDisturb)}
                ?disabled="${!i.noDisturb}"
                title="${St(this.hass,"card.no_disturb_mode")}"
              >
                <ha-icon icon="mdi:bell-off"></ha-icon>
              </button>

              <button
                class="control-button ${"on"===this.hass.states[i.physicalControlLock||""]?.state?"on":"off"}"
                @click=${()=>this._toggleSwitch(i.physicalControlLock)}
                ?disabled="${!i.physicalControlLock}"
                title="${St(this.hass,"card.physical_control_lock")}"
              >
                <ha-icon icon="mdi:lock"></ha-icon>
              </button>

              <select
                class="pill-select"
                .value="${E}"
                @change="${t=>this._setWaterInterval(parseInt(t.target.value))}"
                ?disabled="${!x||"interval"!==a.toLowerCase()}"
                title="${St(this.hass,"card.water_interval")}"
              >
                ${R.map(t=>T`
                    <option
                      value="${t}"
                      ?selected="${t===E}"
                    >
                      ${t} min
                    </option>
                  `)}
              </select>
            </div>

            <!-- Controls in Bottom Quarter (Power Button + Mode Selector) -->
            <div class="container-controls gauge-controls">
              <button
                class="control-button ${O?"on":"off"}"
                @click=${()=>this._togglePower()}
                title="${St(this.hass,O?"card.turn_off":"card.turn_on")}"
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>

              <button
                class="control-button"
                @click=${()=>this._showResetConfirmation()}
                ?disabled="${!i.resetFilterButton}"
                title="${St(this.hass,"card.reset_filter")}"
              >
                <ha-icon icon="mdi:air-filter"></ha-icon>
              </button>

              <select
                class="pill-select mode-select"
                .value="${a}"
                @change="${t=>this._selectMode(t.target.value)}"
                ?disabled="${!n}"
                title="${St(this.hass,"card.operating_mode")}"
              >
                ${l.map(t=>T`
                    <option value="${t}" ?selected="${t===a}">
                      ${t}
                    </option>
                  `)}
              </select>
            </div>
          </div>
        </div>

        <!-- Reset Confirmation Dialog -->
        ${this._showResetDialog?T`
              <div
                class="dialog-overlay"
                @click=${()=>this._hideResetDialog()}
              >
                <div
                  class="dialog-content"
                  @click=${t=>t.stopPropagation()}
                >
                  <div class="dialog-message">
                    ${St(this.hass,"dialog.reset_filter_message")}
                  </div>
                  <div class="dialog-buttons">
                    <button
                      class="dialog-button cancel"
                      @click=${()=>this._hideResetDialog()}
                    >
                      ${St(this.hass,"dialog.cancel")}
                    </button>
                    <button
                      class="dialog-button confirm"
                      @click=${()=>this._confirmResetFilter()}
                    >
                      ${St(this.hass,"dialog.confirm")}
                    </button>
                  </div>
                </div>
              </div>
            `:""}
      </ha-card>
    `}_togglePower(){if(!this.config||!this.hass)return;const t=ht(this.config.entity),e=ut(this.hass,t),i=this.config.entity.startsWith("switch.")?this.config.entity:e.powerSwitch;if(!i)return void console.error("Power switch entity not found");const o="on"===this.hass.states[i].state?"turn_off":"turn_on";this.hass.callService("homeassistant",o,{entity_id:i})}_selectMode(t){if(!this.config||!this.hass)return;const e=ht(this.config.entity),i=ut(this.hass,e).mode;i?this.hass.callService("select","select_option",{entity_id:i,option:t}):console.error("Mode select entity not found")}_resetFilter(){if(!this.config||!this.hass)return;const t=ht(this.config.entity),e=ut(this.hass,t).resetFilterButton;e?this.hass.callService("button","press",{entity_id:e}):console.error("Reset filter button entity not found")}_showResetConfirmation(){this._showResetDialog=!0,this.requestUpdate()}_hideResetDialog(){this._showResetDialog=!1,this.requestUpdate()}_confirmResetFilter(){this._resetFilter(),this._hideResetDialog()}_toggleSwitch(t){if(!t||!this.hass)return void console.error("Switch entity not found");const e=this.hass.states[t];if(!e)return void console.error("Entity not found:",t);const i="on"===e.state?"turn_off":"turn_on";this.hass.callService("homeassistant",i,{entity_id:t})}_setWaterInterval(t){if(!this.config||!this.hass)return;const e=ht(this.config.entity),i=ut(this.hass,e).outWaterInterval;i?this.hass.callService("number","set_value",{entity_id:i,value:t}):console.error("Water interval entity not found")}static get styles(){return r`
      ha-card {
        padding: 16px;
      }

      .card-header {
        font-size: 24px;
        font-weight: bold;
        padding-bottom: 16px;
      }

      .warning {
        display: block;
        color: red;
        padding: 16px;
      }

      .card-content {
        position: relative;
      }

      /* Gauge Container - */
      .gauge-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        min-height: 280px;
        height: auto;
        aspect-ratio: 1 / 0.875;
      }

      .gauge-svg {
        position: absolute;
        width: 100%;
        max-width: 320px;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .gauge-background {
        opacity: 0.2;
      }

      .gauge-progress.on {
        stroke: var(--primary-color);
      }

      .gauge-progress.off {
        stroke: var(--disabled-text-color);
      }

      /* Critical filter alert - red blinking border */
      .gauge-progress.critical {
        stroke: var(--error-color);
        animation: pulse 2s infinite;
      }

      /* Status Icons Row - Positioned above percentage, between gauge and center */
      .status-icons-row {
        position: absolute;
        top: 16%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      .icon-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        position: relative;
      }

      .icon-indicator ha-icon {
        font-size: 24px;
      }

      .icon-indicator ha-icon.active {
        color: var(--primary-color);
      }

      .icon-indicator ha-icon.inactive {
        color: var(--disabled-text-color);
      }

      .icon-indicator ha-icon.charging {
        color: var(--success-color);
        animation: pulse 2s infinite;
      }

      .critical-icon-pulse {
        color: var(--error-color);
        animation: pulse 2s infinite;
      }

      .icon-indicator ha-icon.watering-status.hidden,
      .icon-indicator ha-icon.water-shortage.hidden {
        opacity: 0 !important;
        visibility: hidden;
        animation: none !important;
        pointer-events: none;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }

      .icon-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-align: center;
        white-space: nowrap;
      }

      /* Center Percentage Value */
      .gauge-center {
        position: absolute;
        top: 28%;
        bottom: 44%;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5;
      }

      .gauge-value {
        font-size: 42px;
        font-weight: 400;
        color: var(--primary-text-color);
        text-align: center;
      }

      /* Horizontal Separator Line */
      .separator-line {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translateX(-50%);
        width: min(200px, 60%);
        height: 3px;
        background-color: var(--disabled-text-color);
        border-radius: 2px;
        z-index: 5;
      }

      .container-controls {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        z-index: 10;
        width: auto;
        padding: 0 20px 0 20px;
      }

      /* Additional Control Buttons (No Disturb, Physical Lock) */
      .additional-controls {
        top: 57%;
        bottom: 25%;
      }

      .control-button {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
        padding: 0;
        margin: 0;
      }

      .control-button:hover:not(:disabled) {
        opacity: 0.8;
        transform: scale(1.1);
      }

      .control-button:active:not(:disabled) {
        transform: scale(0.95);
      }

      .control-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .control-button.on {
        color: var(--primary-text-color);
      }

      .control-button.off {
        color: var(--disabled-text-color);
        opacity: 0.6;
      }

      /* Controls in Bottom Quarter */
      .gauge-controls {
        top: 78%;
      }

      .pill-select {
        width: 90px;
        height: 32px;
        padding: 0 8px;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background-color: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        cursor: pointer;
        transition: border-color 0.2s ease;
        margin: 0;
        outline: none;
      }

      .pill-select:hover:not(:disabled) {
        border-color: var(--primary-color);
      }

      .pill-select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .pill-select:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .mode-select {
        text-transform: capitalize;
      }

      /* Reset Confirmation Dialog */
      .dialog-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        border-radius: inherit;
      }

      .dialog-content {
        background: var(--card-background-color);
        border-radius: 8px;
        padding: 24px;
        min-width: 280px;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .dialog-message {
        color: var(--primary-text-color);
        font-size: 16px;
        margin-bottom: 24px;
        text-align: center;
        line-height: 1.5;
      }

      .dialog-buttons {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .dialog-button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        text-transform: uppercase;
      }

      .dialog-button.cancel {
        background: transparent;
        color: var(--primary-color);
      }

      .dialog-button.cancel:hover {
        background: var(--divider-color);
      }

      .dialog-button.confirm {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      .dialog-button.confirm:hover {
        opacity: 0.9;
      }
    `}};t([lt({type:Object})],Pt.prototype,"hass",void 0),t([lt({type:Object})],Pt.prototype,"config",void 0),t([ct()],Pt.prototype,"_showResetDialog",void 0),Pt=t([rt("xiaomi-smart-pet-fountain-2-card")],Pt);export{Pt as XiaomiSmartPetFountainCard,Ct as XiaomiSmartPetFountainCardEditor};
//# sourceMappingURL=xiaomi-smart-pet-fountain-2-card.js.map
