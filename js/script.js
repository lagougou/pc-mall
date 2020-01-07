// $(document).ready(function() {
//     alert('haha')
// })

$('#header-search').search({
    autocomplete: false,
    animation: 'fade',
    js: false,
    css3: true
});

var $ele = $('.car');
var $content = $ele.find('.dropdown-content');
var $load = $ele.find('.loading');
var $btn = $ele.find('.car-item');
var timer;
$ele.on("mouseenter", function() {
    // console.log($('.dropdown-menu').find('.item').length);
    $btn.addClass('active');
    $load.show();
    timer = setTimeout(function() {
        if ($ele.find('.item').length > 0) {
            $content.show().siblings().hide();
        } else {
            $('.none').show().siblings().hide();
        }
    }, 3000);
}).on("mouseleave", function() {
    clearTimeout(timer);
    $btn.removeClass('active');
    $('.dropdown-menu').children().hide();
})

$("#category").find('.dropdown').dropdown({
    css3: true,
    js: true,
    animation: 'fade'
});

$("#focus-slider").slide({});

$("#today-slider").slide({ animate: 'slide' });
$(".floor").tabs({});