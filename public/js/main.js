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
        var successCopy = "Пароль успешно скопирован в буфер обмена";
        var outputMessage = $('#output-message');
        outputMessage.removeClass();
        outputMessage.addClass('success');
        outputMessage.text(successCopy);
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
    var charset_power = 0;
    var array_of_sets = [];
    $('.symbol-set').each(function() {
       if ($(this).hasClass('active')) {
           if ($(this).hasClass('numbers')) {
               array_of_sets.push(numbers_set);
               charset_power += numbers_set.length;
           } else if ($(this).hasClass('upper-char')) {
               array_of_sets.push(upper_letters_set);
               charset_power += upper_letters_set.length;
           } else if ($(this).hasClass('lower-char')) {
               array_of_sets.push(lower_letters_set);
               charset_power += lower_letters_set.length;
           } else if ($(this).hasClass('special-symbols')) {
               array_of_sets.push(special_set);
               charset_power += special_set.length;
           }
       }
    });

    // generate pass from symbol sets
    for (var i = 0; i < pass_length; i++) {
        var array_of_symbols = get_random_item_from_array(array_of_sets);
        var rand_symbol = get_random_item_from_array(array_of_symbols);
        new_pass += rand_symbol;
    }

    // set password strength
    var bits = pass_length * Math.round((Math.log(charset_power) / Math.log(2)) + 0.5);
    //console.log("charset_power = " + charset_power);
    //console.log("bits = " + bits);
    if (bits < 48) {
        set_pass_color_message_pic('weak', 'ненадежный', 'img/smile-sad.svg')
    } else if (bits < 64) {
        set_pass_color_message_pic('medium', 'средний', 'img/smile-calm.svg')
    } else if (bits < 128) {
        set_pass_color_message_pic('strong', 'надежный', 'img/smile-happy.svg')
    } else {
        set_pass_color_message_pic('very-strong', 'сверхнадежный', 'img/smile-happy.svg')
    }

        return new_pass;
}

function get_random_item_from_array(array) {
    var len = array.length;
    var rand_item_index = Math.round(Math.random() * (len - 1));
    var rand_item = array[rand_item_index];
    return rand_item;
}

function set_pass_color_message_pic(strength, message, pic) {
    var outputMessage = $('#output-message');
    outputMessage.removeClass();
    outputMessage.addClass(strength);
    outputMessage.text(message);
    $('#image-pass-strength').attr("src", pic)
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
