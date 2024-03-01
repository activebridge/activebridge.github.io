document.addEventListener("DOMContentLoaded", innitMobileNavbar);

function innitMobileNavbar() {
  const dragSvg = document.querySelector('.navbar-more-bulb');
  let startX, startY;
  const navButton = document.querySelector('.menu-icon');
  const closeMobileNavButton = document.querySelector('.menu-close-ico')
  const scroller = document.querySelector('.body-content')

  closeMobileNavButton.addEventListener('click', () => {
    scroller.scroll({ left: 0, behavior: "smooth", });
  });

  navButton.addEventListener('click', (e) => {
    const button = document.querySelector('#menu-btn')
    if (button.checked) {
      scroller.scroll({ left: 0, behavior: "smooth", });
    } else {
      scroller.scroll({ left: 300, behavior: "smooth", });
    }
  });

  scroller.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
  }, { passive: true });

  scroller.addEventListener('touchmove', function(event) {
    let moveX = event.touches[0].pageX;
    let moveY = event.touches[0].pageY;
    let diffX = Math.abs(moveX - startX);
    let diffY = Math.abs(moveY - startY);
    if (diffX > diffY) {
      if (startX > moveX) {
        dragSvg.classList.add('touch-left');
      } else {
        dragSvg.classList.add('touch-right');
      }
    }
  }, { passive: true });

  scroller.addEventListener('touchend', function(event) {
    dragSvg.classList.remove('touch-right', 'touch-left');
  });
}
