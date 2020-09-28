const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ['w', 'i', 'z', 'a', 'r', 'd'];
const wrongLetters = [];

function displayWord() {

    for (let i = 0; i < selectedWord.split('').length; i++) {
        let item = selectedWord.split('')[i];

        if (correctLetters.includes(item)) {
            wordEl.innerHTML += `<div class="letter">${item}</div>`;
        } else {
            wordEl.innerHTML += `<div class="letter"></div>`;            
        }        
    }
    console.log(wordEl.textContent);

   /****************************************************
      console.log(wordEl.textContent);
    console.log(wordEl.innerText);

    Bu ikisi farkli ciktilar verir. Ilki div icindeki span etiketleri icindeki text'leri alt alta yazdirirken ikincisi span etiketleri icindeki text'leri yan yana yazdirir. 
   ****************************************************/
   
   const innerWord = wordEl.textContent.trim();
   console.log(innerWord);
   console.log(finalMessage);

   if (innerWord === selectedWord) {
       
       finalMessage.innerHTML = 'Congratulations! You won!';
    popup.style.display = 'flex';

   }
   else{
    finalMessage.innerHTML = '';

   }
   
}

displayWord();