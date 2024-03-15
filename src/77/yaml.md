## 插件分享

插件小功能

1. mr
2. q7navi

## 逗号表达式

babel 解析

```js
随便找一个 ts/tsx 文件
```

避免 `this` 指针错误;

## yaml 是什么

YAML 是 "YAML Ain't a Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。

YAML 的语法和其他高级语言类似，并且可以简单表达清单、散列表，标量等数据形态。它使用空白符号缩进和大量依赖外观的特色，特别适合用来表达或编辑数据结构、各种配置文件、倾印调试内容、文件大纲（例如：许多电子邮件标题格式和 YAML 非常接近）。

YAML 的配置文件后缀为 .yml，如：runoob.yml

### 基本语法

- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用 tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释

### 类型

对象

> key: value

```yaml
key: value

?
 key
:
 value
```

数组

> 短横线开头

```yaml
-
```

纯量
基本类型: 数字(整数/浮点), 字符, 布尔, 时间, 日期

- 引用

& 锚点 \* 引用 << 合并到当前

[在线转换](https://onlineyamltools.com/convert-yaml-to-json)
