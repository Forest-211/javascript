/**
 * ES6的模块自动采用严格模式，不管你有没有在模块头部加上"use strict"都会是严格模式
 *
 * 严格模式主要有一下限制：
 *      - 变量必须声明后再使用
 *      - 函数的参数不能有同名属性，否则报错
 *      - 不能使用with语句
 *      - 不能对只读属性赋值，否则报错
 *      - 不能使用前缀 0 表示八进制数，否则报错
 *      - 不能删除不可删除的属性，否则报错
 *      - 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
 *      - eval不会在它的外层作用域引入变量
 *      - eval和arguments不能被重新赋值
 *      - arguments不会自动反映函数参数的变化
 *      - 不能使用arguments.callee
 *      - 不能使用arguments.caller
 *      - 禁止this指向全局对象
 *      - 不能使用fn.caller和fn.arguments获取函数调用的堆栈
 *      - 增加了保留字（比如protected、static和interface）
 *
 * 模块功能主要有两个命令构成：
 *  - import  用于输入其他模块提供的功能
 *  - import() 支持动态加载模块
 *  - export  用于规定模块的对外接口
 *  - export * 表示输出所有模块 eg: export * form "lodash"
 *
 * 跨模块的常量：
 *
 */

{
    /**
     * 跨模块的常量：
     */
    // constants.js 模块
    export const A = 1;
    export const B = 3;
    export const C = 4;

    // test1.js 模块
    import * as constants from './constants';
    console.log(constants.A); // 1
    console.log(constants.B); // 3

    // test2.js 模块
    import {A, B} from './constants';
    console.log(A); // 1
    console.log(B); // 3
}
