"""Build offline, using only Python's standard library and pinned vendor CSS."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
meta = json.loads((ROOT / 'userscript.meta.json').read_text())
base = 'https://raw.githubusercontent.com/gewill/global-wenkai/main/dist/global-wenkai'
notices = '\n'.join([
    'Global WenKai code — MIT\n' + (ROOT / 'LICENSE').read_text(),
    'Bundled webfont CSS — lxgw-wenkai-webfont@1.7.0 — MIT\n' + (ROOT / 'vendor/LICENSE').read_text(),
    'Referenced font files — SIL OFL 1.1 (not covered by the project MIT license)\n' + (ROOT / 'vendor/OFL.txt').read_text(),
])
license_comment = '/*\n' + notices.replace('*/', '* /') + '\n*/\n'
fonts = []
for file, family, alias in [
    ('lxgwwenkai-regular.css', 'LXGW WenKai', 'WenKai Online Fallback'),
    ('lxgwwenkaimono-regular.css', 'LXGW WenKai Mono', 'WenKai Mono Online Fallback'),
]:
    sheet = (ROOT / 'vendor' / file).read_text()
    sheet = sheet.replace("font-family: '" + family + "'", "font-family: '" + alias + "'")
    sheet = sheet.replace("url('./files/", "url('https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/files/")
    fonts.append(sheet)
css = '/* Webfont source: lxgw-wenkai-webfont@1.7.0; see vendor/OFL.txt and vendor/LICENSE. */\n' + '\n'.join(fonts) + (ROOT / 'src/style.css').read_text()

# Existing site rules use simple domain blocks, with balanced CSS braces.
parts = []
pos = 0
for match in re.finditer(r'@-moz-document domain\("([^"\n]+)"\)\s*\{', css):
    parts.append('  css += ' + json.dumps(css[pos:match.start()], ensure_ascii=False) + ';')
    depth, end = 1, match.end()
    while depth:
        if css[end] == '{': depth += 1
        if css[end] == '}': depth -= 1
        end += 1
    domain = json.dumps(match[1])
    body = json.dumps(css[match.end():end-1], ensure_ascii=False)
    parts.append(f'  if (location.hostname === {domain} || location.hostname.endsWith("." + {domain})) {{\n    css += {body};\n  }}')
    pos = end
parts.append('  css += ' + json.dumps(css[pos:], ensure_ascii=False) + ';')
jsmeta = dict(meta)
jsmeta.update({'match': ['http://*/*', 'https://*/*'], 'grant': ['GM_addStyle', 'GM_xmlhttpRequest'], 'connect': 'cdn.jsdelivr.net', 'run-at': 'document-start', 'sandbox': 'DOM', 'updateURL': base + '.meta.js', 'downloadURL': base + '.user.js'})
header = '// ==UserScript==\n'
for key, values in jsmeta.items():
    for value in values if isinstance(values, list) else [values]:
        header += f'// @{key:<13} {value}\n'
header += '// ==/UserScript==\n'
stylemeta = dict(meta)
stylemeta.update({'preprocessor': 'default', 'updateURL': base + '.user.css', 'downloadURL': base + '.user.css'})
styleheader = '/* ==UserStyle==\n' + ''.join(f'@{key} {value}\n' for key, value in stylemeta.items()) + '==/UserStyle== */\n'
definitions = []
for block in re.findall(r'@font-face\s*\{([^}]+)\}', '\n'.join(fonts)):
    family = re.search(r"font-family: '([^']+)'", block)[1]
    url = re.search(r"url\('([^']+)'\)", block)[1]
    unicode_range = re.search(r'unicode-range:\s*([^;]+)', block)[1]
    intervals = []
    for value in unicode_range.split(','):
        bounds = value.strip()[2:].split('-')
        intervals.append([int(bounds[0], 16), int(bounds[-1], 16)])
    definitions.append(dict(family=family, url=url, range=unicode_range, intervals=intervals))
loader = (ROOT / 'src/font-loader.js').read_text().replace('__FONT_DEFINITIONS__', json.dumps(definitions))
out = ROOT / 'dist'
out.mkdir(exist_ok=True)
(out / 'global-wenkai.user.js').write_text(header + license_comment + '\n(() => {\n  "use strict";\n  let css = "";\n' + '\n'.join(parts) + '\n  GM_addStyle(css);\n' + loader + '\n})();\n')
(out / 'global-wenkai.meta.js').write_text(header)
(out / 'global-wenkai.user.css').write_text(styleheader + license_comment + css)
(out / 'SHA256SUMS').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n' for p in sorted(out.glob('global-wenkai.*'))))
print('Built global-wenkai ' + meta['version'])
