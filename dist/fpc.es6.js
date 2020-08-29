const t=t=>null===t?"null":"number"!=typeof t?typeof t:isNaN(t)?"NaN":isFinite(t)?"number":"infinity",e=(e,r)=>{throw new TypeError(`Expected ${e}, got ${t(r)}`)},r=t=>Array.isArray(t),n=t=>r(t)?t:e("array",t),o=t=>"boolean"==typeof t,i=t=>o(t)?t:e("boolean",t),s=t=>"function"==typeof t,l=t=>s(t)?t:e("function",t),h=t=>Number.isSafeInteger(t),a=t=>h(t)?t:e("integer",t),c=t=>null!=t&&"function"==typeof t[Symbol.iterator],u=t=>c(t)?t:e("iterable",t),f=t=>"number"==typeof t&&isFinite(t),y=t=>f(t)?t:e("number",t),p=t=>null!=t&&"object"==typeof t||"function"==typeof t,g=t=>p(t)?t:e("object",t),w=t=>null!=t&&"function"==typeof t.then,m=t=>w(t)?t:e("promise",t),E=t=>"string"==typeof t,d=t=>E(t)?t:e("string",t),b=t=>"symbol"==typeof t,v=t=>b(t)?t:e("symbol",t),k=(t,e,r)=>Math.max(e,Math.min(r,t)),x=(t,e)=>null==t?void 0:t[e],O=(t,e,...r)=>l(x(t,e)).apply(t,r),T=(t,e,r=[])=>r.length<e?(...n)=>T(t,e,r.concat(n)):t(...r),S=t=>{throw t&&E(t.stack)&&E(t.message)?t:new Error(t)},N=(t,e=t.length)=>h(e)&&e>0?T(l(t),e):S(new TypeError("Expected positive integer, got "+e)),A=()=>{let t,e;return{promise:new Promise((r,n)=>(t=r,e=n)),resolve:t,reject:e}},j=(t,e=0)=>(l(t),new Promise((r,n)=>setTimeout(()=>t(r,n),e))),M=([t])=>t,P=t=>(l(t),(...e)=>t(...e.reverse())),F={}.hasOwnProperty,I=(t,e)=>null!=t&&F.call(t,e),$=t=>t,L=([...t])=>t[t.length-1],q={},z=(t,...e)=>{l(t);let r=q;const n=()=>r===q?n.update():r;return n.update=()=>r=t(...e),n},B="object"==typeof console?(...t)=>(console.log(...t),t[0]):$,C=t=>(l(t),(...e)=>!t(...e)),D=(t,e,r=1)=>Array(1+Math.floor((e-t)/r)).fill(0).map((e,n)=>n*r+t),G=([t,e])=>e;function H(t){for(const e in t)this[e]=t[e]}H.prototype={get(t){throw t instanceof Error?t:new Error("Trying to get value of Nothing")},getOrThrow(t){return this.get(t)},filter(t){return this.isEmpty||t(this.get())?this:J},map(t){return this.isEmpty?this:Q(t(this.get()))},forEach(t){return this.isEmpty||t(this.get()),this},getOrElse(t){return this.nonEmpty?this.get():s(t)?t():t},orElse(t){return this.isEmpty?Q(this.getOrElse(t)):this},toString(){return this.isEmpty?"":String(this.get())},*[Symbol.iterator](){this.nonEmpty&&(yield this.get())}};const J=new H({isEmpty:!0,nonEmpty:!1});function K(t){if(!(this instanceof K))return new K(t);this.get=()=>t}K.prototype=new H({isEmpty:!1,nonEmpty:!0});const Q=t=>null==t?J:t instanceof Q?t:new K(t);Q.prototype=H.prototype;const R=t=>r(t)?new K(t):J,U=t=>o(t)?new K(t):J,V=t=>s(t)?new K(t):J,W=t=>h(t)?new K(t):J,X=t=>c(t)?new K(t):J,Y=t=>f(t)?new K(t):J,Z=t=>p(t)?new K(t):J,_=t=>w(t)?new K(t):J,tt=t=>E(t)?new K(t):J,et=t=>b(t)?new K(t):J,rt=t=>t;function nt(t){for(const e in t)this[e]=t[e]}nt.prototype={length:2,map(t){return this.isErr?this:ot(t,this.get())},mapErr(t){return this.isOk?this:new st(t(this.getErr()))},forEach(t){return this.isErr||t(this.get()),this},forEachErr(t){return this.isOk||t(this.getErr()),this},merge(t=rt,e=rt){const r=this.mapErr(e).map(t);return r.isOk?r.get():r.getErr()},*[Symbol.iterator](){yield this.isOk?this.get():void 0,yield this.isErr?this.getErr():void 0}};const ot=(t,...e)=>{l(t);try{const r=t(...e);return r instanceof ot?r:new it(r)}catch(t){return t instanceof st?t:new st(t)}};function it(t){if(!(this instanceof it))return new it(t);this[0]=t,this.get=()=>t}function st(t){if(!(this instanceof st))return new st(t);this[1]=t,this.getErr=()=>t}ot.promise=t=>m(t).then(it,st),ot.prototype=nt.prototype,it.prototype=new nt({isOk:!0,isErr:!1,getErr:()=>{throw new Error("Trying to get error of Ok")}}),st.prototype=new nt({isOk:!1,isErr:!0,get:()=>{throw new Error("Trying to get value of Err")}});const lt={},ht=t=>t[Symbol.iterator]();function*at(t,e){const r=ht(t);for(let n=0;;n++){const{done:o,value:i}=r.next();if(o)break;e(i,n,t)&&(yield i)}}function*ct(t,e){const r=ht(t);for(let n=0;;n++){const{done:o,value:i}=r.next();if(o)break;e(i,n,t),yield i}}function*ut(t,e){const r=ht(t);for(let n=0;;n++){const{done:o,value:i}=r.next();if(o)break;yield e(i,n,t)}}function*ft(t,e,r){const n=ht(t);for(let t=0;;t++){const{done:o,value:i}=n.next();if(o||t>=r)break;t>=e&&(yield i)}}class yt{constructor(t,...e){l(t),this[Symbol.iterator]=e.length>0?()=>t(...e):t}filter(t){return new yt(at,this,l(t))}forEach(t){return new yt(ct,this,l(t))}map(t){return new yt(ut,this,l(t))}reduce(t,...e){const[r]=e.length>0?e:[lt];return((t,e,r)=>{const n=ht(t);let o,i=0;if(r===lt){const{done:t,value:e}=n.next();if(i++,t)throw new TypeError("reduce of empty stream with no initial value");o=e}else o=r;for(;;i++){const{done:r,value:s}=n.next();if(r)break;o=e(o,s,i,t)}return o})(this,l(t),r)}slice(t=0,e=1/0){if(a(t),e!==1/0&&a(e),t<0||e<0)throw new TypeError("Negative indexes cannot be used to slice streams");return new yt(ft,this,t,e)}consume(){return(t=>{const e=ht(t);for(;;){const{done:t}=e.next();if(t)break}})(this)}toArray(){return Array.from(this)}}function*pt(t){for(let e=0,r=t.length;e<r;e++)yield t[e]}function*gt(t,e){let r=0,n=null==e?t(e,r++):e;for(;null!=n;)yield n,n=t(n,r++)}function*wt(t,e,r){let n=t;for(;n<=e;)yield n,n+=r}var mt={fromArrayLike:t=>new yt(pt,(t=>{if(a(g(t).length)<0)throw new TypeError("Expected non negative length, got "+t.length);return t})(t)),fromIterable:t=>(u(t),new yt(()=>ht(t))),iterate:(t,e)=>new yt(gt,l(t),e),range:(t=0,e=1/0,r=1)=>new yt(wt,t,e,r)};export{st as Err,K as Just,Q as Maybe,J as Nothing,it as Ok,ot as Result,mt as Stream,k as bound,O as call,N as curry,A as deferred,j as delay,n as expectArray,i as expectBoolean,l as expectFunction,a as expectInteger,u as expectIterable,y as expectNumber,g as expectObject,m as expectPromise,d as expectString,v as expectSymbol,S as failWith,M as first,P as flip,I as hasOwnProperty,$ as identity,r as isArray,o as isBoolean,s as isFunction,h as isInteger,c as isIterable,f as isNumber,p as isObject,w as isPromise,E as isString,b as isSymbol,L as last,z as lazy,B as log,R as maybeArray,U as maybeBoolean,V as maybeFunction,W as maybeInteger,X as maybeIterable,Y as maybeNumber,Z as maybeObject,_ as maybePromise,tt as maybeString,et as maybeSymbol,C as negate,x as prop,D as range,G as second,t as typeOf};
