const activeBtn = document.querySelector('.btn');
//const imgSrc = document.querySelector('.img-colorfully');
const imgStatic = document.querySelector('.static');
const imgMove = document.querySelector('.move');
const jokes = document.querySelector('.jokes');
const cloudText = document.querySelector('.text-container');
var lang = 'en';

//Pic change
function changePicture() {
  imgMove.classList.toggle('active');
  imgStatic.classList.toggle('active');
  //activeBtn.classList.toggle('active');
  body.classList.toggle('active');
}

activeBtn.addEventListener('click', changePicture);

activeBtn.addEventListener('click', function () {
  setTimeout(changePicture, 3000);
});

// Получение данных от API on English
const url = 'https://type.fit/api/quotes';
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}
getData();

// Получение данных от API on Russian
async function getQuotes() {
  const quotes = './scripts/quotes.json';
  const res = await fetch(quotes);
  const data = await res.json();
  showData(data);
}
getQuotes();

var currentJoke = 0;

function showData(data) {
  currentJoke < data.length - 1
    ? (currentJoke = parseInt(data.length - Math.random() * 100))
    : (currentJoke = 0);
  jokes.textContent = data[currentJoke].text;
  window.localStorage.setItem('joke', currentJoke);
  console.log(currentJoke + 'currentJoke');
}

activeBtn.addEventListener('click', () => {
  lang == 'en' ? getData() : getQuotes();
});

function getLocalStorage() {
  currentJoke = localStorage.getItem('joke');
  lang = localStorage.getItem('lang');
  //getData;
  LangChange(lang);
}
window.addEventListener('load', getLocalStorage);

//Dialog window
cloudText.addEventListener('click', () => {
  if (
    confirm(`Do you want to change the language? \nВы хотите поменять язык?`)
  ) {
    lang == 'en' ? (lang = 'ru') : (lang = 'en');
    window.localStorage.setItem('lang', lang);
    LangChange(lang);
  } else {
    if (lang == 'en') {
      alert(`Well, whatever you want, it's your choice :)`);
    } else {
      alert(`Ну, как хотите, это Ваш выбор  :)`);
    }
  }
});

//LangChange
function LangChange(lang) {
  if (lang == 'en') {
    activeBtn.textContent = 'We need more fun';
    getData();
  }
  if (lang == 'ru') {
    activeBtn.textContent = 'Нам нужно больше веселья';
    getQuotes();
  }
}
