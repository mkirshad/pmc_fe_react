import{a as L,g as k,A as F}from"./index-a-HTmf3D.js";var g={exports:{}},_=function e(t,r){if(t===r)return!0;if(t&&r&&typeof t=="object"&&typeof r=="object"){if(t.constructor!==r.constructor)return!1;var n,s,o;if(Array.isArray(t)){if(n=t.length,n!=r.length)return!1;for(s=n;s--!==0;)if(!e(t[s],r[s]))return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if(o=Object.keys(t),n=o.length,n!==Object.keys(r).length)return!1;for(s=n;s--!==0;)if(!Object.prototype.hasOwnProperty.call(r,o[s]))return!1;for(s=n;s--!==0;){var a=o[s];if(!e(t[a],r[a]))return!1}return!0}return t!==t&&r!==r};/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var V=function(t){return t!=null&&t.constructor!=null&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)};/*!
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
 */function G(e){return typeof Blob>"u"?!1:e instanceof Blob||Object.prototype.toString.call(e)==="[object Blob]"}var W=G;const R=L,U=_,B=V,M=W,C=Object.prototype.toString;function q(e,t){const r=e.length;for(let n=0;n<r;n++){const s=e[n];if(t(s))return s}}function Q(e){return C.call(e)==="[object Function]"}function w(e){return e!==null&&typeof e=="object"}function Y(e){return w(e)&&Q(e.pipe)}function z(e){return C.call(e)==="[object ArrayBuffer]"}function S(e,t){return e?`${e.replace(/\/+$/,"")}/${t.replace(/^\/+/,"")}`:t}function X(e,t,r,n,s,o,a){return q(e[t.toLowerCase()],function(u){let d=!1;return typeof u.url=="string"?d=A(r,u.url)||A(S(a,r),u.url):u.url instanceof RegExp&&(d=u.url.test(r)||u.url.test(S(a,r))),d&&j(n,s,u)&&N(o,u.headers)})}function A(e,t){const r=e[0]==="/"?e.substr(1):e,n=t[0]==="/"?t.substr(1):t;return r===n}function j(e,t,r){return N(t,r.params)&&Z(e,r.data)}function N(e,t){return t===void 0?!0:typeof t.asymmetricMatch=="function"?t.asymmetricMatch(e):U(e,t)}function Z(e,t){if(t===void 0)return!0;let r;try{r=JSON.parse(e)}catch{}return N(r||e,t)}function K(e,t){const r=e.handlers.indexOf(t);r>-1&&e.handlers.splice(r,1)}function tt(e){return z(e)||B(e)||Y(e)||M(e)?e:w(e)?JSON.parse(JSON.stringify(e)):e}async function et(e,t){typeof e=="function"&&(e=await e(t));const r=e.status||e[0],n=tt(e.data||e[1]),s=e.headers||e[2];return e.config&&(t=e.config),{status:r,data:n,headers:s,config:t,request:{responseURL:t.url}}}async function rt(e,t,r){r>0&&await new Promise(s=>setTimeout(s,r));const n=await et(t,e);if(!n.config.validateStatus||n.config.validateStatus(n.status))return n;throw $(`Request failed with status code ${n.status}`,n.config,n)}function $(e,t,r,n){if(typeof R.AxiosError=="function")return R.AxiosError.from(new Error(e),n,t,null,r);const s=new Error(e);return s.isAxiosError=!0,s.config=t,r!==void 0&&(s.response=r),n!==void 0&&(s.code=n),s.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},s}function nt(e){const t=`Could not find mock for: 
${JSON.stringify({method:e.method,url:e.url,params:e.params,headers:e.headers},null,2)}`,r=new Error(t);return r.isCouldNotFindMockError=!0,r.url=e.url,r.method=e.method,r}var D={find:q,findHandler:X,purgeIfReplyOnce:K,settle:rt,isObjectOrArray:w,isBuffer:B,isBlob:M,isBodyOrParametersMatching:j,isEqual:U,createAxiosError:$,createCouldNotFindMockError:nt};const p=D;function b(e,t){let r=t.baseURL;return r&&!/^https?:/.test(r)&&(r=void 0),typeof e.originalAdapter=="function"?e.originalAdapter(t):e.axiosInstanceWithoutInterceptors(Object.assign({},t,{baseURL:r,adapter:e.originalAdapter,transformRequest:[],transformResponse:[]}))}async function st(e,t){let r=t.url||"";t.baseURL&&r.substr(0,t.baseURL.length)===t.baseURL&&(r=r.slice(t.baseURL.length)),delete t.adapter,e.history.push(t);const n=p.findHandler(e.handlers,t.method,r,t.data,t.params,t.headers&&t.headers.constructor.name==="AxiosHeaders"?Object.assign({},t.headers.toJSON()):t.headers,t.baseURL);if(n)return n.replyOnce&&p.purgeIfReplyOnce(e,n),n.passThrough?b(e,t):p.settle(t,n.response,ot(e,n));switch(e.onNoMatch){case"passthrough":return b(e,t);case"throwException":throw p.createCouldNotFindMockError(t);default:return p.settle(t,{status:404},e.delayResponse)}}function ot(e,t){return typeof t.delay=="number"?t.delay:e.delayResponse}var it=st;const at=it,c=D,P=["get","post","head","delete","patch","put","options","list","link","unlink"];function T(){const e=[];return P.forEach(function(t){Object.defineProperty(e,t,{get(){return e.filter(function(r){return!r.method||r.method===t})}})}),e}class x{constructor(t,r={}){if(this.reset(),t)this.axiosInstance=t,this.axiosInstanceWithoutInterceptors=t.create?t.create():void 0,this.originalAdapter=t.defaults.adapter,this.delayResponse=r.delayResponse>0?r.delayResponse:null,this.onNoMatch=r.onNoMatch||null,t.defaults.adapter=this.adapter();else throw new Error("Please provide an instance of axios to mock")}adapter(){return t=>at(this,t)}restore(){this.axiosInstance&&(this.axiosInstance.defaults.adapter=this.originalAdapter,this.axiosInstance=void 0)}reset(){this.resetHandlers(),this.resetHistory()}resetHandlers(){this.handlers?this.handlers.length=0:this.handlers=T()}resetHistory(){this.history?this.history.length=0:this.history=T()}}const ut=["any","get","delete","head","options"];function ct(e,t,r){return ut.includes(e)?v(e,t||{}):v(e,Object.assign({},r,{data:t}))}const ft=["headers","params","data"];function v(e,t){for(const r in t)if(!ft.includes(r))throw new Error(`Invalid config property ${JSON.stringify(r)} provided to ${I(e)}. Config: ${JSON.stringify(t)}`);return t}function I(e){return`on${e.charAt(0).toUpperCase()}${e.slice(1)}`}P.concat("any").forEach(function(e){x.prototype[I(e)]=function(t,r,n){const s=this;let o;t=t===void 0?/.*/:t;const a=ct(e,r,n);function u(i,l,m){const O={url:t,method:e==="any"?void 0:e,params:a.params,data:a.data,headers:a.headers,replyOnce:!1,delay:o,response:typeof i=="function"?i:[i,l,m]};return E(e,s.handlers,O),s}function d(i){o=i;const l=y.reply.bind(y);return Object.assign(l,y),l}function h(i,l,m){const O={url:t,method:e==="any"?void 0:e,params:a.params,data:a.data,headers:a.headers,replyOnce:!0,delay:o,response:typeof i=="function"?i:[i,l,m]};return E(e,s.handlers,O),s}const y={reply:u,replyOnce:h,withDelayInMs:d,passThrough(){const i={passThrough:!0,method:e==="any"?void 0:e,url:t,params:a.params,data:a.data,headers:a.headers};return E(e,s.handlers,i),s},abortRequest(){return u(async function(i){throw c.createAxiosError("Request aborted",i,void 0,"ECONNABORTED")})},abortRequestOnce(){return h(async function(i){throw c.createAxiosError("Request aborted",i,void 0,"ECONNABORTED")})},networkError(){return u(async function(i){throw c.createAxiosError("Network Error",i)})},networkErrorOnce(){return h(async function(i){throw c.createAxiosError("Network Error",i)})},timeout(){return u(async function(i){throw c.createAxiosError(i.timeoutErrorMessage||`timeout of ${i.timeout}ms exceeded`,i,void 0,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED")})},timeoutOnce(){return h(async function(i){throw c.createAxiosError(i.timeoutErrorMessage||`timeout of ${i.timeout}ms exceeded`,i,void 0,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED")})}};return y}});function lt(e,t){let r=-1;for(let n=0;n<e.length;n+=1){const s=e[n],o=s.url instanceof RegExp&&t.url instanceof RegExp?String(s.url)===String(t.url):s.url===t.url;(!s.method||s.method===t.method)&&o&&c.isEqual(s.params,t.params)&&c.isEqual(s.data,t.data)&&c.isEqual(s.headers,t.headers)&&!s.replyOnce&&(r=n)}return r}function E(e,t,r){if(e==="any")t.push(r);else{const n=lt(t,r);n>-1&&!r.replyOnce?t.splice(n,1,r):t.push(r)}}g.exports=x;g.exports.default=x;var dt=g.exports;const pt=k(dt),f=new pt(F),J=[{id:"21",avatar:"",userName:"John Doe",email:"admin-01@ecme.com",authority:["admin","user"],password:"123Qwe",accountUserName:"admin"}];f.onPost("/sign-in").reply(e=>{const t=JSON.parse(e.data),{email:r,password:n}=t,s=J.find(o=>o.email===r&&o.password===n);return s?new Promise(function(o){setTimeout(function(){o([201,{user:s,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)}):[401,{message:"Invalid email or password!"}]});f.onPost("/sign-up").reply(e=>{const t=JSON.parse(e.data),{email:r,userName:n}=t,s=J.some(a=>a.email===r),o={avatar:"",userName:n,email:r,authority:["admin","user"]};return new Promise(function(a){setTimeout(function(){s&&a([400,{message:"User already exist!"}]),a([201,{user:o,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)})});f.onPost("/reset-password").reply(()=>[200,!0]);f.onPost("/forgot-password").reply(()=>[200,!0]);f.onPost("/sign-out").reply(()=>[200,!0]);const H=[],ht=[];function yt(e,t,r){const n=o=>{for(const a in o)if(o[r]!=null&&o[r].toString().toUpperCase().indexOf(t.toString().toUpperCase())!==-1)return!0};return e.filter(o=>n(o))}f.onGet("/api/notification/list").reply(()=>[200,H]);f.onGet("/api/notification/count").reply(()=>[200,{count:H.filter(t=>!t.readed).length}]);f.onGet("/api/search/query").reply(e=>{const{query:t}=e.params,r=yt(ht,t,"title"),n=[];return r.forEach(o=>{n.includes(o.categoryTitle)||n.push(o.categoryTitle)}),[200,n.map(o=>({title:o,data:r.filter(a=>a.categoryTitle===o).filter((a,u)=>u<5)}))]});f.onAny().passThrough();
