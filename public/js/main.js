// initialize images
var SVG_WEAK = $('#image-weak');
var SVG_MEDIUM = $('#image-medium');
var SVG_STRONG = $('#image-strong');
var SVG_VERY_STRONG = $('#image-very-strong');

// initialize charset arrays
var NUMBER_SET = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var LOWER_LETTER_SET =
    [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];
var UPPER_LETTER_SET =
    [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];
var SPECIAL_SET =
    [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "=", "?", "/", "~"
    ];


$(document).ready(function () {

    $('#button-generate-pass').click(function () {
        generateAndShowPass();
    });

    // copy to clipboard button implementation
    var client = new ZeroClipboard($("#button-copy-pass"));
    client.on("copy", function (event) {
        var clipboard = event.clipboardData;
        var textToCopy = $('#output-generated-pass').text();
        clipboard.setData("text/plain", textToCopy);
        var successCopy = "Пароль скопирован";
        var outputMessage = $('#output-message');
        outputMessage.removeClass();
        outputMessage.addClass('success');
        outputMessage.text(successCopy);
    });

    // highlight symbol-set
    $('.symbol-set').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        generateAndShowPass();
    });
});

// ------------------------------------------------------------------------------------------
// password generation

function generateAndShowPass() {
    var newPass = generate_new_pass();
    caluculatePassStrength(newPass);
    $('#output-generated-pass').val(newPass);
}

function generate_new_pass() {

    var newPass = "";

    // get password length
    var passLengthText = $('#input-number').val();
    var passLength = parseInt(passLengthText);
    if (isNaN(passLength)) {
        alert('Password length should be an integer value!');
        return "";
    }

    // make array of symbol sets
    var arrayOfSets = [];
    $('.symbol-set').each(function () {
        if ($(this).hasClass('active')) {
            if ($(this).hasClass('numbers')) {
                arrayOfSets.push(NUMBER_SET);
            } else if ($(this).hasClass('upper-char')) {
                arrayOfSets.push(UPPER_LETTER_SET);
            } else if ($(this).hasClass('lower-char')) {
                arrayOfSets.push(LOWER_LETTER_SET);
            } else if ($(this).hasClass('special-symbols')) {
                arrayOfSets.push(SPECIAL_SET);
            }
        }
    });

    // generate pass from symbol sets
    for (var i = 0; i < passLength; i++) {
        var arrayOfSymbols = get_random_item_from_array(arrayOfSets);
        var randSymbol = get_random_item_from_array(arrayOfSymbols);
        newPass += randSymbol;
    }

    return newPass;
}

function get_random_item_from_array(array) {
    var len = array.length;
    var randItemIndex = Math.round(Math.random() * (len - 1));
    var randItem = array[randItemIndex];
    return randItem;
}

// ------------------------------------------------------------------------------------------
// calculate password strength

function caluculatePassStrength (password) {

    var passLength = password.length;
    var charsetPower = getPassCharsetPower(password);
    var bits = passLength * Math.round((Math.log(charsetPower) / Math.log(2)) + 0.5);

    if (bits < 48) {
        set_pass_color_message_pic_svg('weak', 'ненадежный', SVG_WEAK)
    } else if (bits < 64) {
        set_pass_color_message_pic_svg('medium', 'средний', SVG_MEDIUM)
    } else if (bits < 128) {
        set_pass_color_message_pic_svg('strong', 'надежный', SVG_STRONG)
    } else {
        set_pass_color_message_pic_svg('very-strong', 'четкий', SVG_VERY_STRONG)
    }
}

function getPassCharsetPower (password) {
    var charsetPower = 0;
    if (/\d/.test(password)) {
        charsetPower += NUMBER_SET.length;
    }
    if (/[A-Z]/.test(password)) {
        charsetPower += UPPER_LETTER_SET.length;
    }
    if (/[a-z]/.test(password)) {
        charsetPower += LOWER_LETTER_SET.length;
    }
    if (/\W/.test(password)) {
        charsetPower += SPECIAL_SET.length;
    }
    return charsetPower;
}

function set_pass_color_message_pic_svg(strength, message, svg) {
    $('#image-pass-strength').html(svg.html());
    var outputMessage = $('#output-message');
    outputMessage.removeClass();
    outputMessage.addClass(strength);
    outputMessage.text(message);
}

// ------------------------------------------------------------------------------------------
// catch user input
$( "#output-generated-pass" ).keypress(function(event) {
    var newSymbol = String.fromCharCode(event.keyCode);
    var currentPass = $('#output-generated-pass').val() + newSymbol;
    caluculatePassStrength(currentPass);
});

// ------------------------------------------------------------------------------------------
// slider

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    animate: true,
    start: 12,
    step: 1,
    range: {
        'min': 4,
        'max': 32
    },
    format: {
        to: function (value) {
            return value + '';
        },
        from: function (value) {
            return value;
        }
    }
});

var isFirstTime = true;
var inputNumber = document.getElementById('input-number');

slider.noUiSlider.on('update', function (values, handle) {

    inputNumber.value = values[handle];
    if (isFirstTime) {
        isFirstTime = false;
    } else {
        generateAndShowPass()
    }
});

inputNumber.addEventListener('change', function () {
    slider.noUiSlider.set(this.value);
});

// ------------------------------------------------------------------------------------------
// <!-- Yandex.Metrika counter -->
(function (d, w, c) {
    (w[c] = w[c] || []).push(function () {
        try {
            w.yaCounter35353335 = new Ya.Metrika({
                id: 35353335,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
        } catch (e) {
        }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () {
            n.parentNode.insertBefore(s, n);
        };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "yandex_metrika_callbacks");

// ------------------------------------------------------------------------------------------
