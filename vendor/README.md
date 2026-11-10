# 第三方资源

- 上游：https://github.com/chawyehsu/lxgw-wenkai-webfont
- npm 包：lxgw-wenkai-webfont，固定版本 1.7.0
- 原始 CSS：https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkai-regular.css
- 等宽 CSS：https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/lxgwwenkaimono-regular.css
- 两份 CSS 按原文件保存；构建时仅修改 family 别名与 URL 前缀。
- CSS 包许可证：LICENSE（保留 Chawye Hsu 著作权声明）。字体许可证：OFL.txt。
- WOFF2 不打包入仓库；由浏览器按 unicode-range 请求固定版本 CDN。

升级版本时须核对许可、CSS 文件、分片 URL 和真实字体加载，再更新构建器与检查中的固定版本；不使用浮动 latest。
