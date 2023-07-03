$(() => {
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items           : 1,
		margin          : 0,
		nav             : true,
		dots            : false,
		loop            : true,
		smartSpeed      : 750,
		autoplay        : true,
		autoplayTimeout : 5000,
		navText         : [
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>',
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>'
		],
		onInitialized : (event) => {
			event.item.count < 10
				? $('.main_slider .count .total').text('0'+ event.item.count)
				: $('.main_slider .count .total').text(event.item.count)
	    },
		onTranslate : (event) => {
			$(event.target).trigger('stop.owl.autoplay')

	    	let currentIndex = event.item.index - event.relatedTarget._clones.length / 2

	    	currentIndex < 0
	    		? currentIndex = event.item.count
	    		: currentIndex = currentIndex+1

	    	if(currentIndex > event.item.count) {currentIndex = 1}

	    	event.item.count < 10
				? $('.main_slider .count .current').text('0'+ currentIndex)
				: $('.main_slider .count .current').text(currentIndex)
	    },
		onTranslated : (event) => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		}
	})


	// Карусель товаров
	$('.products .slider').owlCarousel({
		loop       : false,
		smartSpeed : 500,
		dots       : false,
		mouseDrag  : false,
		touchDrag  : false,
		pullDrag   : false,
		freeDrag   : false,
		nav        : true,
		navText    : [
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>',
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>'
		],
		responsive : {
	        0: {
				items  : 2,
				margin : 15
	        },
	        768: {
	            items  : 3,
				margin : 20
	        },
	        1024: {
	            items  : 4,
				margin : 20
	        },
	        1280: {
	            items  : 4,
				margin : 32
	        }
		},
		onInitialized : (event) => {
			setTimeout(() => { productHeight($(event.target), $(event.target).find('.slide').length) }, 100)
		},
		onResized : (event) => {
			setTimeout(() => { productHeight($(event.target), $(event.target).find('.slide').length) }, 100)
		}
	})


	// Карусель статей
	$('.articles .slider').owlCarousel({
		loop       : false,
		smartSpeed : 500,
		dots       : false,
		mouseDrag  : false,
		touchDrag  : false,
		pullDrag   : false,
		freeDrag   : false,
		nav        : true,
		navText    : [
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>',
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>'
		],
		responsive : {
	        0: {
				items  : 1,
				margin : 20
	        },
	        768: {
	            items  : 2,
				margin : 20
	        },
	        1024: {
	            items  : 3,
				margin : 20
	        }
		},
		onInitialized : (event) => {
			setTimeout(() => {
				$(event.target).find('.owl-nav button').css( 'top', ($(event.target).find('.thumb').outerHeight() / 2))
			}, 100)
		},
		onResized : (event) => {
			setTimeout(() => {
				$(event.target).find('.owl-nav button').css( 'top', ($(event.target).find('.thumb').outerHeight() / 2))
			}, 100)
		}
	})


	// Карусель картинок (галерея)
	$('.gallery .slider').owlCarousel({
		loop       : false,
		smartSpeed : 500,
		dots       : false,
		mouseDrag  : false,
		touchDrag  : false,
		pullDrag   : false,
		freeDrag   : false,
		nav        : true,
		navText    : [
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>',
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>'
		],
		responsive : {
	        0: {
				items  : 2,
				margin : 15
	        },
	        768: {
	            items  : 3,
				margin : 20
	        },
	        1024: {
	            items  : 4,
				margin : 25
	        },
	        1280: {
	            items  : 4,
				margin : 32
	        }
		}
	})


	// Страница товара
	$('.product_info .images .big .slider').owlCarousel({
		items       : 1,
		margin      : 20,
		loop        : false,
		smartSpeed  : 500,
		dots        : false,
		nav         : false,
		onTranslate : (event) => {
	    	let parent = $(event.target).closest('.images')

	    	parent.find('.thumbs .slide > *').removeClass('active')
	    	parent.find('.thumbs .slide:eq('+ event.item.index +') > *').addClass('active')
	    }
	})

	$('.product_info .images .thumbs .slider').owlCarousel({
		nav        : true,
		dots       : false,
		loop       : false,
		smartSpeed : 500,
		items      : 3,
		navText    : [
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>',
			'<svg class="icon"><use xlink:href="images/sprite.svg#ic_arrow"></use></svg>'
		],
		responsive : {
	        0: {
				margin : 10
	        },
	        768: {
				margin : 20
	        }
		}
	})

	$('.product_info .images .thumbs .slide > *').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.images')

	    parent.find('.big .slider').trigger('to.owl.carousel', $(this).data('slide-index'))
	})


	// Отправка форм
	$('body').on('submit', '.form.custom_submit', function(e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src    : '#success_modal',
			type   : 'inline',
			touch  : false,
			btnTpl : {
				smallBtn :
					'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small"">' +
						'<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>' +
					'</button>'
			},
			afterShow : function( instance, current ) {
				setTimeout(function(){
					$.fancybox.close()
				}, 3000)
			}
		})
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent           = $(this).closest('.tabs_container'),
				  activeTab         = $(this).data('content'),
				  $activeTabContent = $(activeTab),
				  level             = $(this).data('level')

			$parent.find('.tabs:first .btn').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab        = $(`.tabs .btn[data-content="${locationHash}"]`),
			  $activeTabContent = $(locationHash),
			  $parent           = $activeTab.closest('.tabs_container'),
			  level             = $activeTab.data('level')

		$parent.find('.tabs:first .btn').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Добавить отзыв
	$('.add_review_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.add_review .form').slideToggle(300)

		// Авто высота у поля ввода
		$('.form textarea.autoheight').autogrow({
			vertical: true,
			horizontal: false
		})
	})


	// Смена вида отображения товаров в категории
	$('.products .head .views .grid_btn').click(function(e) {
		e.preventDefault()

		$('.products .head .views .btn').removeClass('active')
		$(this).addClass('active')

		$('.products .view_list').hide()
		$('.products .view_grid').fadeIn(300)
	})

	$('.products .head .views .list_btn').click(function(e) {
		e.preventDefault()

		$('.products .head .views .btn').removeClass('active')
		$(this).addClass('active')

		$('.products .view_grid').hide()
		$('.products .view_list').fadeIn(300)
	})
})



// Выравнивание товаров
function productHeight(context, step){
	let start     = 0,
		finish    = step,
		$products = context.find('.product')

	$products.find('.name').height('auto')

	$products.each(function(){
		setHeight( $products.slice(start, finish).find('.name') )

		start  = start + step
		finish = finish + step
	})
}