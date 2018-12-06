// Type definitions for fpc 2.2.x
// Project: https://github.com/emilianobovetti/fpc
// Definitions by: Emiliano Bovetti <https://github.com/emilianobovetti>

export function id<T>(val: T): T;

export function not<A>(fn: (a: A) => boolean): (a: A) => boolean;
export function not<A, B>(fn: (a: A, b: B) => boolean): (a: A, b: B) => boolean;
export function not<A, B, C>(fn: (a: A, b: B, c: C) => boolean): (a: A, b: B, c: C) => boolean;

export function flip<A, B, C>(fn: (a: A, b: B) => C): (b: B, a: A) => C;
export function flip<A, B, C, D>(fn: (a: A, b: B, c: C) => D): (c: C, b: B, a: A) => D;

export function failWith(err: Error): never;

export function unbox(n: Number): number;
export function unbox(s: String): string;
export function unbox(s: Symbol): symbol;
export function unbox(b: Boolean): boolean;
export function unbox<T>(val: T): T;

export function typeOf(val: any): string;

export function prop(str: string, idx: number): string | undefined;
export function prop(val: any, prop: string | number): any;

export function pair<A, B>(a: A, b: B): [ A, B ];

export function first<A, B>(pair: [ A, B ]): A;
export function first(str: string): string | undefined;
export function first<T>(arr: Array<T>): T | undefined;

export function second<A, B>(pair: [ A, B ]): B;
export function second(str: string): string | undefined;
export function second<T>(arr: Array<T>): T | undefined;

export function last(str: string): string | undefined;
export function last<T>(arr: Array<T>): T | undefined;

export function slice(str: string, begin?: number, end?: number): Array<string>;
export function slice<T>(arr: Array<T>, begin?: number, end?: number): Array<T>;

export function unshift(str: string, fst: string): Array<string>;
export function unshift<T>(arr: Array<T>, fst: T): Array<T>;

export function reverse(str: string): Array<string>;
export function reverse<T>(arr: Array<T>): Array<T>;

export function reduce<T>(str: string, fn: (acc: T, char: string) => T, init: T): T;
export function reduce<V, T>(arr: Array<V>, fn: (acc: T, val: V) => T, init: T): T;

export function map<T>(str: string, fn: (char: string) => T): Array<T>;
export function map<V, T>(arr: Array<V>, fn: (elem: V) => T): Array<T>;

export function filter(str: string, fn: (char: string) => boolean): Array<string>;
export function filter<T>(arr: Array<T>, fn: (elem: T) => boolean): Array<T>;

export function forEach(str: string, fn: (char: string) => void): string;
export function forEach<T>(arr: Array<T>, fn: (elem: T) => void): Array<T>;

export namespace is {
    export function num(val: any): boolean;
    export function int(val: any): boolean;
    export function str(val: any): boolean;
    export function sym(val: any): boolean;
    export function obj(val: any): boolean;
    export function fun(val: any): boolean;
    export function bool(val: any): boolean;
    export function iter(val: any): boolean;
    export function array(val: any): boolean;

    export namespace array {
        export function like(val: any): boolean;
    }
}

export namespace is {
    export function num(val: any): number;
    export function int(val: any): number;
    export function str(val: any): string;
    export function sym(val: any): symbol;
    export function obj(val: any): object;
    export function fun(val: any): Function;
    export function bool(val: any): boolean;
    export function iter(val: any): any[] | string;
    export function array(val: any): any[];

    export namespace array {
        export function like(val: any): object;
    }
}


export function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C;
export function curry<A, B, C, D>(fn: (a: A, b: B, c: C) => D): (a: A) => (b: B) => (c: C) => D;

export function curry2(fn: Function): (any) => (any) => any;

export function sum(arr: Array<number>): number;
export function sum(a: number, b: number): number;
export function sum(a: number, b: number, c: number): number;

export function cat(arr: Array<string | number>): string;
export function cat(a: string | number, b: string | number): string;
export function cat(a: string | number, b: string | number, c: string | number): string;

export function bound(n: number, min: number, max: number): number;

export function call(val: object | string, method: string, arg1?: any, arg2?: any, arg3?: any): any;

export function pass<A>(fst: A, fn: (fst: A) => any): A;
export function pass<A, B>(fst: A, fn: (fst: A, snd: B) => any, snd: B): A;
export function pass<A, B, C>(fst: A, fn: (fst: A, snd: B, trd: C) => any, snd: B, trd: C): A;

interface Fn1<A, B> {
    (a: A): B;

    ply(a: A): B;

    with<C>(fn: (b: B) => C): Fn1<A, C>;
    with<C, D>(fn: (b: B, c: C) => D, c: C): Fn1<A, D>;
    with<C, D, E>(fn: (b: B, c: C, d: D) => E, c: C, d: D): Fn1<A, E>;
    with<C, D, E, F>(fn: (b: B, c: C, d: D, e: E) => F, c: C, d: D, e: E): Fn1<A, F>;

    and<C>(fn: (b: B) => C): Fn1<A, C>;
    and<C, D>(fn: (b: B, c: C) => D, c: C): Fn1<A, D>;
    and<C, D, E>(fn: (b: B, c: C, d: D) => E, c: C, d: D): Fn1<A, E>;
    and<C, D, E, F>(fn: (b: B, c: C, d: D, e: E) => F, c: C, d: D, e: E): Fn1<A, F>;
}

interface Fn2<A, B, C> {
    (a: A, b: B): C;

    ply(a: A, b: B): C;

