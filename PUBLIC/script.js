let usuarioGlobal = null;
let escaneos = 0;
let amenazas = 0;
let chatHistorial = [];

async function cargarPerfil(){

const res = await fetch("/perfil");

if(!res.ok){
location.href="/";
return;
}

usuarioGlobal = await res.json();

mostrar("inicio");
}

/* MENU ACTIVO */

function activarMenu(seccion){

document.querySelectorAll("nav a").forEach(btn=>{
btn.classList.remove("active");
});

const actual=document.getElementById(`btn-${seccion}`);

if(actual){
actual.classList.add("active");
}

}

/* MOSTRAR SECCIONES */

function mostrar(seccion){

activarMenu(seccion);

const box=document.getElementById("contenido");

/* DASHBOARD */

if(seccion==="inicio"){

box.innerHTML=`

<header class="topbar">

<h1>Bienvenido ${usuarioGlobal.nombre}</h1>

<div class="status" id="estadoSistema">
● Sistema Seguro
</div>

</header>

<section class="cards">

<div class="card green">
<i class="fa-solid fa-shield"></i>
<h3>Protección</h3>
<p>Activa</p>
</div>

<div class="card blue">
<i class="fa-solid fa-magnifying-glass"></i>
<h3>Escaneos</h3>
<p>${escaneos}</p>
</div>

<div class="card red">
<i class="fa-solid fa-triangle-exclamation"></i>
<h3>Amenazas</h3>
<p>${amenazas}</p>
</div>

<div class="card">
<i class="fa-solid fa-lock"></i>
<h3>Estado</h3>
<p>Seguro</p>
</div>

</section>

`;

}

/* PERFIL */

if(seccion==="perfil"){

box.innerHTML=`

<header class="topbar">
<h1>Perfil</h1>
</header>

<section class="cards">

<div class="card green" style="grid-column:1/-1;text-align:center;">

<img src="/perfil.png" class="profile-image">

<h2>${usuarioGlobal.nombre}</h2>

<p>${usuarioGlobal.correo}</p>

</div>

<div class="card">
<h3>País</h3>
<p>${usuarioGlobal.pais}</p>
</div>

<div class="card">
<h3>Idioma</h3>
<p>${usuarioGlobal.idioma}</p>
</div>

<div class="card">
<h3>Nacimiento</h3>
<p>${usuarioGlobal.nacimiento}</p>
</div>

<div class="card blue">
<h3>Escaneos</h3>
<p>${escaneos}</p>
</div>

<div class="card red">
<h3>Amenazas</h3>
<p>${amenazas}</p>
</div>

</section>

`;

}

/* ESCANEO */

if(seccion==="escaneo"){

box.innerHTML=`

<header class="topbar">
<h1>Centro de Escaneo</h1>
</header>

<section class="cards">

<div class="card green" style="grid-column:1/-1;text-align:center;">

<i class="fa-solid fa-shield-virus" style="font-size:60px;"></i>

<h2 style="margin-top:20px;">Analizar amenazas</h2>

<p>CYBERGUARD verificará comportamientos sospechosos.</p>

<button onclick="scan()" style="margin-top:20px;">
Iniciar análisis
</button>

</div>

</section>

`;

}

/* ACADEMIA */

if(seccion==="academia"){

box.innerHTML=`

<header class="topbar">
<h1>Academia Digital</h1>
</header>

<section class="cards">

<div class="card" onclick="mostrar('libros')">
<h3>📘 Libros</h3>
<p>Aprende seguridad digital.</p>
</div>

<div class="card" onclick="mostrar('videos')">
<h3>🎥 Videos</h3>
<p>Contenido visual educativo.</p>
</div>

<div class="card" onclick="mostrar('podcast')">
<h3>🎙 Podcast</h3>
<p>Escucha consejos rápidos.</p>
</div>

</section>

`;

}

/* LIBROS */

if(seccion==="libros"){

box.innerHTML=`

<header class="topbar">
<h1>📘 Libros Digitales</h1>
</header>

<section class="cards">

<div class="card">
<h3>Ciberseguridad para jóvenes</h3>

<button onclick="abrirLink('https://unamglobal.unam.mx/tag/ciberseguridad/')">
Abrir recurso
</button>
</div>

<div class="card">
<h3>Guía de privacidad</h3>

<button onclick="abrirLink('https://www.incibe.es/menores')">
Abrir recurso
</button>
</div>

<div class="card">
<button onclick="mostrar('academia')">
Volver
</button>
</div>

</section>

`;

}

/* VIDEOS */

if(seccion==="videos"){

box.innerHTML=`

<header class="topbar">
<h1>🎥 Videos educativos</h1>
</header>

<section class="cards">

<div class="card">
<h3>Seguridad en internet</h3>

<button onclick="abrirLink('https://youtu.be/ZHQ03fSn9J0?si=Buf3aNMSDahl0Al6')">
Ver video
</button>
</div>

<div class="card">
<h3>Ciberacoso explicado</h3>

<button onclick="abrirLink('https://youtu.be/IpgKJy_psi8?si=WtsA5dg82q9U_9UT')">
Ver video
</button>
</div>

<div class="card">
<button onclick="mostrar('academia')">
Volver
</button>
</div>

</section>

`;

}

/* PODCAST */

if(seccion==="podcast"){

box.innerHTML=`

<header class="topbar">
<h1>🎙 Podcast</h1>
</header>

<section class="cards">

<div class="card">
<h3>Internet seguro</h3>

<button onclick="abrirLink('https://youtu.be/E235oRqubv4?si=74l3dsNeqFNZ1FO1')">
Escuchar
</button>
</div>

<div class="card">
<h3>Uso saludable de redes</h3>

<button onclick="abrirLink('https://youtu.be/HY3eRWhEOME?si=MuXqcnGkcgBRT3Kw')">
Escuchar
</button>
</div>

<div class="card">
<button onclick="mostrar('academia')">
Volver
</button>
</div>

</section>

`;

}

/* CHATBOT */

if(seccion==="chatbot"){

box.innerHTML=`

<header class="topbar">
<h1>CYBERBOT IA</h1>
</header>

<div class="chat-box">

<div id="mensajes" class="mensajes"></div>

<div class="chat-input">

<input id="pregunta" placeholder="Escribe un mensaje...">

<button onclick="enviarMensaje()">
Enviar
</button>

</div>

</div>

`;

renderMensajes();

}

}

