$(document).foundation();

$(document).ready(function() {
    $('#menu').click(function() {
        if($(this).hasClass('open')) {
            $('header nav').removeClass('open');
            $('#menu').removeClass('open');
        } else {
            $('header nav').addClass('open');
            $('#menu').addClass('open');
        }
    });

    $('.fresco').click(function() {
        $('body').addClass('noscroll'); 
        document.ontouchmove = function(e){ e.preventDefault(); }
    });
    $(document).on('click','.fr-close', function() { 
        $('body').removeClass('noscroll'); 
        document.ontouchmove = function(e){ return true}
    });
    $(document).keyup(function(e) { if (e.keyCode == 27) { 
        $('body').removeClass('noscroll'); 
        document.ontouchmove = function(e){ return true}
    } });


    /**************/
    /* ANIMATIONS */
    /**************/

    // HOME
    $('#sobre .anim').css('opacity', 0);
    $('#sobre').viewportChecker({
        offset: 200,
        callbackFunction: function(elem, action) {
            $('#sobre .anim').each(function (index, value) {
                var delay = index * 0.1;
                TweenMax.fromTo(value, 1, {y: 50, opacity: 0}, {delay: delay, y: 0, opacity: 1, ease: Power3.easeOut});
            });
            $('#sobre .image .anim-image').each(function (index, value) {
                var delay = index * 0.2;
                TweenMax.fromTo(value, 2, {top: 100, opacity: 0}, {delay: delay, top: 0, opacity: 1, ease: Power3.easeOut});
            });
        }
    });

    // CONFERENCIA
    $('#conferencia .anim').css('opacity', 0);
    $('#conferencia .anim-dados').viewportChecker({
        offset: 200,
        callbackFunction: function(elem, action) {
            $('#conferencia .anim-dados .anim').each(function (index, value) {
                var delay = index * 0.1;
                TweenMax.fromTo(value, 1, {y: 50, opacity: 0}, {delay: delay, y: 0, opacity: 1, ease: Power3.easeOut});
            });
            $('#conferencia .anim-dados .count').each(function () {
                $(this).prop('Counter',0).animate({ Counter: $(this).text() }, { duration: 3000, easing: 'swing', step: function (now) { $(this).text(Math.ceil(now)); } });
            }); 
        }
    });

    $('#conferencia .anim-programacao').viewportChecker({
        offset: 200,
        callbackFunction: function(elem, action) {
            $('#conferencia .anim-programacao .anim').each(function (index, value) {
                var delay = index * 0.1;
                TweenMax.fromTo(value, 1, {y: 50, opacity: 0}, {delay: delay, y: 0, opacity: 1, ease: Power3.easeOut});
            });
        }
    });

    $('#conferencia .anim-passados').viewportChecker({
        offset: 200,
        callbackFunction: function(elem, action) {
            $('#conferencia .anim-passados .anim').each(function (index, value) {
                var delay = index * 0.1;
                TweenMax.fromTo(value, 1, {y: 50, opacity: 0}, {delay: delay, y: 0, opacity: 1, ease: Power3.easeOut});
            });
        }
    });

    $('#conferencia .anim-convidados').viewportChecker({
        offset: 200,
        callbackFunction: function(elem, action) {
            $('#conferencia .anim-convidados .anim').each(function (index, value) {
                var delay = index * 0.1;
                TweenMax.fromTo(value, 1, {opacity: 0}, {delay: delay, opacity: 1, ease: Power3.easeOut});
            });
        }
    });

});

//setTimeout(() => $('.glitch').addClass('render'), 60);

$(document).mousemove( function(e) {
    $('.player-card img').parallaxCard(70 , e);
    $('.player-card .line').parallaxCard(90 , e);
    $('.player-card .shadow').parallaxCard(40 , e);
});

// Parallax mouse
var w = $(window).width(), 
    h = $(window).height(); 
$.fn.parallaxCard = function (resistance, mouse){
    $el = $(this);
    TweenLite.to($el, 0.2, {
        x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance ),
        y : -(( mouse.clientY - (window.innerHeight/2) ) / resistance )
    });
    // light
    var dy = mouse.pageY - h / 2, 
        dx = mouse.pageX - w / 2,
        theta = Math.atan2(dy, dx),
        angle = theta * 180 / Math.PI - 90;
    $('.wall .image  .brilho').css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,0.1) 0%,rgba(255,255,255,0) 80%)');
};





animations();
$(window).resize(function() { animations(); });

function animations(){
    $('body').on('mousemove', function(e) {
        var $this = $('.player-card');
        var x = (event.clientX/$(window).width())-0.5;
        var y = (event.clientY/$(window).height())-0.5;
        TweenLite.to($this, 0.6, {
            rotationY: 10*x,
            rotationX: 5*y,
            ease: Power1.easeOut,
            transformPerspective: 500,
            transformOrigin: "center"
        });

    });
}
//mailing
$('#mailing-arena').on('submit', function(e){
    e.preventDefault();
    $('#email').parent().find('.error').remove();
    if( $('#email').val() == "" ){  $('#email').parent().append('<small class="error">Preencha o E-mail</small>'); return; }
    $.ajax({
        type: 'POST',
        url: '/conferencia/mailing/',
        dataType: "json",
        data: {
            email: $('#email').val(),
        },
        success: function (result) {
            $('#email').val('')
            $('#email').parent().append('<small class="error">'+ result.message +'</small>');
        }
    });
});

// Google Analytics Track
$('.caption a').click(function(){
    gaSend('Centro Header', 'Click', $(this).attr('title'));
});

$('header a').click(function(){
    gaSend('Menu Principal', 'Click', $(this).attr('title'));
});

$('footer a').click(function(){
    gaSend('Redes Sociais', 'Click', $(this).attr('title'));
    gaSend('Rodapé', 'Click', $(this).attr('title'));
});

$('#sobre a.button').click(function(){
    gaSend('Botões', 'Click', $('span', $(this)).text() );
});

$('.play-video').click(function(){
    gaSend('Video', 'Click', $(this).attr('data-youtubeid') );
});

$('#timeline a.button.fresco').click(function(){
    gaSend('Galeria', 'Click', $(this).attr('data-fresco-group') );
});

function gaSend($category, $action, $label){
    ga('send', {
        hitType: 'event',
        eventCategory: $category,
        eventAction: $action,
        eventLabel: $label
    });
}
