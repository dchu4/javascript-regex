var checkRegEx = function(){
	var regexString = document.getElementById('regex-string').value;
	var textContent = document.getElementById('text-content').value;

	if(textContent && regexString){
		//Check if re is valid
		try{

			var re = new RegExp(regexString, 'g');

			if(re){

				var holder = [];
				var xArray = []; 

				//Loop through the RegEx matches
				do{
					holder = re.exec(textContent);
					if(holder){
						xArray.push({ match:holder[0] , index:holder['index']});
					}
				}while(holder && holder != "");

				if(xArray.length > 0){
					document.getElementById('match-results').innerHTML = highlightAllText(xArray,textContent,0);
				}
				else{
					document.getElementById('match-results').innerHTML = "No results";
				}
			}

		}
		catch(err){
			document.getElementById('match-results').innerHTML = "Regular Expression Invalid";
		}
	} else {
		document.getElementById('match-results').innerHTML = "No results";
	};

};

//Highlights all the matches
var highlightAllText = function(matchArray, textContent, startIndex){
	var shiftArray;
	var textOutput = "";

	if(matchArray.length == 1){
		shiftArray = matchArray.shift();

		textOutput = highlight(shiftArray, textContent, startIndex) + textContent.substring(shiftArray["index"] + shiftArray["match"].length);

		return textOutput;
	}

	shiftArray = matchArray.shift();

	textOutput = highlight(shiftArray, textContent, startIndex) + highlightAllText(matchArray, textContent, shiftArray["index"] + shiftArray["match"].length);

	return textOutput; 
}

//Highlights the match
var highlight = function(match, textContent, startIndex){
	var textOutput = "";

	textOutput = textContent.substring(startIndex, match["index"]) + "<span style='background-color:yellow;'>" + textContent.substring(match["index"], match["index"] + match["match"].length) + "</span>";

	return textOutput;
}