/* ESCANEO PREMIUM */

function scan(){

escaneos++;

const overlay=document.getElementById("scanOverlay");

overlay.style.opacity="1";

const mensajes=[
"No se detectaron amenazas. Recomendamos visitar Academia > Videos.",
"Se detectó 1 amenaza y fue eliminada correctamente.",
"Sistema protegido correctamente.",
"Escaneo completado. Recomendamos revisar los podcasts educativos.",
"No se encontraron riesgos críticos."
];

setTimeout(()=>{

overlay.style.opacity="0";

const riesgo=Math.random()<0.25;

if(riesgo){
amenazas++;
}

const msg=mensajes[Math.floor(Math.random()*mensajes.length)];

alert(msg);

mostrar("inicio");

},3000);

}

/* LINKS */

function abrirLink(url){

const salir=confirm("Estás saliendo de CYBERGUARD. ¿Continuar?");

if(salir){
window.open(url,"_blank");
}

}

/* CHATBOT */

function enviarMensaje(){

const input = document.getElementById("pregunta");
const texto = input.value.trim();

if(!texto) return;

chatHistorial.push({
tipo:"user",
texto
});

input.value="";

renderMensajes();

setTimeout(()=>{

const respuesta = generarRespuesta(texto);

chatHistorial.push({
tipo:"bot",
texto:respuesta
});

renderMensajes();

},700);

}

