"use strict";

var ILPOST_PODCAST_VERSION = "1.0.56";
"use strict";

/**
 * Funzione per far apparire la modale di abbonamenti
 */
(function ($) {
  'use strict';

  $(function () {
    $('.ilpostGiftModal').find('.back').click(function () {
      $('.ilpostGiftModal').find('.back').hide();
      $('.ilpostGiftModal').find('.popup').removeClass("show");
    });
    $('.ilpostGift').find('a').click(function () {
      $('.ilpostGiftModal').find('.back').show();
      $('.ilpostGiftModal').find('.popup').addClass("show");
    });
    $('.ilpostGiftModal').find('.close').click(function () {
      $('.ilpostGiftModal').find('.back').hide();
      $('.ilpostGiftModal').find('.popup').removeClass("show");
    });
    $('.ilpostGiftModal').find('.generate').click(function () {
      $('.ilpostGiftModal').find('.close').hide();
      var regularText = 'Invia il regalo';
      $(this).prop('disabled', true);
      $(this).html('Attendere...');
      var button = $(this);
      var action = $(this).attr('data-action');
      var payload = {};
      if (action == 'sendgift') {
        payload = {
          'action': 'sendgift',
          'podcast_id': $(this).attr('data-podcast')
        };
      }
      if (action == 'sendgiftall') {
        payload = {
          'action': 'sendgiftall',
          'podcast_id': $(this).attr('data-podcast'),
          'episode_id': $(this).attr('data-episode')
        };
      }
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ilpostpodcast.ajax_url,
        data: payload,
        success: function success(data) {
          if (data && data.data && data.data.url) {
            $('.ilpostGiftModal').find('.footer').hide();
            $('.ilpostGiftModal').find('.ilpostGiftModal_step1').hide();
            $('.ilpostGiftModal').find('.ilpostGiftModal_step2').show();
            $('#ilpostGiftModal_mail').attr('href', data.data.email);
            $('#ilpostGiftModal_whatsapp').attr('href', data.data.whatsapp);
            $('#ilpostGiftModal_telegram').attr('href', data.data.telegram);
            $('.ilpostGiftModalinput').val(data.data.url);
          } else {
            console.log(data);
            if (data && data.data && data.data.msg) {
              button.hide();
              $('.ilpostGiftModal').find('.footer').find('.msg').html('<p>' + data.data.msg + '</p>');
            }
          }
          button.html(regularText);
          button.prop('disabled', false);
          $('.ilpostGiftModal').find('.close').show();
        }
      });
    });
    if ($('.ilpostGiftModal').length > 0) {
      var ilpostGiftModal = document.querySelector(".ilpostGiftModal");
      var ilpostGiftModalfield = ilpostGiftModal.querySelector(".ilpostGiftModalfield");
      var ilpostGiftModalinput = ilpostGiftModalfield.querySelector(".ilpostGiftModalinput");
      var ilpostGiftModalcopy = ilpostGiftModalfield.querySelector(".ilpostGiftModalcopy");
      ilpostGiftModalcopy.onclick = function () {
        ilpostGiftModalinput.select(); //select input value
        if (document.execCommand("copy")) {
          //if the selected text copy
          ilpostGiftModalfield.classList.add("active");
          ilpostGiftModalcopy.innerText = "Copiato";
          setTimeout(function () {
            window.getSelection().removeAllRanges(); //remove selection from document
            ilpostGiftModalfield.classList.remove("active");
            ilpostGiftModalcopy.innerText = "Copia";
          }, 3000);
        }
      };
    }
  });
})(jQuery);
"use strict";

/**
 * Funzione per gestire il box podcast in homepage
 * Il box appare solo se l'orario è tra le 8:00 e le 11:30
 */
