chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
        case "colors-div":
        	PuppyPics.content.init();
        break;
    }
});

var PuppyPics = PuppyPics || {};

PuppyPics.content = function(){
	var imageSelector;
	
	function init(){
		imageSelector = document.querySelectorAll("img");
		var imageCount = imageSelector.length;
        	
    	if(imageCount === 0) {
            alert("There are no any divs in the page.");
        } else {
        	var flickrAPICall = generateAPICall(imageCount);
    		ajaxCall(flickrAPICall, updateImages);
        }
	}
	
	function generateAPICall(imageCount){
    	var apiParameters = {
    		key            : '2476f0b870fe91f962ad80df0865ca0b',
    		url            : 'http://api.flickr.com/services/rest/',
    		method         : 'flickr.photos.search',
    		tags           : 'cute%2Cyoung%2Cpuppy',
    		tagMode        : 'all',
    		format         : 'json',
    		noJsonCallback : '1',
    		photosPerPage  : 100,
    		page           : 1
    	}
    	
    	if(imageCount < 500){
    		apiParameters.photosPerPage = imageCount;
    	}
    	
    	var url = apiParameters.url + '?method=' + apiParameters.method + '&api_key=' + apiParameters.key + '&tags=' + apiParameters.tags + '&tag_mode=' + apiParameters.tagMode + '&per_page=' + apiParameters.photosPerPage + '&page' + apiParameters.page + '&format=' + apiParameters.format + '&nojsoncallback=' + apiParameters.noJsonCallback;
    	
    	return url;
    }
    
    
    function ajaxCall(url, callback){
    	var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
		    var resp = JSON.parse(xhr.responseText);
		    callback(resp);
		  }
		}
		xhr.send();
    }
    
    function updateImages(jsonResponse){
    	var imgCounter = 0;
    	
	    for(var i=0; i<imageSelector.length; i++){
	    	if(imgCounter == 100){
	    		imgCounter = 0;
	    	}
	    	
	    	var base = jsonResponse.photos.photo[imgCounter]; 
	    	var url = generateImageURL(base);
	    	
	    	// Get current dimensions being shown
	    	currentHeight = imageSelector[i].clientHeight;
	    	currentWidth = imageSelector[i].clientWidth;
	    	
	    	imageSelector[i].setAttribute("src", url);
	    	imageSelector[i].setAttribute("width", currentWidth);
	    	imageSelector[i].setAttribute("height", currentHeight);
	    	
	    	imgCounter += 1;
	    }
    }
    
    function generateImageURL(base){
    	farmId = base.farm;
    	serverId = base.server;
    	id = base.id;
    	secret = base.secret;
    	
    	url = "http://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
    	
    	return url;
    }
	
	return {
		init : init
	}
}();
