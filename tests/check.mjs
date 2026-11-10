import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../dist/global-wenkai.user.js', import.meta.url),'utf8');
for(const hostname of ['google.com','zhihu.com','v2ex.com','github.com','x.com','www.youtube.com','sspai.com','jiemian.com','userstyles.org','423down.com','greasyfork.org','example.com']) {
 const styles=[];
 vm.runInNewContext(source,{location:{hostname},GM_addStyle:css=>styles.push(css), document:{readyState:'loading',addEventListener(){}}});
 assert.equal(styles.length,1);
 assert.match(styles[0],/font-family: 'LXGW WenKai'.*!important/);
 assert.match(styles[0],/font-family: 'LXGW WenKai Mono'.*!important/);
 assert.doesNotMatch(styles[0],/@-moz-document|@import/);
 assert.match(styles[0], /https:\/\/cdn\.jsdelivr\.net\/npm\/lxgw-wenkai-webfont@1\.7\.0\/files\//);
 assert.equal(styles[0].includes('#ad_header_top'),hostname==='jiemian.com');
 assert.equal(styles[0].includes('.excerpt h2'),hostname==='423down.com');
 console.log(`PASS injection / scoped CSS: ${hostname}`);
}