(function ($) {
  'use strict';

  $(function () {
    if ($('.ilpost-homepage-podcast-frontend').length > 0) {
      var currentdate = new Date();
      var minutes = (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes();
      minutes = minutes.toString();
      var hours = currentdate.getHours();
      hours = hours.toString();
      var time = parseInt(hours + minutes);
      if (time > 800 && time <= 1800) {
        $('.lanci-homepage').hide();
        $('.ilpost-homepage-podcast-frontend').show();
      } else {
        $('.ilpost-homepage-podcast-frontend').hide();
        $('.lanci-homepage').show();
      }
    }
  });
})(jQuery);
"use strict";

/**
 * Applicativo js per il controllo dell'utente
 */
(function ($) {
  'use strict';

  $(function () {
    var audioplayer = document.getElementById("ilpostPlayerAudio");
    var durationMinutes;
    var durationSeconds;
    var currentMinutes;
    var currentSeconds;
    var seekto;
    var currentTime = 0;
    $('.modalilpostAdvAbbonati').click(function () {
      $('.modalilpostAdvAbbonati').hide();
    });
    if ($('body').is('.tax-podcasts, .single-episodes')) {
      var payload = {
        'action': 'checkpodcast',
        'cookie': ilpostpodcast.cookie,
        'post_id': ilpostpodcast.post_id,
        'podcast_id': ilpostpodcast.podcast_id
      };
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ilpostpodcast.ajax_url,
        data: payload,
        success: function success(response) {
          var data = response.data;
          /**
           * Se l'utente non è un abbonato 
           * Se il podcast è solo per abbonati
           * Faccio apparire il box adv per invitare l'utente ad abbonarsi
           */
          if (data.subscriber == 0 && data.onlySubscriber == 1) {
            $('.ilpostAdvAbbonatiSidebar').show();
          }
          $(".ilpostPodcastList a.play").each(function (index) {
            if ($(this).attr('data-file') == '' && data.onlySubscriber == 1 && data.subscriber == 1) $(this).attr('data-file', $(this).attr('data-url'));
            if ($(this).attr('data-file') == '' && data.onlySubscriber == 0) $(this).attr('data-file', $(this).attr('data-url'));
            if ($(this).attr('episode-free') == 'on') $(this).attr('data-file', $(this).attr('data-url'));
          });
          $(".ilpostPlayer").each(function (index) {
            if ($(this).attr('data-file') == '' && data.onlySubscriber == 1 && data.subscriber == 1) $(this).attr('data-file', $(this).attr('data-url'));
            if ($(this).attr('data-file') == '' && data.onlySubscriber == 0) $(this).attr('data-file', $(this).attr('data-url'));
            if ($(this).attr('episode-free') == 'on') $(this).attr('data-file', $(this).attr('data-url'));
            initPlayer();
          });
          if (data.subscriber == 1 && data.onlySubscriber == 1) {
            $('#ilpostGiftLastEpisode').show();
          }
        }
      });
    }
    function updateTime() {
      durationMinutes = Math.floor(audioplayer.duration / 60);
      durationSeconds = Math.floor(audioplayer.duration - durationMinutes * 60);
      currentMinutes = Math.floor(audioplayer.currentTime / 60);
      currentSeconds = Math.floor(audioplayer.currentTime - currentMinutes * 60);
      currentTime = audioplayer.currentTime;
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }
      $('#ilpostPlayerTimeline .current_time').html(currentMinutes + ":" + currentSeconds);
      $('#ilpostPlayerTimeline .total_duration').html(durationMinutes + ":" + durationSeconds);
    }
    function loadEpisode(url, autoplay) {
      if (url != '') {
        $('#ilpostPlayerWaveLocked').hide();
        var currentTime = 0;
        $('.ilpostPlayer #ilpostPlayerTimeline .seek_slider').val(0);
        $('#ilpostPlayerWaveLoading').show();
        $('.ilpostPlayer #ilpostPlayerControls .controls').hide();
        $('.ilpostPlayer #ilpostPlayerControls .play').hide();
        $('.ilpostPlayer #ilpostPlayerTimeline').hide();
        audioplayer.src = url;
        audioplayer.onloadedmetadata = function () {
          $('#ilpostPlayerWaveLoading').hide();
          $('.ilpostPlayer #ilpostPlayerControls .controls').show();
          $('.ilpostPlayer #ilpostPlayerControls .play').show();
          $('.ilpostPlayer #ilpostPlayerTimeline').css('display', 'flex');
          updateTime();
          if (autoplay == 1) audioplayer.play();
        };
      } else {
        audioplayer.pause();
        $('.ilpostPlayer #ilpostPlayerControls .controls').hide();
        $('.ilpostPlayer #ilpostPlayerControls .play').hide();
        $('.ilpostPlayer #ilpostPlayerTimeline').hide();
        $('.ilpostPodcastList a.play').removeClass('listening');
        $('.ilpostPodcastList a.play').attr('aria-label', 'Play');
        $('#ilpostPlayerWaveLoading').hide();
        $('#ilpostPlayerWaveLocked').show();
        if (autoplay == 1) $('.modalilpostAdvAbbonati').show();
      }
    }
    function initPlayer() {
      if ($('.ilpostPlayer').length > 0) {
        audioplayer.onplay = function () {
          var post_id = $('.ilpostPlayer').attr('data-id');
          var element = '#episode_' + post_id;
          $('.ilpostPodcastList .play').removeClass('listening');
          $(element).find('.play').addClass('listening');
          $(element).find('.play').attr('aria-label', 'Pausa');
          $('.ilpostPlayer #ilpostPlayerControls .play').addClass('loading');

          /**
           * Aggiungo le informazioni del click verso il datalayer di GTM
           */
          if (window.dataLayer && currentTime == 0) {
            $('body').append('<img src="https://web.x.ilpost.it/641523609775483/wt?p=' + encodeURIComponent(window.location.href) + '&mi=' + encodeURIComponent($('.ilpostPlayer h2').html()) + '&mk=play&mg1=' + encodeURIComponent($('.ilpostPlayer').attr('data-podcast')) + '&mt1=0&mt2=1380&x=' + Date.now() + '" style="display:none">');
            window.dataLayer.push({
              'event': 'podcastPlayer',
              'eventCategory': 'episode',
              'eventAction': 'play',
              'eventLabel': $('.ilpostPlayer h2').html()
            });
            window.dataLayer.push({
              'event': 'podcastPlayer',
              'eventCategory': 'podcast',
              'eventAction': 'play',
              'eventLabel': $('.ilpostPlayer').attr('data-podcast')
            });
          }
        };
        audioplayer.onplaying = function () {
          $('.ilpostPlayer #ilpostPlayerControls .play').removeClass('loading');
          $('.ilpostPlayer #ilpostPlayerControls .play').addClass('listening');
          $('.ilpostPlayer #ilpostPlayerControls .play').attr('aria-label', 'Pausa');
        };
        audioplayer.onpause = function () {
          $('.ilpostPlayer #ilpostPlayerControls .play').removeClass('listening');
          $('.ilpostPlayer #ilpostPlayerControls .play').attr('aria-label', 'Play');
          var post_id = $('.ilpostPlayer').attr('data-id');
          var element = '#episode_' + post_id;
          $('.ilpostPodcastList .play').removeClass('listening');
          $('.ilpostPodcastList .play').attr('aria-label', 'Play');
        };
        audioplayer.ontimeupdate = function () {
          $('.ilpostPlayer #ilpostPlayerTimeline .seek_slider').val(audioplayer.currentTime / audioplayer.duration * 100);
          updateTime();
        };
        loadEpisode($('.ilpostPlayer').attr('data-file'), 0);
      }
    }
    $('body').on('click', '.ilpostPlayer #ilpostPlayerWaveLocked', function () {
      $('.modalilpostAdvAbbonati').show();
    });
    $('body').on('change', '.ilpostPlayer #ilpostPlayerTimeline .seek_slider', function () {
      audioplayer.currentTime = audioplayer.duration * ($(this).val() / 100);
      updateTime();
    });
    $('body').on('click', '.ilpostPlayer #ilpostPlayerControls .play', function () {
      if ($(this).hasClass('listening') || $(this).hasClass('loading')) {
        $(this).removeClass('listening');
        $(this).removeClass('loading');
        $(this).attr('aria-label', 'Play');
        audioplayer.pause();
      } else {
        $(this).addClass('loading');
        audioplayer.play();
        $(this).attr('aria-label', 'Pausa');
      }
    });
    $('body').on('click', '.ilpostPlayer #ilpostPlayerControls .controls.prev', function () {
      audioplayer.currentTime -= 10;
    });
    $('body').on('click', '.ilpostPlayer #ilpostPlayerControls .controls.next', function () {
      audioplayer.currentTime += 10;
    });
    $('body').on('click', '.ilpostPodcastList .play', function () {
      var currentElement = $(this);
      if (currentElement.hasClass('listening')) {
        currentElement.removeClass('listening');
        currentElement.attr('aria-label', 'Play');
        audioplayer.pause();
      } else {
        $('.ilpostPlayer #ilpostPlayerControls .play').removeClass('listening');
        $('.ilpostPlayer').attr('data-id', currentElement.attr('data-id'));
        $('.ilpostPlayer p.date').html(currentElement.attr('data-desc'));
        $('.ilpostPlayer h2').html(currentElement.attr('data-title'));
        $('.ilpostGiftModal').find('.generate').attr('data-episode', currentElement.attr('data-id'));
        $('.ilpostGiftModal').find('.ilpostGiftModal_step1').find('.lastPodcast').find('.lastPodcastInfo').find('.date').html(currentElement.attr('data-desc'));
        $('.ilpostGiftModal').find('.ilpostGiftModal_step1').find('.lastPodcast').find('.lastPodcastInfo').find('.title').html(currentElement.attr('data-title'));
        currentElement.addClass('listening');
        loadEpisode(currentElement.attr('data-file'), 1);
        currentElement.attr('aria-label', 'Pausa');
        $('html, body').animate({
          scrollTop: $('.ilpostPlayer').offset().top
        }, 500);
      }
    });
  });
})(jQuery);