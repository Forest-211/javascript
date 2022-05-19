/**
 * 作用：
 *  - 为各种数据结构提供一个统一的、简便的访问接口
 *  - 使得数据结构的成员能够按某种次序排列
 *   - ES6创造了一种新的遍历命令 for……of
 *
 *
 *   遍历过程：
 *    - 创建一个指针对象，指向当前数据结构的起始位置；也就是说，遍历器对象本质上就是一个指针对象
 *    - 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
 *    - 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
 *    - 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
 *
 *   原声具备iterator接口的数据结构：
 *      - Array
 *      - Map
 *      - Set
 *      - String
 *      - TypedArray
 *      - 函数的arguments对象
 *      - NodeList 对象
 */

let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                }
                return { value: undefined, done: true };
            }
        };
    }
};


/**
 * 使用场景：
 *  - 解构赋值    对数组和Set结构进行解构赋值
 *  - 扩展运算符  内部默认调用了Iterator接口
 *  - yield*后面跟的是一个可遍历的结构，他会调用该结构的遍历接口
 *  - 其他场合
 */


{
    /**
     * 解构赋值
     */
    let set  = new Set()
    set.add('a')
    set.add('b')
    set.add('c')
    let [first, ...rest] = set

    console.log(first); // a
    console.log(rest);  // ['b', 'c']
}

{
    /**
     * 扩展运算符
     */
    let str = 'pride'
    console.log([...str]) // ["p", "r", "i", "d", "e"]

    let arr = ['b', 'c']

    console.log(['a', ...arr, 'b', 'c'])  // ["a", "b", "c", "b", "c"]
}

{
    /**
     * yield*
     */

    let generator = function* () {
        yield 1;
        yield* [2,3,4];
        yield 5;
    };

    let iterator = generator();

    console.log(iterator.next()); // { value: 1, done: false }
    console.log(iterator.next()); // { value: 2, done: false }
    console.log(iterator.next()); // { value: 3, done: false }
    console.log(iterator.next()); // { value: 4, done: false }
    console.log(iterator.next()); // { value: 5, done: false }
    console.log(iterator.next()); // { value: undefined, done: true }
}


{
    /**
     *  遍历数组：
     *
     */

    const arr = ['red', 'green', 'blue'];

    for(let v of arr) {
        console.log(v); // red green blue
    }

    for (const v in arr) {
        console.log(v);
    }

    const obj = {};
    obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

    for(let v of obj) {
        console.log(v); // red green blue
    }
}


{
    /**
     * Map & Set
     */
    var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
    for (var e of engines) {
        console.log(e);
    }
// Gecko
// Trident
// Webkit

    var es6 = new Map();
    es6.set("edition", 6);
    es6.set("committee", "TC39");
    es6.set("standard", "ECMA-262");
    for (let [name, value] of es6) {
        console.log(name + ": " + value);
    }
}
