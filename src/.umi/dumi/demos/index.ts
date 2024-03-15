// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';

export default {
  '2022.4.18分享-demo': {
    component: function DumiDemo() {
  var React;
  exports.Type = void 0;
  //布尔、数字、字符串、数组、元组:已知元素数量和类型的数组、枚举、Void、Null 和 Undefined、any、never类型:永不存在的值的类型
  //元组:已知元素数量和类型的数组
  var arr3 = ['hello', 10];
  arr3 = [10, 'hello'];
  arr3[0] = 0;
  arr3[0] = 'hi'; //访问一个越界的元素,会使用联合类型  并集

  arr3.push(true);
  arr3.push(100);
  arr3.push('hi'); //枚举  默认编号0  1   2，可以手动改编号
  //声明枚举对象的关键字是使用enum，枚举成员一但定义就不可改变

  var Color;

  (function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
  })(Color || (Color = {}));

  Color.Blue = 3;
  var color = Color.Green;
  console.log('color', color); //1
  //枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字

  var colorName = Color[2];
  console.log('colorName', colorName); //blue
  //联合类型 string | number

  var unit = 1; //交叉类型 将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

  var xxx = undefined;
  var stu1 = {
    name: 'Tom',
    age: 23,
    school: '清华'
  };
  var stu2 = {
    name: 'Tom',
    age: 23
  };

  var Type = exports.Type = function Type() {
    return /*#__PURE__*/React.createElement("div", null, '基础类型');
  };
},
    previewerProps: {"sources":{"_":{"tsx":"\n\n//布尔、数字、字符串、数组、元组:已知元素数量和类型的数组、枚举、Void、Null 和 Undefined、any、never类型:永不存在的值的类型\n\n//元组:已知元素数量和类型的数组\nlet arr3: [string, number] = ['hello', 10];\narr3 = [10, 'hello'];\narr3[0] = 0\narr3[0] = 'hi'\n//访问一个越界的元素,会使用联合类型  并集\narr3.push(true)\narr3.push(100)\narr3.push('hi')\n\n//枚举  默认编号0  1   2，可以手动改编号\n//声明枚举对象的关键字是使用enum，枚举成员一但定义就不可改变\nenum Color {\n    Red=1,\n    Green,\n    Blue\n}\nColor.Blue = 3\nlet color: Color = Color.Green;\nconsole.log('color',color) //1\n//枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字\nlet colorName: string = Color[2];\n\nconsole.log('colorName',colorName)//blue\n\n\n//联合类型 string | number\nlet unit : string | number = 1\n\n//交叉类型 将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性\nlet xxx : string & number = undefined\ninterface Person {\n    name: string\n    age: number\n}\n\ninterface Student {\n    school: string\n}\ntype StudentInfo = Person & Student\n\ninterface StudentInfo1 extends Person , Student{\n    color:string\n}\n\nconst stu1: StudentInfo = {\n    name: 'Tom',\n    age: 23,\n    school: '清华'\n}\nconst stu2: StudentInfo = {\n    name: 'Tom',\n    age: 23,\n}\n\n\n\n\nexport const Type= ()=>{\n\n    return(\n        <div>{'基础类型'}</div>\n    )\n\n}"}},"dependencies":{},"identifier":"2022.4.18分享-demo"},
  },
  '2022.4.18分享-demo-1': {
    component: function DumiDemo() {
  var React;

  var _interopRequireDefault = require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/interopRequireDefault.js")["default"];

  exports.Front = void 0;

  var _get2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/get.js"));

  var _getPrototypeOf2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"));

  var _inherits2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/inherits.js"));

  var _createSuper2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/createSuper.js"));

  var _classCallCheck2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"));

  var _createClass2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/createClass.js"));

  var Front = exports.Front = /*#__PURE__*/function () {
    //基类、超类、父类
    //属性和方法默认为 public,
    //修饰符public 公共的  都可以访问； private私有的，声明它的类的外部(子类和外部)不可访问；protected受保护的，子类可以访问，外部不能访问
    //修饰符 readonly
    // protected name: string;
    //类的静态属性，不需要实例化类就可以直接访问的属性,实例不可访问
    // private readonly age: number;
    function Front(name, age) {// this.name = name;
      // this.age=age

      (0, _classCallCheck2["default"])(this, Front);
      this.name = name;
      this.age = age;
    }

    (0, _createClass2["default"])(Front, [{
      key: "coding",
      value: function coding() {
        var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        console.log("".concat(this.name, " \u6572\u4E86").concat(this.age, " ").concat(columns, "\u884C\u4EE3\u7801"));
      }
    }]);
    return Front;
  }();

  Front.company = '企企科技';
  var czp = new Front('czp', 18);
  console.log(czp.company);
  console.log(czp.age);
  console.log(Front.company); //派生类、子类

  var Czp = /*#__PURE__*/function (_Front) {
    (0, _inherits2["default"])(Czp, _Front);

    var _super = (0, _createSuper2["default"])(Czp);

    function Czp(name, age) {
      (0, _classCallCheck2["default"])(this, Czp);
      // Constructors for derived classes must contain a 'super' call
      //TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.

      /*
      * 写了constructor就必须调用 super()，执行基类的构造函数。
      * 在构造函数里访问 this的属性之前一定要调用 super()。*/
      return _super.call(this, name, age);
    }

    (0, _createClass2["default"])(Czp, [{
      key: "coding",
      value: function coding() {
        var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        (0, _get2["default"])((0, _getPrototypeOf2["default"])(Czp.prototype), "coding", this).call(this, columns);
        console.log("".concat(this.name, " \u590D\u503C\u4E86 ").concat(columns, "\u884C\u4EE3\u7801"));
      }
    }]);
    return Czp;
  }(Front); //抽象类，不能实例化，只能被继承的类


  var Person = /*#__PURE__*/(0, _createClass2["default"])(function Person() {
    (0, _classCallCheck2["default"])(this, Person);
    this.name = void 0;
  });

  var Zxp = /*#__PURE__*/function (_Person) {
    (0, _inherits2["default"])(Zxp, _Person);

    var _super2 = (0, _createSuper2["default"])(Zxp);

    function Zxp() {
      (0, _classCallCheck2["default"])(this, Zxp);
      return _super2.apply(this, arguments);
    }

    return (0, _createClass2["default"])(Zxp);
  }(Person);

  var p = new Person();
},
    previewerProps: {"sources":{"_":{"tsx":"export class Front {\n    //基类、超类、父类\n    //属性和方法默认为 public,\n    //修饰符public 公共的  都可以访问； private私有的，声明它的类的外部(子类和外部)不可访问；protected受保护的，子类可以访问，外部不能访问\n    //修饰符 readonly\n    // protected name: string;\n    //类的静态属性，不需要实例化类就可以直接访问的属性,实例不可访问\n    static company:string = '企企科技';\n    // private readonly age: number;\n    constructor(protected readonly name: string, readonly age:number) {\n        // this.name = name;\n        // this.age=age\n    }\n    coding(columns: number = 0) {\n        console.log(`${this.name} 敲了${this.age} ${columns}行代码`);\n    }\n}\nlet czp = new Front('czp',18)\nconsole.log(czp.company)\nconsole.log(czp.age)\nconsole.log(Front.company)\n//派生类、子类\nclass Czp extends Front {\n    constructor(name: string, age: number) {\n        // Constructors for derived classes must contain a 'super' call\n        //TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.\n        /*\n        * 写了constructor就必须调用 super()，执行基类的构造函数。\n        * 在构造函数里访问 this的属性之前一定要调用 super()。*/\n        super(name,age);\n    }\n    coding(columns = 5) {\n        super.coding(columns);\n        console.log(`${this.name} 复值了 ${columns}行代码`);\n    }\n}\n\n//抽象类，不能实例化，只能被继承的类\nabstract class Person {\n    name: string;\n\n    //抽象类中的抽象方法，不能有方法体，子类必须重写这个方法\n    abstract coding(): void\n}\n\nclass Zxp extends Person{\n}\nlet p: Person = new Person();\n\n"}},"dependencies":{},"identifier":"2022.4.18分享-demo-1"},
  },
  '2022.4.18分享-demo-2': {
    component: function DumiDemo() {
  var React;

  var _interopRequireDefault = require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/interopRequireDefault.js")["default"];

  exports.Front = void 0;

  var _get2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/get.js"));

  var _getPrototypeOf2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"));

  var _inherits2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/inherits.js"));

  var _createSuper2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/createSuper.js"));

  var _classCallCheck2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/classCallCheck.js"));

  var _createClass2 = _interopRequireDefault(require("/Users/wangshun/Desktop/learn/node_modules/@babel/runtime/helpers/esm/createClass.js"));

  var Front = exports.Front = /*#__PURE__*/function () {
    //基类、超类、父类
    //属性和方法默认为 public,
    //修饰符public 公共的  都可以访问； private私有的，声明它的类的外部(子类和外部)不可访问；protected受保护的，子类可以访问，外部不能访问
    //修饰符 readonly
    // protected name: string;
    //类的静态属性，不需要实例化类就可以直接访问的属性,实例不可访问
    // private readonly age: number;
    function Front(name, age) {// this.name = name;
      // this.age=age

      (0, _classCallCheck2["default"])(this, Front);
      this.name = name;
      this.age = age;
    }

    (0, _createClass2["default"])(Front, [{
      key: "coding",
      value: function coding() {
        var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        console.log("".concat(this.name, " \u6572\u4E86").concat(this.age, " ").concat(columns, "\u884C\u4EE3\u7801"));
      }
    }]);
    return Front;
  }();

  Front.company = '企企科技';
  var czp = new Front('czp', 18);
  console.log(czp.company);
  console.log(czp.age);
  console.log(Front.company); //派生类、子类

  var Czp = /*#__PURE__*/function (_Front) {
    (0, _inherits2["default"])(Czp, _Front);

    var _super = (0, _createSuper2["default"])(Czp);

    function Czp(name, age) {
      (0, _classCallCheck2["default"])(this, Czp);
      // Constructors for derived classes must contain a 'super' call
      //TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.

      /*
      * 写了constructor就必须调用 super()，执行基类的构造函数。
      * 在构造函数里访问 this的属性之前一定要调用 super()。*/
      return _super.call(this, name, age);
    }

    (0, _createClass2["default"])(Czp, [{
      key: "coding",
      value: function coding() {
        var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        (0, _get2["default"])((0, _getPrototypeOf2["default"])(Czp.prototype), "coding", this).call(this, columns);
        console.log("".concat(this.name, " \u590D\u503C\u4E86 ").concat(columns, "\u884C\u4EE3\u7801"));
      }
    }]);
    return Czp;
  }(Front); //抽象类，不能实例化，只能被继承的类


  var Person = /*#__PURE__*/(0, _createClass2["default"])(function Person() {
    (0, _classCallCheck2["default"])(this, Person);
    this.name = void 0;
  });

  var Zxp = /*#__PURE__*/function (_Person) {
    (0, _inherits2["default"])(Zxp, _Person);

    var _super2 = (0, _createSuper2["default"])(Zxp);

    function Zxp() {
      (0, _classCallCheck2["default"])(this, Zxp);
      return _super2.apply(this, arguments);
    }

    return (0, _createClass2["default"])(Zxp);
  }(Person);

  var p = new Person();
},
    previewerProps: {"sources":{"_":{"tsx":"export class Front {\n    //基类、超类、父类\n    //属性和方法默认为 public,\n    //修饰符public 公共的  都可以访问； private私有的，声明它的类的外部(子类和外部)不可访问；protected受保护的，子类可以访问，外部不能访问\n    //修饰符 readonly\n    // protected name: string;\n    //类的静态属性，不需要实例化类就可以直接访问的属性,实例不可访问\n    static company:string = '企企科技';\n    // private readonly age: number;\n    constructor(protected readonly name: string, readonly age:number) {\n        // this.name = name;\n        // this.age=age\n    }\n    coding(columns: number = 0) {\n        console.log(`${this.name} 敲了${this.age} ${columns}行代码`);\n    }\n}\nlet czp = new Front('czp',18)\nconsole.log(czp.company)\nconsole.log(czp.age)\nconsole.log(Front.company)\n//派生类、子类\nclass Czp extends Front {\n    constructor(name: string, age: number) {\n        // Constructors for derived classes must contain a 'super' call\n        //TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.\n        /*\n        * 写了constructor就必须调用 super()，执行基类的构造函数。\n        * 在构造函数里访问 this的属性之前一定要调用 super()。*/\n        super(name,age);\n    }\n    coding(columns = 5) {\n        super.coding(columns);\n        console.log(`${this.name} 复值了 ${columns}行代码`);\n    }\n}\n\n//抽象类，不能实例化，只能被继承的类\nabstract class Person {\n    name: string;\n\n    //抽象类中的抽象方法，不能有方法体，子类必须重写这个方法\n    abstract coding(): void\n}\n\nclass Zxp extends Person{\n}\nlet p: Person = new Person();\n\n"}},"dependencies":{},"identifier":"2022.4.18分享-demo-2"},
  },
};
