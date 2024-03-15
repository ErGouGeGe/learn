# debug

## debug 的原理

### 编译原理

1. 编译执行 java c/c++

2. 解释执行 js python

![img](https://tva1.sinaimg.cn/large/008i3skNly1gw6tvgq0hwj31400d7q3t.jpg)

### debugger 原理

1. 中断

   > cpu 执行每条指令后会去查看是否有中断

2. INT 指令

   > debugger 程序会在需要设置断点的位置把指令内容换成 INT 3, 即 0xCC

3. 中断寄存器

   > cpu 中的中断寄存器

4. 解释型语言的 debugger

   > 不需要 cpu 中断机制, 但原理类似, 插入一段代码来断住

debugger 实现

1. js, 参考 [v8-debug-protocoll](https://github.com/buggerjs/bugger-v8-client/blob/master/PROTOCOL.md)

   > v8 引擎会把设置断点、获取环境信息、执行脚本的能力通过 socket 暴露出去

2. nodejs

   > 通过 --inspect 起一个 debug 的服务端, 根据 v8-debug-protocol 进行通信

### debugger adaptor protocol

类似上边的调试协议, 各个语言都有, 于是有一个 DAP 这个东西.

![img](https://tva1.sinaimg.cn/large/008i3skNly1gw6u7f2eycj30xc0rfjsr.jpg)

## debug 的技巧案例

### go-debug 技巧分享

1. 通过 goland 编辑器直接增加断点

   1. 配置 config
   2. 增加断点
   3. 断点模式启动
   4. 查看变量等操作

2. 打印内容

   1. 直接打印

      1. %v
      2. %+v
      3. %#v

      ```go
      package main

      import "fmt"

      func main () {

      	c := map[string]interface{}{
      		"name": map[string]string{
      			"hello": "abc",
      		},
      	}

      	b := &c

      	fmt.Println(c)
      	fmt.Printf("%v", c)
      	fmt.Println()
      	fmt.Printf("%+v", c)
      	fmt.Println()
      	fmt.Printf("%#v", c)
      	fmt.Println()
      	fmt.Printf("%v",b)
      	fmt.Println()
      	fmt.Printf("%#v", b)

      }
      ```

2)  打印到文件

    ```go
    path := "./print"
    printObj := c

    	if bs, err := json.Marshal(printObj); err == nil {
    		//error
    		ioutil.WriteFile(path, bs, 0644)
    	}

    ```

### 前端 debug 技巧

1. 普通断点
2. 条件断点
3. catch 断点
4. 代码打印
   1. log, 直接打印内容
   2. reaction, 都基于 form 的, 所以可以通过 form 进行主动调试
5. 暴露全局变量
6. eca 的查看, 可以通过类似 bizFormPresenter.getBean("FormRuntimeController").currentRuntime.fieldStatus.statusManager.Readonly 去查找规则
   field-status.ts field-criteria.ts....

#### 参考文档

[debug 原理](https://zhuanlan.zhihu.com/p/372135871)
