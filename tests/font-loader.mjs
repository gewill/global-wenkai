import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../dist/global-wenkai.user.js',import.meta.url),'utf8');
async function scenario({hostname='github.com',local=false}={}) {
 const calls=[], faces=[], pending=[];
 let observer, ready;
 const document={body:{innerText:'Hello GitHub'},fonts:{add:f=>faces.push(f)},readyState:'loading',addEventListener:(_,fn)=>ready=fn};
 class FontFace { constructor(family,source,descriptors){Object.assign(this,{family,source,descriptors});} async load(){if(typeof this.source==='string'&&!local)throw Error('missing');return this;} }
 vm.runInNewContext(source,{location:{hostname},document,FontFace,console,GM_addStyle(){},GM_xmlhttpRequest:r=>calls.push(r),MutationObserver:class{constructor(fn){observer=fn;}observe(){}},setTimeout:fn=>{pending.push(fn);return 1;}});
 if(ready)await ready();
 return {calls,faces,document,mutate:text=>{document.body.innerText=text;observer();pending.shift()?.();}};
}
const s=await scenario();assert.ok(s.calls.length>0&&s.calls.length<=4);
for(let i=0;i<s.calls.length;i++){
 const r=s.calls[i];assert.equal(r.anonymous,true);assert.equal(r.responseType,'arraybuffer');assert.match(r.url,/^https:\/\/cdn\.jsdelivr\.net\/npm\/lxgw-wenkai-webfont@1\.7\.0\/files\//);
 await r.onload({status:200,response:new ArrayBuffer(8)});
}
assert.ok(s.faces.length>0);const before=s.calls.length;s.mutate('Hello GitHub');assert.equal(s.calls.length,before);
s.mutate('Hello GitHub 中文');assert.ok(s.calls.length>before);
assert.equal((await scenario({local:true})).calls.length,0);
assert.equal((await scenario({hostname:'example.com'})).calls.length,0);
const failed=await scenario();for(let i=0;i<failed.calls.length;i++)await failed.calls[i].onload({status:403,response:new ArrayBuffer(0)});assert.equal(failed.faces.length,0);
console.log('PASS binary loading, fixed CDN/anonymous requests, concurrency, deduplication, dynamic text, local priority, host scope, failed responses');
