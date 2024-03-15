# 奇怪的 fiber

## 名人名言

程序的世界没有魔法 -- john resig

![https://p.ipic.vip/7qayig.png](https://p.ipic.vip/7qayig.png)

[this is no magic](https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/JavaScript/Secrets%20of%20the%20JavaScript%20Ninja.pdf)

所有的一切都是代码在驱动;

## 起因

react15=>react16

1.  hooks
2.  生命周期变化
3.  同步更新变为异步更新, 可打断 (`fiber`)

![https://p.ipic.vip/ylgoxw.png](https://p.ipic.vip/ylgoxw.png)

![react16-lifecycle](https://p.ipic.vip/5fv6kl.jpg)

## 各种彻底搞懂

![https://p.ipic.vip/guckfi.png](https://p.ipic.vip/guckfi.png)
![https://p.ipic.vip/tz04lg.png](https://p.ipic.vip/tz04lg.png)
...

## 两个 🌰

```shell
# 15
code ~/git-source/000/demo/react-15-with-class
# 18
code ~/git-source/000/demo/react-18-with-hooks
```

## 说在前边

> react 团队花费 2 年时间重构的 fiber 架构

<span style="color:red; font-weight: bold;">1. 心智模型</span>
<span style="color:red; font-weight: bold;">2. 让我好奇的点</span>

## 一、心智模型

### [代数效应](https://www.tangshuang.net/7899.html)

[react 代数效应](https://overreacted.io/zh-hans/algebraic-effects-for-the-rest-of-us/)

1. generator
2. async/await
3. suspence
   我们自己的项目: `apps/link/src/solutions/athena-solutions/list-solution/setting/ConditionFormatFormConsume.tsx`

```js
async function fn() {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, 500);
  });
}

function main() {
  const a = fn();
  console.log(a);
}

run(main);

function run(mainFn) {
  let result = {
    status: 'pending',
    data: null,
  };
  const originFn = fn;
  // 覆写 fn
  fn = () => {
    if (result.status == 'fulfilled') {
      return result.data;
    }
    const p = originFn().then(d => {
      result.status = 'fulfilled';
      result.data = d;
    });
    throw p;
  };
  try {
    mainFn();
  } catch (err) {
    debugger;
    if (err instanceof Promise) {
      err.then(() => {
        mainFn();
      });
    }
  }
}
```

## 二、怎么实现

<span style="color:red; font-weight: bold;">怎么实现可中断?</span>

想想其他:
比如 `ctrl+c` `interupt(计算机中断)`

循环遍历一个事情, 然后你告诉了我一个事情, 我就中断

```js
var i = 0;
var count = 0;
var sss;
function foo() {
  console.log(count++);
  sss = setTimeout(() => {
    if (i === 1) {
      clearTimeout(sss);
    } else {
      foo();
    }
  }, 500);
}

foo();
```

## 回到 react

![https://p.ipic.vip/1fwulc.png](https://p.ipic.vip/1fwulc.png)

### react 做了什么?

简单些: 通过 `js` 针对孤立的一个元素进行自定义渲染;
接着: 因为页面的 `render` 是一个高耗能操作; 所以, 通过内存比较元素变化, 高效实现增量更新, 所有会有 `react-diff`;
再者: `react-diff` 因为是 `js` 操作, 所以可能会阻塞界面, 于是推出了非阻塞的支持()`fiber`);

即 reconcilation => fiber reconcilation

#### 号外

**一些中文要去理解一下**

> 名字的意义

1. react 中的 `reconciler` (协调人) <= 有一些了解或者解除 [语义饱和症状](https://baike.baidu.com/item/%E8%AF%AD%E4%B9%89%E9%A5%B1%E5%92%8C/9108301)
   > handler, processor
2. reconcilation 和解
   modulator-demodulator

### fiber 是什么?

![https://p.ipic.vip/69q6yz.png](https://p.ipic.vip/69q6yz.png)

[百科上的解答](https://zh.wikipedia.org/zh-hans/%E7%BA%96%E7%A8%8B)

![https://p.ipic.vip/5napuq.png](https://p.ipic.vip/5napuq.png)

<span style="color:magenta; font-weight: bold;">这里只是通用的一些定义, 不让人很明白;</span>

回归到 react 中的 `fiber`?

1. 架构 - fiber 架构
2. 静态 - fiber element
3. 动态 - react node state

![https://p.ipic.vip/7iqocx.png](https://p.ipic.vip/7iqocx.png)

![https://p.ipic.vip/23i62u.png](https://p.ipic.vip/23i62u.png)

![https://p.ipic.vip/mnas0t.png](https://p.ipic.vip/mnas0t.png)

### 针对 fiber 的疑问

前提:

![https://p.ipic.vip/lpl53c.png](https://p.ipic.vip/lpl53c.png)

1. `fiber` 怎么实现的可中断?
2. 打断了怎么恢复, 保证正确性?

## fiber 的结构

> 世界没有魔法, 任何事情都是最简单事情的具体化;

经常听到的就是 fiber 中的链表;
链表构成: <span style="color:red; font-weight: bold;">队列 和 节点</span>
![https://p.ipic.vip/zbapyl.png](https://p.ipic.vip/zbapyl.png)

#### 队列:

updateQueue [=>直通车](https://juejin.cn/post/7093082885363597349)

~~其他: 不需要关注~~
~~effectList~~ [=>直通车](https://react.iamkasong.com/process/completeWork.html#effectlist)

#### 节点:

fiber

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

## 1. 依托队列, fiber 怎么实现的可中断?

对应 <span style="color:red; font-weight: bold;">中断, 循环</span>

1. react 自己实现了 `requestIdleCallback`
   ![https://p.ipic.vip/lwkep1.png](https://p.ipic.vip/lwkep1.png)

> 注意是 <span style="color:red; font-weight: bold;">requestIdleCallback 而不是 requestAnimationFrame</span>

`requestIdleCallback`的一个简单的例子:

```js
// 一个 requestIdleCallback 的应用场景
function runTaskQueue(deadline) {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    taskList.length
  ) {
    const task = taskList.shift();
    currentTaskNumber++;

    task.handler(task.data);
    scheduleStatusRefresh();
  }

  if (taskList.length) {
    // >>>>>> timeRemaining 和 didTimeout
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  } else {
    taskHandle = 0;
  }
}
```

发现: 其中的 `didTimeout` 还是会强制去执行自己的内容; 会有一个最后超时时间;

程序世界没有魔法, 我相信 `react` 也大体会这么去处理;
![https://p.ipic.vip/2rd08o.png](https://p.ipic.vip/2rd08o.png)

但是
![https://p.ipic.vip/cck6mq.png](https://p.ipic.vip/cck6mq.png)

怎么能够随时打断呢?

```js
import React, { useState } from 'react';

let showSex = true;
function Example1() {
  const [age, setAge] = useState(18);
  return (
    <div>
      //此处有大量的逻辑处理;
      <p>{age}岁</p>
    </div>
  );
}

export default Example1;
```

**每次执行的时候去问一下是否要打断? 所以一定有一个执行队列;**

![https://p.ipic.vip/kf2odt.png](https://p.ipic.vip/kf2odt.png)

每次执行完一个 fiber 节点, react 会比较此次执行时间,是否执行大于 `5ms` , 大于 `5ms` 就会再次按照优先级队列去读取;

**会按照优先级去排布(Scheduler)这个队列**

## 打断了怎么恢复, 保证正确性?

比如我正确的执行应该是(应该的依据是用户操作)

A=>B=>C=>D

但是 C 优先级高; 所以 C 会立即执行; 那么后续呢?

1. 如何保证 Update 不丢失
   链表上保存更新点; 记录 依赖状态 和 保存状态
   ![https://p.ipic.vip/8pe2ye.png](https://p.ipic.vip/8pe2ye.png)
2. 依赖的连续性
   所以接着执行 B => C => D

仍然会执行 C

## 整个流程

1. schedular (调度)
2. render (reconcile 调和) =>

- 双缓存 current, workInProcess
- mount 和 update
- 输出 effectLists

3. commit (renderer 渲染)

### 高频问题?

react hooks 不能放在条件语句中?

```js
import React, { useState } from 'react';

let showSex = true;
function Example2() {
  const [age, setAge] = useState(18);
  if (showSex) {
    const [sex, setSex] = useState('男');
    showSex = false;
  }
  const [work, setWork] = useState('前端');
  return (
    <div>
      <p>{age}岁</p>
      <p>{sex}</p>
      <p>{work}</p>
    </div>
  );
}

export default Example2;
```

报错:

![https://p.ipic.vip/86g7fw.png](https://p.ipic.vip/86g7fw.png)

谷歌回答: 因为 `react` 是用 单链表操作, 放在条件语句中会导致拿不到正确的内容;

1. `hooks` 其实就是一个函数, 没有自己状态的一个函数;
2. 为了让 `hooks` 有状态, 那么只能维护一个全局状态, 这个状态是一个链表结构;(多个状态)
3. `mount` 时候收集构建;
4. 后续 `update` 时候, 通过 `useState` 调用进行取值;
5. 建立和取值的关系;
6. 如果有条件语句, 会导致 `状态节点` 与 `实际节点` 对应不上; (其实这也是 `react` 所禁止的, 会有 `error`)

#### 极简 hooks 实现参考

```js
// 当前正在执行的hook
let workInprogressHook = null;
// 模拟是否已经挂载了
let isMount = true;
// fiber容器
const fiber = {
  memoizedState: null,
  stateNode: App,
};
function run() {
  workInprogressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}
// dispatch
function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;
  run();
}
// useState
function useState(initalState) {
  let hook = null;
  // 未挂载
  if (isMount) {
    hook = {
      queue: {
        pending: null,
      },
      memoizedState: initalState,
      next: null,
    };
    if (fiber.memoizedState === null) {
      fiber.memoizedState = hook;
    } else {
      workInprogressHook.next = hook;
    }
    workInprogressHook = hook;
  } else {
    hook = workInprogressHook;
    workInprogressHook = workInprogressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let update = hook.queue.pending.next;
    do {
      const action = update.action;
      baseState = action(baseState);
      update = update.next;
    } while (update !== hook.queue.pending.next);
  }

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function App() {
  const [count, setCount] = useState(0);
  console.log(`count is ${count}`);
  // 未返回jsx对象，只是返回了模拟对象
  return {
    onClick: () => {
      setCount(num => num + 1);
    },
  };
}

window.app = run();
```

## 总结

> 感觉肯定没有说清楚, 这个地方太多细节与版本的更替;
> 因为我自己也没有很透彻....

![https://p.ipic.vip/3cc0s4.png](https://p.ipic.vip/3cc0s4.png)

1. 心智模型: 代数效应
2. fiber 为什么可中断
3. 恢复执行原则
4. useState 为什么不能放在条件中

参考文档:

1. https://react.iamkasong.com/
2. https://react.dev/
3. https://zhuanlan.zhihu.com/p/587588034
4. https://www.youtube.com/watch?v=ZCuYPiUIONs (参考视频)
5. https://juejin.cn/post/7093082885363597349
6. http://www.ayqy.net/blog/dive-into-react-fiber/
