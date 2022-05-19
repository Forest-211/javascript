/**
 * class 生成实例对象的传统方法是通过构造函数;class可以看作只是一个语法糖，它的绝大部分功能，
 * ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已
 *
 * 类的数据类型就是函数，类本身就指向构造函数。直接对类使用new命令，跟构造函数的用法完全一致
 */
{
    // ES5
    function Point(x, y) {
        this.x = x; // this 指向当前实例对象
        this.y = y;
    }

    Point.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
    };

    let p = new Point(1, 2);
}
{
    // ES6 改写上面的代码
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }
}

{
    class Bar {
        doStuff() {
            console.log('stuff');
        }
    }

    const { doStuff } = new Bar();
    doStuff() // "stuff"
}

/**
 * constructor 方法是类的默认方法  通过new命令你生成对象实例时，自动调用该方法
 * 一个类必须有一个constructor方法， 如果没有显示定义，一个空的constructor()方法会被默认添加
 * constructor()方法默认返回实例对象（this）完全可以指定返回另外一个对象
 */

{
    {
        // ES5
        class Point {}
    }

    // 等同于
    class Point {
        constructor() {}
    }
}

{
    /**
     * 在`类`的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
     */
    class MyClass {
        constructor() {
            // ...
        }
        get prop() {
            return 'getter';
        }
        set prop(value) {
            console.log('setter: '+value);
        }
    }

    let inst = new MyClass();

    inst.prop = 123; // setter: 123

    inst.prop; // 'getter'
}


{
    /**
     * 属性表达式
     * 类的属性名，可以采用表达式
     */
    let methodName = 'getArea';

    class Square {
        constructor(length) {
            // ...
        }

        [methodName]() {
            // ...
        }
    }
}
/**
 * Tips：
 *  - 严格模式：类和模块的内部默认就是严格模式，所以不需要use strict指定运行模式
 *  - 不存在变量提升；如果在同一个文件中，只能先定义再使用，否则会报错
 *  - name属性；本质上ES6的类只是ES5的构造函数的一层包装，所以函数的许多特性都被class继承，包括name属性
 *  - Generator方法；如果在某个方法前面加上星号，就表示该方法是一个Generator函数
 *  - this的指向：类的方法内部如果含有this，它默认指向类的实例
 */

{
    // this指向问题
    class Logger {
        constructor() {
            this.printName = this.printName.bind(this);
        }
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }

        print(text) {
            console.log(text);
        }
    }

    const logger = new Logger();
    const { printName } = logger;
    logger.printName()
    printName(); // TypeError: Cannot read property 'print' of undefined

    // 箭头函数
    {
        class Obj {
            constructor() {
                this.getThis = () => this;
            }
        }

        const myObj = new Obj();
        console.log(myObj.getThis() === myObj) // true
    }
}
/**
 * 静态方法：
 *  类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上static关键字就表示该方法不会被实例继承，而是直接通过类来调用
 *  如果静态方法包含this关键字  这个this指的是类，而不是实例
 */
{
    class Foo{
        static classMethod(){
            return 'study ES6 class'
        }
    }

    Foo.classMethod()

    // 静态方法不能不会被实例继承
    // var foo = new Foo();
    // foo.classMethod()
// TypeError: foo.classMethod is not a function
}


/**
 * 静态方法可以与非静态方法重名
 */
class Foo {
    static bar() {
        this.baz();
    }
    static baz() {
        console.log('hello');
    }
    baz() {
        console.log('world');
    }
}

console.log(Foo.bar()); // hello


/**
 * 实例属性的新写法：实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
 */

class IncreasingCounter {

    // 还可以直接在顶层声明属性
    // _count = 0;

    constructor() {
        this._count = 0;
    }
    get value() {
        console.log('Getting the current value!');
        return this._count;
    }
    increment() {
        this._count++;
    }
}


{
    /**
     * 静态属性：指class本身的属性，而不是定义在实例对象上的属性
     *  老写法的静态属性定义在类的外部；
     */

        // 老写法
    class Foo {
        // ...
    }
    Foo.prop = 1;

    {
        // 新写法
        class Foo {
            static prop = 1;
        }
    }
}

