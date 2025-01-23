import{C as _r,a9 as oe,O as Br,j as J,y as Pr,r as hr,R as lr,aa as A}from"./index-sc-QLuM4.js";import{F as Wr,d as Hr,u as $r,e as qr}from"./Button-Dm-yvKbL.js";import{c as nr}from"./classNames-BTIJSEs2.js";import{A as zr}from"./index-zCBMZ2W3.js";import{m as Zr}from"./CloseButton-DdTVQlSx.js";const mr=e=>{const{controlSize:t}=_r(),{children:r,className:i,labelWidth:l=100,layout:n=oe.VERTICAL,size:f=Br.MD}=e,g={labelWidth:l,layout:n,size:f||t};return J.jsx(Wr,{value:g,children:J.jsx(Hr,{children:v=>J.jsx("div",{className:Pr("form-container",v==null?void 0:v.layout,i),children:r})})})};mr.displayName="FormContainer";const Kr=hr.forwardRef((e,t)=>{const{children:r,containerClassName:i,labelWidth:l,layout:n,size:f,...g}=e;return J.jsx("form",{ref:t,...g,children:J.jsx(mr,{className:i,labelWidth:l,layout:n,size:f,children:r})})});Kr.displayName="Form";const Yr=hr.forwardRef((e,t)=>{const{asterisk:r,children:i,className:l,errorMessage:n,extra:f,htmlFor:g,invalid:v,label:E,labelClass:F,labelWidth:b,layout:S,style:W,size:O}=e,H=$r(),{controlSize:K}=_r(),Y=O||(H==null?void 0:H.size)||K,p=b||(H==null?void 0:H.labelWidth),j=S||(H==null?void 0:H.layout)||"vertical",G=()=>{switch(j){case oe.HORIZONTAL:return E?`${lr[Y].h} ${E&&"ltr:pr-2 rtl:pl-2"}`:"ltr:pr-2 rtl:pl-2";case oe.VERTICAL:return"mb-2";case oe.INLINE:return`${lr[Y].h} ${E&&"ltr:pr-2 rtl:pl-2"}`;default:return""}},_=nr("form-item",j,l,v?"invalid":""),m=nr("form-label",E&&G(),F),V=()=>j===oe.HORIZONTAL?{...W,minWidth:p}:{...W},C={opacity:1,marginTop:3,bottom:-21},$={opacity:0,marginTop:-10},B=$;return J.jsx(qr,{value:{invalid:v},children:J.jsxs("div",{ref:t,className:_,children:[J.jsxs("label",{htmlFor:g,className:m,style:V(),children:[r&&J.jsx("span",{className:"text-red-500 ltr:mr-1 rtl:ml-1",children:"*"}),E,f&&J.jsx("span",{children:f}),E&&j!=="vertical"&&":"]}),J.jsxs("div",{className:j===oe.HORIZONTAL?"w-full flex flex-col justify-center relative":"",children:[i,J.jsx(zr,{mode:"wait",children:v&&J.jsx(Zr.div,{className:"form-explain",initial:B,animate:C,exit:$,transition:{duration:.15,type:"tween"},children:n})})]})]})})});Yr.displayName="FormItem";var me=e=>e.type==="checkbox",ce=e=>e instanceof Date,z=e=>e==null;const vr=e=>typeof e=="object";var T=e=>!z(e)&&!Array.isArray(e)&&vr(e)&&!ce(e),br=e=>T(e)&&e.target?me(e.target)?e.target.checked:e.target.value:e,Gr=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Fr=(e,t)=>e.has(Gr(t)),Jr=e=>{const t=e.constructor&&e.constructor.prototype;return T(t)&&t.hasOwnProperty("isPrototypeOf")},ze=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function I(e){let t;const r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(ze&&(e instanceof Blob||e instanceof FileList))&&(r||T(e)))if(t=r?[]:{},!r&&!Jr(e))t=e;else for(const i in e)e.hasOwnProperty(i)&&(t[i]=I(e[i]));else return e;return t}var ve=e=>Array.isArray(e)?e.filter(Boolean):[],L=e=>e===void 0,c=(e,t,r)=>{if(!t||!T(e))return r;const i=ve(t.split(/[,[\].]+?/)).reduce((l,n)=>z(l)?l:l[n],e);return L(i)||i===e?L(e[t])?r:e[t]:i},X=e=>typeof e=="boolean",Ze=e=>/^\w*$/.test(e),Ar=e=>ve(e.replace(/["|']|\]/g,"").split(/\.|\[/)),k=(e,t,r)=>{let i=-1;const l=Ze(t)?[t]:Ar(t),n=l.length,f=n-1;for(;++i<n;){const g=l[i];let v=r;if(i!==f){const E=e[g];v=T(E)||Array.isArray(E)?E:isNaN(+l[i+1])?{}:[]}if(g==="__proto__")return;e[g]=v,e=e[g]}return e};const Ve={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},ee={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},se={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},Qr=A.createContext(null),De=()=>A.useContext(Qr);var Vr=(e,t,r,i=!0)=>{const l={defaultValues:t._defaultValues};for(const n in e)Object.defineProperty(l,n,{get:()=>{const f=n;return t._proxyFormState[f]!==ee.all&&(t._proxyFormState[f]=!i||ee.all),r&&(r[f]=!0),e[f]}});return l},q=e=>T(e)&&!Object.keys(e).length,xr=(e,t,r,i)=>{r(e);const{name:l,...n}=e;return q(n)||Object.keys(n).length>=Object.keys(t).length||Object.keys(n).find(f=>t[f]===(!i||ee.all))},Z=e=>Array.isArray(e)?e:[e],pr=(e,t,r)=>!e||!t||e===t||Z(e).some(i=>i&&(r?i===t:i.startsWith(t)||t.startsWith(i)));function Ee(e){const t=A.useRef(e);t.current=e,A.useEffect(()=>{const r=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}function Xr(e){const t=De(),{control:r=t.control,disabled:i,name:l,exact:n}=e||{},[f,g]=A.useState(r._formState),v=A.useRef(!0),E=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),F=A.useRef(l);return F.current=l,Ee({disabled:i,next:b=>v.current&&pr(F.current,b.name,n)&&xr(b,E.current,r._updateFormState)&&g({...r._formState,...b}),subject:r._subjects.state}),A.useEffect(()=>(v.current=!0,E.current.isValid&&r._updateValid(!0),()=>{v.current=!1}),[r]),Vr(f,r,E.current,!1)}var te=e=>typeof e=="string",Sr=(e,t,r,i,l)=>te(e)?(i&&t.watch.add(e),c(r,e,l)):Array.isArray(e)?e.map(n=>(i&&t.watch.add(n),c(r,n))):(i&&(t.watchAll=!0),r);function et(e){const t=De(),{control:r=t.control,name:i,defaultValue:l,disabled:n,exact:f}=e||{},g=A.useRef(i);g.current=i,Ee({disabled:n,subject:r._subjects.values,next:F=>{pr(g.current,F.name,f)&&E(I(Sr(g.current,r._names,F.values||r._formValues,!1,l)))}});const[v,E]=A.useState(r._getWatch(i,l));return A.useEffect(()=>r._removeUnmounted()),v}function rt(e){const t=De(),{name:r,disabled:i,control:l=t.control,shouldUnregister:n}=e,f=Fr(l._names.array,r),g=et({control:l,name:r,defaultValue:c(l._formValues,r,c(l._defaultValues,r,e.defaultValue)),exact:!0}),v=Xr({control:l,name:r,exact:!0}),E=A.useRef(l.register(r,{...e.rules,value:g,...X(e.disabled)?{disabled:e.disabled}:{}}));return A.useEffect(()=>{const F=l._options.shouldUnregister||n,b=(S,W)=>{const O=c(l._fields,S);O&&O._f&&(O._f.mount=W)};if(b(r,!0),F){const S=I(c(l._options.defaultValues,r));k(l._defaultValues,r,S),L(c(l._formValues,r))&&k(l._formValues,r,S)}return()=>{(f?F&&!l._state.action:F)?l.unregister(r):b(r,!1)}},[r,l,f,n]),A.useEffect(()=>{c(l._fields,r)&&l._updateDisabledField({disabled:i,fields:l._fields,name:r,value:c(l._fields,r)._f.value})},[i,r,l]),{field:{name:r,value:g,...X(i)||v.disabled?{disabled:v.disabled||i}:{},onChange:A.useCallback(F=>E.current.onChange({target:{value:br(F),name:r},type:Ve.CHANGE}),[r]),onBlur:A.useCallback(()=>E.current.onBlur({target:{value:c(l._formValues,r),name:r},type:Ve.BLUR}),[r,l]),ref:A.useCallback(F=>{const b=c(l._fields,r);b&&F&&(b._f.ref={focus:()=>F.focus(),select:()=>F.select(),setCustomValidity:S=>F.setCustomValidity(S),reportValidity:()=>F.reportValidity()})},[l._fields,r])},formState:v,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!c(v.errors,r)},isDirty:{enumerable:!0,get:()=>!!c(v.dirtyFields,r)},isTouched:{enumerable:!0,get:()=>!!c(v.touchedFields,r)},isValidating:{enumerable:!0,get:()=>!!c(v.validatingFields,r)},error:{enumerable:!0,get:()=>c(v.errors,r)}})}}const Vt=e=>e.render(rt(e));var tt=(e,t,r,i,l)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[i]:l||!0}}:{},ae=()=>{const e=typeof performance>"u"?Date.now():performance.now()*1e3;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const r=(Math.random()*16+e)%16|0;return(t=="x"?r:r&3|8).toString(16)})},Ne=(e,t,r={})=>r.shouldFocus||L(r.shouldFocus)?r.focusName||`${e}.${L(r.focusIndex)?t:r.focusIndex}.`:"",he=e=>({isOnSubmit:!e||e===ee.onSubmit,isOnBlur:e===ee.onBlur,isOnChange:e===ee.onChange,isOnAll:e===ee.all,isOnTouch:e===ee.onTouched}),$e=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(i=>e.startsWith(i)&&/^\.\w+/.test(e.slice(i.length))));const de=(e,t,r,i)=>{for(const l of r||Object.keys(e)){const n=c(e,l);if(n){const{_f:f,...g}=n;if(f){if(f.refs&&f.refs[0]&&t(f.refs[0],l)&&!i)return!0;if(f.ref&&t(f.ref,f.name)&&!i)return!0;if(de(g,t))break}else if(T(g)&&de(g,t))break}}};var wr=(e,t,r)=>{const i=Z(c(e,r));return k(i,"root",t[r]),k(e,r,i),e},Ke=e=>e.type==="file",ie=e=>typeof e=="function",xe=e=>{if(!ze)return!1;const t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},Ae=e=>te(e),Ye=e=>e.type==="radio",pe=e=>e instanceof RegExp;const ur={value:!1,isValid:!1},or={value:!0,isValid:!0};var Dr=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!L(e[0].attributes.value)?L(e[0].value)||e[0].value===""?or:{value:e[0].value,isValid:!0}:or:ur}return ur};const cr={isValid:!1,value:null};var Er=e=>Array.isArray(e)?e.reduce((t,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:t,cr):cr;function dr(e,t,r="validate"){if(Ae(e)||Array.isArray(e)&&e.every(Ae)||X(e)&&!e)return{type:r,message:Ae(e)?e:"",ref:t}}var ue=e=>T(e)&&!pe(e)?e:{value:e,message:""},qe=async(e,t,r,i,l)=>{const{ref:n,refs:f,required:g,maxLength:v,minLength:E,min:F,max:b,pattern:S,validate:W,name:O,valueAsNumber:H,mount:K,disabled:Y}=e._f,p=c(t,O);if(!K||Y)return{};const j=f?f[0]:n,G=x=>{i&&j.reportValidity&&(j.setCustomValidity(X(x)?"":x||""),j.reportValidity())},_={},m=Ye(n),V=me(n),C=m||V,$=(H||Ke(n))&&L(n.value)&&L(p)||xe(n)&&n.value===""||p===""||Array.isArray(p)&&!p.length,B=tt.bind(null,O,r,_),be=(x,w,R,P=se.maxLength,re=se.minLength)=>{const Q=x?w:R;_[O]={type:x?P:re,message:Q,ref:n,...B(x?P:re,Q)}};if(l?!Array.isArray(p)||!p.length:g&&(!C&&($||z(p))||X(p)&&!p||V&&!Dr(f).isValid||m&&!Er(f).isValid)){const{value:x,message:w}=Ae(g)?{value:!!g,message:g}:ue(g);if(x&&(_[O]={type:se.required,message:w,ref:j,...B(se.required,w)},!r))return G(w),_}if(!$&&(!z(F)||!z(b))){let x,w;const R=ue(b),P=ue(F);if(!z(p)&&!isNaN(p)){const re=n.valueAsNumber||p&&+p;z(R.value)||(x=re>R.value),z(P.value)||(w=re<P.value)}else{const re=n.valueAsDate||new Date(p),Q=ge=>new Date(new Date().toDateString()+" "+ge),fe=n.type=="time",ye=n.type=="week";te(R.value)&&p&&(x=fe?Q(p)>Q(R.value):ye?p>R.value:re>new Date(R.value)),te(P.value)&&p&&(w=fe?Q(p)<Q(P.value):ye?p<P.value:re<new Date(P.value))}if((x||w)&&(be(!!x,R.message,P.message,se.max,se.min),!r))return G(_[O].message),_}if((v||E)&&!$&&(te(p)||l&&Array.isArray(p))){const x=ue(v),w=ue(E),R=!z(x.value)&&p.length>+x.value,P=!z(w.value)&&p.length<+w.value;if((R||P)&&(be(R,x.message,w.message),!r))return G(_[O].message),_}if(S&&!$&&te(p)){const{value:x,message:w}=ue(S);if(pe(x)&&!p.match(x)&&(_[O]={type:se.pattern,message:w,ref:n,...B(se.pattern,w)},!r))return G(w),_}if(W){if(ie(W)){const x=await W(p,t),w=dr(x,j);if(w&&(_[O]={...w,...B(se.validate,w.message)},!r))return G(w.message),_}else if(T(W)){let x={};for(const w in W){if(!q(x)&&!r)break;const R=dr(await W[w](p,t),j,w);R&&(x={...R,...B(w,R.message)},G(R.message),r&&(_[O]=x))}if(!q(x)&&(_[O]={ref:j,...x},!r))return _}}return G(!0),_},Te=(e,t)=>[...e,...Z(t)],Re=e=>Array.isArray(e)?e.map(()=>{}):void 0;function Ie(e,t,r){return[...e.slice(0,t),...Z(r),...e.slice(t)]}var Ue=(e,t,r)=>Array.isArray(e)?(L(e[r])&&(e[r]=void 0),e.splice(r,0,e.splice(t,1)[0]),e):[],Me=(e,t)=>[...Z(t),...Z(e)];function st(e,t){let r=0;const i=[...e];for(const l of t)i.splice(l-r,1),r++;return ve(i).length?i:[]}var je=(e,t)=>L(t)?[]:st(e,Z(t).sort((r,i)=>r-i)),Be=(e,t,r)=>{[e[t],e[r]]=[e[r],e[t]]};function it(e,t){const r=t.slice(0,-1).length;let i=0;for(;i<r;)e=L(e)?i++:e[t[i++]];return e}function at(e){for(const t in e)if(e.hasOwnProperty(t)&&!L(e[t]))return!1;return!0}function N(e,t){const r=Array.isArray(t)?t:Ze(t)?[t]:Ar(t),i=r.length===1?e:it(e,r),l=r.length-1,n=r[l];return i&&delete i[n],l!==0&&(T(i)&&q(i)||Array.isArray(i)&&at(i))&&N(e,r.slice(0,-1)),e}var fr=(e,t,r)=>(e[t]=r,e);function xt(e){const t=De(),{control:r=t.control,name:i,keyName:l="id",shouldUnregister:n}=e,[f,g]=A.useState(r._getFieldArray(i)),v=A.useRef(r._getFieldArray(i).map(ae)),E=A.useRef(f),F=A.useRef(i),b=A.useRef(!1);F.current=i,E.current=f,r._names.array.add(i),e.rules&&r.register(i,e.rules),Ee({next:({values:_,name:m})=>{if(m===F.current||!m){const V=c(_,F.current);Array.isArray(V)&&(g(V),v.current=V.map(ae))}},subject:r._subjects.array});const S=A.useCallback(_=>{b.current=!0,r._updateFieldArray(i,_)},[r,i]),W=(_,m)=>{const V=Z(I(_)),C=Te(r._getFieldArray(i),V);r._names.focus=Ne(i,C.length-1,m),v.current=Te(v.current,V.map(ae)),S(C),g(C),r._updateFieldArray(i,C,Te,{argA:Re(_)})},O=(_,m)=>{const V=Z(I(_)),C=Me(r._getFieldArray(i),V);r._names.focus=Ne(i,0,m),v.current=Me(v.current,V.map(ae)),S(C),g(C),r._updateFieldArray(i,C,Me,{argA:Re(_)})},H=_=>{const m=je(r._getFieldArray(i),_);v.current=je(v.current,_),S(m),g(m),r._updateFieldArray(i,m,je,{argA:_})},K=(_,m,V)=>{const C=Z(I(m)),$=Ie(r._getFieldArray(i),_,C);r._names.focus=Ne(i,_,V),v.current=Ie(v.current,_,C.map(ae)),S($),g($),r._updateFieldArray(i,$,Ie,{argA:_,argB:Re(m)})},Y=(_,m)=>{const V=r._getFieldArray(i);Be(V,_,m),Be(v.current,_,m),S(V),g(V),r._updateFieldArray(i,V,Be,{argA:_,argB:m},!1)},p=(_,m)=>{const V=r._getFieldArray(i);Ue(V,_,m),Ue(v.current,_,m),S(V),g(V),r._updateFieldArray(i,V,Ue,{argA:_,argB:m},!1)},j=(_,m)=>{const V=I(m),C=fr(r._getFieldArray(i),_,V);v.current=[...C].map(($,B)=>!$||B===_?ae():v.current[B]),S(C),g([...C]),r._updateFieldArray(i,C,fr,{argA:_,argB:V},!0,!1)},G=_=>{const m=Z(I(_));v.current=m.map(ae),S([...m]),g([...m]),r._updateFieldArray(i,[...m],V=>V,{},!0,!1)};return A.useEffect(()=>{if(r._state.action=!1,$e(i,r._names)&&r._subjects.state.next({...r._formState}),b.current&&(!he(r._options.mode).isOnSubmit||r._formState.isSubmitted))if(r._options.resolver)r._executeSchema([i]).then(_=>{const m=c(_.errors,i),V=c(r._formState.errors,i);(V?!m&&V.type||m&&(V.type!==m.type||V.message!==m.message):m&&m.type)&&(m?k(r._formState.errors,i,m):N(r._formState.errors,i),r._subjects.state.next({errors:r._formState.errors}))});else{const _=c(r._fields,i);_&&_._f&&!(he(r._options.reValidateMode).isOnSubmit&&he(r._options.mode).isOnSubmit)&&qe(_,r._formValues,r._options.criteriaMode===ee.all,r._options.shouldUseNativeValidation,!0).then(m=>!q(m)&&r._subjects.state.next({errors:wr(r._formState.errors,m,i)}))}r._subjects.values.next({name:i,values:{...r._formValues}}),r._names.focus&&de(r._fields,(_,m)=>{if(r._names.focus&&m.startsWith(r._names.focus)&&_.focus)return _.focus(),1}),r._names.focus="",r._updateValid(),b.current=!1},[f,i,r]),A.useEffect(()=>(!c(r._formValues,i)&&r._updateFieldArray(i),()=>{(r._options.shouldUnregister||n)&&r.unregister(i)}),[i,r,l,n]),{swap:A.useCallback(Y,[S,i,r]),move:A.useCallback(p,[S,i,r]),prepend:A.useCallback(O,[S,i,r]),append:A.useCallback(W,[S,i,r]),remove:A.useCallback(H,[S,i,r]),insert:A.useCallback(K,[S,i,r]),update:A.useCallback(j,[S,i,r]),replace:A.useCallback(G,[S,i,r]),fields:A.useMemo(()=>f.map((_,m)=>({..._,[l]:v.current[m]||ae()})),[f,l])}}var Pe=()=>{let e=[];return{get observers(){return e},next:l=>{for(const n of e)n.next&&n.next(l)},subscribe:l=>(e.push(l),{unsubscribe:()=>{e=e.filter(n=>n!==l)}}),unsubscribe:()=>{e=[]}}},Se=e=>z(e)||!vr(e);function le(e,t){if(Se(e)||Se(t))return e===t;if(ce(e)&&ce(t))return e.getTime()===t.getTime();const r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!1;for(const l of r){const n=e[l];if(!i.includes(l))return!1;if(l!=="ref"){const f=t[l];if(ce(n)&&ce(f)||T(n)&&T(f)||Array.isArray(n)&&Array.isArray(f)?!le(n,f):n!==f)return!1}}return!0}var kr=e=>e.type==="select-multiple",lt=e=>Ye(e)||me(e),We=e=>xe(e)&&e.isConnected,Cr=e=>{for(const t in e)if(ie(e[t]))return!0;return!1};function we(e,t={}){const r=Array.isArray(e);if(T(e)||r)for(const i in e)Array.isArray(e[i])||T(e[i])&&!Cr(e[i])?(t[i]=Array.isArray(e[i])?[]:{},we(e[i],t[i])):z(e[i])||(t[i]=!0);return t}function Lr(e,t,r){const i=Array.isArray(e);if(T(e)||i)for(const l in e)Array.isArray(e[l])||T(e[l])&&!Cr(e[l])?L(t)||Se(r[l])?r[l]=Array.isArray(e[l])?we(e[l],[]):{...we(e[l])}:Lr(e[l],z(t)?{}:t[l],r[l]):r[l]=!le(e[l],t[l]);return r}var Fe=(e,t)=>Lr(e,t,we(t)),Or=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:i})=>L(e)?e:t?e===""?NaN:e&&+e:r&&te(e)?new Date(e):i?i(e):e;function He(e){const t=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):t.disabled))return Ke(t)?t.files:Ye(t)?Er(e.refs).value:kr(t)?[...t.selectedOptions].map(({value:r})=>r):me(t)?Dr(e.refs).value:Or(L(t.value)?e.ref.value:t.value,e)}var nt=(e,t,r,i)=>{const l={};for(const n of e){const f=c(t,n);f&&k(l,n,f._f)}return{criteriaMode:r,names:[...e],fields:l,shouldUseNativeValidation:i}},_e=e=>L(e)?e:pe(e)?e.source:T(e)?pe(e.value)?e.value.source:e.value:e;const yr="AsyncFunction";var ut=e=>(!e||!e.validate)&&!!(ie(e.validate)&&e.validate.constructor.name===yr||T(e.validate)&&Object.values(e.validate).find(t=>t.constructor.name===yr)),ot=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function gr(e,t,r){const i=c(e,r);if(i||Ze(r))return{error:i,name:r};const l=r.split(".");for(;l.length;){const n=l.join("."),f=c(t,n),g=c(e,n);if(f&&!Array.isArray(f)&&r!==n)return{name:r};if(g&&g.type)return{name:n,error:g};l.pop()}return{name:r}}var ct=(e,t,r,i,l)=>l.isOnAll?!1:!r&&l.isOnTouch?!(t||e):(r?i.isOnBlur:l.isOnBlur)?!e:(r?i.isOnChange:l.isOnChange)?e:!0,dt=(e,t)=>!ve(c(e,t)).length&&N(e,t);const ft={mode:ee.onSubmit,reValidateMode:ee.onChange,shouldFocusError:!0};function yt(e={}){let t={...ft,...e},r={submitCount:0,isDirty:!1,isLoading:ie(t.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:t.errors||{},disabled:t.disabled||!1},i={},l=T(t.defaultValues)||T(t.values)?I(t.defaultValues||t.values)||{}:{},n=t.shouldUnregister?{}:I(l),f={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},v,E=0;const F={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},b={values:Pe(),array:Pe(),state:Pe()},S=he(t.mode),W=he(t.reValidateMode),O=t.criteriaMode===ee.all,H=s=>a=>{clearTimeout(E),E=setTimeout(s,a)},K=async s=>{if(F.isValid||s){const a=t.resolver?q((await C()).errors):await B(i,!0);a!==r.isValid&&b.state.next({isValid:a})}},Y=(s,a)=>{(F.isValidating||F.validatingFields)&&((s||Array.from(g.mount)).forEach(u=>{u&&(a?k(r.validatingFields,u,a):N(r.validatingFields,u))}),b.state.next({validatingFields:r.validatingFields,isValidating:!q(r.validatingFields)}))},p=(s,a=[],u,y,d=!0,o=!0)=>{if(y&&u){if(f.action=!0,o&&Array.isArray(c(i,s))){const h=u(c(i,s),y.argA,y.argB);d&&k(i,s,h)}if(o&&Array.isArray(c(r.errors,s))){const h=u(c(r.errors,s),y.argA,y.argB);d&&k(r.errors,s,h),dt(r.errors,s)}if(F.touchedFields&&o&&Array.isArray(c(r.touchedFields,s))){const h=u(c(r.touchedFields,s),y.argA,y.argB);d&&k(r.touchedFields,s,h)}F.dirtyFields&&(r.dirtyFields=Fe(l,n)),b.state.next({name:s,isDirty:x(s,a),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else k(n,s,a)},j=(s,a)=>{k(r.errors,s,a),b.state.next({errors:r.errors})},G=s=>{r.errors=s,b.state.next({errors:r.errors,isValid:!1})},_=(s,a,u,y)=>{const d=c(i,s);if(d){const o=c(n,s,L(u)?c(l,s):u);L(o)||y&&y.defaultChecked||a?k(n,s,a?o:He(d._f)):P(s,o),f.mount&&K()}},m=(s,a,u,y,d)=>{let o=!1,h=!1;const D={name:s},U=!!(c(i,s)&&c(i,s)._f&&c(i,s)._f.disabled);if(!u||y){F.isDirty&&(h=r.isDirty,r.isDirty=D.isDirty=x(),o=h!==D.isDirty);const M=U||le(c(l,s),a);h=!!(!U&&c(r.dirtyFields,s)),M||U?N(r.dirtyFields,s):k(r.dirtyFields,s,!0),D.dirtyFields=r.dirtyFields,o=o||F.dirtyFields&&h!==!M}if(u){const M=c(r.touchedFields,s);M||(k(r.touchedFields,s,u),D.touchedFields=r.touchedFields,o=o||F.touchedFields&&M!==u)}return o&&d&&b.state.next(D),o?D:{}},V=(s,a,u,y)=>{const d=c(r.errors,s),o=F.isValid&&X(a)&&r.isValid!==a;if(e.delayError&&u?(v=H(()=>j(s,u)),v(e.delayError)):(clearTimeout(E),v=null,u?k(r.errors,s,u):N(r.errors,s)),(u?!le(d,u):d)||!q(y)||o){const h={...y,...o&&X(a)?{isValid:a}:{},errors:r.errors,name:s};r={...r,...h},b.state.next(h)}},C=async s=>{Y(s,!0);const a=await t.resolver(n,t.context,nt(s||g.mount,i,t.criteriaMode,t.shouldUseNativeValidation));return Y(s),a},$=async s=>{const{errors:a}=await C(s);if(s)for(const u of s){const y=c(a,u);y?k(r.errors,u,y):N(r.errors,u)}else r.errors=a;return a},B=async(s,a,u={valid:!0})=>{for(const y in s){const d=s[y];if(d){const{_f:o,...h}=d;if(o){const D=g.array.has(o.name),U=d._f&&ut(d._f);U&&F.validatingFields&&Y([y],!0);const M=await qe(d,n,O,t.shouldUseNativeValidation&&!a,D);if(U&&F.validatingFields&&Y([y]),M[o.name]&&(u.valid=!1,a))break;!a&&(c(M,o.name)?D?wr(r.errors,M,o.name):k(r.errors,o.name,M[o.name]):N(r.errors,o.name))}!q(h)&&await B(h,a,u)}}return u.valid},be=()=>{for(const s of g.unMount){const a=c(i,s);a&&(a._f.refs?a._f.refs.every(u=>!We(u)):!We(a._f.ref))&&ke(s)}g.unMount=new Set},x=(s,a)=>(s&&a&&k(n,s,a),!le(Ge(),l)),w=(s,a,u)=>Sr(s,g,{...f.mount?n:L(a)?l:te(s)?{[s]:a}:a},u,a),R=s=>ve(c(f.mount?n:l,s,e.shouldUnregister?c(l,s,[]):[])),P=(s,a,u={})=>{const y=c(i,s);let d=a;if(y){const o=y._f;o&&(!o.disabled&&k(n,s,Or(a,o)),d=xe(o.ref)&&z(a)?"":a,kr(o.ref)?[...o.ref.options].forEach(h=>h.selected=d.includes(h.value)):o.refs?me(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(d)?!!d.find(D=>D===h.value):d===h.value)):o.refs[0]&&(o.refs[0].checked=!!d):o.refs.forEach(h=>h.checked=h.value===d):Ke(o.ref)?o.ref.value="":(o.ref.value=d,o.ref.type||b.values.next({name:s,values:{...n}})))}(u.shouldDirty||u.shouldTouch)&&m(s,d,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&ge(s)},re=(s,a,u)=>{for(const y in a){const d=a[y],o=`${s}.${y}`,h=c(i,o);(g.array.has(s)||!Se(d)||h&&!h._f)&&!ce(d)?re(o,d,u):P(o,d,u)}},Q=(s,a,u={})=>{const y=c(i,s),d=g.array.has(s),o=I(a);k(n,s,o),d?(b.array.next({name:s,values:{...n}}),(F.isDirty||F.dirtyFields)&&u.shouldDirty&&b.state.next({name:s,dirtyFields:Fe(l,n),isDirty:x(s,o)})):y&&!y._f&&!z(o)?re(s,o,u):P(s,o,u),$e(s,g)&&b.state.next({...r}),b.values.next({name:f.mount?s:void 0,values:{...n}})},fe=async s=>{f.mount=!0;const a=s.target;let u=a.name,y=!0;const d=c(i,u),o=()=>a.type?He(d._f):br(s),h=D=>{y=Number.isNaN(D)||le(D,c(n,u,D))};if(d){let D,U;const M=o(),ne=s.type===Ve.BLUR||s.type===Ve.FOCUS_OUT,Ur=!ot(d._f)&&!t.resolver&&!c(r.errors,u)&&!d._f.deps||ct(ne,c(r.touchedFields,u),r.isSubmitted,W,S),Le=$e(u,g,ne);k(n,u,M),ne?(d._f.onBlur&&d._f.onBlur(s),v&&v(0)):d._f.onChange&&d._f.onChange(s);const Oe=m(u,M,ne,!1),Mr=!q(Oe)||Le;if(!ne&&b.values.next({name:u,type:s.type,values:{...n}}),Ur)return F.isValid&&(e.mode==="onBlur"?ne&&K():K()),Mr&&b.state.next({name:u,...Le?{}:Oe});if(!ne&&Le&&b.state.next({...r}),t.resolver){const{errors:ir}=await C([u]);if(h(M),y){const jr=gr(r.errors,i,u),ar=gr(ir,i,jr.name||u);D=ar.error,u=ar.name,U=q(ir)}}else Y([u],!0),D=(await qe(d,n,O,t.shouldUseNativeValidation))[u],Y([u]),h(M),y&&(D?U=!1:F.isValid&&(U=await B(i,!0)));y&&(d._f.deps&&ge(d._f.deps),V(u,U,D,Oe))}},ye=(s,a)=>{if(c(r.errors,a)&&s.focus)return s.focus(),1},ge=async(s,a={})=>{let u,y;const d=Z(s);if(t.resolver){const o=await $(L(s)?s:d);u=q(o),y=s?!d.some(h=>c(o,h)):u}else s?(y=(await Promise.all(d.map(async o=>{const h=c(i,o);return await B(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!y&&!r.isValid)&&K()):y=u=await B(i);return b.state.next({...!te(s)||F.isValid&&u!==r.isValid?{}:{name:s},...t.resolver||!s?{isValid:u}:{},errors:r.errors}),a.shouldFocus&&!y&&de(i,ye,s?d:g.mount),y},Ge=s=>{const a={...f.mount?n:l};return L(s)?a:te(s)?c(a,s):s.map(u=>c(a,u))},Je=(s,a)=>({invalid:!!c((a||r).errors,s),isDirty:!!c((a||r).dirtyFields,s),error:c((a||r).errors,s),isValidating:!!c(r.validatingFields,s),isTouched:!!c((a||r).touchedFields,s)}),Nr=s=>{s&&Z(s).forEach(a=>N(r.errors,a)),b.state.next({errors:s?r.errors:{}})},Qe=(s,a,u)=>{const y=(c(i,s,{_f:{}})._f||{}).ref,d=c(r.errors,s)||{},{ref:o,message:h,type:D,...U}=d;k(r.errors,s,{...U,...a,ref:y}),b.state.next({name:s,errors:r.errors,isValid:!1}),u&&u.shouldFocus&&y&&y.focus&&y.focus()},Tr=(s,a)=>ie(s)?b.values.subscribe({next:u=>s(w(void 0,a),u)}):w(s,a,!0),ke=(s,a={})=>{for(const u of s?Z(s):g.mount)g.mount.delete(u),g.array.delete(u),a.keepValue||(N(i,u),N(n,u)),!a.keepError&&N(r.errors,u),!a.keepDirty&&N(r.dirtyFields,u),!a.keepTouched&&N(r.touchedFields,u),!a.keepIsValidating&&N(r.validatingFields,u),!t.shouldUnregister&&!a.keepDefaultValue&&N(l,u);b.values.next({values:{...n}}),b.state.next({...r,...a.keepDirty?{isDirty:x()}:{}}),!a.keepIsValid&&K()},Xe=({disabled:s,name:a,field:u,fields:y,value:d})=>{if(X(s)&&f.mount||s){const o=s?void 0:L(d)?He(u?u._f:c(y,a)._f):d;k(n,a,o),m(a,o,!1,!1,!0)}},Ce=(s,a={})=>{let u=c(i,s);const y=X(a.disabled)||X(e.disabled);return k(i,s,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:s}},name:s,mount:!0,...a}}),g.mount.add(s),u?Xe({field:u,disabled:X(a.disabled)?a.disabled:e.disabled,name:s,value:a.value}):_(s,!0,a.value),{...y?{disabled:a.disabled||e.disabled}:{},...t.progressive?{required:!!a.required,min:_e(a.min),max:_e(a.max),minLength:_e(a.minLength),maxLength:_e(a.maxLength),pattern:_e(a.pattern)}:{},name:s,onChange:fe,onBlur:fe,ref:d=>{if(d){Ce(s,a),u=c(i,s);const o=L(d.value)&&d.querySelectorAll&&d.querySelectorAll("input,select,textarea")[0]||d,h=lt(o),D=u._f.refs||[];if(h?D.find(U=>U===o):o===u._f.ref)return;k(i,s,{_f:{...u._f,...h?{refs:[...D.filter(We),o,...Array.isArray(c(l,s))?[{}]:[]],ref:{type:o.type,name:s}}:{ref:o}}}),_(s,!1,void 0,o)}else u=c(i,s,{}),u._f&&(u._f.mount=!1),(t.shouldUnregister||a.shouldUnregister)&&!(Fr(g.array,s)&&f.action)&&g.unMount.add(s)}}},er=()=>t.shouldFocusError&&de(i,ye,g.mount),Rr=s=>{X(s)&&(b.state.next({disabled:s}),de(i,(a,u)=>{const y=c(i,u);y&&(a.disabled=y._f.disabled||s,Array.isArray(y._f.refs)&&y._f.refs.forEach(d=>{d.disabled=y._f.disabled||s}))},0,!1))},rr=(s,a)=>async u=>{let y;u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let d=I(n);if(b.state.next({isSubmitting:!0}),t.resolver){const{errors:o,values:h}=await C();r.errors=o,d=h}else await B(i);if(N(r.errors,"root"),q(r.errors)){b.state.next({errors:{}});try{await s(d,u)}catch(o){y=o}}else a&&await a({...r.errors},u),er(),setTimeout(er);if(b.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:q(r.errors)&&!y,submitCount:r.submitCount+1,errors:r.errors}),y)throw y},Ir=(s,a={})=>{c(i,s)&&(L(a.defaultValue)?Q(s,I(c(l,s))):(Q(s,a.defaultValue),k(l,s,I(a.defaultValue))),a.keepTouched||N(r.touchedFields,s),a.keepDirty||(N(r.dirtyFields,s),r.isDirty=a.defaultValue?x(s,I(c(l,s))):x()),a.keepError||(N(r.errors,s),F.isValid&&K()),b.state.next({...r}))},tr=(s,a={})=>{const u=s?I(s):l,y=I(u),d=q(s),o=d?l:y;if(a.keepDefaultValues||(l=u),!a.keepValues){if(a.keepDirtyValues)for(const h of g.mount)c(r.dirtyFields,h)?k(o,h,c(n,h)):Q(h,c(o,h));else{if(ze&&L(s))for(const h of g.mount){const D=c(i,h);if(D&&D._f){const U=Array.isArray(D._f.refs)?D._f.refs[0]:D._f.ref;if(xe(U)){const M=U.closest("form");if(M){M.reset();break}}}}i={}}n=e.shouldUnregister?a.keepDefaultValues?I(l):{}:I(o),b.array.next({values:{...o}}),b.values.next({values:{...o}})}g={mount:a.keepDirtyValues?g.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},f.mount=!F.isValid||!!a.keepIsValid||!!a.keepDirtyValues,f.watch=!!e.shouldUnregister,b.state.next({submitCount:a.keepSubmitCount?r.submitCount:0,isDirty:d?!1:a.keepDirty?r.isDirty:!!(a.keepDefaultValues&&!le(s,l)),isSubmitted:a.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:d?{}:a.keepDirtyValues?a.keepDefaultValues&&n?Fe(l,n):r.dirtyFields:a.keepDefaultValues&&s?Fe(l,s):a.keepDirty?r.dirtyFields:{},touchedFields:a.keepTouched?r.touchedFields:{},errors:a.keepErrors?r.errors:{},isSubmitSuccessful:a.keepIsSubmitSuccessful?r.isSubmitSuccessful:!1,isSubmitting:!1})},sr=(s,a)=>tr(ie(s)?s(n):s,a);return{control:{register:Ce,unregister:ke,getFieldState:Je,handleSubmit:rr,setError:Qe,_executeSchema:C,_getWatch:w,_getDirty:x,_updateValid:K,_removeUnmounted:be,_updateFieldArray:p,_updateDisabledField:Xe,_getFieldArray:R,_reset:tr,_resetDefaultValues:()=>ie(t.defaultValues)&&t.defaultValues().then(s=>{sr(s,t.resetOptions),b.state.next({isLoading:!1})}),_updateFormState:s=>{r={...r,...s}},_disableForm:Rr,_subjects:b,_proxyFormState:F,_setErrors:G,get _fields(){return i},get _formValues(){return n},get _state(){return f},set _state(s){f=s},get _defaultValues(){return l},get _names(){return g},set _names(s){g=s},get _formState(){return r},set _formState(s){r=s},get _options(){return t},set _options(s){t={...t,...s}}},trigger:ge,register:Ce,handleSubmit:rr,watch:Tr,setValue:Q,getValues:Ge,reset:sr,resetField:Ir,clearErrors:Nr,unregister:ke,setError:Qe,setFocus:(s,a={})=>{const u=c(i,s),y=u&&u._f;if(y){const d=y.refs?y.refs[0]:y.ref;d.focus&&(d.focus(),a.shouldSelect&&d.select())}},getFieldState:Je}}function pt(e={}){const t=A.useRef(),r=A.useRef(),[i,l]=A.useState({isDirty:!1,isValidating:!1,isLoading:ie(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:ie(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...yt(e),formState:i});const n=t.current.control;return n._options=e,Ee({subject:n._subjects.state,next:f=>{xr(f,n._proxyFormState,n._updateFormState,!0)&&l({...n._formState})}}),A.useEffect(()=>n._disableForm(e.disabled),[n,e.disabled]),A.useEffect(()=>{if(n._proxyFormState.isDirty){const f=n._getDirty();f!==i.isDirty&&n._subjects.state.next({isDirty:f})}},[n,i.isDirty]),A.useEffect(()=>{e.values&&!le(e.values,r.current)?(n._reset(e.values,n._options.resetOptions),r.current=e.values,l(f=>({...f}))):n._resetDefaultValues()},[e.values,n]),A.useEffect(()=>{e.errors&&n._setErrors(e.errors)},[e.errors,n]),A.useEffect(()=>{n._state.mount||(n._updateValid(),n._state.mount=!0),n._state.watch&&(n._state.watch=!1,n._subjects.state.next({...n._formState})),n._removeUnmounted()}),A.useEffect(()=>{e.shouldUnregister&&n._subjects.values.next({values:n._getWatch()})},[e.shouldUnregister,n]),t.current.formState=Vr(i,n),t.current}export{Vt as C,Kr as F,Yr as a,tt as b,xt as c,et as d,c as g,k as s,pt as u};
