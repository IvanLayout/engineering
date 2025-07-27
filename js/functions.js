$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))
	

	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Мини всплывающие окна
	$('.mini-modal__btn').click(function (e) {
		e.preventDefault()

		const parent = $(this).closest('.mini-modal')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.mini-modal__modal').removeClass('_active')

			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini-modal__btn').removeClass('_active')
			$(this).addClass('_active')

			$('.mini-modal__modal').removeClass('_active')
			parent.find('.mini-modal__modal').addClass('_active')

			if( $(this).hasClass('mini-modal__btn_look') ) {
				$('body').addClass('_lock-mini')
			}

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click((e) => {
		if ( !e.target.closest('.mini-modal') ) {
			$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
			$('body').removeClass('_lock-mini')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}

		if ( !e.target.closest('.header-catalog') && !e.target.closest('.header-catalog__open') ) {
			$('.header-catalog__open').removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		}

		if ( !e.target.closest('.header__list') && !e.target.closest('.header__list-more') ) {
			$('.header__list-more').removeClass('_active')
			$('.header__list-box').removeClass('_show')
		}
	})

	$('body').on('click', '.mini-overlay, [data-mini-close]', function(e) {
		e.preventDefault()

		$('.mini-modal__modal, .mini-modal__btn').removeClass('_active')
		$('body').removeClass('_lock-mini')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top }, 1000)
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs__button_js', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('_active') ) {
			let parent = $(this).closest('.tabs-container')
			let activeTab = $(this).data('content')
			let level = $(this).data('level')

			parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
			parent.find('.tab-content.' + level).removeClass('_active')

			$(this).addClass('_active')
			$(activeTab).addClass('_active')
		}
	})

	if( locationHash && $('.tabs-container').length ) {
		let activeTab = $('.tabs__button_js[data-content="'+ locationHash +'"]')
		let parent = activeTab.closest('.tabs-container')
		let level = activeTab.data('level')

		parent.find('.tabs:first').find('.tabs__button_js').removeClass('_active')
		parent.find('.tab-content.' + level).removeClass('_active')

		activeTab.addClass('_active')
		$(locationHash).addClass('_active')

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top - 120
		}, 1000)
	}


	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	// Кастомный select
	$('select').niceSelect()


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false

	Fancybox.defaults.template = {
		closeButton: '<svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L16 16" stroke-linecap="round"/><path d="M16 1L1 16" stroke-linecap="round"/></svg>',
	}

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}],
		{
			on: {
				init: (fancyboxRef) => {
					if ( $(this).attr('data-modal-big') ) {
						$('body').addClass('_big-modal')
					}
				},
				destroy: (fancyboxRef) => {
					if ( $(this).attr('data-modal-big') ) {
						$('body').removeClass('_big-modal')
					}
				},
			},
		})
	})

	$('body').on('click', '.modal-close', function (e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Выбор файла
	$('.file-selection input[type=file]').change(function(){
		var val = $(this).val()

		var parent = $(this).closest('.file-selection')

		parent.find('.file-selection__path-name').text(val)

		parent.find('.file-selection__path').addClass('_active')

		if(parent.find('.file-selection__path-name').text() == '') {
			let defoultText = parent.find('.file-selection__path-name').data('text')
			
			parent.find('.file-selection__path-name').html(defoultText)

			parent.find('.file-selection__path').removeClass('_active')
		}
	})


	$('body').on('click', '.radio__choice', function () {
		if ($(this).attr('id') === 'legal-entity') {
			$(this).closest('.form').addClass('_legal-entity')
		} else {
			$(this).closest('.form').removeClass('_legal-entity')
		}
	})


	$('body').on('click', '.accordion__open', function (e) {
		e.preventDefault()

		if ($(this).closest('.accordion__item').hasClass('_active')) {
			$(this).closest('.accordion__item').removeClass('_active')
		} else {
			$(this).closest('.accordion__item').addClass('_active')
		}
	})

	$('body').on('click', '.open-filter', function (e) {
		e.preventDefault()

		if ($('.filter').hasClass('_show')) {
			$('.filter').removeClass('_show')
		} else {
			$('.filter').addClass('_show')
		}
	})

	$('body').on('click', '.footer-menu__title-arrow', function (e) {
		e.preventDefault()

		if ($(this).closest('.footer-menu__title').hasClass('_active')) {
			$(this).closest('.footer-menu__title').removeClass('_active')
			$(this).closest('.footer-menu__col').find('.footer-menu__list').removeClass('_show')
		} else {
			$(this).closest('.footer-menu__title').addClass('_active')
			$(this).closest('.footer-menu__col').find('.footer-menu__list').addClass('_show')
		}
	})

	$('body').on('click', '.header__list-more', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.header__list-box').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$('.header__list-box').addClass('_show')
		}
	})

	$('body').on('click', '.header-catalog__open', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			$('.header-catalog__block').removeClass('_show')
			$('.overlay-catalog').removeClass('_show')
		} else {
			$(this).addClass('_active')
			$('.header-catalog__block').addClass('_show')
			$('.overlay-catalog').addClass('_show')
		}
	})

	$('body').on('click', '.header-submenu__sub-item a._sub', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
		} else {
			$(this).addClass('_active')
		}
	})

	$('body').on('click', '.header-submenu__sub-more', function (e) {
		e.preventDefault()

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')

			$(this).closest('.header-submenu__sub').find('._hide').removeClass('_show')
		} else {
			$(this).addClass('_active')

			$(this).closest('.header-submenu__sub').find('._hide').addClass('_show')
		}
	})
	

	// Наведение на пункты меню
	if ( $(window).width() > 1023 ) {
		$('body').on('mouseover', '.header-menu__item', function (e) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.header-menu').find('.header-menu__item').removeClass('_active-pc')
	
				$(this).addClass('_active-pc')
			}
		})
	} else if ( $(window).width() < 1024 && $(window).width() > 767 ) {
		$('body').on('click', '.header-menu__link._sub', function (e) {
			e.preventDefault()
	
			if (!$(this).closest('.header-menu__item').hasClass('_active-pc')) {
				$(this).closest('.header-menu').find('.header-menu__item').removeClass('_active-pc')
	
				$(this).closest('.header-menu__item').addClass('_active-pc')
			}
		})
	}

	if ( $(window).width() < 768 ) {
		$('body').on('click', '.header-menu__link._sub', function (e) {
			e.preventDefault()

			let titleCatalog = $(this).find('.header-menu__link-name').text()
			$('.catalog-head__title').text(titleCatalog).data('title-second' , titleCatalog)

			$(this).next('.header-submenu').addClass('_show')

			$('.header__info, .catalog-head__back').addClass('_second')
		})

		$('body').on('click', '.header-submenu__link._sub', function (e) {
			e.preventDefault()

			let titleCatalog2 = $(this).find('.header-submenu__link-name').text()

			$('.catalog-head__title').text(titleCatalog2)

			$(this).next('.header-submenu__sub').addClass('_show')

			$('.header__info, .catalog-head__back').addClass('_third')
		})
	}

	$('body').on('click', '.open-catalog-mob', function (e) {
		e.preventDefault()

		$('.open-catalog-mob').addClass('_active')
		$('.header').addClass('_show')
		$('body').addClass('_menu-open')
	})

	$('body').on('click', '.catalog-head__close', function (e) {
		e.preventDefault()

		$('.open-catalog-mob').removeClass('_active')
		$('.header').removeClass('_show')
		$('body').removeClass('_menu-open')
	})

	$('body').on('click', '.catalog-head__back', function (e) {
		e.preventDefault()

		if($(this).hasClass('_third')) {
			let titleCatalog2 = $('.catalog-head__title').data('title-second')
			$('.catalog-head__title').text(titleCatalog2)

			$('.header-submenu__sub').removeClass('_show')
			$('.header__info, .catalog-head__back').removeClass('_third')
		} else if ($(this).hasClass('_second')) {
			let titleCatalog = $('.catalog-head__title').data('title')
			$('.catalog-head__title').text(titleCatalog)

			$('.header-submenu').removeClass('_show')
			$('.header__info, .catalog-head__back').removeClass('_second')
		} else {
			$('.open-catalog-mob').removeClass('_active')
			$('.header').removeClass('_show')
			$('body').removeClass('_menu-open')
		}
	})


	$('body').on('click', '.open-user-info', function (e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ) {
			$(this).removeClass('_active') 

			$('.user-info').removeClass('_show')
			$('body').removeClass('_lock')
		} else{
			$(this).addClass('_active') 

			$('.user-info').addClass('_show')
			$('body').addClass('_lock')
		}
	})


	$('body').on('click', '.user-info__links-link._sub', function (e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ) {
			$(this).removeClass('_active') 

			$(this).next().removeClass('_show')
		} else{
			$(this).addClass('_active') 

			$(this).next().addClass('_show')
		}
	})


	$('body').on('focus', '.header-mob__search-input', function(e) {
		e.preventDefault()

		$('.header-mob__search').addClass('_show')

		$('body').addClass('_lock')
	})

	$('body').on('click', '.header-mob__search-close', function(e) {
		e.preventDefault()

		$('#header-mob__search-input').val('')

		$('.header-mob__search').removeClass('_show')

		$('body').removeClass('_lock')
	})


	$('body').on('click', '.product__btn', function (e) {
		e.preventDefault()
		
		$(this).closest('.product__bot').addClass('_hide')
		$(this).closest('.product').find('.product__added').addClass('_show')
	})

	$('body').on('click', '.product-global-buy', function (e) {
		e.preventDefault()
		
		$('.product-global-btns').addClass('_hide')
		$('.product-global-added').addClass('_show')
	})

	$('body').on('click', '.filter-open', function (e) {
		e.preventDefault()

		$('.aside-filter').addClass('_show')

		$('body').addClass('_filter-open-mob')
	})

	$('body').on('click', '.filter-head', function (e) {
		e.preventDefault()

		$('.aside-filter').removeClass('_show')

		$('body').removeClass('_filter-open-mob')
	})

	$('body').on('click', '.filter__title', function (e) {
		e.preventDefault()

		if ( $(this).closest('.filter__item').hasClass('_active') ) {
			$(this).closest('.filter__item').removeClass('_active') 
		} else{
			$(this).closest('.filter__item').addClass('_active') 
		}
	})


	$('body').on('click', '.categories-small__more', function (e) {
		e.preventDefault()

		$(this).closest('.categories-small').find('.categories-small__item').addClass('_show')
		$(this).hide()
	})


	$('.filter input:not(.filter__search-input)').change(function() {
		const $input = $(this);
		let heigh = $input.height()
		let inputOffsetTop = 0;
		if ( $input.attr('type') === 'checkbox' || $input.attr('type') === 'radio' ) {
			inputOffsetTop = $input.closest('label').offset().top;

			heigh = $input.closest('label').height()
		} else {
			inputOffsetTop = $input.offset().top;
		}
		
		const containerOffsetTop = $input.closest('.filter').offset().top;

		const relativeOffset = inputOffsetTop - containerOffsetTop;

		if( !$('.filter-filter').hasClass('_show') ){
			$('.filter-filter').addClass('_show')
		}

		$('.filter-filter').css('top', relativeOffset + heigh/2)
	})

	$('body').on('click', '.filter__all', function (e) {
		e.preventDefault()

		$('.filter-big').addClass('_show')

		$('body').addClass('_filter-open')
	})

	$('body').on('click', '.filter-big__overlay, .filter-big__close', function (e) {
		e.preventDefault()

		$('.filter-big').removeClass('_show')

		$('body').removeClass('_filter-open')
	})

	$('body').on('click', '.news-text__cats-more', function (e) {
		e.preventDefault()

		$(this).hide()

		$(this).closest('.news-text__cats').find('.news-text__cats-link').addClass('_show')
	})

	$('body').on('click', '.news-small__more', function (e) {
		e.preventDefault()

		$(this).hide()

		$(this).closest('.news-small').find('.news-small__item').addClass('_show')
	})


	$('.form__input-anim').each(function(){
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})

	$('.form__input-anim').change(function() {
		let value = $(this).val()

		if ( value != '' ) {
			$(this).closest('.form__field').addClass('_full')
		} else {
			$(this).closest('.form__field').removeClass('_full')
		}
	})

	$('#header__search-input').keydown(function() {
		setTimeout(() => {
			let value = $(this).val()

			if ( value != '' ) {
				$(this).closest('.header__search-field').addClass('_full')
			} else {
				$(this).closest('.header__search-field').removeClass('_full')
			}
		})
	})

	$('.header__search-clear').click(function(e) {
		e.preventDefault()

		$('#header__search-input').val('')

		$(this).closest('.header__search-field').removeClass('_full')
	})

	$('#form-promo__input').keydown(function() {
		setTimeout(() => {
			let value = $(this).val()

			if ( value != '' ) {
				$(this).closest('.form-promo__flex').addClass('_full')
			} else {
				$(this).closest('.form-promo__flex').removeClass('_full')
			}
		})
	})

	$('.form-promo__clear').click(function(e) {
		e.preventDefault()

		$('#form-promo__input').val('')

		$(this).closest('.form-promo__flex').removeClass('_full')
	})

	$('.filter__item-clear').click(function(e) {
		e.preventDefault()

		const $filterItem = $(this).closest('.filter__item');

		$filterItem.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);

		$filterItem.find('._clear').removeClass('_clear')
	})

	$('.filter__data').each(function(){
		if ($(this).find('input[type="checkbox"]:checked, input[type="radio"]:checked').length > 0) {
			$(this).addClass('_clear');
		  } else {
			$(this).removeClass('_clear');
		  }
	})

	$('.checkbox__label, .checkbox-btn__label').click(function(){
		if ($(this).closest('.filter__data').find('input[type="checkbox"]:checked').length > 0) {
			$(this).closest('.filter__data').addClass('_clear');
		} else {
			$(this).closest('.filter__data').removeClass('_clear');
		}
	})

	$('.radio__label').click(function(){
		if ($(this).closest('.filter__data').find('input[type="radio"]:checked').length > 0) {
			$(this).closest('.filter__data').addClass('_clear');
		} else {
			$(this).closest('.filter__data').removeClass('_clear');
		}
	})

	$('.filter__item-more').click(function(e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ) {
			$(this).removeClass('_active')

			$(this).closest('.filter__data').removeClass('_all')
		} else {
			$(this).addClass('_active')

			$(this).closest('.filter__data').addClass('_all')
		}
	})

	$('.filter__data').each(function(){
		if ( $(this).find('.checkbox').length > 4 ) {
			$(this).find('.filter__item-more').addClass('_show')
		}
	})


	$('body').on('click', '.calculator-open', function (e) {
		e.preventDefault()

		$('.product-info__calculator').addClass('_active')
		$('body').addClass('_lock-calculator')
	})

	$('body').on('click', '.product-info__calculator-close', function (e) {
		e.preventDefault()

		$('.product-info__calculator').removeClass('_active')
		$('body').removeClass('_lock-calculator')
	})

	$('body').on('click', '.product-info__calculator', function (e) {
		if ( $(e.target).hasClass('product-info__calculator') ) {
			$('.product-info__calculator').removeClass('_active')
			$('body').removeClass('_lock-calculator')
		}
	})


	$('body').on('click', '.all-add', function (e) {
		e.preventDefault()

		$('.modal-service').addClass('_active')
		$('body').addClass('_lock-add')
	})

	$('body').on('click', '.modal-service__close', function (e) {
		e.preventDefault()

		$('.modal-service').removeClass('_active')
		$('body').removeClass('_lock-add')
	})

	$('body').on('click', '.modal-service', function (e) {
		if ( $(e.target).hasClass('modal-service') ) {
			$('.modal-service').removeClass('_active')
			$('body').removeClass('_lock-add')
		}
	})
	
	$('body').on('click', '.modal-service__product-boy', function (e) {
		e.preventDefault()

		$(this).addClass('_active')
		$(this).closest('.modal-service__product').find('.modal-service__product-added').addClass('_show')
	})

	if ( $('.product-recommends__add').hasClass('_active') ) {
		$('.modal-service__product-boy').prop("disabled", false)
	}

	$('body').on('click', '.product-recommends__add', function (e) {
		e.preventDefault()

		$(this).closest('.modal-service').find('.modal-service__product-boy').prop("disabled", false)

		$(this).addClass('_active')
		$(this).closest('.product-recommends__item').find('.product-recommends__check').addClass('_show')
	})


	$('body').on('click', '.open-info', function (e) {
		e.preventDefault()

		let modal = $(this).data('content')
		$(modal).addClass('_active')
		$('body').addClass('_lock-info')
	})

	$('body').on('click', '.modal-information__close, .modal-information__hide', function (e) {
		e.preventDefault()

		$('.modal-information').removeClass('_active')
		$('body').removeClass('_lock-info')
	})

	$('body').on('click', '.product-info__recommend-box .product-info__buy', function (e) {
		e.preventDefault()

		$(this).closest('.product-info__sales-bot').addClass('_hide')
		$(this).closest('.product-info__recommend-box').find('.product-info__added').addClass('_show')
	})
	

	$('body').on('click', '.checkout-table__about-open', function (e) {
		e.preventDefault()

		if ( $(this).closest('.checkout-table__about').hasClass('_active') ) {
			$(this).closest('.checkout-table__about').removeClass('_active')
		} else {
			$(this).closest('.checkout-table__about').addClass('_active')
		}
	})


	$('body').on('click', '.checkout-open-modal_js', function (e) {
		e.preventDefault()

		let modal = $(this).data('content')
		$(modal).addClass('_active')
		$('body').addClass('_lock-checkout')
	})

	$('body').on('click', '.checkout-modal__close', function (e) {
		e.preventDefault()

		$('.checkout-modal').removeClass('_active')
		$('body').removeClass('_lock-checkout')
	})

	$('body').on('click', '.checkout-modal', function (e) {
		if ( $(e.target).hasClass('checkout-modal') ) {
			$('.checkout-modal').removeClass('_active')
			$('body').removeClass('_lock-checkout')
		}
	})
	

	$('body').on('click', '.checkout-table__open', function (e) {
		e.preventDefault()

		if ( $(this).closest('.checkout-table').hasClass('_active') ) {
			$(this).closest('.checkout-table').removeClass('_active')
		} else {
			$(this).closest('.checkout-table').addClass('_active')
		}
	})


	$('body').on('click', '.radio-delivery__label_js', function (e) {
		$('.checkout-modal__item').removeClass('_show')
		$('.delivery-btn').removeClass('_show')

		let deliveryItem = $(this).data('delivery')
		$(deliveryItem).addClass('_show')

		let deliveryBtn = $(this).data('delivery-btn')
		$(deliveryBtn).addClass('_show')
	})


	$('body').on('change', '.checkbox-slider__label_recipient input[type="checkbox"]', function () {
		const checkbox = $(this)
		const recipientContainer = checkbox.closest('.checkout-recipient')
		const inputField = recipientContainer.find('.checkout-recipient__input')

		inputField.prop("disabled", !checkbox.is(':checked'))
	})


	$('body').on('click', '.modal-js', function (e) {
		e.preventDefault()

		let modal = $(this).data('content')
		$(modal).addClass('_active')
		$('body').addClass('_lock-modal')
	})

	$('body').on('click', '.modal-point__close', function (e) {
		e.preventDefault()

		$('.modal-point').removeClass('_active')
		$('body').removeClass('_lock-modal')
	})

	$('body').on('click', '.modal-point', function (e) {
		if ( $(e.target).hasClass('modal-point') ) {
			$('.modal-point').removeClass('_active')
			$('body').removeClass('_lock-modal')
		}
	})

	$('body').on('change', '.radio-dot__label input[type="radio"]', function () {
		const radio = $(this)

		$(this).closest('.transport-company').find('._show').removeClass('_show')

		let transportAdres = $(this).closest('.radio-dot__label').data('content')
		if (transportAdres && $(transportAdres).length > 0) {
			$(transportAdres).addClass('_show')
		}

		if (radio.is(':checked') && $(this).closest('tr').find('.transport-company__btn').length > 0 ){
			$(this).closest('tr').find('.transport-company__btn').addClass('_show')
		}
	})

	$('body').on('click', '.lk-info__info-more', function (e) {
		e.preventDefault()

		$(this).closest('.lk-info__info').addClass('_show')
	})

	$('body').on('click', '.confirm-box__btn', function (e) {
		e.preventDefault()

		$(this).closest('.confirm-box').addClass('_show')
	})

	$('body').on('click', '.lk-user__item-edit', function (e) {
		e.preventDefault()

		$(this).closest('.lk-user__item').addClass('_show')
	})

	$('body').on('click', '.lk-user__form-cancel', function (e) {
		e.preventDefault()

		$(this).closest('.lk-user__item').removeClass('_show')
	})

	$('body').on('click', '.password-eye', function (e) {
		e.preventDefault()

		const input = $(this).closest('.form__field').find('.form__input-password')

		if ($(this).hasClass('_active')) {
			$(this).removeClass('_active')
			input.attr('type', 'password')
		} else {
			$(this).addClass('_active')
			input.attr('type', 'text')
		}
	})


	$('body').on('click', '.lk-user__password-btn', function (e) {
		e.preventDefault()

		$(this).closest('.lk-user__password').addClass('_show')
	})

	$('body').on('click', '.form-password__cancel', function (e) {
		e.preventDefault()

		$(this).closest('.lk-user__password').removeClass('_show')
	})


	$('body').on('click', '.my-comment__answer-open', function (e) {
		e.preventDefault()

		if ( $(this).closest('.my-comment__answer').hasClass('_show') ) {
			$(this).closest('.my-comment__answer').removeClass('_show')
		} else {
			$(this).closest('.my-comment__answer').addClass('_show')
		}
	})
})


