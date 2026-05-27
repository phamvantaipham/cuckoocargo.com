// CUCKOO CARGO Brand Guidelines — Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered section reveals
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Update active nav
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.15, rootMargin: '-50px' });

  sections.forEach(s => revealObserver.observe(s));

  // Smooth scroll nav
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Copy color on click
  const toast = document.getElementById('toast');
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.dataset.color;
      if (color) {
        navigator.clipboard.writeText(color).then(() => {
          toast.textContent = `Copied ${color}`;
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2000);
        });
      }
    });
  });

  // Stagger children animations
  document.querySelectorAll('.values-grid, .color-grid, .dont-grid, .photo-rules, .figma-tree, .component-grid').forEach(grid => {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          Array.from(children).forEach((child, i) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`;
            requestAnimationFrame(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            });
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    staggerObserver.observe(grid);
  });

  // Parallax cover background
  const coverBg = document.querySelector('.cover-bg');
  if (coverBg) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        coverBg.style.transform = `translateY(${scroll * 0.3}px)`;
        coverBg.style.opacity = Math.max(0, 0.35 - scroll * 0.0003);
      }
    }, { passive: true });
  }

  // Hover glow effect on color cards
  document.querySelectorAll('.color-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const swatch = card.querySelector('.color-swatch');
      if (swatch) {
        const color = swatch.dataset.color;
        card.style.boxShadow = `0 8px 32px ${color}33`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
    });
  });
});
