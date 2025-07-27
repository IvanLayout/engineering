// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 375) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
}

$(() => {
	// favorite
	$('body').on('click', '.product-favorite:not(.product-favorite_delete)', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.product-favorite_delete', function (e) {
		e.preventDefault()

		$(this).closest('.product').remove()
	})


	// compare
	$('body').on('click', '.product-compare:not(.product-favorite_delete)', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.product-compare_delete', function (e) {
		e.preventDefault()

		$(this).closest('.swiper-slide').remove()

		productsCompare.update()
	})


	$('body').on('click', '.filter-use__link', function (e) {
		e.preventDefault()

		$(this).closest('.filter-use__item').remove()

		if ($(window).width() < 1024 && $(this).closest('.filter-use').hasClass('swiper-initialized')) {
			filterUseSwiper.update()
		}
	})

	$('body').on('click', '.filter-use__clear', function (e) {
		e.preventDefault()

		$(this).closest('.filter-use').remove()
	})

	$('body').on('submit', '.form-ajax', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}])
	})



	//Ползунки
	$priceRange = $("#price_range").ionRangeSlider({
		type     : 'double',
		min      : 0,
		max      : 123000,
		from     : 11,
		to       : 123000,
		step     : 1,
		onChange : function (data) {
			$('.price_range input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range .range__input').keyup(function() {
		$priceRange.update({
			from : $('.price_range input.ot').val().replace(/\s/g,''),
			to : $('.price_range input.do').val().replace(/\s/g,'')
		})
	})

	$priceRange2 = $("#price_range2").ionRangeSlider({
		type     : 'double',
		min      : 0,
		max      : 123000,
		from     : 11,
		to       : 123000,
		step     : 1,
		onChange : function (data) {
			$('.price_range2 input.ot').val( data.from.toLocaleString('ru-RU') )
			$('.price_range2 input.do').val( data.to.toLocaleString('ru-RU') )
		}
	}).data("ionRangeSlider")

	$('.price_range2 .range__input').keyup(function() {
		$priceRange2.update({
			from : $('.price_range2 input.ot').val().replace(/\s/g,''),
			to : $('.price_range2 input.do').val().replace(/\s/g,'')
		})
	})

	$('.reset-btn').click(function(){
		if ( $('.price_range').length ) {
			$priceRange.reset()
		}

		if ( $('.price_range2').length ) {
			$priceRange.reset()
		}
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


	if ($('.inner-slider').length) {
		innerSlider = new Swiper(".inner-slider", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 'auto',
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
				slideChange: function (swiper) {
					$(swiper.el).removeClass('_last')

					if ( swiper.slides.length === swiper.activeIndex + 1 ) {
						$(swiper.el).addClass('_last')
					}
				}
			}
		})

		catalogSlider = new Swiper(".catalog-top__slider", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 'auto',
			speed: 500,
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
			}
		})

		innerSlider.controller.control = catalogSlider
		catalogSlider.controller.control = innerSlider
	}


	if ($('.header__cats').length) {
		new Swiper(".header__cats", {
			loop: false,
			spaceBetween: 15,
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
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
				},
				'1024': {
					spaceBetween: 20,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}


	if ($('.catalog-cats').length) {
		new Swiper(".catalog-cats", {
			loop: false,
			spaceBetween: 15,
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
			},
			breakpoints: {
				'320': {
					spaceBetween: 15,
				},
				'480': {
					spaceBetween: 15,
				},
				'768': {
					spaceBetween: 15,
				},
				'1024': {
					spaceBetween: 20,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
			}
		})
	}


	if ($('.main-stock__slider').length) {
		new Swiper('.main-stock__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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


	if ($('.major-projects__slider').length) {
		new Swiper('.major-projects__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 12,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 16,
					slidesPerView: 3,
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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


	if ($('.inner-reviews__slider').length) {
		new Swiper('.inner-reviews__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
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
				el: ".slider-progressbar",
				type: "progressbar",
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 16,
					slidesPerView: 2,
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 3,
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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


	if ($('.history__dates').length) {
		historyDates = new Swiper('.history__dates', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
			slideToClickedSlide: true,
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
				el: ".slider-progressbar",
				type: "progressbar",
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 35,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 35,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 60,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 97,
					slidesPerView: 'auto'
				},
				'1320': {
					spaceBetween: 152,
					slidesPerView: 'auto'
				},
				'1600': {
					spaceBetween: 266,
					slidesPerView: 'auto'
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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

		new Swiper('.history__slider', {
			spaceBetween: 40,
			slidesPerView: 'auto',
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: historyDates
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
		})
	}


	if ($('.main-news__slider').length) {
		new Swiper('.main-news__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 'auto'
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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


	
	if ($('.product__thumb').length) {
		new Swiper(".product__thumb", {
			loop: false,
			spaceBetween: 0,
			slidesPerView: 1,
			watchSlidesProgress: true,
			watchOverflow: true,
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
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


	if ($('.products__slider').length) {
		new Swiper('.products__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 4
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 6
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product__name, .product__box, .product__info, .product__prices').height('auto')

					setHeight( $(swiper.el).find('.product__name') )
					setHeight( $(swiper.el).find('.product__box') )
					setHeight( $(swiper.el).find('.product__info') )
					setHeight( $(swiper.el).find('.product__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product__name, .product__box, .product__info, .product__prices').height('auto')

					// setTimeout(function(){
						setHeight( $(swiper.el).find('.product__name') )
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__info') )
						setHeight( $(swiper.el).find('.product__prices') )
					// }, 200)
				},
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

	if ($('.compare-products__slider').length) {
		productsCompare = new Swiper('.compare-products__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 5
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product, .product__name, .product__box, .product__info, .product__prices').height('auto')

					setHeight( $(swiper.el).find('.product') )
					setHeight( $(swiper.el).find('.product__name') )
					setHeight( $(swiper.el).find('.product__box') )
					setHeight( $(swiper.el).find('.product__info') )
					setHeight( $(swiper.el).find('.product__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product, .product__name, .product__box, .product__info, .product__prices').height('auto')

					// setTimeout(function(){
						setHeight( $(swiper.el).find('.product') )
						setHeight( $(swiper.el).find('.product__name') )
						setHeight( $(swiper.el).find('.product__box') )
						setHeight( $(swiper.el).find('.product__info') )
						setHeight( $(swiper.el).find('.product__prices') )
					// }, 200)
				},
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

		compareFeatureSlider = new Swiper('.compare-section__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 3
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 5
				}
			},
			on: {
				init: function (swiper) {
					compareHeight()
				},
				resize: function (swiper) {
					compareHeight()
				},
			}
		})

		productsCompare.controller.control = compareFeatureSlider;
		compareFeatureSlider.controller.control = productsCompare;
	}

	if ($('.products-small__slider').length) {
		new Swiper('.products-small__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
			nested: true,
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 16,
					slidesPerView: 'auto'
				},
				'1024': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1320': {
					spaceBetween: 20,
					slidesPerView: 4
				},
				'1400': {
					spaceBetween: 20,
					slidesPerView: 5
				},
				'1760': {
					spaceBetween: 20,
					slidesPerView: 6
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.product-small__name, .product-small__box, .product-small__prices').height('auto')

					setHeight( $(swiper.el).find('.product-small__name') )
					setHeight( $(swiper.el).find('.product-small__box') )
					setHeight( $(swiper.el).find('.product-small__prices') )
				},
				resize: function (swiper) {
					$(swiper.el).find('.product-small__name, .product-small__box, .product-small__prices').height('auto')

					setHeight( $(swiper.el).find('.product-small__name') )
					setHeight( $(swiper.el).find('.product-small__box') )
					setHeight( $(swiper.el).find('.product-small__prices') )
				},
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


	if ($('.revirew-photo__slider').length) {
		new Swiper('.revirew-photo__slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 5
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 7
				},
				'768': {
					spaceBetween: 10,
					slidesPerView: 10
				},
				'1024': {
					spaceBetween: 10,
					slidesPerView: 9
				},
				'1760': {
					spaceBetween: 10,
					slidesPerView: 11
				}
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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


	if ($('.product-info').length) {
		galleryThumbs = new Swiper('.product-thumbs', {
			spaceBetween: 9,
			slidesPerView: 8,
			direction: 'vertical',
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'768': {
					spaceBetween: 9,
					slidesPerView: 8
				},
				'1024': {
					spaceBetween: 5,
					slidesPerView: 7
				},
				'1320': {
					spaceBetween: 8,
					slidesPerView: 5
				},
				'1760': {
					spaceBetween: 10,
					slidesPerView: 5
				}
			}
		})

		new Swiper('.product-images__slider', {
			spaceBetween: 10,
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: galleryThumbs
			},
			pagination: {
				bulletActiveClass: 'slider-dot_active',
				bulletClass: 'slider-dot',
				clickableClass: 'slider-pagination-clickable',
				el: '.slider-pagination',
				clickable: true,
			}
		})
	}


	if ($('.product-info__recommend-slider').length) {
		new Swiper('.product-info__recommend-slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
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


	if ($('.modal-service__cats-slider').length) {
		new Swiper('.modal-service__cats-slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 20,
			slidesPerView: 'auto',
			preloadImages: false,
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


	if ($('.modal-review__images').length) {
		new Swiper('.modal-review__images', {
			loop: true,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 1,
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
				clickable: true,
			},
		})
	}


	if ($('.modal-images').length) {
		let directionSwiper = 'vertical';

		if ( $(window).width() < 1320 ) {
			directionSwiper = 'horizontal'
		}

		galleryThumbsM = new Swiper('.modal-images__thumbs', {
			spaceBetween: 10,
			slidesPerView: 5,
			direction: directionSwiper,
			loop: false,
			speed: 500,
			watchOverflow: true,
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			breakpoints: {
				'768': {
					spaceBetween: 10,
					slidesPerView: 5
				},
				'1024': {
					spaceBetween: 12,
					slidesPerView: 5,
				},
				'1320': {
					spaceBetween: 8,
					slidesPerView: 5,
				},
				'1760': {
					spaceBetween: 10,
					slidesPerView: 8,
				}
			}
		})

		new Swiper('.modal-images__slider', {
			spaceBetween: 10,
			loop: false,
			speed: 500,
			watchOverflow: true,
			thumbs: {
				swiper: galleryThumbsM
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
		})
	}


	if ($('.modal-comment__images').length) {
		new Swiper('.modal-comment__images', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 12,
			slidesPerView: 'auto',
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
			scrollbar: {
				el: ".swiper-scrollbar",
				hide: false,
      		},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
				},
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


	//
	$('body').on('click', '.amount__btn_minus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		if ( $(this).closest('.product-global-added').hasClass('product-global-added') ) {
			parent = $('.product-global-added')
		}

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let minimum = parseFloat(input.data('minimum'))
		let step = parseFloat(input.data('step'))

		if (inputVal > minimum) {
			input.val(inputVal - step)

			parent.find('.amount__btn_plus').prop("disabled", false)
		}

		if (inputVal-1 == minimum) {
			if ( !parent.hasClass('product__amount') && !parent.closest('.product-global-added').hasClass('product-global-added') ){
				$(this).prop("disabled", true)
			}
		}

		if (inputVal == minimum) {
			if ( parent.hasClass('product__amount') ){
				$(this).closest('.product').find('.product__added').removeClass('_show')
				$(this).closest('.product').find('.product__bot').removeClass('_hide')
			}

			if ( parent.closest('.product-global-added').hasClass('product-global-added') ){
				$('.product-global-added').removeClass('_show')
				$('.product-global-btns').removeClass('_hide')
			}
		}
	})
	
	$('body').on('click', '.amount__btn_plus', function (e) {
		e.preventDefault()

		let parent = $(this).closest('.amount')

		if ( $(this).closest('.product-global-added').hasClass('product-global-added') ) {
			parent = $('.product-global-added')
		}

		let input = parent.find('input')
		let inputVal = parseFloat(input.val())
		let maximum = parseFloat(input.data('maximum'))
		let step = parseFloat(input.data('step'))

		if (inputVal < maximum) {
			input.val(inputVal + step)

			parent.find('.amount__btn_minus').prop("disabled", false)
		}

		if (inputVal+1 == maximum) {
			$(this).prop("disabled", true)
		}
	})

	$('.amount__input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})

	// Звездочки отзыва
	if ($('.rating-js').length){
		$('input.wow').rating()
	}


	if ( $('#datepicker').length ) {
		new AirDatepicker('#datepicker', {
			isMobile: true,
			autoClose: true,
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

	if ($('.filter-use_slider').length){
		filterUse()
	}

	if ($('.cooperation__wrap').length){
		cooperationSlider()
	}

	if ($('.approach__wrap').length){
		approachSlider()
	}

	if ($('.founders__item').length){
		foundersTextHeught()
	}

	if ($('.product-info__colrs-wrap').length){
		productColrsSlider()
	}

	if ($('.product-info__sizes-wrap').length){
		productSizesSlider()
	}


	$('body').on('click', '.approach__open', function (e) {
		e.preventDefault()

		if ( !$(this).hasClass('_active') ) {
			$('.approach-block').remove();
			$('.approach__open').removeClass('_active')

			const $items = $('.approach__item');
			const $clickedItem = $(this).closest('.approach__item');
			const clickedIndex = $items.index($clickedItem);
			const dataFile = $(this).data('file')

			const approachCount = parseInt($(this).parent().css('--approach_count'));
			const blockIndex = Math.floor(clickedIndex / approachCount);
			const insertAfterIndex = (blockIndex + 1) * approachCount - 1;

			let $insertAfter = 0;

			if ( $(window).width() > 767 ) {
				$insertAfter = $items.eq(insertAfterIndex);

				if ($insertAfter.length === 0) {
					$insertAfter = $items.last();
				}
			} else {
				$insertAfter = $items.closest('.approach');
			}

			$(this).addClass('_active')

			$.get(dataFile, function(data) {
				const $bigBlock = $('<div class="approach-block"></div>').html(data);
				$insertAfter.after($bigBlock);

				const approachBlockSlider = new Swiper('.approach-block__slider', {
					loop: false,
					watchSlidesProgress: true,
					watchOverflow: true,
					spaceBetween: 20,
					slidesPerView: 1,
					navigation: {
						nextEl: '.slider-button-next',
						prevEl: '.slider-button-prev'
					},
					on: {
						init: function (swiper) {
							$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
						},
					}
				})

				approachBlockSlider.slideTo(clickedIndex, 0)
			});
		} else{
			$('.approach-block').remove();
			$('.approach__open').removeClass('_active')
		}
	});

	$('body').on('click', '.approach-block__close', function (e) {
		e.preventDefault()

		$('.approach-block').remove();
		$('.approach__open').removeClass('_active')
	})


	$('body').on('click', '.founders__open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$(this).closest('.founders__item').find('.founders__item-wrap').removeClass('_all')
		} else{
			$(this).addClass('_active')
			$(this).closest('.founders__item').find('.founders__item-wrap').addClass('_all')
		}
	})


	if ( $(window).width() < 1320 && !$('.product-info').hasClass('mob') ) {
		$('.product-info').removeClass('pc')
		$('.product-info').addClass('mob')

		$('.product-info__info').each(function() {
			let parent = $('.product-info__top')

			$(this).appendTo(parent)
		})

		$('.product-info__calculator').each(function() {
			let parent = $('.product-info__box')

			$(this).prependTo(parent)
		})
	}

	if ( $(window).width() < 768 && !$('.checkout-table').hasClass('mob') ) {	
		$('.checkout-table').removeClass('pc')
		$('.checkout-table').addClass('mob')

		$('.checkout-table tr').each(function() {
			let thisEl = $(this)
			$(this).find('.amount').each(function() {
				let parent = thisEl.closest('tr').find('.checkout-table__wrapabs')

				$(this).appendTo(parent)
			})
		})
	}

	if ( $(window).width() < 768 && !$('.lk-user__item-imp').hasClass('mob') ) {	
		$('.lk-user').removeClass('pc')
		$('.lk-user').addClass('mob')

		$('.lk-user__item').each(function() {
			let thisEl = $(this)
			$(this).find('.lk-user__item-imp').each(function() {
				let parent = thisEl.find('.lk-user__item-info')

				$(this).appendTo(parent)
			})
		})
	}

	if ( $('#dropzone-photo').length ) {
		$('#dropzone-photo').dropzone({
			url: "/file/post",
			addRemoveLinks: true,
			dictRemoveFile: '<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.12526 18.3753C5.64401 18.3753 5.23276 18.2038 4.88976 17.8616C4.7241 17.7016 4.59299 17.5094 4.5045 17.2967C4.41601 17.0841 4.37203 16.8556 4.37526 16.6253V5.25026C4.25965 5.25312 4.14467 5.23231 4.03739 5.18913C3.9301 5.14595 3.83278 5.08129 3.75138 4.99914C3.66923 4.91774 3.60458 4.82042 3.56139 4.71314C3.51821 4.60585 3.49741 4.49088 3.50026 4.37526C3.49741 4.25965 3.51821 4.14468 3.56139 4.03739C3.60458 3.93011 3.66923 3.83278 3.75138 3.75139C3.83278 3.66924 3.9301 3.60458 4.03739 3.5614C4.14467 3.51821 4.25965 3.49741 4.37526 3.50026H7.87526C7.87526 3.25264 7.95926 3.04439 8.12726 2.87639C8.20846 2.79422 8.30562 2.72955 8.41277 2.68636C8.51992 2.64317 8.63477 2.62238 8.75026 2.62526H12.2503C12.3659 2.62241 12.4808 2.64321 12.5881 2.6864C12.6954 2.72958 12.7927 2.79424 12.8741 2.87639C12.9563 2.95778 13.0209 3.05511 13.0641 3.16239C13.1073 3.26968 13.1281 3.38465 13.1253 3.50026H16.6253C16.7407 3.49753 16.8555 3.51839 16.9627 3.56157C17.0698 3.60475 17.167 3.66934 17.2483 3.75139C17.4163 3.91939 17.5003 4.12764 17.5003 4.37526C17.5031 4.49095 17.4822 4.606 17.4389 4.7133C17.3955 4.8206 17.3307 4.91788 17.2483 4.99914C17.1671 5.08131 17.0699 5.14598 16.9627 5.18917C16.8556 5.23236 16.7407 5.25315 16.6253 5.25026V16.6253C16.6284 16.8555 16.5845 17.0839 16.4962 17.2965C16.4079 17.5091 16.277 17.7015 16.1116 17.8616C15.9515 18.0271 15.7592 18.158 15.5466 18.2464C15.3339 18.3347 15.1055 18.3786 14.8753 18.3753H6.12526ZM6.12526 5.25026V16.6253H14.8753V5.25026H6.12526ZM7.87526 14.0003C7.87526 14.2479 7.95926 14.4553 8.12726 14.6233C8.20832 14.7057 8.30544 14.7706 8.41261 14.8139C8.51977 14.8573 8.6347 14.8781 8.75026 14.8753C8.86595 14.8781 8.98099 14.8572 9.08829 14.8139C9.19559 14.7705 9.29287 14.7057 9.37413 14.6233C9.4563 14.5421 9.52098 14.4449 9.56417 14.3378C9.60736 14.2306 9.62815 14.1158 9.62526 14.0003V7.87526C9.62811 7.75965 9.60731 7.64468 9.56412 7.53739C9.52094 7.43011 9.45629 7.33278 9.37413 7.25139C9.29274 7.16924 9.19541 7.10458 9.08813 7.0614C8.98085 7.01822 8.86587 6.99741 8.75026 7.00026C8.63477 6.99738 8.51992 7.01817 8.41277 7.06136C8.30562 7.10455 8.20846 7.16922 8.12726 7.25139C8.04486 7.33265 7.97999 7.42993 7.93665 7.53723C7.89331 7.64453 7.87242 7.75958 7.87526 7.87526V14.0003ZM11.3753 14.0003C11.3753 14.2479 11.4593 14.4553 11.6273 14.6233C11.7083 14.7057 11.8054 14.7706 11.9126 14.8139C12.0198 14.8573 12.1347 14.8781 12.2503 14.8753C12.3659 14.8781 12.481 14.8572 12.5883 14.8139C12.6956 14.7705 12.7929 14.7057 12.8741 14.6233C12.9563 14.5421 13.021 14.4449 13.0642 14.3378C13.1074 14.2306 13.1281 14.1158 13.1253 14.0003V7.87526C13.1281 7.75965 13.1073 7.64468 13.0641 7.53739C13.0209 7.43011 12.9563 7.33278 12.8741 7.25139C12.7927 7.16924 12.6954 7.10458 12.5881 7.0614C12.4808 7.01822 12.3659 6.99741 12.2503 7.00026C12.1348 6.99738 12.0199 7.01817 11.9128 7.06136C11.8056 7.10455 11.7085 7.16922 11.6273 7.25139C11.5449 7.33265 11.48 7.42993 11.4367 7.53723C11.3933 7.64453 11.3724 7.75958 11.3753 7.87526V14.0003Z"/></svg>',
		});
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

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
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

	if ($('.advantages__items').length){
		advantagesSlider()
	}

	if ($('.filter-use_slider').length){
		filterUse()
	}

	if ($('.cooperation__wrap').length){
		cooperationSlider()
	}

	if ($('.approach__wrap').length){
		approachSlider()
	}

	if ($('.founders__item').length){
		foundersTextHeught()
	}

	if ($('.product-info__colrs-wrap').length){
		productColrsSlider()
	}

	if ($('.product-info__sizes-wrap').length){
		productSizesSlider()
	}


	if ( $(window).width() < 1320 && !$('.product-info').hasClass('mob') ) {	
		$('.product-info').removeClass('pc')
		$('.product-info').addClass('mob')

		$('.product-info__info').each(function() {
			let parent = $('.product-info__top')

			$(this).appendTo(parent)
		})

		$('.product-info__calculator').each(function() {
			let parent = $('.product-info__box')

			$(this).prependTo(parent)
		})
	}

	if ( $(window).width() > 1319 && !$('.product-info').hasClass('pc') ) {
		$('.product-info').removeClass('mob')
		$('.product-info').addClass('pc')

		$('.product-info__info').each(function() {
			let parent = $('.product-info__coll')

			$(this).prependTo(parent)
		})

		$('.product-info__calculator').each(function() {
			let parent = $('.product-info__colr')

			$(this).appendTo(parent)
		})
	}

	if ( $(window).width() < 768 && !$('.checkout-table').hasClass('mob') ) {	
		$('.checkout-table').removeClass('pc')
		$('.checkout-table').addClass('mob')

		$('.checkout-table tr').each(function() {
			let thisEl = $(this)
			$(this).find('.amount').each(function() {
				let parent = thisEl.closest('tr').find('.checkout-table__wrapabs')

				$(this).appendTo(parent)
			})
		})
	}

	if ( $(window).width() > 767 && !$('.checkout-table').hasClass('pc') ) {
		$('.checkout-table').removeClass('mob')
		$('.checkout-table').addClass('pc')

		$('.checkout-table tr').each(function() {
			let thisEl = $(this)
			$(this).find('.amount').each(function() {
				let parent = thisEl.closest('tr').find('.checkout-table__amount')

				$(this).appendTo(parent)
			})
		})
	}


	if ( $(window).width() < 768 && !$('.lk-user__item-imp').hasClass('mob') ) {	
		$('.lk-user').removeClass('pc')
		$('.lk-user').addClass('mob')

		$('.lk-user__item').each(function() {
			let thisEl = $(this)
			$(this).find('.lk-user__item-imp').each(function() {
				let parent = thisEl.find('.lk-user__item-info')

				$(this).appendTo(parent)
			})
		})
	}

	if ( $(window).width() > 767 && !$('.lk-user__item-imp').hasClass('pc') ) {
		$('.lk-user').removeClass('mob')
		$('.lk-user').addClass('pc')

		$('.lk-user__item').each(function() {
			let thisEl = $(this)
			$(this).find('.lk-user__item-imp').each(function() {
				let parent = thisEl.find('.lk-user__item-wrap')

				$(this).appendTo(parent)
			})
		})
	}
});


// 
function productsHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product')

	products.find('.product__name').height('auto')
	products.find('.product__box').height('auto')
	products.find('.product__info').height('auto')
	products.find('.product__prices').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.product__name'))
		setHeight(products.slice(start, finish).find('.product__box'))
		setHeight(products.slice(start, finish).find('.product__info'))
		setHeight(products.slice(start, finish).find('.product__prices'))

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

function filterUse(){
	if ( $(window).width() < 1024 && !$('.filter-use_slider').hasClass('swiper-initialized') ) {
		$('.filter-use_slider').addClass('swiper')
		$('.filter-use_slider .filter-use__flex').addClass('swiper-wrapper').removeClass('_flex')
		$('.filter-use_slider .filter-use__item').addClass('swiper-slide')

		filterUseSwiper = new Swiper('.filter-use_slider', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
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
	} else if ($(window).width() > 1023 && $('.filter-use_slider').hasClass('swiper-initialized')) {
		filterUseSwiper.destroy(true, true)

		$('..filter-use_slider').removeClass('swiper')
		$('.filter-use_slider .filter-use__flex').removeClass('swiper-wrapper').addClass('_flex')
		$('.filter-use_slider .filter-use__item').removeClass('swiper-slide')
	}
}


// Выравнивание в сравнении
function compareHeight() {
	$('.compare-feature__item').height('auto')

	let productFeatures = $('.compare-feature__items'),
	featuresSizes = new Object()

	productFeatures.each(function () {
		$(this).find('> *').each(function () {
			if (featuresSizes[$(this).index()]) {
				if ($(this).outerHeight() > featuresSizes[$(this).index()]) {
					featuresSizes[$(this).index()] = $(this).outerHeight()
				}
			} else {
				featuresSizes[$(this).index()] = $(this).outerHeight()
			}
		})
	})

	$.each(featuresSizes, (key, data) => {
		productFeatures.each(function () {
			$(this).find('> *:eq(' + key + ')').innerHeight(data)
		})
	})
}


function cooperationSlider(){
	if ( $(window).width() < 768 && !$('.cooperation__wrap').hasClass('swiper-initialized') ) {
		$('.cooperation__wrap').addClass('swiper')
		$('.cooperation__grid').addClass('swiper-wrapper').removeClass('_flex')
		$('.cooperation__item').addClass('swiper-slide')

		cooperationSwiper = new Swiper('.cooperation__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
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
	} else if ($(window).width() > 767 && $('.cooperation__wrap').hasClass('swiper-initialized')) {
		cooperationSwiper.destroy(true, true)

		$('.cooperation__wrap').removeClass('swiper')
		$('.cooperation__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.cooperation__item').removeClass('swiper-slide')
	}
}


function approachSlider(){
	if ( $(window).width() < 768 && !$('.approach__wrap').hasClass('swiper-initialized') ) {
		$('.approach__wrap').addClass('swiper')
		$('.approach__grid').addClass('swiper-wrapper').removeClass('_flex')
		$('.approach__item').addClass('swiper-slide')

		approachSwiper = new Swiper('.approach__wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			preloadImages: false,
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
	} else if ($(window).width() > 767 && $('.approach__wrap').hasClass('swiper-initialized')) {
		approachSwiper.destroy(true, true)

		$('.approach__wrap').removeClass('swiper')
		$('.approach__grid').removeClass('swiper-wrapper').addClass('_flex')
		$('.approach__item').removeClass('swiper-slide')
	}
}


function productColrsSlider(){
	if ( $(window).width() < 768 && !$('.product-info__colrs-wrap').hasClass('swiper-initialized') ) {
		$('.product-info__colrs-wrap').addClass('swiper')
		$('.product-info__colrs-flex').addClass('swiper-wrapper').removeClass('_flex')
		$('.product-info__color').addClass('swiper-slide')

		productColrsSwiper = new Swiper('.product-info__colrs-wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
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
	} else if ($(window).width() > 767 && $('.product-info__colrs-wrap').hasClass('swiper-initialized')) {
		productColrsSwiper.destroy(true, true)

		$('.product-info__colrs-wrap').removeClass('swiper')
		$('.product-info__colrs-flex').removeClass('swiper-wrapper').addClass('_flex')
		$('.product-info__color').removeClass('swiper-slide')
	}
}

function productSizesSlider(){
	if ( $(window).width() < 768 && !$('.product-info__sizes-wrap').hasClass('swiper-initialized') ) {
		$('.product-info__colrs-wrap').addClass('swiper')
		$('.product-info__sizes-flex').addClass('swiper-wrapper').removeClass('_flex')
		$('.product-info__size').addClass('swiper-slide')

		productSizesSwiper = new Swiper('.product-info__sizes-wrap', {
			loop: false,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
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
	} else if ($(window).width() > 767 && $('.product-info__sizes-wrap').hasClass('swiper-initialized')) {
		productSizesSwiper.destroy(true, true)

		$('.product-info__sizes-wrap').removeClass('swiper')
		$('.product-info__sizes-flex').removeClass('swiper-wrapper').addClass('_flex')
		$('.product-info__size').removeClass('swiper-slide')
	}
}


function foundersTextHeught(){
	$('.founders__item').each(function(){
		if ( !$(this).find('.founders__item-wrap').hasClass('_big') ) {
			let heightFounders = $(this).find('.founders__item-wrap').height()
			let heightText = $(this).find('.founders__item-wrap .text-block').height()

			if ( heightFounders < heightText ) {
				$(this).find('.founders__item-wrap').addClass('_big')
			}
		}
	})
}