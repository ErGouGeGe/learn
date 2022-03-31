### Container

#### Array

定义数组的方法

1. `var arr1 [5]int`
2. `arr2 := [3]int{1,2,3}` 这样的必须要有默认值
3. `arr3 := [...]int{2,4,6,3,4}`
4. 二维数组 `var grid = [4][5]int`

数组的遍历

```
sum := 0
for _,v := range arr2 {
    sum +=v
}
```

1. 可以通过\_省略变量
2. 不单单 range，任何地方都可以用\_省略变量

**数组是值类型，不是引用类型**
调用`func f(arr [10]int)`会拷贝数组

**[5]int 和[3]int 不是同一类型**

```
func printArray(arr [5]int){}
printArray(arr2)
//报错
printArray(arr3)
//不报错
//arr[3]和arr[5] 不是同一类型
```

#### Slice

slice 本身没有数据 是对底层 array 的一个 view

```
arr := [...]int{0,1,2,3,4,5,6}
s:=arr[2:6]
s[0] = 10
```

arr 变[0 1 10 3 4 5 6]

##### reslice

```
s := [2,6]
s = s[:3]
s = s[1:]
s = arr[:]
```

##### slice 的扩展

```
arr := [...]int{0,1,2,3,4,5,6,7}
s1 := arr[2:6]
s2 := s1[3:5]
//s1 [2,3,4,5]
//s2 [5,6]
```

是因为 s1 虽然只有 2345 四位 但是因为是 view 所以后面的 index 也是存在的但是不可取 所以 s2 能取到

**slice 可以向后扩展，不可以向前扩展**

**s[i]不可以超越 len(s),向后扩展不能超越底层数组 cap(s)**

##### slice 的实现

slice 包含 3 种

1. ptr 指向 slice 的第一个元素
2. len 是 slice 当前的的长度
3. cap 是 silce 的长度和 arr 剩余的长度 只要不超过 cap slice 都可以扩展 cap 是以 8 为单位扩展的

##### 向 slice 添加元素

1. 添加元素时如果超越 cap，系统会重新分配更大的底层数组
