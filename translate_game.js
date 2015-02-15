// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	$("#translationTitle").html("Translate from " + lang_from + " to " + lang_to);
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	//modified from http://stackoverflow.com/questions/8966942/get-random-element-from-associative-array-in-javascript
	var randomWord = function(){
		var keys = Object.keys(current_dict);
		var word_index = Math.floor(keys.length * Math.random())
		var word = keys[word_index]
	    return {word_to: word, word_from: current_dict[word]};
	}
	
	// Your code here
	var addNewWord = function(){
		var wordInQuestion = randomWord();
		$(".unanswered").html(
			'<td>'+wordInQuestion.word_from+'</td>'+
			'<td><input type="text" name="'+wordInQuestion.word_from+'"></td>'+    
			'<td><input id="btn1" type="button" value="See Answer" name="'+wordInQuestion.word_from+'" /></td>'
			);

		//seems risky, lets see if it pays off for him
		$(':button').click(function(){
			addNewWord();
		});
		$(':text').focus();
	}
	addNewWord();

	

});
