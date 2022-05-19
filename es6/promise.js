/**
 * Promise 异步编程解决方案：
 *      简单来说就是一个容器，里面保存着某个未来才会借宿的事件
 *  特点：
 *      - 对象的状态不受外界的影响， 三种状态：
 *          - pending（进行中）
 *          - fulfilled（已成功）
 *          - rejected（已失败）
 *      - 一旦状态改变，就不会在再变，任何时候都可以得到这个结果
 *
 *  API:
 *      - finally()     用于指定不管 Promise 对象最后状态如何，都会执行的操作
 *      - all()         将多个 Promise 实例，包装成一个新的 Promise 实例。接收一个数组，返回每个promise的实例
 *      - race()        将多个 Promise 实例，包装成一个新的 Promise 实例。
 *      - allSettled()  接收一组 Promise 实例作为参数，包装成一个新的 Promise 实例
 *      - any()         ES2021规范，该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回
 *          any和race类似，唯一区别在于Promise变成rejected状态而结束
 *      -
 */

{
    // 基本用法：
    const promise = () => new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => resolve(json))
            // 发生错误时的回调
            .catch(err => reject(err))
    })

    const btn = document.querySelector('.button')
    btn.addEventListener('click', async () => {
        const result = await promise()
        console.log('result:', result)
        console.log('执行回调函数')
        console.log(result)
    })

}

{
    // all  接收一个数组
    // 生成一个Promise对象的数组
    const promises = [2, 3, 5, 7, 11, 13].map(function(id) {
        return getJSON('/post/' + id + '.json')
    })

    Promise.all(promises).then(function(posts) {
        // ...
    }).catch(function(reason) {
        // ...
    })


    const connectDatabase = () => {
    }
    const databasePromise = connectDatabase()

    const findAllBooks = () => {
    }
    const getCurrentUser = () => {
    }

    const booksPromise = databasePromise
        .then(findAllBooks)

    const userPromise = databasePromise
        .then(getCurrentUser)

    Promise.all([
        booksPromise,
        userPromise
    ])
        .then(([books, user]) => pickTopRecommendations(books, user))
}


{
    // finally()
    // resolve 的值是 undefined
    Promise.resolve(2).then(() => {
    }, () => {
    })

    // resolve 的值是 2
    Promise.resolve(2).finally(() => {
    })

    // reject 的值是 undefined
    Promise.reject(3).then(() => {
    }, () => {
    })

    // reject 的值是 3
    Promise.reject(3).finally(() => {
    })
}


{
    // race()
    /**
     * 只要传入的任意一个实例率先改变了状态，promise的状态就跟着改变，那个率先改变Promise实例的返回值就传递给promise的回调函数
     */
    const promise = Promise.race([p1, p2, p3])

    const p = Promise.race([
        fetch('/resource-that-may-take-a-while'),
        new Promise(function(resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), 5000)
        })
    ])

    p
        .then(console.log)
        .catch(console.error)
}

{
    // 删除加载图标
    const removeLoadingIndicator = () => {
    }
    // allSettled()
    const promises = [
        fetch('/api-1'),
        fetch('/api-2'),
        fetch('/api-3')
    ]

    // await Promise.allSettled(promises)
    // 等到上面的异步回调只完成后，无论成功与否，都会执行下面的回调
    // removeLoadingIndicator()

    // eg:
    {
        const server = async () => {
            const promises = [fetch('index.html'), fetch('https://does-not-exist/')]
            const results = await Promise.allSettled(promises)

            // 过滤出成功的请求
            const successfulPromises = results.filter(p => p.status === 'fulfilled')

            // 过滤出失败的请求，并输出原因
            const errors = results
                .filter(p => p.status === 'rejected')
                .map(p => p.reason)
        }

    }
}

{
    // any
    const promises = [
        fetch('/endpoint-a').then(() => 'a'),
        fetch('/endpoint-b').then(() => 'b'),
        fetch('/endpoint-c').then(() => 'c')
    ]
    try {
        (async () => {
            const first = await Promise.any(promises)
            console.log(first)ß
        })()
    } catch (error) {
        console.log(error)
    }
}

{
    // Generator & Promise
    function getFoo() {
        return new Promise(function(resolve, reject) {
            resolve('foo')
        })
    }

    const g = function* () {
        try {
            const foo = yield getFoo()
            console.log(foo)
        } catch (e) {
            console.log(e)
        }
    }

    function run(generator) {
        const it = generator()

        function go(result) {
            if (result.done) return result.value

            return result.value.then(function(value) {
                return go(it.next(value))
            }, function(error) {
                return go(it.throw(error))
            })
        }

        go(it.next())
    }

    run(g)
}
