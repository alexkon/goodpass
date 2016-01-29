$(document).ready(function () {

    $('.slider').on('mousedown', function (e) {
        var pos = $(e.currentTarget).offset(),
            posX = e.pageX -pos.left;

        console.log(pos)
    });

    $('#button-generate-pass').click(function() {
        console.log('Generate pass button clik');
    });
});