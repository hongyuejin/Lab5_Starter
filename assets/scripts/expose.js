// expose.js

window.addEventListener('DOMContentLoaded', init);
 
function init() {

	// set up the confetti
	const jsConfetti = new JSConfetti();

	// Set up the dropdown menu
	var dropDMenu = document.getElementById("horn-select");
	var itemImage = document.images[0];
	var play = false; // flag to avoid playing sound when the dropdown menu is on select
	var audio = document.querySelector(".hidden");
	
	dropDMenu.addEventListener("change", function selectItem(){
		if(dropDMenu.options[dropDMenu.selectedIndex].value == "air-horn"){
			console.log(dropDMenu.options[dropDMenu.selectedIndex].value);
			audio.src = "assets/audio/air-horn.mp3";
			play = true;
			itemImage.src = "assets/images/air-horn.svg";
		}
		if(dropDMenu.options[dropDMenu.selectedIndex].value == "car-horn"){
			itemImage.src = "assets/images/car-horn.svg";
			play = true;
			audio.src = "assets/audio/car-horn.mp3";
		}
		if(dropDMenu.options[dropDMenu.selectedIndex].value == "party-horn"){
			itemImage.src = "assets/images/party-horn.svg";
			play = true;
			audio.src = "assets/audio/party-horn.mp3";
			jsConfetti.addConfetti();
		}
		if(dropDMenu.options[dropDMenu.selectedIndex].value == "select"){
			itemImage.src = "assets/images/no-image.png";
			audio.src = "";
			play = false;
		}
	})

	// play the horn by clicking the button
	var playHorn = document.querySelector("button");
	playHorn.addEventListener("click", function playSound(){
		if(play == true){
			console.log('element clicked');
			audio.play();
		}
	})

	// volume set up
	var volumebar = document.getElementById("volume");
	var volumePic = document.querySelector("img[src='assets/icons/volume-level-2.svg']");
	volumebar.addEventListener("input", function updateV(){
		audio.volume = this.value/100;
		if(audio.volume == 0){
			volumePic.src = "assets/icons/volume-level-0.svg";
		}
		if(audio.volume >= 0.01 && audio.volume < 0.33){
			volumePic.src = "assets/icons/volume-level-1.svg";
		}
		if(audio.volume >= 0.33 && audio.volume < 0.67){
			volumePic.src = "assets/icons/volume-level-2.svg";
		}
		if(audio.volume >= 0.67 && audio.volume < 1){
			volumePic.src = "assets/icons/volume-level-3.svg";
		}
	})
}
