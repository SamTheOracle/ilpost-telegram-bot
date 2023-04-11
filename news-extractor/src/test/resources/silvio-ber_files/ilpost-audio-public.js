/**
 * Funzione per riprodurre i file audio degli articoli
 */
 (function( $ ) {
	'use strict';
	$(function() {
        if ($('#audioPlayerArticle').length>0){
            var audioPlayerArticle_mp3=$('#audioPlayerArticle').attr('data-mp3');
            var audioPlayerArticle_id=$('#audioPlayerArticle').attr('data-id');
            var playerInstance = jwplayer("audioPlayerArticle");
            var label='play_audio_'+audioPlayerArticle_id;
            playerInstance.setup({
                "file": audioPlayerArticle_mp3,
                width: 640,
                height: 40,
                "type":"mp3",
                ga: {
                    label: label
                }
            });
        }
    });
})( jQuery );