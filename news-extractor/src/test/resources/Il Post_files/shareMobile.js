/**
 * Javascript la condivisione degli articoli su mobile
 */
(function( $ ) {
	'use strict';
	$(function() {
        if ($('.socialShare').length>0){
            var position = $(".socialShare").offset();
            $(".socialShare").hide();
            var lastScrollTop = 0;
        
            if ( $(window).width() < "760" ) {
                $(window).scroll(function(event){
                    var st = $(this).scrollTop();
                    if ((st > lastScrollTop) && (st > position.top)) {
                        $(".socialShare").slideDown();
                    } else if (st < position.top) {
                        $(".socialShare").slideUp();
                    }
                    lastScrollTop = st;
                });
            }
        }
	});
})( jQuery );