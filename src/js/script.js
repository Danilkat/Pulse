$(document).ready(function(){
    $('.carousel__inner').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/leftArrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/rightArrow.png"></button>',
        appendDots: '.carousel__tabs',
        responsive: [
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              infinite: true,
              dots: true
            }
          }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      const tab = $(this);
      $('.catalog__wrapper').fadeOut('slow', () => executeTabChange(tab, () => {
        $('.catalog__wrapper').fadeIn('slow')
      }))
    });

    function executeTabChange(form, callback) {
      form
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
        .eq(form.index()).addClass('catalog__content_active');
        callback();
    }


    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal

    
    function closeModal() {
      $('.overlay, #consultation, #thanks, #order').fadeOut();
    }

    $(document).keyup((e) =>
      (e.key === "Escape") ? closeModal() : '');


    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn();
    })
    $('.modal__close, .overlay').on('click', closeModal);

    




    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })
    })


    // forms validation
    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        }
      });
    };

    validateForms('#order form');
    validateForms('#consultation form');
    validateForms('#consultation-form');
    
    $('input[name=phone]').mask('9 (999) 999-9999');

    $('form').submit(function(e) {
      e.preventDefault();
      if ($(this).valid()) {
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
      });
      return false;
    }
    })

    //smooth scroll and pageup

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    })



    $("a[href='#up'], a[href='#catalog']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });


    //animation
    new WOW().init();
  });