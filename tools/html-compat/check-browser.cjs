'use strict';

// Real browser layout regression with a loopback HTTP/WebSocket fixture.
// CHROME_BIN and PUPPETEER_MODULE select an installed browser and Puppeteer.
// This does not emulate the Android firmware or prove media playback.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

async function main() {
  const [assetsDir, originalJs, originalCss, reportDir] = process.argv.slice(2);
  if (!reportDir || !process.env.CHROME_BIN || !process.env.PUPPETEER_MODULE)
    throw new Error('Set CHROME_BIN/PUPPETEER_MODULE; args: ASSETS ORIGINAL_JS ORIGINAL_CSS REPORT_DIR');
  fs.mkdirSync(reportDir, {recursive: true});
  const manifest = JSON.parse(fs.readFileSync(path.join(assetsDir, 'manifest.json'), 'utf8'));
  const original = fs.readFileSync(originalJs), css = fs.readFileSync(originalCss);
  const sourceName = path.basename(originalJs).replace(/\.baixados$/, '');
  const resource = manifest.resources.find(r => r.name === sourceName);
  assert(resource, 'Actual source must be recognized by the packaged registry');
  const sha = data => crypto.createHash('sha256').update(data).digest('hex');
  assert.equal(resource.sourceSha256, sha(original));
  const adapted = fs.readFileSync(path.join(assetsDir, path.basename(resource.asset)));
  assert.equal(resource.assetSha256, sha(adapted));
  const imageBytes = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect width="1920" height="1080" fill="#173356"/><rect x="40" y="40" width="1840" height="1000" fill="none" stroke="#36cf92" stroke-width="12"/><text x="960" y="550" text-anchor="middle" font-size="100" fill="white">TESTE DE IMAGEM</text></svg>');
  let lyric = 'Primeira letra de teste', caseKind = 'stage';
  const sockets = new Set(), clients = new Set(), requests = [];
  const stageTheme = {title: 'Fixture', css: {background: '#10243b'}, elements: [
    {id: 'main-letra', type: 'TEXT', text: '{cifra}', assetTypeVisibility: ['music'],
      css: {position: 'absolute', top: '10%', left: '5%', width: '90%', height: '50%', color: '#fff', fontSize: '60px', display: 'flex', alignItems: 'center'}},
    {id: 'visitor', type: 'TEXT', text: 'Visitante inicial', css: {position: 'absolute', top: '80%', left: '5%', width: '90%', height: '10%', color: '#fff', fontSize: '40px'}}
  ]};
  const imageTheme = {title: 'Fixture image', css: {}, elements: [
    {id: 'slide-content', type: 'IMAGE', src: 'slide', css: {position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', objectFit: 'cover'}}
  ]};
  const layer = () => caseKind === 'stage' ? [{asset: {guid: 'local-music', type: 'music', title: 'Teste'},
    props: {text: lyric, nextVerse: '', currentIndex: 1, totalCount: 2}}] :
    [{asset: {guid: 'fixture-image', type: 'image', title: 'Imagem'}, props: {}, theme: imageTheme}];
  const emit = (key, data) => {
    const body = Buffer.from(JSON.stringify({key, data}));
    const head = body.length < 126 ? Buffer.from([0x81, body.length]) : Buffer.from([0x81, 126, body.length >>> 8, body.length & 255]);
    for (const socket of clients) socket.write(Buffer.concat([head, body]));
  };
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost'); requests.push(url.pathname);
    res.setHeader('Cache-Control', 'no-store');
    const json = data => {res.setHeader('Content-Type', 'application/json');res.end(JSON.stringify(data));};
    if (url.pathname === '/slide/') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/main.css"><script defer src="/main.js?adapted=' + url.searchParams.get('adapted') + '"></script></head><body><div id="root"></div></body></html>');
    }
    if (url.pathname === '/main.js') {res.setHeader('Content-Type', 'application/javascript');return res.end(url.searchParams.get('adapted') === '1' ? adapted : original);}
    if (url.pathname === '/main.css') {res.setHeader('Content-Type', 'text/css');return res.end(css);}
    if (url.pathname === '/assets/fixture-image') {res.setHeader('Content-Type', 'image/svg+xml');return res.end(imageBytes);}
    if (url.pathname === '/stage/theme') return json({themeRef: 'local-theme'});
    if (url.pathname === '/assets/local-theme/manifest.json') return json(stageTheme);
    if (/^\/live\/[01]$/.test(url.pathname)) return json(layer());
    if (/^\/live\/[01]\/state$/.test(url.pathname)) return json([{show: true}]);
    if (/^\/live\/[01]\/master$/.test(url.pathname)) return json({opacity: 1});
    if (/^\/live\/[01]\/elements$/.test(url.pathname)) return json({});
    if (/^\/live\/[01]\/background$/.test(url.pathname)) return json(null);
    if (/^\/live\/[^/]+\/testpattern$/.test(url.pathname)) return json({on: false});
    if (url.pathname === '/stage/announcement') return json({announcement: null});
    if (url.pathname === '/timer') return json({running: false, remainingMs: 0});
    if (url.pathname === '/media/state') return json({playing: false, loop: false, time: 0});
    if (url.pathname === '/media/layers') return json([]);
    if (url.pathname === '/output/musicos/layers') return json({hidden: []});
    res.statusCode = 404;res.end();
  });
  server.on('connection', socket => {sockets.add(socket);socket.on('close', () => sockets.delete(socket));});
  server.on('upgrade', (req, socket) => {
    const accept = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
    socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
    clients.add(socket);socket.on('close', () => clients.delete(socket));socket.on('error', () => {});
    setTimeout(() => {if(clients.has(socket))emit('refresh.live.' + (caseKind === 'stage' ? '0' : '1'), {});}, 50);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require(process.env.PUPPETEER_MODULE);
  let browser;
  const results = [];
  try {
    browser = await puppeteer.launch({executablePath: process.env.CHROME_BIN, headless: true,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']});
    for (const kind of ['stage', 'image']) for (const fixed of [false, true]) {
      caseKind = kind;lyric = 'Primeira letra de teste';
      const page = await browser.newPage(), errors = [];
      await page.setViewport({width: 1920, height: 1080});
      await page.setRequestInterception(true);
      page.on('request', request => request.url().startsWith(base + '/') ? request.continue() : request.abort());
      page.on('pageerror', error => errors.push(error.message));
      const query = kind === 'stage' ? 'output=stage&outputId=fixture&stageThemeGuid=local-theme&id=stage' : 'output=1&netOutput=musicos&id=musicos';
      await page.goto(base + '/slide/?' + query + '&adapted=' + Number(fixed));
      const selector = kind === 'stage' ? '#main-letra' : '#slide-content';
      await page.waitForSelector(selector, {timeout: 15000});
      if (kind === 'image') await page.waitForFunction(() => {const i=document.getElementById('slide-content');return i&&i.complete&&i.naturalWidth>0;});
      const measure = () => page.evaluate(selector => {
        const box = element => {const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
        return {supportsInset:CSS.supports('inset','0'),theme:box(document.getElementById('theme')),
          content:box(document.querySelector(selector)),text:document.querySelector(selector).textContent};
      }, selector);
      const before = await measure();
      if (fixed) {
        assert.equal(before.theme.width, 1920);assert.equal(before.theme.height, 1080);
        assert(before.content.width >= 1720);
        if (kind === 'stage') {
          lyric = 'Segunda letra via WebSocket';emit('refresh.live.0', {});
          await page.waitForFunction(() => document.getElementById('main-letra').textContent.includes('Segunda letra'));
          emit('element.update.0', {layer:-1,elementId:'visitor',patch:{text:'Visitante atualizado'}});
          await page.waitForFunction(() => document.getElementById('visitor').textContent.includes('atualizado'));
        }
        await page.screenshot({path:path.join(reportDir,kind+'-adapted-1920.png')});
        await page.setViewport({width:1280,height:720});
        await page.waitForFunction(() => Math.abs(document.getElementById('theme').getBoundingClientRect().width-1280)<1);
        const resized=await measure();assert.equal(resized.theme.height,720);assert(resized.content.width>=1150);
        await page.reload();await page.waitForSelector(selector);
        await page.waitForFunction(kind => {
          const e=document.querySelector(kind==='stage'?'#main-letra':'#slide-content');
          return e && (kind==='stage' ? e.style.left==='5%' && e.style.width==='90%' : e.complete && e.naturalWidth>0);
        }, {}, kind);
        const reopened=await measure();assert.equal(reopened.theme.width,1280);assert.equal(reopened.theme.height,720);
        assert.equal(reopened.content.width,kind==='stage'?1152:1280);
        results.push({kind,adapted:fixed,initial:before,resized,reopened,errors});
      } else {
        if (!before.supportsInset) assert(before.theme.width < 100, 'Original must reproduce collapse without inset');
        await page.screenshot({path:path.join(reportDir,kind+'-original-1920.png')});
        results.push({kind,adapted:fixed,initial:before,errors});
      }
      assert.deepEqual(errors,[]);await page.close();
    }
    const report = {browser:await browser.version(),source:sourceName,sourceSha256:sha(original),results,
      limitation:'Loopback fixture in desktop Chromium; no Android firmware, NDI, audio or video playback test.'};
    fs.writeFileSync(path.join(reportDir,'browser-validation.json'),JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify(report,null,2));
  } finally {
    if(browser)await browser.close();for(const socket of sockets)socket.destroy();
    await new Promise(resolve=>server.close(resolve));
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
