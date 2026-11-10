# 全局霞鹜文楷 · Global WenKai

将网页正文替换为霞鹜文楷，代码区域使用等宽文楷。优先使用本地字体，不可用时从固定版本的 jsDelivr 字体资源加载所需字符分片。

这是用户脚本 / 用户样式项目，需要 Tampermonkey 或 Stylus，不是独立浏览器扩展。

**用户脚本 0.3.0 已在 Brave 实际安装验证 GitHub 和 X。** GitHub 正文和代码分别使用文楷、等宽文楷；X 帖子与导航使用文楷。纯 CSS 版不包含此修复，仍受站点字体 CSP 限制。详见[0.3.0 验证记录](docs/validation-0.3.0.md)。

## 安装

选择一种安装方式即可，避免同时启用两份样式。

- **Tampermonkey（推荐）**：[Greasy Fork 安装用户脚本](https://greasyfork.org/zh-CN/scripts/604694)，或 [GitHub Raw 安装](https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai.user.js)
- **Stylus**：[原 Greasy Fork 样式](https://greasyfork.org/zh-CN/scripts/454257)，或 [GitHub UserCSS](https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai.user.css)

先安装对应的脚本管理扩展，再打开上面的 Raw 链接。Tampermonkey 应显示脚本安装页；若只显示源码，可在管理面板的“实用工具 → 从 URL 安装”粘贴同一链接。不要把 `.user.css` 当 JavaScript 粘贴到 Tampermonkey 编辑器。

来自 Greasy Fork 的旧版请先备份，再在更新对话框中核对名称、版本和来源；若被识别为新条目，手动停用旧版。本次由用户手动安装 0.3.0，随后验证网页效果；自动更新仍未验证。

从 GitHub 安装的两种产物都指向本仓库 `main/dist` 更新源；Greasy Fork 安装版由 Greasy Fork 提供更新。后续版本更新需提高 `userscript.meta.json` 中的版本号并重新生成产物，管理器按其更新设置检查。GitHub 元数据与 Greasy Fork 分发渠道独立；本仓库更新不会自动发布 Greasy Fork。

## 行为与限制

- 覆盖常见文字元素、表单文字及 YouTube 的文字组件。
- 正文使用文楷；常见代码块、编辑器和语法高亮后代使用等宽文楷。
- 排除常见图标、公式以及 `[data-wenkai="off"]` 子树，不修改伪元素。
- 保留旧样式中的语言及特定网站规则；部分旧规则也影响布局/隐藏元素，见 `src/style.css`。
- 图标识别为启发式规则，不保证所有网站；Shadow DOM、Canvas、PDF、浏览器内部页面不保证覆盖。
- 网站 CSP、字体可见性及字体 CDN 可达性都会影响结果；提高 CSS 优先级不能解决字体下载被拦截。

## 隐私与字体来源

脚本不收集或上传页面文字，不包含统计请求。只有本地字体不可用并需要相应字符时，浏览器才请求 jsDelivr 的字体分片；CDN 可接收常规网络请求信息。版本固定为 `lxgw-wenkai-webfont@1.7.0`，没有远程 JavaScript 或运行时 CSS import。0.3.0 用户脚本在 GitHub/X/Twitter 上增加 GM_xmlhttpRequest 与仅限 cdn.jsdelivr.net 的连接权限，以匿名请求读取字体二进制，再通过 FontFace 注册；不修改页面 CSP。

该版本内嵌 Regular 字体声明，粗体/斜体由浏览器合成。网络字体失败时回退系统字体。不要为本脚本关闭网站安全防护。

## 开发

依赖 Python 3.9+、Node.js 18+，不需要安装 npm 依赖。源码及已固定的第三方 CSS 可离线构建：

```sh
python3 scripts/build.py
node --check dist/global-wenkai.user.js
node tests/check.mjs
node tests/font-loader.mjs
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

源自作者在 [Greasy Fork 发布的全局霞鹜文楷](https://greasyfork.org/zh-CN/scripts/454257)。本轮修复由 0.1 演进至 0.3.0。

项目组织参考 [SukkaW/Make-Bilibili-Great-Than-Ever-Before](https://github.com/SukkaW/Make-Bilibili-Great-Than-Ever-Before) 的源码、元数据和构建产物分离方式；没有复制其功能代码。

本项目代码使用 [MIT](LICENSE)。第三方字体声明采用其 [MIT 许可](vendor/LICENSE)，字体本身采用 [SIL OFL 1.1](vendor/OFL.txt)。详见 [第三方来源](vendor/README.md)。
