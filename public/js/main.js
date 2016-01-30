$(document).ready(function () {

    $('.slider').on('mousedown', function (e) {
        var pos = $(e.currentTarget).offset(),
            posX = e.pageX -pos.left;

        console.log(pos)
    });

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
        alert("Password " + text_to_copy + " copied to clipboard");
    });
});

function generate_new_pass() {

    var PASS_LENGTH = 8;
    var new_pass = "";

    var numbers = ["0","1","2","3","4","5","6","7","8","9"];

    var lower_letters =
        [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        ];
    var upper_letters =
        [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ];

    var array_of_sets = [numbers, lower_letters, upper_letters];

    for (var i = 0; i < PASS_LENGTH; i++) {
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
