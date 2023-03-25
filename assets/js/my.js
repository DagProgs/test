(function($){
    $('.menu-bar').on('click', function() {
        $('.mobile-menu').toggleClass('triggered');
    }); 
    $('.has-children > a').after('<span></span>');  
    $('.has-children span').on('click', function() {
        $(this).toggleClass('subtriggered');
    });
})(jQuery);