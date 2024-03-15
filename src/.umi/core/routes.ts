// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/wangshun/Desktop/learn/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/wangshun/Desktop/learn/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/wangshun/Desktop/learn/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/77/2022.4",
        "component": require('/Users/wangshun/Desktop/learn/src/77/2022.4.18分享.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/2022.4.18分享.md",
          "updatedTime": 1710492088106,
          "slugs": [
            {
              "depth": 2,
              "value": "2022.4.18分享",
              "heading": "2022418分享"
            },
            {
              "depth": 3,
              "value": "1、个人的一些定位代码的思路：用来处理bug、看某块的代码实现",
              "heading": "1个人的一些定位代码的思路用来处理bug看某块的代码实现"
            },
            {
              "depth": 3,
              "value": "2、业务",
              "heading": "2业务"
            },
            {
              "depth": 3,
              "value": "3、ts的一些基础知识",
              "heading": "3ts的一些基础知识"
            },
            {
              "depth": 3,
              "value": "type",
              "heading": "type"
            },
            {
              "depth": 4,
              "value": "interface",
              "heading": "interface"
            },
            {
              "depth": 4,
              "value": "class",
              "heading": "class"
            }
          ],
          "title": "2022.4.18分享",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "2022.4.18分享 - XTT"
      },
      {
        "path": "/77/jwt",
        "component": require('/Users/wangshun/Desktop/learn/src/77/JWT.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/JWT.md",
          "updatedTime": 1708927800000,
          "slugs": [],
          "group": {
            "path": "/77",
            "title": "77"
          },
          "title": "JWT"
        },
        "title": "JWT - XTT"
      },
      {
        "path": "/77/autowire",
        "component": require('/Users/wangshun/Desktop/learn/src/77/autowire.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/autowire.md",
          "updatedTime": 1708927800000,
          "slugs": [],
          "group": {
            "path": "/77",
            "title": "77"
          },
          "title": "Autowire"
        },
        "title": "Autowire - XTT"
      },
      {
        "path": "/77/channel",
        "component": require('/Users/wangshun/Desktop/learn/src/77/channel.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/channel.md",
          "updatedTime": 1710492187186,
          "slugs": [
            {
              "depth": 3,
              "value": "协程",
              "heading": "协程"
            },
            {
              "depth": 4,
              "value": "启动一个go协程",
              "heading": "启动一个go协程"
            },
            {
              "depth": 4,
              "value": "启动多个go协程",
              "heading": "启动多个go协程"
            },
            {
              "depth": 3,
              "value": "通道",
              "heading": "通道"
            },
            {
              "depth": 4,
              "value": "通道的声明",
              "heading": "通道的声明"
            },
            {
              "depth": 4,
              "value": "通道的初始化",
              "heading": "通道的初始化"
            },
            {
              "depth": 4,
              "value": "使用通道发送和接收数据",
              "heading": "使用通道发送和接收数据"
            },
            {
              "depth": 4,
              "value": "通道的关闭",
              "heading": "通道的关闭"
            },
            {
              "depth": 4,
              "value": "通道的容量与长度",
              "heading": "通道的容量与长度"
            },
            {
              "depth": 4,
              "value": "缓冲通道与无缓冲通道",
              "heading": "缓冲通道与无缓冲通道"
            },
            {
              "depth": 4,
              "value": "WaitGroup",
              "heading": "waitgroup"
            },
            {
              "depth": 3,
              "value": "企企项目中的应用",
              "heading": "企企项目中的应用"
            },
            {
              "depth": 3,
              "value": "更多资料",
              "heading": "更多资料"
            }
          ],
          "title": "协程",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "协程 - XTT"
      },
      {
        "path": "/77/debug分享",
        "component": require('/Users/wangshun/Desktop/learn/src/77/debug分享.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/debug分享.md",
          "updatedTime": 1709318224380,
          "slugs": [
            {
              "depth": 1,
              "value": "debug",
              "heading": "debug"
            },
            {
              "depth": 2,
              "value": "debug 的原理",
              "heading": "debug-的原理"
            },
            {
              "depth": 3,
              "value": "编译原理",
              "heading": "编译原理"
            },
            {
              "depth": 3,
              "value": "debugger原理",
              "heading": "debugger原理"
            },
            {
              "depth": 3,
              "value": "debugger adaptor protocol",
              "heading": "debugger-adaptor-protocol"
            },
            {
              "depth": 2,
              "value": "debug 的技巧案例",
              "heading": "debug-的技巧案例"
            },
            {
              "depth": 3,
              "value": "go-debug技巧分享",
              "heading": "go-debug技巧分享"
            },
            {
              "depth": 3,
              "value": "前端debug技巧",
              "heading": "前端debug技巧"
            },
            {
              "depth": 4,
              "value": "参考文档",
              "heading": "参考文档"
            }
          ],
          "title": "debug",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "debug - XTT"
      },
      {
        "path": "/77/git",
        "component": require('/Users/wangshun/Desktop/learn/src/77/git.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/git.md",
          "updatedTime": 1710492326448,
          "slugs": [
            {
              "depth": 3,
              "value": "git 是什么?",
              "heading": "git-是什么"
            },
            {
              "depth": 4,
              "value": "基本操作",
              "heading": "基本操作"
            },
            {
              "depth": 4,
              "value": "commit 规范",
              "heading": "commit-规范"
            },
            {
              "depth": 4,
              "value": "commit 规范",
              "heading": "commit-规范-1"
            }
          ],
          "title": "git 是什么?",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "git 是什么? - XTT"
      },
      {
        "path": "/77/go常规泛型",
        "component": require('/Users/wangshun/Desktop/learn/src/77/go常规泛型.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/go常规泛型.md",
          "updatedTime": 1710493083359,
          "slugs": [],
          "group": {
            "path": "/77",
            "title": "77"
          },
          "title": "Go常规泛型"
        },
        "title": "Go常规泛型 - XTT"
      },
      {
        "path": "/77/graphiql",
        "component": require('/Users/wangshun/Desktop/learn/src/77/graphiql.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/graphiql.md",
          "updatedTime": 1709318822337,
          "slugs": [
            {
              "depth": 2,
              "value": "graphiql 缓存跟踪",
              "heading": "graphiql-缓存跟踪"
            },
            {
              "depth": 3,
              "value": "解决问题",
              "heading": "解决问题"
            },
            {
              "depth": 3,
              "value": "只能跟踪一下",
              "heading": "只能跟踪一下"
            },
            {
              "depth": 3,
              "value": "问题",
              "heading": "问题"
            },
            {
              "depth": 3,
              "value": "再次尝试解决问题",
              "heading": "再次尝试解决问题"
            },
            {
              "depth": 3,
              "value": "分析问题",
              "heading": "分析问题"
            },
            {
              "depth": 3,
              "value": "解决问题",
              "heading": "解决问题-1"
            },
            {
              "depth": 3,
              "value": "总结tip",
              "heading": "总结tip"
            }
          ],
          "title": "graphiql 缓存跟踪",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "graphiql 缓存跟踪 - XTT"
      },
      {
        "path": "/77/yaml",
        "component": require('/Users/wangshun/Desktop/learn/src/77/yaml.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/yaml.md",
          "updatedTime": 1709318838206,
          "slugs": [
            {
              "depth": 2,
              "value": "插件分享",
              "heading": "插件分享"
            },
            {
              "depth": 2,
              "value": "逗号表达式",
              "heading": "逗号表达式"
            },
            {
              "depth": 2,
              "value": "yaml 是什么",
              "heading": "yaml-是什么"
            },
            {
              "depth": 3,
              "value": "基本语法",
              "heading": "基本语法"
            },
            {
              "depth": 3,
              "value": "类型",
              "heading": "类型"
            }
          ],
          "title": "插件分享",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "插件分享 - XTT"
      },
      {
        "path": "/77/从搜索谈到自行车维修",
        "component": require('/Users/wangshun/Desktop/learn/src/77/从搜索谈到自行车维修.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/从搜索谈到自行车维修.md",
          "updatedTime": 1709318669505,
          "slugs": [
            {
              "depth": 1,
              "value": "从搜索谈到自行车维修",
              "heading": "从搜索谈到自行车维修"
            },
            {
              "depth": 2,
              "value": "谷歌搜索",
              "heading": "谷歌搜索"
            },
            {
              "depth": 2,
              "value": "百度搜索",
              "heading": "百度搜索"
            },
            {
              "depth": 2,
              "value": "其他",
              "heading": "其他"
            },
            {
              "depth": 2,
              "value": "程序员搜索",
              "heading": "程序员搜索"
            },
            {
              "depth": 2,
              "value": "正确的搜索步骤",
              "heading": "正确的搜索步骤"
            },
            {
              "depth": 2,
              "value": "或者我们直接问 chatgpt",
              "heading": "或者我们直接问-chatgpt"
            },
            {
              "depth": 2,
              "value": "搜搜内容",
              "heading": "搜搜内容"
            }
          ],
          "title": "从搜索谈到自行车维修",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "从搜索谈到自行车维修 - XTT"
      },
      {
        "path": "/77/你可能不知道的_sourcemap",
        "component": require('/Users/wangshun/Desktop/learn/src/77/你可能不知道的_sourcemap.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/你可能不知道的_sourcemap.md",
          "updatedTime": 1709318783936,
          "slugs": [
            {
              "depth": 1,
              "value": "名人名言",
              "heading": "名人名言"
            },
            {
              "depth": 3,
              "value": "考虑问题的一般步骤",
              "heading": "考虑问题的一般步骤"
            },
            {
              "depth": 2,
              "value": "介绍",
              "heading": "介绍"
            },
            {
              "depth": 3,
              "value": "👽 简单说",
              "heading": "-简单说"
            },
            {
              "depth": 3,
              "value": "👀 看一下",
              "heading": "-看一下"
            },
            {
              "depth": 2,
              "value": "❓怎么启用",
              "heading": "怎么启用"
            },
            {
              "depth": 2,
              "value": "示例",
              "heading": "示例"
            },
            {
              "depth": 2,
              "value": "❓如何生成",
              "heading": "如何生成"
            },
            {
              "depth": 2,
              "value": "🔧 自己试验一下",
              "heading": "-自己试验一下"
            },
            {
              "depth": 4,
              "value": "其他",
              "heading": "其他"
            },
            {
              "depth": 4,
              "value": "webpack 相关",
              "heading": "webpack-相关"
            },
            {
              "depth": 2,
              "value": "soucemap细节",
              "heading": "soucemap细节"
            },
            {
              "depth": 2,
              "value": "稍微总结一下",
              "heading": "稍微总结一下"
            },
            {
              "depth": 3,
              "value": "🤔算法&思想",
              "heading": "算法思想"
            },
            {
              "depth": 3,
              "value": "⁉️为什么这么处理?",
              "heading": "️为什么这么处理"
            },
            {
              "depth": 3,
              "value": "参考地址",
              "heading": "参考地址"
            }
          ],
          "title": "名人名言",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "名人名言 - XTT"
      },
      {
        "path": "/77/合并分支",
        "component": require('/Users/wangshun/Desktop/learn/src/77/合并分支.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/合并分支.md",
          "updatedTime": 1708927800000,
          "slugs": [],
          "group": {
            "path": "/77",
            "title": "77"
          },
          "title": "合并分支"
        },
        "title": "合并分支 - XTT"
      },
      {
        "path": "/77/奇怪的_fiber",
        "component": require('/Users/wangshun/Desktop/learn/src/77/奇怪的_fiber.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/奇怪的_fiber.md",
          "updatedTime": 1709318795183,
          "slugs": [
            {
              "depth": 1,
              "value": "奇怪的 fiber",
              "heading": "奇怪的-fiber"
            },
            {
              "depth": 2,
              "value": "名人名言",
              "heading": "名人名言"
            },
            {
              "depth": 2,
              "value": "起因",
              "heading": "起因"
            },
            {
              "depth": 2,
              "value": "各种彻底搞懂",
              "heading": "各种彻底搞懂"
            },
            {
              "depth": 2,
              "value": "两个🌰",
              "heading": "两个"
            },
            {
              "depth": 2,
              "value": "说在前边",
              "heading": "说在前边"
            },
            {
              "depth": 2,
              "value": "一、心智模型",
              "heading": "一心智模型"
            },
            {
              "depth": 3,
              "value": "代数效应",
              "heading": "代数效应"
            },
            {
              "depth": 2,
              "value": "二、怎么实现",
              "heading": "二怎么实现"
            },
            {
              "depth": 2,
              "value": "回到 react",
              "heading": "回到-react"
            },
            {
              "depth": 3,
              "value": "react 做了什么?",
              "heading": "react-做了什么"
            },
            {
              "depth": 4,
              "value": "号外",
              "heading": "号外"
            },
            {
              "depth": 3,
              "value": "fiber 是什么?",
              "heading": "fiber-是什么"
            },
            {
              "depth": 3,
              "value": "针对 fiber 的疑问",
              "heading": "针对-fiber-的疑问"
            },
            {
              "depth": 2,
              "value": "fiber 的结构",
              "heading": "fiber-的结构"
            },
            {
              "depth": 4,
              "value": "队列:",
              "heading": "队列"
            },
            {
              "depth": 4,
              "value": "节点:",
              "heading": "节点"
            },
            {
              "depth": 2,
              "value": "1. 依托队列, fiber 怎么实现的可中断?",
              "heading": "1-依托队列-fiber-怎么实现的可中断"
            },
            {
              "depth": 2,
              "value": "打断了怎么恢复, 保证正确性?",
              "heading": "打断了怎么恢复-保证正确性"
            },
            {
              "depth": 2,
              "value": "整个流程",
              "heading": "整个流程"
            },
            {
              "depth": 3,
              "value": "高频问题?",
              "heading": "高频问题"
            },
            {
              "depth": 4,
              "value": "极简 hooks 实现参考",
              "heading": "极简-hooks-实现参考"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ],
          "title": "奇怪的 fiber",
          "group": {
            "path": "/77",
            "title": "77"
          }
        },
        "title": "奇怪的 fiber - XTT"
      },
      {
        "path": "/77/文件上传",
        "component": require('/Users/wangshun/Desktop/learn/src/77/文件上传.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/77/文件上传.md",
          "updatedTime": 1709318976735,
          "slugs": [],
          "group": {
            "path": "/77",
            "title": "77"
          },
          "title": "文件上传"
        },
        "title": "文件上传 - XTT"
      },
      {
        "path": "/go/container",
        "component": require('/Users/wangshun/Desktop/learn/src/GO/container.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/GO/container.md",
          "updatedTime": 1648706791000,
          "slugs": [
            {
              "depth": 3,
              "value": "Container",
              "heading": "container"
            },
            {
              "depth": 4,
              "value": "Array",
              "heading": "array"
            },
            {
              "depth": 4,
              "value": "Slice",
              "heading": "slice"
            },
            {
              "depth": 5,
              "value": "reslice",
              "heading": "reslice"
            },
            {
              "depth": 5,
              "value": "slice 的扩展",
              "heading": "slice-的扩展"
            },
            {
              "depth": 5,
              "value": "slice 的实现",
              "heading": "slice-的实现"
            },
            {
              "depth": 5,
              "value": "向 slice 添加元素",
              "heading": "向-slice-添加元素"
            }
          ],
          "title": "Container",
          "group": {
            "path": "/go",
            "title": "GO"
          }
        },
        "title": "Container - XTT"
      },
      {
        "path": "/go",
        "component": require('/Users/wangshun/Desktop/learn/src/GO/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/GO/index.md",
          "updatedTime": 1648706791000,
          "slugs": [
            {
              "depth": 3,
              "value": "Basic grammar",
              "heading": "basic-grammar"
            },
            {
              "depth": 4,
              "value": "变量定义",
              "heading": "变量定义"
            },
            {
              "depth": 5,
              "value": "使用 var 关键字",
              "heading": "使用-var-关键字"
            },
            {
              "depth": 4,
              "value": "常量定义",
              "heading": "常量定义"
            },
            {
              "depth": 5,
              "value": "使用 const 关键字",
              "heading": "使用-const-关键字"
            },
            {
              "depth": 4,
              "value": "条件控制",
              "heading": "条件控制"
            },
            {
              "depth": 4,
              "value": "循环",
              "heading": "循环"
            },
            {
              "depth": 4,
              "value": "函数",
              "heading": "函数"
            },
            {
              "depth": 4,
              "value": "指针",
              "heading": "指针"
            }
          ],
          "title": "Basic grammar",
          "group": {
            "path": "/go",
            "title": "GO"
          }
        },
        "title": "Basic grammar - XTT"
      },
      {
        "path": "/generator",
        "component": require('/Users/wangshun/Desktop/learn/src/Generator/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/Generator/index.md",
          "updatedTime": 1690441749000,
          "slugs": [
            {
              "depth": 3,
              "value": "分享根本不常用知识之 Generator",
              "heading": "分享根本不常用知识之-generator"
            },
            {
              "depth": 2,
              "value": "Generator 对象",
              "heading": "generator-对象"
            },
            {
              "depth": 3,
              "value": "一、generator Object",
              "heading": "一generator-object"
            },
            {
              "depth": 3,
              "value": "二、Generator",
              "heading": "二generator"
            },
            {
              "depth": 3,
              "value": "三、GeneratorFunction",
              "heading": "三generatorfunction"
            },
            {
              "depth": 3,
              "value": "二、Generator、GeneratorFunction 及其 prototype 的关系",
              "heading": "二generatorgeneratorfunction-及其-prototype-的关系"
            },
            {
              "depth": 2,
              "value": "Generator 深入探索",
              "heading": "generator-深入探索"
            },
            {
              "depth": 3,
              "value": "一、问题",
              "heading": "一问题"
            },
            {
              "depth": 3,
              "value": "二、Generator 的状态",
              "heading": "二generator-的状态"
            },
            {
              "depth": 3,
              "value": "三、多个 Generator 是如何协作的",
              "heading": "三多个-generator-是如何协作的"
            },
            {
              "depth": 3,
              "value": "四、mark、wrap、Context",
              "heading": "四markwrapcontext"
            },
            {
              "depth": 3,
              "value": "五、yield* genFn()",
              "heading": "五yield-genfn"
            }
          ],
          "title": "分享根本不常用知识之 Generator",
          "group": {
            "path": "/generator",
            "title": "Generator"
          }
        },
        "title": "分享根本不常用知识之 Generator - XTT"
      },
      {
        "path": "/react/element",
        "component": require('/Users/wangshun/Desktop/learn/src/React/element.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/React/element.md",
          "updatedTime": 1617269408000,
          "slugs": [
            {
              "depth": 2,
              "value": "ReactElement",
              "heading": "reactelement"
            },
            {
              "depth": 5,
              "value": "总结",
              "heading": "总结"
            }
          ],
          "title": "ReactElement",
          "group": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "ReactElement - XTT"
      },
      {
        "path": "/react",
        "component": require('/Users/wangshun/Desktop/learn/src/React/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/React/index.md",
          "updatedTime": 1616751089000,
          "slugs": [
            {
              "depth": 2,
              "value": "React API",
              "heading": "react-api"
            },
            {
              "depth": 3,
              "value": "React.Children",
              "heading": "reactchildren"
            },
            {
              "depth": 3,
              "value": "React.createRef",
              "heading": "reactcreateref"
            },
            {
              "depth": 3,
              "value": "Component & PureComponent",
              "heading": "component--purecomponent"
            },
            {
              "depth": 3,
              "value": "createContext",
              "heading": "createcontext"
            },
            {
              "depth": 3,
              "value": "createElement",
              "heading": "createelement"
            }
          ],
          "title": "React API",
          "group": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "React API - XTT"
      },
      {
        "path": "/type-script/ts",
        "component": require('/Users/wangshun/Desktop/learn/src/TypeScript/ts.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/TypeScript/ts.md",
          "updatedTime": 1657852061000,
          "slugs": [],
          "group": {
            "path": "/type-script",
            "title": "TypeScript"
          },
          "title": "Ts"
        },
        "title": "Ts - XTT"
      },
      {
        "path": "/type-script/work-study",
        "component": require('/Users/wangshun/Desktop/learn/src/TypeScript/workStudy.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/TypeScript/workStudy.md",
          "updatedTime": 1708927800000,
          "slugs": [],
          "group": {
            "path": "/type-script",
            "title": "TypeScript"
          },
          "title": "WorkStudy"
        },
        "title": "WorkStudy - XTT"
      },
      {
        "path": "/babel",
        "component": require('/Users/wangshun/Desktop/learn/src/babel/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/babel/index.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "Babel",
              "heading": "babel"
            },
            {
              "depth": 4,
              "value": "编译器和转译器",
              "heading": "编译器和转译器"
            },
            {
              "depth": 4,
              "value": "babel 编译流程",
              "heading": "babel-编译流程"
            },
            {
              "depth": 4,
              "value": "AST 节点",
              "heading": "ast-节点"
            }
          ],
          "title": "Babel",
          "group": {
            "path": "/babel",
            "title": "Babel"
          }
        },
        "title": "Babel - XTT"
      },
      {
        "path": "/browser/macro-browser",
        "component": require('/Users/wangshun/Desktop/learn/src/browser/macroBrowser.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/browser/macroBrowser.md",
          "updatedTime": 1647487537000,
          "slugs": [
            {
              "depth": 3,
              "value": "浏览器 \b",
              "heading": "浏览器-"
            },
            {
              "depth": 4,
              "value": "浏览器多进程架构",
              "heading": "浏览器多进程架构"
            },
            {
              "depth": 4,
              "value": "TCP 协议",
              "heading": "tcp-协议"
            },
            {
              "depth": 5,
              "value": "你怎么理解 HTTP 和 TCP 的关系？",
              "heading": "你怎么理解-http-和-tcp-的关系"
            },
            {
              "depth": 4,
              "value": "HTTP 请求流程",
              "heading": "http-请求流程"
            },
            {
              "depth": 4,
              "value": "URL 输入到页面展示经历了什么？",
              "heading": "url-输入到页面展示经历了什么"
            },
            {
              "depth": 5,
              "value": "用户输入",
              "heading": "用户输入"
            },
            {
              "depth": 5,
              "value": "URL 请求",
              "heading": "url-请求"
            },
            {
              "depth": 5,
              "value": "准备渲染进程",
              "heading": "准备渲染进程"
            },
            {
              "depth": 5,
              "value": "提交文档",
              "heading": "提交文档"
            },
            {
              "depth": 5,
              "value": "渲染",
              "heading": "渲染"
            }
          ],
          "title": "浏览器 \b",
          "group": {
            "path": "/browser",
            "title": "Browser"
          }
        },
        "title": "浏览器 \b - XTT"
      },
      {
        "path": "/leetcode",
        "component": require('/Users/wangshun/Desktop/learn/src/leetcode/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/leetcode/index.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "Array",
              "heading": "array"
            },
            {
              "depth": 4,
              "value": "移动零",
              "heading": "移动零"
            },
            {
              "depth": 4,
              "value": "盛最多水的容器",
              "heading": "盛最多水的容器"
            },
            {
              "depth": 4,
              "value": "三数之和",
              "heading": "三数之和"
            },
            {
              "depth": 4,
              "value": "移除元素",
              "heading": "移除元素"
            },
            {
              "depth": 4,
              "value": "旋转数组",
              "heading": "旋转数组"
            }
          ],
          "title": "Array",
          "group": {
            "path": "/leetcode",
            "title": "Leetcode"
          }
        },
        "title": "Array - XTT"
      },
      {
        "path": "/leetcode/link",
        "component": require('/Users/wangshun/Desktop/learn/src/leetcode/link.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/leetcode/link.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "LinkList",
              "heading": "linklist"
            },
            {
              "depth": 4,
              "value": "两两交换链表中的节点",
              "heading": "两两交换链表中的节点"
            },
            {
              "depth": 4,
              "value": "反转链表",
              "heading": "反转链表"
            },
            {
              "depth": 4,
              "value": "两数相加",
              "heading": "两数相加"
            }
          ],
          "title": "LinkList",
          "group": {
            "path": "/leetcode",
            "title": "Leetcode"
          }
        },
        "title": "LinkList - XTT"
      },
      {
        "path": "/leetcode/stack",
        "component": require('/Users/wangshun/Desktop/learn/src/leetcode/stack.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/leetcode/stack.md",
          "updatedTime": 1628574786000,
          "slugs": [
            {
              "depth": 2,
              "value": "Stack",
              "heading": "stack"
            },
            {
              "depth": 4,
              "value": "有效的括号",
              "heading": "有效的括号"
            },
            {
              "depth": 4,
              "value": "有效的括号",
              "heading": "有效的括号-1"
            }
          ],
          "title": "Stack",
          "group": {
            "path": "/leetcode",
            "title": "Leetcode"
          }
        },
        "title": "Stack - XTT"
      },
      {
        "path": "/promise/impl-promise",
        "component": require('/Users/wangshun/Desktop/learn/src/promise/implPromise.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/promise/implPromise.md",
          "updatedTime": 1617096626000,
          "slugs": [
            {
              "depth": 3,
              "value": "根据 Promise/A+ 规范实现 Promise",
              "heading": "根据-promisea-规范实现-promise"
            },
            {
              "depth": 4,
              "value": "1.Promise 状态",
              "heading": "1promise-状态"
            },
            {
              "depth": 4,
              "value": "2.then 方法",
              "heading": "2then-方法"
            },
            {
              "depth": 4,
              "value": "3.Promise 解决程序 [[Resolve]](promise, x)",
              "heading": "3promise-解决程序-resolvepromise-x"
            },
            {
              "depth": 4,
              "value": "4.promise 实现",
              "heading": "4promise-实现"
            },
            {
              "depth": 4,
              "value": "5.测试 promise",
              "heading": "5测试-promise"
            }
          ],
          "title": "根据 Promise/A+ 规范实现 Promise",
          "group": {
            "path": "/promise",
            "title": "Promise"
          }
        },
        "title": "根据 Promise/A+ 规范实现 Promise - XTT"
      },
      {
        "path": "/",
        "component": require('/Users/wangshun/Desktop/learn/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1616751089000,
          "slugs": [
            {
              "depth": 2,
              "value": "Hello XTT!",
              "heading": "hello-xtt"
            }
          ],
          "title": "Hello XTT!"
        },
        "title": "Hello XTT! - XTT"
      },
      {
        "path": "/77",
        "meta": {},
        "exact": true,
        "redirect": "/77/2022.4"
      },
      {
        "path": "/type-script",
        "meta": {},
        "exact": true,
        "redirect": "/type-script/ts"
      },
      {
        "path": "/browser",
        "meta": {},
        "exact": true,
        "redirect": "/browser/macro-browser"
      },
      {
        "path": "/promise",
        "meta": {},
        "exact": true,
        "redirect": "/promise/impl-promise"
      }
    ],
    "title": "XTT",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
