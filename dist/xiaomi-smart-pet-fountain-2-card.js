function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};
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
const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,O=`<${P}>`,M=document,R=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,T="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,z=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=q(1),W=q(2),V=Symbol.for("lit-noChange"),X=Symbol.for("lit-nothing"),G=new WeakMap,J=M.createTreeWalker(M,129);function K(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===j?"!--"===l[1]?n=H:void 0!==l[1]?n=L:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=z):void 0!==l[3]&&(n=z):n===z?">"===l[0]?(n=s??j,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?z:'"'===l[3]?I:D):n===I||n===D?n=z:n===H||n===L?n=j:(n=z,s=void 0);const h=n===z&&t[e+1].startsWith("/>")?" ":"";r+=n===j?i+O:c>=0?(o.push(a),i.slice(0,c)+C+i.slice(c)+k+h):i+k+(-2===c?e:h)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=Q(t,e);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=c[r++],i=o.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?st:"@"===n[1]?rt:it}),o.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(k),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],R()),J.nextNode(),a.push({type:2,index:++s});o.append(t[e],R())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(k,t+1));)a.push({type:7,index:s}),t+=k.length-1}s++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,o){if(e===V)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=N(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Y(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);J.currentNode=o;let s=J.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=J.nextNode(),r++)}return J.currentNode=M,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),N(t)?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(R()),this.O(R()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=X}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=Y(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Y(this,o[i+n],e,n),a===V&&(a=this._$AH[n]),r||=!N(a)||a!==this._$AH[n],a===X?t=X:t!==X&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class rt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??X)===V)return;const i=this._$AH,o=t===X&&i!==X||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==X&&(i===X||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(Z,et),(x.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
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
function gt(t,e){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const _t=["_pet_drinking_fountain","_filter_life_level","_filter_left_time","_battery_level","_charging_state","_status","_event_mode","_event_water","_water_shortage_status","_physical_control_locked","_no_disturb","_out_water_interval","_out_water_interval_2","_mode","_info","_reset_filter_life"].sort((t,e)=>e.length-t.length);const mt={powerSwitch:{domain:"switch",suffix:"_pet_drinking_fountain",option:"power_entity"},mode:{domain:"select",suffix:"_mode",option:"mode_entity"},filterLifeLevel:{domain:"sensor",suffix:"_filter_life_level",option:"filter_life_entity"},filterLeftTime:{domain:"sensor",suffix:"_filter_left_time",option:"filter_left_time_entity"},batteryLevel:{domain:"sensor",suffix:"_battery_level",option:"battery_entity"},chargingState:{domain:"sensor",suffix:"_charging_state",option:"charging_state_entity"},waterShortage:{domain:"binary_sensor",suffix:"_water_shortage_status",option:"water_shortage_entity"},physicalControlLock:{domain:"switch",suffix:"_physical_control_locked",option:"physical_control_lock_entity"},noDisturb:{domain:"switch",suffix:"_no_disturb",option:"no_disturb_entity"},outWaterInterval:{domain:"number",suffix:"_out_water_interval",option:"water_interval_entity"},outWaterInterval2:{domain:"number",suffix:"_out_water_interval_2"},resetFilterButton:{domain:"button",suffix:"_reset_filter_life",option:"reset_filter_entity"}},yt=Object.keys(mt),vt=yt.map(t=>mt[t].option).filter(t=>!!t);function bt(t){const e=yt.find(e=>mt[e].option===t);return e?mt[e].domain:"sensor"}function $t(t,e){const{domain:i,suffix:o}=mt[e];return t.startsWith(`${i}.`)&&t.endsWith(o)}function wt(t,e){if(!t||!e)return{entities:{},missing:[]};const i=function(t,e){const i=t?.entities,o=e?i?.[e]?.device_id:void 0;if(!t||!i||!o)return{};const s=Object.values(i).filter(e=>e.device_id===o&&!!t.states[e.entity_id]).map(t=>t.entity_id).sort(),r={};for(const t of yt){const e=s.find(e=>$t(e,t));e&&(r[t]=e)}return r}(t,e.entity),o=function(t,e){if(!t||!e)return{};const i={};for(const o of yt){const{domain:s,suffix:r}=mt[o],n=`${s}.${e}${r}`;t.states[n]&&(i[o]=n)}return i}(t,function(t){if(!t)return null;const e=t.split(".")[1];if(!e)return null;for(const t of _t)if(e.endsWith(t)&&e.length>t.length)return e.slice(0,-t.length);return e}(e.entity)),s={};for(const t of yt){const r=mt[t].option,n=r?e[r]:void 0,a="string"==typeof n&&n?n:i[t]??o[t];a&&(s[t]=a)}s.powerSwitch||!e.entity?.startsWith("switch.")||Object.values(s).includes(e.entity)||(s.powerSwitch=e.entity);const r=[];for(const e of yt){const i=mt[e].option,o=s[e];!i||o&&t.states[o]||r.push(i)}return{entities:s,missing:r}}var xt={version:"Version",entity:"Entity"},At={entity:"Entity (Required)",entity_helper:"Select any entity from your Xiaomi Smart Pet Fountain 2",name:"Name (optional)",entities_section:"Entities (optional, override the auto-discovery)",power_entity:"Power switch",mode_entity:"Operating mode",filter_life_entity:"Filter life level",filter_left_time_entity:"Filter left time",battery_entity:"Battery level",charging_state_entity:"Charging state",water_shortage_entity:"Water shortage",physical_control_lock_entity:"Physical control lock",no_disturb_entity:"No disturb",water_interval_entity:"Water interval",reset_filter_entity:"Reset filter life button"},St={turn_on:"Turn on",turn_off:"Turn off",no_disturb_mode:"No disturb",physical_control_lock:"Physical control lock",water_interval:"Water interval",reset_filter:"Reset filter life",operating_mode:"Operating mode",battery:"Battery",charging:"Charging",charge_full:"On AC power",no_charge:"On battery",water_shortage:"Water shortage !",entity_not_found:"Entity not found",unknown:"Unknown",missing_entities:"Entities not found: ${entities}. Set them in the card options.",days_left:"${days} days left",service_error:"Action failed: ${error}",loading:"Loading...",select_entity:"Select an entity of your Xiaomi Smart Pet Fountain 2 in the card options.",filter_life:"Filter life",power:"Power"},Et={reset_filter_message:"Do you want to reset the filter life?",cancel:"Cancel",confirm:"Confirm"},Ct={common:xt,editor:At,card:St,dialog:Et},kt={version:"Version",entity:"Entité"},Pt={entity:"Entité (Obligatoire)",entity_helper:"Sélectionnez n'importe quelle entité de votre Fontaine Xiaomi Smart Pet 2",name:"Nom (facultatif)",entities_section:"Entités (facultatif, remplace la découverte automatique)",power_entity:"Interrupteur marche/arrêt",mode_entity:"Mode de fonctionnement",filter_life_entity:"Durée de vie du filtre",filter_left_time_entity:"Jours de filtre restants",battery_entity:"Niveau de batterie",charging_state_entity:"État de charge",water_shortage_entity:"Manque d'eau",physical_control_lock_entity:"Verrouillage des commandes physiques",no_disturb_entity:"Ne pas déranger",water_interval_entity:"Intervalle d'eau",reset_filter_entity:"Bouton de réinitialisation du filtre"},Ot={turn_on:"Allumer",turn_off:"Éteindre",no_disturb_mode:"Ne pas déranger",physical_control_lock:"Verrouillage des commandes physiques",water_interval:"Intervalle d'eau",reset_filter:"Réinitialiser la durée de vie du filtre",operating_mode:"Mode de fonctionnement",battery:"Batterie",charging:"En charge",charge_full:"Sur secteur",no_charge:"Sur batterie",water_shortage:"Manque d'eau !",entity_not_found:"Entité non trouvée",unknown:"Inconnu",missing_entities:"Entités introuvables : ${entities}. Renseignez-les dans les options de la carte.",days_left:"${days} jours restants",service_error:"Échec de l'action : ${error}",loading:"Chargement...",select_entity:"Sélectionnez une entité de votre Fontaine Xiaomi Smart Pet 2 dans les options de la carte.",filter_life:"Durée de vie du filtre",power:"Marche/arrêt"},Mt={reset_filter_message:"Voulez-vous réinitialiser la durée d'utilisation du filtre ?",cancel:"Annuler",confirm:"Confirmer"},Rt={common:kt,editor:Pt,card:Ot,dialog:Mt};const Nt={en:Object.freeze({__proto__:null,card:St,common:xt,default:Ct,dialog:Et,editor:At}),fr:Object.freeze({__proto__:null,card:Ot,common:kt,default:Rt,dialog:Mt,editor:Pt})},Ut="en";function Tt(t,e,i="",o=""){const s=t?.locale?.language??Ut;let r;try{r=e.split(".").reduce((t,e)=>t[e],Nt[s])}catch(t){r=e.split(".").reduce((t,e)=>t[e],Nt[Ut])}return void 0===r&&(r=e.split(".").reduce((t,e)=>t[e],Nt[Ut])),"object"==typeof i&&null!==i?Object.entries(i).forEach(([t,e])=>{r=r.replace(`\${${t}}`,String(e))}):""!==i&&""!==o&&(r=r.replace(i,o)),r||e}function jt(t,e){try{return t.split(".").reduce((t,e)=>t[e],Nt[e])}catch(t){return}}function Ht(t){return function(e){let i=jt(e,t?.locale?.language??Ut);return i||(i=jt(e,Ut)),i??e}}function Lt(t){return t.includes("charging")&&!t.includes("full")}function zt(t){return t.includes("full")}const Dt=new Set(["unavailable","unknown",""]);function It(t){if(t&&"string"==typeof t.state)return Dt.has(t.state.toLowerCase())?void 0:t.state}function Bt(t){const e=It(t);if(void 0===e)return;const i=Number.parseFloat(e);return Number.isFinite(i)?i:void 0}function qt(t){const e="string"==typeof t?Number.parseFloat(t):t;return"number"==typeof e&&Number.isFinite(e)?e:void 0}let Ft=class extends ct{constructor(){super(...arguments),this._computeLabel=t=>{const e=Ht(this.hass)(`editor.${t.name}`);return e===`editor.${t.name}`?t.name:e},this._computeHelper=t=>{if("entity"===t.name)return Ht(this.hass)("editor.entity_helper")}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement())}setConfig(t){this._config={...t}}render(){if(!this.hass||!this._config)return F``;const t=[{name:"entity",required:!0,selector:{entity:{include_domains:["switch","sensor","select","number","binary_sensor","button"]}}},{name:"name",selector:{text:{}}},{type:"expandable",name:"entities",flatten:!0,title:Ht(this.hass)("editor.entities_section"),schema:vt.map(t=>({name:t,selector:{entity:{domain:bt(t)}}}))}];return F`
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
    `}};t([ft({attribute:!1})],Ft.prototype,"hass",void 0),t([function(t){return ft({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */()],Ft.prototype,"_config",void 0),Ft=t([ht("xiaomi-smart-pet-fountain-2-card-editor")],Ft),console.info("%c  XIAOMI-SMART-PET-FOUNTAIN-2-CARD  \n%c  Version 1.1.1  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),function(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}({type:"xiaomi-smart-pet-fountain-2-card",name:"Xiaomi Smart Pet Fountain 2 Card",description:"A custom card for controlling Xiaomi Smart Pet Fountain 2"});let Wt=class extends ct{static getConfigElement(){return document.createElement("xiaomi-smart-pet-fountain-2-card-editor")}static getStubConfig(t){return{type:"custom:xiaomi-smart-pet-fountain-2-card",entity:Object.keys(t?.states??{}).sort().find(t=>/^switch\..+_pet_drinking_fountain$/.test(t))??""}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=t}getCardSize(){const t=this.offsetHeight;if(t>0)return Math.ceil(t/50);return wt(this.hass,this.config).missing.length?8:7}getGridOptions(){return{columns:6,min_columns:6,rows:"auto"}}render(){if(!this.hass||!this.config)return F`
        <ha-card>
          <div class="card-content message">
            <div class="message-detail">${Tt(this.hass,"card.loading")}</div>
          </div>
        </ha-card>
      `;const{entities:t,missing:e}=wt(this.hass,this.config),i=this.hass.states[this.config.entity],o=Object.values(t).some(t=>!!t&&!!this.hass?.states[t]);if(!i&&!o)return F`
        <ha-card>
          <div class="card-content message">
            <div class="message-title">${this._title()}</div>
            ${this.config.entity?F`<div class="message-detail">
                  ${Tt(this.hass,"card.entity_not_found")}:
                  ${this.config.entity}
                </div>`:X}
            <div class="message-hint">
              ${Tt(this.hass,"card.select_entity")}
            </div>
          </div>
        </ha-card>
      `;const s=t.powerSwitch,r=s?this.hass.states[s]:void 0,n=t.mode,a=n?this.hass.states[n]:null,l=a?a.state:"auto",c=a&&a.attributes.options?a.attributes.options:["auto","interval","constant"],d=t.batteryLevel,h=Bt(d?this.hass.states[d]:null),u=t.chargingState,p=It(u?this.hass.states[u]:null),f=!(!d&&!u),g=t.waterShortage,_=g?this.hass.states[g]:null,m=!!_&&"on"===_.state,y=t.filterLifeLevel,v=function(t){const e=Bt(t);return void 0===e?void 0:Math.min(100,Math.max(0,e))}(y?this.hass.states[y]:null),b=t.filterLeftTime,$=Bt(b?this.hass.states[b]:null),w=t.outWaterInterval,x=w?this.hass.states[w]:null,A=Bt(x),S=function(t,e,i,o){const s=Math.max(10,qt(t)??0),r=qt(e)??120;let n=qt(i)??15;n>0||(n=1);const a=Math.floor((r-s)/n)+1;a>100&&(n*=Math.ceil(a/100));const l=[];for(let t=0;t<100;t++){const e=Math.round(1e6*(s+t*n))/1e6;if(e>r)break;l.push(e)}return void 0===o||l.includes(o)||(l.push(o),l.sort((t,e)=>t-e)),l}(x?.attributes?.min,x?.attributes?.max,x?.attributes?.step,A),E="on"===r?.state,C=170*Math.PI*(250/360),k=(v??0)/100*C;let P="";void 0!==$&&(P=Tt(this.hass,"card.days_left",{days:Math.round($)}));const O=void 0===v?Tt(this.hass,"card.unknown"):`${Math.round(v)}%`,M=[`${Tt(this.hass,"card.filter_life")}: ${O}`,P].filter(Boolean).join(", "),R="on"===this.hass.states[t.noDisturb||""]?.state,N="on"===this.hass.states[t.physicalControlLock||""]?.state,U=function(t,e,i){const o=void 0===i?Tt(t,"card.unknown"):`${Math.round(i)}%`,s=e?.toLowerCase();return void 0===s?`${Tt(t,"card.battery")}: ${o}`:Lt(s)?`${Tt(t,"card.charging")}: ${o}`:zt(s)?Tt(t,"card.charge_full"):`${Tt(t,"card.no_charge")}: ${o}`}(this.hass,p,h),T=Tt(this.hass,E?"card.turn_off":"card.turn_on");return F`
      <ha-card>
        <div class="card-content">
          <!-- Card Title -->
          <div class="card-title">${this._title()}</div>

          ${e.length?F`
                <div class="missing-banner" role="status">
                  ${Tt(this.hass,"card.missing_entities",{entities:e.join(", ")})}
                </div>
              `:X}

          <!-- Filter Life Circular Gauge -->
          <div class="gauge-container">
            <svg
              class="gauge-svg"
              viewBox="0 0 200 200"
              role="img"
              aria-label="${M}"
            >
              <title>${P}</title>
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
              ${void 0===v?X:W`<path
                class="gauge-progress ${E?"on":"off"} ${0===v?"critical":""}"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${0===v?C:k+" "+C}"
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
                ${f?F`
                      <div
                        class="icon-indicator"
                        role="img"
                        aria-label="${U}"
                        title="${U}"
                      >
                        <ha-icon
                          icon="${function(t,e){const i=t?.toLowerCase();if(void 0!==i){if(Lt(i))return"mdi:battery-charging";if(zt(i))return"mdi:power-plug"}return void 0===e?"mdi:battery-unknown":function(t){return t>=90?"mdi:battery":t>=70?"mdi:battery-80":t>=50?"mdi:battery-60":t>=30?"mdi:battery-40":t>=10?"mdi:battery-20":"mdi:battery-alert"}(e)}(p,h)}"
                          class="${function(t,e){const i=t?.toLowerCase();return void 0===i?"":function(t){return t.includes("no charge")}(i)&&0===e?"critical-icon-pulse":Lt(i)?"charging":""}(p,h)}"
                        ></ha-icon>
                      </div>
                    `:X}

                <!-- Water Shortage Icon -->
                ${g?F`
                      <div
                        class="icon-indicator"
                        role=${m?"img":X}
                        aria-label=${m?Tt(this.hass,"card.water_shortage"):X}
                        aria-hidden=${m?X:"true"}
                        title=${m?Tt(this.hass,"card.water_shortage"):X}
                      >
                        <ha-icon
                          icon="mdi:water-alert"
                          class="water-shortage ${m?"critical-icon-pulse":"hidden"}"
                        ></ha-icon>
                      </div>
                    `:""}
              </div>

              <!-- Center Percentage Value-->
              <div class="gauge-center" aria-hidden="true">
                <div class="gauge-value">
                  ${void 0===v?"--":`${Math.round(v)}%`}
                </div>
              </div>

              <!-- Horizontal Line -->
              <div class="separator-line"></div>

              <!-- Additional Control Buttons -->
              <div class="container-controls additional-controls">
                <button
                  class="control-button ${R?"on":"off"}"
                  @click=${()=>this._toggleSwitch(t.noDisturb)}
                  ?disabled="${!t.noDisturb}"
                  title="${Tt(this.hass,"card.no_disturb_mode")}"
                  aria-label="${Tt(this.hass,"card.no_disturb_mode")}"
                  aria-pressed="${R?"true":"false"}"
                >
                  <ha-icon icon="mdi:bell-off"></ha-icon>
                </button>

                <button
                  class="control-button ${N?"on":"off"}"
                  @click=${()=>this._toggleSwitch(t.physicalControlLock)}
                  ?disabled="${!t.physicalControlLock}"
                  title="${Tt(this.hass,"card.physical_control_lock")}"
                  aria-label="${Tt(this.hass,"card.physical_control_lock")}"
                  aria-pressed="${N?"true":"false"}"
                >
                  <ha-icon icon="mdi:lock"></ha-icon>
                </button>

                <select
                  class="pill-select"
                  .value="${void 0===A?"":String(A)}"
                  @change="${t=>this._setWaterInterval(Number(t.target.value))}"
                  ?disabled="${!w||"interval"!==l.toLowerCase()}"
                  title="${Tt(this.hass,"card.water_interval")}"
                  aria-label="${Tt(this.hass,"card.water_interval")}"
                >
                  ${void 0===A?F`<option value="" disabled selected>--</option>`:X}
                  ${S.map(t=>F`
                      <option
                        value="${t}"
                        ?selected="${t===A}"
                      >
                        ${t} min
                      </option>
                    `)}
                </select>
              </div>

              <!-- Controls in Bottom Quarter (Power Button + Mode Selector) -->
              <div class="container-controls gauge-controls">
                <button
                  class="control-button ${E?"on":"off"}"
                  @click=${()=>this._togglePower()}
                  ?disabled="${!r}"
                  title="${T}"
                  aria-label="${Tt(this.hass,"card.power")}"
                  aria-pressed="${E?"true":"false"}"
                >
                  <ha-icon icon="mdi:power"></ha-icon>
                </button>

                <button
                  class="control-button reset-filter-button"
                  @click=${()=>this._showResetConfirmation()}
                  ?disabled="${!t.resetFilterButton}"
                  title="${Tt(this.hass,"card.reset_filter")}"
                  aria-label="${Tt(this.hass,"card.reset_filter")}"
                  aria-haspopup="dialog"
                >
                  <ha-icon icon="mdi:air-filter"></ha-icon>
                </button>

                <select
                  class="pill-select mode-select"
                  .value="${l}"
                  @change="${t=>this._selectMode(t.target.value)}"
                  ?disabled="${!n}"
                  title="${Tt(this.hass,"card.operating_mode")}"
                  aria-label="${Tt(this.hass,"card.operating_mode")}"
                >
                  ${c.map(t=>F`
                      <option value="${t}" ?selected="${t===l}">
                        ${t}
                      </option>
                    `)}
                </select>
              </div>
            </div>
          </div>
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
            ${Tt(this.hass,"dialog.reset_filter_message")}
          </div>
          <div class="dialog-buttons">
            <button
              class="dialog-button cancel"
              autofocus
              @click=${()=>this._hideResetDialog()}
            >
              ${Tt(this.hass,"dialog.cancel")}
            </button>
            <button
              class="dialog-button confirm"
              @click=${()=>this._confirmResetFilter()}
            >
              ${Tt(this.hass,"dialog.confirm")}
            </button>
          </div>
        </dialog>
      </ha-card>
    `}_title(){return this.config?.name?.trim()||"Xiaomi Smart Pet Fountain 2"}_relatedEntities(){return wt(this.hass,this.config).entities}async _callService(t,e,i){if(this.hass)try{await this.hass.callService(t,e,i)}catch(i){console.error(`${t}.${e} failed`,i);const o=i instanceof Error?i.message:i?.message??String(i);this.dispatchEvent(new CustomEvent("hass-notification",{bubbles:!0,composed:!0,detail:{message:Tt(this.hass,"card.service_error",{error:o})}})),this.requestUpdate()}}_togglePower(){if(!this.config||!this.hass)return;const t=this._relatedEntities().powerSwitch,e=t?this.hass.states[t]:void 0;if(!t||!e)return void console.error("Power switch entity not found");const i="on"===e.state?"turn_off":"turn_on";this._callService("homeassistant",i,{entity_id:t})}_selectMode(t){if(!this.config||!this.hass)return;const e=this._relatedEntities().mode;e?this._callService("select","select_option",{entity_id:e,option:t}):console.error("Mode select entity not found")}_resetFilter(){if(!this.config||!this.hass)return;const t=this._relatedEntities().resetFilterButton;t?this._callService("button","press",{entity_id:t}):console.error("Reset filter button entity not found")}_showResetConfirmation(){const t=this._resetDialog;t&&!t.open&&t.showModal()}_hideResetDialog(){this._resetDialog?.open&&this._resetDialog.close()}_confirmResetFilter(){this._resetFilter(),this._hideResetDialog()}_toggleSwitch(t){if(!t||!this.hass)return void console.error("Switch entity not found");const e=this.hass.states[t];if(!e)return void console.error("Entity not found:",t);const i="on"===e.state?"turn_off":"turn_on";this._callService("homeassistant",i,{entity_id:t})}_setWaterInterval(t){if(!this.config||!this.hass)return;const e=this._relatedEntities().outWaterInterval;e?this._callService("number","set_value",{entity_id:e,value:t}):console.error("Water interval entity not found")}static get styles(){return n`
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

      .mode-select {
        text-transform: capitalize;
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
    `}};t([ft({type:Object})],Wt.prototype,"hass",void 0),t([ft({type:Object})],Wt.prototype,"config",void 0),t([gt("dialog.reset-dialog")],Wt.prototype,"_resetDialog",void 0),t([gt("button.reset-filter-button")],Wt.prototype,"_resetButton",void 0),Wt=t([ht("xiaomi-smart-pet-fountain-2-card")],Wt);export{Wt as XiaomiSmartPetFountainCard,Ft as XiaomiSmartPetFountainCardEditor};
