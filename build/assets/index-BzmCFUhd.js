import{a as W,g as Q,A as Y}from"./index-Bb__cgJ-.js";var R={exports:{}},z=function r(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;var n,o,s;if(Array.isArray(t)){if(n=t.length,n!=e.length)return!1;for(o=n;o--!==0;)if(!r(t[o],e[o]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(s=Object.keys(t),n=s.length,n!==Object.keys(e).length)return!1;for(o=n;o--!==0;)if(!Object.prototype.hasOwnProperty.call(e,s[o]))return!1;for(o=n;o--!==0;){var u=s[o];if(!r(t[u],e[u]))return!1}return!0}return t!==t&&e!==e};/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var X=function(t){return t!=null&&t.constructor!=null&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)};/*!
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
 */function Z(r){return typeof Blob>"u"?!1:r instanceof Blob||Object.prototype.toString.call(r)==="[object Blob]"}var K=Z,x=W,M=z,rr=X,tr=K,T=Object.prototype.toString;function P(r,t){for(var e=r.length,n=0;n<e;n++){var o=r[n];if(t(o))return o}}function C(r){return T.call(r)==="[object Function]"}function q(r){return r!==null&&typeof r=="object"}function er(r){return q(r)&&C(r.pipe)}function nr(r){return T.call(r)==="[object ArrayBuffer]"}function S(r,t){return r?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):t}function sr(r,t,e,n,o,s,u){return P(r[t.toLowerCase()],function(i){var l=!1;return typeof i[0]=="string"?l=A(e,i[0])||A(S(u,e),i[0]):i[0]instanceof RegExp&&(l=i[0].test(e)||i[0].test(S(u,e))),l&&j(n,o,i[1])&&b(s,i[2])})}function A(r,t){var e=r[0]==="/"?r.substr(1):r,n=t[0]==="/"?t.substr(1):t;return e===n}function j(r,t,e){return b(t,e&&e.params)&&or(r,e&&e.data)}function b(r,t){return t===void 0?!0:typeof t.asymmetricMatch=="function"?t.asymmetricMatch(r):M(r,t)}function or(r,t){if(t===void 0)return!0;var e;try{e=JSON.parse(r)}catch{}return b(e||r,t)}function ir(r,t){Object.keys(r.handlers).forEach(function(e){var n=r.handlers[e].indexOf(t);n>-1&&r.handlers[e].splice(n,1)})}function D(r,t,e,n){if(n>0){setTimeout(D,n,r,t,e);return}!e.config.validateStatus||e.config.validateStatus(e.status)?r(e):t(I("Request failed with status code "+e.status,e.config,e))}function I(r,t,e,n){if(typeof x.AxiosError=="function")return x.AxiosError.from(new Error(r),n,t,null,e);var o=new Error(r);return o.isAxiosError=!0,o.config=t,e!==void 0&&(o.response=e),n!==void 0&&(o.code=n),o.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},o}function ar(r){var t=`Could not find mock for: 
`+JSON.stringify({method:r.method,url:r.url,params:r.params,headers:r.headers},null,2),e=new Error(t);return e.isCouldNotFindMockError=!0,e.url=r.url,e.method=r.method,e}var L={find:P,findHandler:sr,purgeIfReplyOnce:ir,settle:D,isStream:er,isArrayBuffer:nr,isFunction:C,isObjectOrArray:q,isBuffer:rr,isBlob:tr,isBodyOrParametersMatching:j,isEqual:M,createAxiosError:I,createCouldNotFindMockError:ar},c=L;function ur(r){return c.isArrayBuffer(r)||c.isBuffer(r)||c.isStream(r)||c.isBlob(r)?r:c.isObjectOrArray(r)?JSON.parse(JSON.stringify(r)):r}function v(r,t){return{status:r[0],data:ur(r[1]),headers:r[2],config:t,request:{responseURL:t.url}}}function B(r,t,e,n){var o=n.baseURL;if(n.baseURL&&!/^https?:/.test(n.baseURL)&&(o=void 0),typeof r.originalAdapter=="function")return r.originalAdapter(n).then(t,e);r.axiosInstanceWithoutInterceptors(Object.assign({},n,{baseURL:o,adapter:r.originalAdapter,transformRequest:[],transformResponse:[]})).then(t,e)}function fr(r,t,e,n){var o=n.url||"";n.baseURL&&o.substr(0,n.baseURL.length)===n.baseURL&&(o=o.slice(n.baseURL.length)),delete n.adapter,r.history[n.method].push(n);var s=c.findHandler(r.handlers,n.method,o,n.data,n.params,n.headers&&n.headers.constructor.name==="AxiosHeaders"?Object.assign({},n.headers.toJSON()):n.headers,n.baseURL);if(s)if(s[6]===!0&&c.purgeIfReplyOnce(r,s),s.length===2)B(r,t,e,n);else if(typeof s[3]!="function")c.settle(t,e,v(s.slice(3),n),O(r,s));else{var u=s[3](n);typeof u.then!="function"?c.settle(t,e,v(u,n),O(r,s)):u.then(function(i){i.config&&i.status?c.settle(t,e,v([i.status,i.data,i.headers],i.config),0):c.settle(t,e,v(i,n),O(r,s))},function(i){r.delayResponse>0?setTimeout(function(){e(i)},O(r,s)):e(i)})}else switch(r.onNoMatch){case"passthrough":B(r,t,e,n);break;case"throwException":throw c.createCouldNotFindMockError(n);default:c.settle(t,e,{status:404,config:n},r.delayResponse)}}function O(r,t){var e=t[7];return typeof e=="number"?e:r.delayResponse}var cr=fr,lr=cr,p=L,w=["get","post","head","delete","patch","put","options","list","link","unlink"];function dr(){return(function(r){var t=this;return new Promise(function(e,n){lr(t,e,n,r)})}).bind(this)}function J(){return w.reduce(function(r,t){return r[t]=[],r},{})}function H(){F.call(this),$.call(this)}function F(){this.handlers=J()}function $(){this.history=J()}function h(r,t){if(H.call(this),r)this.axiosInstance=r,this.axiosInstanceWithoutInterceptors=r.create?r.create():void 0,this.originalAdapter=r.defaults.adapter,this.delayResponse=t&&t.delayResponse>0?t.delayResponse:null,this.onNoMatch=t&&t.onNoMatch||null,r.defaults.adapter=this.adapter.call(this);else throw new Error("Please provide an instance of axios to mock")}h.prototype.adapter=dr;h.prototype.restore=function(){this.axiosInstance&&(this.axiosInstance.defaults.adapter=this.originalAdapter,this.axiosInstance=void 0)};h.prototype.reset=H;h.prototype.resetHandlers=F;h.prototype.resetHistory=$;var pr=["any","get","delete","head","options"];function hr(r,t,e){return pr.includes(r)?U(r,t||{}):U(r,Object.assign({},e,{data:t}))}var yr=["headers","params","data"];function U(r,t){for(var e in t)if(!yr.includes(e))throw new Error("Invalid config property "+JSON.stringify(e)+" provided to "+_(r)+". Config: "+JSON.stringify(t));return t}function _(r){return"on"+r.charAt(0).toUpperCase()+r.slice(1)}w.concat("any").forEach(function(r){h.prototype[_(r)]=function(s,e,n){var o=this,s=s===void 0?/.*/:s,u,i=hr(r,e,n);function l(a,f,E){var g=[s,i,i.headers,a,f,E,!1,u];return N(r,o.handlers,g),o}function G(a){u=a;var f=m.reply.bind(m);return Object.assign(f,m),f}function y(a,f,E){var g=[s,i,i.headers,a,f,E,!0,u];return N(r,o.handlers,g),o}var m={reply:l,replyOnce:y,withDelayInMs:G,passThrough:function(){var f=[s,i];return N(r,o.handlers,f),o},abortRequest:function(){return l(function(a){var f=p.createAxiosError("Request aborted",a,void 0,"ECONNABORTED");return Promise.reject(f)})},abortRequestOnce:function(){return y(function(a){var f=p.createAxiosError("Request aborted",a,void 0,"ECONNABORTED");return Promise.reject(f)})},networkError:function(){return l(function(a){var f=p.createAxiosError("Network Error",a);return Promise.reject(f)})},networkErrorOnce:function(){return y(function(a){var f=p.createAxiosError("Network Error",a);return Promise.reject(f)})},timeout:function(){return l(function(a){var f=p.createAxiosError(a.timeoutErrorMessage||"timeout of "+a.timeout+"ms exceeded",a,void 0,a.transitional&&a.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED");return Promise.reject(f)})},timeoutOnce:function(){return y(function(a){var f=p.createAxiosError(a.timeoutErrorMessage||"timeout of "+a.timeout+"ms exceeded",a,void 0,a.transitional&&a.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED");return Promise.reject(f)})}};return m}});function mr(r,t,e){for(var n=-1,o=0;o<t[r].length;o+=1){var s=t[r][o],u=s[6]===!0,i=s[0]instanceof RegExp&&e[0]instanceof RegExp?String(s[0])===String(e[0]):s[0]===e[0],l=i&&p.isEqual(s[1],e[1])&&p.isEqual(s[2],e[2]);l&&!u&&(n=o)}return n}function N(r,t,e){if(r==="any")w.forEach(function(o){t[o].push(e)});else{var n=mr(r,t,e);n>-1&&e[6]!==!0?t[r].splice(n,1,e):t[r].push(e)}}R.exports=h;R.exports.default=h;var vr=R.exports;const Or=Q(vr),d=new Or(Y),k=[{id:"21",avatar:"",userName:"John Doe",email:"admin-01@ecme.com",authority:["admin","user"],password:"123Qwe",accountUserName:"admin"}];d.onPost("/sign-in").reply(r=>{const t=JSON.parse(r.data),{email:e,password:n}=t,o=k.find(s=>s.email===e&&s.password===n);return o?new Promise(function(s){setTimeout(function(){s([201,{user:o,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)}):[401,{message:"Invalid email or password!"}]});d.onPost("/sign-up").reply(r=>{const t=JSON.parse(r.data),{email:e,userName:n}=t,o=k.some(u=>u.email===e),s={avatar:"",userName:n,email:e,authority:["admin","user"]};return new Promise(function(u){setTimeout(function(){o&&u([400,{message:"User already exist!"}]),u([201,{user:s,token:"wVYrxaeNa9OxdnULvde1Au5m5w63"}])},800)})});d.onPost("/reset-password").reply(()=>[200,!0]);d.onPost("/forgot-password").reply(()=>[200,!0]);d.onPost("/sign-out").reply(()=>[200,!0]);const V=[],Er=[];function gr(r,t,e){const n=s=>{for(const u in s)if(s[e]!=null&&s[e].toString().toUpperCase().indexOf(t.toString().toUpperCase())!==-1)return!0};return r.filter(s=>n(s))}d.onGet("/api/notification/list").reply(()=>[200,V]);d.onGet("/api/notification/count").reply(()=>[200,{count:V.filter(t=>!t.readed).length}]);d.onGet("/api/search/query").reply(r=>{const{query:t}=r.params,e=gr(Er,t,"title"),n=[];return e.forEach(s=>{n.includes(s.categoryTitle)||n.push(s.categoryTitle)}),[200,n.map(s=>({title:s,data:e.filter(u=>u.categoryTitle===s).filter((u,i)=>i<5)}))]});d.onAny().passThrough();
