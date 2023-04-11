jQuery(document).ready( function($) {
    
    function social_skin() {
        // funzione per mettere i social in orizzontale quando c'è la skin
        var singlepage = $( 'body.single-post' ).height();
        var contentwidth = $( '.entry-container' ).width();
        
        if (singlepage) { // per attivare la funzione solo nelle foglie
            if(!$('.entry-container').children('div.alto').length) { // se i social sono quelli bassi
                if (contentwidth < 480) {
                    $( ".entry-meta.social" ).addClass( "horizontal" );
                    $( '.entry-container' ).addClass( "nomargin" );
                    $( '.new-comments' ).addClass( "nomargin" );
                } else {
                    $( ".entry-meta.social" ).removeClass( "horizontal" );
                    $( '.entry-container' ).removeClass( "nomargin" );
                    $( '.new-comments' ).removeClass( "nomargin" );
                }
            }
        }
        // fine
    }
	$(function () {
        $(window).scroll(social_skin)
		$(window).resize(social_skin);
		social_skin();
	});
    
    
    
    var photoheight = $( '#photosize' ).height();
    var inneradvheight = photoheight - 40;
    // per dare al blocco adv la stessa altezza della foto a sinistra
    $('.advtop').css('transition', 'all 0.5s ease-in-out').css('min-height', (photoheight - 40));

    // la posizione del contenuto da scrollare va richiamta fuori dallo scroll altrimenti la inizializza ogni volta che scrolliamo
    var advPosition = $('#sidebar').offset();
    var advheight = $( '#scrolling-container' ).height();
    var boxesheight = $( '#boxes' ).height();
    var contentheight = $( '.entry-container' ).height();
    var bottomdistance = 100; // margine del box finale verso il fondo pagina
    
    if (contentheight == null) {
        // se il contenuto e' vuoto allora siamo in pagina di archivio in questo caso gli lascio l'id del content
        var contentheight = $( '#content' ).height();
    }
    
    // BLOCCO GALLERY 
    var contentwidth = $( '#content' ).width();
    if ($('.single-post').length) { // se siamo nei post
        if ($('.pic4').length) { // se la gallery è quella verticale
            $('.big-gallery').css('width', contentwidth);
            var galleryheight = $( '.big-gallery-left-cont' ).height();
            var contentheight = contentheight - galleryheight;
        }
    } else if ($('article.horizontal').length) { // se siamo nell'archivio
        $('article.horizontal').css('width', contentwidth);
        var galleryoff = $( 'article.horizontal' ).offset();
        var contentoff = $( '.entry-container' ).offset();
        var contentheight = galleryoff.top - contentoff.top + 110;
    }    
    // FINE BLOCCO GALLERY
    
    $(window).resize(function() {
        // BLOCCO GALLERY
        var contentwidth = $( '#content' ).width();
        if ($('.single-post').length) { // se siamo nei post
            if ($('.pic4').length) { // se la gallery è quella verticale
                $('.big-gallery').css('width', contentwidth);
                var galleryheight = $( '.big-gallery-left-cont' ).height();
                var contentheight = contentheight - galleryheight - bottomdistance;
            }
        } else if ($('article.horizontal').length) { // se siamo nei post
            $('article.horizontal').css('width', contentwidth);
            var galleryoff = $( 'article.horizontal' ).offset();
            var contentoff = $( '.entry-container' ).offset();
            var contentheight = galleryoff.top - contentoff.top + 110;
        }
        // FINE BLOCCO GALLERY
        
        // per aggiornare l'altezza del blocco scroll quando cambia la finestra    
        if ($(window).width() < 900) {
            var advPosition = $('#scrolling-container').offset();
        } else {
            var advPosition = $('#scrolling-container').offset(); 
        }
    });

    // Se il contenuto è più corto della sidebar, non fare niente
    if ((contentheight < (boxesheight + advheight + bottomdistance + 150)) || (advheight == 0) || (photoheight == null)) { // i 150 mi servono per dare un margine di vantaggio al content
        $('#scrolling-container').css('position','relative').css('top','auto').css('min-height', photoheight);
        $('#boxes').css('top', 'auto').css('left', 'auto').css('position', 'relative');      
    } else {
        // sposto il box prossimo articolo in fondo
        $('#boxes').css('top', (contentheight - boxesheight - bottomdistance)).css('position', 'absolute'); // -100 per spostarlo sopra il bottone commenti

        $(window).scroll(function(){
            
            var advPosition = $('#sidebar').offset();
        
            if ($(window).width() > 900 ) {
                
                var photoheight = $( '#photosize' ).height();
                var advheight = $( '#scrolling-container' ).height();
                var contentheight = $( '.entry-container' ).height();
                var boxesheight = $( '#boxes' ).height();
                
                // BLOCCO GALLERY
                if ($('.single-post').length) { // se siamo nei post
                    if ($('.pic4').length) { // se la gallery è quella verticale
                        var galleryheight = $( '.big-gallery-left-cont' ).height();
                        var contentheight = contentheight - galleryheight - bottomdistance;
                    }
                } else if ($('article.horizontal').length) { // se siamo nei post
                    var galleryoff = $( 'article.horizontal' ).offset();
                    var contentoff = $( '.entry-container' ).offset();
                    var contentheight = galleryoff.top - contentoff.top + 110;
                }
                // FINE BLOCCO GALLERY
                
                // sposto il box prossimo articolo in fondo un'altra volta se cambia il viewport
                $('#boxes').css('top', (contentheight - boxesheight - bottomdistance)).css('position', 'absolute'); // -100 per spostarlo sopra il bottone commenti
                
                // richiamo la nuova posizione dei box dopo lo spostamento
                var advEnding = $('#boxes').offset();
                    
                    if($(window).scrollTop() > (advPosition.top - 20)){ // inizia lo scroll a 20 pixel dall'adv                        
                        // la variabile che riduce l'altezza del banner allo scroll
                        var inneradvheight = 250;
                        
                        $('#scrolling-container').css({"position": "fixed", "top": "80px"});
                        // quando arriviamo al box del prossimo articolo si blocca
                        if($(window).scrollTop() > (advEnding.top - advheight - 20 ) ){ // 20 = padding di advheight
                            $('#scrolling-container').css('position','absolute').css('top', (contentheight - boxesheight - advheight - bottomdistance )); // 60 invece di 80 perche' il margine alto lo togliamo - 100 e' la distanza imposta 
                        }
                    
                    } else {
                        // la variabile riporta l'adv all'altezza della foto
                        var inneradvheight = photoheight - 40;
                        $('#scrolling-container').css('position','absolute').css('top','auto');
                    }
                    
                // Ribadisco allo scroll l'altezza del blocco adv nel caso l'immagine non si sia caricata correttamente
                $('.advtop').css('transition', 'all 0.5s ease-in-out').css('min-height', inneradvheight);
            } else { // se la sidebar scompare rimetto i valori di default
                $('#scrolling-container').css('position','relative').css('top','auto');
                $('#boxes').css('top', 'auto').css('left', 'auto').css('position', 'relative');
                $('.advtop').css('min-height', 'auto');

            }
            
        });
        
    }

});
