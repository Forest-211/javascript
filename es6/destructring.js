// 解构

// 数组解构
const [a, b, c] = [1, 2, 3, 4, 5, 6]

console.log(a, b, c)// 1, 2, 3

// 对象解构

/**
 * 解构：允许按照一定模式，从数组和对象中提取值，对变量进行赋值
 * 
 * Tips:
 *  不能解构不能遍历的数据类型
 * 
 */
const {server, cache} = {server: {db: 'mysql', port: 3306, user: 'root'}, cache: {expire: 7200}}

console.log("server:", server) // {db: "mysql", port: 3306, user: "root"}
console.log("cache:", cache) // {expire: 7200}


// 不能解构的数据类型：
{
    // let [foo] = 1;
    // let [foo] = false;
    // let [foo] = NaN;
    // let [foo] = undefined;
    // let [foo] = null;
    // let [foo] = {};
    // 以上都会报错：Identifier 'foo' has already been declared
}


// 对于 Set 结构，也可以使用数组的解构赋值。
let [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x, y, z) // a  b  c


{
    /**
     * 默认值：
     *  解构赋值允许指定默认值
     *  默认值生效的条件是，对象的属性值严格等于undefined
     */
    let [foo = true] = [];
    console.log(foo) // true
    
    let [x, y = 'b'] = ['a']; // x='a', y='b'
    let [s, e = 'b'] = ['a', undefined]; // s='a', e='b'

    /**
     * 如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
     * 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
     * 
     * 键值同名简写：
     *  eg: 
     *      const obj = {foo: foo, bar: bar} === const obj = {foo, bar}
     */

    {
        const foo = 'foo'
        const bar = 'bar'
        // es5
        var obj = {
            foo: foo,
            bar: bar
        }

        // es6
        const obj1 = {
            foo, bar
        }
        /**
         * obj和obj1是完全相同的
         */

        console.log(obj)
        console.log(obj1)
    }

    {
        /**
         * 嵌套解构
         *      深层嵌套解构时，解构数据应与被解构数据保持一致
         */
        let obj = {
        p: [
            'Hello',
            { y: 'World' }
        ]
        };
        
        let { p, p: [x, { y }] } = obj;
        console.log(x) // "Hello"
        console.log(y) // "World"
        console.log(p) // ["Hello", {y: "World"}]
    }

    /**
     * Tips：
     *     - 解构的变量不能同名 解决方案：别名
     *     - 解构赋值允许等号左边的模式之中，不放置任何变量名
     *     - 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
     */


    {
        /**
         * 字符串解构：
         *  - 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象
         *  - 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
         */

        const [a, b, c, d, e] = "hello"
        console.log(a, b, c, d, e)// h e l l o

        // 因为length是"hello"字符串上的属性
        let { length } = 'hello';
        console.log("length:", length)
    }

    {
        /**
         * 数值和布尔值的解构
         */

        let {toString: s} = 123;
        console.log(s === Number.prototype.toString) // true
        
        let {toString: str} = true;
        console.log(str === Boolean.prototype.toString) // true
    }

    {
        /**
         * 函数参数解构：
         *  - 按照对应的数据解构进行解构， 比如传入的是数组，解析的时候就用数组的方式解构，传入的是对象则按照对象的数据解构进行解构
         * 
         */

        function add([x, y]){
            return x + y;
        }
        
        console.log(add([1, 2])); // 3

        /**
         * map()方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
         */
        const result = [[1, 2], [3, 4]].map(([a, b]) => a + b);
        console.log('result:', result) // [3, 7]


        function move({x = 0, y = 0} = {}) {
            return [x, y];
        }
        
        console.log(move({x: 3, y: 8})); // [3, 8]
        console.log(move({x: 3})); // [3, 0]

        // 传入空对象或者不传
        console.log(move({})); // [0, 0]
        console.log(move()); // [0, 0]
    }

    {
        /**
         * 圆括号所解决的问题：
         *  - 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，
         *    必须解析到（或解析不到）等号才能知道。由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致
         *    解构的歧义，就不得使用圆括号。
         * 
         * 不能使用圆括号的情况：
         *  - 变量声明语句
         *  - 函数参数
         *  - 赋值语句的模式
         *  
         */

        // 变量声明语句
        {
            // 全部报错   Invalid destructuring assignment target
            // let [(a)] = [1];
            // let {x: (c)} = {};
            // let ({x: c}) = {};
            // let {(x: c)} = {};
            // let {(x): c} = {};

            // let { o: ({ p: p }) } = { o: { p: 2 } };
        }

        // 函数参数
        {
            // 报错： Invalid destructuring assignment target
            // function f([(z)]) { return z; }
            // 报错： Invalid destructuring assignment target
            // function f([z,(x)]) { return x; }
        }

        // 赋值语句的模式
        {
            // Invalid left-hand side in assignment
            ({ p: a }) = { p: 42 };
            ([a]) = [5];
        }
    }
}