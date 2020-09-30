// Elmenets
const wordElement = document.getElementById('word');
const finalMessage = document.getElementById('final-message');
const popup = document.getElementById('popup-container');
const wrongLettersElement = document.getElementById('wrong-letters');
const figureParts = document.querySelectorAll('.figure-part');
const playButton = document.querySelector('#play-button');
const notification = document.querySelector('#notification-container');

// Word Repository
const words = ['application', 'programming', 'interface', 'wizard'];

let rnd = Math.floor(Math.random() * words.length)  // random number

let selectedWord = words[rnd]; // random word

const correctLetters = []; // store correct letter
const wrongLetters = [] //store wrong letter

displayWord();

// Press Key
window.addEventListener('keydown', e=> {

    let letter = e.key;

  if (e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
      if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
              correctLetters.push(letter);
              displayWord(); 
          }else{
              showNotification();
          }
          
      } else {
          if (!wrongLetters.includes(letter)) {
              wrongLetters.push(letter);
              updateWrongLetterElement();
          } else {
              showNotification();              
          }
          
      }
  }
});

// Press Play Again Button
playButton.addEventListener('click', () =>{

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetterElement();
    popup.style.display = 'none';
})

// Update and show last state of word
function displayWord(){
    letters = selectedWord.split('');

   /****************************************************
      <div class="word" id="word">
        <span class = "letter">w</span>
        <span class = "letter"></span>
        <span class = "letter">z</span>
        <span class = "letter"></span>
        <span class = "letter"></span>
    </div>
   ****************************************************/

/****************************************************
 * 1. Road
    let span =document.createElement('span');
    span.className = 'letter'; // alternative : span.classList.add('letter'); 
    letters.forEach(letter => {
        
    if(correctLetters.includes(letter)) span.textContent = letter;
    else span.textContent = '';
    wordElement.appendChild(span);
   });
   
Bir element icerisine yeni olusturdugunuz bir elementi foreach dongusu eklerken her defasinda etiketin olusturulmasi gerekir. Yukaridaki ilk ornek gibi yaparsaniz sadece bir element ekler. Yani elementi bir kere olusturup defaetle kullanmaniza izin vermiyor. Birden fazla olusturmak istiyorsaniz etiket olusturma islemini dongu icerisinde yapmaniz gerekir.

createElement() metodu olusturdugu elementi object olarak olusturur. Eger createElement() metodu ile olsuturulan element innerHTML ile eklenmek istenirse object yazdirir. createElement() metodu ile olusturulan bir element appendChild() metodu ile eklenmesi gerekir. 

* 2. Road
for (let i = 0; i < letters.length; i++) {
    let item = selectedWord.split('')[i];

    if (correctLetters.includes(item)) {
        wordElement.innerHTML += `<div class="letter">${item}</div>`;
    } else {
        wordElement.innerHTML += `<div class="letter"></div>`;            
    }        
}
****************************************************/   

    wordElement.innerHTML = '';
    letters.forEach(letter => {
        let span =document.createElement('span');
        span.className = 'letter';
        if(correctLetters.includes(letter)) span.textContent = letter;
        else span.textContent = '';
        wordElement.appendChild(span); 
    });
    
    const innerWord = wordElement.textContent;

    if(innerWord === selectedWord){
        finalMessage.innerHTML = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }
}

// Update and show wrongs letters
function updateWrongLetterElement() {
    /****************************************************
     * 1. Road
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}    
    `;

    * 2. Road
    wrongLettersElement.innerHTML = '';
    wrongLettersElement.innerHTML += '<p>Wrong</p><span>'
    wrongLetters.forEach(letter =>{
        wrongLettersElement.innerHTML += `<span>${letter}</span>`;
    });
    ****************************************************/    
    // My favourite method
    wrongLettersElement.innerHTML = '';
    if (wrongLetters.length > 0) {
        wrongLettersElement.innerHTML += `<p>Wrong</p><span>${wrongLetters.toString()}</span>`;
    }

    const errorNumber = wrongLetters.length;

    figureParts.forEach((part, index) => {
        if(index<errorNumber) part.style.display = 'block';
        else part.style.display = 'none';
    });

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerHTML = 'Unfortunately you lost';
        popup.style.display = 'flex';
    }

}

// Show notification when press same key again.
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{notification.classList.remove('show')}, 2000);
}






