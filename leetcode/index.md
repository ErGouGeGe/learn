## Array

#### 移动零

给定一个数组 `nums`，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

```
var moveZeroes = function(nums) {
    let j = 0;
    for(let i = 0;i<nums.length;i++){
        if(nums[i]!=0){
            nums[j] = nums[i]
            if(i!=j)nums[i]=0
            j++

        }
    }
};
```

#### 盛最多水的容器

<img src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg" width = "300" height = "200" alt="图片名称" align=center />

输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为  49。

```
//双指针方法
var maxArea = function(height) {
    let max = 0;
    let left = 0;
    let right = height.length-1;
    while(right>left){
        max = Math.max(max,Math.min(height[left],height[right])*(right-left))
        if(height[left]<height[right]) left ++;
        else right--
    }
    return max
}
```

#### 三数之和

给你一个包含 n 个整数的数组  nums，判断  nums  中是否存在三个元素 a，b，c ，使得  a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
示例
注意：答案中不可以包含重复的三元组。
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]];
输入：nums = []
输出：[]
输入：nums = [0]
输出：[]

```
var threeSum = function(nums) {
    let res = [];
    if(!nums||nums.length<3)return res;
    nums.sort((a,b)=>a-b);
    for(let i = 0;i<nums.length;i++){
        let current = i,left = i+1,right = nums.length-1;
        if(nums[current]>0)break;
        if(current>0&&nums[current]==nums[current-1])continue;
        while(right>left){
            let sum = nums[current]+nums[left]+nums[right]
            if(sum==0){
                res.push([nums[current],nums[left],nums[right]])
                while(right>left&&nums[left]==nums[left+1])left++;
                while(right>left&&nums[right]==nums[right-1])right++;
                left++;
                right--;
            }else if(sum<0) left++;
            else right--;
        }
    }
    return res
};
```

#### 移除元素

给你一个数组 nums  和一个值 val，你需要 原地 移除所有数值等于  val  的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。

```
var removeElement = function(nums, val) {
    if(!nums||!nums.length)return 0;
    let j = 0;
    for(let i = 0;i<nums.length;i++){
        if(nums[i]!==val){
            nums[j]=nums[i];
            j++
        }
    }
    nums.splice(j,nums.length)
    return nums.length
};
```

#### 旋转数组

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]

```
var rotate = function(nums, k) {
    let step = k%nums.length;
    let a = nums.splice(nums.length-step,nums.length)
    nums.unshift(...a)
};
```

```
//O1 方式
let reverse = (nums,left,right)=>{
    while(right>left){
        [nums[right],nums[left]] = [nums[left],nums[right]];
        right--;
        left++;
    }
}
var rotate = function(nums, k) {
    let step = k%nums.length;
    reverse(nums,0,nums.length-1);
    reverse(nums,0,step-1);
    reverse(nums,step,nums.length-1);
};
```
