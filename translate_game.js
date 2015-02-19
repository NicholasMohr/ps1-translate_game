// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	$("#translationTitle").html("Translate from " + lang_from + " to " + lang_to);
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var keys = Object.keys(current_dict);
	
	var wordInQuestion;
	//modified from http://stackoverflow.com/questions/8966942/get-random-element-from-associative-array-in-javascript
	/*
		returns a random word
	*/
	var randomWord = function(){
		var keys = Object.keys(current_dict);
		var word_index = Math.floor(keys.length * Math.random())
		var word = keys[word_index]
	    return {word_to: word, word_from: current_dict[word]};
	}

	/*
		reveals the answer or shows that you were correct and updates everything associated with that
	*/
	var seeAnswer = function(answer){
		var unanswered = $(".unanswered");
		var input = $("#unansweredinput");
		$("#unansweredcol").replaceWith('<td><span class="answerclass">' + answer + '</span></td>');
		unanswered.removeClass("unanswered");
		if(answer === wordInQuestion.word_to){
			var useranswer =  $('.answerclass');
			useranswer.removeClass("answerclass");
			unanswered.addClass("correct");
			$(':button').replaceWith('<span class="ui-icon ui-icon-check"></span>');
		}else{
			unanswered.addClass("incorrect");
			var useranswer =  $('.answerclass');
			useranswer.removeClass("answerclass");
			useranswer.addClass("incorrect-answer");
			$(':button').replaceWith(wordInQuestion.word_to);
		}

        addNewWord();
	}
	
	/*
		adds a new word to the layout
	*/
	var addNewWord = function(){
		wordInQuestion = randomWord();

		$("#words").html(
			'<tr class="unanswered">'+

			'<td>'+wordInQuestion.word_from+'</td>'+
			'<td id="unansweredcol"><input type="text" id="unansweredinput" name='+wordInQuestion.word_from+'></td>'+    
			'<td><input id="btn1" type="button" value="See Answer" id="'+wordInQuestion.word_from+'" /></td>'+
			'</tr>'
			+$("#words").html()
			);

		//modified from http://stackoverflow.com/questions/13384243/listen-to-enter-key-press-on-a-text-box
		$("#unansweredinput").bind("keypress", function(event) {
		    if(event.which == 13) { //the enter key
		    	event.preventDefault();
		    	seeAnswer($("#unansweredinput")[0].value);	    
		    }
		});

		$("#unansweredinput").autocomplete({
			source: keys,
			select: function(event,ui){
				seeAnswer(ui.item.value);
			},
			minLength:2
		})

		//seems risky, lets see if it pays off for him
		$(':button').click(function(){
			seeAnswer($("#unansweredinput")[0].value);
		});

		$(':text').focus();
	}

	//add our first word to get us started
	addNewWord();

	

});
