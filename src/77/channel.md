### 协程

Go 语言的 协程(Groutine)  是与其他函数或方法一起并发运行的工作方式。协程可以看作是轻量级线程。与线程相比，创建一个协程的成本很小。因此在 Go 应用中，常常会看到会有很多协程并发地运行。

#### 启动一个 go 协程

调用函数或者方法时，如果在前面加上关键字  go ，就可以让一个新的 Go 协程并发地运行。

```go
package main
import (
   "fmt"
   "time"
)
func main() {
   go PrintInfo()
   time.Sleep(1 * time.Millisecond)
   fmt.Printf("hello main")
}
func PrintInfo() {
   fmt.Printf("hello goroutine\n")
}
```

PrintInfo()  函数与  main()  函数会并发执行，主函数运行在一个特殊的协程上，这个协程称之为   主协程(Main Goroutine) 。
启动一个新的协程时，协程的调用会立即返回。与函数不同，程序控制不会去等待 Go 协程执行完毕。在调用 Go 协程之后，程序控制会立即返回到代码的下一行，忽略该协程的任何返回值。如果 Go 主协程终止，则程序终止，于是其他 Go 协程也会终止。为了让新的协程能继续运行，我们在  main()  函数添加了 time.Sleep 使主协程休眠 1 毫秒，但这种做法并不推荐，因为我们无法保证 1 毫秒内 PrintInfo 可以执行完。

#### 启动多个 go 协程

```go
package main
import (
	"fmt"
	"time"
)
func PrintNum(num int) {
	for i := 0; i < 3; i++ {
		fmt.Println(num)
	}
}
func main() {
	// 开启 1 号协程
	go PrintNum(1)
	// 开启 2 号协程
	go PrintNum(2)
	// 使主协程休眠 1 秒
	time.Sleep(time.Second)
}
```

### 通道

通道(channel) ，就是一个管道，可以想像成 Go 协程之间通信的管道。它是一种队列式的数据结构，遵循先入先出的规则。

#### 通道的声明

每个通道都只能传递一种数据类型的数据，在你声明的时候，我们要指定通道的类型。chan Type  表示  Type  类型的通道。通道的零值为  nil 。
下面的语句声明了一个类型为  string  的通道   ch  ，该通道  ch  的值为  nil 。
var ch chan string

#### 通道的初始化

声明完通道后，通道的值为  nil ，我们不能直接使用，必须先使用  make  函数对通道进行初始化操作。
ch = make(chan string)
// 声明并初始化
ch := make(chan string)

#### 使用通道发送和接收数据

```go
package main
import "fmt"
func PrintChan(c chan string) {
   c <- "hello" // 发送数据到通道，即写数据
}
func main() {
   ch := make(chan string)
   fmt.Println("start")
   go PrintChan(ch)
   rec := <-ch // 从通道接收数据，即读数据
   fmt.Println(rec)
   fmt.Println("end")
}
```

执行结果：
start
hello
end
从执行结果可以看出，发送与接收默认是阻塞的。如果从通道接收数据没接收完主协程是不会继续执行下去的。

#### 通道的关闭

对于一个已经使用完毕的通道，我们要将其进行关闭。
对于一个已经关闭的通道如果再次关闭会导致报错，我们可以在接收数据时，判断通道是否已经关闭，从通道读取数据返回的第二个值表示通道是否没被关闭，如果已经关闭，返回值为  false ；如果还未关闭，返回值为  true 。
rec, ok := <-ch
if ok { // 判断通道是否可以关闭
close(ch) // 关闭通道
}

#### 通道的容量与长度

make  函数是可以接收两个参数的，同理，创建通道可以传入第二个参数——容量。
 当容量为  0  时，说明通道中不能存放数据，在发送数据时，必须要求立马有人接收，否则会报错。此时的通道称之为无缓冲通道。
 当容量为  1  时，说明通道只能缓存一个数据，若通道中已有一个数据，此时再往里发送数据，会造成程序阻塞。
 当容量大于  1  时，通道中可以存放多个数据，可以用于多个协程之间的通信管道，共享资源。
