var checkRegEx = function(){
	var regexString = document.getElementById('regex-string').value;
	var textContent = document.getElementById('text-content').value;

	var re = new RegExp(regexString, 'g');

	var holder = [];
	var xArray = []; 

	while(holder){
		holder = re.exec(textContent);
		if(holder){
			xArray.push({ match:holder[0] , index:holder['index']});
		}
	};

	if(xArray.length > 0){
		document.getElementById('match-results').innerHTML = highlightAllText(xArray,textContent,0);
	}
	else{
		document.getElementById('match-results').innerHTML = "No results";
	}
};

var highlightAllText = function(matchArray, textContent, startIndex){
	var popArray;
	textOutput = "";

	if(matchArray.length == 1){
		popArray = matchArray.shift();

		textOutput = textContent.substring(startIndex, popArray["index"]) + "<span style='background-color:yellow;'>" + textContent.substring(popArray["index"], popArray["index"] + popArray["match"].length) + "</span>" + textContent.substring(popArray["index"] + popArray["match"].length);

		return textOutput;
	}

	popArray = matchArray.shift();

	textOutput = textContent.substring(startIndex, popArray["index"]) + "<span style='background-color:yellow;'>" + textContent.substring(popArray["index"], popArray["index"] + popArray["match"].length) + "</span>" + highlightAllText(matchArray, textContent, popArray["index"] + popArray["match"].length);

	return textOutput; 
}