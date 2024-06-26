"use strict";

Shopify.theme.jsHeader = {
  init: function init($section) {
    var _this = this;

    // Add settings from schema to current object
    Shopify.theme.jsHeader = $.extend(this, Shopify.theme.getSectionData($section)); // Selectors

    this.$el = $('#header');
    this.$menuToggle = this.$el.find('.header__menu-toggle');
    var announcementHeight = $('.announcement-sticky-wrapper').height(); // Overlaid header

    if (this.enable_overlay === true && isScreenSizeLarge()) {
      this.updateOverlayStyle(this.sectionUnderlayIsImage());
    } // Sticky header


    if (this.enable_sticky === true && isScreenSizeLarge()) {
      this.enableSticky(announcementHeight);
    }

    if (this.header_layout == 'centered' || this.header_layout == 'search_focus') {
      this.$menuToggle.on('click', function () {
        _this.showStickyMenu();
      });
    } else if (this.header_layout == 'vertical') {
      $section.find('.header-sticky-wrapper').stick_in_parent();

      if (Shopify.theme_settings.announcement_enabled == true) {
        Shopify.theme.jsAnnouncementBar.addVerticalHeaderTopMargin();
      }

      this.addOffScreenDropdownCheck();
    }

    if ($('.mega-menu').length > 0) {
      Shopify.theme.jsMegaMenu.init($section);
    }

    if (!isScreenSizeLarge()) {
      this.unload();
      Shopify.theme.mobileMenu.init();
    }

    $('.search-overlay__close').on('click', function () {
      Shopify.theme.jsHeader.hideSearch();
    });
    $(document).on('click', '[data-show-search-trigger]', function () {
      Shopify.theme.jsHeader.showSearch();
    });

    if (isScreenSizeLarge() || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $('.dropdown-click--true .header__link:not(.primary-brand, .primary-logo)').on('click touchstart', function (e) {
        var $this = $(this);
        Shopify.theme.jsHeader.toggleMenuClick(e, $this);
      });
    }

    if (this.dropdown_click === false) {
      $('.navbar-item').on('mouseleave', function () {
        Shopify.theme.jsHeader.collapseSubmenu($(this));
      });
    }

    $(document).on('keydown', '[data-show-search-trigger]', function (e) {
      if (e.which === 13) {
        Shopify.theme.jsHeader.showSearch();
      }
    });
  },
  toggleMenuClick: function toggleMenuClick(e, $this) {
    var $parentWrap = $this.parents('.has-dropdown, .has-mega-menu');

    if (!$parentWrap.hasClass('is-opened') && $parentWrap.length > 0) {
      // Prevent link on first click
      e.preventDefault(); // Close all dropdowns & mega menu

      $('.has-dropdown, .has-mega-menu').removeClass('is-opened');
      $('.mega-menu__section').removeClass('is-active'); // Open selected dropdown/mega menu

      $parentWrap.addClass('is-opened');
      $parentWrap.data('clicked', 'true');
    } else {
      // Close all dropdowns & mega menu
      $('.has-dropdown, .has-mega-menu').removeClass('is-opened');
      $('.mega-menu__section').removeClass('is-active');
    } // Close dropdown if click anywhere outside dropdown menu


    $(window).on('click', function (e) {
      if ($(e.target).closest('.header__link, .navbar-dropdown').length === 0) {
        $('.has-dropdown, .has-mega-menu').removeClass('is-opened');
        $('.mega-menu__section').removeClass('is-active');
        Shopify.theme.jsHeader.collapseSubmenu($('.navbar-item'));
      }
    });
  },
  collapseSubmenu: function collapseSubmenu(el) {
    $(el).find('.has-submenu input').prop("checked", false);
  },
  showStickyMenu: function showStickyMenu() {
    this.$menuToggle.toggleClass('is-active');
    this.$el.find('.sticky-menu-wrapper').toggleClass('is-visible');
  },
  hideStickyMenu: function hideStickyMenu() {
    this.$menuToggle.removeClass('is-active');
    this.$el.find('.sticky-menu-wrapper').removeClass('is-visible');
  },
  disableSticky: function disableSticky() {
    var $stickyEl = $('#header');
    $stickyEl.unstick();
    $stickyEl.removeClass('sticky--enabled');
    setTimeout(function () {
      $stickyEl.css('height', 'auto');
    }, 250);
  },
  enableSticky: function enableSticky(offset) {
    var _this2 = this;

    var $stickyEl = this.$el;
    $stickyEl.addClass('sticky--enabled');
    $stickyEl.sticky({
      wrapperClassName: 'header-sticky-wrapper',
      zIndex: 40,
      topSpacing: offset || 0
    }).on('sticky-start', function () {
      var headerHeight;
      var announcementHeight; // Hide the mini cart for centered header layout

      if (Shopify.theme_settings.header_layout == 'centered') {
        $('[data-ajax-cart-trigger]').removeClass('show-mini-cart');
      } // Get header height is sticky enabled


      if (Shopify.theme.jsHeader.enable_sticky == true && Shopify.theme_settings.header_layout != 'vertical') {
        headerHeight = Shopify.theme.jsHeader.getHeaderHeight();
      } // Get announcement height is sticky enabled


      if (typeof Shopify.theme.jsAnnouncementBar !== 'undefined' && Shopify.theme.jsAnnouncementBar.enable_sticky == true && Shopify.theme_settings.header_layout != 'vertical') {
        announcementHeight = Shopify.theme.jsAnnouncementBar.getAnnouncementHeight();
      } else {
        announcementHeight = 0;
      }

      var totalHeight = headerHeight + announcementHeight;
      $stickyEl.parent().parent().find('.search-overlay').addClass('sticky-search').css('top', totalHeight + 'px');

      if (_this2.enable_overlay === true && _this2.sectionUnderlayIsImage() === true) {
        $stickyEl.parent().addClass('has-overlaid-header');

        _this2.disableOverlayStyle();
      } else if (_this2.enable_overlay === true) {
        _this2.disableOverlayStyle();
      }
    }).on('sticky-end', function () {
      $stickyEl.parent().parent().find('.search-overlay').removeClass('sticky-search').css('top', '100%'); // Safety timeout for logo width transition which can throw calculated height off

      setTimeout(function () {
        $stickyEl.sticky('update');
      }, 250);

      _this2.$el.find('.sticky-menu-wrapper').removeClass('is-visible');

      _this2.$menuToggle.removeClass('is-active');

      if (_this2.enable_overlay === true && _this2.sectionUnderlayIsImage() === true) {
        _this2.updateOverlayStyle(_this2.sectionUnderlayIsImage());
      }
    });
  },
  disableOverlayStyle: function disableOverlayStyle() {
    $('[data-enable_overlay]').attr('data-enable_overlay', false);
  },
  enableOverlayStyle: function enableOverlayStyle() {
    $('[data-enable_overlay]').attr('data-enable_overlay', true);
  },
  updateOverlayStyle: function updateOverlayStyle(overlayBoolean) {
    $('[data-enable_overlay]').attr('data-enable_overlay', overlayBoolean);
  },
  sectionUnderlayIsImage: function sectionUnderlayIsImage() {
    var $firstSection = $('[data-check-for-order=true]').find('[id^=shopify-section]').first(); // Check whether the first element has class to indicate it should be under header when overlay is enabled

    if ($firstSection.hasClass('overlaid-header-option') && $.trim($firstSection.html()).length > 0) {
      return true;
    } else {
      return false;
    }
  },
  showSearch: function showSearch() {
    $('[data-show-search-trigger]').addClass('is-active');

    if (Shopify.theme_settings.search_layout == 'overlay') {
      $('[data-search-type="' + Shopify.theme_settings.search_layout + '"]').toggleClass('is-opened');
      $('.search-form .search__fields input[type="text"]').focus();
    } else {
      $.fancybox.open($('.js-search-popup'), {
        baseClass: 'search__lightbox',
        hash: false,
        infobar: false,
        toolbar: false,
        loop: true,
        smallBtn: true,
        mobile: {
          preventCaptionOverlap: false,
          toolbar: false
        },
        beforeClose: function beforeClose() {
          $('[data-show-search-trigger]').removeClass('is-active');
        }
      });
    }
  },
  hideSearch: function hideSearch() {
    $('[data-show-search-trigger]').removeClass('is-active');

    if (Shopify.theme_settings.search_layout == 'overlay') {
      $('[data-search-type="' + Shopify.theme_settings.search_layout + '"]').removeClass('is-opened');
    } else {
      $.fancybox.close($('[data-search-type="' + Shopify.theme_settings.search_layout + '"]'));
    }
  },
  addOffScreenDropdownCheck: function addOffScreenDropdownCheck() {
    $('.navbar-item.has-dropdown--vertical').hover(function () {
      var dropdown = $(this),
          menu = dropdown.find('.navbar-dropdown');
      menu.removeClass('navbar-dropdown--fix-offscreen');

      if (menu.is(':off-screen')) {
        menu.addClass('navbar-dropdown--fix-offscreen');
      }
    });
  },
  getHeaderHeight: function getHeaderHeight() {
    var headerHeight = $('.header-section').outerHeight() || 0;
    return headerHeight;
  },
  unload: function unload($section) {
    $('.has-overlaid-header').removeClass('has-overlaid-header');
    $('.search-overlay__close, [data-show-search-trigger]').off();
    $('.navbar-item').off();
    $('#header').off();
    $('.dropdown-click--true .header__link').off();
    this.$menuToggle.off();
    this.disableSticky();
    this.disableOverlayStyle();
    $(document).on('click', '[data-show-search-trigger]', function () {
      this.off();
    });
  }
};