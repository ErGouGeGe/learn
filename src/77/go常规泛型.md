1. 没有泛型之前的窘境
   举个 Golang 的例子：

```go
func Sum(a, b int) int {
  return a + b
}
```

在函数 Sum 中，不仅需要严格定义传入参数 a 和 b 的变量类型，而且返回值的类型也需要严格定义。所以，你只能传入 int 类型，进行这样调用：
Sum(1, 2) // 3
如果想开发一个类似实现 2 个 float 类型变量相加的功能，只能另写 1 个函数：

```go
func SumFloat(a, b float) float {
  return a + b
}
```

或者是写一个通用的 Sum 函数使用 interface 反射来判断。

2. Golang 中的泛型

如何利用泛型来实现上面的 Sum 函数的：

```go
func Sum[T int|float64](a,b T) T {
  return a + b
}
```

然后，我们调用一下：

```
fmt.Println(Sum[int](1, 2))  //3
fmt.Println(Sum[float64](1.23, 2.54))  //3.77
```

3. 泛型变量
   (一)泛型切片变量

我们可以这样定义 1 个泛型变量，比如，我们定义一个泛型切片，切片里的值类型，即可以是 int，也可以是 float64，也可以是 string：

```go
type Slice1 [T int|float64|string] []T
```

T 表示我们提炼出来的通用类型参数(Type parameter)，是我们就用来表示不同类型的模板，T 只是取的一个通用的名字，你可以取名任意其他名字都行。

