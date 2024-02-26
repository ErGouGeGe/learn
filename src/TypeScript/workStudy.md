装饰器

先总结

装饰器执行顺序
装饰器的执行顺序为：属性=>方法参数=>方法=>类
其中，
类装饰器、方法参数装饰器的执行顺序是：从后往前
属性装饰器、方法装饰器的执行顺序是：从上至下

装饰器的使用场景

装饰器的使用场景主要是为了给类添加一些功能，比如日志、权限、缓存等功能，这些功能都可以用装饰器来实现。
装饰器的使用场景还包括：
为类添加一些静态属性，这些属性可以被类本身使用，也可以被类实例使用

装饰器执行时机

装饰器对类的行为的改变，代码编译时发生的不是 TypeScript 编译，而是 js 执行机中编译阶段）而不是运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。
Node.js 环境中模块一加载时就会执行

普通装饰器 无法传参，在类的上一行使用@装饰器名字
装饰器工厂，可传参，在类的上一行使用@装饰器名字(装饰器参数)

使用普通装饰器：

```
function logClass(param:any){
  console.log(param);  //param就是当前类，此处输出 Animal类
}

@logClass
class Animal{
  constructor(){

  }
}
```

使用装饰器工厂：

```
//此种情况为无法传参
function logClass(param:any){
  param.prototype.name = 'xxx'
  param.prototype.eat = function(){
    console.log('eat...');
  }
}

@logClass
class Animal{
  constructor(){

  }
}
let a:any = new Animal()
console.log(a.name);   //xxx
a.eat()   //eat...


or

//此种情况为可以传参
function logClass(param:any){    //param为装饰器传参
  return function(target:any){   //target为调用装饰器的类
    target.prototype.name = param
  }
}

@logClass('wangwang')
class Animal{
  constructor(){

  }
}
let a:any = new Animal()
console.log(a.name);   //wangwang

@logClass('web')
class Work{
  constructor(){

  }
}
let w:any = new Work()
console.log(w.name);  //web

```

类装饰器

先定义一个基本类

```
class Animal{
  name:string;
  constructor(){
    this.name = 'Animal构造函数中的name'
  }
}
let a:any = new Animal()
console.log(a.name);
```

使用类装饰器重写类的构造函数和方法:

```
function logClass(target:any){
  return class extends target{
    name:any = '装饰器修改的name'
    eat(){
      console.log('xxxx');
    }
  }
}

@logClass
class Animal{
  name:string;
  constructor(){
    this.name = 'Animal构造函数中的name'
  }
  eat(){
    console.log('eat...');
  }
}
let a:any = new Animal()
console.log(a.name);   //装饰器修改的name
a.eat()   //xxxx

```

属性装饰器
属性装饰器表达式会在运行时被当作函数调用，传两个参数

对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
当前属性的名称

```
function logProperty(param:any){
  return function(target:any,attr:any){
    console.log(target);
    console.log(attr);
    target[attr] = param   //这里的target相当于类装饰器里的target.prototype
  }
}

class Animal{
  @logProperty('hello')    //这个属性装饰器装饰当前name属性
  name:string|undefined;
  constructor(){

  }
}
let a:any = new Animal()
console.log(a.name);   //hello

```

方法装饰器
应用在方法的属性描述上，可以用来监视、修改、替换方法定义
三个参数:

对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
成员的名字
成员的属性描述符

```
function log(param:any){
  return function(target:any,name:any,desc:any){
    console.log(target); // HTTPClient类的原型对象
    console.log(name);   // 装饰方法的名字
    console.log(desc);   // 装饰方法的属性描述符
  }
}
class HTTPClient{
  private url:string|undefined
  @log('www.baidu.com')
  getData(){
    console.log('getData');
  }
}


替换装饰的方法

function log(param:any){
  return function(target:any,name:any,desc:any){
    desc.value = function(...args:any[]){
      args = args.map((v:any)=>{
        return String(v)
      })
      console.log(args);
    }
  }
}
class HTTPClient{
  private url:string|undefined
  @log('www.baidu.com')
  getData(...args:any[]){
    console.log('getData');
  }
}

let http = new HTTPClient()
http.getData('1','2')    // [ '1', '2' ]

上面替换了 HTTPClient 类中的 getData 方法，而不是修改它。可以通过 apply 来修改成员方法，不改变原来的逻辑。

function log(param:any){
  return function(target:any,name:any,desc:any){
    //  1.保存当前方法
    const currentMethod = desc.value

    desc.value = function(...args:any[]){
      args = args.map((v:any)=>{
        return String(v)
      })
      console.log(args);
      currentMethod.apply(this,args)
    }
  }
}
class HTTPClient{
  private url:string|undefined
  @log('www.baidu.com')
  getData(...args:any[]){
    console.log('getData');
  }
}

let http = new HTTPClient()
http.getData('1','2')   // [ '1', '2' ]
                        // getData


```

方法参数装饰器
参数装饰器表达式会在运行时当作函数被调用，可以使参数装饰器为类的原型增加一些元素数据
三个参数：

对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
方法的名字
参数在函数参数列表中的索引

```
function log(param:any){
  return function(target:any,name:any,paramsIndex:any){
    console.log(paramsIndex);   // 0
    target.url = param
  }
}
class HTTPClient{
  url:string|undefined
  getData(@log('xxx')value:any){
    console.log(value);
  }
}

let http = new HTTPClient()
http.getData(1234)   // 1234
console.log(http.url);  // xxx

```
