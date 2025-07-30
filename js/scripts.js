// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 405) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=405, user-scalable=no'
}

$(() => {
	$('body').on('submit', '.form-ajax', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})


	if ($('.main-slider').length) {
		new Swiper(".main-slider", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 1,
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			}
		})
	}

	if ($('.stocks__slider').length) {
		new Swiper(".stocks__slider", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 1,
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}

	if ($('.advantages__slider').length) {
		new Swiper(".advantages__slider", {
			loop: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 20,
					slidesPerView: 2
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				'1025': {
					spaceBetween: 20,
					slidesPerView: 3,
				},
				'1300': {
					spaceBetween: 30,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}

	if ($('.reviews__slider').length) {
		new Swiper(".reviews__slider", {
			loop: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 2,
				},
				'1025': {
					spaceBetween: 20,
					slidesPerView: 3,
				},
				'1300': {
					spaceBetween: 30,
					slidesPerView: 3,
				}
			},
		})
	}

	if ($('.main-about__slider').length) {
		new Swiper(".main-about__slider", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: 1,
			speed: 800,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}

	if ($('.products__slider').length) {
		new Swiper(".products__slider", {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},breakpoints: {
				'320': {
					spaceBetween: 20,
					slidesPerView: 1
				},
				'480': {
					spaceBetween: 20,
					slidesPerView: 2
				},
				'768': {
					spaceBetween: 20,
					slidesPerView: 3,
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 3,
				},
				'1025': {
					spaceBetween: 20,
					slidesPerView: 3,
				},
				'1300': {
					spaceBetween: 30,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}
});


$(window).on('load', () => {
	//
	if ($('.products__grid').length){
		$('.products .products__grid').each(function() {
			productsHeight($(this), parseInt($(this).css('--products_count')))
		})
	}


	if ( $('.sorting__link.active') ) {
		$('.sorting__link.active').each( function() {
			let offset = $(this).offset().left,
				width = $(this).outerWidth()/2;

			let	scroll = (offset + width) - ($(window).width()/2);

			$(this).closest('.sorting').scrollLeft(scroll);
		})
	}


	if ($('.advantages__items').length){
		advantagesSlider()
	}
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 405) document.getElementsByTagName('meta')['viewport'].content = 'width=405, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}


		//
		if ($('.products__grid').length){
			$('.products .products__grid').each(function() {
				productsHeight($(this), parseInt($(this).css('--products_count')))
			})
		}
	}

	if ($('.product-info__sizes-wrap').length){
		productSizesSlider()
	}
});


// 
function productsHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product')

	products.find('.product__top').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.product__top'))

		start  = start + step
		finish = finish + step
	}
}


function advantagesSlider(){
	if ( $(window).width() < 1024 && !$('.advantages__items').hasClass('swiper-initialized') ) {
		$('.advantages__items').addClass('swiper')
		$('.advantages__items-wrap').addClass('swiper-wrapper')
		$('.advantages__items-flex').addClass('swiper-slide')

		advantagesSwiper = new Swiper('.advantages__items', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			freeMode: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			on: {
				touchMove: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchStart: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').removeClass('_hide')
				},
				touchEnd: function (swiper) {
					$(swiper.el).find('.swiper-scrollbar').addClass('_hide')
				}
			}
		})
	}
	else if ($(window).width() > 1023 && $('.advantages__items').hasClass('swiper-initialized')) {
		if ($('.advantages__items').length === 1 && $('.advantages__items').hasClass('swiper-initialized')) {
			advantagesSwiper.destroy(true, true)
		} else if ($('.advantages__items').length >= 2 && $('.advantages__items').hasClass('swiper-initialized')) {
			advantagesSwiper.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.advantages__items').removeClass('swiper')
		$('.advantages__items-wrap').removeClass('swiper-wrapper')
		$('.advantages__items-flex').removeClass('swiper-slide')
	}
}