const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');



let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

displayWord();


function displayWord() {

  
    /****************************************************
      for (let i = 0; i < selectedWord.split('').length; i++) {
        let item = selectedWord.split('')[i];

        if (correctLetters.includes(item)) {
            wordEl.innerHTML += `<div class="letter">${item}</div>`;
        } else {
            wordEl.innerHTML += `<div class="letter"></div>`;            
        }        
    }
    console.log(wordEl.textContent);
    ****************************************************/
    
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `<span class= "letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}
    `;
    

   /****************************************************
      console.log(wordEl.textContent);
    console.log(wordEl.innerText);

    Bu ikisi farkli ciktilar verir. Ilki div icindeki span etiketleri icindeki text'leri yan yana yazdirirken ikincisi span etiketleri icindeki text'leri alt alta yazdirir. 
   ****************************************************/
   
//    const innerWord = wordEl.textContent.trim();

   const innerWord = wordEl.innerText.replace(/\n/g, '');


   console.log(innerWord);
   console.log(finalMessage);

  /****************************************************
     if (innerWord === selectedWord) {
       
       finalMessage.innerHTML = 'Congratulations! You won!';
    popup.style.display = 'flex';

   }
   else{
    finalMessage.innerHTML = '';
   }
  ****************************************************/
  
  if (innerWord === selectedWord) {
      finalMessage.innerText = 'Congratulations! You won!';
      popup.style.display = 'flex';
  }
   
}

// Update the wrong letters
function updateWrongLetterEl(){
 
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}    
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost';
        popup.style.display = 'flex'; 
    }
}


//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Press keys
window.addEventListener('keydown', e => {

    // console.log(e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122);

    
    if (e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterEl();

            }else{
                showNotification();
            }
        }
    }

});