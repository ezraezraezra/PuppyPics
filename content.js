//var $pp = jQuery.noConflict(true);

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "colors-div":
            var divs = document.querySelectorAll("img");
            if(divs.length === 0) {
                alert("There are no any divs in the page.");
            } else {
            	/*
            	var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=callback?";
            	$pp.getJSON(flickerAPI,{
            		tags: "puppies",
            		tagmode: "any",
            		format: "json"
            	})
            	.done(function(data){
            		alert("hi");
            		console.log(data);
            	});
            	*/
            	console.log("hello world");
            	var xhr = new XMLHttpRequest();
				var flickrAPI = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fba3eb503e17a328e0304c4ddcfcfe45&tags=puppy%2Cpuppies&format=json&nojsoncallback=1";
				/*
				var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?tags=puppy&tagmode=any&format=json"*/
				
				xhr.open("GET", flickrAPI, true);
				xhr.onreadystatechange = function() {
				  if (xhr.readyState == 4) {
				    // JSON.parse does not evaluate the attacker's scripts.
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
				    	//puppyID = resp.photos.photo[i].id;
				    	//puppyOwner = resp.photos.photo[i].owner;
				    	//puppyURL = "http://flickr.com/photos/"+puppyOwner+"/"+puppyID;
				    	divs[i].setAttribute("src",url);
				    	console.log(url);
				    	imgCounter += 1;
				    }
				  }
				}
				xhr.send();
                
            }
        break;
    }
});
