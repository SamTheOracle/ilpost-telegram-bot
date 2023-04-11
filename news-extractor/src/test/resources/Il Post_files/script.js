jQuery(document).ready(function($) {
	
	resize_image = function(imgelement, sizes ) {
		if( sizes.originalWidth === undefined || sizes.originalHeight === undefined ) {
			sizes.originalWidth = imgelement.attr('width');
			sizes.originalHeight = imgelement.attr('height');
		}

		if( sizes.originalWidth > sizes.height ) {
			imgelement.css({'width':'100%'});
		}

		if( sizes.originalWidth < sizes.width ) {
			imgelement.css({'width':'auto', 'max-width':'100%', 'margin':'0 auto'});
		}

		if( sizes.originalHeight > sizes.height ) {
			imgelement.css({'width':'auto', 'max-width':'100%', 'height':'900px', 'margin':'0 auto'});
		}
	}

	/* Adv Mobile */
	//var adv = $('.top');
	//var adv_mobile_container = $('.adv_mob');
	var adv_normal_container = $('#scrolling-container');
	var width_page = $(window).width();

	//var str = '<script type="text/javascript" src="https://advhd.banzaiadv.it/hp_sponsor_il_post/adv/ilpost_300x250.js"></script>';

	var blog = $("body").hasClass("single-blog_post");
	var content = $('.entry-container');
	var blogger = $('.blogger_info');

	var archivi = $("body").hasClass("archive");
	var home = $("body").hasClass("home");
	var sidearch = $('.brevi');


	// con la pagina sotto i 780 sposta il banner nel contenuto
	if ($(window).width() < 780) {
		//var ndp = $('#singleBody > p').eq(0),
		//gal = $('.fgallery'); // ignoro le gallery

		if (blog) { // nel blog sposto autore e adv prima del contenuto
			//adv.prependTo( content );
			blogger.prependTo( content );
		} else if (home || archivi) {
			//console.log('home archivi');
			//var ndp = $('#content > article').eq(1);
			//adv.insertAfter( ndp );
		//} else if( 0 === ndp.length || gal.length > 0 ) {
			//adv.appendTo( adv_mobile_container );
		} else {
			//$( '.adv_mob' ).insertAfter( ndp ).append( adv );
		}
	}
	// al resize della finestra sposta il banner di conseguenza
	$(window).resize(function() {
		if ($(window).width() < 780) {
			//var ndp = $('#singleBody > p').eq(0),
			//gal = $('.fgallery'); // ignoro le gallery

			if (blog) {
				//console.log('successo');
				//adv.prependTo( content );
				blogger.prependTo( content );
			} else if (home || archivi) {
				//console.log('home archivi');
				//var ndp = $('#content > article').eq(1);
				//adv.insertAfter( ndp );
			//} else if( 0 === ndp.length || gal.length > 0 ) {
					//adv.appendTo( adv_mobile_container );
			} else {
					//$( '.adv_mob' ).append( adv ).insertAfter( ndp );
			}
		} else {
			if (blog) {
				//adv.prependTo( adv_normal_container );
				blogger.prependTo( adv_normal_container );
			} else if (home || archivi) {
				//adv.insertAfter( sidearch );
			} else {
				//adv.prependTo( adv_normal_container );
				//console.log('pagina ' + width_page);
			}
		}
	});

	/* Set Image Gallery */
	var img = $('.resize-ima');
	if(img.length > 0) {
		resize_image( img, { height: 850, width: 1000 } );
	}

	/* Search Responsive */
	$("#btn_sea_mob").on('click',function() {
		$(this).toggleClass("act_mob");
		//$("form.searchform").toggle("fast");
		$("#sea_mob .wgs_wrapper").toggle("fast");
		return false;
	});

	/* Menu Responsive */
	$("#men_resp").on('click',function() {
		$(this).toggleClass("act");
		$(".menu-navi-main-container").toggle("fast");
		return false;
	});

	/* Div Fixed */
	try {
  		var startdiv = $(".social-share").offset().top;
	} catch(e) {
		var startdiv = 0;
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() > startdiv) {
			$(".social-share").addClass('fixed');
			//$("#singleBody").addClass('arrived');
		} else {
			$(".social-share").removeClass('fixed');
			//$("#singleBody").removeClass('arrived');
		}
	});

	//Show comments script
	if (jQuery('#display_comments').length>0) {
		jQuery( document ).ready(function() {
			jQuery("#display_comments").on("click", function (e) {
				e.preventDefault();
				jQuery.getScript( "https://graphcomment.com/js/integration.js", 
				function( data, textStatus, jqxhr ) {	                    
					jQuery(".display_comments").hide();
					jQuery(".no-comments-login").show();
					jQuery(".new-comments").hide();
					jQuery('#ilcommento').show();
				});
			});
		});
	}

});

function isMobileDevice() {
	var check = false;
	(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function getCookie(c_name) {
	var c_value = document.cookie,
	c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) c_start = c_value.indexOf(c_name + "=");
	if (c_start == -1) {
			c_value = null;
	} else {
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1) {
					c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start, c_end));
	}
	return c_value;
}