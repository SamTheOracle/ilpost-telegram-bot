"use strict";

var ILPOST_NEWSLETTER_VERSION = "1.1.95";
"use strict";

(function ($) {
  "use strict";

  jQuery(function () {
    document.addEventListener("DOMNodeInserted", function (e) {
      if (e.target.nodeName == 'DIV') {
        var boxnewsletter = document.querySelector(".boxnewsletter");
        if (e.target.contains(boxnewsletter)) {
          refreshNewsletterBox();
        }
      }
    }, false);
    $("body").on("click", ".boxnewsletter .buttonregistrazione>a", function (e) {
      e.preventDefault();
      var parent = $(this).parent().parent();
      var userstatus = $(this).attr("data-user-status");
      var newsletter_id = $(this).attr("data-newsletter-id");
      if (userstatus == "visitor") {
        $("body").ilPostUserModal({
          autoload: true,
          title: "Per ricevere le newsletter devi essere registrato con il Post.",
          title_login: "Inserisci la tua password per fare login.",
          title_reg: "Per completare la registrazione, scegli una password per il tuo account.",
          txt_reg_confirm: "La tua registrazione al Post è completata, puoi chiudere questa finestra e completare l’iscrizione alle newsletter."
        }, function (result) {
          if (result == "logged") {
            saveNewsletterBox(newsletter_id, parent);
          }
        });
      } else {
        saveNewsletterBox(newsletter_id, parent);
      }
    });
    refreshNewsletterBox();
    function saveNewsletterBox(newsletter_id, boxnewsletter) {
      if (boxnewsletter.find('a').html() == 'Attendere...') {
        return false;
      }
      boxnewsletter.find('a').html('Attendere...');
      var payload = {
        action: "shortcodenewslettersave",
        cookie: ilpostnewslettershortcode.cookie,
        newsletter_id: newsletter_id
      };
      jQuery.ajax({
        type: "post",
        dataType: "json",
        url: ilpostnewslettershortcode.ajax_url,
        data: payload,
        success: function success(response) {
          if (response && response.data && response.data.save) {
            boxnewsletter.find('h4').html('Fatto!');
            boxnewsletter.find('p.description').html('La tua iscrizione a questa newsletter è confermata, e grazie. <a href="/newsletter">Qui trovi tutte le altre newsletter del Post</a>.');
            boxnewsletter.find('div.buttonregistrazione').hide();
          } else {}
        }
      });
    }
    function refreshNewsletterBox() {
      $(".boxnewsletter").each(function () {
        if ($(this).find('.boxnewsletterinfo').length == 0) {
          var newsletter_id = $(this).attr("data-id");
          var newsletter_tpl = $(this).attr('data-template');
          var newsletter_box = $(this);
          var payload = {
            action: "shortcodenewsletter",
            cookie: ilpostnewslettershortcode.cookie,
            newsletter_id: newsletter_id
          };
          jQuery.ajax({
            type: "post",
            dataType: "json",
            url: ilpostnewslettershortcode.ajax_url,
            data: payload,
            success: function success(response) {
              if (response && response.data && response.data.newsletter) {
                newsletter_box.removeClass("loader");
                if (response.data.status == 0) {
                  var html = newsletter_tpl == '1' ? html3A(response.data, newsletter_id) : html1A(response.data, newsletter_id);
                  newsletter_box.html(html);
                } else {
                  newsletter_box.hide();
                }
              }
            }
          });
        }
      });
    }
    function html1A(data, newsletter_id) {
      var newsletter = data.newsletter,
        userstatus = data.userstatus;
      var image = newsletter.image;
      var html = '<div class="boxnewsletterinfo tpl-1">';
      html += "<h4>";
      if (image) {
        html += '<span class="title-image"><img src="' + image + '" loading="lazy" /></span>';
      }
      html += newsletter.title + "</h4>";
      html += "<p class='description'>" + newsletter.description + "</p>";
      html += '<div class="buttonregistrazione"><a data-user-status="' + userstatus + '" data-newsletter-id="' + newsletter_id + '">Iscriviti</a></div>';
      html += "</div>";
      return html;
    }
    function html3A(data, newsletter_id) {
      var newsletter = data.newsletter,
        userstatus = data.userstatus;
      var image = newsletter.image;
      var hasImage = image ? ' hasImage' : '';
      if (hasImage != '') {
        var html = '<div class="boxnewsletterinfo' + hasImage + '">';
        html += '<div class="newsletter-image"><img src="';
        html += image;
        html += '" loading="lazy" /></div>';
        html += '<div class="newsletter-info">'; // apro div di wrap titolo + desc + btn
        html += "<h4>" + newsletter.title + "</h4>";
        html += "<p class='description'>" + newsletter.description + "</p>";
        html += '<div class="buttonregistrazione"><a data-user-status="' + userstatus + '" data-newsletter-id="' + newsletter_id + '">Iscriviti</a></div>';
        html += "</div>";
        html += '</div>'; // chiudo div di wrap titolo + desc + btn
      } else {
        var html = html1A(data, newsletter_id);
      }
      return html;
    }
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict';

  jQuery(function () {
    $.fn.showModal = function (title, desc, link, cta) {
      if (jQuery('.modalIlPost').length > 0) {
        jQuery(".modalIlPost").remove();
      }
      var html = '<div class="modalIlPost">';
      html += '<div class="modalIlPostBox">';
      html += '<h3><span>' + title + '</span></h3>';
      html += '<div class="modalIlPostInfo">' + desc + '</div>';
      if (link != '') html += '<a class="cta" href="' + link + '">' + cta + '</a>';else html += '<a class="cta">OK</a>';
      html += '</div>';
      html += '</div>';
      jQuery('body').prepend(html);
    };
    $('body').on('click', '.modalIlPost', function () {
      jQuery(".modalIlPost").remove();
    });
  });
})(jQuery);
"use strict";

(function ($) {
  'use strict';

  jQuery(function () {
    $.fn.showToast = function (desc, link, cta) {
      if ($('.ilPostToast').length > 0) $('.ilPostToast').remove();
      var html = '<div class="ilPostToast">';
      html += '<div class="ilPostToastBox">';
      html += '<p>' + desc + '</p>';
      html += '</div>';
      html += '</div>';
      jQuery('body').prepend(html);
      $('.ilPostToast').fadeIn().delay(2000).fadeOut();
    };
  });
})(jQuery);