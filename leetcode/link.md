## LinkList

#### 两两交换链表中的节点

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

<img src="https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg" width = "300" height = "150" alt="图片名称" align=center />

输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：
输入：head = []
输出：[]
示例 3：
输入：head = [1]
输出：[1]

```
var swapPairs = function(head) {
    if(!head||!head.next)return head;
    let newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head
    return newHead
};
```

#### 反转链表

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL

```
var reverseList = function(head) {
    if(!head||!head.next)return head;
    let prev = null;
    while(head){
        let cache = head.next;
        head.next = prev;
        prev = head;
        head = cache
    }
    return prev
};
```

#### 两数相加

给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg" width = "300" height = "150" alt="图片名称" align=center />

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

```
var addTwoNumbers = function(l1, l2) {
    let temp=new ListNode('head');
    let node = temp
    let add = 0;
    let sum = 0;
    while(l1||l2){
        sum = (l1?l1.val:0)+(l2?l2.val:0)+add;
        node.next = new ListNode(sum%10);
        node = node.next;
        add = sum>=10?1:0;
        l1 = l1&&l1.next;
 	 	l2 = l2&&l2.next;
    }
    add&&(node.next = new ListNode(add))
    return temp.next
};
```
