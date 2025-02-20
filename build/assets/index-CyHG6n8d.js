import{g as L,a as k,b as F,A as V}from"./index-D7hFyCxR.js";var g={exports:{}};const _=L(k);var G=function t(e,r){if(e===r)return!0;if(e&&r&&typeof e=="object"&&typeof r=="object"){if(e.constructor!==r.constructor)return!1;var n,s,o;if(Array.isArray(e)){if(n=e.length,n!=r.length)return!1;for(s=n;s--!==0;)if(!t(e[s],r[s]))return!1;return!0}if(e.constructor===RegExp)return e.source===r.source&&e.flags===r.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===r.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===r.toString();if(o=Object.keys(e),n=o.length,n!==Object.keys(r).length)return!1;for(s=n;s--!==0;)if(!Object.prototype.hasOwnProperty.call(r,o[s]))return!1;for(s=n;s--!==0;){var a=o[s];if(!t(e[a],r[a]))return!1}return!0}return e!==e&&r!==r};/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var W=function(e){return e!=null&&e.constructor!=null&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)};/*!
 * MIT License
 *
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */function Q(t){return typeof Blob>"u"?!1:t instanceof Blob||Object.prototype.toString.call(t)==="[object Blob]"}var Y=Q;const R=_,U=G,B=W,M=Y,$=Object.prototype.toString;function q(t,e){const r=t.length;for(let n=0;n<r;n++){const s=t[n];if(e(s))return s}}function z(t){return $.call(t)==="[object Function]"}function w(t){return t!==null&&typeof t=="object"}function X(t){return w(t)&&z(t.pipe)}function Z(t){return $.call(t)==="[object ArrayBuffer]"}function S(t,e){return t?`${t.replace(/\/+$/,"")}/${e.replace(/^\/+/,"")}`:e}function K(t,e,r,n,s,o,a){return q(t[e.toLowerCase()],function(u){let d=!1;return typeof u.url=="string"?d=A(r,u.url)||A(S(a,r),u.url):u.url instanceof RegExp&&(d=u.url.test(r)||u.url.test(S(a,r))),d&&C(n,s,u)&&N(o,u.headers)})}function A(t,e){const r=t[0]==="/"?t.substr(1):t,n=e[0]==="/"?e.substr(1):e;return r===n}function C(t,e,r){return N(e,r.params)&&ee(t,r.data)}function N(t,e){return e===void 0?!0:typeof e.asymmetricMatch=="function"?e.asymmetricMatch(t):U(t,e)}function ee(t,e){if(e===void 0)return!0;let r;try{r=JSON.parse(t)}catch{}return N(r||t,e)}function te(t,e){const r=t.handlers.indexOf(e);r>-1&&t.handlers.splice(r,1)}function re(t){return Z(t)||B(t)||X(t)||M(t)?t:w(t)?JSON.parse(JSON.stringify(t)):t}async function ne(t,e){typeof t=="function"&&(t=await t(e));const r=t.status||t[0],n=re(t.data||t[1]),s=t.headers||t[2];return t.config&&(e=t.config),{status:r,data:n,headers:s,config:e,request:{responseURL:e.url}}}async function se(t,e,r){r>0&&await new Promise(s=>setTimeout(s,r));const n=await ne(e,t);if(!n.config.validateStatus||n.config.validateStatus(n.status))return n;throw j(`Request failed with status code ${n.status}`,n.config,n)}function j(t,e,r,n){if(typeof R.AxiosError=="function")return R.AxiosError.from(new Error(t),n,e,null,r);const s=new Error(t);return s.isAxiosError=!0,s.config=e,r!==void 0&&(s.response=r),n!==void 0&&(s.code=n),s.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},s}function oe(t){const e=`Could not find mock for: 
${JSON.stringify({method:t.method,url:t.url,params:t.params,headers:t.headers},null,2)}`,r=new Error(e);return r.isCouldNotFindMockError=!0,r.url=t.url,r.method=t.method,r}var D={find:q,findHandler:K,purgeIfReplyOnce:te,settle:se,isObjectOrArray:w,isBuffer:B,isBlob:M,isBodyOrParametersMatching:C,isEqual:U,createAxiosError:j,createCouldNotFindMockError:oe};const p=D;function b(t,e){let r=e.baseURL;return r&&!/^https?:/.test(r)&&(r=void 0),typeof t.originalAdapter=="function"?t.originalAdapter(e):t.axiosInstanceWithoutInterceptors(Object.assign({},e,{baseURL:r,adapter:t.originalAdapter,transformRequest:[],transformResponse:[]}))}async function ie(t,e){let r=e.url||"";e.baseURL&&r.substr(0,e.baseURL.length)===e.baseURL&&(r=r.slice(e.baseURL.length)),delete e.adapter,t.history.push(e);const n=p.findHandler(t.handlers,e.method,r,e.data,e.params,e.headers&&e.headers.constructor.name==="AxiosHeaders"?Object.assign({},e.headers.toJSON()):e.headers,e.baseURL);if(n)return n.replyOnce&&p.purgeIfReplyOnce(t,n),n.passThrough?b(t,e):p.settle(e,n.response,ae(t,n));switch(t.onNoMatch){case"passthrough":return b(t,e);case"throwException":throw p.createCouldNotFindMockError(e);default:return p.settle(e,{status:404},t.delayResponse)}}function ae(t,e){return typeof e.delay=="number"?e.delay:t.delayResponse}var ue=ie;const ce=ue,c=D,P=["get","post","head","delete","patch","put","options","list","link","unlink"];function T(){const t=[];return P.forEach(function(e){Object.defineProperty(t,e,{get(){return t.filter(function(r){return!r.method||r.method===e})}})}),t}class x{constructor(e,r={}){if(this.reset(),e)this.axiosInstance=e,this.axiosInstanceWithoutInterceptors=e.create?e.create():void 0,this.originalAdapter=e.defaults.adapter,this.delayResponse=r.delayResponse>0?r.delayResponse:null,this.onNoMatch=r.onNoMatch||null,e.defaults.adapter=this.adapter();else throw new Error("Please provide an instance of axios to mock")}adapter(){return e=>ce(this,e)}restore(){this.axiosInstance&&(this.axiosInstance.defaults.adapter=this.originalAdapter,this.axiosInstance=void 0)}reset(){this.resetHandlers(),this.resetHistory()}resetHandlers(){this.handlers?this.handlers.length=0:this.handlers=T()}resetHistory(){this.history?this.history.length=0:this.history=T()}}const fe=["any","get","delete","head","options"];function le(t,e,r){return fe.includes(t)?v(t,e||{}):v(t,Object.assign({},r,{data:e}))}const de=["headers","params","data"];function v(t,e){for(const r in e)if(!de.includes(r))throw new Error(`Invalid config property ${JSON.stringify(r)} provided to ${I(t)}. Config: ${JSON.stringify(e)}`);return e}function I(t){return`on${t.charAt(0).toUpperCase()}${t.slice(1)}`}P.concat("any").forEach(function(t){x.prototype[I(t)]=function(e,r,n){const s=this;let o;e=e===void 0?/.*/:e;const a=le(t,r,n);function u(i,l,m){const O={url:e,method:t==="any"?void 0:t,params:a.params,data:a.data,headers:a.headers,replyOnce:!1,delay:o,response:typeof i=="function"?i:[i,l,m]};return E(t,s.handlers,O),s}function d(i){o=i;const l=y.reply.bind(y);return Object.assign(l,y),l}function h(i,l,m){const O={url:e,method:t==="any"?void 0:t,params:a.params,data:a.data,headers:a.headers,replyOnce:!0,delay:o,response:typeof i=="function"?i:[i,l,m]};return E(t,s.handlers,O),s}const y={reply:u,replyOnce:h,withDelayInMs:d,passThrough(){const i={passThrough:!0,method:t==="any"?void 0:t,url:e,params:a.params,data:a.data,headers:a.headers};return E(t,s.handlers,i),s},abortRequest(){return u(async function(i){throw c.createAxiosError("Request aborted",i,void 0,"ECONNABORTED")})},abortRequestOnce(){return h(async function(i){throw c.createAxiosError("Request aborted",i,void 0,"ECONNABORTED")})},networkError(){return u(async function(i){throw c.createAxiosError("Network Error",i)})},networkErrorOnce(){return h(async function(i){throw c.createAxiosError("Network Error",i)})},timeout(){return u(async function(i){throw c.createAxiosError(i.timeoutErrorMessage||`timeout of ${i.timeout}ms exceeded`,i,void 0,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED")})},timeoutOnce(){return h(async function(i){throw c.createAxiosError(i.timeoutErrorMessage||`timeout of ${i.timeout}ms exceeded`,i,void 0,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED")})}};return y}});function pe(t,e){let r=-1;for(let n=0;n<t.length;n+=1){const s=t[n],o=s.url instanceof RegExp&&e.url instanceof RegExp?String(s.url)===String(e.url):s.url===e.url;(!s.method||s.method===e.method)&&o&&c.isEqual(s.params,e.params)&&c.isEqual(s.data,e.data)&&c.isEqual(s.headers,e.headers)&&!s.replyOnce&&(r=n)}return r}function E(t,e,r){if(t==="any")e.push(r);else{const n=pe(e,r);n>-1&&!r.replyOnce?e.splice(n,1,r):e.push(r)}}g.exports=x;g.exports.default=x;var he=g.exports;const ye=F(he),f=new ye(V),J=[{id:"21",avatar:"",userName:"John Doe",email:"admin-01@ecme.com",authority:["admin","user"],password:"123Qwe",accountUserName:"admin"}];f.onPost("/sign-in").reply(t=>{const e=JSON.parse(t.data),{email:r,password:n}=e,s=J.find(o=>o.email===r&&o.password===n);return s?new Promise(function(o){setTimeout(function(){o([201,{user:s,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)}):[401,{message:"Invalid email or password!"}]});f.onPost("/sign-up").reply(t=>{const e=JSON.parse(t.data),{email:r,userName:n}=e,s=J.some(a=>a.email===r),o={avatar:"",userName:n,email:r,authority:["admin","user"]};return new Promise(function(a){setTimeout(function(){s&&a([400,{message:"User already exist!"}]),a([201,{user:o,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)})});f.onPost("/reset-password").reply(()=>[200,!0]);f.onPost("/forgot-password").reply(()=>[200,!0]);f.onPost("/sign-out").reply(()=>[200,!0]);const H=[],me=[];function Oe(t,e,r){const n=o=>{for(const a in o)if(o[r]!=null&&o[r].toString().toUpperCase().indexOf(e.toString().toUpperCase())!==-1)return!0};return t.filter(o=>n(o))}f.onGet("/api/notification/list").reply(()=>[200,H]);f.onGet("/api/notification/count").reply(()=>[200,{count:H.filter(e=>!e.readed).length}]);f.onGet("/api/search/query").reply(t=>{const{query:e}=t.params,r=Oe(me,e,"title"),n=[];return r.forEach(o=>{n.includes(o.categoryTitle)||n.push(o.categoryTitle)}),[200,n.map(o=>({title:o,data:r.filter(a=>a.categoryTitle===o).filter((a,u)=>u<5)}))]});f.onAny().passThrough();
