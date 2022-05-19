/**
 * symbol  表示独一无二的值，不能同new关键字同时使用，symbol值不是对象，故而不能添加属性，
 */


{
    // Symbol.for()
    // Symbol.keyFor()
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');

    console.log(s1 === s2) // true
}

{
    /**
     * Symbol.hasInstance 指向一个内部方法， 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)
     *
     *
     */

    class MyClass {
        [Symbol.hasInstance](foo) {
            return foo instanceof Array;
        }
    }

    console.log([1, 2, 3] instanceof new MyClass()) // true
}
