根据 workStudy 可知

1.装饰器的执行时机是代码的编译阶段

2，装饰器的执行顺序为：属性=>方法参数=>方法=>类

那么如何实现类的自动装配呢 ？？？

下段代码是一个类 但是在 constructor 中初始化了 beans（beans 中是多个不同功能的类）

```
export class ExpansionSystem implements IExpansionSystem {
  private beanManager: IBeanManager<IExpansionBeans>;

  constructor(private options: ExpansionSystemOptions) {

    const beans = [
      ManifestManager,
      ExtensionManager,
      ContextManager,
      ContributionKeywordManager,
      EventManager,
      HierarchyManager,
      Devtools
    ];

    const seeds = {
      [ExpansionSeedNames.Manifests]: options.manifests,
      [ExpansionSeedNames.ManifestAssertionOptions]: options.assertionOptions,
      [ExpansionSeedNames.ActivationEventDefinitions]: options.activationEventDefinitions,
      [ExpansionSeedNames.DevtoolsOptions]: options.devtoolsOptions,
      [ExpansionSeedNames.ParentExpansionSystem]: options.parent,
      [ExpansionSeedNames.ExpansionSystem]: this,
    };
    debugger
    this.beanManager = new BeanManager({ seeds, beans });

    this.beanManager.init();
  }
}


//以ManifestManager这个类举例

@Bean(ExpansionFeatureNames.ManifestManager)
export class ManifestManager implements IManifestManager {

  @Autowired(ExpansionSeedNames.Manifests) private manifests: IExpansionManifest[];
  @Autowired(ExpansionSeedNames.ManifestAssertionOptions) private manifestAssertionOptions: ExpansionManifestAssertionOptions;
  @Autowired(ExpansionSeedNames.ActivationEventDefinitions) private activationEventDefinitions: IActivationEventDefinition[];


  @PostConstruct
  private postConstruct() {
    this.manifests = deepCloneManifest(this.manifests);
  }

}
```

由上可见 此处一共需要三个装饰器 分别是 Autowired Bean PostConstruct

在编译过程中的执行顺序是 Autowired PostConstruct Bean

Autowired 装饰器，用来将 Bean 的 Name 和 当前属性名都 实例注入到当前 property 上
PostConstruct 装饰器，当依赖注入完成后执行，用于带有依赖的初始化
Bean 装饰器 将当前的 beanName 放进扩展的对象中

```
  // Autowired 装饰器，用来将 Bean 的那么 和 当前属性名都 实例注入到当前 property 上
  const Autowired: (beanName: string) => PropertyDecorator = (beanName: string) => (
    target,
    propertyName,
  ) => {
    debugger
    const beanProperty = getBeanProperty(target.constructor);
    if (!beanProperty.attributes) {
      beanProperty.attributes = [];
    }

    beanProperty.attributes.push({
      attributeName: propertyName,
      beanName: beanName,
    });
  };

  // Bean 装饰器
  const Bean = (beanName: string) => beanConstructor => {
    debugger
    getBeanProperty(beanConstructor).beanName = beanName;
    return beanConstructor;
  };

  // PostConstruct 装饰器，当依赖注入完成后执行，用于带有依赖的初始化
  const PostConstruct = (target, methodName, descriptor) => {
    debugger
    getBeanProperty(target.constructor).postConstruct = methodName;
  };

  function getBeanProperty(beanConstructor): BeanProperty {
    if (!beanConstructor.prototype[propertyKey]) {
      beanConstructor.prototype[propertyKey] = {};
    }

    return beanConstructor.prototype[propertyKey];
  }



```

经过上面三个装饰器 会在当前类（也就是 ManifestManager） 的原型上生成一个下面的对象 key 可以随便定义 eq：\_\_expansionBeans

```
__expansionBeans:{
    "attributes": [
        {
            "attributeName": "manifests",
            "beanName": "Manifests"
        },
        {
            "attributeName": "manifestAssertionOptions",
            "beanName": "ManifestAssertionOptions"
        },
        {
            "attributeName": "activationEventDefinitions",
            "beanName": "ActivationEventDefinitions"
        }
    ],
    "postConstruct": "postConstruct",
    "beanName": "ManifestManager"
}
```

有了上面的对象 就可以初始化 Beans 了
createBeans 主要是将 ExpansionSystem 中的 beans 进行重新组装 到 this.beans 中

主要属性是
beanName beans 中类的名称
beanClass beans 中类
beanInstance beans 中类的实例

```
class BeanManager {
     init() {
      this.createBeans();
      this.wireBeans();
    }
     createBeans() {
      this.options.beans.forEach((beanClass) => {
        const beanProperty = getBeanProperty(beanClass);
        this.beans[beanProperty.beanName] = {
          beanName: beanProperty.beanName,
          beanClass,
          beanInstance: new beanClass()
        };
      });
    }
}
```

由上可见 主要的功能都在 BeanManager 这个类中下面一起看一下这个类

