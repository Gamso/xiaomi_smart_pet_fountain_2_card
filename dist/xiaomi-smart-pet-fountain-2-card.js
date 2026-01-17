function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,O=`<${P}>`,R=document,M=()=>R.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,z="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,N=/>/g,j=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,X=R.createTreeWalker(R,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=L;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===L?"!--"===l[1]?n=H:void 0!==l[1]?n=N:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=o??L,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?I:D):n===I||n===D?n=j:n===H||n===N?n=L:(n=j,o=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===L?i+O:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[r++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),X.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);X.currentNode=s;let o=X.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=X.nextNode(),r++)}return X.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Q(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Q(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===F)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,Y),(x.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ut({...t,state:!0,attribute:!1})}function ft(t){if(!t)return null;const e=t.split(".")[1];if(!e)return null;const i=["_pet_drinking_fountain","_filter_life_level","_filter_left_time","_battery_level","_charging_state","_status","_water_shortage_status","_physical_control_locked","_no_disturb","_out_water_interval","_out_water_interval_2","_mode","_reset_filter_life"];for(const t of i)if(e.endsWith(t))return e.slice(0,-t.length);return e}function gt(t,e){if(!t||!e)return{};const i={},s=t.states,o={powerSwitch:`switch.${e}_pet_drinking_fountain`,mode:`select.${e}_mode`,filterLifeLevel:`sensor.${e}_filter_life_level`,filterLeftTime:`sensor.${e}_filter_left_time`,batteryLevel:`sensor.${e}_battery_level`,chargingState:`sensor.${e}_charging_state`,waterShortage:`binary_sensor.${e}_water_shortage_status`,physicalControlLock:`switch.${e}_physical_control_locked`,noDisturb:`switch.${e}_no_disturb`,outWaterInterval:`number.${e}_out_water_interval`,outWaterInterval2:`number.${e}_out_water_interval_2`,resetFilterButton:`button.${e}_reset_filter_life`};for(const[t,e]of Object.entries(o))s[e]&&(i[t]=e);return i}var _t={version:"Version",entity:"Entity"},mt={entity:"Entity (Required)",entity_helper:"Select any entity from your Xiaomi Smart Pet Fountain 2"},yt={turn_on:"Turn on",turn_off:"Turn off",no_disturb_mode:"No disturb",physical_control_lock:"Physical control lock",water_interval:"Water interval",reset_filter:"Reset filter life",operating_mode:"Operating mode",battery:"Battery",charging:"Charging",charge_full:"On AC power",no_charge:"On battery",water_shortage:"Water shortage !",entity_not_found:"Entity not found",days_left:"${days} days left"},$t={reset_filter_message:"Do you want to reset the filter life?",cancel:"Cancel",confirm:"Confirm"},vt={common:_t,editor:mt,card:yt,dialog:$t},bt={version:"Version",entity:"Entité"},wt={entity:"Entité (Obligatoire)",entity_helper:"Sélectionnez n'importe quelle entité de votre Fontaine Xiaomi Smart Pet 2"},xt={turn_on:"Allumer",turn_off:"Éteindre",no_disturb_mode:"Ne pas déranger",physical_control_lock:"Verrouillage des commandes physiques",water_interval:"Intervalle d'eau",reset_filter:"Réinitialiser la durée de vie du filtre",operating_mode:"Mode de fonctionnement",battery:"Batterie",charging:"En charge",charge_full:"Sur secteur",no_charge:"Sur batterie",water_shortage:"Manque d'eau !",entity_not_found:"Entité non trouvée",days_left:"${days} jours restants"},At={reset_filter_message:"Voulez-vous réinitialiser la durée d'utilisation du filtre ?",cancel:"Annuler",confirm:"Confirmer"},St={common:bt,editor:wt,card:xt,dialog:At};const Et={en:Object.freeze({__proto__:null,card:yt,common:_t,default:vt,dialog:$t,editor:mt}),fr:Object.freeze({__proto__:null,card:xt,common:bt,default:St,dialog:At,editor:wt})},Ct="en";function kt(t,e,i="",s=""){const o=t?.locale?.language??Ct;let r;try{r=e.split(".").reduce((t,e)=>t[e],Et[o])}catch(t){r=e.split(".").reduce((t,e)=>t[e],Et[Ct])}return void 0===r&&(r=e.split(".").reduce((t,e)=>t[e],Et[Ct])),"object"==typeof i&&null!==i?Object.entries(i).forEach(([t,e])=>{r=r.replace(`\${${t}}`,String(e))}):""!==i&&""!==s&&(r=r.replace(i,s)),r||e}function Pt(t,e){try{return t.split(".").reduce((t,e)=>t[e],Et[e])}catch(t){return}}let Ot=class extends at{constructor(){super(...arguments),this._computeLabel=t=>{const e=(i=this.hass,function(t){let e=Pt(t,i?.locale?.language??Ct);return e||(e=Pt(t,Ct)),e??t});var i;return"entity"===t.name?e("editor.entity"):"name"===t.name?e("editor.name"):t.name}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement())}setConfig(t){this._config={...t}}render(){if(!this.hass||!this._config)return W``;const t=[{name:"entity",required:!0,selector:{entity:{include_domains:["switch","sensor","select","number","binary_sensor","button"]}}}];return W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){const e=t.detail.value,i=new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}});this.dispatchEvent(i)}static get styles(){return n`
      ha-form {
        width: 100%;
      }
    `}};t([ut({attribute:!1})],Ot.prototype,"hass",void 0),t([pt()],Ot.prototype,"_config",void 0),Ot=t([ct("xiaomi-smart-pet-fountain-2-card-editor")],Ot);var Rt=Object.freeze({__proto__:null,get XiaomiSmartPetFountainCardEditor(){return Ot}});console.info("%c  XIAOMI-SMART-PET-FOUNTAIN-2-CARD  \n%c  Version 1.1.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),function(t){const e=window;e.customCards=e.customCards||[],e.customCards.push({...t,preview:!0})}({type:"xiaomi-smart-pet-fountain-2-card",name:"Xiaomi Smart Pet Fountain 2 Card",description:"A custom card for controlling Xiaomi Smart Pet Fountain 2"});let Mt=class extends at{constructor(){super(...arguments),this._showResetDialog=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return Rt}),document.createElement("xiaomi-smart-pet-fountain-2-card-editor")}static async getStubConfig(t){return{type:"custom:xiaomi-smart-pet-fountain-2-card",entity:"switch.xiaomi_iv02_b820_pet_drinking_fountain"}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t}getCardSize(){return 4}render(){if(!this.hass||!this.config)return W`
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div
              style="text-align: center; color: var(--secondary-text-color);"
            >
              Loading...
            </div>
          </div>
        </ha-card>
      `;const t=this.hass.states[this.config.entity];if(!t)return W`
        <ha-card>
          <div class="card-content" style="padding: 16px;">
            <div style="text-align: center;">
              <div
                style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"
              >
                Xiaomi Smart Pet Fountain 2
              </div>
              <div style="color: var(--secondary-text-color); font-size: 14px;">
                ${kt(this.hass,"card.entity_not_found")}:
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
      `;const e=ft(this.config.entity),i=gt(this.hass,e),s=this.config.entity.startsWith("switch.")?this.config.entity:i.powerSwitch,o=s?this.hass.states[s]:t,r=i.mode,n=r?this.hass.states[r]:null,a=n?n.state:"auto",l=n&&n.attributes.options?n.attributes.options:["auto","interval","constant"],c=i.batteryLevel,h=c?this.hass.states[c]:null,d=h&&parseFloat(h.state)||0,u=i.chargingState,p=u?this.hass.states[u]:null,f=p?p.state:"no charge",g=i.waterShortage,_=g?this.hass.states[g]:null,m=!!_&&"on"===_.state,y=i.filterLifeLevel,$=y?this.hass.states[y]:null,v=$&&parseFloat($.state)||0,b=i.filterLeftTime,w=b?this.hass.states[b]:null,x=w?w.state:null,A=i.outWaterInterval,S=A?this.hass.states[A]:null,E=S&&parseFloat(S.state)||10,C=S?.attributes?.min??0,k=S?.attributes?.max??120,P=S?.attributes?.step??15,O=[];for(let t=Math.max(10,C);t<=k;t+=P)O.push(t);const R="on"===o.state;this.config.name||t.attributes.friendly_name;const M=170*Math.PI*(250/360),U=v/100*M;let T="";return x&&(T=kt(this.hass,"card.days_left",{days:x})),W`
      <ha-card>
        <div class="card-content">
          <!-- Card Title -->
          <div class="card-title">Xiaomi Smart Pet Fountain 2</div>

          <!-- Filter Life Circular Gauge -->
          <div class="gauge-container">
            <svg class="gauge-svg" viewBox="0 0 200 200">
              <title>${T}</title>
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
                class="gauge-progress ${R?"on":"off"} ${0===v?"critical":""}"
                d="M 30 150 A 85 85 0 1 1 170 150"
                fill="none"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${0===v?M:U+" "+M}"
                stroke-dashoffset="0"
                style="transition: stroke-dasharray 0.3s ease, stroke 0.3s ease;"
              />
            </svg>

            <!-- Status Icons Row (above percentage) -->
            <div class="status-icons-row">
              <!-- Battery/Charging Icon -->
              <div class="icon-indicator">
                <ha-icon
                  icon="${function(t,e){if(0===e)return"mdi:battery-alert";if(!t)return"mdi:battery";const i=t.toLowerCase();return i.includes("charging")&&!i.includes("full")?"mdi:battery-charging":i.includes("full")?"mdi:power-plug":e>=90?"mdi:battery":e>=70?"mdi:battery-80":e>=50?"mdi:battery-60":e>=30?"mdi:battery-40":e>=10?"mdi:battery-20":"mdi:battery-alert"}(f,d)}"
                  class="${function(t,e){return 0===e?"critical-icon-pulse":t&&t.toLowerCase().includes("charging")&&!t.toLowerCase().includes("full")?"charging":""}(f,d)}"
                  title="${function(t,e,i){if(!e)return`${kt(t,"card.battery")}: ${i}%`;const s=e.toLowerCase();return s.includes("charging")&&!s.includes("full")?`${kt(t,"card.charging")}: ${i}%`:s.includes("full")?kt(t,"card.charge_full"):`${kt(t,"card.no_charge")}: ${i}%`}(this.hass,f,d)}"
                ></ha-icon>
              </div>

              <!-- Water Shortage Icon -->
              ${g?W`
                    <div class="icon-indicator">
                      <ha-icon
                        icon="mdi:water-alert"
                        class="water-shortage ${m?"critical-icon-pulse":"hidden"}"
                        title="${kt(this.hass,"card.water_shortage")}"
                      ></ha-icon>
                    </div>
                  `:""}
            </div>

            <!-- Center Percentage Value-->
            <div class="gauge-center">
              <div class="gauge-value">${v}%</div>
            </div>

            <!-- Horizontal Line -->
            <div class="separator-line"></div>

            <!-- Additional Control Buttons -->
            <div class="container-controls additional-controls">
              <button
                class="control-button ${"on"===this.hass.states[i.noDisturb||""]?.state?"on":"off"}"
                @click=${()=>this._toggleSwitch(i.noDisturb)}
                ?disabled="${!i.noDisturb}"
                title="${kt(this.hass,"card.no_disturb_mode")}"
              >
                <ha-icon icon="mdi:bell-off"></ha-icon>
              </button>

              <button
                class="control-button ${"on"===this.hass.states[i.physicalControlLock||""]?.state?"on":"off"}"
                @click=${()=>this._toggleSwitch(i.physicalControlLock)}
                ?disabled="${!i.physicalControlLock}"
                title="${kt(this.hass,"card.physical_control_lock")}"
              >
                <ha-icon icon="mdi:lock"></ha-icon>
              </button>

              <select
                class="pill-select"
                .value="${E}"
                @change="${t=>this._setWaterInterval(parseInt(t.target.value))}"
                ?disabled="${!A||"interval"!==a.toLowerCase()}"
                title="${kt(this.hass,"card.water_interval")}"
              >
                ${O.map(t=>W`
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
                class="control-button ${R?"on":"off"}"
                @click=${()=>this._togglePower()}
                title="${kt(this.hass,R?"card.turn_off":"card.turn_on")}"
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>

              <button
                class="control-button"
                @click=${()=>this._showResetConfirmation()}
                ?disabled="${!i.resetFilterButton}"
                title="${kt(this.hass,"card.reset_filter")}"
              >
                <ha-icon icon="mdi:air-filter"></ha-icon>
              </button>

              <select
                class="pill-select mode-select"
                .value="${a}"
                @change="${t=>this._selectMode(t.target.value)}"
                ?disabled="${!r}"
                title="${kt(this.hass,"card.operating_mode")}"
              >
                ${l.map(t=>W`
                    <option value="${t}" ?selected="${t===a}">
                      ${t}
                    </option>
                  `)}
              </select>
            </div>
          </div>
        </div>

        <!-- Reset Confirmation Dialog -->
        ${this._showResetDialog?W`
              <div
                class="dialog-overlay"
                @click=${()=>this._hideResetDialog()}
              >
                <div
                  class="dialog-content"
                  @click=${t=>t.stopPropagation()}
                >
                  <div class="dialog-message">
                    ${kt(this.hass,"dialog.reset_filter_message")}
                  </div>
                  <div class="dialog-buttons">
                    <button
                      class="dialog-button cancel"
                      @click=${()=>this._hideResetDialog()}
                    >
                      ${kt(this.hass,"dialog.cancel")}
                    </button>
                    <button
                      class="dialog-button confirm"
                      @click=${()=>this._confirmResetFilter()}
                    >
                      ${kt(this.hass,"dialog.confirm")}
                    </button>
                  </div>
                </div>
              </div>
            `:""}
      </ha-card>
    `}_togglePower(){if(!this.config||!this.hass)return;const t=ft(this.config.entity),e=gt(this.hass,t),i=this.config.entity.startsWith("switch.")?this.config.entity:e.powerSwitch;if(!i)return void console.error("Power switch entity not found");const s="on"===this.hass.states[i].state?"turn_off":"turn_on";this.hass.callService("homeassistant",s,{entity_id:i})}_selectMode(t){if(!this.config||!this.hass)return;const e=ft(this.config.entity),i=gt(this.hass,e).mode;i?this.hass.callService("select","select_option",{entity_id:i,option:t}):console.error("Mode select entity not found")}_resetFilter(){if(!this.config||!this.hass)return;const t=ft(this.config.entity),e=gt(this.hass,t).resetFilterButton;e?this.hass.callService("button","press",{entity_id:e}):console.error("Reset filter button entity not found")}_showResetConfirmation(){this._showResetDialog=!0,this.requestUpdate()}_hideResetDialog(){this._showResetDialog=!1,this.requestUpdate()}_confirmResetFilter(){this._resetFilter(),this._hideResetDialog()}_toggleSwitch(t){if(!t||!this.hass)return void console.error("Switch entity not found");const e=this.hass.states[t];if(!e)return void console.error("Entity not found:",t);const i="on"===e.state?"turn_off":"turn_on";this.hass.callService("homeassistant",i,{entity_id:t})}_setWaterInterval(t){if(!this.config||!this.hass)return;const e=ft(this.config.entity),i=gt(this.hass,e).outWaterInterval;i?this.hass.callService("number","set_value",{entity_id:i,value:t}):console.error("Water interval entity not found")}static get styles(){return n`
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

      /* Gauge Container - */
      .gauge-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0 auto;
        width: min(100%, 320px);
        height: 280px;
        flex-shrink: 0;
        container-type: size;
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
        top: 45px;
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
        top: 43%;
        left: 50%;
        transform: translate(-50%, -50%);
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
        top: 154px;
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
        top: 170px;
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
        top: 225px;
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
    `}};t([ut({type:Object})],Mt.prototype,"hass",void 0),t([ut({type:Object})],Mt.prototype,"config",void 0),t([pt()],Mt.prototype,"_showResetDialog",void 0),Mt=t([ct("xiaomi-smart-pet-fountain-2-card")],Mt);export{Mt as XiaomiSmartPetFountainCard,Ot as XiaomiSmartPetFountainCardEditor};
//# sourceMappingURL=xiaomi-smart-pet-fountain-2-card.js.map
