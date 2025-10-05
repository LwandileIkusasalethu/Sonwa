const messages = [
	"You make my world brighter 🌟",
	"Every moment with you is a gift 🎁",
	"Your smile is my favorite thing 😊",
	"I'm grateful for you, today and always 💖",
	"You + me = forever 💞",
	"Thinking of you and smiling right now 😘"
];

let idx = 0;
const messageEl = document.getElementById('message');
const heart = document.getElementById('heart');
const nextBtn = document.getElementById('nextBtn');

function showMessage(i){
	idx = ((i % messages.length) + messages.length) % messages.length;
	messageEl.textContent = messages[idx];
}

function nextMessage(){
	showMessage(idx + 1);
	animateHeartOnce();
}

let rotateTimer = null;
function startAutoRotate(){
	rotateTimer = setInterval(() => nextMessage(), 4000);
}
function stopAutoRotate(){
	if(rotateTimer){ clearInterval(rotateTimer); rotateTimer = null; }
}

function animateHeartOnce(){
	heart.classList.add('pulse');
	setTimeout(()=> heart.classList.remove('pulse'), 1000);
}

function spawnConfetti(x,y){
	for(let i=0;i<14;i++){
		const dot = document.createElement('div');
		dot.className = 'confetti';
		dot.style.left = x + (Math.random()*80 - 40) + 'px';
		dot.style.top = y + (Math.random()*20 - 10) + 'px';
		dot.style.background = ['#ff5c8a','#ffd36e','#9be7ff','#ffb3e6','#c6ffb3'][Math.floor(Math.random()*5)];
		document.body.appendChild(dot);
		setTimeout(()=> dot.remove(), 900);
	}
}

heart.addEventListener('click', (e)=>{
	stopAutoRotate();
	animateHeartOnce();
	const rect = heart.getBoundingClientRect();
	const x = rect.left + rect.width/2;
	const y = rect.top + rect.height/2;
	spawnConfetti(x,y);
	const prev = messageEl.textContent;
	messageEl.textContent = "I love you more than words can say ❤️";
	setTimeout(()=>{ messageEl.textContent = prev; startAutoRotate(); }, 2500);
});

nextBtn.addEventListener('click', ()=>{ stopAutoRotate(); nextMessage(); startAutoRotate(); });

// init
showMessage(0);
startAutoRotate();

