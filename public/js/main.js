$(document).ready(function () {

    $('#button-generate-pass').click(function() {
        console.log('button-generate-pass clicked:');
        var new_pass = generate_new_pass();
        $('#output-generated-pass').text(new_pass);
    });

    // copy to clipboard button implementation
    var client = new ZeroClipboard($("#button-copy-pass"));
    client.on( "copy", function (event) {
        var clipboard = event.clipboardData;
        var text_to_copy = $('#output-generated-pass').text();
        clipboard.setData( "text/plain", text_to_copy );
        var successCopy = "Пароль" + text_to_copy + " успешно скопирован";
        $('#output-message').text(successCopy);
    });

    // highlight symbol-set
    $('.symbol-set').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });
});

function generate_new_pass() {

    var new_pass = "";

    // get password length
    var pass_length_text = $('#input-number').val();
    var pass_length = parseInt(pass_length_text);
    if (isNaN(pass_length)) {
        alert('Password length should be an integer value!');
        return "";
    }

    var numbers_set = ["0","1","2","3","4","5","6","7","8","9"];

    var lower_letters_set =
        [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        ];
    var upper_letters_set =
        [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ];
    var special_set =
        [
          "@", "#", "$", "%", "^", "&", "*"
        ];

    // make array of symbol sets
    var array_of_sets = [];
    $('.symbol-set').each(function() {
       if ($(this).hasClass('active')) {
           if ($(this).hasClass('numbers')) {
               array_of_sets.push(numbers_set);
           } else if ($(this).hasClass('upper-char')) {
               array_of_sets.push(upper_letters_set);
           } else if ($(this).hasClass('lower-char')) {
               array_of_sets.push(lower_letters_set);
           } else if ($(this).hasClass('special-symbols')) {
               array_of_sets.push(special_set);
           }
       }
    });

    for (var i = 0; i < pass_length; i++) {
        var array_of_symbols = get_random_item_from_array(array_of_sets);
        var rand_symbol = get_random_item_from_array(array_of_symbols);
        new_pass += rand_symbol;
    }
    return new_pass;
}

function get_random_item_from_array(array) {
    var len = array.length;
    var rand_item_index = Math.round(Math.random() * (len - 1));
    var rand_item = array[rand_item_index];
    return rand_item;
}



// ------------------------------------------------------------------------------------------
// slider

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    animate: true,
	start: 4,
    step: 1,
    //tooltips:  true ,
	range: {
		'min': 4,
		'max': 32
	},
    format: {
	  to: function ( value ) {
		return value + '';
	  },
	  from: function ( value ) {
		return value;
	  }
	}
});

var inputNumber = document.getElementById('input-number');

slider.noUiSlider.on('update', function( values, handle ) {

    inputNumber.value = values[handle];

});

inputNumber.addEventListener('change', function(){
	slider.noUiSlider.set(this.value);
});
// ------------------------------------------------------------------------------------------
