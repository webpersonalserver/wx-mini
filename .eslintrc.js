
module.exports = {

  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,

  //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parser: 'babel-eslint',

  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    // 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
    sourceType: 'module',
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },

  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "amd": true
  },
  /* 
   下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
    // 提示错误
    "no-unused-vars": 2,
    "no-use-before-define": 2,
    "block-scoped-var": 2,
    "no-var": 2,
    // 提示警告
    "no-empty": 1,
    "no-extra-parens": 1,
    "no-extra-semi": 1,
    "eqeqeq": 1,
    "eol-last": 1,
    "no-mixed-spaces-and-tabs": 1,
    "no-multiple-empty-lines": 1,
    "prefer-arrow-callback": 1
  }
}