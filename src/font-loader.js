// Extension-owned requests only on sites whose font-src blocks the CSS fallback.
// The page CSP is left unchanged. No page content or cookies are sent to the CDN.
if (['github.com', 'x.com', 'twitter.com'].some(host => location.hostname === host || location.hostname.endsWith('.' + host))) {
  const fontDefinitions = __FONT_DEFINITIONS__;
  const seen = new Set();
  const localFamilies = new Set();
  const queue = [];
  let active = 0;
  let timer;
  function pump() {
    while (active < 4 && queue.length) {
      const definition = queue.shift();
      active++;
      GM_xmlhttpRequest({
        method: 'GET', url: definition.url, responseType: 'arraybuffer',
        anonymous: true, timeout: 20000,
        onload: async response => {
          try {
            if (response.status !== 200 || !response.response?.byteLength) throw new Error('Font response unavailable');
            const face = new FontFace(definition.family, response.response, {
              style: 'normal', weight: '400', unicodeRange: definition.range,
              display: 'swap'
            });
            await face.load();
            document.fonts.add(face);
          } catch (error) { console.warn('[Global WenKai] Font fallback failed:', error.message); }
          finally { active--; pump(); }
        },
        onerror: finishError, ontimeout: finishError,
      });
    }
  }
  function finishError() {
    console.warn('[Global WenKai] Font download failed; keeping system fallback.');
    active--; pump();
  }
  function scan() {
    timer = undefined;
    const chars = [...new Set(Array.from(document.body?.innerText || '', c => c.codePointAt(0)))].sort((a, b) => a - b);
    function contains(start, end) {
      let lo = 0, hi = chars.length;
      while (lo < hi) { const mid = (lo + hi) >>> 1; if (chars[mid] < start) lo = mid + 1; else hi = mid; }
      return lo < chars.length && chars[lo] <= end;
    }
    for (const definition of fontDefinitions) {
      if (seen.has(definition.url) || localFamilies.has(definition.family)) continue;
      if (definition.intervals.some(([start, end]) => contains(start, end))) {
        seen.add(definition.url);
        queue.push(definition);
      }
    }
    pump();
  }
  function schedule() { if (!timer) timer = setTimeout(scan, 500); }
  async function start() {
    // Do not download a family if an installed font from its CSS stack is usable.
    for (const [family, names] of [
      ['WenKai Online Fallback', ['LXGW WenKai', 'LXGW WenKai GB', 'LXGW WenKai TC', 'LXGW WenKai Screen']],
      ['WenKai Mono Online Fallback', ['LXGW WenKai Mono', 'LXGW WenKai Mono GB', 'LXGW WenKai Mono TC']],
    ]) {
      for (const name of names) {
        try { await new FontFace('WenKai Local Probe', `local("${name}")`).load(); localFamilies.add(family); break; }
        catch { /* Local font absent or hidden by the browser. */ }
      }
    }
    scan();
    new MutationObserver(schedule).observe(document.body, {childList: true, characterData: true, subtree: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
}
