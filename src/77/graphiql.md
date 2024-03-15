## graphiql 缓存跟踪

随便输入一个`gql`的地址, 比如 `http://graphql.cn-northwest-3.77hub.com/graphiql/index.html`

输入内容

```json

let ck_qcl_param = `{
    data: InvCtrlLedger(criteriaStr: "(invCtrlObject.product.id in (${pIds}) and invCtrlObject.warehouse.id in (${warehouseIds}) and (((((exists (select t.id from (SELECT inledger.id, rank() over(partition by invCtrlObjectId order by inledger.id) as rowlevel from InvCtrlLedger inledger) t where t.rowlevel=1 and t.id=m.id)) )))))", firstResult: 0, maxResult: 200) {
    onHandBaseQty
    availBaseQty
    invCtrlObject {
      product { id name }
      warehouse { id name }
    }
  }
}`;

```

报错;

### 解决问题

缓存了查询内容; 清空缓存;

清空 `localStorage`; 清空 `application` 的 `storage`

仍然清除不掉; 仍然报错;

### 只能跟踪一下

QueryEditor
`componentDidMount` 周期
`constuctor` 周期(初始化)也会有

    查找组件结构, 父组件

`GraphiQL`

```js
// Cache the storage instance
_this._storage = new _StorageAPI2.default(props.storage);
```

发现 `storage` 就是 `window.localStorage`

### 问题

既然 是 `localStorage` 为什么清除不掉?

直接查看 `localStorage`, 删除后再次刷新会重新赋值;

![image-bak.png](https://p.ipic.vip/h7uh8a.png)

### 再次尝试解决问题

动态代码修改; 14316

修改其中你的 `op.cm.options.value`

1709

### 分析问题

1. 直接在 `set` 下设置断点 4449

![image-6-bak.png](https://p.ipic.vip/cdkxyf.png)

2. 通过事件监听, 不起作用

```js
window.addEventListener('storage', e => {
  debugger;
});
```

3. parameter

清空浏览器

4. 发现赋值时机

`document.getElementById('graphiql')` `index.html`页面

![image-7-bak.png](https://p.ipic.vip/zoujtx.png)

### 解决问题

1. **代码中动态修正** 1728
   并注意不要有 `parameter` 的问题;

2. 通过 `url` 地址中增加 正确的 `query` 也可以.

### 总结 tip

1. 通过 `logPoint` 进行调试
2. 代码中可以动态修正自己的 `debug` 内容
