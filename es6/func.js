{
    // 剪头函数的使用
    const func = () => 10
    console.log(func())
}

{
    // 与结构赋值结合使用
    // 解构对象
    const func = ({ name, age, ...obj }) => {
        console.log(name)
        console.log(age)
        console.log(obj)
    }

    func({ name: 'Forest', age: 22, other: { email: '767425412@qq.com' } })

    // 解构数组
    const destructArrayFuc = ([x, y]) => {
        console.log(x)
        console.log(y)
    }

    destructArrayFuc([1, 2])
}

{
    /**
     * 当函数指定了默认值后，函数就有了length属性，将返回指定默认值的参数个数
     * 剩余参数：
     *      rest（...）用于获取函数的多余参数，这样就不用arguments对象了，而且箭头函数也没有arguments对象
     * 箭头函数：()=>
     *      箭头函数中的this指向当前上下文环境的this，没有自己的this对象
     *      箭头函数不能当作构造函数，也就是不可以对箭头函数使用new关键字实例化
     *      箭头函数没有arguments对象，可以使用rest参数代替
     *      箭头函数不能与yield关键字一起使用，所以箭头函数不能用作Generator函数
     *
     * 箭头函数的不实用场景
     *
     */
    function Timer() {
        this.s1 = 0
        this.s2 = 0
        // 箭头函数
        setInterval(() => this.s1++, 1000)
        const arr = []
        // 普通函数
        setInterval(function() {
            this.s2++
        }, 1000)
    }

    var timer = new Timer()

    setTimeout(() => console.log('s1: ', timer.s1), 3100) // 3
    setTimeout(() => console.log('s2: ', timer.s2), 3100) // 0
}

{
    /**
     * 嵌套箭头函数：
     *      eg: const func = () => ({into: arr => ({after: (item) => item})})
     */
    // 普通函数的嵌套使用
    function insert(value) {
        return {
            into: function(array) {
                return {
                    after: function(afterValue) {
                        array.splice(array.indexOf(afterValue) + 1, 0, value)
                        return array
                    }
                }
            }
        }
    }

    insert(2).into([1, 3]).after(1) //[1, 2, 3]


    // es6 的嵌套函数使用
    let insertNews = (value) => ({
        into: (array) => ({
            after: (afterValue) => {
                array.splice(array.indexOf(afterValue) + 1, 0, value)
                return array
            }
        })
    })

    insert(2).into([1, 3]).after(1) //[1, 2, 3]
}

{
    /**
     * 尾调用：
     *      指某个函数的最后一步是调用另一个函数
     */
    function g(x) {
        return x()
    }

    // 情况一
    function one(x) {
        let y = g(x)
        return y
    }

    // 情况二
    function two(x) {
        return g(x) + 1
    }

    // 情况三
    function there(x) {
        g(x)
    }
}


{
    // TODO：栈溢出，栈的空间？
    /**
     * 递归：自身调用自身的函数
     * 尾递归：在结尾调用自身的函数
     * Tips:
     *      如果没有明确的限制条件的话，很可能对报栈溢出错误----->栈溢出 栈的空间是？
     */
    function tailFactorial(n, total) {
        if (n === 1) return total
        return tailFactorial(n - 1, n * total)
    }

    function factorial(n) {
        return tailFactorial(n, 1)
    }

    factorial(5) // 120
    console.log(factorial(2))
}
