const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../src/ui/ui.js'),'utf8');
function ui(){
  const elements=new Map(),messages=[],timers=new Map();let counter=0,receive,click;
  const get=id=>{
    if(!elements.has(id))elements.set(id,{value:'',textContent:'',innerHTML:'',hidden:false,disabled:false,open:false,
      setAttribute(){},removeAttribute(){},addEventListener(){},checkValidity(){return true;},reportValidity(){},focus(){},showModal(){this.open=true;},close(){this.open=false;}});
    return elements.get(id);
  };
  const parent={postMessage:m=>messages.push(m.data)};
  vm.runInNewContext(source,{document:{getElementById:get,addEventListener:(name,fn)=>{if(name==='click')click=fn;},hidden:false},
    window:{parent,addEventListener:(name,handler)=>{if(name==='message')receive=handler;}},
    crypto:{randomUUID:()=>`test-request-${++counter}`},setInterval(){},
    setTimeout:fn=>{const id=++counter;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id),
    Map,Set,Date,Math,Number,String,Array,Object});
  return {get,messages,timers,receive:(data,source=null)=>receive({source,data:{__spresenter:true,data}}),
    click:id=>get(id).onclick(),delegate:(selector,dataset)=>click({target:{closest:s=>s===selector?{dataset}:null}})};
}
test('native relay with null source updates the UI according to the official SDK envelope',()=>{
  const h=ui();h.receive({type:'state',devices:[],catalog:[{name:'Músicos'}],outputs:[],pcConfigured:true,found:[]});
  assert.equal(h.get('catalog-state').textContent,'1 saídas HTML');
  h.receive({type:'notice',text:'Acesso recusado. Confira o código.',error:true});
  assert.equal(h.get('pair-notice').hidden,false);assert.match(h.get('pair-notice').textContent,/código/);
});
test('pairing shows an immediate attempt and accepts start/finish acknowledgement',()=>{
  const h=ui();h.get('pair-address').value='192.168.2.20:48762';h.get('pair-code').value='123456';
  h.click('pair-submit');const request=h.messages.at(-1);
  assert.equal(request.type,'pair');assert.equal(request.code,'123456');
  assert.match(h.get('pair-notice').textContent,/Tentando vincular/);assert.equal(h.get('pair-submit').disabled,true);
  h.receive({type:'operation',requestId:request.requestId,phase:'started'});
  h.receive({type:'notice',text:'Retorno pareado.',error:false});
  h.receive({type:'operation',requestId:request.requestId,phase:'finished'});
  assert.equal(h.get('pair-submit').disabled,false);assert.match(h.get('pair-notice').textContent,/pareado/);
});
test('catalog and discovery actions show progress and an absent logic process never stays silent',()=>{
  const h=ui();h.get('pc-link').value='http://192.168.2.5:5050/warp/?token=spk_test_only';h.click('pc-submit');
  assert.equal(h.messages.at(-1).type,'pc');assert.equal(h.get('pc-link').value,'');
  assert.match(h.get('notice').textContent,/Consultando/);
  h.get('scan-prefix').value='192.168.2';h.get('scan-range').onclick();
  assert.equal(h.messages.at(-1).prefix,'192.168.2');assert.match(h.get('pair-notice').textContent,/Iniciando busca/);
  for(const fn of [...h.timers.values()])fn();
  assert.match(h.get('pair-notice').textContent,/plugin não respondeu/);assert.equal(h.get('scan').disabled,false);
});

test('invalid fields do not send pairing and a pending click never sends twice',()=>{
  const h=ui();h.get('pair-code').checkValidity=()=>false;
  const before=h.messages.length;h.click('pair-submit');assert.equal(h.messages.length,before);
  h.get('pair-code').checkValidity=()=>true;h.click('pair-submit');h.click('pair-submit');
  assert.equal(h.messages.filter(m=>m.type==='pair').length,1);
});

