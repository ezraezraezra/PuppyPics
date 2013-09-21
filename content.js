chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "colors-div":
            var divs = document.querySelectorAll("img");
            if(divs.length === 0) {
                alert("There are no any divs in the page.");
            } else {
            	console.log("hello world");
            	var xhr = new XMLHttpRequest();
            	
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
            	
            	if(divs.length < 500){
            		apiParameters.photosPerPage = divs.length;
            	}
            	
            	var flickrAPICall = apiParameters.url + '?method=' + apiParameters.method + '&api_key=' + apiParameters.key + '&tags=' + apiParameters.tags + '&tag_mode=' + apiParameters.tagMode + '&per_page=' + apiParameters.photosPerPage + '&page' + apiParameters.page + '&format=' + apiParameters.format + '&nojsoncallback=' + apiParameters.noJsonCallback;
            	//console.log(flickrAPICall);
            	
				xhr.open("GET", flickrAPICall, true);
				xhr.onreadystatechange = function() {
				  if (xhr.readyState == 4) {
				    var resp = JSON.parse(xhr.responseText);
				    console.log(resp);
				    var imgCounter = 0;
				    for(var i=0; i<divs.length; i++){
				    	if(imgCounter == 100){
				    		imgCounter = 0;
				    	}
				    	base = resp.photos.photo[imgCounter];
				    	farmId = base.farm;
				    	serverId = base.server;
				    	id = base.id;
				    	secret = base.secret;
				    	url = "http://farm"+farmId+".staticflickr.com/"+serverId+"/"+id+"_"+secret+".jpg";
				    	// Get current dimensions being shown
				    	currentHeight = divs[i].clientHeight;
				    	currentWidth = divs[i].clientWidth;
				    	
				    	divs[i].setAttribute("src", url);
				    	divs[i].setAttribute("width", currentWidth);
				    	divs[i].setAttribute("height", currentHeight);
				    	//console.log(url);
				    	imgCounter += 1;
				    }
				  }
				}
				xhr.send();
                
            }
        break;
    }
});
