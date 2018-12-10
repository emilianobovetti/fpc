!function(r,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.fpc=t():r.fpc=t()}(this,function(){return function(r){var t={};function n(e){if(t[e])return t[e].exports;var o=t[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=r,n.c=t,n.d=function(r,t,e){n.o(r,t)||Object.defineProperty(r,t,{enumerable:!0,get:e})},n.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},n.t=function(r,t){if(1&t&&(r=n(r)),8&t)return r;if(4&t&&"object"==typeof r&&r&&r.__esModule)return r;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:r}),2&t&&"string"!=typeof r)for(var o in r)n.d(e,o,function(t){return r[t]}.bind(null,o));return e},n.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(t,"a",t),t},n.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},n.p="",n(n.s=0)}([function(r,t,n){"use strict";n.r(t);var e=r=>r;var o=r=>(...t)=>!r(...t);var i=r=>(...t)=>r(...t.reverse());const u=(r,t,n=[])=>n.length<t?(...e)=>u(r,t,n.concat(e)):r(...n);var s=u;var a=r=>{const t=(r||{}).valueOf();return"object"!=typeof t&&"function"!=typeof t?t:r};var c=r=>null===r?"null":typeof a(r);var f=(r,t)=>null==r?void 0:r[t];const l=s((r,t)=>"array-like"===r?l.str(t)||l.obj(t)&&l.int(t.length)&&t.length>=0:"iterable"===r?l.fun(f(t,Symbol.iterator)):"integer"===r?l.num(t)&&isFinite(t)&&Math.floor(t)===a(t):"array"===r?Array.isArray(t):c(t)===r,2);l.num=l("number"),l.int=l("integer"),l.str=l("string"),l.sym=l("symbol"),l.obj=l("object"),l.fun=l("function"),l.bool=l("boolean"),l.iter=l("iterable"),l.array=l("array"),l.array.like=l("array-like");var h=l;var d=r=>{throw r&&h.str(r.stack)&&h.str(r.message)?r:new Error(r)};const p=s((r,t)=>h(r,t)?a(t):d(new TypeError(`Expected ${r}, got ${c(t)}`)),2);p.num=p("number"),p.int=p("integer"),p.str=p("string"),p.sym=p("symbol"),p.obj=p("object"),p.fun=p("function"),p.bool=p("boolean"),p.iter=p("iterable"),p.array=p("array"),p.array.like=p("array-like");var y=p;var g=(r,t=r.length)=>h.int(t)&&t>=0?s(r,t):d(new Error("curry() expects a non-negative integer as numArgs"));var v=r=>s(r,2);var m=(r,...t)=>[].slice.call(y.array.like(r),...t);var b=(r,...t)=>(h.fun(r.reduce)?r:m(r)).reduce(...t);var E=r=>y.array.like(r)[0];var j=(...r)=>b(r.length>1?r:E(r),(r,t)=>r+t);var O=(r,...t)=>(h.fun(r.map)?r:m(r)).map(...t);var w=(...r)=>j(O(r.length>1?r:E(r),String));var k=(r,t,n)=>Math.max(t,Math.min(n,r));var x=(r,t,...n)=>y.fun(f(r,t)).apply(r,n);var S=(r,t,...n)=>(n.unshift(r),y.fun(t)(...n),r);var M=(r,t)=>S(m(r),x,"unshift",t);const T=(r,...t)=>{y.fun(r);const n=(...n)=>r(...n.concat(t));return n.with=((r,...t)=>(y.fun(r),T((...e)=>r(...M(t,n(...e)))))),n.and=n.with,n.ply=((...r)=>n(...r)),n};var _=T;const N=(...r)=>{const t={};return t.result=r.length>0?E(r):d(new Error("pipe() cannot be called without an argument")),t.into=((t,...n)=>(y.fun(t),N(t(...r.concat(n))))),t.and=t.into,t};var P=N;var A=(r,t)=>[r,t];var z=r=>y.array.like(r)[1];var F=r=>y.array.like(r)[r.length-1];var J=r=>m(r).reverse();var $=(r,...t)=>(h.fun(r.filter)?r:m(r)).filter(...t);var I=(r,...t)=>((h.fun(r.forEach)?r:m(r)).forEach(...t),r);var R=h.obj(console)?(...r)=>(console.log(...r),E(r)):e;var W=(r,...t)=>(t.push(r),R(...t),r);class q{getOrThrow(r){return this.get(r)}filter(r){return this.isEmpty?this:r(this.get())?this:C}map(r){return this.isEmpty?this:D(r(this.get()))}forEach(r){return this.nonEmpty&&r(this.get()),this}getOrElse(r){return this.nonEmpty?this.get():h.fun(r)?r():r}orElse(r){return this.isEmpty?D(this.getOrElse(r)):this}toString(){return this.isEmpty?"":String(this.get())}}const B=r=>{const t=new q;return t.isEmpty=!1,t.nonEmpty=!0,t.get=(()=>r),Object.freeze(t)},C=new q;C.isEmpty=!0,C.nonEmpty=!1,C.get=(r=>d(r||new Error("Trying to get value of Nothing"))),Object.freeze(C);const D=r=>null==r?C:r instanceof q?r:B(r);D.Just=B,D.Nothing=C,D.isInstance=(r=>r instanceof q),D.of=(r=>D(r)),D.str=(r=>{const t=a(r);return h.str(t)&&""!==t?B(t):C}),D.num=(r=>{const t=a(r);return h.num(t)&&!isNaN(t)&&isFinite(t)?B(t):C}),D.obj=(r=>h.obj(r)?D(r):C);class G{constructor(r={}){Object.assign(this,r)}map(r){return this.isError?this:H.of(r(this.get()))}mapError(r){return this.isOk?this:K(r(this.getError()))}forEach(r){return this.isOk&&r(this.get()),this}forEachError(r){return this.isError&&r(this.getError()),this}merge(r=e,t=e){const n=this.mapError(r).map(t);return n.isOk?n.get():n.getError()}}G.of=((r,...t)=>{try{return H.of(r(...t))}catch(r){return K(r)}});const H=function(r){return this instanceof H?(this.get=(()=>r),this):new H(r)};H.prototype=new G({isOk:!0,isError:!1,getError:()=>d(new Error("Trying to get error of Ok"))}),H.of=(r=>r instanceof G?r:H(r));const K=function(r){return this instanceof K?(this.getError=(()=>r),this):new K(r)};K.prototype=new G({isOk:!1,isError:!0,get:()=>d(new Error("Trying to get value of Err"))}),n.d(t,"id",function(){return e}),n.d(t,"not",function(){return o}),n.d(t,"flip",function(){return i}),n.d(t,"failWith",function(){return d}),n.d(t,"unbox",function(){return a}),n.d(t,"typeOf",function(){return c}),n.d(t,"prop",function(){return f}),n.d(t,"is",function(){return h}),n.d(t,"expect",function(){return y}),n.d(t,"curry",function(){return g}),n.d(t,"curry2",function(){return v}),n.d(t,"sum",function(){return j}),n.d(t,"cat",function(){return w}),n.d(t,"bound",function(){return k}),n.d(t,"call",function(){return x}),n.d(t,"pass",function(){return S}),n.d(t,"compose",function(){return _}),n.d(t,"pipe",function(){return P}),n.d(t,"pair",function(){return A}),n.d(t,"first",function(){return E}),n.d(t,"second",function(){return z}),n.d(t,"last",function(){return F}),n.d(t,"slice",function(){return m}),n.d(t,"unshift",function(){return M}),n.d(t,"reverse",function(){return J}),n.d(t,"reduce",function(){return b}),n.d(t,"map",function(){return O}),n.d(t,"filter",function(){return $}),n.d(t,"forEach",function(){return I}),n.d(t,"log",function(){return R}),n.d(t,"show",function(){return W}),n.d(t,"Just",function(){return B}),n.d(t,"Nothing",function(){return C}),n.d(t,"Maybe",function(){return D}),n.d(t,"Ok",function(){return H}),n.d(t,"Err",function(){return K}),n.d(t,"Result",function(){return G})}])});