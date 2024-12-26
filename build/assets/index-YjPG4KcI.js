import{a as T,g as Q,b as Y,A as z}from"./index-C6Dx_Znk.js";const{Axios:X,AxiosError:Z,CanceledError:K,isCancel:rr,CancelToken:er,VERSION:tr,all:nr,Cancel:sr,isAxiosError:or,spread:ar,toFormData:ir,AxiosHeaders:ur,HttpStatusCode:fr,formToJSON:cr,getAdapter:lr,mergeConfig:dr}=T,pr=Object.freeze(Object.defineProperty({__proto__:null,Axios:X,AxiosError:Z,AxiosHeaders:ur,Cancel:sr,CancelToken:er,CanceledError:K,HttpStatusCode:fr,VERSION:tr,all:nr,default:T,formToJSON:cr,getAdapter:lr,isAxiosError:or,isCancel:rr,mergeConfig:dr,spread:ar,toFormData:ir},Symbol.toStringTag,{value:"Module"}));var b={exports:{}};const hr=Q(pr);var yr=function r(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,o,s;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(o=n;o--!==0;)if(!r(e[o],t[o]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(s=Object.keys(e),n=s.length,n!==Object.keys(t).length)return!1;for(o=n;o--!==0;)if(!Object.prototype.hasOwnProperty.call(t,s[o]))return!1;for(o=n;o--!==0;){var u=s[o];if(!r(e[u],t[u]))return!1}return!0}return e!==e&&t!==t};/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var mr=function(e){return e!=null&&e.constructor!=null&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)};/*!
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
 */function vr(r){return typeof Blob>"u"?!1:r instanceof Blob||Object.prototype.toString.call(r)==="[object Blob]"}var Or=vr,w=hr,U=yr,Er=mr,gr=Or,M=Object.prototype.toString;function P(r,e){for(var t=r.length,n=0;n<t;n++){var o=r[n];if(e(o))return o}}function j(r){return M.call(r)==="[object Function]"}function q(r){return r!==null&&typeof r=="object"}function Nr(r){return q(r)&&j(r.pipe)}function br(r){return M.call(r)==="[object ArrayBuffer]"}function S(r,e){return r?r.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):e}function Rr(r,e,t,n,o,s,u){return P(r[e.toLowerCase()],function(a){var l=!1;return typeof a[0]=="string"?l=A(t,a[0])||A(S(u,t),a[0]):a[0]instanceof RegExp&&(l=a[0].test(t)||a[0].test(S(u,t))),l&&D(n,o,a[1])&&R(s,a[2])})}function A(r,e){var t=r[0]==="/"?r.substr(1):r,n=e[0]==="/"?e.substr(1):e;return t===n}function D(r,e,t){return R(e,t&&t.params)&&xr(r,t&&t.data)}function R(r,e){return e===void 0?!0:typeof e.asymmetricMatch=="function"?e.asymmetricMatch(r):U(r,e)}function xr(r,e){if(e===void 0)return!0;var t;try{t=JSON.parse(r)}catch{}return R(t||r,e)}function wr(r,e){Object.keys(r.handlers).forEach(function(t){var n=r.handlers[t].indexOf(e);n>-1&&r.handlers[t].splice(n,1)})}function I(r,e,t,n){if(n>0){setTimeout(I,n,r,e,t);return}!t.config.validateStatus||t.config.validateStatus(t.status)?r(t):e(J("Request failed with status code "+t.status,t.config,t))}function J(r,e,t,n){if(typeof w.AxiosError=="function")return w.AxiosError.from(new Error(r),n,e,null,t);var o=new Error(r);return o.isAxiosError=!0,o.config=e,t!==void 0&&(o.response=t),n!==void 0&&(o.code=n),o.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},o}function Sr(r){var e=`Could not find mock for: 
`+JSON.stringify({method:r.method,url:r.url,params:r.params,headers:r.headers},null,2),t=new Error(e);return t.isCouldNotFindMockError=!0,t.url=r.url,t.method=r.method,t}var L={find:P,findHandler:Rr,purgeIfReplyOnce:wr,settle:I,isStream:Nr,isArrayBuffer:br,isFunction:j,isObjectOrArray:q,isBuffer:Er,isBlob:gr,isBodyOrParametersMatching:D,isEqual:U,createAxiosError:J,createCouldNotFindMockError:Sr},c=L;function Ar(r){return c.isArrayBuffer(r)||c.isBuffer(r)||c.isStream(r)||c.isBlob(r)?r:c.isObjectOrArray(r)?JSON.parse(JSON.stringify(r)):r}function v(r,e){return{status:r[0],data:Ar(r[1]),headers:r[2],config:e,request:{responseURL:e.url}}}function B(r,e,t,n){var o=n.baseURL;if(n.baseURL&&!/^https?:/.test(n.baseURL)&&(o=void 0),typeof r.originalAdapter=="function")return r.originalAdapter(n).then(e,t);r.axiosInstanceWithoutInterceptors(Object.assign({},n,{baseURL:o,adapter:r.originalAdapter,transformRequest:[],transformResponse:[]})).then(e,t)}function Br(r,e,t,n){var o=n.url||"";n.baseURL&&o.substr(0,n.baseURL.length)===n.baseURL&&(o=o.slice(n.baseURL.length)),delete n.adapter,r.history[n.method].push(n);var s=c.findHandler(r.handlers,n.method,o,n.data,n.params,n.headers&&n.headers.constructor.name==="AxiosHeaders"?Object.assign({},n.headers.toJSON()):n.headers,n.baseURL);if(s)if(s[6]===!0&&c.purgeIfReplyOnce(r,s),s.length===2)B(r,e,t,n);else if(typeof s[3]!="function")c.settle(e,t,v(s.slice(3),n),O(r,s));else{var u=s[3](n);typeof u.then!="function"?c.settle(e,t,v(u,n),O(r,s)):u.then(function(a){a.config&&a.status?c.settle(e,t,v([a.status,a.data,a.headers],a.config),0):c.settle(e,t,v(a,n),O(r,s))},function(a){r.delayResponse>0?setTimeout(function(){t(a)},O(r,s)):t(a)})}else switch(r.onNoMatch){case"passthrough":B(r,e,t,n);break;case"throwException":throw c.createCouldNotFindMockError(n);default:c.settle(e,t,{status:404,config:n},r.delayResponse)}}function O(r,e){var t=e[7];return typeof t=="number"?t:r.delayResponse}var Cr=Br,Tr=Cr,p=L,x=["get","post","head","delete","patch","put","options","list","link","unlink"];function Ur(){return(function(r){var e=this;return new Promise(function(t,n){Tr(e,t,n,r)})}).bind(this)}function H(){return x.reduce(function(r,e){return r[e]=[],r},{})}function $(){F.call(this),_.call(this)}function F(){this.handlers=H()}function _(){this.history=H()}function h(r,e){if($.call(this),r)this.axiosInstance=r,this.axiosInstanceWithoutInterceptors=r.create?r.create():void 0,this.originalAdapter=r.defaults.adapter,this.delayResponse=e&&e.delayResponse>0?e.delayResponse:null,this.onNoMatch=e&&e.onNoMatch||null,r.defaults.adapter=this.adapter.call(this);else throw new Error("Please provide an instance of axios to mock")}h.prototype.adapter=Ur;h.prototype.restore=function(){this.axiosInstance&&(this.axiosInstance.defaults.adapter=this.originalAdapter,this.axiosInstance=void 0)};h.prototype.reset=$;h.prototype.resetHandlers=F;h.prototype.resetHistory=_;var Mr=["any","get","delete","head","options"];function Pr(r,e,t){return Mr.includes(r)?C(r,e||{}):C(r,Object.assign({},t,{data:e}))}var jr=["headers","params","data"];function C(r,e){for(var t in e)if(!jr.includes(t))throw new Error("Invalid config property "+JSON.stringify(t)+" provided to "+k(r)+". Config: "+JSON.stringify(e));return e}function k(r){return"on"+r.charAt(0).toUpperCase()+r.slice(1)}x.concat("any").forEach(function(r){h.prototype[k(r)]=function(s,t,n){var o=this,s=s===void 0?/.*/:s,u,a=Pr(r,t,n);function l(i,f,E){var g=[s,a,a.headers,i,f,E,!1,u];return N(r,o.handlers,g),o}function W(i){u=i;var f=m.reply.bind(m);return Object.assign(f,m),f}function y(i,f,E){var g=[s,a,a.headers,i,f,E,!0,u];return N(r,o.handlers,g),o}var m={reply:l,replyOnce:y,withDelayInMs:W,passThrough:function(){var f=[s,a];return N(r,o.handlers,f),o},abortRequest:function(){return l(function(i){var f=p.createAxiosError("Request aborted",i,void 0,"ECONNABORTED");return Promise.reject(f)})},abortRequestOnce:function(){return y(function(i){var f=p.createAxiosError("Request aborted",i,void 0,"ECONNABORTED");return Promise.reject(f)})},networkError:function(){return l(function(i){var f=p.createAxiosError("Network Error",i);return Promise.reject(f)})},networkErrorOnce:function(){return y(function(i){var f=p.createAxiosError("Network Error",i);return Promise.reject(f)})},timeout:function(){return l(function(i){var f=p.createAxiosError(i.timeoutErrorMessage||"timeout of "+i.timeout+"ms exceeded",i,void 0,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED");return Promise.reject(f)})},timeoutOnce:function(){return y(function(i){var f=p.createAxiosError(i.timeoutErrorMessage||"timeout of "+i.timeout+"ms exceeded",i,void 0,i.transitional&&i.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED");return Promise.reject(f)})}};return m}});function qr(r,e,t){for(var n=-1,o=0;o<e[r].length;o+=1){var s=e[r][o],u=s[6]===!0,a=s[0]instanceof RegExp&&t[0]instanceof RegExp?String(s[0])===String(t[0]):s[0]===t[0],l=a&&p.isEqual(s[1],t[1])&&p.isEqual(s[2],t[2]);l&&!u&&(n=o)}return n}function N(r,e,t){if(r==="any")x.forEach(function(o){e[o].push(t)});else{var n=qr(r,e,t);n>-1&&t[6]!==!0?e[r].splice(n,1,t):e[r].push(t)}}b.exports=h;b.exports.default=h;var Dr=b.exports;const Ir=Y(Dr),d=new Ir(z),V=[{id:"21",avatar:"",userName:"John Doe",email:"admin-01@ecme.com",authority:["admin","user"],password:"123Qwe",accountUserName:"admin"}];d.onPost("/sign-in").reply(r=>{const e=JSON.parse(r.data),{email:t,password:n}=e,o=V.find(s=>s.email===t&&s.password===n);return o?new Promise(function(s){setTimeout(function(){s([201,{user:o,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)}):[401,{message:"Invalid email or password!"}]});d.onPost("/sign-up").reply(r=>{const e=JSON.parse(r.data),{email:t,userName:n}=e,o=V.some(u=>u.email===t),s={avatar:"",userName:n,email:t,authority:["admin","user"]};return new Promise(function(u){setTimeout(function(){o&&u([400,{message:"User already exist!"}]),u([201,{user:s,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)})});d.onPost("/reset-password").reply(()=>[200,!0]);d.onPost("/forgot-password").reply(()=>[200,!0]);d.onPost("/sign-out").reply(()=>[200,!0]);const G=[],Jr=[];function Lr(r,e,t){const n=s=>{for(const u in s)if(s[t]!=null&&s[t].toString().toUpperCase().indexOf(e.toString().toUpperCase())!==-1)return!0};return r.filter(s=>n(s))}d.onGet("/api/notification/list").reply(()=>[200,G]);d.onGet("/api/notification/count").reply(()=>[200,{count:G.filter(e=>!e.readed).length}]);d.onGet("/api/search/query").reply(r=>{const{query:e}=r.params,t=Lr(Jr,e,"title"),n=[];return t.forEach(s=>{n.includes(s.categoryTitle)||n.push(s.categoryTitle)}),[200,n.map(s=>({title:s,data:t.filter(u=>u.categoryTitle===s).filter((u,a)=>a<5)}))]});d.onAny().passThrough();
