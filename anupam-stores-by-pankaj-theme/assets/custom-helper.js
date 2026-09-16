window.CustomHelper = window.CustomHelper || {};

CustomHelper.resizeImage = function(e, n) {
    if(null==n)return e;
    if("master"==n)return e.replace(/http(s)?:/,"");
    
    var t=e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif|webp)(\?v=\d+)?/i);
    if(null!=t){
        var r=e.split(t[0]),o=t[0];
        return(r[0]+"_"+n+o).replace(/http(s)?:/,"");
    }
    return null;
};

/** Js to override the default functionality for primary navigation menu */
jQuery(document).ready(function($) {

  function initMobileMenuFix() {
    if (window.innerWidth <= 991) {
      
      var $trigger = $('.mobile-nav__sublist-trigger').not('.header_3 .secondary-nav .mobile-nav__sublist-trigger');

      // 1. WIPE THE SLATE CLEAN: Offload any existing touch/click events from the theme
      $trigger.off('click touchstart mouseenter mouseleave');

      // 2. BIND ONLY OUR WORKING LOGIC
      $trigger.on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Stops the buggy theme script from hearing this touch

        var $currentTrigger = $(this);
        var $parentLi = $currentTrigger.closest('li.tt_mm_hassub');
        var $subMenu = $parentLi.find('> .tt_sub_menu_wrap');

        if ($subMenu.is(':visible')) {
          $subMenu.slideUp(250);
          $parentLi.removeClass('menu-active-open');
          $currentTrigger.removeClass('is-active');
        } else {
          // Force container width layout for mobile
          $subMenu.slideDown(250).css('width', '100%'); 
          $parentLi.addClass('menu-active-open');
          $currentTrigger.addClass('is-active');
        }
      });

      // 3. Fix the main text links as well so they don't break the toggle
      $('li.tt_mm_hassub > a[href="#"]').not('.header_3 .secondary-nav a').off('click touchstart').on('click touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).siblings('.mobile-nav__sublist-trigger').trigger('click');
      });

    }
  }

  // Run on page load
  initMobileMenuFix();

  // Run if the window is resized or orientation changes
  $(window).on('resize orientationchange', function() {
    initMobileMenuFix();
  });
});

document.addEventListener('click', function(e) {
  if (e.target.closest('.header_3 .secondary-nav')) return;
  const target = e.target.closest('.tt_menu_item > a');
  
  if (target && window.innerWidth < 750) {
    const parentLi = target.closest('.tt_menu_item');
    const subMenu = parentLi.querySelector('.tt_sub_menu_wrap');
    
    if (subMenu) {
      e.preventDefault();
      e.stopPropagation();
      subMenu.classList.toggle('is-active');
    }
  }
}, true);