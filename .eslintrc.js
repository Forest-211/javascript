module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        // 缩进4个空格
        indent: ['error', 4, { SwitchCase: 1 }],
        // 末尾分号
        semi: 'error',
        // 不能在class以外使用this
        'class-methods-use-this': 0,
        // 注释和代码不能在同一行
        'no-inline-comments': 'error',
        // 允许使用 单引号和es6的``
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        // 不允许使用var
        'no-var': 2,
        // 禁止分号前后有空格
        'semi-spacing': 2
    }
};
