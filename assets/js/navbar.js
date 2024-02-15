document.addEventListener("DOMContentLoaded", innitMobileNavbar);

function innitMobileNavbar() {
  const dragSvg = document.querySelector('.navbar-more-bulb');
  const body = document.body;
  let startX, startY;
  const drag = document.querySelector('.header-navbar');
  const overlay = document.querySelector('.navbar-overlay');
  const navButton = document.querySelector('.menu-icon');
  const closeMobileNavButton = document.querySelector('.menu-close-ico')

  if (screen.width < 1025) { drag.classList.add('show') }

  closeMobileNavButton.addEventListener('click', () => {
    if (window.innerWidth >= 501 && window.innerWidth <= 660) {
      drag.style.right = '-74vw';
    } else if (window.innerWidth >= 661 && window.innerWidth <= 750) {
      drag.style.right = '-49vw';
    } else if (window.innerWidth >= 751 && window.innerWidth <= 1024) {
      drag.style.right = '-42vw';
    } else {
      drag.style.right = '-89vw';
    }
    overlay.classList.remove('active');
  });

  navButton.addEventListener('click', (e) => {
    const button = document.querySelector('#menu-btn')
    if (button.checked) {
      if (window.innerWidth >= 501 && window.innerWidth <= 660) {
        drag.style.right = '-74vw';
      } else if (window.innerWidth >= 661 && window.innerWidth <= 750) {
        drag.style.right = '-49vw';
      } else if (window.innerWidth >= 751 && window.innerWidth <= 1024) {
        drag.style.right = '-42vw';
      } else {
        drag.style.right = '-89vw';
      }
      overlay.classList.remove('active');
    } else {
      drag.style.right = '0vw';
      overlay.classList.add('active');
    }
  });

  drag.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
  }, { passive: true });

  drag.addEventListener('touchmove', function(event) {
    let moveX = event.touches[0].pageX;
    let moveY = event.touches[0].pageY;
    let diffX = Math.abs(moveX - startX);
    let diffY = Math.abs(moveY - startY);
    if (diffX > diffY) {
      if (startX > moveX) {
        dragSvg.classList.add('touch-left');
        overlay.classList.add('active')
        setTimeout(function() {
          drag.style.right = '0vw';
        }, 100);
      } else {
        dragSvg.classList.add('touch-right');
        overlay.classList.remove('active')
        setTimeout(function() {
          if (window.innerWidth >= 501 && window.innerWidth <= 660) {
            drag.style.right = '-74vw';
          } else if (window.innerWidth >= 661 && window.innerWidth <= 750) {
            drag.style.right = '-49vw';
          } else if (window.innerWidth >= 751 && window.innerWidth <= 1024) {
            drag.style.right = '-42vw';
          } else {
            drag.style.right = '-89vw';
          }
        }, 100);
      }
    }
  }, { passive: true });

  drag.addEventListener('touchend', function(event) {
    dragSvg.classList.remove('touch-right', 'touch-left');
  });
}
