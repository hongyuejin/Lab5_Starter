// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // populate all available speech voices
  populateVoice();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
	speechSynthesis.onvoiceschanged = populateVoice;
  }

  // get the input text
  var text = document.getElementById("text-to-speak");
  var input = text.value;
  var utter = new SpeechSynthesisUtterance(input);
  text.addEventListener("input", function readInput(){
		input = text.value;
  })
  

  // enable talk for the specific voice
  var selectVoice = document.getElementById("voice-select");
  selectVoice.addEventListener("change", function select(){
	const voices = speechSynthesis.getVoices();
	const selectedOption = selectVoice.options[selectVoice.selectedIndex].getAttribute("name");
	for (let ind = 0; ind < voices.length ; ind++) {
		if (voices[ind].name === selectedOption) {
		  utter.voice = voices[ind];
		  utter.lang = voices[ind].lang;
		  console.log(utter.lang);
		}
	  }
  })
  


  // play when button is clicked
  var play = document.querySelector("button");
  play.addEventListener("click", function playVoice(){
	utter.text = input;
	console.log("utter text: " + utter.text);
	speechSynthesis.speak(utter);
	checkFlag();
  })
}

function populateVoice() {
	if (typeof speechSynthesis === 'undefined') {
	  return;
	}
	const voices = speechSynthesis.getVoices();
	for (let i = 0; i < voices.length; i++) {
	  const option = document.createElement('option');
	  option.textContent = `${voices[i].name} (${voices[i].lang})`;
	  if (voices[i].default) {
		option.textContent += ' — DEFAULT';
	  }
	  option.setAttribute('lang', voices[i].lang);
	  option.setAttribute('name', voices[i].name);
	  document.getElementById("voice-select").appendChild(option);
	}
  }

  function checkFlag() {
	// update the image state
	var image = document.images[0];  
    if(speechSynthesis.speaking === true) {
		image.src = "assets/images/smiling-open.png";
        window.setTimeout(checkFlag, 50); /* this checks the flag every 50 milliseconds*/
    } else {
		image.src = "assets/images/smiling.png";
    }
}