既然通道有容量和长度，那么我们可以通过  cap  函数和  len  函数获取通道的容量和长度。

```go
package main
import (
   "fmt"
)
func main() {
   // 创建一个通道
   c := make(chan int, 3)
   fmt.Println("初始化后：")
   fmt.Println("cap =", cap(c))
   fmt.Println("len =", len(c))
   c <- 1
   c <- 2
   fmt.Println("传入两个数后：")
   fmt.Println("cap =", cap(c))
   fmt.Println("len =", len(c))
   <-c
   fmt.Println("取出一个数后：")
   fmt.Println("cap =", cap(c))
   fmt.Println("len =", len(c))
}
```

#### 缓冲通道与无缓冲通道

按照是否可缓冲数据可分为：缓冲通道   与   无缓冲通道  。
无缓冲通道在通道里无法存储数据，接收端必须先于发送端准备好，以确保你发送完数据后，有人立马接收数据，否则发送端就会造成阻塞，原因很简单，通道中无法存储数据。也就是说发送端和接收端是同步运行的。
缓冲通道允许通道里存储一个或多个数据，设置缓冲区后，发送端和接收端可以处于异步的状态。
// 无缓冲通道
c := make(chan int)
// 或者
c := make(chan int, 0)
// 缓冲通道
c := make(chan int, 1)

#### WaitGroup

在实际开发中我们并不能保证每个协程执行的时间，如果需要等待多个协程，全部结束任务后，再执行某个业务逻辑。下面我们介绍处理这种情况的方式。
WaitGroup  有几个方法：
Add：初始值为  0 ，这里直接传入子协程的数量，你传入的值会往计数器上加。
Done：当某个子协程完成后，可调用此方法，会从计数器上减一，即子协程的数量减一，通常使用  defer  来调用。
Wait：阻塞当前协程，直到实例里的计数器归零。

```go
package main

import (
	"fmt"
	"sync"
)

func task(taskNum int, wg *sync.WaitGroup) {
	// 延迟调用 执行完子协程计数器减一
	defer wg.Done()
	// 输出任务号
	for i := 0; i < 3; i++ {
		fmt.Printf("task %d: %d\n", taskNum, i)
	}
}

func main() {
	// 实例化 sync.WaitGroup
	var waitGroup sync.WaitGroup
	// 传入子协程的数量
	waitGroup.Add(3)
	// 开启一个子协程 协程 1 以及 实例 waitGroup
	go task(1, &waitGroup)
	// 开启一个子协程 协程 2 以及 实例 waitGroup
	go task(2, &waitGroup)
	// 开启一个子协程 协程 3 以及 实例 waitGroup
	go task(3, &waitGroup)
	// 实例 waitGroup 阻塞当前协程 等待所有子协程执行完
	waitGroup.Wait()

}
```

### 企企项目中的应用

并发计算 eca 表达式初始值

```go
trek/business-domain/biz-common/initialEcaExprMiddlewareCreator.go
var wg sync.WaitGroup
wg.Add(len(processor))// 开启processor长度的协程数
for i := 0; i < len(processor); i++ {
   go func(index int) {// 并发处理赋值逻辑
      result := processor[index].Handler(data, data)
      processor[index].Result = []interface{}{
         result,
      }
      wg.Done()// 执行完子协程计数器减一
   }(i)
}
wg.Wait()// 阻塞当前协程 等待所有子协程执行完
trek/business-domain/arap/base/form/entities/payment/query-fields-proceser.go
for i := 0; i < count; i++ {
   start := i * per
   end := (i + 1) * per
   if i == count-1 {
      end = total
   }
   perData := paymentItems[start:end]
   wg := sync.WaitGroup{}
   wg.Add(len(perData))

   go func(i int, items []interface{}, offset int) {
      defer wg.Done()
      calcExpr(items, businessTypeId, variable, offset)
   }(i, perData, start)
}
```

### 更多资料

https://learn.microsoft.com/zh-cn/training/modules/go-concurrency/1-goroutines
https://gobyexample.com/goroutines
