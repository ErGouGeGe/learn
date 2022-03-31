### Basic grammar

#### 变量定义

##### 使用 var 关键字

1. var a,b,c bool
2. var s1,s2 string := "hello","world"
3. 可放在函数哪或放在包内
4. 使用 var()集中定义变量
5. 使用:=定义变量`a,b,i,s1,s2:=ture,false,3,5,"word"` 但是只能在函数中使用

**没有 char 只有 rune**
**Go 语言没有隐式类型转换，都是强制类型转换**

```
var c int
c = int(matn.Sqrt(float(a*a+b*b)))
```

#### 常量定义

##### 使用 const 关键字

定义方法与 var 一致

定义枚举类型

```
const (     const(      const(
    a = 0     a = iota   a = 1<<(10*iota)
    b = 1     b          b
    c = 2     c          c
)           )           )
```

#### 条件控制

1. if 判断条件里不用写括号
2. switch 进入判断条件会自动 break 除非写了 fullthrough
3. switch 后可以没有表达式 在 case 中写表达式

#### 循环

for 循环不用写括号 省略初始条件相当于 while 递增条件也可省略 判断条件也可省略 都省略就是死循环

#### 函数

1. 返回值类型写在后面
2. 可以返回多个值
3. 函数作为参数
4. 没有默认参数，可选参数

#### 指针

1. 取地址符号& \*是指针取值

2. `*b,*a = *a *b`\* 操作符的根本意义就是操作指针指向的变量。当操作在右值时，就是取指向变量的值；当操作在左值时，就是将值设置给指向的变量。
