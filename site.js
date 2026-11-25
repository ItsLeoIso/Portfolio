(() => {
  /* ---------- ACCESSIBLE DROPDOWN ---------- */
  const dropdownItems = [...document.querySelectorAll('.nav-item[data-dropdown]')];

  function closeAllDropdowns(restoreFocus = false) {
    dropdownItems.forEach((item) => {
      if (!item.classList.contains('is-open')) return;
      item.classList.remove('is-open');
      const toggle = item.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        if (restoreFocus) toggle.focus();
      }
    });
  }

  dropdownItems.forEach((item) => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !item.classList.contains('is-open');
      closeAllDropdowns();
      if (willOpen) {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    item.querySelectorAll('.dropdown a').forEach((link) => {
      link.addEventListener('click', () => closeAllDropdowns());
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-item[data-dropdown]')) {
      closeAllDropdowns();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllDropdowns(true);
    }
  });

  /* ---------- COPY EMAIL BUTTON ---------- */
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    let hideTimer = null;
    let clearTimer = null;

    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      const status = button.nextElementSibling;
      try {
        await navigator.clipboard.writeText(email);
        if (!status) return;
        if (hideTimer !== null) clearTimeout(hideTimer);
        if (clearTimer !== null) clearTimeout(clearTimer);

        status.textContent = 'Kopiert';
        status.classList.add('is-visible');

        hideTimer = setTimeout(() => {
          status.classList.remove('is-visible');
          clearTimer = setTimeout(() => {
            if (!status.classList.contains('is-visible')) {
              status.textContent = '';
            }
            clearTimer = null;
          }, 200);
          hideTimer = null;
        }, 2400);
      } catch {
        window.location.href = 'mailto:' + email;
      }
    });
  });

  /* ---------- UNIFIED ACCESSIBLE LIGHTBOX ---------- */
  const lightbox = document.getElementById('site-lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    let activeList = [];
    let activeIndex = 0;
    let previousFocus = null;
    let closeTimer = null;

    function getCaption(img) {
      const card = img.closest('.work-card');
      if (card) {
        const cap = card.querySelector('.work-caption');
        if (cap) return cap.innerText.replace(/\s+/g, ' ').trim();
      }
      return img.alt || '';
    }

    function openAt(list, index) {
      if (!list.length) return;
      if (closeTimer !== null) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      activeList = list;
      activeIndex = (index + activeList.length) % activeList.length;
      const source = activeList[activeIndex];

      if (!lightbox.classList.contains('is-open')) {
        previousFocus = document.activeElement;
      }

      lightboxImage.src = source.currentSrc || source.src;
      lightboxImage.alt = source.alt || '';

      const baseCaption = getCaption(source);
      const counter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(activeList.length).padStart(2, '0')}`;
      lightboxCaption.textContent = baseCaption ? `${baseCaption}  ·  ${counter}` : counter;

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      lightboxClose.focus();

      if (activeList.length > 1) {
        const nextImg = activeList[(activeIndex + 1) % activeList.length];
        const preload = new Image();
        preload.src = nextImg.currentSrc || nextImg.src;
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
      previousFocus = null;

      if (closeTimer !== null) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        if (!lightbox.classList.contains('is-open')) {
          lightboxImage.src = '';
        }
        closeTimer = null;
      }, 220);
    }

    function bindGallery(selector, getScopeList) {
      document.querySelectorAll(selector).forEach((img) => {
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        const card = img.closest('.work-card');
        const labelText = card?.querySelector('.work-title')?.textContent || img.alt || 'Fotografie';
        img.setAttribute('aria-label', `Foto im Vollbild öffnen: ${labelText}`);

        const trigger = () => {
          const scope = getScopeList(img);
          const idx = scope.indexOf(img);
          openAt(scope, idx >= 0 ? idx : 0);
        };

        img.addEventListener('click', trigger);
        img.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            trigger();
          }
        });
      });
    }

    bindGallery('.portfolio-grid .work-item', () => [
      ...document.querySelectorAll('.portfolio-grid .work-item'),
    ]);

    bindGallery('.photo-wrapper img', (img) => {
      const section = img.closest('.project-section');
      return section
        ? [...section.querySelectorAll('.photo-wrapper img')]
        : [img];
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') openAt(activeList, activeIndex + 1);
      if (event.key === 'ArrowLeft') openAt(activeList, activeIndex - 1);
      if (event.key === 'Tab') {
        event.preventDefault();
        lightboxClose.focus();
      }
    });

    let touchX = null;
    lightbox.addEventListener(
      'touchstart',
      (event) => {
        touchX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );
    lightbox.addEventListener(
      'touchend',
      (event) => {
        if (touchX === null) return;
        const delta = event.changedTouches[0].screenX - touchX;
        if (Math.abs(delta) > 45) {
          openAt(activeList, activeIndex + (delta < 0 ? 1 : -1));
        }
        touchX = null;
      },
      { passive: true }
    );
  }

  /* ---------- BELOW-THE-FOLD SCROLL REVEALS ---------- */
  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  if (revealTargets.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');

    revealTargets.forEach((el) => {
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
})();
