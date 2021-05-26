// 块级作用域   一个{}就表明为一个块级作用域

/* 
    块级作用域内声明的变量只能在当前作用于内访问使用，不能再当前块级作用域外使用
*/
{
    let a = null
    let b = true

    var c = 12
}

// console.log(a) // a is not defined

// var 声明的变量之所以能够访问是因为变量提升所导致的
console.log(c) // 12


var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}

a[1](); // 10
a[2](); // 10
a[3](); // 10
a[4](); // 10
a[5](); // 10
a[6](); // 10

console.log('var定义的变量:', i)  // 10

for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}
// 这儿是访问不到for循环中let定义的i   会报错：i is not defined
// console.log(i)

/**
 * 块级作用域会有暂时性死区：
 *  所谓暂时性死区就是只能在当前作用域内访问声明的变量  不能访问作用于外或者声明之前的变量
 *  let和const不能声明相同的变量
 *      const声明一个只读的常量。一旦声明，常量的值就不能改变。
 *      const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
 *      const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用
 *      const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
 * 
 * 
 * 顶层this指向：
 *  浏览器----> window
 *  node ----> global
 */

// 判断当前环境是node还是浏览器：
(typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' &&
        typeof require === 'function' &&
        typeof global === 'object')
        ? global
        : this);

