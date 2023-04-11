"use strict";

/**
 * Funzione per far apparire la modale di abbonamenti
 */
(function ($) {
  'use strict';

  $(function () {
    $('.showModalSubcriber').click(function () {
      $('.modalilpostAdvAbbonati').show();
    });
    $('.modalilpostAdvAbbonati').click(function () {
      $('.modalilpostAdvAbbonati').hide();
    });
  });
})(jQuery);
"use strict";

/**
 * Funzione che permette al banner strip_adv o div-gpt-ad-Top di essere fixed per 5 secondi
 */
(function ($) {
  'use strict';

  $(function () {
    $(document).scroll(function () {
      var toscroll = false;
      /**
       * Non faccio eseguire lo sticky adv se siamo su un singolo articolo delle categorie verticali
       */

      if ($('body').hasClass('single-post') && $('body').hasClass('verticali')) toscroll = false;

      if ($('body').hasClass('home')) {
        toscroll = false;
      }

      if ($('body').hasClass('single-post-new')) toscroll = true;

      if (toscroll) {
        var scroll = $(this).scrollTop();
        var topDist = $("header.site-head").position();

        if (topDist && scroll > topDist.top) {
          if (!$('body').hasClass("fixedBannerDisable")) {
            $('body').addClass('fixedBannerTop');
            $('#maxticker').addClass('fixed');
            var delayInMilliseconds = 5000;
            setTimeout(function () {
              $('body').removeClass('fixedBannerTop');
              $('body').addClass('fixedBannerDisable');
              $('#maxticker').removeClass('fixed');
            }, delayInMilliseconds);
          }
        } else {
          $('body').removeClass('fixedBannerTop');
          $('#maxticker').removeClass('fixed');
        }
      }
    });
  });
})(jQuery);
"use strict";

/**
 * Funzione che intercetta lo user agent del browser che sta navigando
 * Se è la webview all'interno dell'app lo useragent di default è: ilpost-app
 */
(function ($) {
  'use strict';

  $(function () {
    PullToRefresh.init({
      mainElement: 'body',
      instructionsRefreshing: '<span style="font-size:13px;">Aggiorno</span>',
      onRefresh: function onRefresh() {
        window.location.reload();
      }
    });
    var userAgent = navigator.userAgent;

    window.alert = function () {};

    if (userAgent.match(/ilpost-app/i)) {
      $('body').addClass('appmobile');
    }

    if (typeof checkIsApp != "undefined") {
      $('body').addClass('appmobile');
    }
  });
})(jQuery);
"use strict";

/**
 * Funzione per le striscie comic
 */