    with<D>(fn: (c: C) => D): Fn2<A, B, D>;
    with<D, E>(fn: (c: C, d: D) => E, d: D): Fn2<A, B, E>;
    with<D, E, F>(fn: (c: C, d: D, e: E) => F, d: D, e: E): Fn2<A, B, F>;
    with<D, E, F, G>(fn: (c: C, d: D, e: E, f: F) => G, d: D, e: E, f: F): Fn2<A, B, G>;

    and<D>(fn: (c: C) => D): Fn2<A, B, D>;
    and<D, E>(fn: (c: C, d: D) => E, d: D): Fn2<A, B, E>;
    and<D, E, F>(fn: (c: C, d: D, e: E) => F, d: D, e: E): Fn2<A, B, F>;
    and<D, E, F, G>(fn: (c: C, d: D, e: E, f: F) => G, d: D, e: E, f: F): Fn2<A, B, G>;
}

interface Fn3<A, B, C, D> {
    (a: A, b: B, c: C): D;

    ply(a: A, b: B, c: C): D;

    with<E>(fn: (d: D) => E): Fn3<A, B, C, E>;
    with<E, F>(fn: (d: D, e: E) => F, e: E): Fn3<A, B, C, F>;
    with<E, F, G>(fn: (d: D, e: E, f: F) => G, e: E, f: F): Fn3<A, B, C, G>;
    with<E, F, G, H>(fn: (d: D, e: E, f: F, g: G) => H, e: E, f: F, g: G): Fn3<A, B, C, H>;

    and<E>(fn: (d: D) => E): Fn3<A, B, C, E>;
    and<E, F>(fn: (d: D, e: E) => F, e: E): Fn3<A, B, C, F>;
    and<E, F, G>(fn: (d: D, e: E, f: F) => G, e: E, f: F): Fn3<A, B, C, G>;
    and<E, F, G, H>(fn: (d: D, e: E, f: F, g: G) => H, e: E, f: F, g: G): Fn3<A, B, C, H>;
}

interface Fn4<A, B, C, D, E> {
    (a: A, b: B, c: C, d: D): E;

    ply(a: A, b: B, c: C, d: D): E;

    with<F>(fn: (e: E) => F): Fn4<A, B, C, D, F>;
    with<F, G>(fn: (e: E, f: F) => G, f: F): Fn4<A, B, C, D, G>;
    with<F, G, H>(fn: (e: E, f: F, g: G) => H, f: F, g: G): Fn4<A, B, C, D, H>;
    with<F, G, H, I>(fn: (e: E, f: F, g: G, h: H) => I, f: F, g: G, h: H): Fn4<A, B, C, D, I>;

    and<F>(fn: (e: E) => F): Fn4<A, B, C, D, F>;
    and<F, G>(fn: (e: E, f: F) => G, f: F): Fn4<A, B, C, D, G>;
    and<F, G, H>(fn: (e: E, f: F, g: G) => H, f: F, g: G): Fn4<A, B, C, D, H>;
    and<F, G, H, I>(fn: (e: E, f: F, g: G, h: H) => I, f: F, g: G, h: H): Fn4<A, B, C, D, I>;
}

export function compose<A, B>(fn: (a: A) => B): Fn1<A, B>;
export function compose<A, B, C>(fn: (a: A, b: B) => C): Fn2<A, B, C>;
export function compose<A, B, C, D>(fn: (a: A, b: B, c: C) => D): Fn3<A, B, C, D>;
export function compose<A, B, C, D, E>(fn: (a: A, b: B, c: C, d: D) => E): Fn4<A, B, C, D, E>;

interface Pipe<A> {
    result: A;

    into<B>(fn: (a: A) => B): Pipe<B>;
    into<B, C>(fn: (a: A, b: B) => C, b: B): Pipe<C>;
    into<B, C, D>(fn: (a: A, b: B, c: C) => D, b: B, c: C): Pipe<D>;
    into<B, C, D, E>(fn: (a: A, b: B, c: C, d: D) => E, b: B, c: C, d: D): Pipe<E>;

    and<B>(fn: (a: A) => B): Pipe<B>;
    and<B, C>(fn: (a: A, b: B) => C, b: B): Pipe<C>;
    and<B, C, D>(fn: (a: A, b: B, c: C) => D, b: B, c: C): Pipe<D>;
    and<B, C, D, E>(fn: (a: A, b: B, c: C, d: D) => E, b: B, c: C, d: D): Pipe<E>;
}

export function pipe<T>(val: T): Pipe<T>;

export function log<T>(val: T, arg1?: any, arg2?: any, arg3?: any): T;

export function show<T>(val: T, arg1?: any, arg2?: any, arg3?: any): T;

export interface Maybe<T> {
    readonly isEmpty: boolean;

    readonly nonEmpty: boolean;

    filter(fn: (val: T) => boolean): Maybe<T>;

    map<V>(fn: (val: T) => Maybe<V>): Maybe<V>;
    map<V>(fn: (val: T) => V): Maybe<V>;

    forEach(fn: (val: T) => void): Maybe<T>;

    get(): T;

    orElse(fn: () => T): Maybe<T>;
    orElse(val: T): Maybe<T>;

    getOrElse(fn: () => T): T;
    getOrElse(val: T): T;

    getOrThrow(err: Error): T;

    toString(): string;
}

export function Just<T>(val: T): Maybe<T>;

export const Nothing: Maybe<never>;

export function Maybe<T>(val: Maybe<T>): Maybe<T>;
export function Maybe<T>(val: T): Maybe<T>;

export namespace Maybe {
    export function isInstance(val: any): boolean;

    export function str(val: any): Maybe<string>;

    export function num(val: any): Maybe<number>;

    export function obj(val: any): Maybe<object>;
}
