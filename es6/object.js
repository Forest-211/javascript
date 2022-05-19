{
    /**
     * 简洁表示法：
     *      允许在大括号里面直接写入变量作为对象的属性和方法
     */
    {
        const foo = 'bar'
        const baz = { foo }  // 等同于 const baz = {foo: foo};
        console.log(baz) // {foo: "bar"}

        function f(x, y) {
            return { x, y }
        }

        // 等同于
        /*
        function f(x, y) {
            return {x: x, y: y};
        }*/

        console.log(f(1, 2))// {x: 1, y: 2}
    }


}
{
    /**
     * getter setter
     */
    const cart = {
        _wheels: 4,

        get wheels() {
            return this._wheels
        },

        set wheels(value) {
            if (value < this._wheels) {
                throw new Error('数值太小了！')
            }
            this._wheels = value
        }
    }

    console.log(cart)
}

{
    /**
     * 可枚举性：对象的每个属性都有一个描述对象（Descriptor）；Object.getOwnPropertyDescriptor()方法可以获取属性的描述对象
     */
}

{
    // 链式判断
    const obj = {
        user: {
            name: 'Forest',
            age: 22,
            detail: {
                email: '767425412@qq.com'
            }
        }
    }

    // ES2020 新特性
    if (obj?.user?.name) {
        console.log('链式判断')
    }
}

{
    /**
     * null 判断运算符 ??  ES2020新特性
     *
     */

    const obj = {
        user: {
            name: 'Forest',
            age: 22,
            weight: 150,
            detail: {
                email: '767425412@qq.com'
            }
        }
    }

    const weight = obj?.user?.weight ?? 160
    console.log(weight) // 172
}

/**
 * 新增API：
 * Object.is() 判断两个值是否相等
 * Object.assign() 对象合并，浅层拷贝
 *
 */
{
    /**
     * is：判断两个值是否相等
     */

    const isEqual = Object.is('Forest', 'forest')
    console.log(isEqual) // false
}
{
    /**
     * Object.assign() 对象合并
     * Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性
     *  Tips:
     *      - assign() 是浅拷贝
     *      - 同名属性替换
     *      - 数组的处理：按位替换 eg:  Object.assign([1, 2, 3], [4, 5])  合并后：[4, 5, 3]
     *
     */
    const obj = {
        name: 'Forest',
        age: 22
    }

    const obj1 = {
        email: '767425412@qq.com'
    }

    // 将obj1合并导obj对象中
    Object.assign(obj, obj1)

    console.log(obj) // {name: "Forest", age: 22, email: "767425412@qq.com"}

    console.log(Object.assign([1, 2, 3, 4, 5], [2, 3, 4, 5, 5, 6, 7])) // [2, 3, 4, 5, 5, 6, 7]
}

{
    /**
     * Object.fromEntries() 用于将一个键值对数组转为对象
     */
    const ass = Object.fromEntries([['name', 'Forest'], ['age', 22], ['email', '767425412@qq.com']])
    console.log(ass) // {name: "Forest", age: 22, email: "767425412@qq.com"}

    // 例一
    const entries = new Map([
        ['foo', 'bar'],
        ['baz', 42]
    ])

    console.log(Object.fromEntries(entries)) // { foo: "bar", baz: 42 }

    // 例二
    const map = new Map().set('foo', true).set('bar', false)
    console.log(Object.fromEntries(map)) // { foo: true, bar: false }


}
