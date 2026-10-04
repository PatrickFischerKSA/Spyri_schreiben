const ids = ["thema", "zeit", "fakten", "e1", "e2", "e3", "plan", "original", "staerke", "abschnitt", "titel", "entwurftext", "verwendet", "feedback", "alt1", "neu1", "grund1", "alt2", "neu2", "grund2", "alt3", "neu3", "grund3", "endfassung", "kommentar"];
const first = "Schreibe mit uns eine neue Erzählung von 700–900 Wörtern auf Grundlage unseres Spyri200-Gruppenprojekts. Beschränke dich auf einen Hauptkonflikt und höchstens drei Szenen. Unsere gewählte Hauptfigur soll selbst entscheiden und mit den Folgen umgehen müssen. Entwickle einen neuen Verlauf statt einer Nacherzählung. Dies ist unsere Neuschöpfung, kein Original von Spyri.\n\nUnser Projekt, unsere Leitfrage und die gelesenen Texte: [Projekt]\nErzählform, Figuren und genauer Anschluss: [Anschluss]\nDrei feste Vorgaben aus dem Ausgangstext: [Vorgaben]\nDrei Erkenntnisse mit Belegen, Herkunftsprojekt und Folgen für die Handlung: [Erkenntnisse]\nUnser Plan in fünf Schritten: [Plan]\nOriginalpassage als sprachliches Vorbild mit Fundstelle: [Passage]\n\nHalte dich an unseren Plan. Die Erkenntnisse sollen Entscheidungen, Konflikte und Folgen prägen. Mindestens eine stammt aus unserem eigenen und eine aus einem anderen Gruppenprojekt; mindestens zwei sind an den gelesenen Primärtexten belegt. Übertrage die Erkenntnis aus dem anderen Projekt sinnvoll auf unsere Geschichte, ohne die Werke oder ihre Figurenwelten zu vermischen. Erfinde keine Textbelege, Quellen oder angeblichen Projektergebnisse. Bei wesentlichen Lücken oder Widersprüchen frage zuerst nach.\n\nPlausibilität, nachvollziehbare Beweggründe und Atmosphäre haben Vorrang. Figuren dürfen nur wissen, was sie erfahren haben. Verbinde Wahrnehmung, innere Bewegung und Handlung. Orientiere dich sprachlich an der Originalpassage, ohne Sätze zu kopieren oder künstlich altertümlich zu schreiben. Verwende Schweizer Rechtschreibung mit ss und Guillemets («…») und einen zurückhaltenden, authentischen Schweizer Ton. Zeige am Schluss eine Veränderung statt einer angehängten Moral.\n\nGib Titel und Erzählung aus. Erläutere danach in höchstens 80 Wörtern, wo die drei Erkenntnisse wirksam werden und welche Textangaben wir nochmals prüfen sollten.";
const second = "Prüfe unseren folgenden Abschnitt im Zusammenhang mit unserem Spyri200-Projekt.\nProjekt, Leitfrage und Texte: [einsetzen]\nUnsere Erkenntnisse: [einsetzen]\nNenne höchstens zwei konkrete Probleme bei Plausibilität, Umsetzung der Erkenntnisse oder Sprache und begründe sie kurz. Schlage höchstens eine passende Alternative vor. Erfinde keine Textbelege. Verwende Schweizer Rechtschreibung mit ss und Guillemets («…»).\nErhalte diese gelungene Stelle wortgleich: [einsetzen]\nMaximal 180 Wörter Antwort.\nAbschnitt: [einsetzen]";
const $ = id => document.getElementById(id);
const storageKey = 'heidi-schreibwerkstatt-v1';
const values = () => Object.fromEntries(ids.map(id => [id, $(id).value]));
const message = text => $('promptstatus').textContent = text;
function apply(data) { for (const id of ids) if (typeof data[id] === 'string') $(id).value = data[id]; }
function save() { try { localStorage.setItem(storageKey,JSON.stringify(values())); $('savestatus').textContent='In diesem Browser gespeichert. Sichert zusätzlich eine Datei.'; } catch { $('savestatus').textContent='Browserspeicherung nicht möglich. Bitte Arbeitsstand sichern.'; } }
try { const stored=JSON.parse(localStorage.getItem(storageKey)||'{}');if(stored&&typeof stored==='object')apply(stored); } catch { $('savestatus').textContent='Vorhandene Notizen konnten nicht geladen werden.'; }
for (const id of ids) $(id).addEventListener('input',()=>{save();updateCounts();});
function build() {
const required=['thema','zeit','fakten','e1','e2','e3','plan','original'];
const missing=required.filter(id=>!$(id).value.trim());
if(missing.length){message('Bitte zuerst alle Felder bis zur Originalpassage ausfüllen.');$(missing[0]).focus();return;}
const replacements=[$('thema').value,$('zeit').value,$('fakten').value,[1,2,3].map(i=>'E'+i+': '+$('e'+i).value).join('\n'),$('plan').value,$('original').value];
let position=0;
const text=first.replace(/\[[^\]]+\]/g,()=>replacements[position++]);
$('result').value=text;message('Prompt erstellt. Inhalt prüfen, dann kopieren.');
}
$('build').addEventListener('click',build);
$('review').addEventListener('click',()=>{if(!$('abschnitt').value.trim()){message('Bitte den zu prüfenden Abschnitt eintragen.');$('abschnitt').focus();return;}const replacements=[$('thema').value,[1,2,3].map(i=>$('e'+i).value).filter(Boolean).join('\n'),$('staerke').value||'Keine festgelegt',$('abschnitt').value];let position=0;$('result').value=second.replace(/\[einsetzen\]/g,()=>replacements[position++]);message('Prüfprompt erstellt.');});
$('copy').addEventListener('click',async()=>{if(!$('result').value){message('Zuerst einen Prompt erstellen.');return;}rememberPrompt();try{await navigator.clipboard.writeText($('result').value);message('Kopiert. Im Textchat einfügen.');}catch{$('result').focus();$('result').select();message('Bitte mit ⌘ + C oder Strg + C kopieren.');}});
$('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:2,...values()},null,2)],{type:'application/json'});const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download='spyri200-arbeitsstand.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('import').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>1000000)throw Error('too large');const data=JSON.parse(await f.text());if(!data||typeof data!=='object'||!ids.some(id=>typeof data[id]==='string'))throw Error('invalid');if(ids.some(id=>$(id).value)&&!confirm('Die vorhandenen Eingaben durch die geladenen Notizen ergänzen oder ersetzen?'))return;apply(data);save();updateCounts();}catch{$('savestatus').textContent='Datei konnte nicht geladen werden. Bitte eine exportierte Notizdatei wählen.'}finally{e.target.value='';}});

