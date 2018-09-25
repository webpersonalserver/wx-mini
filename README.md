# wx-mini

使用 `webpack`, `babel`, `scss` 开发的微信小程序项目脚手架

## 本项目重要开发工具本版说明

* `webpack 3.8.1`
* `yarn 1.9.4`
* `node 8.11.1`
* `npm 5.6.0`
* `gulp 3.9.1`

## 功能

* 支持引用 `node_modules` 模块
* 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
* 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
* 内置 `promise` 和 `lodash`（`lodash` 按需引入相应模块，不会全部引入）
* 使用 `scss` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
* 提供 `ENVIRONMENT` 和 `process.env.NODE_ENV` 全局常量辅助开发
* 支持 `eslint` 基础代码检测

## 开始使用

确保安装了 [Node.js](https://nodejs.org/) (>= `v4.2`) 和 [yarn](https://yarnpkg.com) 或 [npm](https://www.npmjs.com/package/npm)

1.  `git clone` 此项目
2.  通过命令行工具 `cd` 到这个目录，执行`npm install` 或 `yarn` 安装依赖模块
3.  执行 `npm run dev`或`yarn dev` 开始开发
4.  通过微信开发者工具，添加 `dist` 目录到项目上

## 内置命令

* 执行命令  `npm run dev`或`yarn dev` 运行项目（不带有压缩项目的功能）
* 执行命令  `npm run build`或`yarn build` 生产编译打包项目（不带有压缩项目的功能）
* 执行命令  `npm run minify`或`yarn minify` 生产编译压缩打包项目（带有压缩项目的功能）

# 项目目录结构说明
``````
wx-mini
|---------dist                            项目编译打包后的文件
|---------src                             项目开发文件
          |-----------components                      开发组件文件
          |-----------images                          项目所用图标或图片文件
          |-----------pages                           页面开发文件
                      |--------index                      首页
                               |------index.js                首页js
                               |------index.json              首页json
                               |------index.scss              首页scss
                               |------index.xml               首页xml
          |-----------sass                            项目全局或公用scss文件
          |-----------utils                           项目公用方法或工具类方法
          |-----------app.js                          小程序主js文件
          |-----------app.json                        小程序主json配置文件
          |-----------app.wxss                        小程序主wxss样式文件
|---------gulpfile.js                     项目压缩的脚本配置文件
|---------package.json                    npm初始文件
|---------README.md                       项目说明文件
|---------webpack.config.babel.js         项目编译打包配置文件
|---------.eslintrc                       js代码规范检测配置文件
|---------.babelrc                        es6转换
|---------.gitignore                      上传git时，指定忽略上传文件的配置文件
``````

## 注意事项
* 每次启动项目后，都需重新打开微信开发者工具