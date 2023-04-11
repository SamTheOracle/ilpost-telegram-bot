jQuery(document).ready(function ($) {
	// Show the login dialog box on click
	$('body').on('click','a#show_login',function (e) {
	//$('a#show_login').on('click', function (e) {
		$('body').prepend('<div class="login_overlay"></div>');
		$('form#login').fadeIn(500);
		$('div.login_overlay, form#login .close').on('click', function () {
			$('div.login_overlay').remove();
			$('form#login').hide();
		});
		e.preventDefault();
	});
	// Perform AJAX login on form submit
	$('form#login').on('submit', function (e) {
		e.preventDefault();
		console.log('show')
		$('form#login p.status').show().text('Invio informazioni utente, attendi...');
		$.ajax({
			type    : 'POST',
			dataType: 'json',
			url     : $('form#login').attr('action'),
			data    : {
				'action'  : 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
				'username': $('form#login #username').val(),
				'password': $('form#login #password').val(),
				'security': $('form#login #security').val()
			},
			success : function (data) {
				$('form#login p.status').text(data.message);
				if (data.loggedin == true) {
					var url = new URL($('form#login #redirect').val());
					var d = new Date();
					url.searchParams.append(d.getTime(), 'true');
					setTimeout(
						function () {
							document.location.href = url.href;
						}, 500);
				}
			}
		});

	});
	$('#toggle-password').click(function(e) {
		var x = document.getElementById("password");
		if (x.type === "password") {
		  x.type = "text";
		} else {
		  x.type = "password";
		}
	});
});