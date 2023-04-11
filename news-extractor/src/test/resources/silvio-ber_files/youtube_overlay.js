$ = jQuery 

window.ilPostStartVideo = e => {
	e.preventDefault()
	iframe = $(e.currentTarget).parents('.video-container').find('iframe')

	if($(iframe)){
		var rep = $(iframe)[0].src.replace('?rel=0', '')
		var newSrc
		
		newSrc = $(iframe)[0].src.indexOf('rel') > - 1 ? $(iframe).attr('frameborder', 0).attr('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share').attr('allowfullscreen') : $(iframe)[0].src += '&autoplay=1'

		$(iframe).attr('src', newSrc)
	}

	setTimeout(function(){
		$(e.currentTarget).fadeOut()
	}, 500)
}

$(document).ready(function(){
    $('.youtube-overlay').each(function(){
		$(this).click(function(event){
			ilPostStartVideo(event)
		})
	})
})