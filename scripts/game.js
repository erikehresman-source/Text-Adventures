const els={
  moduleSelect:document.getElementById('moduleSelect'),
  startBtn:document.getElementById('startBtn'),
  continueBtn:document.getElementById('continueBtn'),
  resetBtn:document.getElementById('resetBtn'),
  toggleMaps:document.getElementById('toggleMaps'),
  game:document.getElementById('game'),
  hud:document.getElementById('hud'),
  encTitle:document.getElementById('encTitle'),
  encIntro:document.getElementById('encIntro'),
  encMap:document.getElementById('encMap'),
  choices:document.getElementById('choices'),
  encOutro:document.getElementById('encOutro'),
  codex:document.getElementById('codex'),
  codexList:document.getElementById('codexList')
};
let state={encounters:[],codex:[],index:0,mapsOn:true,xp:0};
async function fetchJSON(u){return (await fetch(u)).json()}
async function initModules(){const m=await fetchJSON('assets/modules.json');m.modules.forEach(mod=>{const o=document.createElement('option');o.value=mod.id;o.textContent=mod.name;o.dataset.encounters=mod.encounters;o.dataset.codex=mod.codex;els.moduleSelect.appendChild(o);});}
async function startModule(){const sel=els.moduleSelect.selectedOptions[0];if(!sel)return;state.encounters=await fetchJSON(sel.dataset.encounters);state.codex=await fetchJSON(sel.dataset.codex);state.index=0;els.game.hidden=false;els.codex.hidden=false;render();}
function applyOutcome(ch){state.xp+=ch.xp||0;}
function renderHUD(){els.hud.textContent='XP:'+state.xp;}
function renderEncounter(){const enc=state.encounters[state.index];if(!enc){els.encTitle.textContent='End';els.encIntro.textContent='No more encounters';els.encMap.hidden=true;els.choices.innerHTML='';els.encOutro.textContent='';return;}els.encTitle.textContent=enc.title;els.encIntro.textContent=enc.intro;if(enc.map&&state.mapsOn){els.encMap.hidden=false;els.encMap.textContent=enc.map;}else{els.encMap.hidden=true;}els.choices.innerHTML='';enc.choices.forEach(ch=>{const b=document.createElement('button');b.textContent=ch.text;b.onclick=()=>{applyOutcome(ch);els.encOutro.textContent=enc.outro;state.index++;render();};els.choices.appendChild(b);});}
function renderCodex(){els.codexList.innerHTML='';state.codex.forEach(c=>{const d=document.createElement('details');d.innerHTML='<summary>'+c.title+'</summary><p>'+c.core+'</p>';els.codexList.appendChild(d);});}
function render(){renderHUD();renderEncounter();renderCodex();}
els.startBtn.onclick=startModule;els.resetBtn.onclick=()=>{localStorage.clear();location.reload();};els.toggleMaps.onchange=e=>{state.mapsOn=e.target.checked;renderEncounter();};
initModules();