function rememberPrompt() {
 const prompt=$('result').value;
 if(prompt && !$('verwendet').value.includes(prompt)) {
  $('verwendet').value+=($('verwendet').value?'\n\n---\n\n':'')+prompt;
  save();
 }
}
function countWords(text) { return (text.match(/[\p{L}\p{N}]+(?:[’'–-][\p{L}\p{N}]+)*/gu)||[]).length; }
function updateCounts() {
 for(const [id,out,min,max] of [['entwurftext','draftcount',700,900],['endfassung','finalcount',700,900],['kommentar','commentcount',200,250]]) {
  const n=countWords($(id).value);
  $(out).textContent=n+' Wörter · Ziel: '+min+'–'+max+(n>=min&&n<=max?' · im vorgesehenen Umfang':'');
 }
}
function fieldLabel(id) { return document.querySelector('label[for="'+id+'"]').textContent; }
function checkWork() {
 const required=['thema','zeit','fakten','e1','e2','e3','plan','original','titel','entwurftext','feedback','alt1','neu1','grund1','alt2','neu2','grund2','alt3','neu3','grund3','endfassung','kommentar'];
 const missing=required.filter(id=>!$(id).value.trim());
 const messages=[];
 if(missing.length) messages.push('Noch ausfüllen: '+missing.map(id=>fieldLabel(id)+(/^(alt|neu|grund)/.test(id)?' (Änderung '+id.slice(-1)+')':'')).join(', ')+'.');
 for(const [id,min,max] of [['endfassung',700,900],['kommentar',200,250]]) {
  const n=countWords($(id).value);
  if(n<min||n>max) messages.push(fieldLabel(id)+': '+n+' Wörter; vorgesehen sind '+min+'–'+max+'.');
 }
 messages.push('Prüft selbst: höchstens drei Szenen, Erkenntnisse aus dem eigenen und einem anderen Projekt, mindestens zwei überprüfte Primärtextbelege und gegebenenfalls die verwendeten Prompts.');
 $('workstatus').textContent=(missing.length?'':'Alle Pflichtfelder sind ausgefüllt. ')+messages.join('\n');
}
$('checkwork').addEventListener('click',checkWork);
$('downloadtext').addEventListener('click',()=>{
 const parts=['SPYRI200 SCHREIBWERKSTATT'];
 for(const id of ids) {
  if(['staerke','abschnitt'].includes(id)&&!$(id).value.trim())continue;
  const heading=fieldLabel(id)+(/^(alt|neu|grund)[123]$/.test(id)?' · Änderung '+id.slice(-1):'');
  parts.push(heading+'\n'+($(id).value||'—'));
 }
 const url=URL.createObjectURL(new Blob([parts.join('\n\n')+'\n'],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='spyri200-schreibarbeit.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
updateCounts();
