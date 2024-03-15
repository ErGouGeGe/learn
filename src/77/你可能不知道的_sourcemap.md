# 名人名言

https://m.signalvnoise.com/ive-never-had-a-goal/

我从来没有目标

我从来没有目标, 只是一直在做.

我不记得自己有什么目标，那种很具体的目标。

有些事情我一直想做，但如果不做，我也能接受。有些事情值得去做，但如果没有做到，我也不觉得很遗憾。

我的目标不是那样。

我做事，我尝试，我建造，我想要取得进步，我想让我做的东西使得自己、使得公司、使得家庭、使得社会变得更好。但我从未设定过目标。这不是我做事的方式。

目标是当你到达时就会消失的东西。一旦你到达了，它就消失了。你总是可以设置另一个，我只是不按这样的步骤行事。

我只是做我正在做的事情，然后就到了现在的地方。今天我继续以同样的方式对待工作和生活。

### 考虑问题的一般步骤

1. 上下文(背景)
2. 是什么
3. 怎么用(比如 怎么启动, 生成等)
4. 原理
5. 发散

## 介绍

略

### 👽 简单说

简单说，Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

所以, source map 是一个 map, 既不是压缩文件, 也不是源文件. 😹
(我这么说, 是因为我经常有此种幻觉 👼)

### 👀 看一下

一般我们经常看到的 `sourcemap` 如下

```
//# sourceMappingURL=/path/to/filename.js.map
```

## ❓ 怎么启用

1. 代码
   只要在 **转换后** 的代码尾部，加上一行就可以了。

```js
//# sourceMappingURL=/path/to/filename.js.map
```

既然是一个地址, 所以 map 文件也可以放在远端, 那我们尝试一下

2. 浏览器
   谷歌中启用 `sourcemap`
   Enable JavaScript source maps

## 示例

是否可以手动加载 sourcemap 文件?
[压缩后的文件地址](https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js)
[sourcemap 的一个地址](https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.map)

## ❓ 如何生成

摘录在 阮大神示例

```
java -jar compiler.jar \
　　　　--js script.js \
　　　　--create_source_map ./script-min.js.map \
　　　　--source_map_format=V3 \
　　　　--js_output_file script-min.js
```

解释

```
   - js： 转换前的代码文件
   - create_source_map： 生成的source map文件
   - source_map_format：source map的版本，目前一律采用V3。
   - js_output_file： 转换后的代码文件。
```

## 🔧 自己试验一下

> 此地址只是演示压缩, 实际不是太好用
> https://closure-compiler.appspot.com/home
> Google 的 Closure 编译器
> https://developers.google.com/closure/compiler?hl=zh-cn

手动项目演示一下 [downloadlink](https://github.com/google/closure-compiler/wiki/Binary-Downloads)

```
java -jar closure-compiler-v20200719.jar --js origin.js --js_output_file origin.min.js --create_source_map origin.min.js.map --source_map_format=V3
```

#### 其他

#### webpack 相关

```json
devtool: 'source-map'
```

[webpack 插件 terser](https://webpack.docschina.org/plugins/terser-webpack-plugin/)

全局安装看一下

```
npm install -g terser

terser origin2.js -o foo.min.js -c -m --source-map "filename='foo.min.js.map',root='[http://foo.com/src',url='foo.min.js.map](http://foo.com/src',url='foo.min.js.map)'"

or simple
terser origin2.js -o foo.min.js -c -m --source-map "filename='foo.min.js.map'"

```

## soucemap 细节

```json
{
  "version": 3,
  "file": "origin.min.js",
  "lineCount": 1,
  "mappings": "AAAAA,QAASA,KAAI,EAAE,CACdC,OAAA,CAAQC,GAAR,CAAY,gBAAZ,CADc;",
  "sources": ["origin.js"],
  "names": ["test", "console", "log"]
}
```

增加 阮一峰 大神相关的解释内容

```

   - version：Source map的版本，目前为3。

   - file：转换后的文件名。

　　- sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。

　　- sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并。

　　- names：转换前的所有变量名和属性名。

　　- mappings：记录位置信息的字符串，下文详细介绍。


```

> 第一层是**行对应**，以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。

第二层是**位置对应**，以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。

第三层是**位置转换**，以[VLQ 编码](https://en.wikipedia.org/wiki/Variable-length_quantity)表示，代表该位置对应的转换前的源码位置。

> - 第一位，表示这个位置在（转换后的代码的）的第几列。

> - 第二位，表示这个位置属于 sources 属性中的哪一个文件。

> - 第三位，表示这个位置属于转换前代码的第几行。

> - 第四位，表示这个位置属于转换前代码的第几列。

> - 第五位，表示这个位置属于 names 属性中的哪一个变量。

## 稍微总结一下

这里其实就已经 OK 了, 大体理解了什么是 `sourceMap`; 然后就是 好奇心了.

### 🤔 算法&思想

但不是很明白;

其中我们看到 `mapping` 中是我们不认识的内容; 这里使用到了一个 `VLQ` 编码;

**VLQ 编码** 是什么? 后边我们会看一下;

```
A variable-length quantity (VLQ) is a universal code that uses an arbitrary number of binary octets (eight-bit bytes) to represent an arbitrarily large integer. A VLQ is essentially a base-128 representation of an unsigned integer with the addition of the eighth bit to mark continuation of bytes.
```

人话

**`VLQ`** (Variable-length quantity)是一种通用的，使用任意位数的二进制来表示一个任意大的数字的一种编码方式。

编码实现: 对数字 137 进行 **VLQ**编码，以下为分解步骤：

1. 将 137 转成二进制形式 —— 10001001
2. 七位一组做分组，不足的补前导 0 —— 0000001 0001001
3. 最后一组开头补 0，其余补 1(1 表示连续位) —— 10000001 00001001.
4. 最终 137 的 VLQ 编码形式为 —— 10000001 00001001

VLQ 解码 :https://www.murzwin.com/base64vlq.html

### ⁉️ 为什么这么处理?

1. 位数明显变长了
2. 感觉占用空间变多了

原因:

1. 解决序号过大问题
   1. 因为一行, 坐标可能会非常大,采用相对位置
2. 解决占用空间过大问题
   1. 字符占用 vs 数字占用
      1. CAAQC =>> 1,0,0,8,1
      2. 连续字符的问题

### 参考地址

https://juejin.cn/post/6908642204185690119 新新人类
https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html 整体精简介绍
https://www.51cto.com/article/665239.html 解释了 base64-vlq
https://www.liu.app/2020/04/08/Code/%E4%BD%BF%E7%94%A8Google%20Closure%20Compiler%E5%8E%8B%E7%BC%A9js%E5%B9%B6%E7%94%9F%E6%88%90Source%20map%E6%96%B9%E4%BE%BF%E8%B0%83%E8%AF%95/ 释疑解惑
https://github.com/google/closure-compiler show me the code
