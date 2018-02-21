var myInit = { 
	method: 'GET',
  cache: 'default' 
};

let fetchedStories = [];
const resultsWrapper = document.getElementById('results');

function makeStory(data) {
  var wrapper = document.createElement('a');

  wrapper.id = data.id;

  wrapper.classList.add('story');
  var sentence = document.createElement('h2');
  var title = document.createElement('h1');
  var sourceName = document.createElement('p');
  var image;

  if(data.visual) {
  	if(!data.visual.url) {
  		image = '/img/no-img.jpg';
  		
  	} else {
  		image = data.visual.url;
  	}
  } else {
  	image = '/img/no-img.jpg';
  }
  

  wrapper.style.backgroundImage = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(148,148,148,0) 42%,rgba(0,0,0,1) 100%), url(' + image + ')';
  title.innerHTML = data.title;
  wrapper.href = data.originId;
  sourceName.innerHTML = data.origin.title;
  // sentence.innerHTML = data.title;

  // wrapper.appendChild(sentence);
  wrapper.appendChild(title);
  wrapper.appendChild(sourceName);
  resultsWrapper.appendChild(wrapper);
}


function runCarousel() {

  var swiper = new Swiper('#aylien-output', {
    wrapperClass: 'story-results',
    slideClass: 'story',
    slidesPerView: 1,
    autoplay: 10000,
    speed:1000,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true
  });
}

function checkData (fetchedStories){

  const firstTime = ($('#results > *').length === 0);

  fetchedStories.forEach(story => {
    if(!document.getElementById(story.id)) {
      makeStory(story);
    }
  });

  firstTime && runCarousel();
}


$(document).ready(function(){

  var divListChildren = '';

  $('results').find('a').each(function(index,ele){
    divListChildren += ele.innerHTML + '';
  });
});

function getData() {
	fetch('/test?q=enterprise/interstateinterstate/category/ce698892-b460-4586-8ad4-0964e18d1ca6', myInit).then(function(response) {
	  return response.json();
	}).then(function(sortedData) {
		console.log(sortedData);
  	fetchedStories = sortedData.filter(
  		function(story) {
  				return ! fetchedStories.find (function(fetchedStory) {
  				return story['id'] === fetchedStory['id'];
  			});
  		}
  	).concat(fetchedStories);

    checkData(fetchedStories);
  });
}

getData();

const timeOutTime = (60 * 100000);

setTimeout(function doSomething() {
  //$(fetchedStories).replaceWith(getData());
  // location.reload();
  console.log('getting new stuff!');
  getData();
  setTimeout(doSomething, timeOutTime);
}, timeOutTime);
