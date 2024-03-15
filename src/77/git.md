多个人协作, 50 个人做一个项目.
提交要谨慎.

### git 是什么?

svn 版本管理工具
不需要联网=>分布式的一个版本管理工具
基于 hash 的一个链表(我自己理解)
每一个节点都是独立, 有自己 hash
节点之间是有关联的(有关联的是一个片段)

#### 基本操作

```
    1.git merge
    2.git rebase
        a.a=>b=>c
        b.a=>b=>d
        c.a=>b=>d=>c
    3.git cherry-pick
        a.a=>b=>c
        b.a=>b=>d
        c.a=>b=>c=>d
    4.git reset  --mixed --soft --hard
```

#### commit 规范

```
1.git flow
    a.建立特性分支(建立自己特性分支不做强制要求), 建议建立
    b.目前测试分支 feature-multi-org2 => merge request
    c.master
    d.hotfix
    e.immergency
```

#### commit 规范

1. 库存管理-task-xxxx 任务内容
2. 处理冲突
3. 自动生成的,用别人的,然后自己生成一次.
4. 其他的不确定的, 需要与作者沟通.
