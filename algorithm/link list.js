// 定义一个创建节点的类
class Node {
    constructor(element) {
        this.element = element;

        this.next = null;
    }
}
// 定义链表类
class LinkList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    /**
     * @description 新增元素
     * @param {any} element 元素
     */
    append(element) {
        // 若链表为空，则设置head，若不为空，将尾节点的next指向element，而后长度 + 1
        let node = new Node(element);

        let current;
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;

            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }

        this.length++;
    }

    /**
     * @description 插入元素
     * @param {int} position 位置
     * @param {any} element 元素
     */
    insert(position, element) {
        /*
            1. 若position 为 0  将element的指针指向head
            2. 不为0 设置previous和next的指向
            3. 长度 + 1
        */
        let current;
        let previous;
        let index = 0;
        let node = new Node(element);

        if (position >= 0 && position <= this.length) {
            if (position === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                current = this.head;
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index++;
                }

                node.next = current;
                previous.next = node;
            }

            this.length++;
        }
    }

    /**
     * @description 根据索引删除
     * @param {int} position 索引
     * @returns boolean值 是否删除成功
     */
    removeAt(position) {
        let current;
        let previous;
        let index = 0;

        if (position > -1 && position < this.length) {
            current = this.head;
            if (position === 0) {
                this.head = current.next;
            } else {
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index++;
                }

                previous.next = current.next;
            }

            this.length--;
            return true;
        }
        return false;
    }

    /**
     * @description 删除执行元素，首先查找元素下标，然后调用索引删除函数
     * @param {any} element 元素
     */
    remove(element) {
        let index = this.indexOf(element);
        this.removeAt(index);
    }

    /**
     * @description 根据element查找索引
     * @param {any} element
     * @returns element所对应的索引值 未找到返回 -1
     */
    indexOf(element) {
        let index = 0;
        let current = this.head;

        while (current) {
            if (current.element === element) {
                return index;
            }
            current = current.next;

            index++;
        }
        return -1;
    }

    /**
     * @description 查看链表是否为空
     * @returns boolean值 是否为空
     */
    isEmpty() {
        return this.length === 0;
    }

    /**
     * @description 查看链表长度
     * @returns 链表长度
     */
    size() {
        return this.length;
    }
}

const linkList = new LinkList();

linkList.append(1);
linkList.append(2);
linkList.append(3);
linkList.append(4);
linkList.append(5);

console.log('index of', linkList.indexOf(2));
console.log('Delete the element corresponding to the index', linkList.removeAt(3));
console.log('link list', linkList);

// leet code 203题
// 给定一个链表头节点head和一个整数value，请删除链表中所有满足Node.value === value的节点，并且返回链表的头结点。

function removeElements(head, val) {
    if (head == null) {
        return head;
    }
    head.next = removeElements(head.next, val);
    return head.val === val ? head.next : head;
}

const result = removeElements([1, 2, 6, 3, 4, 5, 6], 6);
console.log('result:', result);

// 哨兵节点
function removeElement(head, val) {
    let ele = { next: head };
    let p = ele;
    while (p.next) {
        if (p.next.val === val) {
            p.next = p.next.next;
        } else {
            p = p.next;
        }
    }
    return ele.next;
}

const res = removeElement([1, 2, 6, 3, 4, 5, 6], 6);
console.log('res:', res);

export {};
