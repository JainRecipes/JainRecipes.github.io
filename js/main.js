document.addEventListener('DOMContentLoaded', function () {

  'use strict';

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