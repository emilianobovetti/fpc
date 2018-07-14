// Type definitions for fpc 0.1.x
// Project: https://github.com/emilianobovetti/fpc
// Definitions by: Emiliano Bovetti <https://github.com/emilianobovetti>

interface Comp1<A, B> {
    (a: A): B;

    ply(a: A): B;

    with<C>(fn: (b: B) => C): Comp1<A, C>;
    with<C, D>(fn: (b: B, c: C) => D, c: C): Comp1<A, D>;

    and<C>(fn: (b: B) => C): Comp1<A, C>;
    and<C, D>(fn: (b: B, c: C) => D, c: C): Comp1<A, D>;
}

interface Comp2<A, B, C> {
    (a: A, b: B): C;

    ply(a: A, b: B): C;

    with<D>(fn: (c: C) => D): Comp2<A, B, D>;
    with<D, E>(fn: (c: C, d: D) => E, d: D): Comp2<A, B, E>;

    and<D>(fn: (c: C) => D): Comp2<A, B, D>;
    and<D, E>(fn: (c : C, d: D) => E, d: D): Comp2<A, B, E>;
}

export function compose<A, B>(fn: (a: A) => B): Comp1<A, B>;
export function compose<A, B, C>(fn: (a: A, b: B) => C): Comp2<A, B, C>;

interface Pipe<A> {
    end: A;

    into<B>(fn: (a: A) => B): Pipe<B>;
    into<B, C>(fn: (a: A, b: B) => C, b: B): Pipe<C>;

    then<B>(fn: (a: A) => B): Pipe<B>;
    then<B, C>(fn: (a: A, b: B) => C, b: B): Pipe<C>;
}

export function pipe<T>(val: T): Pipe<T>;

export function id<T>(val: T): T;

export function failWith(err: Error): never;

export function prop(str: string, idx: number): string | undefined;
export function prop(val: any, prop: string | number): any;

export function slice(str: string, begin?: number, end?: number): Array<string>;
export function slice<T>(arr: Array<T>, begin?: number, end?: number): Array<T>;

export function unshift<T>(arr: Array<T>, fst: T): Array<T>;

export function reverse(str: string): string;
export function reverse<T>(arr: Array<T>): Array<T>;

export function reduce<T>(str: string, fn: (acc: T, char: string) => T, init: T): T;
export function reduce<V, T>(arr: Array<V>, fn: (acc: T, val: V) => T, init: T): T;

export function map<T>(str: string, fn: (char: string) => T): Array<T>;
export function map<V, T>(arr: Array<V>, fn: (elem: V) => T): Array<T>;

export function pair<A, B>(a: A, b: B): [ A, B ];

export function first<A, B>(pair: [ A, B ]): A;
export function first(str: string): string | undefined;
export function first<T>(arr: Array<T>): T | undefined;

export function second<A, B>(pair: [ A, B ]): B;
export function second(str: string): string | undefined;
export function second<T>(arr: Array<T>): T | undefined;

export function last(str: string): string | undefined;
export function last<T>(arr: Array<T>): T | undefined;

export function flip<A, B, C>(fn: (a: A, b: B) => C): (b: B, a: A) => C;
export function flip<A, B, C, D>(fn: (a: A, b: B, c: C) => D): (c: C, b: B, a: A) => D;

export function sum(arr: Array<number>): number;
export function sum(a: number, b: number): number;
export function sum(a: number, b: number, c: number): number;

export function cat(arr: Array<string | number>): string;
export function cat(a: string | number, b: string | number): string;
export function cat(a: string | number, b: string | number, c: string | number): string;

export function bound(n: number, min: number, max: number): number;

export function unbox(n: Number): number;
export function unbox(s: String): string;
export function unbox(s: Symbol): symbol;
export function unbox(b: Boolean): boolean;
export function unbox<T>(val: T): T;

export function typeOf(val: any): string;

export const is: {
    num(val: any): boolean,
    str(val: any): boolean,
    sym(val: any): boolean,
    obj(val: any): boolean,
    fun(val: any): boolean,
    bool(val: any): boolean,
    reduceable(val: any): boolean,
};

export const expect: {
    num(val: any): number,
    str(val: any): string,
    sym(val: any): symbol,
    obj(val: any): object,
    fun(val: any): Function,
    bool(val: any): boolean,
    reduceable(val: any): object | string,
};

export function call(val: object | string, method: string, arg1?: any, arg2?: any, arg3?: any): any;

export function pass<A>(fst: A, fn: (fst: A) => any): A;
export function pass<A, B>(fst: A, fn: (fst: A, snd: B) => any, snd: B): A;
export function pass<A, B, C>(fst: A, fn: (fst: A, snd: B, trd: C) => any, snd: B, trd: C): A;

export function log<T>(val: T, arg1?: any, arg2?: any, arg3?: any): T;

export function show<T>(val: T, arg1?: any, arg2?: any, arg3?: any): T;