$(window).on('load', () => {
	adjustMenu()

	if ( $('.product-fixed').length ) {
		if( $(window).scrollTop() > $('.product-info').offset().top + $('.product-info').height() ) {
			$('.product-fixed').addClass('_show')
		} else {
			$('.product-fixed').removeClass('_show')
		}
	}

	$(window).on('scroll', () => {
		if ( $('.product-fixed').length ) {
			if( $(window).scrollTop() > $('.product-info').offset().top + $('.product-info').height() ) {
				$('.product-fixed').addClass('_show')
			} else {
				$('.product-fixed').removeClass('_show')
			}
		}
	})
})


$(window).on('resize', adjustMenu);


// Вспомогательные функции
const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY = 'scroll'
	div.style.width = '50px'
	div.style.height = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}

function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

function adjustMenu() {
	const $menu = $('.header__list');
	const $items = $menu.children('.header__list-item');
	const $moreButton = $menu.find('.header__list-more');
	const $moreMenu = $menu.find('.header__list-box');

	$items.show();
	$moreMenu.empty();
	$moreButton.removeClass('_show');
	$moreMenu.removeClass('_show');

	let availableWidth = $menu.width();
	let usedWidth = 0;
	let moved = false;

	$items.each(function () {
		const $this = $(this);
		usedWidth += $this.outerWidth(true);

		if (Math.floor(usedWidth) > Math.floor(availableWidth)) {
			$this.hide();
			$moreMenu.append($this.clone().show());
			moved = true;
		}
	});

	if (moved) {
		$moreButton.addClass('_show');
	}
}

const is_touch_device = () => !!('ontouchstart' in window)