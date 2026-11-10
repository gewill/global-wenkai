# 维护约定

采用单主干 `main`，不新建 develop。遵循 [gewill/dev-standards 分支规范](https://github.com/gewill/dev-standards/blob/main/branching_guide.md)。日常小改动不默认创建 PR、运行 UI 自动化或全量测试；远端强制要求仍须满足。

1. 修改 `src/style.css` 或 `userscript.meta.json`，不要直接编辑 dist。
2. 运行 README 中的构建和定向检查，并核对生成文件差异。
3. 涉及字体或选择器时，在受影响站点检查实际渲染字体、代码与图标，记录浏览器、日期、源码版本和未验证项。
4. 更新 CHANGELOG；版本号从 userscript.meta.json 单点维护。

仓库无自动部署、npm 发布或 Greasy Fork 同步工作流。但 `main/dist` 是管理器更新源，推送新版本产物可能使已安装用户收到更新；需按发布范围明确授权。正式更新从干净、同步的 main 构建和验证，不把本地逻辑检查当作浏览器验收。

0.3.0 已由用户安装并在 Brave 验证 GitHub 和 X；自动更新及其他浏览器仍未验收。不要给没有证据的浏览器或站点标注“支持”。

反馈字体失效时提供页面 URL、浏览器/管理器版本、脚本版本、是否安装本地字体以及字体请求错误；不要提交 Cookie、令牌或个人页面截图。
