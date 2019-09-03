!function(r,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.fpc=t():r.fpc=t()}(this,function(){return function(r){var t={};function n(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=r,n.c=t,n.d=function(r,t,e){n.o(r,t)||Object.defineProperty(r,t,{enumerable:!0,get:e})},n.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},n.t=function(r,t){if(1&t&&(r=n(r)),8&t)return r;if(4&t&&"object"==typeof r&&r&&r.__esModule)return r;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:r}),2&t&&"string"!=typeof r)for(var o in r)n.d(e,o,function(t){return r[t]}.bind(null,o));return e},n.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(t,"a",t),t},n.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},n.p="",n(n.s=0)}([function(r,t,n){"use strict";n.r(t);var e=r=>r;var o=r=>(...t)=>!r(...t);var i=r=>(...t)=>r(...t.reverse());const u=(r,t,n=[])=>n.length<t?(...e)=>u(r,t,n.concat(e)):r(...n);var a=u;const s=void 0===BigInt?Number:BigInt;var c=r=>{return r instanceof String||r instanceof Number||r instanceof s||r instanceof Boolean||r instanceof Symbol?r.valueOf():r};var f=r=>{const t=c(r);if(null===t)return"null";if("number"==typeof t){if(isNaN(t))return"NaN";if(!isFinite(t))return"infinity"}return typeof t};var l=(r,t)=>null==r?void 0:r[t];const p={}.hasOwnProperty;var y=(r,t)=>null!=r&&p.call(r,t);const h=a((r,t)=>{if("function"==typeof r)return t instanceof r;if("string"!=typeof r)throw new TypeError(`Invalid parameter type: ${f(r)}`);if("array-like"===r){const r=y(t,"length")?t.length:void 0;return h.int(r)&&r>=0&&(0===r||y(t,0))}return"iterable"===r?h.fun(l(t,Symbol.iterator)):"integer"===r?h.num(t)&&Math.floor(t)===c(t):"array"===r?Array.isArray(t):f(t)===r},2);h.num=h("number"),h.int=h("integer"),h.str=h("string"),h.sym=h("symbol"),h.obj=h("object"),h.fun=h("function"),h.bool=h("boolean"),h.iter=h("iterable"),h.array=h("array"),h.array.like=h("array-like");var d=h;var g=r=>{throw r&&d.str(r.stack)&&d.str(r.message)?r:new Error(r)};var v=(r,t)=>[r,t];const m=a((r,t)=>d(r,t)?c(t):g(new TypeError(`Expected ${(r=>"function"==typeof r?r.name:r)(r)}, got ${f(t)}`)),2);m.num=m("number"),m.int=m("integer"),m.str=m("string"),m.sym=m("symbol"),m.obj=m("object"),m.fun=m("function"),m.bool=m("boolean"),m.iter=m("iterable"),m.array=m("array"),m.array.like=m("array-like");var b=m;var E=r=>b.array.like(r)[0];var O=r=>b.array.like(r)[1];var j=r=>b.array.like(r)[r.length-1];var w=(r,...t)=>[].slice.call(b.array.like(r),...t);var k=(r,t,...n)=>(n.unshift(r),b.fun(t)(...n),r);var x=(r,t,...n)=>b.fun(l(r,t)).apply(r,n);var S=(r,t)=>k(w(r),x,"unshift",t);var N=r=>w(r).reverse();var M=(r,t,...n)=>(d.fun(l(r,t))?r:w(r))[t].apply(r,n);var T=(r,...t)=>M(r,"reduce",...t);var P=(r,t)=>M(r,"map",t);var _=(r,t)=>M(r,"filter",t);var I=(r,t)=>k(r,r=>M(r,"forEach",t));var z=(r,t=r.length)=>d.int(t)&&t>=0?a(r,t):g(new Error("curry() expects a non-negative integer as numArgs"));var A=r=>a(r,2);var B=(...r)=>T(r.length>1?r:E(r),(r,t)=>r+t);var $=(...r)=>B(P(r.length>1?r:E(r),String));var J=(r,t,n)=>Math.max(t,Math.min(n,r));var F=Object.create(null);var R=(r,...t)=>{let n=F;const e=()=>n===F?e.update():n;return e.update=()=>n=r(...t),e};const W=(r,...t)=>{b.fun(r);const n=(...n)=>r(...n.concat(t));return n.with=(r,...t)=>(b.fun(r),W((...e)=>r(...S(t,n(...e))))),n.and=n.with,n.ply=(...r)=>n(...r),n};var q=W;const C=(...r)=>{const t={};return t.result=r.length>0?E(r):g(new Error("pipe() cannot be called without an argument")),t.into=(t,...n)=>(b.fun(t),C(t(...r.concat(n)))),t.and=t.into,t};var D=C;var G=d.obj(console)?(...r)=>(console.log(...r),E(r)):e;var H=(r,...t)=>(t.push(r),G(...t),r);const K=r=>null==r?Q:r instanceof K?r:L(r);K.prototype={isEmpty:!0,nonEmpty:!1,get(r){g(r||new Error("Trying to get value of Nothing"))},getOrThrow(r){return this.get(r)},filter(r){return this.isEmpty?this:r(this.get())?this:Q},map(r){return this.isEmpty?this:K(r(this.get()))},forEach(r){return this.nonEmpty&&r(this.get()),this},getOrElse(r){return this.nonEmpty?this.get():d.fun(r)?r():r},orElse(r){return this.isEmpty?K(this.getOrElse(r)):this},toString(){return this.isEmpty?"":String(this.get())}};const L=function(r){return this instanceof L?(this.get=()=>r,Object.freeze(this)):new L(r)};L.prototype=Object.create(K.prototype,{isEmpty:{value:!1},nonEmpty:{value:!0}});const Q=Object.freeze(Object.create(K.prototype));K.Just=L,K.Nothing=Q,K.isInstance=r=>r instanceof K,K.of=r=>K(r),K.str=r=>d.str(r)&&""!=r?L(c(r)):Q,K.num=r=>d.num(r)?L(c(r)):Q,K.obj=r=>d.obj(r)?K(r):Q;class U{constructor(r={}){Object.assign(this,r)}map(r){return this.isError?this:V.of(r(this.get()))}mapError(r){return this.isOk?this:X(r(this.getError()))}forEach(r){return this.isOk&&r(this.get()),this}forEachError(r){return this.isError&&r(this.getError()),this}merge(r=e,t=e){const n=this.mapError(r).map(t);return n.isOk?n.get():n.getError()}}U.of=(r,...t)=>{try{return V.of(r(...t))}catch(r){return X(r)}};const V=function(r){return this instanceof V?(this.get=()=>r,this):new V(r)};V.prototype=new U({isOk:!0,isError:!1,getError:()=>g(new Error("Trying to get error of Ok"))}),V.of=r=>r instanceof U?r:V(r);const X=function(r){return this instanceof X?(this.getError=()=>r,this):new X(r)};X.prototype=new U({isOk:!1,isError:!0,get:()=>g(new Error("Trying to get value of Err"))}),n.d(t,"id",function(){return e}),n.d(t,"not",function(){return o}),n.d(t,"flip",function(){return i}),n.d(t,"failWith",function(){return g}),n.d(t,"unbox",function(){return c}),n.d(t,"typeOf",function(){return f}),n.d(t,"prop",function(){return l}),n.d(t,"hasOwnProperty",function(){return y}),n.d(t,"pair",function(){return v}),n.d(t,"first",function(){return E}),n.d(t,"second",function(){return O}),n.d(t,"last",function(){return j}),n.d(t,"slice",function(){return w}),n.d(t,"unshift",function(){return S}),n.d(t,"reverse",function(){return N}),n.d(t,"reduce",function(){return T}),n.d(t,"map",function(){return P}),n.d(t,"filter",function(){return _}),n.d(t,"forEach",function(){return I}),n.d(t,"is",function(){return d}),n.d(t,"expect",function(){return b}),n.d(t,"curry",function(){return z}),n.d(t,"curry2",function(){return A}),n.d(t,"sum",function(){return B}),n.d(t,"cat",function(){return $}),n.d(t,"bound",function(){return J}),n.d(t,"call",function(){return x}),n.d(t,"pass",function(){return k}),n.d(t,"lazy",function(){return R}),n.d(t,"compose",function(){return q}),n.d(t,"pipe",function(){return D}),n.d(t,"log",function(){return G}),n.d(t,"show",function(){return H}),n.d(t,"Just",function(){return L}),n.d(t,"Nothing",function(){return Q}),n.d(t,"Maybe",function(){return K}),n.d(t,"Ok",function(){return V}),n.d(t,"Err",function(){return X}),n.d(t,"Result",function(){return U})}])});