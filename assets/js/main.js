/**
 * Template Name: EasyFolio
 * Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
 * Updated: Feb 21 2025 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  'use strict';

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach((navmenu) => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach((navmenu) => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  const toggleBtn = document.getElementById('darkModeToggle');

  // Set awal berdasarkan localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', mode);
  });
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
  let currentIndex = 0;
  const slides = document.querySelectorAll('.skill-slide');
  const track = document.getElementById('skillsTrack');
  const totalSlides = slides.length;
  let slidesToShow = getSlidesToShow();
  let maxIndex = Math.max(0, totalSlides - slidesToShow);

  function getSlidesToShow() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  let slideWidth = 0;

  function calculateDimensions() {
    slideWidth = slides[0].offsetWidth;
  }

  function updateSlider() {
    calculateDimensions();
    const translateX = -(currentIndex * slideWidth);

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    });

    // Update dots
    updateDots();
  }

  function createDots() {
    const dotsContainer = document.getElementById('sliderDots');
    dotsContainer.innerHTML = '';

    const totalDots = maxIndex + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.onclick = () => goToSlide(i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  }

  function previousSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function goToSlide(index) {
    if (index !== currentIndex && index >= 0 && index <= maxIndex) {
      currentIndex = index;
      updateSlider();
    }
  }

  function handleResize() {
    slidesToShow = getSlidesToShow();
    maxIndex = Math.max(0, totalSlides - slidesToShow);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    createDots();
    updateSlider();
  }

  // Auto-play functionality
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateSlider();
    }, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Theme toggle
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  }

  // Initialize
  window.addEventListener('load', () => {
    handleResize();
    startAutoPlay();

    // Pause auto-play on hover
    const slider = document.querySelector('.skills-slider');
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  });

  // Debounce resize function
  let resizeTimeout;
  function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  }

  window.addEventListener('resize', debouncedResize);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Enhanced Touch/swipe support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let startTime = 0;

  // Mouse events for desktop
  track.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);

  // Touch events for mobile
  track.addEventListener('touchstart', handleStart, { passive: false });
  document.addEventListener('touchmove', handleMove, { passive: false });
  document.addEventListener('touchend', handleEnd);

  function handleStart(e) {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    startX = clientX;
    currentX = clientX;
    startTime = Date.now();
    isDragging = true;
    stopAutoPlay();

    track.style.transition = 'none';
    track.style.cursor = 'grabbing';
  }

  function handleMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    currentX = clientX;

    const diff = currentX - startX;
    const currentTranslateX = -(currentIndex * slideWidth);
    const newTranslateX = currentTranslateX + diff;

    // Add resistance at the edges
    const resistance = 0.3;
    let finalTranslateX = newTranslateX;

    if (currentIndex === 0 && diff > 0) {
      finalTranslateX = diff * resistance;
    } else if (currentIndex === maxIndex && diff < 0) {
      finalTranslateX = currentTranslateX + diff * resistance;
    }

    track.style.transform = `translate3d(${finalTranslateX}px, 0, 0)`;
  }

  function handleEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    track.style.cursor = 'grab';
    track.style.transition =
      'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const diff = currentX - startX;
    const timeDiff = Date.now() - startTime;
    const velocity = Math.abs(diff) / timeDiff;

    // Determine if it's a swipe (minimum distance and velocity)
    const minSwipeDistance = 50;
    const minVelocity = 0.3;

    if (Math.abs(diff) > minSwipeDistance || velocity > minVelocity) {
      if (diff > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        currentIndex--;
      } else if (diff < 0 && currentIndex < maxIndex) {
        // Swipe left - go to next
        currentIndex++;
      }
    }

    updateSlider();
    startAutoPlay();
  }

  // Prevent context menu on long press
  track.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Add grab cursor
  track.style.cursor = 'grab';
  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector('.isotope-container'),
        {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll('.isotope-filters li')
      .forEach(function (filters) {
        filters.addEventListener(
          'click',
          function () {
            isotopeItem
              .querySelector('.isotope-filters .filter-active')
              .classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({
              filter: this.getAttribute('data-filter'),
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          },
          false
        );
      });
  });
  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  document.getElementById('age').innerText =
    calculateAge('2003-10-24') + ' Years';
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector('.swiper-config').innerHTML.trim()
      );

      if (swiperElement.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener('load', initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll('.faq-item h3, .faq-item .faq-toggle')
    .forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll('.navmenu a.active')
          .forEach((link) => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();
