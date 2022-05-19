/**
 * ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
 * async 函数是什么？其实就是 Generator 函数的语法糖。
 */

// {
//     /**
//      * generator 与 async await对比
//      */
//     const fs = require('fs');
//
//     const readFile = function (fileName) {
//         return new Promise(function (resolve, reject) {
//             fs.readFile(fileName, function(error, data) {
//                 if (error) return reject(error);
//                 resolve(data);
//             });
//         });
//     };
//
//     // generator的写法
//     const gen = function* () {
//         const f1 = yield readFile('/etc/fstab');
//         const f2 = yield readFile('/etc/shells');
//         console.log(f1.toString());
//         console.log(f2.toString());
//     };
//
//     // async await改写
//     const asyncReadFile = async function () {
//         const f1 = await readFile('/etc/fstab');
//         const f2 = await readFile('/etc/shells');
//         console.log(f1.toString());
//         console.log(f2.toString());
//     };
// }

/**
 * 基本用法：
 *  async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，
 *  等到异步操作完成，再接着执行函数体内后面的语句。
 *
 */
{
    // async function getStockPriceByName(name) {
    //     const symbol = await getStockSymbol(name); // 这样就变成同步执行了，当前任务执行完成之后才会往后执行；async返回一个promise对象
    //     const stockPrice = await getStockPrice(symbol);
    //     return stockPrice;
    // }
    //
    // getStockPriceByName('goog').then(function (result) {
    //     console.log(result);
    // });

    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);// 50毫秒后执行打印
    }

    asyncPrint('hello world', 50);
}

{
    /**
     * async 函数使用形式
     */

    // 函数生命
    async function foo(){}

    // 函数表达式
    const bar = async function () {}

    // 对象方法
    const obj = {
        async next(){}
    }

    class Storage {
        constructor() {
            this.cachePromise = caches.open('avatars');
        }

        async getAvatar(name) {
            const cache = await this.cachePromise;
            return cache.match(`/avatars/${name}.jpg`);
        }
    }

    const storage = new Storage();
    storage.getAvatar('jake').then(res => {
        console.log(res)
    });

    // 箭头函数
    const arrow = async () => {};


}
