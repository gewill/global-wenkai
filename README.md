# 全局霞鹜文楷 · Global WenKai

将网页正文替换为霞鹜文楷，代码区域使用等宽文楷。优先使用本地字体，不可用时从固定版本的 jsDelivr 字体资源加载所需字符分片。

这是用户脚本 / 用户样式项目，需要 Tampermonkey 或 Stylus，不是独立浏览器扩展。

**当前版本 0.2.2，仍有已知兼容性限制。** Brave 中 Google、知乎、V2EX、YouTube 的抽样页面通过；GitHub 和 X 的在线字体回退被网站 CSP 拦截，尚未解决。详见[验证记录](docs/validation-2026-11-10.md)。

## 安装

选择一种安装方式即可，避免同时启用两份样式。

- **Tampermonkey**：[安装用户脚本](https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai.user.js)
- **Stylus**：[安装 UserCSS](https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai.user.css)

先安装对应的脚本管理扩展，再打开上面的 Raw 链接。Tampermonkey 应显示脚本安装页；若只显示源码，可在管理面板的“实用工具 → 从 URL 安装”粘贴同一链接。不要把 `.user.css` 当 JavaScript 粘贴到 Tampermonkey 编辑器。

来自 Greasy Fork 的旧版请先备份，再在更新对话框中核对名称、版本和来源；若被识别为新条目，手动停用旧版。安装/升级流程尚未实测。

两种产物都指向本仓库 `main/dist` 更新源。后续版本更新需提高 `userscript.meta.json` 中的版本号并重新生成产物，管理器按其更新设置检查。GitHub 元数据与 Greasy Fork 分发渠道独立；本仓库更新不会自动发布 Greasy Fork。

## 行为与限制

- 覆盖常见文字元素、表单文字及 YouTube 的文字组件。
- 正文使用文楷；常见代码块、编辑器和语法高亮后代使用等宽文楷。
- 排除常见图标、公式以及 `[data-wenkai="off"]` 子树，不修改伪元素。
- 保留旧样式中的语言及特定网站规则；部分旧规则也影响布局/隐藏元素，见 `src/style.css`。
- 图标识别为启发式规则，不保证所有网站；Shadow DOM、Canvas、PDF、浏览器内部页面不保证覆盖。
- 网站 CSP、字体可见性及字体 CDN 可达性都会影响结果；提高 CSS 优先级不能解决字体下载被拦截。

## 隐私与字体来源

脚本不收集或上传页面文字，不包含统计请求。只有本地字体不可用并需要相应字符时，浏览器才请求 jsDelivr 的字体分片；CDN 可接收常规网络请求信息。版本固定为 `lxgw-wenkai-webfont@1.7.0`，没有远程 JavaScript 或运行时 CSS import。

该版本内嵌 Regular 字体声明，粗体/斜体由浏览器合成。网络字体失败时回退系统字体。不要为本脚本关闭网站安全防护。

## 开发

依赖 Python 3.9+、Node.js 18+，不需要安装 npm 依赖。源码及已固定的第三方 CSS 可离线构建：

```sh
python3 scripts/build.py
node --check dist/global-wenkai.user.js
node tests/check.mjs
git diff --check
```

```text
src/style.css          可维护的样式及域规则
userscript.meta.json   名称、版本、作者等共享元数据
scripts/build.py       生成 UserScript / UserCSS / 更新元数据和校验和
vendor/                固定的字体声明与第三方许可证
dist/                 可直接安装的产物（纳入版本管理）
tests/check.mjs        域规则和注入逻辑定向检查
docs/                  兼容性与维护说明
```

修改源码后重新构建并提交 `dist/`。逻辑检查不等于真实浏览器验收；日常不运行 UI 自动化，不自动发布。分支与发布约定见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 来源与许可

源自作者在 [Greasy Fork 发布的全局霞鹜文楷](https://greasyfork.org/zh-CN/scripts/454257)。本轮修复由 0.1 演进至 0.2.2。

项目组织参考 [SukkaW/Make-Bilibili-Great-Than-Ever-Before](https://github.com/SukkaW/Make-Bilibili-Great-Than-Ever-Before) 的源码、元数据和构建产物分离方式；没有复制其功能代码。

本项目代码使用 [MIT](LICENSE)。第三方字体声明采用其 [MIT 许可](vendor/LICENSE)，字体本身采用 [SIL OFL 1.1](vendor/OFL.txt)。详见 [第三方来源](vendor/README.md)。
