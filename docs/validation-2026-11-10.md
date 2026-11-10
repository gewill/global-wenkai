# 0.2.2 网站验证记录

2026-11-10，在 macOS 27.2.1 的 Brave 当前用户配置中，将候选脚本临时应用到真实页面。使用页面 style 适配 GM_addStyle，通过 CSS.getPlatformFontsForNode 检查实际渲染字体，并查看页面。原 0.1 脚本仍启用，非干净安装环境。

| 网站 | 页面 | 结果 |
| --- | --- | --- |
| Google | GitHub 搜索结果 | h3 实际 LXGW WenKai，7 个在线分片加载 |
| 知乎 | 首页 | 中文标题实际 LXGW WenKai，24 个分片加载 |
| V2EX | 首页 | 中英主题标题实际 LXGW WenKai，25 个分片加载 |
| YouTube | GitHub 搜索结果 | 标题及侧栏实际 LXGW WenKai，32 个分片加载；0.2.2 修复侧栏漏项 |
| GitHub | 公开仓库 README | 未通过，正文回退系统字体，代码 Menlo |
| X | GitHub 公开账号帖子 | 未通过，正文和导航回退系统字体 |

GitHub 的 securitypolicyviolation 显示 `font-src github.githubassets.com`；X 显示 `font-src 'self' https://*.twimg.com https://js.intercomcdn.com https://fonts.intercomcdn.com`。两者均阻止 jsDelivr 字体 URL。未关闭安全保护或绕过 CSP。

此前本地样例中，Brave 的 local() 字体探测失败而 Chrome 成功；没有关闭防护作因果对照，不能把此差异视为已确认原因。

## 验证边界

仅抽样桌面页面。未验证真实 Tampermonkey 安装升级、自动更新、document-start 时机、所有 SPA 路由、播放器字幕、全部图标库或移动端。JS 的 VM 检查只证明注入和域规则，不代表线上兼容。后续仓库整理保持样式及注入逻辑，调整元数据和构建路径；本次未重新运行 UI 验收。

截图保留在维护者本机，未纳入公开仓库。
