var interval = null;
var mathboxSubtitles = null;
var intervalTime = 2000;

function setMathboxSlideIntervalTime(t){
	intervalTime = t;
}

function mathboxSlidePrevious() {
	mathboxSlideStopInterval();
	if(present.get('index')==0){
		present.set('index', present.get('length')); 
		mathboxSlideUpdateIndex();}
	else{
		present.set('index', (present.get('index') - 1)); 
		mathboxSlideUpdateIndex();}
}

function mathboxSlideAutoPlay(t = intervalTime) {
  intervalTime = t;
  if(interval){mathboxSlideStopInterval();}
  else{
  	  if(document.getElementsByClassName("mathbox-slide-player-place-pause-button").length>0){
  	  	document.getElementsByClassName("mathbox-slide-player-place-pause-button")[0].classList.remove('icon-play');
  	  	document.getElementsByClassName("mathbox-slide-player-place-pause-button")[0].classList.add('icon-pause');
  	  }
      interval = setInterval(function () {
      	present.set('index', (present.get('index') + 1) % (present.get('length') + 1));
      	mathboxSlideUpdateIndex();
      }, intervalTime);
  }
}

function mathboxSlideReset() {
  present.set('index', 0); 
  mathboxSlideUpdateIndex();}

function mathboxSlideNext() {
  mathboxSlideStopInterval();
  present.set('index', (present.get('index') + 1) % (present.get('length') + 1));
  mathboxSlideUpdateIndex();
}

function mathboxSlideStopInterval(){
	if(document.getElementsByClassName("mathbox-slide-player-place-pause-button").length>0){
  	  	document.getElementsByClassName("mathbox-slide-player-place-pause-button")[0].classList.remove('icon-pause');
		document.getElementsByClassName("mathbox-slide-player-place-pause-button")[0].classList.add('icon-play');
	}
	clearInterval(interval);
	interval = null;
}

function setMathboxSubtitles(subtitles){
	mathboxSubtitles = subtitles;
}

function mathboxSlideUpdateIndex(){
	if(document.getElementsByClassName("mathbox-slide-player-button-number").length>0){
  	  	document.getElementsByClassName("mathbox-slide-player-button-number")[0].innerHTML = present.get('index')+"/"+present.get('length');
	}
	// check if exists subtitles
	var mathboxSlideSubtitles = document.getElementById("mathbox-slide-subtitles")
	if(mathboxSlideSubtitles){
		// Fade out
		mathboxSlideSubtitles.style.opacity = 0;
		// Fade in 
	  	setTimeout(function(){ 
			mathboxSlideSubtitles.innerHTML = ""
			if (mathboxSubtitles){
				for(var i = 0; i < mathboxSubtitles.length; i++){
				  if(mathboxSubtitles[i].pos == present.get('index')) mathboxSlideSubtitles.innerHTML = mathboxSubtitles[i].subtitle;
				}
			}
			mathboxSlideSubtitles.style.opacity = 1;
		},300);
		
	}
}