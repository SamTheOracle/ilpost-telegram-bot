window.IlPostUserModalTemplate = Object.create(null)
window.IlPostUserModalTemplate['delete.html'] = '<div class="IlPostUserDelete">\n    <div>\n        <div>\n            <h1>Cancellazione account</h1>\n            <form class="checktoken" action="#" method="POST">\n                <input type="hidden" name="action" value="IlPostUserDeleteToken" />\n                <label>Token <span>*</span></label>\n                <input type="text" name="delete_token" required />\n                <input type="submit" value="VERIFICA">\n            </form>\n            <form class="confirm" action="#" method="POST">\n                <p class="info">La tua richiesta di cancellazione è stata confermata. Riceverai una email al tuo indirizzo di posta per completare la procedura.</p>\n                <input type="submit" value="Chiudi">\n            </form>\n        </div>\n        <div class="error">\n            <p>C\'è stato un errore. Ricarica la pagina e riprova.</p>\n        </div>\n    </div>\n</div>'
window.IlPostUserModalTemplate['modal-no-subscriber.html'] = '<div class="IlPostUserModalNoSubscriber">\n    <div class="IlPostUserModalNoSubscriberInternal">\n        <h3><mark>Questo podcast fa parte dell\'offerta per le persone che sono abbonate al Post.<br>Se vuoi ascoltarlo, abbonati anche tu.</mark></h3>\n        <h4>Cosa otterrai:</h4>\n        <ul>\n            <li>I podcast solo per gli abbonati</li>\n            <li>Le newsletter riservate agli abbonati</li>\n            <li>Il sito senza inserzioni pubblicitarie</li>\n            <li>La libertà di commentare gli articoli</li>\n        </ul>\n        <div class="plan">\n            <div class="plan_box">\n                <a href="https://abbonati.ilpost.it/">Abbonati al Post</a>\n                <span>8€ / mese o 80€ / anno</span>\n            </div>\n        </div>\n    </div>\n</div>'
window.IlPostUserModalTemplate['modal.html'] = '<div class="IlPostUserModal">\n    <div>\n        <div>\n            <h1>Accedi con il tuo account o registrati</h1>\n            <form class="checkemail" action="#" method="POST">\n                <input type="hidden" name="action" value="IlPostUserModalCheckEmail" />\n                <label>Accedi o registrati con la tua email <span>*</span></label>\n                <input type="email" name="email" required />\n                <input type="submit" value="Continua">\n            </form>\n            <form class="login" action="#" method="POST">\n                <input type="hidden" name="action" value="IlPostUserModalLogin" />\n                <label>Indirizzo email <span>*</span></label>\n                <input type="email" name="email" required />\n                <label>Password <span>*</span></label>\n                <div class="passwordBox">\n                    <input type="password" name="password" autocomplete="off" required />\n                    <div class="icon"></div>\n                </div>\n                <input type="submit" value="Accedi">\n                <p class="link"><a href="https://abbonati.ilpost.it/mio-account/lost-password/">Hai perso la password?</a></p>\n            </form>\n            <form class="register" action="#" method="POST">\n                <input type="hidden" name="action" value="IlPostUserModalRegister" />\n                <input type="hidden" name="url" value="" />\n                <label>Indirizzo email <span>*</span></label>\n                <input type="email" name="email" required />\n                <label>Password <span>*</span></label>\n                <div class="passwordBox">\n                    <input type="password" name="password" autocomplete="off" required />\n                    <div class="icon"></div>\n                </div>\n                <label class="checkbox">Dichiaro di aver preso visione dell\'<a href="https://www.ilpost.it/privacy/" target="_blank">informativa</a> riguardante il trattamento dei dati ed acconsento al trattamento degli stessi per la gestione della registrazione e dei servizi collegati.<span>*</span>\n                    <input type="checkbox" name="privacy">\n                    <span class="checkmark"></span>\n                </label>\n                <label class="checkbox">Dichiaro di aver preso visione e di accettare le <a href="https://www.ilpost.it/condizioni-generali/" target="_blank">condizioni di registrazione</a>.<span>*</span>\n                    <input type="checkbox" name="tos">\n                    <span class="checkmark"></span>\n                </label>\n                <input type="submit" value="Registrati">\n                <p class="link"><a class="showlogin">Hai già un account?</a></p>\n            </form>\n            <form class="confirm" action="#" method="POST">\n                <p class="info"></p>\n                <input type="submit" value="OK">\n            </form>\n        </div>\n        <div class="error">\n            <p>C\'è stato un errore. Ricarica la pagina e riprova.</p>\n        </div>\n    </div>\n</div>'