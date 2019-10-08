$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.carousel').carousel({
        full_width: true
    });
    autoplay();

    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 4500);
    }
    $('select').formSelect();
    $('.fixed-action-btn').floatingActionButton();
    $('input#input_text, textarea#textarea2').characterCounter();
    $('.slider').slider();
    $('.modal').modal();
});