function renderMensajes(){

const box=document.getElementById("mensajes");

if(!box) return;

box.innerHTML="";

chatHistorial.forEach(msg=>{

box.innerHTML+=`

<div class="${msg.tipo==='user'?'msg-user':'msg-bot'}">
${msg.texto}
</div>

`;

});

box.scrollTop=box.scrollHeight;

}

/* =========================
   CYBERBOT IA AVANZADO
========================= */

function generarRespuesta(texto){

const msg = texto.toLowerCase();

/* SALUDOS */

const saludos = [
"Hola. ¿Cómo puedo ayudarte hoy?",
"Hey. Estoy listo para ayudarte.",
"Hola, bienvenido a CYBERGUARD.",
"¿Qué necesitas revisar?",
"Hola. Puedes preguntarme sobre seguridad digital."
];

if(
msg.includes("hola") ||
msg.includes("hey") ||
msg.includes("buenas") ||
msg.includes("holi") ||
msg.includes("qué onda") ||
msg.includes("que onda")
){
return random(saludos);
}

/* DESPEDIDAS */

const despedidas = [
"Nos vemos.",
"Cuídate mucho.",
"Recuerda navegar con seguridad.",
"Fue un gusto ayudarte.",
"CYBERGUARD seguirá protegiéndote."
];

if(
msg.includes("adios") ||
msg.includes("bye") ||
msg.includes("nos vemos") ||
msg.includes("hasta luego")
){
return random(despedidas);
}

/* AGRADECIMIENTOS */

const gracias = [
"No hay problema.",
"Para eso estoy.",
"Con gusto.",
"Siempre es bueno ayudarte.",
"Cuenta conmigo."
];

if(
msg.includes("gracias") ||
msg.includes("muchas gracias") ||
msg.includes("thank")
){
return random(gracias);
}

/* IDENTIDAD */

if(
msg.includes("quien eres") ||
msg.includes("qué eres") ||
msg.includes("que eres")
){
return "Soy CYBERBOT, el asistente inteligente de CYBERGUARD.";
}

/* NOMBRE */

if(
msg.includes("como te llamas") ||
msg.includes("cuál es tu nombre") ||
msg.includes("cual es tu nombre")
){
return "Mi nombre es CYBERBOT.";
}

/* ESCANEO */

if(
msg.includes("escaneo") ||
msg.includes("analiza") ||
msg.includes("analisis") ||
msg.includes("análisis") ||
msg.includes("revisa mi sistema")
){

setTimeout(()=>{
scan();
},1000);

return "Iniciando análisis de seguridad...";
}

/* CIBERACOSO */

if(
msg.includes("ciberacoso") ||
msg.includes("me molestan") ||
msg.includes("me insultan") ||
msg.includes("me acosan") ||
msg.includes("bullying") ||
msg.includes("acoso")
){

const respuestas = [

"Guarda capturas de pantalla y evita responder agresivamente.",

"Bloquea las cuentas ofensivas y reporta el comportamiento.",

"Hablar con alguien de confianza puede ayudarte mucho.",

"El ciberacoso nunca debe ignorarse.",

"Puedes visitar Academia para aprender más sobre prevención."
];

return random(respuestas);
}

/* HACKING */

if(
msg.includes("hackear") ||
msg.includes("hackeo") ||
msg.includes("hack")
){
return "No puedo ayudar con actividades ilegales, pero sí puedo enseñarte cómo protegerte.";
}

/* CONTRASEÑAS */

if(
msg.includes("contraseña") ||
msg.includes("password")
){

const respuestas = [

"Usa contraseñas largas y difíciles de adivinar.",

"Evita usar fechas de nacimiento.",

"Combina letras, números y símbolos.",

"No compartas tus contraseñas con otras personas."
];

return random(respuestas);
}

/* REDES SOCIALES */

if(
msg.includes("facebook") ||
msg.includes("instagram") ||
msg.includes("tiktok") ||
msg.includes("redes sociales")
){

const respuestas = [

"Configura tus cuentas como privadas.",

"No compartas información sensible públicamente.",

"Ten cuidado con enlaces sospechosos.",

"Evita aceptar solicitudes de desconocidos."
];

return random(respuestas);
}

/* VIRUS */

if(
msg.includes("virus") ||
msg.includes("malware") ||
msg.includes("troyano")
){

const respuestas = [

"Mantén actualizado tu sistema operativo.",

"No descargues archivos sospechosos.",

"Evita instalar aplicaciones desconocidas.",

"CYBERGUARD puede ayudarte a detectar riesgos."
];

return random(respuestas);
}

/* AYUDA */

if(
msg.includes("ayuda") ||
msg.includes("qué puedes hacer") ||
msg.includes("que puedes hacer")
){

return `
Puedo ayudarte con:

• Seguridad digital
• Ciberacoso
• Contraseñas
• Redes sociales
• Escaneos
• Consejos de privacidad
• Navegación segura
`;
}

/* ACADEMIA */

if(
msg.includes("academia") ||
msg.includes("videos") ||
msg.includes("podcast") ||
msg.includes("libros")
){

setTimeout(()=>{
mostrar("academia");
},1000);

return "Abriendo Academia Digital...";
}

/* PERFIL */

if(
msg.includes("perfil") ||
msg.includes("mi cuenta")
){

setTimeout(()=>{
mostrar("perfil");
},1000);

return "Abriendo perfil.";
}

/* ESTADO */

if(
msg.includes("estado del sistema") ||
msg.includes("sistema")
){

return `
Estado actual:

• Escaneos: ${escaneos}
• Amenazas: ${amenazas}
• Protección: activa
`;
}

/* FELICIDAD */

if(
msg.includes("feliz") ||
msg.includes("contento")
){

return "Me alegra escuchar eso.";
}

/* TRISTEZA */

if(
msg.includes("triste") ||
msg.includes("mal") ||
msg.includes("solo")
){

return "Hablar con alguien de confianza puede ayudarte mucho.";
}

/* ESCUELA */

if(
msg.includes("escuela") ||
msg.includes("clases") ||
msg.includes("tarea")
){

return "La seguridad digital también es importante en la escuela.";
}

/* TECNOLOGÍA */

if(
msg.includes("ia") ||
msg.includes("inteligencia artificial")
){

return "La inteligencia artificial puede ayudar a detectar riesgos y mejorar la seguridad.";
}

/* CHISTES */

if(
msg.includes("chiste")
){

const chistes = [

"¿Por qué el antivirus terminó la relación? Porque detectó demasiadas amenazas.",

"Mi contraseña favorita sería segura... si pudiera recordarla.",

"El WiFi y yo tenemos una relación estable. Cuando falla, todo se derrumba."
];

return random(chistes);
}

/* CLIMA */

if(
msg.includes("clima")
){
return "Todavía no puedo consultar el clima.";
}

/* HORA */

if(
msg.includes("hora")
){

const hora = new Date().toLocaleTimeString();

return `La hora actual es ${hora}`;
}

/* FECHA */

if(
msg.includes("fecha")
){

const fecha = new Date().toLocaleDateString();

return `La fecha actual es ${fecha}`;
}

/* EMOJIS */

if(
msg.includes("xd") ||
msg.includes("jaja") ||
msg.includes("😂")
){

return "Me alegra que estés pasando un buen momento.";
}

/* INSULTOS */

if(
msg.includes("tonto") ||
msg.includes("idiota")
){

return "Prefiero mantener una conversación respetuosa.";
}

/* RESPUESTAS GENERALES */

const generales = [

"No estoy completamente seguro, pero puedo ayudarte con seguridad digital.",

"Interesante. ¿Puedes darme más detalles?",

"CYBERGUARD sigue aprendiendo constantemente.",

"Puedo ayudarte mejor si escribes más detalles.",

"Esa es una buena pregunta.",

"Analizando información...",

"Quizá Academia Digital tenga información útil sobre eso."
];

return random(generales);

}

/* RANDOM */

function random(arr){
return arr[Math.floor(Math.random()*arr.length)];
}

cargarPerfil();