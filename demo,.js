/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var reverseBetween = function (head, left, right) {
  const dummynode = new ListNode(-1);
  dummynode.next = head;

  let pre = dummynode;
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  let rightNode = dummynode;
  for (let i = 0; i < right-1; i++) {
    rightNode = rightNode.next;
  }

  let leftNode = pre.next;
  let curr = rightNode.next;

  pre.next = null;
  rightNode.next = null;

  reverseList(leftNode);

  pre.next = rightNode;
  leftNode.next = curr;
  return dummynode.next;
};

const reverseList = (head) => {
  let pre = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
};

let head = [1, 2, 3, 4, 5],
  left = 2,
  right = 4;
reverseBetween(head, left, right);
console.log(reverseBetween(head, left, right));