(function ($) {
  'use strict';

  $(function () {
    var comic_archive_list = []; // Controllo che siamo all'interno di una foglia comics

    if ($('article').hasClass('comics')) {
      var move = function move(e) {
        if ($(e).data('id')) {
          comic_load($(e).data('id'), true, true);
          comic_random();
        }

        return false;
      };

      /**
       * Funzione che aggiorna il contenuto con un id passato come parametro
       */
      var comic_load = function comic_load(id, updateState, refreshState) {
        var classbox = '';
        ilpostnew.post_id = id;
        jQuery.ajax({
          type: "get",
          dataType: "json",
          url: ilpostnew.peantus_api + '/web/single/' + ilpostnew.post_id,
          success: function success(data) {
            if (data && data.ID && data.ID != 0) {
              $('article.comics').find('.content_comics').find('.current-post').find('img').attr('src', data.img);
              $('article.comics').find('.content_comics').find('.current-post').find('img').attr('srcset', "");
              $('article.comics').find('.navi_comics').find('.entry-title').find('.title-time').html(data.date_archive);
              $('article.comics').find('.comicweek').attr('data-date', data.date);
              onscroll($('.strip-container')); // chiamo onscroll dopo aver generato la pagina

              if (refreshState) {
                if (updateState) {
                  var stateObj = {
                    url: data.link,
                    id: data.ID,
                    title: data.title
                  };
                  history.pushState(stateObj, data.title, data.link);
                }

                if (window.googletag && googletag.apiReady) {
                  googletag.pubads().refresh();
                }

                document.title = data.title; // aggiorno il titolo

                dataLayer.push({
                  'event': 'VirtualPageview',
                  'virtualPageURL': document.location,
                  'virtualPageTitle': document.title
                });

                if (consentSent === true) {
                  dataLayer.push({
                    'event': 'cookie_policy_accepted'
                  });
                }

                if (window.create_socials !== undefined) window.create_socials(); // ripiglio i social
              }
            }

            $('article.comics').find('.navi_comics').find('.comic-link').remove();
            $('article.comics').find('.content_comics').find('.prev-post').remove();
            $('article.comics').find('.content_comics').find('.next-post').remove();
            $('article.comics').find('.content_comics').find('.next_comics_bottom').remove();
            $('article.comics').find('.content_comics').find('.prev_comics_bottom').remove();

            if (data && data.prev && data.prev.ID && data.prev.ID != 0) {
              var html = "";
              html += "<span class='comic-link prev_comics'>";
              html += "<a data-title='" + data.prev.title + "' data-id='" + data.prev.ID + "' href='" + data.prev.link + "' rel='prev'></a>";
              html += "</span>";
              $('article.comics').find('.navi_comics').prepend(html);
              $('article.comics').find('.content_comics').find('.current-post').attr('data-prev-img', data.prev.img);
              html = "<div class='prev-post' style='background-image: url(\"" + data.prev.img + "\");'></div>";
              $('article.comics').find('.content_comics').prepend(html);
              html = "<span class='comic-link prev_comics_bottom'><a data-title='" + data.prev.title + "' data-id='" + data.prev.ID + "' href='" + data.prev.link + "' rel='prev'></a></span>";
              $('article.comics').find('.content_comics').append(html);
            }

            if (data && data.next && data.next.ID && data.next.ID != 0) {
              var html = "";
              html += "<span class='comic-link next_comics'>";
              html += "<a data-title='" + data.next.title + "' data-id='" + data.next.ID + "' href='" + data.next.link + "' rel='next'></a>";
              html += "</span>";
              $('article.comics').find('.navi_comics').append(html);
              html = "<div class='next-post' style='background-image: url(\"" + data.next.img + "\");'></div>";
              $('article.comics').find('.content_comics').prepend(html);
              html = "<span class='comic-link next_comics_bottom'><a data-title='" + data.next.title + "' data-id='" + data.next.ID + "' href='" + data.next.link + "' rel='next'></a></span>";
              $('article.comics').find('.content_comics').append(html);
            }

            if (data && data.week && data.week.start_date && data.week.end_date && data.week.start_year && data.week.end_year && data.week.list) {
              var date_string = '<span class="">' + data.week.start_date + ' <span class="weekyear">' + data.week.start_year + '</span></span><br>';
              date_string += '<span class="">' + data.week.end_date + ' <span class="weekyear">' + data.week.end_year + '</span></span>';
              var content = '';
              data.week.list.forEach(function (element) {
                classbox = '';
                if (ilpostnew.post_id == element.ID) classbox = 'current';
                content += '<div class="comic-link dayinweek ' + classbox + '"><a data-title="' + element.title + '" data-id="' + element.ID + '" href="' + element.link + '" rel="next"><img src="' + element.img + '"></a></div>';
              });
              $('footer.comicweek .all-week').html(date_string);
              $('footer.comicweek .sameweek').html(content);
              $('footer.comicweek').show();
            }
          }
        });
      };
      /**
       * Funzione che recupera una striscia della stessa categoria di quella attuale
       */


      var comic_random = function comic_random() {
        if ($('.comic-link.random-button').length > 0 && comic_archive_list && comic_archive_list.length > 0) {
          var item = comic_archive_list[Math.floor(Math.random() * comic_archive_list.length)];
          var html = '<a data-title="' + item.title + '" data-id="' + item.ID + '" alt="Clicca per andare ad una striscia ' + $('.comic-link.random-button').attr('data-category-name') + ' casuale" title="Clicca per andare ad una striscia ' + $('.comic-link.random-button').attr('data-category-name') + ' casuale">Random ' + $('.comic-link.random-button').attr('data-category-name') + '</a>';
          $('.comic-link.random-button').html(html);
          $('.comic-link.random-button').css('display', 'inline-block');
        }
      };
      /**
       * Funzione che genera l'archivio di strisce per la categoria della striscia corrente
       */


      var comic_archive = function comic_archive() {
        if ($('select.comics_archive').length > 0) {
          jQuery.ajax({
            type: "get",
            dataType: "json",
            url: ilpostnew.peantus_api + '/web/archive/' + $('select.comics_archive').attr('data-category'),
            beforeSend: function beforeSend(xhr) {
              xhr.withCredentials = true;
            },
            success: function success(data) {
              if (data) {
                comic_archive_list = data;
                comic_random();
                data.forEach(function (element) {
                  $('select.comics_archive').append('<option value="' + element.permalink + '">' + element.date_archive + '</option>');
                });
                $('select.comics_archive').show();
              }
            }
          });
        }
      };

      var onscroll = function onscroll(div) {
        onscrollmobile(div);
        $(window).on('resize', function () {
          onscrollmobile(div);
        });
      };

      var onscrollmobile = function onscrollmobile(div) {
        if ($(window).width() < 567) {
          div.addClass('swipe'); // aggiungo la classe per consentire lo swipe

          div.addClass('right'); // aggiungo la classe per consentire lo swipe

          div.on("swiperight", function (event) {
            if (div.hasClass('swipe') && div.hasClass('right')) {
              event.stopImmediatePropagation();
              move('.prev_comics a');
            }
          });
          div.on("swipeleft", function (event) {
            if (div.hasClass('swipe') && div.hasClass('left')) {
              // consento lo swipe
              event.stopImmediatePropagation();
              move('.next_comics a');
            }
          });
          div.on('scroll', function () {
            // per agganciarsi allo scroll del blocco
            div.removeClass('swipe');
            div.removeClass('left');
            div.removeClass('right');
            var docwidth = $(document).width();
            var scrollposleft = div[0].scrollLeft;
            var scrollposright = docwidth + scrollposleft;
            var scrollwidth = div[0].scrollWidth;
            div.on("scrollstop", function () {
              // quando si ferma lo scroll abilito lo swipe
              div.removeClass('swipe');
              div.removeClass('left');
              div.removeClass('right');
              var scrstop = true;

              if (scrollposright >= scrollwidth - 1) {
                // siamo arrivati a destra
                div.addClass('swipe');
                div.addClass('left');
                var scrstop = false;
              }

              if (scrollposleft <= 0) {
                // siamo arrivati a sx
                div.addClass('swipe'); // consento lo swipe

                div.addClass('right'); // consento lo swipe

                var scrstop = false;
              }
            });

            if (scrollposright - 2 >= scrollwidth) {
              // siamo arrivati a destra con iphone
              div.addClass('swipe');
              div.addClass('left');
            } else if (scrollposleft + 2 <= 0) {
              // siamo arrivati a sx con iphone
              div.addClass('swipe'); // consento lo swipe

              div.addClass('right'); // consento lo swipe
            }
          });
        }
      };

      var firstState = {
        // scrivo lo stato della pagina dove arrivo per riprenderlo con il back e fwd
        id: $('.sameweek .current a').data('id'),
        url: $('.sameweek .current a').attr('href'),
        title: $('.sameweek .current a').data('title')
      };
      comic_archive();
      comic_load(ilpostnew.post_id, false, false);

      window.onpopstate = function (event) {
        // per far funzionare ajax con i tasti back e fwd
        var currentState = history.state;

        if (history.state == null || currentState == null) {
          var currentState = firstState;
        }

        comic_load(currentState.id, false, true);
      };

      $(document).on('click', '.current-post', function (e) {
        e.preventDefault(); //<-------- preventDefault()

        move('.next_comics a');
      });
      $(document).on('click', '.comic-link a', function (e) {
        e.preventDefault(); //<-------- preventDefault()

        move(this);
      });
    }
  });
})(jQuery);
"use strict";

