# ydmap-web-portal/ydmap-ssr-portal

> 使用vue-cli脚手架创建，基于[Vue.js 2.x](https://cn.vuejs.org)开发，UI库[element-ui](http://element.eleme.io)，移动版[mint-ui](http://mint-ui.github.io/docs/#/zh-cn2)

# Introduction 介绍

**ydmap-web-portal** 是基于[vue-cli](https://github.com/vuejs/vue-cli)，内置自动化工具 [webpack 2.x](http://webpack.github.io/) 为ydmap.com.cn **用户端应用** 改版所建立的开发环境，使用 [ES6(ES2015)](http://www.ecma-international.org/ecma-262/6.0/) / [Typescript](http://www.typescriptlang.org/) 为主要开发方式，ES6使用 [babel](http://babeljs.io/) 转换，同时兼容直接使用ES5开发，集成CSS预处理器、代码规范检查等常用开发工具包。

**支持编写css预定义**
- [less](http://lesscss.org/)
- [sass](http://sass-lang.com/)
- [scss](http://sass-lang.com/)
- [stylus](http://stylus-lang.com/)

所有类型的样式定义如有兼容性差异均自动添加浏览器前缀，如-moz-、-webkit-、-ms-以及标准属性。

非不得已情况下不得编写行内样式样式代码。

**一切皆模块**
webpack通过配置视一切资源都是模块，构建方式按模块依赖链整体打包为一个文件；编写js代码时一个文件就是一个模块，模块之间使用import、export产生关系, 以SPA的方式构建应用。

针对web开发，推荐编辑器 [Visual Studio Code](https://code.visualstudio.com/) (从1.15.0开始提供64bit构建版本) 或者 [Sublime Text 3](http://www.sublimetext.com/3), 与环境配置的 [eslint](http://eslint.org/)、[editorconfig](http://editorconfig.org/) 等工具良好集成，并支持各种可选插件对IDE功能加以拓展，提高开发效率和质量。

如果使用 **Visual Studio Code** 作为开发工具，
> 请在设置中将文件夹图标主题设置为 **vscode-icons** ，将颜色主题设置为 **Dark+ (default dark)**

推荐安装的扩展有:
- vscode-icons
- tortoise-svn
- sass
- path Intellisense
- npm Intellisense
- npm
- jQuery Code Snippets
- JavaScript(ES6) code snippets
- HTML Snippets
- HTML CSS Support
- ESLint
- tslint
- es-beautifier
- EditorConfig for VS Code
- Bootstrap 3 Snippets
- Beautify css/sass/scss/less
- Beautify
- Auto Close Tag
- .ejs
- TODO Parser
- Vetur
- Vue 2 Snippets
- VueHelper
- wpy-beautify
- vscode-element-helper
- Start git-bash

也可选择命令行执行扩展安装(确保已经安装 **Visual Studio Code** )
```
code --install-extension robertohuertasm.vscode-icons
code --install-extension florentulve.vstortoise
code --install-extension robinbentley.sass-indented
code --install-extension christian-kohler.path-intellisense
code --install-extension christian-kohler.npm-intellisense
code --install-extension eg2.vscode-npm-script
code --install-extension donjayamanne.jquerysnippets
code --install-extension xabikos.JavaScriptSnippets
code --install-extension abusaidm.html-snippets
code --install-extension ecmel.vscode-html-css
code --install-extension dbaeumer.vscode-eslint
code --install-extension eg2.tslint
code --install-extension dai-shi.vscode-es-beautifier
code --install-extension EditorConfig.EditorConfig
code --install-extension wcwhitehead.bootstrap-3-snippets
code --install-extension michelemelluso.code-beautifier
code --install-extension HookyQR.beautify
code --install-extension formulahendry.auto-close-tag
code --install-extension QassimFarid.ejs-language-support
code --install-extension minhthai.vscode-todo-parser
code --install-extension octref.vetur
code --install-extension hollowtree.vue-snippets
code --install-extension oysun.vuehelper
code --install-extension doingweb.wpy-beautify
code --install-extension ElemeFE.vscode-element-helper
code --install-extension McCarter.start-git-bash
```

安装好扩展后重启 **Visual Studio Code** ,点击菜单栏 **文件** - **首选项** - **文件图标主题** ,选择前面安装的 **VSCode Icons**

## Installation 安装

开发工具集基于 **node.js** 环境，node.js以 **package** 的概念定义一个具体的功能集合,所有node.js应用程序都是一个package。
node.js 自带包管理工具 [npm](https://www.npmjs.com/) , 我们在这里使用 [yarn](https://yarnpkg.com) 替代npm管理使用到的包。

首次使用请先按以下引导步骤初始化开发环境：

1.首先安装 [node.js](https://nodejs.org) ；
2.为了使package下载加快，配置使用国内镜像仓库，打开 **命令行** / **终端** 工具执行
```
npm config set registry https://registry.npm.taobao.org
```
> **Visual Studio Code** 集成系统 **命令行** / **终端** 工具，使用 **Ctrl+`** 可切换;

3.部分包安装后会尝试下载一些二进制文件就地解压或者编译，因为国内网络墙的原因，需要配置env全局变量
```
npm set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```
```
npm set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
```
```
npm set npm_config_phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```
```
npm set geckodriver_cdnurl https://npm.taobao.org/mirrors/geckodriver
```
>以上命令行配置在当前用户目录下.npmrc文件中直接编辑亦可

4.全局安装yarn
```
npm install yarn -g
```
5.命令行定位到项目 **package.json** 所在目录即根目录执行
```
yarn
```
**or**
```
npm install
```

>如果过程中出现 **git** 字样的异常信息,可能是因为 **package.json** 的依赖模块关系中有不是使用 **npm** 包管理方式而是直接使用 **git** 管理方式从仓库如github拉取的模块,则需要额外安装 **git** 工具 [git-scm](https://git-scm.com/) ,选择合适的版本安装. [tortoisegit](https://tortoisegit.org/) ( **git** 桌面管理工具,可选)

6.依赖的包解析及下载完成后即可使用

**开发**
```
yarn run dev
```
>将会自动打开浏览器访问入口页面;所有src/目录下的文件修改均会自动编译并~~刷新浏览器~~先尽可能热替换模块代码,如果无法替换模块代码会刷新浏览器.其他文件修改的变动需要Ctrl+C重新运行才能体现;编译请留意控制台结果，如果异常会有日志输出，浏览器自动刷新后控制台亦有日志信息;

**打包**
```
yarn run build
```

7.如有依赖包调整，请重新执行第5步

## Reference 参考资料

>ES6(ES2015)参考阮一峰[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)
>Typescript [官方教程](http://www.typescriptlang.org/docs/tutorial.html)
>浏览器兼容性查询 [caniuse](http://caniuse.com/)

## Todo list 遗留问题

none

## Git

# 关于ydmap-web-portal/ydmap-ssr-portal-pages

此repo是ydmap-ssr-portal的模板页子模块submodule, 拉取ydmap-ssr-portal时请添加--recursive参数, 或者使用
```shell
git submodule init
git submodule update
```

> 由于Visual Studio Code团队还在讨论git submodule功能的实现计划，故此暂时不能支持在Visual Studio Code工具内直接操作git commit/pull/push等操作，但关联子项目是没有问题的。请使用客户端工具(如[TortoiseGit](https://tortoisegit.org/))或者命令行终端进行git submodule子模块的相关操作。