const box=(id='box-one')=>({id,name:id,address:'http://192.168.1.20:48762',lastSeen:Date.now(),failures:0,durable:true,status:{mode:'html',source:'Antiga',playback:{state:'loaded'}}});
const catalog=()=>[{mode:'html',name:'Músicos',url:'http://192.168.1.5:5050/output/musicos'}];
function sourceState(h,devices=[box()]){h.receive({type:'state',devices,catalog:catalog(),outputs:[],found:[]});}
test('NDI capture and render metrics stay distinct and older apps show missing values',()=>{
  const h=ui(),d=box();
  d.status={mode:'ndi',playback:{capture_fps:60,render_fps:30,superseded_frames:29,max_render_ms:33,audio_queue_ms:40,audio_write_errors:0}};
  sourceState(h,[d]);h.delegate('[data-do]',{do:'details',device:d.id});
  const html=h.get('detail').innerHTML;
  assert.match(html,/Captura NDI medida<\/th><td>60[.,]0 fps/);
  assert.match(html,/Envio de quadros à tela<\/th><td>30[.,]0 fps/);
  assert.match(html,/Substituídos antes do desenho<\/th><td>29/);
  assert.match(html,/Áudio na fila do app<\/th><td>40 ms/);
  d.status={mode:'ndi',playback:{capture_fps:60}};
  sourceState(h,[d]);h.delegate('[data-do]',{do:'details',device:d.id});
  assert.match(h.get('detail').innerHTML,/Envio de quadros à tela<\/th><td>— fps/);
  assert.doesNotMatch(h.get('detail').innerHTML,/NaN|undefined/);
});
test('catalog names are actionable and selecting one does not transmit before confirmation',()=>{
  const h=ui();sourceState(h);assert.match(h.get('catalog-list').innerHTML,/data-catalog="0"/);
  h.delegate('[data-catalog]',{catalog:'0'});
  assert.equal(h.get('action-dialog').open,true);assert.equal(h.get('source-choice').value,'0');
  assert(!h.messages.some(m=>m.type==='command'));
});
test('source command retains modal feedback, targets the selected box and blocks duplicate click',()=>{
  const h=ui();sourceState(h,[box(),box('box-two')]);h.delegate('[data-catalog]',{catalog:'0'});
  h.get('target-device').value='box-two';h.click('action-submit');h.click('action-submit');
  const commands=h.messages.filter(m=>m.type==='command');assert.equal(commands.length,1);
  const m=commands[0];assert.equal(m.device,'box-two');assert.equal(m.url,catalog()[0].url);assert.equal(m.action,'set_source');
  assert(m.requestId);assert(m.commandId);assert.equal(h.get('action-dialog').open,true);
  assert.match(h.get('action-notice').textContent,/Enviando/);
  h.receive({type:'notice',text:'Fonte aceita pelo app: Músicos.',error:false});
  h.receive({type:'operation',requestId:m.requestId,phase:'finished'});
  assert.equal(h.get('action-submit').disabled,false);assert.match(h.get('action-notice').textContent,/Fonte aceita/);
});
test('multiple boxes require an explicit destination and an offline catalog cannot send',()=>{
  const h=ui();sourceState(h,[box(),box('box-two')]);h.delegate('[data-catalog]',{catalog:'0'});
  h.click('action-submit');assert(!h.messages.some(m=>m.type==='command'));
  assert.match(h.get('action-notice').textContent,/Selecione a box/);
  const off=ui();sourceState(off,[{...box(),lastSeen:0}]);off.delegate('[data-catalog]',{catalog:'0'});
  assert.equal(off.get('action-dialog').open,false);assert.match(off.get('notice').textContent,/Vincule uma box/);
});
test('source failures and bridge timeout remain visible inside the action dialog',()=>{
  const h=ui();sourceState(h);h.delegate('[data-catalog]',{catalog:'0'});h.get('target-device').value='box-one';h.click('action-submit');
  h.receive({type:'notice',text:'O comando não foi confirmado.',error:true});assert.match(h.get('action-notice').textContent,/não foi confirmado/);
  for(const fn of [...h.timers.values()])fn();
  assert.match(h.get('action-notice').textContent,/plugin não respondeu/);assert.equal(h.get('action-submit').disabled,false);
  assert.equal(h.messages.filter(m=>m.type==='command').length,1);
});
