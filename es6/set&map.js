/**
 * Set本身是一个构造函数，用来生成 Set 数据结构。
 *      - add(value)  添加数据， 返回Set结构本身
 *      - size   返回Set实例的成员总数
 *      - delete(value)  删除某个值 返回一个布尔值表示删除是否成功
 *      - has(value)     返回一个布尔值 表示该值是否为Set成员
 */

{
    // Set 结构不会添加重复的值
    const s = new Set();
    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x))

    s.add(1).add(2).add(2)
    // 注意2被加入了两次

    s.size // 2

    console.log(s.has(1)) // true
    console.log(s.has(2)) // true
    console.log(s.has(3)) // false

    s.delete(2)
    console.log(s.has(2)) // false
    console.log('s:', s) // {3, 5, 4, 1}
}


{
    {    // 例一
        const set = new Set([1, 2, 3, 4, 4])
        console.log([...set])// [1, 2, 3, 4]
    }

    {
        // 例二
        const items = new Set([1, 2, 3, 4, 5, 5, 5, 5])
        console.log(items.size) // 5
    }

    {
        // 例三
        const set = new Set(document.querySelectorAll('div'))
        console.log(set.size) // 56
    }

    {
        // 类似于
        const set = new Set()
        document
            .querySelectorAll('div')
            .forEach(div => set.add(div))
        console.log(set.size) // 56
    }
}

{
    // 数组去重
    const arr = [1, 2, 3, 4, 5, 2, 3, 2, 3, 5, 3, 5, 6, 6, 7]
    console.log([...new Set(arr)]) // [1, 2, 3, 4, 5, 6, 7]

    // 字符串去重
    const str = 'abbacsadaesad'
    console.log([...new Set(str)].join('')) // abcsde
}

{
    /**
     * 遍历：keys()  values()  entries()
     */

    let set = new Set(['red', 'green', 'blue'])

    for (let item of set.keys()) {
        console.log(item)
    }
    // red
    // green
    // blue

    for (let item of set.values()) {
        console.log(item)
    }
    // red
    // green
    // blue

    for (let item of set.entries()) {
        console.log(item)
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]
}

{
    /**
     * WeakSet()
     *      add(value)  向 WeakSet 实例添加一个新成员
     *      delete(value)  清除 WeakSet 实例的指定成员
     *      has(value)  返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
     *      与Set的区别：
     *          - WeakSet的成员只能是对象，不能是其他类型的值
     *          - WeakSet中的对象都是弱饮用，也就是说垃圾回收机制不考虑WeakSet对该对象的引用
     */

    const ws = new WeakSet()

    const obj = {}
    const foo = {}

    ws.add(window)
    ws.add(obj)

    ws.add(window)

    console.log(ws.has(window)) // true
    console.log(ws.has(foo))    // false

    console.log(ws.delete(window)) // true
    console.log(ws.has(window))    // false
}

{
    /**
     * Map()
     *  它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
     * 实例属性和操作方法：
     *      - set(key, value)   设置键名key对应的键值为value，然后返回整个Map结构；如果key已经有值，则键值会被更新，否则就新生成该键
     *      - get(key)          获取key对应的键值，如果找不到就返回undefined
     *      - has(key)          返回一个布尔值，表示key是否存在与当前Map中
     *      - delete(key)       删除为key的键值对，返回一个布尔值，表示是否删除成功
     *      - clear()           清楚所有成员，没有返回值
     *      - size              返回Map结构的成员总数
     *
     * 遍历方法：keys()  values()   entries()   forEach()
     * Tips: Map遍历的顺序就是插入顺序
     */
    const m = new Map()
    const o = { p: 'Hello World' }

    m.set(o, 'content')
    console.log(m.get(o)) // "content"

    console.log(m.has(o)) // true
    console.log(m.delete(o)) // true
    console.log(m.has(o)) // false


    const map = new Map([
        ['F', 'no'],
        ['T', 'yes']
    ])

    for (let key of map.keys()) {
        console.log(key)
    }
    // "F"
    // "T"

    for (let value of map.values()) {
        console.log(value)
    }
    // "no"
    // "yes"

    for (let item of map.entries()) {
        console.log(item[0], item[1])
    }
    // "F" "no"
    // "T" "yes"

    // 或者
    for (let [key, value] of map.entries()) {
        console.log(key, value)
    }
    // "F" "no"
    // "T" "yes"

    // 等同于使用map.entries()
    for (let [key, value] of map) {
        console.log(key, value)
    }
    // "F" "no"
    // "T" "yes"

}

{
    /**
     * Map结构转为数组结构：
     */

    const map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three']
    ])

    console.log([...map.keys()]) // [1, 2, 3]
    console.log([...map.values()]) // ['one', 'two', 'three']
    console.log([...map.entries()]) // [[1,'one'], [2, 'two'], [3, 'three']]
    console.log([...map]) // [[1,'one'], [2, 'two'], [3, 'three']

    const map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');

    const map1 = new Map(
        [...map0].filter(([k, v]) => k < 3)
    );
    console.log(map0)
    // 产生 Map 结构 {1 => 'a', 2 => 'b'}

    const map2 = new Map(
        [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
    console.log(map2)
    // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
}

{
    // Map转数组
    {
        const myMap = new Map()
            .set(true, 7)
            .set({foo: 3}, ['abc']);
        console.log([...myMap]) // [[true, 7],[{foo: 3},"abc"]]
    }

    // 数组转Map
    const initMap = new Map([[true, 7],[{foo: 3},"abc"]])
    console.log(initMap)
    /**
     * Map{
     *     {true => 7}
     *     {Object => "abc"}
     * }
     */

    // Map转对象
    function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    const myMap = new Map()
        .set('yes', true)
        .set('no', false);
    console.log(strMapToObj(myMap)) // { yes: true, no: false }

    // 对象转Map
    let obj = {"a":1, "b":2};
    let map = new Map(Object.entries(obj));
    console.log(map) // {"a" => 1, "b" => 2}

    // Map转JSON
    function strMapToJson(strMap) {
        return JSON.stringify(strMapToObj(strMap));
    }

    let init = new Map().set('yes', true).set('no', false);
    console.log(strMapToJson(init)) // '{"yes":true,"no":false}'
}

{
    /**
     * WeakMap:
     *  与Map的区别：
     *      - WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
     *      - WeakMap的键名所指向的对象不计入垃圾回收机制
     */

    const wm = new WeakMap();

// size、forEach、clear 方法都不存在
    wm.size // undefined
    wm.forEach // undefined
    wm.clear // undefined
}
