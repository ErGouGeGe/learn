### 分享根本不常用知识之 Generator

首先[babel 链接](https://www.babeljs.cn/repl#?browsers=&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=FAAhBsFMBcQOwK4FsQF4QAYDcwCQAzBOAY2gEsB7OEAKhAHcBnAc0moAoBKAb1DH4CeZSOAAmdANoBGADQgATAF0c_EAF8-AQ0YCSIQiXJUQrOFxC9ViFOmsgA1CHab6msrFfv2UjJ04r-AHpA-GQ0Jxc3DyjvX04HUKQAsEj3fQoKLmSQACcYBBzqawCNLR09A1JKanwM80t-VNgAInB3SBzNcGaS4D5ncuIneNQAPgs-MGCQUUgAIwRmVhzsppM2LMmQYipGCigAOnAKZnZmpgAuXMhGZrlrfz41Tk3gIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-1%2Cstage-2%2Cstage-3&prettier=true&targets=&version=7.18.12&externalPlugins=&assumptions=%7B%7D)很重要

看这个之前 其实可以先去了解一下 co 库 (以前看这个库我是真心觉得牛皮，代码量还不大)
不想看库的话 请看下面简易版

```js
function isPromise(obj: any) {
  return typeof obj.then === 'function';
}
function isGenerator(obj: any) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function';
}
function isGeneratorFunction(obj: any) {
  const { constructor } = obj;
  if (!constructor) return false;
  if ([constructor.name, constructor.displayName].includes('GeneratorFunction'))
    return true;
  return isGenerator(constructor.prototype);
}
//上面三个是co库原生的校验
export default function co(gen) {
  return new Promise((resolve, _reject) => {
    typeof gen === 'function' && (gen = gen());

    function next(data) {
      const ret = gen.next(data);
      if (ret.done) return resolve(ret.value);
      toPromise(ret.value).then(next);
    }

    function toPromise(obj) {
      if (isPromise(obj)) return obj;
      if (isGeneratorFunction(obj) || isGenerator(obj)) return co(obj);
      // if (other types) {}
      return; // error
    }

    next();
  });
}
```

## Generator 对象

### 一、generator Object

1. 由 Generator 执行后返回，带有 next、return、throw 等原型方法

```js
function* gen() {}
const gObj = gen();
gObj.next();
gObj.return();
```

### 二、Generator

1. 可通过 `function*` 语法来定义，它是 GeneratorFunction 的实例

```js
Object.getPrototypeOf(gen).constructor; // GeneratorFunction {prototype: Generator, ...}
```

### 三、GeneratorFunction

1. 内置函数，但没有直接挂到 window 上，但可以通过实例来获取

```js
const GeneratorFunction = Object.getPrototypeOf(gen).constructor;
```

2. GeneratorFunction 和 `Function` 是一个级别的，可以传参来创建函数，如

```js
const gen = new GeneratorFunction('a', 'yield a * 2');
```

async/await 和 Generator 函数区别

```js
async function a() {}

function* b() {}

// babel 编译后
function asyncGeneratorStep(gen, resolve, reject, _next, ...) {
  // 调用 gen 的 next 或 throw 方法
  var info = gen[key](arg);
  var value = info.value;
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    return new Promise(function (resolve, reject) {
      // 获取 generator 对象
      var gen = fn.apply(self, arguments);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      // 初始化执行 next
      _next(undefined);
    });
  };
}
```

说白了 async/await 也就是 co 库的原生处理 自动执行 Generator 但是对比 Generator 删减了如何监听另一个 Generator 的执行过程的功能

### 二、Generator、GeneratorFunction 及其 prototype 的关系

如果对原型链和继承记不清了先看看原型链与继承

```js
class GeneratorFunction {}
// GeneratorFunction 的 prototype 很通用，单独拎出来
class GeneratorFunctionPrototype {
  static [Symbol.toStringTag] = 'GeneratorFunction'; // 实现 iterator protocol
  next(args) {}
  return(args) {}
  throw(args) {} // 实现 iterable protocol
  [Symbol.iterator]() {
    return this;
  }
}
// 相互引用
GeneratorFunctionPrototype.constructor = GeneratorFunction;
GeneratorFunction.prototype = GeneratorFunctionPrototype;

// 作用不大，设置 prototype 即可
//class Generator {}
//Generator.prototype = GeneratorFunctionPrototype.prototype;
```

## Generator 深入探索

_以下代码基本都是 babel 的简写或粘贴过来的直接看 babel 编译过的也一样_

```js
let num = 0;
async function gen() {
  num = num + (await wait(10));
  // num = (await wait(10)) + num;
  await foo();
  return num;
}

async function foo() {
  await 'wangshun';
}

(async () => {
  // debugger;
  await gen();
  console.log('ws: res', num);
})();
```

### 一、问题

Generator 的状态是如何实现的换句话说 Generator 是怎么做到 yield 结束就停止的？？？？Generator 是如何让权给另一个 Generator，之后又让权回来的？？？一个 Generator 是如何监听另一个 Generator 的执行过程，即 [yield\* genFn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*)？？？

### 二、Generator 的状态

1. 状态实现不难，其实就是用一个 flag 标志记录状态在一定的时候去执行
2. 状态是由用户层面代码生成，里面使用 `switch case + context 记录参数` 实现

```js
function _callee$(_context) {
  while (1) {
    switch (_context.next) {
      case 0: // await wait(10)
        _context.next = 3;
        return wait(10);
      case 3: // await 123
        _context.next = 7;
        return 123;
      case 7:
        _context.next = 9; // await foo()
        return foo();
      case 'end':
        return _context.stop();
    }
  }
}
```

3. 可知每次 yield 对应着一个 switch case，每次都会 return，自然每次 yield 完后就“卡住了”

### 三、多个 Generator 是如何协作的

1. 由 case return 可知 Generator 让权，就是主动执行别的 Generator，并退出自己的状态
2. 同理 foo Generator 也是 switch case 这种结构
3. 先看一下 babel 是如何编译 async 函数的，可以看到`_asyncToGenerator`，这其实就是自动执行。其次可以大概猜出 `regeneratorRuntime.mark` 函数返回的其实就是 polyfill 的 Generator
4. 所以 foo 执行 switch 完，经过一些内部操作把 `{ value: "wangshun", done: true }` 作为了 mark 函数的返回值，并交给 \_asyncToGenerator 使用，\_asyncToGenerator 调用 `promise.then(next)`继续执行
5. gen 函数也是这样，等待 foo resolve，然后 gen 返回 `{ value: xxx, done: false }`，继续 next

```js
function _foo() {
  _foo = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        switch (_context2.next) {
          case 0:
            _context2.next = 2;
            return 'literal';
          case 'end':
            return _context2.stop();
        }
      }, _callee2);
    }),
  );
  return _foo.apply(this, arguments);
}
```

总结一下，父级 gen 函数执行到一个 case，将子 foo 函数的返回值作为本次结果，然后将自己卡住（其实就是在 co 层面等待子 promise resolve）， foo 执行完后返回 done true，并结束自己的状态生涯，再将自己 co 层面的 Promise resolve，gen 卡住的 Promise 收到了 foo 的结果，本次返回 done false，开启下一轮 next，并重新通过 context.next 进入到对应 case 中

### 四、mark、wrap、Context

1.  mark 函数其实就是接受一个函数并改变成 Generator 其本质就是继承 GeneratorFunctionPrototype

```js
function mark(genFn: () => void) {
  return _inheritsLoose(genFn, GeneratorFunctionPrototype);
}
function _inheritsLoose(subClass, superClass) {
  Object.setPrototypeOf(subClass, superClass);
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  return subClass;
}
```

2. 每个 wrap 会创建一个 context 来管理状态以及上下文参数，每次执行 case 时会先打个**快照**，防止 yield 完后参数更改
3. mark 函数的 next、return、throw 最终调用是 wrap 的能力，因为实际是 wrap 是调用（switch case）和 context，所以 GeneratorFunctionPrototype 里用\_invoke 链接 warp，自己只负责传递 type 和 args

```ts
type GeneratorMethod = 'next' | 'return' | 'throw';
class GeneratorFunctionPrototype {
  private _invoke: (
    method: GeneratorMethod,
    args,
  ) => { value: any; done: boolean }; // 注意这是原型方法哦
  next(args) {
    return this._invoke('next', args);
  }
  return(args) {
    return this._invoke('return', args);
  }
  throw(args) {
    return this._invoke('throw', args);
  }
}
```

### 五、yield\* genFn()

上面提到 await、async 舍弃 Generator 是监听到另一个 Generator 的执行过程，也就是说使用 await 过程中并不知道执行了多少 await

```js
async function a() {
  const res = await b();
}

async function b() {
  await 1;
  await 'str';
  return { data: 'lawler', msg: 'ok' };
}
```

上面的代码可以验证

但是 yield* 是通过 delegateYield 方法接替了 foo，在 context 内部循环运行，使得这次 yield 在一个 case 中完成（可以在 babel 中写一个 yield* genFn()试一下就能看出来）

```js
function gen$(_context) {
  switch (_context.next) {
    case 0:
      _context.next = 7;
      return wait(10);
    case 7:
      // 传递 foo generator object 给 gen 的 context
      return _context.delegateYield(foo(), 't2', 8);
    case 'end':
      return _context.stop();
  }
}
```

wrap 里面，循环执行

```js
generator._invoke = function invoke(method, args) {
  context.method = method;

  // yield* genFn 时使用，循环返回 genFn 迭代的结果，直到 return
  while (true) {
    const delegate = context.delegate;
    if (delegate) {
      const delegateResult = maybeInvokeDelegate(delegate, context);
      if (delegateResult) {
        if (delegateResult === empty) continue;
        // 传出内部迭代结果 { value, done }
        return delegateResult;
      }
    }
  }

  if (method === 'next') {
  }
};
```
