import{r as y,j as O,y as b,ad as Y,a2 as te,g as ne}from"./index-BLwYN0BW.js";import{t as se,v as ae}from"./CloseButton-Ch3F0PoC.js";function re(t,s,a){let n=0;return y.Children.map(t,e=>{if(!y.isValidElement(e))return e;const o=s.call(a,e,n);return n+=1,o})}function oe(t,s,a){return re(t,(n,e)=>y.cloneElement(n,{key:e,...s(n,e)}),a)}const{COMPLETE:ie,PENDING:le,IN_PROGRESS:ue,ERROR:ce}=Y,H=y.forwardRef((t,s)=>{const{className:a,children:n,vertical:e=!1,current:o=0,status:c=ue,onChange:h,...l}=t,i=y.Children.count(n),p=oe(n,(v,u)=>{const k={flexBasis:u<i-1?`${100/(i-1)}%`:void 0,maxWidth:u===i-1?`${100/i}%`:void 0},r={stepNumber:u+1,status:le,style:e?void 0:k,isLast:u===i-1,vertical:e,onStepChange:h?()=>h(u):void 0,...v.props};return c===ce&&u===o-1&&(r.className=b("steps-item-error")),v.props.status||(u===o?(r.status=c,r.className=b(r.className,"steps-item-active")):u<o&&(r.status=ie)),r});return O.jsx("div",{ref:s,className:b("steps",e&&"steps-vertical",a),...l,children:p})});H.displayName="Steps";const{COMPLETE:_,PENDING:pe,IN_PROGRESS:Z,ERROR:j}=Y,fe={[_]:O.jsx(se,{}),[pe]:null,[Z]:null,[j]:O.jsx(ae,{})},J=y.forwardRef((t,s)=>{const{className:a,customIcon:n,description:e,isLast:o,onStepChange:c,status:h,stepNumber:l,title:i,vertical:p,...v}=t;let u=O.jsx("span",{children:fe[h]??l});n&&(u=O.jsx("span",{children:n}));const k=b(`step-item step-item-${h}`,p&&"step-item-vertical",a),r=b("step-item-wrapper",c&&"step-clickable"),f=b(`step-item-icon step-item-icon-${h}`,h===_&&"bg-primary text-white",h===j&&"step-item-icon-error",h===Z&&"text-primary dark:text-gray-100 border-primary step-item-icon-current"),d=b("step-connect",i&&"ml-2.5 rtl:mr-2.5",p&&"step-connect-vertical",h===_?"bg-primary":"inactive"),m=b("step-item-title",h===j&&"step-item-title-error",c&&h!==j&&"hover:text-primary"),g=()=>{c==null||c()};return O.jsxs("div",{className:k,...v,ref:s,role:"presentation",onClick:g,children:[O.jsxs("div",{className:r,children:[O.jsx("div",{className:f,children:u}),i&&O.jsxs("div",{className:"step-item-content",children:[i&&O.jsx("span",{className:m,children:i}),e&&p&&O.jsx("span",{className:"step-item-description",children:e})]})]}),!o&&O.jsx("div",{className:d})]})});J.displayName="StepItem";const he=H;he.Item=J;var K={exports:{}};function me(t){return t&&typeof t=="object"&&"default"in t?t.default:t}var T=me(y),de=te;function ve(t,s){for(var a=Object.getOwnPropertyNames(s),n=0;n<a.length;n++){var e=a[n],o=Object.getOwnPropertyDescriptor(s,e);o&&o.configurable&&t[e]===void 0&&Object.defineProperty(t,e,o)}return t}function $(){return($=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}function ge(t,s){t.prototype=Object.create(s.prototype),ve(t.prototype.constructor=t,s)}function ke(t,s){if(t==null)return{};var a,n,e={},o=Object.keys(t);for(n=0;n<o.length;n++)a=o[n],0<=s.indexOf(a)||(e[a]=t[a]);return e}function x(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var Se=function(t,s,a,n,e,o,c,h){if(!t){var l;if(s===void 0)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var i=[a,n,e,o,c,h],p=0;(l=new Error(s.replace(/%s/g,function(){return i[p++]}))).name="Invariant Violation"}throw l.framesToPop=1,l}},W=Se;function q(t,s,a){if("selectionStart"in t&&"selectionEnd"in t)t.selectionStart=s,t.selectionEnd=a;else{var n=t.createTextRange();n.collapse(!0),n.moveStart("character",s),n.moveEnd("character",a-s),n.select()}}function Ce(t){var s=0,a=0;if("selectionStart"in t&&"selectionEnd"in t)s=t.selectionStart,a=t.selectionEnd;else{var n=document.selection.createRange();n.parentElement()===t&&(s=-n.moveStart("character",-t.value.length),a=-n.moveEnd("character",-t.value.length))}return{start:s,end:a,length:a-s}}var we={9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},Ie="_";function G(t,s,a){var n="",e="",o=null,c=[];if(s===void 0&&(s=Ie),a==null&&(a=we),!t||typeof t!="string")return{maskChar:s,formatChars:a,mask:null,prefix:null,lastEditablePosition:null,permanents:[]};var h=!1;return t.split("").forEach(function(l){h=!h&&l==="\\"||(h||!a[l]?(c.push(n.length),n.length===c.length-1&&(e+=l)):o=n.length+1,n+=l,!1)}),{maskChar:s,formatChars:a,prefix:e,mask:n,lastEditablePosition:o,permanents:c}}function I(t,s){return t.permanents.indexOf(s)!==-1}function F(t,s,a){var n=t.mask,e=t.formatChars;if(!a)return!1;if(I(t,s))return n[s]===a;var o=e[n[s]];return new RegExp(o).test(a)}function z(t,s){return s.split("").every(function(a,n){return I(t,n)||!F(t,n,a)})}function R(t,s){var a=t.maskChar,n=t.prefix;if(!a){for(;s.length>n.length&&I(t,s.length-1);)s=s.slice(0,s.length-1);return s.length}for(var e=n.length,o=s.length;o>=n.length;o--){var c=s[o];if(!I(t,o)&&F(t,o,c)){e=o+1;break}}return e}function Q(t,s){return R(t,s)===t.mask.length}function M(t,s){var a=t.maskChar,n=t.mask,e=t.prefix;if(!a){for((s=U(t,"",s,0)).length<e.length&&(s=e);s.length<n.length&&I(t,s.length);)s+=n[s.length];return s}if(s)return U(t,M(t,""),s,0);for(var o=0;o<n.length;o++)I(t,o)?s+=n[o]:s+=a;return s}function Oe(t,s,a,n){var e=a+n,o=t.maskChar,c=t.mask,h=t.prefix,l=s.split("");if(o)return l.map(function(p,v){return v<a||e<=v?p:I(t,v)?c[v]:o}).join("");for(var i=e;i<l.length;i++)I(t,i)&&(l[i]="");return a=Math.max(h.length,a),l.splice(a,e-a),s=l.join(""),M(t,s)}function U(t,s,a,n){var e=t.mask,o=t.maskChar,c=t.prefix,h=a.split(""),l=Q(t,s);return!o&&n>s.length&&(s+=e.slice(s.length,n)),h.every(function(i){for(;k=i,I(t,u=n)&&k!==e[u];){if(n>=s.length&&(s+=e[n]),p=i,v=n,o&&I(t,v)&&p===o)return!0;if(++n>=e.length)return!1}var p,v,u,k;return!F(t,n,i)&&i!==o||(n<s.length?s=o||l||n<c.length?s.slice(0,n)+i+s.slice(n+1):(s=s.slice(0,n)+i+s.slice(n),M(t,s)):o||(s+=i),++n<e.length)}),s}function Ee(t,s,a,n){var e=t.mask,o=t.maskChar,c=a.split(""),h=n;return c.every(function(l){for(;p=l,I(t,i=n)&&p!==e[i];)if(++n>=e.length)return!1;var i,p;return(F(t,n,l)||l===o)&&n++,n<e.length}),n-h}function Me(t,s){for(var a=s;0<=a;--a)if(!I(t,a))return a;return null}function V(t,s){for(var a=t.mask,n=s;n<a.length;++n)if(!I(t,n))return n;return null}function A(t){return t||t===0?t+"":""}function De(t,s,a,n,e){var o=t.mask,c=t.prefix,h=t.lastEditablePosition,l=s,i="",p=0,v=0,u=Math.min(e.start,a.start);return a.end>e.start?v=(p=Ee(t,n,i=l.slice(e.start,a.end),u))?e.length:0:l.length<n.length&&(v=n.length-l.length),l=n,v&&(v===1&&!e.length&&(u=e.start===a.start?V(t,a.start):Me(t,a.start)),l=Oe(t,l,u,v)),l=U(t,l,i,u),(u+=p)>=o.length?u=o.length:u<c.length&&!p?u=c.length:u>=c.length&&u<h&&p&&(u=V(t,u)),i||(i=null),{value:l=M(t,l),enteredString:i,selection:{start:u,end:u}}}function be(){var t=new RegExp("windows","i"),s=new RegExp("phone","i"),a=navigator.userAgent;return t.test(a)&&s.test(a)}function w(t){return typeof t=="function"}function ye(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}function ee(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame}function X(t){return(ee()?ye():function(){return setTimeout(t,1e3/60)})(t)}function B(t){(ee()||clearTimeout)(t)}var Pe=function(t){function s(n){var e=t.call(this,n)||this;e.focused=!1,e.mounted=!1,e.previousSelection=null,e.selectionDeferId=null,e.saveSelectionLoopDeferId=null,e.saveSelectionLoop=function(){e.previousSelection=e.getSelection(),e.saveSelectionLoopDeferId=X(e.saveSelectionLoop)},e.runSaveSelectionLoop=function(){e.saveSelectionLoopDeferId===null&&e.saveSelectionLoop()},e.stopSaveSelectionLoop=function(){e.saveSelectionLoopDeferId!==null&&(B(e.saveSelectionLoopDeferId),e.saveSelectionLoopDeferId=null,e.previousSelection=null)},e.getInputDOMNode=function(){if(!e.mounted)return null;var r=de.findDOMNode(x(x(e))),f=typeof window<"u"&&r instanceof window.Element;if(r&&!f)return null;if(r.nodeName!=="INPUT"&&(r=r.querySelector("input")),!r)throw new Error("react-input-mask: inputComponent doesn't contain input node");return r},e.getInputValue=function(){var r=e.getInputDOMNode();return r?r.value:null},e.setInputValue=function(r){var f=e.getInputDOMNode();f&&(e.value=r,f.value=r)},e.setCursorToEnd=function(){var r=R(e.maskOptions,e.value),f=V(e.maskOptions,r);f!==null&&e.setCursorPosition(f)},e.setSelection=function(r,f,d){d===void 0&&(d={});var m=e.getInputDOMNode(),g=e.isFocused();m&&g&&(d.deferred||q(m,r,f),e.selectionDeferId!==null&&B(e.selectionDeferId),e.selectionDeferId=X(function(){e.selectionDeferId=null,q(m,r,f)}),e.previousSelection={start:r,end:f,length:Math.abs(f-r)})},e.getSelection=function(){return Ce(e.getInputDOMNode())},e.getCursorPosition=function(){return e.getSelection().start},e.setCursorPosition=function(r){e.setSelection(r,r)},e.isFocused=function(){return e.focused},e.getBeforeMaskedValueChangeConfig=function(){var r=e.maskOptions,f=r.mask,d=r.maskChar,m=r.permanents,g=r.formatChars;return{mask:f,maskChar:d,permanents:m,alwaysShowMask:!!e.props.alwaysShowMask,formatChars:g}},e.isInputAutofilled=function(r,f,d,m){var g=e.getInputDOMNode();try{if(g.matches(":-webkit-autofill"))return!0}catch{}return!e.focused||m.end<d.length&&f.end===r.length},e.onChange=function(r){var f=x(x(e)).beforePasteState,d=x(x(e)).previousSelection,m=e.props.beforeMaskedValueChange,g=e.getInputValue(),S=e.value,C=e.getSelection();e.isInputAutofilled(g,C,S,d)&&(S=M(e.maskOptions,""),d={start:0,end:0,length:0}),f&&(d=f.selection,S=f.value,C={start:d.start+g.length,end:d.start+g.length,length:0},g=S.slice(0,d.start)+g+S.slice(d.end),e.beforePasteState=null);var D=De(e.maskOptions,g,C,S,d),L=D.enteredString,E=D.selection,P=D.value;if(w(m)){var N=m({value:P,selection:E},{value:S,selection:d},L,e.getBeforeMaskedValueChangeConfig());P=N.value,E=N.selection}e.setInputValue(P),w(e.props.onChange)&&e.props.onChange(r),e.isWindowsPhoneBrowser?e.setSelection(E.start,E.end,{deferred:!0}):e.setSelection(E.start,E.end)},e.onFocus=function(r){var f=e.props.beforeMaskedValueChange,d=e.maskOptions,m=d.mask,g=d.prefix;if(e.focused=!0,e.mounted=!0,m){if(e.value)R(e.maskOptions,e.value)<e.maskOptions.mask.length&&e.setCursorToEnd();else{var S=M(e.maskOptions,g),C=M(e.maskOptions,S),D=R(e.maskOptions,C),L=V(e.maskOptions,D),E={start:L,end:L};if(w(f)){var P=f({value:C,selection:E},{value:e.value,selection:null},null,e.getBeforeMaskedValueChangeConfig());C=P.value,E=P.selection}var N=C!==e.getInputValue();N&&e.setInputValue(C),N&&w(e.props.onChange)&&e.props.onChange(r),e.setSelection(E.start,E.end)}e.runSaveSelectionLoop()}w(e.props.onFocus)&&e.props.onFocus(r)},e.onBlur=function(r){var f=e.props.beforeMaskedValueChange,d=e.maskOptions.mask;if(e.stopSaveSelectionLoop(),e.focused=!1,d&&!e.props.alwaysShowMask&&z(e.maskOptions,e.value)){var m="";w(f)&&(m=f({value:m,selection:null},{value:e.value,selection:e.previousSelection},null,e.getBeforeMaskedValueChangeConfig()).value);var g=m!==e.getInputValue();g&&e.setInputValue(m),g&&w(e.props.onChange)&&e.props.onChange(r)}w(e.props.onBlur)&&e.props.onBlur(r)},e.onMouseDown=function(r){if(!e.focused&&document.addEventListener){e.mouseDownX=r.clientX,e.mouseDownY=r.clientY,e.mouseDownTime=new Date().getTime();var f=function d(m){if(document.removeEventListener("mouseup",d),e.focused){var g=Math.abs(m.clientX-e.mouseDownX),S=Math.abs(m.clientY-e.mouseDownY),C=Math.max(g,S),D=new Date().getTime()-e.mouseDownTime;(C<=10&&D<=200||C<=5&&D<=300)&&e.setCursorToEnd()}};document.addEventListener("mouseup",f)}w(e.props.onMouseDown)&&e.props.onMouseDown(r)},e.onPaste=function(r){w(e.props.onPaste)&&e.props.onPaste(r),r.defaultPrevented||(e.beforePasteState={value:e.getInputValue(),selection:e.getSelection()},e.setInputValue(""))},e.handleRef=function(r){e.props.children==null&&w(e.props.inputRef)&&e.props.inputRef(r)};var o=n.mask,c=n.maskChar,h=n.formatChars,l=n.alwaysShowMask,i=n.beforeMaskedValueChange,p=n.defaultValue,v=n.value;e.maskOptions=G(o,c,h),p==null&&(p=""),v==null&&(v=p);var u=A(v);if(e.maskOptions.mask&&(l||u)&&(u=M(e.maskOptions,u),w(i))){var k=n.value;n.value==null&&(k=p),u=i({value:u,selection:null},{value:k=A(k),selection:null},null,e.getBeforeMaskedValueChangeConfig()).value}return e.value=u,e}ge(s,t);var a=s.prototype;return a.componentDidMount=function(){this.mounted=!0,this.getInputDOMNode()&&(this.isWindowsPhoneBrowser=be(),this.maskOptions.mask&&this.getInputValue()!==this.value&&this.setInputValue(this.value))},a.componentDidUpdate=function(){var n=this.previousSelection,e=this.props,o=e.beforeMaskedValueChange,c=e.alwaysShowMask,h=e.mask,l=e.maskChar,i=e.formatChars,p=this.maskOptions,v=c||this.isFocused(),u=this.props.value!=null,k=u?A(this.props.value):this.value,r=n?n.start:null;if(this.maskOptions=G(h,l,i),this.maskOptions.mask){!p.mask&&this.isFocused()&&this.runSaveSelectionLoop();var f=this.maskOptions.mask&&this.maskOptions.mask!==p.mask;if(p.mask||u||(k=this.getInputValue()),(f||this.maskOptions.mask&&(k||v))&&(k=M(this.maskOptions,k)),f){var d=R(this.maskOptions,k);(r===null||d<r)&&(r=Q(this.maskOptions,k)?d:V(this.maskOptions,d))}!this.maskOptions.mask||!z(this.maskOptions,k)||v||u&&this.props.value||(k="");var m={start:r,end:r};if(w(o)){var g=o({value:k,selection:m},{value:this.value,selection:this.previousSelection},null,this.getBeforeMaskedValueChangeConfig());k=g.value,m=g.selection}this.value=k;var S=this.getInputValue()!==this.value;S?(this.setInputValue(this.value),this.forceUpdate()):f&&this.forceUpdate();var C=!1;m.start!=null&&m.end!=null&&(C=!n||n.start!==m.start||n.end!==m.end),(C||S)&&this.setSelection(m.start,m.end)}else p.mask&&(this.stopSaveSelectionLoop(),this.forceUpdate())},a.componentWillUnmount=function(){this.mounted=!1,this.selectionDeferId!==null&&B(this.selectionDeferId),this.stopSaveSelectionLoop()},a.render=function(){var n,e=this.props,o=(e.mask,e.alwaysShowMask,e.maskChar,e.formatChars,e.inputRef,e.beforeMaskedValueChange,e.children),c=ke(e,["mask","alwaysShowMask","maskChar","formatChars","inputRef","beforeMaskedValueChange","children"]);if(o){w(o)||W(!1);var h=["onChange","onPaste","onMouseDown","onFocus","onBlur","value","disabled","readOnly"],l=$({},c);h.forEach(function(p){return delete l[p]}),n=o(l),h.filter(function(p){return n.props[p]!=null&&n.props[p]!==c[p]}).length&&W(!1)}else n=T.createElement("input",$({ref:this.handleRef},c));var i={onFocus:this.onFocus,onBlur:this.onBlur};return this.maskOptions.mask&&(c.disabled||c.readOnly||(i.onChange=this.onChange,i.onPaste=this.onPaste,i.onMouseDown=this.onMouseDown),c.value!=null&&(i.value=this.value)),n=T.cloneElement(n,i)},s}(T.Component),xe=Pe;K.exports=xe;var Ne=K.exports;const Le=ne(Ne);export{Le as I,he as S};