/**
 * Funzioni per la gestione dei commenti
 */
(function ($) {
  'use strict';

  $(function () {
    $(document).ready(function () {
      $('#showComments').click(function () {
        var button = $(this);
        var status = button.attr('data-open');

        var __semio__token;

        var __semio__callback; // Se l'articolo non è più commentabile mostro un avviso


        if (status == 0) {
          button.attr('disabled', true);
          button.html('Attendere...');
          jQuery.ajax({
            type: "post",
            dataType: "json",
            url: ilpostnew.ajax_url,
            data: {
              'action': 'comments',
              'post_id': ilpostnew.post_id,
              'status': status
            },
            success: function success(object) {
              button.hide();
              var html = '<p class="info">Questo articolo non è più commentabile. <a href="https://abbonati.ilpost.it">Abbonati al Post</a> per commentare le altre notizie.</p>';
              html += '<div id="graphcomment"></div>';
              $(html).insertAfter(button);

              (function () {
                var gc = document.createElement('script');
                gc.type = 'text/javascript';
                gc.async = true;
                gc.onload = __semio_onloadsso;
                gc.defer = true;
                gc.src = 'https://integration.graphcomment.com/helpers_sso.js?' + Date.now();
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
              })();

              var __semio_params_sso = {
                graphcommentId: 'ilpost',
                publicKey: object.data.gc_public,
                data: object.data.sso,
                onSuccess: function onSuccess(token) {
                  if (__semio__callback) {
                    __semio__callback(token);
                  }

                  __semio__token = token;
                },
                onConflict: function onConflict() {},
                onFailure: function onFailure() {}
              };
              var __semio__params = {
                graphcommentId: "ilpost",
                // make sure the id is yours
                behaviour: {
                  uid: ilpostnew.post_id,
                  readonly: true
                },
                auth: {
                  /**
                   * subscribeToToken
                   *
                   * a function which will reveice a callback C transmitting safely our authentication token
                   * to the iframe.
                   * C should be called everytime the authentication is changed
                   *
                   * @param {function} callback   callback take a string as a param
                   */
                  subscribeToToken: function subscribeToToken(cb) {
                    console.log(cb);

                    if (__semio__token) {
                      cb(__semio__token);
                    }

                    __semio__callback = cb;
                    console.warn("subscribeToToken should be implement according you authentication design");
                  },
                  signup: function signup() {
                    console.warn("signup should be implement according you authentication design");
                  },
                  login: function login() {
                    console.warn("login should be implement according you authentication design");
                  },
                  logout: function logout() {
                    console.warn("logout should be implement according you authentication design");
                  }
                }
              };

              function __semio__onload() {
                __semio__gc(__semio__params);
              }

              function __semio_onloadsso() {
                __semio__helpers_sso(__semio_params_sso);
              }

              (function () {
                var gc = document.createElement('script');
                gc.type = 'text/javascript';
                gc.async = true;
                gc.onload = __semio__onload;
                gc.defer = true;
                gc.src = 'https://integration.graphcomment.com/gc.js?' + Date.now();
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
              })();
            }
          });
        }

        if (status == 1) {
          button.attr('disabled', true);
          button.html('Attendere...');
          jQuery.ajax({
            type: "post",
            dataType: "json",
            url: ilpostnew.ajax_url,
            data: {
              'action': 'comments',
              'post_id': ilpostnew.post_id,
              'status': status
            },
            success: function success(object) {
              button.hide();
              var html = '';

              if (object.data.readonly) {
                html = '<p class="info">Per commentare gli articoli <a href="https://abbonati.ilpost.it">abbonati al Post</a> oppure <a href="' + ilpostnew.login_url + '">accedi</a>, se sei già abbonato</p>';
                html += '<div id="graphcomment"></div>';
              } else {
                html += '<p class="rules">Prima di commentare leggi le <a href="/moderazione-commenti/" title="Moderazione commenti" target="_blank">regole di moderazione dei commenti</a>.<br>Se invece vuoi segnalare correzioni o errori <a href="mailto:correzioni@ilpost.it">puoi scrivere qui</a></p>';
                html += '<div id="graphcomment"></div>';
              }

              $(html).insertAfter(button);

              (function () {
                var gc = document.createElement('script');
                gc.type = 'text/javascript';
                gc.async = true;
                gc.onload = __semio_onloadsso;
                gc.defer = true;
                gc.src = 'https://integration.graphcomment.com/helpers_sso.js?' + Date.now();
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
              })();

              var __semio_params_sso = {
                graphcommentId: 'ilpost',
                publicKey: object.data.gc_public,
                data: object.data.sso,
                onSuccess: function onSuccess(token) {
                  if (__semio__callback) {
                    __semio__callback(token);
                  }

                  __semio__token = token;
                },
                onConflict: function onConflict() {},
                onFailure: function onFailure() {}
              };
              var __semio__params = {
                graphcommentId: "ilpost",
                // make sure the id is yours
                behaviour: {
                  uid: ilpostnew.post_id,
                  readonly: object.data.readonly
                },
                auth: {
                  /**
                   * subscribeToToken
                   *
                   * a function which will reveice a callback C transmitting safely our authentication token
                   * to the iframe.
                   * C should be called everytime the authentication is changed
                   *
                   * @param {function} callback   callback take a string as a param
                   */
                  subscribeToToken: function subscribeToToken(cb) {
                    console.log(cb);

                    if (__semio__token) {
                      cb(__semio__token);
                    }

                    __semio__callback = cb;
                    console.warn("subscribeToToken should be implement according you authentication design");
                  },
                  signup: function signup() {
                    console.warn("signup should be implement according you authentication design");
                  },
                  login: function login() {
                    console.warn("login should be implement according you authentication design");
                  },
                  logout: function logout() {
                    console.warn("logout should be implement according you authentication design");
                  }
                }
              };

              function __semio__onload() {
                __semio__gc(__semio__params);
              }

              function __semio_onloadsso() {
                __semio__helpers_sso(__semio_params_sso);
              }

              (function () {
                var gc = document.createElement('script');
                gc.type = 'text/javascript';
                gc.async = true;
                gc.onload = __semio__onload;
                gc.defer = true;
                gc.src = 'https://integration.graphcomment.com/gc.js?' + Date.now();
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(gc);
              })();
            }
          });
        }
      });
    });
  });
})(jQuery);
"use strict";
"use strict";