```
export function BeanManagerCreator<BeanMapType = {}>(options: BeanManagerCreateOptions): IBeanManagers<BeanMapType> {
  const { propertyKey } = options;

  class BeanManager<BeanMapType> implements IDestructible, IBeanManager<BeanMapType> {
    public readonly beans: { [beanName: string]: BeanEntry } = {};
    private options: BeanManagerOptions;

    constructor(options: BeanManagerOptions) {
      this.options = options;
    }

    public destructor() {
      try {
        this.preDestroy();
      } catch (e) {
        //debugger;
      } finally {
        // this.unwireBeans();
      }
    }

    public init() {
      this.createBeans();
      this.wireBeans();
    }

    public getBean<T extends keyof BeanMapType>(beanName: T): BeanMapType[T];
    public getBean<T extends string>(beanName: T): any;
    public getBean(beanName: string) {
      return this.beans[beanName as string].beanInstance as any;
    }

    public wireBean(beanInstance: any) {
      const beanProperty = getBeanProperty(beanInstance.constructor);

      if (beanProperty.attributes) {
        beanProperty.attributes.forEach(attr => {
          beanInstance[attr.attributeName] = this.lookupBeanInstance(attr.beanName);
        });
      }

      if (beanProperty.postConstruct) {
        beanInstance[beanProperty.postConstruct]();
      }
    }

    // 创建 Bean 实例
    private createBeans() {
      this.options.beans.forEach(beanClass => {
        const beanProperty = getBeanProperty(beanClass);
        this.beans[beanProperty.beanName] = {
          beanName: beanProperty.beanName,
          beanClass: beanClass,
          beanInstance: new beanClass(),
        };
      });
    }

    private wireBeans() {
      // 进行依赖注入
      this.autoWireBeans();
      // 执行 postConstruct
      this.postConstruct();
    }

    // 遍历 Bean 实例，对 Bean 实例进行依赖注入
    private autoWireBeans() {
      Object.keys(this.beans).forEach(beanName => {
        const { beanInstance, beanClass } = this.beans[beanName];
        const beanProperty = getBeanProperty(beanClass);

        if (beanProperty.attributes) {
          beanProperty.attributes.forEach(attr => {
            beanInstance[attr.attributeName] = this.lookupBeanInstance(attr.beanName);
          });
        }
      });
    }

    private postConstruct() {
      Object.keys(this.beans).forEach(beanName => {
        const { beanInstance, beanClass } = this.beans[beanName];
        const beanProperty = getBeanProperty(beanClass);

        if (beanProperty.postConstruct) {
          beanInstance[beanProperty.postConstruct] && beanInstance[beanProperty.postConstruct]();
        }
      });
    }

    private preDestroy() {
      Object.keys(this.beans).forEach(beanName => {
        const { beanInstance, beanClass } = this.beans[beanName];
        const beanProperty = getBeanProperty(beanClass);

        if (beanProperty.preDestroy) {
          try {
            beanInstance[beanProperty.preDestroy] && beanInstance[beanProperty.preDestroy]();
          } catch (e) {
            console.error(e);
           // debugger;
          }
        }

        try{
          if (beanInstance.destructor && beanInstance.destructor !== beanInstance[beanProperty.preDestroy]) {
            beanInstance.destructor();
          }
        } catch (e) {
          console.error(e);
          //debugger;
        }


      });
    }

    private unwireBeans() {
      Object.keys(this.beans).forEach(beanName => {
        const { beanInstance, beanClass } = this.beans[beanName];
        const beanProperty = getBeanProperty(beanClass);

        if (beanProperty.attributes) {
          beanProperty.attributes.forEach(attr => {
            beanInstance[attr.attributeName] = undefined;
          });
        }
      });
    }

    private lookupBeanInstance(beanName: string) {
      if (this.options.seeds && this.options.seeds.hasOwnProperty(beanName)) {
        return this.options.seeds[beanName];
      }

      if (this.beans[beanName]) {
        return this.beans[beanName].beanInstance;
      }

      console.error(`找不到 ${beanName} 的 Bean 实例`);
    }
  }

  // Bean 装饰器
  const Bean = (beanName: string) => beanConstructor => {
    debugger
    getBeanProperty(beanConstructor).beanName = beanName;
    return beanConstructor;
  };

  // Autowired 装饰器，用来将 Bean 实例注入到当前 property 上
  const Autowired: (beanName: string) => PropertyDecorator = (beanName: string) => (
    target,
    propertyName,
  ) => {
    debugger
    const beanProperty = getBeanProperty(target.constructor);
    if (!beanProperty.attributes) {
      beanProperty.attributes = [];
    }

    beanProperty.attributes.push({
      attributeName: propertyName,
      beanName: beanName,
    });
  };

  // PostConstruct 装饰器，当依赖注入完成后执行，用于带有依赖的初始化
  const PostConstruct = (target, methodName, descriptor) => {
    getBeanProperty(target.constructor).postConstruct = methodName;
  };

  // PreDestroy 装饰器，当Beans销毁时，用于销毁前的内部销毁函数
  const PreDestroy = (target, methodName, descriptor) => {
    getBeanProperty(target.constructor).preDestroy = methodName;
  };

  function getBeanProperty(beanConstructor): BeanProperty {
    if (!beanConstructor.prototype[propertyKey]) {
      beanConstructor.prototype[propertyKey] = {};
    }

    return beanConstructor.prototype[propertyKey];
  }

  return {
    BeanManager,
    Bean,
    Autowired,
    PostConstruct,
    PreDestroy,
  } as IBeanManagers<BeanMapType>;
}
```
