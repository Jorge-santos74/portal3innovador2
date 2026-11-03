const questions=[
 {q:'¿Qué lenguaje define la estructura de una página web?',a:['HTML','CSS','SQL'],correct:0,why:'HTML organiza el contenido mediante elementos y etiquetas.'},
 {q:'¿Para qué se utiliza CSS?',a:['Guardar datos','Dar estilo y presentación a una página','Controlar versiones'],correct:1,why:'CSS controla colores, tipografía, espacios y distribución visual.'},
 {q:'¿Qué permite hacer Git?',a:['Administrar versiones del código','Diseñar bases de datos','Crear estilos'],correct:0,why:'Git registra cambios y permite volver a versiones anteriores.'}
];
let index=0,score=0,answered=false;
const $=s=>document.querySelector(s);
function render(){
 const q=questions[index];$('#qcount').textContent=`PREGUNTA ${index+1} DE ${questions.length}`;$('#score').textContent=`${score} correctas`;
 $('#question').textContent=q.q;$('#feedback').textContent='';$('#next').disabled=true;answered=false;
 $('#answers').innerHTML=q.a.map((a,i)=>`<button class="answer" data-i="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join('');
 document.querySelectorAll('.answer').forEach(b=>b.addEventListener('click',()=>choose(+b.dataset.i)));
}
function choose(n){if(answered)return;answered=true;const q=questions[index];
 document.querySelectorAll('.answer').forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add('good');else if(i===n)b.classList.add('bad')});
 if(n===q.correct)score++;$('#score').textContent=`${score} correctas`;$('#feedback').textContent=(n===q.correct?'¡Correcto! ':'Puedes repasarlo. ')+q.why;$('#next').disabled=false;
}
$('#next').addEventListener('click',()=>{if(index<questions.length-1){index++;render()}else{$('#question').textContent=`Resultado: ${score} de ${questions.length} correctas`;$('#answers').innerHTML='';$('#feedback').textContent='¡Buen trabajo! Reinicia la página para volver a intentarlo.';$('#next').disabled=true}});
$('#theme').addEventListener('click',()=>document.body.classList.toggle('light'));
$('#globalSearch').addEventListener('input',e=>{const term=e.target.value.toLowerCase();document.querySelectorAll('.searchable').forEach(card=>card.hidden=!card.innerText.toLowerCase().includes(term));});
render();