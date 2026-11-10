# 0.3.0 实际安装验证

2026-11-10，用户手动安装候选脚本 0.3.0 后，在当前 Brave / macOS 27.2.1 配置检查新打开的真实页面。本次未临时注入样式、未修改 CSP、未关闭浏览器防护。使用 CSS.getPlatformFontsForNode 核对实际字体，并查看截图。

- GitHub gewill/global-wenkai：h1 22 字形、正文段落 66 字形为 LXGW WenKai；pre 99 字形为 LXGW WenKai Mono。中文正文、导航和图标可读。
- X github 公开账号：帖子 262 字形为 LXGW WenKai，1 个表情由 Apple Color Emoji 绘制；导航也为 LXGW WenKai。滚动两屏后新显示帖子视觉检查正常，回复/转发/喜欢等图标正常；加载字体 face 从 29 增至 40。
- 安装由用户完成，工具未读取扩展编辑页；候选内容为本次发布的 font-loader.js 与样式，无运行时代码修改。
- JS 语法、12 域名注入、字体加载模拟测试通过：固定匿名 CDN 请求、四并发、去重、动态文本、本地优先、域范围及失败响应。

未覆盖：自动更新、其他浏览器/系统、所有 SPA 路由、全部 GitHub 编辑器及 X 功能、长时间性能；Twitter 域名仅逻辑检查。Google/知乎/V2EX/YouTube 的页面结果来自 0.2.2，0.3.0 未再次实测这些站点，加载器不在这些域运行。纯 UserCSS 的 GitHub/X 限制仍保留。

截图仅保存在维护者本机。本次验证源码随后随 0.3.0 发布提交冻结，通过 Tag 可追溯；不上传用户浏览器页面截图。
