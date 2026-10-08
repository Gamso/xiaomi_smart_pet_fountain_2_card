function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,_=f.trustedTypes,g=_?_.emptyScript:"",m=f.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const r=this.constructor;if(!1===o&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,k=t=>t,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,O=document,R=()=>O.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,D=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=q(1),F=q(2),V=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),K=new WeakMap,G=O.createTreeWalker(O,129);function J(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=j:void 0!==l[1]?n=D:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=H):void 0!==l[3]&&(n=H):n===H?">"===l[0]?(n=s??U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?H:'"'===l[3]?I:z):n===I||n===z?n=H:n===j||n===D?n=U:(n=H,s=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";r+=n===U?i+M:c>=0?(o.push(a),i.slice(0,c)+E+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=Q(t,e);if(this.el=Z.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=c[r++],i=o.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?st:"@"===n[1]?rt:it}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],R()),G.nextNode(),a.push({type:2,index:++s});o.append(t[e],R())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,o){if(e===V)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=N(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);G.currentNode=o;let s=G.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=G.nextNode(),r++)}return G.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),N(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Z(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=X}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=Y(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Y(this,o[i+n],e,n),a===V&&(a=this._$AH[n]),r||=!N(a)||a!==this._$AH[n],a===X?t=X:t!==X&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class rt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??X)===V)return;const i=this._$AH,o=t===X&&i!==X||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==X&&(i===X||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Z,et),(x.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new et(e.insertBefore(R(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ct._$litElement$=!0,ct.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ct});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ct}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ut={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},pt=(t=ut,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _t(t,e){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const gt=["_pet_drinking_fountain","_filter_life_level","_filter_left_time","_battery_level","_charging_state","_status","_event_mode","_event_water","_water_shortage_status","_physical_control_locked","_no_disturb","_out_water_interval","_out_water_interval_2","_mode","_info","_reset_filter_life"].sort((t,e)=>e.length-t.length);const mt="xiaomi_pet_fountain_2",yt="xiaomi_miot",vt={powerSwitch:{domain:"switch",suffix:"_pet_drinking_fountain",option:"power_entity"},mode:{domain:"select",suffix:"_mode",option:"mode_entity"},filterLifeLevel:{domain:"sensor",suffix:"_filter_life_level",option:"filter_life_entity"},filterLeftTime:{domain:"sensor",suffix:"_filter_left_time",option:"filter_left_time_entity"},batteryLevel:{domain:"sensor",suffix:"_battery_level",option:"battery_entity"},chargingState:{domain:"sensor",suffix:"_charging_state",option:"charging_state_entity"},waterShortage:{domain:"binary_sensor",suffix:"_water_shortage_status",option:"water_shortage_entity"},physicalControlLock:{domain:"switch",suffix:"_physical_control_locked",option:"physical_control_lock_entity"},noDisturb:{domain:"switch",suffix:"_no_disturb",option:"no_disturb_entity"},outWaterInterval:{domain:"number",suffix:"_out_water_interval",option:"water_interval_entity"},outWaterInterval2:{domain:"number",suffix:"_out_water_interval_2"},resetFilterButton:{domain:"button",suffix:"_reset_filter_life",option:"reset_filter_entity"}},bt={powerSwitch:{domain:"switch",key:"power",suffix:"_power"},mode:{domain:"select",key:"mode",suffix:"_mode"},filterLifeLevel:{domain:"sensor",key:"filter_life",suffix:"_filter_life"},filterLeftTime:{domain:"sensor",key:"filter_left_time",suffix:"_filter_time_left"},batteryLevel:{domain:"sensor",deviceClass:"battery",suffix:"_battery"},chargingState:{domain:"sensor",key:"charging_state",suffix:"_charging_state"},waterShortage:{domain:"binary_sensor",key:"water_shortage",suffix:"_water_shortage"},physicalControlLock:{domain:"switch",key:"child_lock",suffix:"_child_lock"},noDisturb:{domain:"switch",key:"no_disturb",suffix:"_do_not_disturb"},outWaterInterval:{domain:"number",key:"out_water_interval",suffix:"_water_interval"},outWaterInterval2:{domain:"number",key:"out_water_interval_2",suffix:"_water_interval_5_min_steps"},resetFilterButton:{domain:"button",key:"reset_filter",suffix:"_reset_filter"},pumpBlocked:{domain:"binary_sensor",key:"pump_blocked",suffix:"_pump_blocked"},fault:{domain:"binary_sensor",key:"fault",suffix:"_fault"},keepMode:{domain:"switch",key:"keep_mode",suffix:"_keep_mode"},lastModeRestore:{domain:"sensor",key:"last_mode_restore",suffix:"_last_mode_restoration"}},$t=Object.keys(bt),wt=Object.keys(vt),xt=wt.map(t=>vt[t]?.option).filter(t=>!!t);function kt(t){const e=wt.find(e=>vt[e]?.option===t);return e&&vt[e]?.domain||"sensor"}function At(t,e){const i=vt[e];return!!i&&t.startsWith(`${i.domain}.`)&&t.endsWith(i.suffix)}function St(t,e){const i=t?.entities,o=e?i?.[e]?.device_id:void 0;if(!t||!i||!o)return{};const s=Object.values(i).filter(e=>e.device_id===o&&!!t.states[e.entity_id]).map(t=>t.entity_id).sort(),r={};for(const t of wt){const e=s.find(e=>At(e,t));e&&(r[t]=e)}return r}function Et(t,e){if(!t||!e)return{entities:{},integration:yt,missing:[]};const i=function(t,e){const i=t?.entities,o=e?i?.[e]:void 0;if(!i||!o)return yt;if(o.platform===mt)return mt;const s=o.device_id,r=!!s&&Object.values(i).some(t=>t?.device_id===s&&t.platform===mt);return r?mt:yt}(t,e.entity);let o;if(i===mt)o=function(t,e){const i=t?.entities,o=e?i?.[e]:void 0;if(!t||!i||!o)return{};const s=o.device_id,r=(s?Object.values(i).filter(t=>t?.device_id===s):[o]).filter(e=>e.platform===mt&&!!t.states[e.entity_id]).sort((t,e)=>t.entity_id.localeCompare(e.entity_id)),n={};for(const e of $t){const{domain:i,key:o,deviceClass:s,suffix:a}=bt[e],l=r.filter(t=>t.entity_id.startsWith(`${i}.`)),c=l.find(e=>o?e.translation_key===o:!e.translation_key&&t.states[e.entity_id]?.attributes?.device_class===s)??l.find(t=>!t.translation_key&&t.entity_id.endsWith(a));c&&(n[e]=c.entity_id)}return n}(t,e.entity);else{const i=function(t,e){if(!t||!e)return{};const i={};for(const o of wt){const{domain:s,suffix:r}=vt[o],n=`${s}.${e}${r}`;t.states[n]&&(i[o]=n)}return i}(t,function(t){if(!t)return null;const e=t.split(".")[1];if(!e)return null;for(const t of gt)if(e.endsWith(t)&&e.length>t.length)return e.slice(0,-t.length);return e}(e.entity));o={...i,...St(t,e.entity)}}const s={};for(const t of $t){const i=vt[t]?.option,r=i?e[i]:void 0,n="string"==typeof r&&r?r:o[t];n&&(s[t]=n)}i!==yt||s.powerSwitch||!e.entity?.startsWith("switch.")||Object.values(s).includes(e.entity)||(s.powerSwitch=e.entity);const r=[];for(const e of wt){const i=vt[e]?.option,o=s[e];!i||o&&t.states[o]||r.push(i)}return{entities:s,integration:i,missing:r}}var Ct={version:"Version",entity:"Entity"},Pt={entity:"Entity (Required)",entity_helper:"Select any entity from your Xiaomi Smart Pet Fountain 2",name:"Name (optional)",entities_section:"Entities (optional, override the auto-discovery)",power_entity:"Power switch",mode_entity:"Operating mode",filter_life_entity:"Filter life level",filter_left_time_entity:"Filter left time",battery_entity:"Battery level",charging_state_entity:"Charging state",water_shortage_entity:"Water shortage",physical_control_lock_entity:"Physical control lock",no_disturb_entity:"No disturb",water_interval_entity:"Water interval",reset_filter_entity:"Reset filter life button"},Mt={turn_on:"Turn on",turn_off:"Turn off",no_disturb_mode:"No disturb",physical_control_lock:"Physical control lock",water_interval:"Water interval",reset_filter:"Reset filter life",operating_mode:"Operating mode",modes:{auto:"Auto",interval:"Interval",constant:"Constant"},battery:"Battery",charging:"Charging",charge_full:"On AC power",no_charge:"On battery",water_shortage:"Water shortage !",pump_blocked:"Pump blocked",fault:"Device fault",keep_mode_on:"Kept mode: ${mode}",keep_mode_any:"Mode kept after power cuts",keep_mode_off:"Mode not kept after power cuts",last_restore:"Last restoration: ${time}",restore_failed:"failed",entity_not_found:"Entity not found",unknown:"Unknown",missing_entities:"Entities not found: ${entities}. Set them in the card options.",days_left:"${days} days left",service_error:"Action failed: ${error}",loading:"Loading...",select_entity:"Select an entity of your Xiaomi Smart Pet Fountain 2 in the card options.",filter_life:"Filter life",power:"Power"},Ot={reset_filter_message:"Do you want to reset the filter life?",cancel:"Cancel",confirm:"Confirm"},Rt={common:Ct,editor:Pt,card:Mt,dialog:Ot},Nt={version:"Version",entity:"Entité"},Lt={entity:"Entité (Obligatoire)",entity_helper:"Sélectionnez n'importe quelle entité de votre Fontaine Xiaomi Smart Pet 2",name:"Nom (facultatif)",entities_section:"Entités (facultatif, remplace la découverte automatique)",power_entity:"Interrupteur marche/arrêt",mode_entity:"Mode de fonctionnement",filter_life_entity:"Durée de vie du filtre",filter_left_time_entity:"Jours de filtre restants",battery_entity:"Niveau de batterie",charging_state_entity:"État de charge",water_shortage_entity:"Manque d'eau",physical_control_lock_entity:"Verrouillage des commandes physiques",no_disturb_entity:"Ne pas déranger",water_interval_entity:"Intervalle d'eau",reset_filter_entity:"Bouton de réinitialisation du filtre"},Tt={turn_on:"Allumer",turn_off:"Éteindre",no_disturb_mode:"Ne pas déranger",physical_control_lock:"Verrouillage des commandes physiques",water_interval:"Intervalle d'eau",reset_filter:"Réinitialiser la durée de vie du filtre",operating_mode:"Mode de fonctionnement",modes:{auto:"Auto",interval:"Intervalle",constant:"Continu"},battery:"Batterie",charging:"En charge",charge_full:"Sur secteur",no_charge:"Sur batterie",water_shortage:"Manque d'eau !",pump_blocked:"Pompe bloquée",fault:"Défaut de la fontaine",keep_mode_on:"Mode conservé : ${mode}",keep_mode_any:"Mode conservé après les coupures",keep_mode_off:"Mode non conservé après les coupures",last_restore:"Dernière restauration : ${time}",restore_failed:"échec",entity_not_found:"Entité non trouvée",unknown:"Inconnu",missing_entities:"Entités introuvables : ${entities}. Renseignez-les dans les options de la carte.",days_left:"${days} jours restants",service_error:"Échec de l'action : ${error}",loading:"Chargement...",select_entity:"Sélectionnez une entité de votre Fontaine Xiaomi Smart Pet 2 dans les options de la carte.",filter_life:"Durée de vie du filtre",power:"Marche/arrêt"},Ut={reset_filter_message:"Voulez-vous réinitialiser la durée d'utilisation du filtre ?",cancel:"Annuler",confirm:"Confirmer"},jt={common:Nt,editor:Lt,card:Tt,dialog:Ut};const Dt={en:Object.freeze({__proto__:null,card:Mt,common:Ct,default:Rt,dialog:Ot,editor:Pt}),fr:Object.freeze({__proto__:null,card:Tt,common:Nt,default:jt,dialog:Ut,editor:Lt})},Ht="en";function zt(t,e,i="",o=""){const s=t?.locale?.language??Ht;let r;try{r=e.split(".").reduce((t,e)=>t[e],Dt[s])}catch(t){r=e.split(".").reduce((t,e)=>t[e],Dt[Ht])}return void 0===r&&(r=e.split(".").reduce((t,e)=>t[e],Dt[Ht])),"object"==typeof i&&null!==i?Object.entries(i).forEach(([t,e])=>{r=r.replace(`\${${t}}`,String(e))}):""!==i&&""!==o&&(r=r.replace(i,o)),r||e}function It(t,e){try{return t.split(".").reduce((t,e)=>t[e],Dt[e])}catch(t){return}}function Bt(t){return function(e){let i=It(e,t?.locale?.language??Ht);return i||(i=It(e,Ht)),i??e}}const qt=new Set(["unavailable","unknown",""]);function Wt(t){if(t&&"string"==typeof t.state)return qt.has(t.state.toLowerCase())?void 0:t.state}function Ft(t){const e=Wt(t);if(void 0===e)return;const i=Number.parseFloat(e);return Number.isFinite(i)?i:void 0}function Vt(t){if("string"!=typeof t)return;return t.trim().toLowerCase().replace(/[\s-]+/g,"_")||void 0}function Xt(t){return t.includes("charging")&&!t.includes("full")}function Kt(t){return t.includes("full")}function Gt(t){const e="string"==typeof t?Number.parseFloat(t):t;return"number"==typeof e&&Number.isFinite(e)?e:void 0}let Jt=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>{const e=Bt(this.hass)(`editor.${t.name}`);return e===`editor.${t.name}`?t.name:e},this._computeHelper=t=>{if("entity"===t.name)return Bt(this.hass)("editor.entity_helper")}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement())}setConfig(t){this._config={...t}}render(){if(!this.hass||!this._config)return W``;const t=[{name:"entity",required:!0,selector:{entity:{include_domains:["switch","sensor","select","number","binary_sensor","button"]}}},{name:"name",selector:{text:{}}},{type:"expandable",name:"entities",flatten:!0,title:Bt(this.hass)("editor.entities_section"),schema:xt.map(t=>({name:t,selector:{entity:{domain:kt(t)}}}))}];return W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){const e=Object.fromEntries(Object.entries(t.detail.value).filter(([,t])=>""!==t&&null!=t)),i=new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}});this.dispatchEvent(i)}static get styles(){return n`
      ha-form {
        width: 100%;
      }
    `}};t([ft({attribute:!1})],Jt.prototype,"hass",void 0),t([function(t){return ft({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */()],Jt.prototype,"_config",void 0),Jt=t([ht("xiaomi-smart-pet-fountain-2-card-editor")],Jt),console.info("%c  XIAOMI-SMART-PET-FOUNTAIN-2-CARD  \n%c  Version 1.2.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),function(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}({type:"xiaomi-smart-pet-fountain-2-card",name:"Xiaomi Smart Pet Fountain 2 Card",description:"A custom card for controlling Xiaomi Smart Pet Fountain 2"});const Qt=["auto","interval","constant"];let Zt=class extends ct{static getConfigElement(){return document.createElement("xiaomi-smart-pet-fountain-2-card-editor")}static getStubConfig(t){const e=t?.states??{},i=Object.values(t?.entities??{}).filter(t=>t?.platform===mt&&"power"===t.translation_key&&!!e[t.entity_id]).map(t=>t.entity_id).sort()[0];return{type:"custom:xiaomi-smart-pet-fountain-2-card",entity:i??Object.keys(e).sort().find(t=>/^switch\..+_pet_drinking_fountain$/.test(t))??""}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t}getCardSize(){const t=this.offsetHeight;if(t>0)return Math.ceil(t/50);return Et(this.hass,this.config).missing.length?8:7}getGridOptions(){return{columns:6,min_columns:6,rows:"auto"}}render(){if(!this.hass||!this.config)return W`
        <ha-card>
          <div class="card-content message">
            <div class="message-detail">${zt(this.hass,"card.loading")}</div>
          </div>
        </ha-card>
      `;const{entities:t,missing:e}=Et(this.hass,this.config),i=this.hass.states[this.config.entity],o=Object.values(t).some(t=>!!t&&!!this.hass?.states[t]);if(!i&&!o)return W`
        <ha-card>
          <div class="card-content message">
            <div class="message-title">${this._title()}</div>
            ${this.config.entity?W`<div class="message-detail">
                  ${zt(this.hass,"card.entity_not_found")}:
                  ${this.config.entity}
                </div>`:X}
            <div class="message-hint">
              ${zt(this.hass,"card.select_entity")}
            </div>
          </div>
        </ha-card>
      `;const s=t.powerSwitch,r=s?this.hass.states[s]:void 0,n=t.mode,a=n?this.hass.states[n]:void 0,l=this._modeOptions(a),c=Vt(Wt(a))??(a?void 0:"auto"),d=l.find(t=>Vt(t)===c),h=t.batteryLevel,u=Ft(h?this.hass.states[h]:null),p=t.chargingState,f=Wt(p?this.hass.states[p]:null),_=!(!h&&!p),g=t.waterShortage,m=g?this.hass.states[g]:null,y=!!m&&"on"===m.state,v=[{on:"on"===this.hass.states[t.pumpBlocked??""]?.state,icon:"mdi:pump-off",label:zt(this.hass,"card.pump_blocked")},{on:"on"===this.hass.states[t.fault??""]?.state,icon:"mdi:alert-circle",label:zt(this.hass,"card.fault")}].filter(t=>t.on),b=t.filterLifeLevel,$=function(t){const e=Ft(t);return void 0===e?void 0:Math.min(100,Math.max(0,e))}(b?this.hass.states[b]:null),w=t.filterLeftTime,x=Ft(w?this.hass.states[w]:null),k=t.outWaterInterval,A=k?this.hass.states[k]:null,S=Ft(A),E=function(t,e,i,o){const s=Gt(e)??120;let r=Gt(i)??15;r>0||(r=1);const n=Gt(t),a=void 0===n||n>=10?Math.max(10,n??0):Math.round(1e6*(n+Math.ceil((10-n)/r-1e-9)*r))/1e6,l=Math.floor((s-a)/r)+1;l>100&&(r*=Math.ceil(l/100));const c=[];for(let t=0;t<100;t++){const e=Math.round(1e6*(a+t*r))/1e6;if(e>s)break;c.push(e)}return void 0===o||c.includes(o)||(c.push(o),c.sort((t,e)=>t-e)),c}(A?.attributes?.min,A?.attributes?.max,A?.attributes?.step,S),C="on"===r?.state,P=170*Math.PI*(250/360),M=($??0)/100*P;let O="";void 0!==x&&(O=zt(this.hass,"card.days_left",{days:Math.round(x)}));const R=void 0===$?zt(this.hass,"card.unknown"):`${Math.round($)}%`,N=[`${zt(this.hass,"card.filter_life")}: ${R}`,O].filter(Boolean).join(", "),L="on"===this.hass.states[t.noDisturb||""]?.state,T="on"===this.hass.states[t.physicalControlLock||""]?.state,U=function(t,e,i){const o=void 0===i?zt(t,"card.unknown"):`${Math.round(i)}%`,s=Vt(e);return void 0===s?`${zt(t,"card.battery")}: ${o}`:Xt(s)?`${zt(t,"card.charging")}: ${o}`:Kt(s)?zt(t,"card.charge_full"):`${zt(t,"card.no_charge")}: ${o}`}(this.hass,f,u),j=zt(this.hass,C?"card.turn_off":"card.turn_on");return W`
      <ha-card>
        <div class="card-content">
          <!-- Card Title -->
          <div class="card-title">${this._title()}</div>

          ${e.length?W`
                <div class="missing-banner" role="status">
                  ${zt(this.hass,"card.missing_entities",{entities:e.join(", ")})}
                </div>
              `:X}

          <!-- Filter Life Circular Gauge -->
          <div class="gauge-container">
            <svg
              class="gauge-svg"
              viewBox="0 0 200 200"
              role="img"
              aria-label="${N}"
            >
              <title>${O}</title>
              <!-- Background arc (3/4 circle) -->
              <path
                class="gauge-background"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke="var(--disabled-text-color)"
                stroke-width="12"
                stroke-linecap="round"
              />
              <!-- Progress arc (3/4 circle), hidden while the level is unknown -->
              ${void 0===$?X:F`<path
                class="gauge-progress ${C?"on":"off"} ${0===$?"critical":""}"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${0===$?P:M+" "+P}"
                stroke-dashoffset="0"
              />`}
            </svg>

            <!-- Content over the gauge: a vertical flow, not absolute pixel
                 positions, so larger text pushes items down instead of
                 overlapping them -->
            <div class="gauge-overlay">
              <!-- Status Icons Row (above percentage) -->
              <div class="status-icons-row">
                <!-- Battery/Charging Icon -->
                ${_?W`
                      <div
                        class="icon-indicator"
                        role="img"
                        aria-label="${U}"
                        title="${U}"
                      >
                        <ha-icon
                          icon="${function(t,e){const i=Vt(t);if(void 0!==i){if(Xt(i))return"mdi:battery-charging";if(Kt(i))return"mdi:power-plug"}return void 0===e?"mdi:battery-unknown":function(t){return t>=90?"mdi:battery":t>=70?"mdi:battery-80":t>=50?"mdi:battery-60":t>=30?"mdi:battery-40":t>=10?"mdi:battery-20":"mdi:battery-alert"}(e)}(f,u)}"
                          class="${function(t,e){const i=Vt(t);return void 0===i?"":function(t){return t.includes("no_charge")}(i)&&0===e?"critical-icon-pulse":Xt(i)?"charging":""}(f,u)}"
                        ></ha-icon>
                      </div>
                    `:X}

                <!-- Water Shortage Icon -->
                ${g?W`
                      <div
                        class="icon-indicator"
                        role=${y?"img":X}
                        aria-label=${y?zt(this.hass,"card.water_shortage"):X}
                        aria-hidden=${y?X:"true"}
                        title=${y?zt(this.hass,"card.water_shortage"):X}
                      >
                        <ha-icon
                          icon="mdi:water-alert"
                          class="water-shortage ${y?"critical-icon-pulse":"hidden"}"
                        ></ha-icon>
                      </div>
                    `:""}

                <!-- Fault Icons (pump blocked, device fault) -->
                ${v.map(t=>W`
                    <div
                      class="icon-indicator"
                      role="img"
                      aria-label="${t.label}"
                      title="${t.label}"
                    >
                      <ha-icon
                        icon="${t.icon}"
                        class="fault critical-icon-pulse"
                      ></ha-icon>
                    </div>
                  `)}
              </div>

              <!-- Center Percentage Value-->
              <div class="gauge-center" aria-hidden="true">
                <div class="gauge-value">
                  ${void 0===$?"--":`${Math.round($)}%`}
                </div>
              </div>

              <!-- Horizontal Line -->
              <div class="separator-line"></div>

              <!-- Additional Control Buttons -->
              <div class="container-controls additional-controls">
                <button
                  class="control-button ${L?"on":"off"}"
                  @click=${()=>this._toggleSwitch(t.noDisturb)}
                  ?disabled="${!t.noDisturb}"
                  title="${zt(this.hass,"card.no_disturb_mode")}"
                  aria-label="${zt(this.hass,"card.no_disturb_mode")}"
                  aria-pressed="${L?"true":"false"}"
                >
                  <ha-icon icon="mdi:bell-off"></ha-icon>
                </button>

                <button
                  class="control-button ${T?"on":"off"}"
                  @click=${()=>this._toggleSwitch(t.physicalControlLock)}
                  ?disabled="${!t.physicalControlLock}"
                  title="${zt(this.hass,"card.physical_control_lock")}"
                  aria-label="${zt(this.hass,"card.physical_control_lock")}"
                  aria-pressed="${T?"true":"false"}"
                >
                  <ha-icon icon="mdi:lock"></ha-icon>
                </button>

                <select
                  class="pill-select"
                  .value="${void 0===S?"":String(S)}"
                  @change="${t=>this._setWaterInterval(Number(t.target.value))}"
                  ?disabled="${!k||"interval"!==c}"
                  title="${zt(this.hass,"card.water_interval")}"
                  aria-label="${zt(this.hass,"card.water_interval")}"
                >
                  ${void 0===S?W`<option value="" disabled selected>--</option>`:X}
                  ${E.map(t=>W`
                      <option
                        value="${t}"
                        ?selected="${t===S}"
                      >
                        ${t} min
                      </option>
                    `)}
                </select>
              </div>

              <!-- Controls in Bottom Quarter (Power Button + Mode Selector) -->
              <div class="container-controls gauge-controls">
                <button
                  class="control-button ${C?"on":"off"}"
                  @click=${()=>this._togglePower()}
                  ?disabled="${!r}"
                  title="${j}"
                  aria-label="${zt(this.hass,"card.power")}"
                  aria-pressed="${C?"true":"false"}"
                >
                  <ha-icon icon="mdi:power"></ha-icon>
                </button>

                <button
                  class="control-button reset-filter-button"
                  @click=${()=>this._showResetConfirmation()}
                  ?disabled="${!t.resetFilterButton}"
                  title="${zt(this.hass,"card.reset_filter")}"
                  aria-label="${zt(this.hass,"card.reset_filter")}"
                  aria-haspopup="dialog"
                >
                  <ha-icon icon="mdi:air-filter"></ha-icon>
                </button>

                <select
                  class="pill-select mode-select"
                  .value="${d??""}"
                  @change="${t=>this._selectMode(t.target.value)}"
                  ?disabled="${!n||void 0===d}"
                  title="${zt(this.hass,"card.operating_mode")}"
                  aria-label="${zt(this.hass,"card.operating_mode")}"
                >
                  ${void 0===d?W`<option value="" disabled selected>--</option>`:X}
                  ${l.map(t=>W`
                      <option value="${t}" ?selected="${t===d}">
                        ${this._modeLabel(a,t)}
                      </option>
                    `)}
                </select>
              </div>
            </div>
          </div>

          ${this._renderKeepMode(t,a)}
        </div>

        <!-- Reset Confirmation Dialog: native modal <dialog>, so it is
             rendered in the top layer, the page behind is inert with the
             focus kept inside, Escape closes it and it has role "dialog". -->
        <dialog
          class="reset-dialog"
          aria-labelledby="reset-dialog-message"
          @click=${t=>{t.target===t.currentTarget&&this._hideResetDialog()}}
          @close=${()=>this._resetButton?.focus()}
        >
          <div class="dialog-message" id="reset-dialog-message">
            ${zt(this.hass,"dialog.reset_filter_message")}
          </div>
          <div class="dialog-buttons">
            <button
              class="dialog-button cancel"
              autofocus
              @click=${()=>this._hideResetDialog()}
            >
              ${zt(this.hass,"dialog.cancel")}
            </button>
            <button
              class="dialog-button confirm"
              @click=${()=>this._confirmResetFilter()}
            >
              ${zt(this.hass,"dialog.confirm")}
            </button>
          </div>
        </dialog>
      </ha-card>
    `}_renderKeepMode(t,e){const i=this.hass,o=i?.states[t.keepMode??""],s=Wt(o);if(!i||!o||void 0===s)return X;const r=o.attributes?.preferred_mode,n="on"!==s?zt(i,"card.keep_mode_off"):"string"==typeof r&&r?zt(i,"card.keep_mode_on",{mode:this._modeLabel(e,r)}):zt(i,"card.keep_mode_any"),a=i.states[t.lastModeRestore??""],l=this._formatTimestamp(a),c="failed"===a?.attributes?.result,d=l?zt(i,"card.last_restore",{time:l})+(c?` (${zt(i,"card.restore_failed")})`:""):"";return W`
      <div class="keep-mode">
        <div class="keep-mode-status ${"on"===s?"on":"off"}">
          <ha-icon icon="mdi:backup-restore"></ha-icon>
          <span>${n}</span>
        </div>
        ${d?W`<div class="keep-mode-last ${c?"failed":""}">
              ${d}
            </div>`:X}
      </div>
    `}_formatTimestamp(t){const e=Wt(t);if(!t||void 0===e)return"";const i="function"==typeof this.hass?.formatEntityState?this.hass.formatEntityState(t):void 0;if(i&&i!==e)return i;const o=new Date(e);if(Number.isNaN(o.getTime()))return"";try{return o.toLocaleString(this.hass?.locale?.language,{dateStyle:"short",timeStyle:"short"})}catch{return o.toLocaleString()}}_title(){return this.config?.name?.trim()||"Xiaomi Smart Pet Fountain 2"}_relatedEntities(){return Et(this.hass,this.config).entities}_modeOptions(t){const e=t?.attributes?.options;return Array.isArray(e)&&e.length?e.map(String):Qt}_modeLabel(t,e){const i=t&&"function"==typeof this.hass?.formatEntityState?this.hass.formatEntityState(t,e):void 0;if(i&&i!==e)return i;const o=`card.modes.${Vt(e)}`,s=Bt(this.hass)(o);return s!==o?s:i||e}async _callService(t,e,i){if(this.hass)try{await this.hass.callService(t,e,i)}catch(i){console.error(`${t}.${e} failed`,i);const o=i instanceof Error?i.message:i?.message??String(i);this.dispatchEvent(new CustomEvent("hass-notification",{bubbles:!0,composed:!0,detail:{message:zt(this.hass,"card.service_error",{error:o})}})),this.requestUpdate()}}_togglePower(){if(!this.config||!this.hass)return;const t=this._relatedEntities().powerSwitch,e=t?this.hass.states[t]:void 0;if(!t||!e)return void console.error("Power switch entity not found");const i="on"===e.state?"turn_off":"turn_on";this._callService("homeassistant",i,{entity_id:t})}_selectMode(t){if(!this.config||!this.hass)return;const e=this._relatedEntities().mode;if(!e)return void console.error("Mode select entity not found");const i=Vt(t),o=this._modeOptions(this.hass.states[e]).find(t=>Vt(t)===i)??t;this._callService("select","select_option",{entity_id:e,option:o})}_resetFilter(){if(!this.config||!this.hass)return;const t=this._relatedEntities().resetFilterButton;t?this._callService("button","press",{entity_id:t}):console.error("Reset filter button entity not found")}_showResetConfirmation(){const t=this._resetDialog;t&&!t.open&&t.showModal()}_hideResetDialog(){this._resetDialog?.open&&this._resetDialog.close()}_confirmResetFilter(){this._resetFilter(),this._hideResetDialog()}_toggleSwitch(t){if(!t||!this.hass)return void console.error("Switch entity not found");const e=this.hass.states[t];if(!e)return void console.error("Entity not found:",t);const i="on"===e.state?"turn_off":"turn_on";this._callService("homeassistant",i,{entity_id:t})}_setWaterInterval(t){if(!this.config||!this.hass)return;const e=this._relatedEntities().outWaterInterval;e?this._callService("number","set_value",{entity_id:e,value:t}):console.error("Water interval entity not found")}static get styles(){return n`
      ha-card {
        padding: 16px;
      }

      .card-content {
        position: relative;
      }

      .card-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: center;
        margin-bottom: 16px;
        letter-spacing: 0.5px;
      }

      .missing-banner {
        margin: 0 0 12px;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 13px;
        color: var(--primary-text-color);
        background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.15);
        border-left: 4px solid var(--warning-color, #ffa600);
        overflow-wrap: anywhere;
      }

      .message {
        padding: 16px;
        text-align: center;
      }

      .message-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }

      .message-detail {
        color: var(--secondary-text-color);
        font-size: 14px;
        overflow-wrap: anywhere;
      }

      .message-hint {
        color: var(--secondary-text-color);
        font-size: 12px;
        margin-top: 8px;
      }

      /* Gauge: the SVG and the overlay share one grid cell */
      .gauge-container {
        position: relative;
        display: grid;
        margin: 0 auto;
        width: min(100%, 280px);
        /* cqw units below scale with the gauge width */
        container-type: inline-size;
      }

      .gauge-svg {
        grid-area: 1 / 1;
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 1;
      }

      .gauge-background {
        opacity: 0.2;
      }

      .gauge-progress {
        transition:
          stroke-dasharray 0.3s ease,
          stroke 0.3s ease;
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

      .gauge-overlay {
        grid-area: 1 / 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* Proportions of the 280 px design: icons at 16 %, value centred
           at 43 %, controls in the opening of the arc */
        padding-top: 16cqw;
        min-width: 0;
      }

      /* Status Icons Row - above percentage, between gauge and center */
      .status-icons-row {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;
        min-height: 24px;
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

      .icon-indicator ha-icon.charging {
        color: var(--success-color);
        animation: pulse 2s infinite;
      }

      .critical-icon-pulse {
        color: var(--error-color);
        animation: pulse 2s infinite;
      }

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

      /* Center Percentage Value */
      .gauge-center {
        margin-top: 9.5cqw;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .gauge-value {
        font-size: clamp(24px, 15cqw, 42px);
        line-height: 1.15;
        font-weight: 400;
        color: var(--primary-text-color);
        text-align: center;
      }

      /* Horizontal Separator Line */
      .separator-line {
        flex-shrink: 0;
        margin-top: 3.5cqw;
        width: min(200px, 72%);
        height: 3px;
        background-color: var(--disabled-text-color);
        border-radius: 2px;
      }

      .container-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 4px;
        max-width: 100%;
      }

      /* Additional Control Buttons (No Disturb, Physical Lock) */
      .additional-controls {
        margin-top: 4.5cqw;
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
        margin-top: 8cqw;
      }

      .pill-select {
        /* Narrower on a narrow gauge so the row stays inside the arc */
        width: clamp(76px, 36cqw, 90px);
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
      }

      .pill-select:hover:not(:disabled) {
        border-color: var(--primary-color);
      }

      .pill-select:focus {
        border-color: var(--primary-color);
      }

      /* Keyboard focus: always visible */
      .control-button:focus-visible,
      .pill-select:focus-visible,
      .dialog-button:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .control-button {
        border-radius: 50%;
      }

      .pill-select:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      /* Room for the translated mode names ("Constant", "Intervalle") */
      .mode-select {
        width: clamp(76px, 38cqw, 104px);
        text-transform: capitalize;
      }

      /* Mode keeping (xiaomi_pet_fountain_2): discreet, under the gauge */
      .keep-mode {
        margin-top: 8px;
        font-size: 12px;
        line-height: 1.4;
        color: var(--secondary-text-color);
        text-align: center;
      }

      .keep-mode-status {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }

      .keep-mode-status ha-icon {
        --mdc-icon-size: 16px;
      }

      .keep-mode-status.off {
        opacity: 0.7;
      }

      .keep-mode-last.failed {
        color: var(--error-color);
      }

      /* Reset Confirmation Dialog */
      .reset-dialog {
        border: none;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        border-radius: 8px;
        padding: 24px;
        width: min(400px, calc(100vw - 32px));
        box-sizing: border-box;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .reset-dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
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

      @media (prefers-reduced-motion: reduce) {
        .gauge-progress.critical,
        .icon-indicator ha-icon.charging,
        .critical-icon-pulse {
          animation: none;
        }

        .gauge-progress,
        .control-button,
        .pill-select,
        .dialog-button {
          transition: none;
        }

        .control-button:hover:not(:disabled),
        .control-button:active:not(:disabled) {
          transform: none;
        }
      }
    `}};t([ft({type:Object})],Zt.prototype,"hass",void 0),t([ft({type:Object})],Zt.prototype,"config",void 0),t([_t("dialog.reset-dialog")],Zt.prototype,"_resetDialog",void 0),t([_t("button.reset-filter-button")],Zt.prototype,"_resetButton",void 0),Zt=t([ht("xiaomi-smart-pet-fountain-2-card")],Zt);export{Zt as XiaomiSmartPetFountainCard,Jt as XiaomiSmartPetFountainCardEditor};
