$(document).ready(function () {

    $('#button-generate-pass').click(function() {
        console.log('button-generate-pass clicked:');
        var newPass = generate_new_pass();
        $('#output-generated-pass').text(newPass);
    });

    // copy to clipboard button implementation
    var client = new ZeroClipboard($("#button-copy-pass"));
    client.on( "copy", function (event) {
        var clipboard = event.clipboardData;
        var textToCopy = $('#output-generated-pass').text();
        clipboard.setData( "text/plain", textToCopy );
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

    var newPass = "";

    // get password length
    var passLengthText = $('#input-number').val();
    var passLength = parseInt(passLengthText);
    if (isNaN(passLength)) {
        alert('Password length should be an integer value!');
        return "";
    }

    var numbersSet = ["0","1","2","3","4","5","6","7","8","9"];

    var lowerLetterSet =
        [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        ];
    var upperLetterSet =
        [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ];
    var specialSet =
        [
          "@", "#", "$", "%", "^", "&", "*"
        ];

    // make array of symbol sets
    var charsetPower = 0;
    var arrayOfSets = [];
    $('.symbol-set').each(function() {
       if ($(this).hasClass('active')) {
           if ($(this).hasClass('numbers')) {
               arrayOfSets.push(numbersSet);
               charsetPower += numbersSet.length;
           } else if ($(this).hasClass('upper-char')) {
               arrayOfSets.push(upperLetterSet);
               charsetPower += upperLetterSet.length;
           } else if ($(this).hasClass('lower-char')) {
               arrayOfSets.push(lowerLetterSet);
               charsetPower += lowerLetterSet.length;
           } else if ($(this).hasClass('special-symbols')) {
               arrayOfSets.push(specialSet);
               charsetPower += specialSet.length;
           }
       }
    });

    // generate pass from symbol sets
    for (var i = 0; i < passLength; i++) {
        var arrayOfSymbols = get_random_item_from_array(arrayOfSets);
        var randSymbol = get_random_item_from_array(arrayOfSymbols);
        newPass += randSymbol;
    }

    // set password strength
    var bits = passLength * Math.round((Math.log(charsetPower) / Math.log(2)) + 0.5);
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

        return newPass;
}

function get_random_item_from_array(array) {
    var len = array.length;
    var randItemIndex = Math.round(Math.random() * (len - 1));
    var randItem = array[randItemIndex];
    return randItem;
}

function set_pass_color_message_pic(strength, message, pic) {
    $('#image-pass-strength').attr("src", pic);
    var outputMessage = $('#output-message');
    outputMessage.removeClass();
    outputMessage.addClass(strength);
    outputMessage.text(message);
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
