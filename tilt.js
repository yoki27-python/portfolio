/**
 * Lightweight 3D Tilt & Specular Glare Engine
 * Brings subtle physical depth to cards on pointer move
 */

(function () {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return; // Skip on pure touch screens for battery & ergonomics

  function initTilt() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach((card) => {
      let bounds;

      function onMouseEnter() {
        bounds = card.getBoundingClientRect();
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease-out';
        if (window.soundEngine) {
          window.soundEngine.playHover();
        }
      }

      function onMouseMove(e) {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = (mouseX / bounds.width - 0.5) * 2;
        const yPct = (mouseY / bounds.height - 0.5) * 2;

        const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 8;
        const tiltX = -yPct * maxTilt;
        const tiltY = xPct * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(6px)`;

        // Update glare if element has glare child
        const glare = card.querySelector('.tilt-glare');
        if (glare) {
          const glareX = (mouseX / bounds.width) * 100;
          const glareY = (mouseY / bounds.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 75%)`;
          glare.style.opacity = '1';
        }
      }

      function onMouseLeave() {
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

        const glare = card.querySelector('.tilt-glare');
        if (glare) {
          glare.style.opacity = '0';
        }
        bounds = null;
      }

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTilt);
  } else {
    initTilt();
  }

  window.initTilt = initTilt;
})();