后面的 int|float64|string 叫类型约束（Type constraint），也就是约束了 T 的取值范围，只能从(int、float64、string）中取值。

里面的这一串 T int|float64|string，叫类型参数列表(type parameter list)，表示的是我们定义了几个泛型的参数。

最后面的[]T 这个我们就很熟悉了，就是申请一个切片类型，比如常见的：[]int, []string 等等，只不过我们这里的类型是 T，也就是参数列表里面定义的变量值。

（二）泛型 map 变量

同理，我们可以试着定义其他类型的泛型变量，定义 Map1[KEY, VALUE]泛型变量，它是一个 map 类型的，其中类型参数 KEY 的类型约束是 int|string，类型参数 VALUE 的类型约束为 string|float64。它的类型参数列表有 2 个，是：KEY int|string, VALUE string| float64。

```go
type Map1 [KEY int|string, VALUE string| float64] map[KEY]VALUE
```

（三）泛型结构体变量

同理，我们再创建 1 个结构体的泛型变量。其中的泛型参数 T，有 3 个类型约束。

```go
type Struct1 [T string|int|float64] struct {
  Title string
  Content  T
}
```

（四）泛型变量实例化

```go
//申明一个int类型的变量
MyInttype MyInt int
//实例化并赋值
var int1 MyInit = 3
//打印
fmt.Println(int1)
实例化需要去显示的申明实际传入的变量(也就是实参)是什么类型，用它去替换T。
//申明一个泛型切片
type Slice1 [T int|float64|string] []T
//实例化成int型的切片，并赋值，T的类型和后面具体值的类型保持一致。
var MySlice1 Slice1[int] = []int{1,2,3}
//实例化成string型的切片，并赋值, T的类型和后面具体值的类型保持一致。
var MySlice3 Slice1[string] = []string{"hello", "small", "yang"}

//实例化成float64型的切片，并赋值, T的类型和后面具体值的类型保持一致。
var MySlice5 Slice1[float64] = []float64{1.222, 3.444, 5.666}
map类型的泛型变量实例化
//申明
type Map1[KEY int | string, VALUE string | float64] map[KEY]VALUE
//实例化：KEY和VALUE要替换成具体的类型。map里面的也要保持一致
var MyMap1 Map1[int, string] = map[int]string{
  1: "hello",
  2: "small",
}
fmt.Println(MyMap1,MyMap2) // map[1:hello 2:small]
//实例化：KEY和VALUE要替换成具体的类型。map里面的也要保持一致
var MyMap3 Map1[string, string] = map[string]string{
  "one": "hello",
  "two": "small",
}
fmt.Println(MyMap3, MyMap4) // map[one:hello two:small]
结构体泛型变量实例化：
//定义1个结构体泛型变量
type Struct1 [T string|int|float64] struct {
  Title string
  Content  T
}
//先实例化成float64
var MyStruct1 Struct1[float64]
//再赋值
MyStruct1.Title = "hello"
MyStruct1.Content = 3.149
fmt.Println(MyStruct1,MyStruct2) //{hello 3.149}
```

4. 泛型函数
   （一）泛型函数的申明

当我们深入了解了 go 中各个泛型变量的申明定义和实例化，以及个各种复杂的嵌套之后，我们接下来来了解一下，go 中的用的最多的函数是如何运用泛型的。这就回到了我们文章最开始的那个例子：

```go
//计算2个数之和
func Sum[T int|float64](a,b T) T {
  return a + b
}
```

他的写法，和泛型变量写法其实基本类似，我们解刨一下：

Sum 是函数名，这个和普通的函数一样。

Sum 后面紧接着一个[]，这个就是申明泛型参数的地方，和泛型变量一样，我们例子中只申请了 1 个参数类型 T。

T 后面接着的 int | float64 就是这个参数 T 的类型约束，也就是取值范围，这个和泛型变量一致。

后面的(a,b T)是函数的调用参数，表示有 2 个参数，他们的类型都是 T。

()后面 T 则表示函数的返回值的类型，和普通函数的返回值写法一样，不过这里表示返回值的类型是 T。

（二）泛型函数的调用

```go
//传入int的实参，返回值类型也是
intintSum := Sum[int](1, 2)
//传入float64的实参，返回值类型也是float64
float64Sum := Sum[float64](1.23, 2.45)
fmt.Println(intSum, float64Sum) //3 3.68
```

接下来，我们把泛型函数和泛型变量结合起来，看下这个复杂一点的例子

```go
func Foreach[T int | int8 | int16 | int32 | int64 | uint | uint8 | uint16 | uint32 | uint64 | float32 | float64](list []T) {
  for _, t := range list {
    fmt.Println(t)
  }
}
```

这里吧泛型约束定义放在函数定义里，非常冗长，可以通过自定义类型约束来改善

（三）自定义类型约束

```go
// 并集定义
type MyNumber interface {  int | int8 | int16 | int32 | int64 | uint | uint8 | uint16 | uint32 | uint64 | float32 | float64}

func Foreach[T MyNumber](list []T) {
  for _, t := range list {
    fmt.Println(t)
  }
}
```

（四）any\comparable\Ordered 约束类型

any 约束，例如

```
func add[T any] (a, b T) {  }
```

any 就是代表一个类型约束，interface{}的别名，它始终和 interface{}是相等的。

```go
//相等
type MySmall interface{}
type MySmall any
//相等
scans := make([]interface{}, 6)
scans := make([]any, 6)
```

但是有时候，any 并不是万能可用的，比如，计算 2 个数之和，如果使用 any 约束的话，编辑器就会直接报错了：

```
func Sum[T any] (a, b T) T {  return a+b}
//报错：invalid operation: operator + not defined on a (variable of type T constrained by any)
```

所以，鉴于这种情况，官方又给我们搞了 2 个约束类型关键词：comparable 和 constraints.Ordered。从字母意思可以看得出来，前者是约束了可比较（==、!=），后者约束了可排序 (<、<=、>=、>)。

所以这两者结合起来，我们就可以实现比较 2 个数字的大小和相等关系了。

Go 官方团队在 Go1.18 Beta1 版本的标准库里因为泛型设计而引入了 contraints 包。后续版本又去掉了，如果要使用，需自行下载：
go get golang.org/x/exp/constraints

我们看下怎么去申明一个可排序的泛型函数例子。

```go
//导入constraints包
import (
  "constraints"
)
//T的约束类型是：constraints.Orderedfunc
func Max[T any](a, b T) T {
  if a > b {
    return a
  } else {
    return b
  }
}
```

这样，就约束好了，传入的 T 的实参，必须是可排序，也就是满足这几个：(<、<=、>=、>)。才能去调用实例化这个函数。我们去源码看下 Orderd 是怎么定义的：

```go
type Ordered interface {
  Integer | Float
}
```

这样，我们就可以实例化调用这个 Max 函数了:

```go
fmt.Println(Max[int](1, 2))  // 2
fmt.Println(Max[float64](1.33, 2.44))  //2.44
//省去传入的泛型变量的类型，由系统自行推导：
fmt.Println(Max(4, 5)) // 5
```

值得注意的是，这个 comparable，是比较==或者!==，不能比较大小，别和 Orderd 搞混淆了，可以这样使用：

```go
func Match[T comparable](a, b T) bool {
   return a == b
}
//比较bool
fmt.Println(Match(true, true)) // ture
//比较number
fmt.Println(Match(1, 2))  //false
fmt.Println(Match(1.45, 2.67)) //false
```

5. 泛型方法
   （一）接收器泛型
   我们先定义 1 个泛型变量，然后在这个变量上加上 1 个方法：

```go
//申请一个自定义的泛型约束类型
type NumberAll interface {
  ~int|~int64|~int32|~int16|~int8|~float64|~float32
}
//申请一个泛型切片类型，泛型参数是T，约束的类型是 NumberAll
type SliceNumber[T NumberAll] []T
//给泛型切片加上1个接收器方法
func (s SliceNumber[T]) SumIntsOrFloats[]() T {
  var sum T
  for _, v := range s {
    sum += v
  }
  return sum
}
```

调用方式：

```go
//实例化成int
var ss1 SliceNumber[int] = []int{1, 2, 3, 4}
ss1.SumIntsOrFloats() // 10
```

（二）方法的参数泛型

```go

type DemoSlice[T int | float64] []T
func (d DemoSlice[T]) FindOne(a T) bool {
  for _, t := range d {
    if t == a {
      return true
    }
  }
  return false
}
s1 := DemoSlice[int]{1, 2, 3, 4}
fmt.Println(s1.FindOne(1))
s2 := DemoSlice[float64]{1.2, 2.3, 3.4, 4.5}
fmt.Println(s2.FindOne(1.2))
```
