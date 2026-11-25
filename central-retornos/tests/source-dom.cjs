// DOM integration only: synthetic Spresenter bridge and receiver, no real WebView.
const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const wait=async()=>{for(let i=0;i<20;i++)await new Promise(setImmediate);};
(async()=>{
 const dom=new JSDOM(fs.readFileSync(root+'/src/ui/index.html','utf8'),{url:'http://localhost/',runScripts:'outside-only'});
 const w=dom.window,d=w.document;let uiReceive,commandMode='ok',commands=[];
 for(const el of d.querySelectorAll('dialog')){el.showModal=function(){this.open=true;};el.close=function(){this.open=false;};}
 const ids=['synthetic-box-0001','synthetic-box-0002'];
 const states=ids.map(id=>({ok:true,schema:1,id,mode:'html',source:'Antiga',playback:{state:'loaded'}}));
 w.setInterval=()=>0;
 w.spresenter={storage:{get:async()=>({devices:ids.map((id,i)=>({id,name:'Box '+(i+1),address:'http://192.168.1.'+(20+i)+':48762',token:'a'.repeat(64)})),pc:{origin:'http://192.168.1.5:5050',token:'spk_synthetic_token'}}),set:async()=>{}},outputs:{list:async()=>[]},ui:{postMessage:m=>w.dispatchEvent(new w.MessageEvent('message',{data:{__spresenter:true,data:m}}))},net:{httpRequest:async req=>{
   const i=Number(new URL(req.url).hostname.split('.').pop())-20;
   const ok=x=>({ok:true,status:200,body:JSON.stringify(x)});
   if(req.url.endsWith('/advanced'))return ok({config:{outputs:[{type:'network',slug:'musicos',name:'Músicos'}]}});
   if(req.url.endsWith('/status'))return ok(states[i]);
   if(req.url.endsWith('/sources'))return ok({sources:[{mode:'ndi',name:'PC (Principal)'}]});
   if(req.url.endsWith('/commands')){
    const c=JSON.parse(req.body);
    if(c.action!=='catalog')commands.push({i,...c});
    if(c.action==='set_source'){
     if(commandMode==='fail')return {ok:false,status:503,body:'{}'};
     states[i]={...states[i],mode:c.mode,source:c.mode==='html'?'Músicos':c.name,playback:{state:c.mode==='html'?'loaded':'receiving'}};
    }
    return ok({ok:true,applied:true,command_id:c.id});
   }
   throw Error(req.url);
 }}};
 w.postMessage=envelope=>w.spresenter.ui.onmessage&&w.spresenter.ui.onmessage(envelope.data);
 try{
  w.eval(fs.readFileSync(root+'/src/ui/ui.js','utf8'));
  w.eval(fs.readFileSync(root+'/src/code.js','utf8'));
  await wait();assert.equal(d.querySelectorAll('.device').length,2);
  d.querySelector('[data-catalog]').click();assert(d.getElementById('action-dialog').open);
  assert.equal(d.getElementById('source-choice').value,'0');assert.equal(d.getElementById('target-device').value,'');
  d.getElementById('action-submit').click();assert.equal(commands.length,0);
  d.getElementById('target-device').value=ids[1];d.getElementById('target-device').dispatchEvent(new w.Event('change'));d.getElementById('action-submit').click();d.getElementById('action-submit').click();await wait();
  assert.equal(commands.length,1);assert.equal(commands[0].i,1);assert.equal(commands[0].url,'http://192.168.1.5:5050/output/musicos');
  assert.match(d.getElementById('action-notice').textContent,/Fonte aceita/);assert(d.getElementById('action-dialog').open);
  assert.match(d.querySelectorAll('.device')[1].textContent,/Músicos/);assert.match(d.querySelectorAll('.device')[0].textContent,/Antiga/);
  // Same destination, NDI discovered from the app rather than the HTML catalog.
  d.getElementById('source-choice').value='1';d.getElementById('action-submit').click();await wait();
  assert.equal(commands.length,2);assert.equal(commands[1].mode,'ndi');assert.equal(commands[1].name,'PC (Principal)');
  commandMode='fail';d.getElementById('source-choice').value='0';d.getElementById('action-submit').click();await wait();
  assert.equal(commands.length,3);assert(d.getElementById('action-notice').classList.contains('error'));assert(d.getElementById('action-dialog').open);
  assert(!d.getElementById('action-submit').disabled);
  console.log('PASS: real DOM, two destinations, HTML and NDI, duplicate click, receipt and visible failure; synthetic network only.');
 }finally{w.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
