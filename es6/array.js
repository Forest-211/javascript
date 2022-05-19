{
    /**
     * 扩展运算符(...)：
     *      扩展运算符（spread）是三个点（...）
     *      如果扩展运算符后面是一个空数组，则不会产生任何效果
     *      只有函数调用时扩展运算符才可以放在圆括号中，否则会报错
     *      使用场景：
     *          - 替代apply
     *          - 复制数组
     *          - 合并对象
     *          - 与解构赋值结合
     *          - 字符串转数组，将字符串中的每个字符解构成数组的元素
     *          - 转成可遍历对象
     *          - Map和Set结构，Generator函数
     *      新增API：
     *          - Array.from    将类数组/对象转成真正的数组
     *          - Array.of      将一组值转换为数组
     *          - copyWithin    指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
     *              target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
     *              start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
     *              end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
     *          - find、findIndex  数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
     *          - fill          使用给定值填充一个数组，若数组中已有元素时再使用该方法会将原来的元素全部抹去
     *              可以传入三个参数：fill(填充元素，填充其实位置，填充结束位置)； eg: [1, 2, 3, 4, 5].fill('a', 2, 3)
     *          - entries、keys、values 一般用于遍历数组，他们都返回一个可遍历对象
     *          - includes      判断当前某个数组中是否包含给定的值；返回一个布尔值
     *          - flat、flatMap  用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
     */
    console.log(...[1, 2, 3, 4, 5]) // 1 2 3 4 5

    // 这样就简单的实现了一个数组push操作
    function push(arr, ...item) {
        arr.push(...item)
    }

    function add(x, y) {
        return x + y
    }


    const array = [1, 2, 3, 4, 5, 6]
    add(1, 3)
    push(array, [7, 8, 9, 10])

    // 合理的使用扩展运算符可以替代apply方法
    {
        // ES5 的写法
        function f(x, y, z) {
            // ...
        }

        var args = [0, 1, 2]
        f.apply(null, args)
    }

    {
        // ES6的写法
        function f(x, y, z) {
            // ...
        }

        let args = [0, 1, 2]
        f(...args)

    }

    {
        // fill
        const arr = [1, 2, 3, 4, 5].fill('a', 2, 3)
        console.log(arr) // [1, 2, "a", 4, 5]
    }

    {
        // entries、keys、values
        for (let index of ['a', 'b'].keys()) {
            console.log(index) // 0 1
        }

        for (let elem of ['a', 'b'].values()) {
            console.log(elem) // a b
        }

        for (let [index, elem] of ['a', 'b'].entries()) {
            console.log(index, elem)
            // 0 a
            // 1 b
        }
    }

    {
        // 扁平化处理
        /**
         * flat()只能拉平一层，如果要拉平多层，可以在flat()中传入值；eg:[1, 2, 3, 4, 5, [2, 3, 5, [2, 3, 5]]].float(3)
         *
         * 如果不知有多少层则可以使用Infinity
         */
        const newArr = [1, 2, 3, 4, 5, 6, [1, 3, [4, 5, 6]]].flat()
        console.log(newArr) // [1, 2, 3, 4, 5, 2, 3, 5, 2, 3, 5]

        const newArr1 = [1, 2, 3, 4, 5, [2, 3, 5, [2, 3, 5]]].flat(2)
        console.log(newArr1) // [1, 2, 3, 4, 5, 2, 3, 5, 2, 3, 5]

        const flatInfinityArr = [1, 2, 3, 4, 5, [2, 3, 4, [3, 4, 5, [23, 34, 235, 54, [543, 453,534], 34], 65], 543], 690].flat(Infinity)
        console.log(flatInfinityArr) // [1, 2, 3, 4, 5, 2, 3, 4, 3, 4, 5, 23, 34, 235, 54, 543, 453, 534, 34, 65, 543, 690]
    }
}
