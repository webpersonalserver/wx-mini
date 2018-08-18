# wx-mini
``````
运用webpack编译构建小程序
webpack 3.x.x
node 8.x.x
npm 5.x.x
gulp 3.x.x
``````

# 项目使用说明
``````
1、安装项目依赖
  npm install
2、开发运行项目
  npm run dev
3、生产编译打包项目
  npm run build
``````

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
|---------.gitignore                      上传git时，指定的忽略文件
``````