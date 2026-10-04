// Lokale Arbeitshilfen: Formmerkmale prüfen, literarische Qualität nicht benoten.
(() => {
 const val=id=>document.getElementById(id).value.trim();
 const words=s=>(s.match(/[\p{L}\p{N}]+(?:[’'–-][\p{L}\p{N}]+)*/gu)||[]).length;
 const source=s=>/(?:\bS\.|Seite|Kapitel|\bKap\.|Vers)\s*\d+/i.test(s);
 const item=(text,id)=>({text,id});
 const range=(id,min,max)=>{
  const n=words(val(id));
  if(!n)return item(`Beginnt mit ${id==='kommentar'?'einer Erklärung eurer wichtigsten Gestaltungsentscheidung':'der Ausgangslage und dem Wunsch eurer Hauptfigur'}.`,id);
  if(n<min)return item(`${n} Wörter: Bis zum vorgesehenen Umfang fehlen ${min-n}. ${id==='kommentar'?'Erläutert eine Entscheidung an einer konkreten Stelle eurer Erzählung.':'Baut eine entscheidende Situation aus: Was nimmt die Figur wahr, weshalb entscheidet sie sich so, und was folgt daraus?'}`,id);
  if(n>max)return item(`${n} Wörter: Kürzt mindestens ${n-max}. ${id==='kommentar'?'Streicht Inhaltswiedergabe und erklärt stattdessen eure Entscheidungen.':'Prüft wiederholte Erklärungen und Nebenszenen; erhaltet die entscheidenden Handlungen.'}`,id);
  return item(`${n} Wörter liegen im vorgesehenen Umfang (${min}–${max}).`,id);
 };
 function prose(id){
  const s=val(id),out=[range(id,700,900)];
  if(!s)return out;
  if(s.includes('ß'))out.push(item('Im Text steht ß. Verwendet in eurer eigenen Erzählung die Schweizer Schreibweise ss.',id));
  if(/[„“”]/.test(s))out.push(item('Prüft die Anführungszeichen: Verwendet für direkte Rede «…».',id));
  if((s.match(/«/g)||[]).length!==(s.match(/»/g)||[]).length)out.push(item('Die Anzahl öffnender und schliessender Guillemets stimmt nicht überein. Kontrolliert die direkte Rede.',id));
  const long=s.split(/[.!?]+/).find(sentence=>words(sentence)>40);
  if(long)out.push(item('Ein Satz umfasst mehr als 40 Wörter. Lest ihn laut und prüft, ob zwei Sätze die Handlung klarer machen. Lange Sätze sind nicht grundsätzlich falsch.',id));
  if(words(s)>180&&!/\n\s*\n/.test(s))out.push(item('Der Text enthält keine durch Leerzeilen getrennten Absätze. Setzt Absätze bei Sprecherwechseln und neuen Handlungsschritten.',id));
  out.push(item('Am Text prüfen: Markiert die Entscheidung der Hauptfigur und ihre Folge. Wird ihr Beweggrund vorher erkennbar? Zählt die Szenen selbst: höchstens drei.',id));
  return out;
 }
 function evidence(id){
  const s=val(id),out=[];
  if(!s)return [item('Formuliert eine Erkenntnis als Aussage. Ergänzt Werk und Fundstelle, Herkunftsprojekt sowie die konkrete Folge für eure Handlung.',id)];
  if(!source(s))out.push(item('Keine nummerierte Seite oder Kapitelangabe erkannt. Ergänzt eine auffindbare Fundstelle, etwa «Werk, S. …»; anders angegebene Fundstellen prüft ihr selbst.',id));
  if(!/projekt|gruppe|eigene|andere/i.test(s))out.push(item('Macht die Herkunft sichtbar: Benennt das eigene oder das andere Gruppenprojekt.',id));
  if(words(s)<20)out.push(item('Die Notiz ist noch knapp. Trennt Aussage, Textbeleg und Deutung: Was genau zeigt die Stelle, und welche Entscheidung folgt daraus für eure Geschichte?',id));
  out.push(item('Am Primärtext prüfen: Trägt der angegebene Beleg wirklich eure Aussage? Beschreibt anschliessend, was ohne diese Erkenntnis in eurer Handlung anders wäre.',id));
  return out;
 }
 function revision(i){
  const a=val('alt'+i),n=val('neu'+i),g=val('grund'+i),out=[];
  if(!a)out.push(item('Setzt die ursprüngliche Stelle ein, damit eure Änderung nachvollziehbar wird.','alt'+i));
  if(!n)out.push(item('Formuliert die überarbeitete Stelle vollständig aus.','neu'+i));
  if(a&&n&&a===n)out.push(item('Alte und neue Stelle sind wortgleich. Nehmt eine tatsächliche Änderung vor oder wählt eine andere Stelle.','neu'+i));
  if(!g||words(g)<10)out.push(item('Begründet die Wirkung: «Vorher …; jetzt …; dadurch wird für die Lesenden …». Benennt die konkrete Verbesserung.','grund'+i));
  if(a&&n&&a!==n&&words(g)>=10)out.push(item('Zwei unterschiedliche Fassungen und eine Begründung sind eingetragen. Prüft, ob die Begründung genau diese Änderung erklärt.','grund'+i));
  out.push(item(['Prüft, ob die neue Fassung Motiv, Figurenwissen oder Handlungsfolge nachvollziehbarer macht.','Lest beide Fassungen laut. Welche konkrete Wahrnehmung oder Formulierung stärkt die Atmosphäre?','Nennt die Erkenntnis (E1, E2 oder E3), die durch die Änderung stärker auf Entscheidung und Folge wirkt.'][i-1],'neu'+i));
  return out;
 }
 const checks={
  auftrag:()=>[item(val('thema')?'Euer Projekt ist eingetragen. Prüft, ob Titel, Leitfrage und gelesene Werke für eine andere Gruppe eindeutig erkennbar sind.':'Startet mit eurem eigenen Spyri200-Projekt: Tragt Titel, Leitfrage und gelesene Werke ein.','thema'),item(val('zeit')?'Kontrolliert eure Anschlussstelle: Was ist zu diesem Zeitpunkt bereits geschehen, und was wissen die Figuren?':'Legt fest: Ergänzung oder Fortschreibung, beteiligte Figuren und genaue Anschlussstelle.','zeit')],
  bogen:()=>{
   const out=[];
   if(!val('thema'))out.push(item('Das Projekt fehlt noch: Titel, Leitfrage und gelesene Werke eintragen.','thema'));
   if(!val('zeit'))out.push(item('Legt Erzählform, Figuren und Anschlussstelle fest.','zeit'));
   if(!val('fakten'))out.push(item('Notiert drei Vorgaben aus dem Ausgangstext, denen eure neue Handlung nicht widersprechen darf.','fakten'));
   else if(!source(val('fakten')))out.push(item('Für die festen Vorgaben ist keine nummerierte Fundstelle erkennbar. Ergänzt Werk und Seite oder Kapitel.','fakten'));
   const filled=['e1','e2','e3'].filter(id=>val(id)).length;
   out.push(item(`${filled} von 3 Erkenntnisfeldern sind ausgefüllt. Prüft die Herkunft: mindestens eine aus eurem eigenen und eine aus einem anderen Projekt; mindestens zwei mit Primärtextbelegen.`,'e1'));
   out.push(item('Die Hinweise direkt unter den Feldern helfen euch beim Belegen und Planen. Die Richtigkeit der Quellen prüft ihr am Original.','plan'));
   return out;
  },
  plan:()=>{
   if(!val('plan'))return [item('Notiert fünf verbundene Schritte: Ausgangslage → Wunsch → Hindernis → Entscheidung mit Folge → Veränderung.','plan')];
   const out=[];if(words(val('plan'))<40)out.push(item('Der Plan ist noch knapp. Gebt bei jedem der fünf Schritte an, wer handelt und weshalb der nächste Schritt daraus folgt.','plan'));
   out.push(item('Prüft die Kette: Entsteht das Hindernis aus nachvollziehbaren Interessen? Löst eine Entscheidung die Folge aus? Ordnet E1–E3 den passenden Handlungsschritten zu.','plan'));
   return out;
  },
  original:()=>{
   const s=val('original');if(!s)return [item('Wählt eine passende Originalpassage aus einem eurer gelesenen Spyri-Texte und ergänzt die Fundstelle.','original')];
   const n=words(s),out=[item(`${n} Wörter einschliesslich eurer Quellenangabe. Für die Passage selbst sind 80–120 Wörter vorgesehen. ${n<80?'Wählt einen etwas längeren zusammenhängenden Ausschnitt.':n>135?'Grenzt den Ausschnitt auf die erzählerisch wichtige Stelle ein.':'Zählt die Quellenangabe beim Prüfen des Umfangs nicht mit.'}`,'original')];
   if(!source(s))out.push(item('Ergänzt eine auffindbare Fundstelle mit Werk und Seite oder Kapitel.','original'));
   out.push(item('Benennt für euch ein übertragbares Merkmal: etwa die Verbindung von Wahrnehmung und Handlung oder die Gestaltung der Figurenrede.','original'));return out;
  },
  prompts:()=>{
   const missing=['thema','zeit','fakten','e1','e2','e3','plan','original'].filter(id=>!val(id));
   const out=missing.length?[item(`Für den Entwurfsprompt fehlen noch ${missing.length} Felder. Ergänzt zuerst «${document.querySelector('label[for="'+missing[0]+'"]').textContent}».`,missing[0])]:[item('Die Eingaben für den Entwurfsprompt sind ausgefüllt. Prüft die Belege und lest den erzeugten Auftrag vor dem Kopieren durch.','result')];
   out.push(item('Für eine gezielte Überarbeitung: Wählt einen Abschnitt mit einem konkreten Problem und markiert eine gelungene Stelle, die erhalten bleiben soll.','abschnitt'));
   out.push(item('Ihr schreibt selbst? Geht mit eurem Plan direkt zum Entwurf weiter.','entwurftext'));return out;
  },
  entwurf:()=>[...(!val('titel')?[item('Gebt der Erzählung einen Arbeitstitel, der zur zentralen Situation passt.','titel')]:[]),...prose('entwurftext')],
  redaktion:()=>{
   const out=[];if(!val('feedback'))out.push(item('Holt eine Rückmeldung ein: zwei erkennbare Erkenntnisse mit Textstellen, eine unklare und eine gelungene Passage.','feedback'));
   else out.push(item('Prüft die Rückmeldung: Sind konkrete Textstellen genannt? Übersetzt eine unklare Stelle in einen Überarbeitungsauftrag.','feedback'));
   let done=0;for(let i=1;i<=3;i++)if(val('alt'+i)&&val('neu'+i)&&val('grund'+i)&&val('alt'+i)!==val('neu'+i))done++;
   out.push(item(`${done} von 3 Änderungen enthalten unterschiedliche Fassungen und eine Begründung. Nutzt die Hinweise unter jeder Änderung.`,'alt1'));return out;
  },
  abgabe:()=>{
   const out=prose('endfassung');
   if(val('endfassung')&&val('endfassung')===val('entwurftext'))out.push(item('Endfassung und erster Entwurf sind identisch. Übertragt eure begründeten Änderungen in die Endfassung.','endfassung'));
   else if(val('endfassung')){for(let i=1;i<=3;i++)if(val('neu'+i)&&!val('endfassung').includes(val('neu'+i)))out.push(item(`Die neue Stelle aus Änderung ${i} ist nicht wortgleich in der Endfassung auffindbar. Prüft, ob sie übernommen oder nochmals angepasst wurde.`,'endfassung'));}
   out.push(item('Prüft zuletzt die Vollständigkeit und sichert sowohl die Textdatei für die Abgabe als auch den JSON-Arbeitsstand.','kommentar'));return out;
  },
  kommentar:()=>{
   const out=[range('kommentar',200,250)];
   if(val('kommentar'))out.push(item('Prüft jeden Absatz: Nennt er eine gestalterische Entscheidung, eine konkrete Stelle eurer Erzählung und deren Wirkung? Erklärt auch, wie zwei Erkenntnisse zusammenwirken und was eure Überarbeitung verbessert.','kommentar'));return out;
  }
 };
 ['e1','e2','e3'].forEach(id=>checks[id]=()=>evidence(id));
 for(let i=1;i<=3;i++)checks['revision'+i]=()=>revision(i);
 const panels={};
 function mount(key,anchor,title){
  const box=document.createElement('aside');box.className='instant-feedback';box.id='feedback-'+key;
  const heading=document.createElement('strong');heading.textContent=title;box.append(heading);
  const list=document.createElement('ul');box.append(list);
  const button=document.createElement('button');button.type='button';button.textContent='Feedback aktualisieren';
  button.addEventListener('click',()=>{render(key);box.querySelector('.feedback-updated').textContent='Feedback aktualisiert.';});box.append(button);
  const status=document.createElement('span');status.className='feedback-updated';status.setAttribute('role','status');box.append(status);
  anchor.insertAdjacentElement('afterend',box);panels[key]=list;
 }
 function render(key){
  const list=panels[key];list.replaceChildren();
  for(const {text,id}of checks[key]()){
   const li=document.createElement('li');li.append(document.createTextNode(text+' '));
   if(id){const a=document.createElement('a');a.href='#'+id;a.textContent='Zum Feld';a.addEventListener('click',event=>{event.preventDefault();document.getElementById(id).focus();});li.append(a);}
   list.append(li);
  }
 }
 ['auftrag','bogen','prompts','entwurf','redaktion','abgabe'].forEach(key=>mount(key,document.querySelector('#'+key+' h2'),'Sofortfeedback zu diesem Schritt'));
 ['e1','e2','e3','plan','original','kommentar'].forEach(key=>mount(key,document.getElementById(key),'Hinweise zu eurer Eingabe'));
 document.querySelectorAll('#redaktion fieldset').forEach((el,i)=>mount('revision'+(i+1),el,'Feedback zu Änderung '+(i+1)));
 const note=document.createElement('p');note.className='feedback-note';note.textContent='Das Sofortfeedback aktualisiert sich beim Schreiben. Es prüft Umfang und Form und gibt Überarbeitungsimpulse; Belege und literarische Qualität beurteilt ihr am Text.';
 document.querySelector('#auftrag h2').insertAdjacentElement('afterend',note);
 let timer;const refresh=()=>Object.keys(panels).forEach(render);
 document.addEventListener('input',event=>{if(event.target.matches('textarea')){clearTimeout(timer);timer=setTimeout(refresh,450);}});
 document.addEventListener('workshop-updated',refresh);
 refresh();
})();
