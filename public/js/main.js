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
});

function generate_new_pass() {
    var numbers = ["0","1","2","3","4","5","6","7","8","9"]

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

    var set_array = [numbers, lower_letters, upper_letters];


    var pass_length = 8;
    var new_pass = "";
    for (var i = 0; i < pass_length; i++) {
        var rand_set = get_random_set(set_array);
        var rand_symbol = get_random_symbol_from_array(rand_set);
        new_pass = new_pass + rand_symbol;
    }
    return new_pass;
}

function get_random_symbol_from_array( array) {
        var len = array.length;
        var rand_symbol_index = Math.round(Math.random() * (len - 1));
        var rand_symbol = array[rand_symbol_index];
    return rand_symbol;
}

function get_random_set( set_array) {
    var len = set_array.length;
    var rand_set_index = Math.round(Math.random() * (len - 1));
    var rand_set = set_array[rand_set_index];
    return rand_set;
}
