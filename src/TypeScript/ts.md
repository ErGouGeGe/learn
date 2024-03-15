// 泽鹏上次分享关于 ts 方面的知识 https://shimo.im/file/m4kML5vz85TmX2qD

// ts 中类型主要包括 1.元组 2.接口(对象，函数，构造器)类型 3.枚举类型 4.字面量类型 5.特殊类型

// ts 中类型类型运算主要包括 1.条件类型 : 2.推导类型 3.联合类型 4.交叉类型 5.映射类型

特殊类型

- **never**  代表不可达，比如函数抛异常的时候，返回值就是 never。
- **void**  代表空，可以是 undefined 或 never。
- **any**  是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
- **unknown**  是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。

```ts
extends 的不同用处
// extends ? :    条件类型
// extends  class   类继承
// T extends string  类型约束
// infer  推导类型
// | 联合类型
// & 交叉类型
// key of 映射类型
type MapType<T> = { [Key in keyof T]?: T[Key] }
keyof T 是查询索引类型中所有的索引，叫做索引查询
T[Key] 是取索引类型某个索引的值，叫做索引访问
```

//取出 props 类型

```js
type GetRefType<P> = 'ref' extends keyof P ? P extends {ref : infer Value|undefined} ? Value : never : never
type ImplRefType = GetRefType<{name:"ws",ref:'ws'}>
```

类型约束例子

```ts
// function getPv(obj,key){
//         return obj[key]
// }

// function getpv<T>(obj:T,key:any):any{
//     return obj[key]
// }

function getPv<T extends object, Key extends keyof T>(
  obj: T,
  key: Key,
): T[Key] {
  return obj[key];
}

getPv({ a: 1, b: 2 }, 'a');
```

// ts 子类型 父类型

//模式匹配

```ts
type GetReturnType<T> = T extends (...args: unknown[]) => infer ReturnType
  ? ReturnType
  : never;
type Type = GetReturnType<() => string>;
```

//递归

```ts
type GR<T extends string> = T  extends `${infer A}${' '}` ? GR<A> : T
type GL<T extends string> = T  extends `${' '}${infer A}` ? GL<A> : T
type A = GL<GR<'    ws    '>>

type obj = {
    a: {
        b: {
            c: {
                f: () => 'dong',
                d: {
                    e: {
                        guang: string
                    }
                }
            }
        }
    }
}
type DeepReadOnly<T extends Record<string,any>> = {
     readonly [key in keyof T] :T[key] extends object ? T[key] extends Function ? T[key] : DeepReadOnly<T[key]> :T[key] }

type DRR = DeepReadOnly<obj>
```

//重新构造

```ts
type UppercaseKey<T extends object> = {

    [Key in keyof T as Uppercase<Key & string>] : T[Key]
}
// key in 'NAME'|'AGE'

type GG = UppercaseKey<{name:string;age:number}>

type Change<T> = {
    [Key in keyof T as `${Key & number}` ]:[T[Key],T[Key]]
}

type v = Change<{1:1,3:2}>

type AppendArgument<T,U> = T extends (...args:infer Args)=>infer A ? (...args:[...Args,U])=> A:never
type AppendArgumentResult = AppendArgument<(name:string)=>string,number>

type ToRe<T> = {
   -readonly [key in keyof T] -?: T[key]
}

type Ad = ToRe<{
   readonly a?:string;
   readonly b?:number
}>

interface P {
    name:string;
    age:number;
    hobby:string[];
}
type Filter<T extends Record<string,any>,U> = {
    [key in keyof T as U extends T[key] ? key :never]:T[key]//此处包含联合类型的特性
}
type FilterRt = Filter<P,string|number>

type JJ = string|number extends string ? true :false
```

//联合类型

联合类型比较特殊 会有分布式条件类型`A extends A ? [B] extends [A] ? false : true : never`

**当 A 是联合类型时：**

- **A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义。**
- **A extends A 和 [A] extends [A] 是不同的处理，前者是单个类型和整个类型做判断，后者两边都是整个联合类型，因为只有 extends 左边直接是类型参数才会触发分布式条件类型。**

至于为什么要用[A]这总形式 其实在 ts 被解析的时候底层会直接传入是不是 T(也就是联合类型) 如果是就按照分布式情况处理 如果不是就正常处理所以 以下都可以防止触发分布式条件类型

```ts
A extends A ? [B] extends [A] ? false : true : never
A extends A ? {ws:B} extends {ws:A} ? false : true : never
A extends A ? (()=>B) extends (()=>B)  ? false : true : never
```

```ts
type UppercaseA<T extends string> = T extends 'a' ? Uppercase<T> : T;
type UppercaseAR = UppercaseA<'a' | 'b' | 'c'>;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionR = IsUnion<'a' | 'b'>;

//这个可以验证分布式条件类型
type TestUnion<A, B = A> = [B] extends [B] ? { a: A; b: B } : never;
type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;
```

// 内置类型

```ts
// Parameters
// type Parameters<T extends (...args: any) => any>
//     = T extends (...args: infer P) => any
//         ? P
//         : never;
type TestParameters = Parameters<(name: string, age: never) => void>;
//Partial Readonly Required

//Pick
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };
type TestPick = Pick<{ name: 'ws'; age: 10; ddd: '12' }, 'name' | 'age'>;

//Record
// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };
type TestRecord = Record<'a' | 'b', string>;
type TestRecord2 = Record<string, any>;

//Exclude
// type Exclude<T, U> = T extends U ? never : T;
type TestExclude = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;

//Extract
// type Extract<T, U> = T extends U ? T : never;
type TestExtract = Extract<'a' | 'b' | 'c', 'a' | 'b'>;

//Omit
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type TestOmit = Omit<{ name: 'ws'; age: 10; ddd: '12' }, 'name' | 'age'>;
```

//协变 逆变
//协变

```ts
interface Person {
  name: string;
}

interface Ws {
  name: string;
  age: number;
}

let person: Person = {
  name: '',
};
let wangs: Ws = {
  name: 'ws',
  age: 20,
};
person = wangs;
// wangs = person;
```

//逆变

```ts
let printHobbies: (ws: Ws) => void;

printHobbies = ws => {
  console.log(ws.age);
};

let printName: (person: Person) => void;

printName = person => {
  console.log(person.name);
};
// printName = printHobbies
printHobbies = printName;
// printHobbies()

type Func = (a: string) => '1';

const func: Func = (a: 'hello') => string;

// type UnionToIntersection<U> =
//     (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
//         ? R
//         : never

// type UnionToIntersectionTest = UnionToIntersection<{ws:1}|{wsss:2}>
```

extends

// type ad = 'a'&'b' extends 'a' ? true :false;
// type add = 'a' extends 'a'|'b' ? true :false
type addf= ['a'|'b'] extends ['a'] ? true :false
type addd= 'a'|'b' extends 'a' ? true :false

// type l = {
// name:string,
// }
type DD = {a:'1111',b:'2'} extends {} ? true :false

// 子类型一定比父类型更具体

// type fff = ['a','b','c'][number]
// type GG = fff extends 'a'|'b'|'c' ? true :false
// type SSS = {1:1,2:2,3:3} extends {1:1} ?true :false
// type EE = {a:2}
