document.addEventListener('DOMContentLoaded', function () {

  'use strict';

  /* =======================
  // Featured Recipes Carousel
  ======================= */

  // Ensure carousel exists before initializing
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  const loadingIndicator = document.getElementById('carouselLoading');
  const carousel = document.querySelector('.featured-recipes-carousel');

  if (carouselTrack && carousel && prevBtn && nextBtn) {
    let currentSlide = 0;
    let slides = document.querySelectorAll('.carousel-slide');
    let autoRotate = true;
    let rotateInterval;
    const rotateDelay = 5000; // 5 seconds

    // Update slide count
    function updateSlides() {
      slides = document.querySelectorAll('.carousel-slide');
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
      if (!slides.length) return;

      // Handle wrap-around
      if (slideIndex < 0) {
        slideIndex = slides.length - 1;
      } else if (slideIndex >= slides.length) {
        slideIndex = 0;
      }

      currentSlide = slideIndex;

      // Update track position
      carouselTrack.style.transform = `translateX(-${slideIndex * 100}%)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === slideIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });

      // Update slide animations
      slides.forEach((slide, index) => {
        if (index === slideIndex) {
          slide.classList.remove('prev');
          slide.style.animation = 'none';
          void slide.offsetWidth; // Force reflow
          slide.style.animation = 'slideInRight 0.5s ease-out';
        } else if (index === (slideIndex - 1 + slides.length) % slides.length) {
          slide.classList.add('prev');
        } else {
          slide.classList.remove('prev');
        }
      });

      // Update loading indicator position
      if (loadingIndicator) {
        loadingIndicator.style.top = `${slideIndex * 30 + 10}px`;
      }
    }

    // Next slide
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Pause autoplay
    function pauseAutoplay() {
      if (autoRotate) {
        clearInterval(rotateInterval);
        autoRotate = false;
        if (loadingIndicator) {
          loadingIndicator.classList.add('visible');
        }
      }
    }

    // Resume autoplay
    function resumeAutoplay() {
      if (!autoRotate) {
        clearInterval(rotateInterval);
        rotateInterval = setInterval(nextSlide, rotateDelay);
        autoRotate = true;
        if (loadingIndicator) {
          loadingIndicator.classList.remove('visible');
        }
      }
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
      pauseAutoplay();
      nextSlide();
      resumeAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      pauseAutoplay();
      prevSlide();
      resumeAutoplay();
    });

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        pauseAutoplay();
        goToSlide(index);
        resumeAutoplay();
      });
    });

    // Handle touch/swipe navigation
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      pauseAutoplay();
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
      resumeAutoplay();
    }, { passive: true });

    carouselTrack.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - next slide
          nextSlide();
        } else {
          // Swiped right - previous slide
          prevSlide();
        }
      }
    }

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', pauseAutoplay);
    carousel.addEventListener('mouseleave', resumeAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        pauseAutoplay();
        prevSlide();
        resumeAutoplay();
      } else if (e.key === 'ArrowRight') {
        pauseAutoplay();
        nextSlide();
        resumeAutoplay();
      }
    });

    // Initialize carousel
    goToSlide(0);
    if (autoRotate) {
      rotateInterval = setInterval(nextSlide, rotateDelay);
    }

    // Update slides on DOM changes (in case content changes dynamically)
    const observer = new MutationObserver(() => {
      updateSlides();
      goToSlide(currentSlide);
    });

    observer.observe(carouselTrack, {
      childList: true,
      subtree: true
    });

    // Improve accessibility for carousel
    // Add ARIA attributes and keyboard navigation for screen readers
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Featured Recipes Carousel');

    // Add live region for screen readers
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'carousel-announcement';
    document.body.appendChild(liveRegion);

    function announceSlideChange() {
      const announcement = document.getElementById('carousel-announcement');
      if (announcement && slides.length > 0) {
        const currentSlideNumber = currentSlide + 1;
        const totalSlides = slides.length;
        const currentHeading = slides[currentSlide].querySelector('h2');
        const headingText = currentHeading ? currentHeading.textContent : '';
        announcement.textContent = `Slide ${currentSlideNumber} of ${totalSlides}: ${headingText}`;
      }
    }

    // Update announcement on slide change
    function setupSlideAnnouncement() {
      announceSlideChange();

      // Update announcement when slide changes
      const observer = new MutationObserver(() => {
        announceSlideChange();
      });

      observer.observe(carouselTrack, {
        childList: true,
        subtree: true
      });
    }

    setupSlideAnnouncement();

    // Add skip navigation link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add CSS for screen reader only class
    const style = document.createElement('style');
    style.textContent = '.sr-only { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }';
    document.head.appendChild(style);
  }

  /* =======================
  // Simple Search Settings
  ======================= */

  SimpleJekyllSearch({
    searchInput: document.getElementById('js-search-input'),
    resultsContainer: document.getElementById('js-results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    noResultsText: '<li>No results found</li>'
  })

  /* =======================
  // Responsive videos
  ======================= */
  // fitVids functionality is handled by CSS aspect-ratio in _content.scss

  /* =======================================
  // Switching between posts and categories
  ======================================= */

  const navItems = document.querySelectorAll('.c-nav__list > .c-nav__item');
  const posts = document.querySelector('.c-posts');
  const loadMore = document.querySelector('.c-load-more');
  const categories = document.querySelector('.c-categories');

  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      navItems.forEach(function(i) { i.classList.remove('is-active'); });
      this.classList.add('is-active');

      const isLast = this === navItems[navItems.length - 1];

      if (posts) {
        if (isLast) {
          posts.style.display = 'none';
          posts.classList.remove('o-opacity');
          if (loadMore) loadMore.style.display = 'none';
          if (categories) {
            categories.style.display = '';
            categories.classList.add('o-opacity');
          }
        } else {
          posts.style.display = '';
          posts.classList.add('o-opacity');
          if (loadMore) loadMore.style.display = '';
          if (categories) {
            categories.style.display = 'none';
            categories.classList.remove('o-opacity');
          }
        }
      }
    });
  });

  /* =======================
  // Adding ajax pagination
  ======================= */

  const loadMoreBtn = document.querySelector(".c-load-more");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loadMorePosts.call(this);
    });
  }

  function loadMorePosts() {
    const postsContainer = document.querySelector('.c-posts');
    const nextPage = parseInt(postsContainer.getAttribute('data-page')) + 1;
    const totalPages = parseInt(postsContainer.getAttribute('data-totalPages'));

    this.classList.add('is-loading');

    fetch('/page/' + nextPage)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const articles = htmlDoc.querySelectorAll('article');

        articles.forEach(article => {
          postsContainer.appendChild(article);
        });

        postsContainer.setAttribute('data-page', nextPage);

        if (postsContainer.getAttribute('data-totalPages') == nextPage) {
          const loadMore = postsContainer.nextElementSibling;
          if (loadMore && loadMore.classList.contains('c-load-more')) {
            loadMore.remove();
          }
        }
      })
      .catch(error => {
        console.error('Error loading more posts:', error);
      })
      .finally(() => {
        this.classList.remove('is-loading');
      });
  }

  /* ==============================
  // Smooth scroll to the tags page
  ============================== */

  document.querySelectorAll('.c-tag__list a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 10,
          behavior: 'smooth'
        });
      }
    });
  });

  /* =======================
  // Scroll to top
  ======================= */

  const topButton = document.querySelector('.c-top');
  if (topButton) {
    topButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', function () {
      if (window.scrollY > window.innerHeight) {
        topButton.classList.add("c-top--active");
      } else {
        topButton.classList.remove("c-top--active");
      }
    });
  }


});