{
    /**
     * 私有属性和私有方法：
     *      私有属性和私有方法是只能在类的内部访问的方法和属性，外部不能访问
     */

    class IncreasingCounter {
        #count = 0; // 私有属性，只能在类的内部使用，若在类的外部使用就会报错
        get value() {
            console.log('Getting the current value!');
            return this.#count;
        }
        increment() {
            this.#count++;
        }
    }

    const counter = new IncreasingCounter();
    // console.log(counter.#count); // Private field '#count' must be declared in an enclosing class
    // counter.#count = 42 // Private field '#count' must be declared in an enclosing class [私有字段'#count'必须在封闭类中声明]

    class Foo {
        // 私有属性
        #a;
        #b;
        constructor(a, b) {
            this.#a = a;
            this.#b = b;
        }

        // 私有方法
        #sum() {
            return this.#a + this.#b;
        }
        printSum() {
            console.log(this.#sum());
        }
    }

    class Counter {
        #xValue = 0;

        constructor() {
            // super();
            // ...
        }

        // 私有方法也可以设置getter和setter方法
        get #x() {
            return this.#xValue
        }
        set #x(value) {
            this.#xValue = value;
        }
    }

    class FakeMath {
        static PI = 22 / 7;

        // 静态私有属性
        static #totallyRandomNumber = 4;

        // 静态私有方法
        static #computeRandomNumber() {
            return FakeMath.#totallyRandomNumber;
        }

        static random() {
            console.log('I heard you like random numbers…')
            return FakeMath.#computeRandomNumber();
        }
    }

    FakeMath.PI // 3.142857142857143
    FakeMath.random()
    // I heard you like random numbers…
    // 4
    // FakeMath.#totallyRandomNumber // Private field '#totallyRandomNumber' must be declared in an enclosing class
    // FakeMath.#computeRandomNumber() // Uncaught SyntaxError: Private field '#computeRandomNumber' must be declared in an enclosing class
}

{
    /**
     * in 运算符：
     * try...catch结构可以用来判断是否存在某个私有属性。
     */
    class A {
        use(obj) {
            try {
                // obj.#foo; // Private field '#foo' must be declared in an enclosing class
            } catch {
                // 私有属性 #foo 不存在
                console.log('私有属性 #foo 不存在')
            }
        }
    }

    const a = new A();
    a.use(a); // 报错

    {
        class A {
            #foo = 0;
            use(obj) {
                if (this.#foo in obj) {
                    // 私有属性 #foo 存在
                    console.log('私有属性 #foo 存在')
                } else {
                    // 私有属性 #foo 不存在
                    console.log('私有属性 #foo 不存在')
                }
            }
        }
    }
}


{
    /**
     * class的继承：
     *  class可通过extends关键字实现继承，这比ES5的通过修改原型链实现继承要清晰和方便很多
     *  在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错
     *  父类的静态方法也会被子类继承
     */
    class Point {}

    class ColorPoint extends Point {
        constructor(x, y, color) {
            super(x, y); // 调用父类的constructor(x, y)
            this.color = color;
        }

        toString() {
            return this.color + ' ' + super.toString(); // 调用父类的toString()
        }
    }
}

{
    /**
     * super 关键字既可以当作函数使用，也可以当作对象使用
     *      - super作为函数调用的时候代表父类的构造函数，ES6要求子类的构造函数必须执行一次super函数
     *      - super作为对象时，在普通方法中指向父类的原型对象；在静态方法中指向父类
     */
    class A {}

    class B extends A {
        constructor() {
            super();
        }
    }

    {
        /**
         * 作为对象使用
         */
        class A {
            p() {
                return 2;
            }
        }

        class B extends A {
            constructor() {
                super(); // 执行父级原型对象
                console.log(super.p()); // 2
            }
        }

        let b = new B();
    }
}

{
    /**
     * Mixin模式的实现：
     *  Mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口
     */
    // Mixin的简单实现
    const a = {
        a: 'a'
    }

    const b = {
        b: 'b'
    }

    const c = {...a, ...b}

    // 将多个类的接口`混入`另一个类
    function mix(...mixins){
        class Mix {
            constructor() {
                for (const mixin of mixins) {
                    copyProperties(this, new mixin()) // 拷贝实例属性
                }
            }
        }

        for (let mixin of mixins) {
            copyProperties(Mix, mixin); // 拷贝静态属性
            copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
        }

        return Mix;
    }

    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if ( key !== 'constructor'
                && key !== 'prototype'
                && key !== 'name'
            ) {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }

}