/**
 * Funzione per l'header del sito web
 */
(function ($) {
  'use strict';

  $(function () {
    $('.sidebarbutton').click(function (e) {
      e.preventDefault();

      if ($('.sidebar').hasClass('open')) {
        $('.sidebar').removeClass('open');
        $(this).removeClass('open');
        $('html').removeClass('sidebaropen');
      } else {
        $('.sidebar').addClass('open');
        $(this).addClass('open');
        $('html').addClass('sidebaropen');
      }
    });
    $(document).mouseup(function (e) {
      var sidebar = $(".sidebar");
      var sidebarbutton = $(".sidebarbutton");

      if (!sidebarbutton.is(e.target) && !sidebar.is(e.target) && sidebar.has(e.target).length === 0 && sidebarbutton.has(e.target).length === 0) {
        $('.sidebar').removeClass('open');
        $('.sidebarbutton').removeClass('open');
        $('html').removeClass('sidebaropen');
      }
    });
    $('div.headerIlPost>div#wrap>div.insideHeader>div.headerIlPost_Menu>a.menu').click(function () {
      var element = 'div.headerIlPost>div#wrap>div.insideHeader>div.headerIlPost_Menu>div.headerIlPost_Nav';

      if ($(element).is(":hidden")) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
    $('div.headerIlPost>div#wrap>div.insideHeader>div.headerIlPost_Search>a.search').click(function () {
      var element = 'div.headerIlPost>div#wrap>div.insideHeader>div.headerIlPost_Search>form.searchBox';

      if ($(element).is(":hidden")) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
    $('div.headerIlPost>div#wrap>div.insideHeader>div.headerIlPost_Reload>a.reload').click(function () {
      window.location.reload();
    });
    $(document).ready(function () {
      var navbar = document.getElementById("navbar");
      var fixed = navbar.getBoundingClientRect().top;

      window.onscroll = function () {
        if (navbar.getBoundingClientRect().top > fixed) {
          fixed = navbar.getBoundingClientRect().top;
        }

        if (window.pageYOffset >= fixed) {
          $('header.site-head').addClass('fixed');
          $('body').addClass('contentPageSticky');

          if ($('body').hasClass('home')) {
            $('.podcastListHome').addClass('hide');
            $('header.site-head a.logo').addClass('showlogo');
          }
        } else {
          $('header.site-head').removeClass('fixed');
          $('body').removeClass('contentPageSticky');

          if ($('body').hasClass('home')) {
            $('.podcastListHome').removeClass('hide');
            $('header.site-head a.logo').removeClass('showlogo');
          }
        }

        if (window.pageYOffset == 0) {
          $('header.site-head').removeClass('fixed');
          $('body').removeClass('contentPageSticky');

          if ($('body').hasClass('home')) {
            $('.podcastListHome').removeClass('hide');
            $('header.site-head a.logo').removeClass('showlogo');
          }
        }
      };
    });
    /*
    if (!$('body').hasClass('home')) {
        var scroll = $(document).scrollTop();
        var topDist = $("header.site-head").position();
        if (scroll > topDist.top) {
            $('header.site-head').addClass('fixed');
            $('body').addClass('contentPageSticky');
        } else {
            $('header.site-head').removeClass('fixed');
            $('body').removeClass('contentPageSticky');
        }
        $(document).scroll(function () {
            if (!$('body').hasClass('home')) {
                var scroll = $(this).scrollTop();
                var topDist = $("header.site-head").position();
                if (scroll > topDist.top) {
                    $('header.site-head').addClass('fixed');
                    $('body').addClass('contentPageSticky');
                } else {
                    $('header.site-head').removeClass('fixed');
                    $('body').removeClass('contentPageSticky');
                }
            }
        });
    }
    */
  });
})(jQuery);
"use strict";

/**
* Funzione per la home
*/
(function ($) {
  'use strict';

  $(function () {
    /**
     * Funzioni per far apparire la lista podcast
     */
    $('.podcastListHome>.list').slick({
      infinite: false,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4
    });
    /*
    $(document).scroll(function () {
        if ($('body').hasClass('home')) {
            var scroll = $(this).scrollTop();
            var topDist = $("div.headerIlPost").position();
            if (scroll > topDist.top) {
                $('.podcastListHome').addClass('hide');
                $('header.site-head').addClass('fixed');
                $('header.site-head a.logo').addClass('showlogo');
                $('body').addClass('contentPageSticky');
            } else {
                $('.podcastListHome').removeClass('hide');
                $('header.site-head').removeClass('fixed');
                $('header.site-head a.logo').removeClass('showlogo');
                $('body').removeClass('contentPageSticky');
            }
        }
    });
    */
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict';

  $(function () {
    if ($('#singleBody').hasClass('contentNoSubscriber')) {
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ilpostnew.ajax_url,
        data: {
          'action': 'paywall',
          'post_id': ilpostnew.post_id,
          'cookie': ilpostnew.cookie
        },
        success: function success(data) {
          if (data.data && data.data.content && data.data.content != '') {
            $('#singleBody').html(data.data.content);
            $('#singleBody').removeClass('contentNoSubscriber');
            $('#singleBodyCTA').hide();
          }
        }
      });
    }
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict';

  $(function () {
    $('.ilpostShare a.sharebutton').each(function () {
      $(this).click(function (e) {
        e.preventDefault();
        var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        var url = $(this).attr('data-url');
        var title = $(this).attr('data-title');
        var shareData = {
          title: title,
          url: url
        };
        var id = $(this).attr('data-id');
        var parent = $(this).parent('.ilpostShare');
        var ul = $(parent).find("ul#share-".concat(id));

        if ($('body').hasClass('appmobile')) {
          if (isMobile) {
            var url = $(this).attr('data-url');
            var title = $(this).attr('data-title');
            var shareData = {
              title: title,
              url: url
            };

            try {
              navigator.share(shareData);
            } catch (err) {
              ul.addClass('open');
              parent.find('.ilpostShareOpacity').show();
            }
          } else {
            parent.show();
            ul.addClass('open');
          }
        } else {
          parent.find('.ilpostShareOpacity').show();
          ul.addClass('open');
        }
      });
    });
    $('.ilpostShare .ilpostShareOpacity').click(function (e) {
      e.preventDefault();
      $('.ilpostShare .ilpostShareOpacity').hide();
      $('.ilpostShare ul').removeClass('open');
    });
    $('.ilpostShare a.close').click(function (e) {
      e.preventDefault();
      $('.ilpostShare .ilpostShareOpacity').hide();
      $('.ilpostShare ul').removeClass('open');
    });
    $('.ilpostShare a.link').click(function (e) {
      $('.ilpostShare .ilpostShareOpacity').hide();
      $('.ilpostShare ul').removeClass('open');
    });
    $(document).on('click', function (e) {
      if ($(e.target).closest(".ilpostShare").length === 0) {
        $('.ilpostShare .ilpostShareOpacity').hide();
        $('.ilpostShare ul').removeClass('open');
      }
    });
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict';

  $(function () {
    if ($('body').hasClass('home')) {
      /*let userAgent = navigator.userAgent;
      if(!userAgent.match(/ilpost-app/i)){
          $('.lanci-homepage').hide();
          $('section#content').prepend('<a class="bannerElezioniPolitiche2022" href="https://www.ilpost.it/speciali/elezioni-politiche-2022/"><img style="width:100%" src="https://www.ilpost.it/wp-content/uploads/2022/09/28/1664375303-banner-live-elezioni-22.jpg"></a>')
      }
      */

      /*
      $.get( "https://7otzkjg293.execute-api.eu-central-1.amazonaws.com/data/widget/index.html", function( data ) {
          if (data && data.html){
              $('.lanci-homepage').hide();
              $('section#content').prepend(data.html);
          }
      });
      */
    }
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict';

  $(function () {
    if ($('body').hasClass('home')) {
      $.get('https://elezioni-regionali-2023.ilpost.it/data/config.json', function (data) {
        if (data && data.html) {
          $('.lanci-homepage').hide();
          $('section#content').prepend(data.html);
        }
      });
    }
  });
})(jQuery);
"use strict";

/**
 * Funzione che controlla il valore di un cookie con la chiave passata in input
 */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}
/**
 * Funzione per la barra utente
 */


(function ($) {
  'use strict';

  $(function () {
    function showBar(msg) {
      var headerleft = $('header.site-head ul.headerleft');
      var headerright = $('header.site-head ul.headerright');
      var sidebarpersonalarea = $('header.site-head ul.sidebarpersonalarea');
      var html = ''; // Se l'utente è un admin e la pagina è il dettaglio di un articolo allora mostro il MODIFICA ARTICOLO 

      if (msg.logged && msg.admin && msg.url_edit != '') headerleft.append('<li><a class="hidemobile editarticle" href="' + msg.url_edit + '">Modifica</a></li>'); // Se l'utente non è abbonato gli mostro il bottone per abbonarsi

      if (msg.issubscriber == 0) headerright.append('<li><a class="hidemobile subscription"href="https://abbonati.ilpost.it/?utm_source=ilpost&utm_medium=abbonati_header&utm_campaign=cta_standard">Abbonati</a></li>');
      if (msg.logged) headerright.append('<li><a class="user_icon user_logged" href="https://abbonati.ilpost.it/mio-account/"></a>');else headerright.append('<li><a class="user_icon user_not_logged" href="' + msg.url_login + '"></a>');

      if (msg.logged) {
        sidebarpersonalarea.append('<li><a href="https://abbonati.ilpost.it/mio-account">Area Personale</a></li>');
        sidebarpersonalarea.append('<li><a href="https://abbonati.ilpost.it/mio-account/newsletter/">Newsletter</a></li>');
        sidebarpersonalarea.append('<li><a href="https://abbonati.ilpost.it/mio-account/push-mobile/">Notifiche mobile</a></li>');
        sidebarpersonalarea.append('<li><a href="https://abbonati.ilpost.it/mio-account/give-subscription/">Regala il Post</a></li>');
        sidebarpersonalarea.append('<li><a href="https://abbonati.ilpost.it/mio-account/need-help/">Hai bisogno di aiuto?</a></li>');
        sidebarpersonalarea.append('<li><a href="' + msg.url_logout + '">Esci</a></li>');
      } else {
        sidebarpersonalarea.append('<li><a href="' + msg.url_login + '">Entra</a></li>');
      }

      if (msg.admin) window.IsASubscriber = 0;else window.IsASubscriber = msg.issubscriber;

      if (window.IsASubscriber == 1) {
        $('body').addClass('noAdv');
      }

      var sendLoginEvent = false;
      var retrievedUserObject = localStorage.getItem('userobject');

      if (retrievedUserObject != null) {
        retrievedUserObject = JSON.parse(retrievedUserObject);

        if (!retrievedUserObject.cd) {
          sendLoginEvent = true;
          localStorage.removeItem('userobject');
        }

        if (retrievedUserObject.cd != msg.user_id.toString()) {
          sendLoginEvent = true;
        }
      } else {
        sendLoginEvent = true;
      }

      var userobject = {
        'visitorLoginState': msg.visitorLoginState,
        'visitorType': msg.visitorType,
        'visitorStatusSubscription': msg.visitorStatusSubscription,
        'cd': msg.user_id.toString()
      };
      localStorage.setItem('userobject', JSON.stringify(userobject));

      if (sendLoginEvent) {
        if (window.dataLayer) {
          dataLayer.push({
            'event': 'login status',
            'visitorLoginState': msg.visitorLoginState,
            'visitorType': msg.visitorType,
            'visitorStatusSubscription': msg.visitorStatusSubscription,
            'cd': msg.user_id.toString()
          });
        } else {
          console.log('Non rilevo il dataLayer');
        }
      }
    }

    if (ilpostnew.api_url == '') {
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ilpostnew.ajax_url,
        data: {
          'action': 'checkuser',
          'permalink': ilpostnew.permalink,
          'post_id': ilpostnew.post_id,
          'cookie': ilpostnew.cookie,
          'url_login': ilpostnew.login_url,
          'url_logout': ilpostnew.logout_url,
          'website_url': ilpostnew.website_url,
          'abbonati_url': ilpostnew.abbonati_url
        },
        success: function success(msg) {
          showBar(msg);
          $.getScript(ilpostnew.advjs, function () {
            if ($('body').hasClass('single-flashes') || $('body').hasClass('post-type-archive-flashes')) {
              $.getScript(ilpostnew.flashesjs, function () {});
            }
          });
        },
        error: function error(_error) {
          var html = '';
          window.IsASubscriber = 0;

          if (typeof window.gcSsoLogout !== "undefined") {
            window.gcSsoLogout();
          }

          $('section.userBar>#wrap').html(html);
          $.getScript(ilpostnew.advjs, function () {
            if ($('body').hasClass('single-flashes') || $('body').hasClass('post-type-archive-flashes')) {
              $.getScript(ilpostnew.flashesjs, function () {});
            }
          });
        }
      });
    } else {
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ilpostnew.api_url + '/user',
        xhrFields: {
          withCredentials: true
        },
        data: JSON.stringify({
          'permalink': ilpostnew.permalink,
          'post_id': ilpostnew.post_id,
          'cookie': ilpostnew.cookie,
          'url_login': ilpostnew.login_url,
          'url_logout': ilpostnew.logout_url,
          'website_url': ilpostnew.website_url,
          'abbonati_url': ilpostnew.abbonati_url
        }),
        contentType: "application/json; charset=utf-8",
        error: function error(_error2) {
          var html = '';
          window.IsASubscriber = 0;

          if (typeof window.gcSsoLogout !== "undefined") {
            window.gcSsoLogout();
          }

          $('section.userBar>#wrap').html(html);
          $.getScript(ilpostnew.advjs, function () {
            if ($('body').hasClass('single-flashes') || $('body').hasClass('post-type-archive-flashes')) {
              $.getScript(ilpostnew.flashesjs, function () {});
            }
          });
        },
        success: function success(msg) {
          showBar(msg);
          $.getScript(ilpostnew.advjs, function () {
            if ($('body').hasClass('single-flashes') || $('body').hasClass('post-type-archive-flashes')) {
              $.getScript(ilpostnew.flashesjs, function () {});
            }
          });
        }
      });
    }
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict'; // -------------------------------------------------------------
  //   Basic Navigation
  // -------------------------------------------------------------

  (function () {
    if ($('body').hasClass('login') && $('body').hasClass('login-action-login')) {
      $('body').prepend('<header class="site-head "><div class="container-fluid"><div class="row"><div class="col-4 align-self-center"></div><div class="col-4 col-logo align-self-center"><a href="https://www.ilpost.it"><img src="/wp-content/themes/ilpost_2018/assets/img/logo.svg"></a></div><div class="col-4 align-self-center"></div></div></div></header>');
    }
  })();
})(jQuery);