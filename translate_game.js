// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	$("#translationTitle").html("Translate from " + lang_from + " to " + lang_to);
	current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var keys = Object.keys(current_dict);
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
/*
		$("#tableID").find('tbody')
		    .append($('<tr>')
		        .append($('<td>')
		            .append($('<img>')
		                .attr('src', 'img.png')
		                .text('Image cell')
		            )
		        )
		    );
*/
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
		    if(event.which == 13) {
		    event.preventDefault();
        		var unanswered = $(".unanswered");
        		var input = $("#unansweredinput");
        		var answer = input[0].value;
        		console.log(unanswered);
        		console.log(input);
        		console.log(answer);
        		console.log(current_dict[$("#unansweredinput").attr('name')]);
        		$("#unansweredcol").replaceWith('<td><span class="answerclass">' + answer + '</span></td>');
        		unanswered.removeClass("unanswered");
        		if(answer === wordInQuestion.word_to){
        			unanswered.addClass("correct");
        			$(':button').replaceWith('<span class="ui-icon ui-icon-check"></span>');
        		}else{
        			unanswered.addClass("incorrect");
        			var useranswer =  $('.answerclass');
        			useranswer.removeClass();
        			useranswer.addClass("incorrect-answer");
        			$(':button').replaceWith(wordInQuestion.word_to);
        		}

                addNewWord();		    
		    }
		});

		$("#unansweredinput").autocomplete({
			source: keys,
			select: function(event,ui){
				var unanswered = $(".unanswered");
				var input = $("#unansweredinput");
				var answer = input[0].value;
				console.log(unanswered);
				console.log(input);
				console.log(answer);
				console.log(current_dict[$("#unansweredinput").attr('name')]);
				$("#unansweredcol").replaceWith('<td><span class="answerclass">' + answer + '</span></td>');
				unanswered.removeClass("unanswered");
				if(answer === wordInQuestion.word_to){
					unanswered.addClass("correct");
					$(':button').replaceWith('<span class="ui-icon ui-icon-check"></span>');
				}else{
					unanswered.addClass("incorrect");
					var useranswer =  $('.answerclass');
					useranswer.removeClass();
					useranswer.addClass("incorrect-answer");
					$(':button').replaceWith(wordInQuestion.word_to);
				}

		        addNewWord();
			}
		})

		//seems risky, lets see if it pays off for him
		$(':button').click(function(){
			var unanswered = $(".unanswered");
			var input = $("#unansweredinput");
			var answer = input[0].value;
			console.log(unanswered);
			console.log(input);
			console.log(answer);
			console.log(current_dict[$("#unansweredinput").attr('name')]);
			$("#unansweredcol").replaceWith('<td><span class="answerclass">' + answer + '</span></td>');
			unanswered.removeClass("unanswered");
			if(answer === wordInQuestion.word_to){
				unanswered.addClass("correct");
				$(':button').replaceWith('<span class="ui-icon ui-icon-check"></span>');
			}else{
				unanswered.addClass("incorrect");
				var useranswer =  $('.answerclass');
				useranswer.removeClass();
				useranswer.addClass("incorrect-answer");
				$(':button').replaceWith(wordInQuestion.word_to);
			}

	        addNewWord();
		});

		$(':text').focus();
	}
	addNewWord();

	

});
