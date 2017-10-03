
//down arrow and up arrow
    //goes to next item, if it is the last one, don't go down any farther
    //handle up arrow so they can go back up to another item in the search
    //if there is no result selected so far up should go to bottom result and down should go to top result
//then the results div should disappear
//either on blur or clicking out of the field, the results should disappear (blur on field or mousedown on document)


(function() {
    var $input = $('input');
    var $resultsDiv = $('.results');
    var resultList = [];
    var timer;
    var xhr;


    function getCountryList() {
        if(xhr) {
            xhr.abort();
            console.log('aborting');
        }
        xhr = $.ajax({
            url: 'https://flame-egg.glitch.me/',
            method: 'GET',
            data: {
                q: $input.val()
            },
            success: function(data) {
                console.log(data);
                resultList = data;
                //console.log('results: ' + Array.isArray(resultList));
                displayResults();

            },
            error: function(e) {
                console.log(e);
            }
        });

    }
    function makeHtmlString() {
        var html = '';

        for(var i = 0; i < resultList.length; i++) {
            //if(i < 4) {
            if (i == 0) {
                html += '<div class="country highlighted">' + resultList[i] + '</div>';
            } else {
                html +='<div class="country">' + resultList[i] + '</div>';
            }
            //}
        }
        if (!resultList.length) {
            html = '<div class="no-results"> No Results </div>';
        }

        return html;
    }


    function displayResults() {

        if(!$input.val().trim()) {
            console.log('nothing in input');
            //there is nothing in the input field.
            $resultsDiv.hide();
        } else {
            var html = makeHtmlString();
            $resultsDiv.html(html).show();
        }
    }

    function select(e) {
        //remove highlighted class if any exist
        $('.highlighted').toggleClass('highlighted');

        //add highlighted class to the one just moused over
        $(e.target).toggleClass('highlighted');

        //when the user leaves that div, remove the highlighted class and then remove this listener.
        $(e.target).on('mouseleave', function(){
            $(e.target).toggleClass('highlighted');
            $(e.target).off('mouseleave');
        });
    }

    function handleInput(e) {
        //get the element with the class highlighted b/c this is the one selected by the user
        var selected = $('.highlighted');
        var text = selected.text();

        if(!text) {
            console.log('empty string');
        }
        //if key is enter, get the elements value and make it the value in the input
        //if the key is down, highlight the next element (or the first)
        //if the key is up highlight the prev element (or the last)
        //if the key is tab hide the results div
        if(e.keyCode == 13 || e.type == 'mousedown') {
            //enter was pressed
            //get selected element
            if(!resultList.length) {
                return;
            }
            $input.val(text);
            $resultsDiv.hide();
            // remove highlighted class in case user pushes enter again!
            selected.toggleClass('highlighted');
        } else if (e.keyCode == 40){
            //down key pressed
            //remove this one's highlight and add to the next one
            selected.toggleClass('highlighted').next().toggleClass('highlighted');
            if(!selected.nextAll().length) {
                $('.results div:first-child').toggleClass('highlighted');
            }

        } else if (e.keyCode == 38) {
            //up key pressed
            selected.toggleClass('highlighted').prev().toggleClass('highlighted');
            if(!selected.prevAll().length) {
                $('.results div:last-child').toggleClass('highlighted');
            }
        }

    }

    $input.focus()
        .on('keydown', handleInput)
        .on('input', function(){
            if(timer){
                clearTimeout(timer);
                console.log('clearing');
            }
            timer = setTimeout(getCountryList, 250);
        })
        .on('focus', getCountryList)
        .on('blur', function(){
            $resultsDiv.hide();
        });

    $resultsDiv.on('mouseover', select)
        .on('mousedown', handleInput);

}());
