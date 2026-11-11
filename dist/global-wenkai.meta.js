// ==UserScript==
// @name          全局霞鹜文楷
// @name:en       Global Font: LXGW WenKai
// @namespace     RxWill
// @version       0.3.2
// @description   本地文楷优先，缺失时从 jsDelivr 加载在线字体；保留常见图标与数学公式。
// @author        Ge Will <531sunlight@gmail.com>
// @homepageURL   https://github.com/gewill/global-wenkai
// @supportURL    https://github.com/gewill/global-wenkai/issues
// @license       MIT
// @description:en Use local LXGW WenKai fonts first, with online font fallback from jsDelivr; preserve common icons and math.
// @name:zh       全局霞鹜文楷
// @name:zh-CN    全局霞鹜文楷
// @name:zh-TW    全局霞鶩文楷
// @description:zh 本地文楷优先，缺失时从 jsDelivr 加载在线字体；保留常见图标与数学公式。
// @description:zh-CN 本地文楷优先，缺失时从 jsDelivr 加载在线字体；保留常见图标与数学公式。
// @description:zh-TW 優先使用本機文楷，缺少時從 jsDelivr 載入線上字型；保留常見圖示與數學公式。
// @match         http://*/*
// @match         https://*/*
// @grant         GM_addStyle
// @grant         GM_xmlhttpRequest
// @connect       cdn.jsdelivr.net
// @run-at        document-start
// @sandbox       DOM
// @updateURL     https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai.meta.js
// @downloadURL   https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai.user.js
// ==/UserScript==
