## Stack

#### 有效的括号

给定一个只包括 `'('，')'，'{'，'}'，'['，']'`的字符串 s ，判断字符串是否有效。
输入：`s = "()[]{}"`
输出：true
输入：`s = "([)]"`
输出：false

```
var isValid = function(s) {
    if(s.length%2!==0)return false;
    let stack = [];
    for(let i = 0;i<s.length;i++){
        switch(s[i]){
            case '(':
            case '{':
            case '[':
                stack.push(s[i]);
                break;
            case ')':
                if(stack.pop()!='(')return false;
                break;
            case '}':
                if(stack.pop()!='{')return false;
                break;
            case ']':
                if(stack.pop()!='[')return false;
                break;
        }
    }
    return !stack.length
};
```

#### 有效的括号

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/histogram.png" width = "180" height = "150" alt="图片名称" align=center />

`以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。`

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/histogram_area.png" width = "180" height = "150" alt="图片名称" align=center />

输入: [2,1,5,6,2,3]
输出: 10

```
//暴力
var largestRectangleArea = function(heights) {
    var max = 0;
    for(let i = 0;i<heights.length;i++){
        var currentHeight = heights[i];
        for(let j = i;j<heights.length;j++){
               if(currentHeight>heights[j]) currentHeight=heights[j]
               max = Math.max(max,currentHeight*(j-i+1))
        }
    }
    return max
};
//stack
var largestRectangleArea = function(heights) {
    let max = 0;
    let stack = [-1];
    for (let i = 0; i < heights.length; i++) {
        while(stack.length>1&&heights[i]<heights[stack[stack.length-1]]){
            max = Math.max(max,heights[stack.pop()]*(i-stack[stack.length-1]-1))
        }
        stack.push(i)
    }
    while(stack.length>1){
        max = Math.max(max,heights[stack.pop()]*(heights.length-stack[stack.length-1]-1))
    }
    return max
};
```
