(function ($) {

    $.fn.ilPostUserModalNoSubsciber = function (options){
        var settings = $.extend({
            autoload: false,
            title: "Questo servizio fa parte dell'offerta per le persone che sono abbonate al Post.<br>Se vuoi ascoltarlo, abbonati anche tu."
        }, options);
        if (settings.autoload) {
            $('body').append(window.IlPostUserModalTemplate['modal-no-subscriber.html'])
            var IlPostUserModalNoSubscriber = $('body').find('.IlPostUserModalNoSubscriber');
            IlPostUserModalNoSubscriber.find('mark').html(settings.title);
            IlPostUserModalNoSubscriber.fadeIn();
        }
        $(document).on("click", '.IlPostUserModalNoSubscriber', function (e) {
            var target = $(e.target);
            if (target.attr('class') && target.attr('class') != 'IlPostUserModalNoSubscriberInternal') {
                e.preventDefault();
                e.stopImmediatePropagation();
                $('.IlPostUserModalNoSubscriber').remove();
            }
        });
    };
    $.fn.ilPostUserModal = function (options,callback) {
        function validate(form) {
            form.find('input, select').each(
                function (index) {
                    if ($(this).attr('required')) {
                        if ($(this).attr('type') == 'password' && $(this).val() == '') {
                            showerror('La password è obbligatoria')
                            return false;
                        }
                        if ($(this).attr('type') == 'email' && $(this).val() == '') {
                            showerror('La email è obbligatoria')
                            return false;
                        }
                    }
                }
            );
            return true;
        }
        function hideerror() {
            $('body').find('.IlPostUserModal').find('.error').hide();
        }
        function showerror(message) {
            if (message != '')
                $('body').find('.IlPostUserModal').find('.error>p').html(message);
            $('body').find('.IlPostUserModal').find('.error').show();
        }
        async function call(data) {
            let result;

            try {
                result = await $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    type: 'POST',
                    data: data
                });

                return result;
            } catch (error) {
                return null;
            }
        }

        var settings = $.extend({
            title: "Accedi con il tuo account o registrati",
            title_reg: "Accedi con il tuo account o registrati",
            title_login: "Inserisci la tua password per fare login",
            txt_reg_confirm: "La tua registrazione al Post è completata, puoi chiudere questa finestra.",
            autoload: false
        }, options);


        if (settings.autoload) {
            $('body').append(window.IlPostUserModalTemplate['modal.html'])
            var modalRegister = $('body').find('.IlPostUserModal');
            modalRegister.find('h1').html(settings.title);
            modalRegister.find('form.confirm p.info').html(settings.txt_reg_confirm);
            var url = window.location.href.split('?')[0];
            modalRegister.find('form.register>input[name="url"]').val(url);
            modalRegister.fadeIn();
        }

        $(this).on('click', function (e) {
            if (!settings.autoload) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $('body').append(window.IlPostUserModalTemplate['modal.html'])
                var modalRegister = $('body').find('.IlPostUserModal');
                modalRegister.find('h1').html(settings.title);
                modalRegister.find('form.confirm p.info').html(settings.txt_reg_confirm);
                var url = window.location.href.split('?')[0];
                modalRegister.find('form.register>input[name="url"]').val(url);
                modalRegister.fadeIn();
            }
        });

        $(document).on("click", '.IlPostUserModal', function (e) {
            var target = $(e.target);
            if (target.attr('class') && target.attr('class') == 'IlPostUserModal') {
                e.preventDefault();
                e.stopImmediatePropagation();
                $('.IlPostUserModal').remove();
            }
        });

        $(document).on("click", '.passwordBox>.icon', function (e) {
            e.preventDefault();
            var icon = $(this);
            var parent=$(this).parent();
            var passwordType=parent.find('input[name="password"]').attr('type');
            if (passwordType=='password'){
                icon.addClass('display-password');
                parent.find('input[name="password"]').attr('type','text');
            }else{
                icon.removeClass('display-password');
                parent.find('input[name="password"]').attr('type','password');
            }
        });


        $(document).on("submit", '.IlPostUserModal>div>div>form.checkemail', function (e) {
            var modalRegister = $('body').find('.IlPostUserModal');
            e.preventDefault();
            e.stopImmediatePropagation();
            hideerror();
            action = $(this).find('input[name="action"]').val();
            email = $(this).find('input[name="email"]').val();
            if (!validate($(this)))
                return false;
            $(this).find('input[type="submit"]').attr('disabled', true);
            response = call($(this).serialize()).then((data) => {
                $(this).find('input[type="submit"]').attr('disabled', false);
                if (!data)
                    showerror('');
                if (data.data.found == 1) {
                    $(this).hide();
                    modalRegister.find('h1').html(settings.title_login);
                    modalRegister.find('form.login').find('input[name="email"]').val(email);
                    modalRegister.find('form.login').show();
                }
                if (data.data.found == 0) {
                    $(this).hide();
                    modalRegister.find('h1').html(settings.title_reg);
                    modalRegister.find('form.register').find('input[name="email"]').val(email);
                    modalRegister.find('form.register').show();
                }

            });
        });

        /**
        * Gestione del login
        */
        $(document).on("submit", '.IlPostUserModal>div>div>form.login', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            hideerror();
            var modalRegister = $('body').find('.IlPostUserModal');
            action = $(this).find('input[name="action"]').val();
            $(this).find('input[type="submit"]').attr('disabled', true);
            response = call($(this).serialize()).then((data) => {
                $(this).find('input[type="submit"]').attr('disabled', false);
                if (!data)
                    showerror('');
                if (data.data.login == 1){
                    modalRegister.remove();
                    callback.call(this,"logged");
                }
                if (data.data.login == 0)
                    showerror('Email o Password non validi. Riprova.');
                if (data.data.login == 2)
                    showerror('Il tuo account non è stato confermato.');
            });
        });


        /**
         * Gestione della registrazione nuovo utente
         */
        $(document).on("click", '.IlPostUserModal>div>div>form.register>button', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var modalRegister = $('body').find('.IlPostUserModal');
            modalRegister.find('form.register>p.info').hide();
            modalRegister.find('form.register>button').hide();
            modalRegister.find('form.register>.stepRegistration').css('display', 'block');
        });

        $(document).on("submit", '.IlPostUserModal>div>div>form.register', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var modalRegister = $('body').find('.IlPostUserModal');
            hideerror();
            var privacy = $(this).find('input[name="privacy"]:checked').val();
            if (privacy != 'on'){
                showerror('Devi acconsentire al trattamento dei dati.')
                return false;
            }
            var tos = $(this).find('input[name="tos"]:checked').val();
            if (tos != 'on'){
                showerror('Devi accettare le condizioni di registrazione.')
                return false;
            }
            if (!validate($(this)))
                return false;
            action = $(this).find('input[name="action"]').val();
            $(this).find('input[type="submit"]').attr('disabled', true);
            $(this).find('input[type="submit"]').val('Attendere ...');
            response = call($(this).serialize()).then((data) => {
                $(this).find('input[type="submit"]').attr('disabled', false);
                $(this).find('input[type="submit"]').val('Registrati');
                if (!data)
                    showerror('');
                if (data.data.register == 2)
                    showerror('La tua email è già presente nel sistema.')
                if (data.data.register == 1) {
                    modalRegister.find('form.register').hide();
                    modalRegister.find('h1').html('Fatto!');
                    modalRegister.find('form.confirm').show();
                }
                if (data.data.register == 0)
                    showerror('C\'è stato un errore durante la fase di registrazione. Riprova.');
            });
        });


        $(document).on("submit", '.IlPostUserModal>div>div>form.confirm', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            modalRegister.remove();
            callback.call(this,"logged");
        });

        $(document).on("click", '.IlPostUserModal a.showlogin', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var modalRegister = $('body').find('.IlPostUserModal');
            modalRegister.find('form.register').hide();
            modalRegister.find('form.login').show();
        })

        $(document).on("click", '.IlPostUserModal a.showregister', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var modalRegister = $('body').find('.IlPostUserModal');
            modalRegister.find('form.register').show();
            modalRegister.find('form.login').hide();
        })

    };

    $.fn.ilPostUserDelete = function (options) {

        var settings = $.extend({
            title: "Cancellazione account",
            token: ""
        }, options);

        async function call(data) {
            let result;

            try {
                result = await $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    type: 'POST',
                    data: data
                });

                return result;
            } catch (error) {
                return null;
            }
        }
        function hideerror() {
            $('body').find('.IlPostUserDelete').find('.error').hide();
        }
        function showerror(message) {
            if (message != '')
                $('body').find('.IlPostUserDelete').find('.error>p').html(message);
            $('body').find('.IlPostUserDelete').find('.error').show();
        }
        function removeParam(parameter) {
            var url = document.location.href;
            var urlparts = url.split('?');

            if (urlparts.length >= 2) {
                var urlBase = urlparts.shift();
                var queryString = urlparts.join("?");

                var prefix = encodeURIComponent(parameter) + '=';
                var pars = queryString.split(/[&;]/g);
                for (var i = pars.length; i-- > 0;)
                    if (pars[i].lastIndexOf(prefix, 0) !== -1)
                        pars.splice(i, 1);
                url = urlBase + '?' + pars.join('&');
                window.history.pushState('', document.title, url); // added this line to push the new url directly to url bar .

            }
            return url;
        }
        $(document).on("submit", '.IlPostUserDelete>div>div>form.checktoken', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            removeParam('delete_token');
            var modalDelete = $('body').find('.IlPostUserDelete');
            response = call($(this).serialize()).then((data) => {
                $(this).find('input[type="submit"]').attr('disabled', false);
                console.log(data);
                if (!data)
                    showerror('');
                if (data.data.delete == 0)
                    showerror('C\'è stato un errore durante la fase di eliminazione utente. Riprova.');
                if (data.data.delete == 1) {
                    modalDelete.find('form.checktoken').hide();
                    modalDelete.find('form.confirm').show();
                }

            });
        });
        $(document).on("submit", '.IlPostUserDelete>div>div>form.confirm', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $('.IlPostUserDelete').remove();
        });
        if (settings.token != '') {
            console.log(settings);
            $('body').append(window.IlPostUserModalTemplate['delete.html'])
            var modalDelete = $('body').find('.IlPostUserDelete');
            modalDelete.find('h1').html(settings.title)
            modalDelete.find('form.checktoken>input[name="delete_token"]').val(settings.token);
            modalDelete.fadeIn();
            modalDelete.find('form.checktoken').trigger('submit');
        }

    };

    /**
     * Verifico che sia presente in query string il parametro **delete_token**
     * Se è presente allora faccio apparire la modale per la conferma di cancellazione utente
     */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const delete_token = urlParams.get('delete_token');
    if (delete_token && delete_token != '') {
        $('body').ilPostUserDelete({
            token: delete_token
        });
    }


}(jQuery));