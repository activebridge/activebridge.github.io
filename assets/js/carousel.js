const setCarousel = (scroller) => {
  if (scroller.children.length <= 4 ) scroller.innerHTML += scroller.innerHTML;

  const items = scroller.querySelectorAll('.animate-visibility');
  const mobileStep = screen.width <= 768 ? scroller.children[0].offsetWidth / 2 : 0;

  let clones = [];
  let disableScroll = false;
  let scrollWidth = 0;
  let scrollPos = 0;
  let clonesWidth = 0;
  let isDragging = false;

  scroller.innerHTML += scroller.innerHTML;

  const getScrollPos = () => scroller.scrollLeft;
  const setScrollPos = (pos) => scroller.scrollLeft = pos;

  items.forEach(item => {
    const clone = item.cloneNode(true);
    scroller.appendChild(clone);
    clone.classList.add('js-clone');
  });

  clones = scroller.querySelectorAll('.js-clone');

  const getClonesWidth = () =>{
    clonesWidth = 0;
    clones.forEach(clone => { clonesWidth += clone.offsetWidth; });
    return clonesWidth;
  }

  const reCalc = () => {
    scrollPos = getScrollPos();
    scrollWidth = scroller.scrollWidth;
    clonesWidth = getClonesWidth();
    if (scrollPos <= 0) return setScrollPos(1);
  }

  getClonesWidth();
  setScrollPos(clonesWidth - mobileStep);
  reCalc();

  const scrollUpdate = () => {
    if (!disableScroll) {
      scrollPos = Math.round(getScrollPos() / 100) * 100;
      if (clonesWidth + scrollPos >= scrollWidth) {
        setScrollPos(clonesWidth);
        disableScroll = true;
      } else if (scrollPos == 0) {
        setScrollPos(scrollWidth - clonesWidth * 2);
        disableScroll = true;
      } else if (scrollPos <= mobileStep) {
        setScrollPos(scrollWidth - clonesWidth * 2 + mobileStep);
        disableScroll = true;
      }
    }
    if (disableScroll) {
      setTimeout(() => {
        disableScroll = false;
      }, 50);
    }
  }

  scroller.addEventListener('click', (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const middle = rect.width / 2;

    if (clickX > middle) {
      scroller.scrollTo({
        left: scroller.scrollLeft + scroller.children[1].offsetWidth,
        behavior: 'smooth'
      });
    } else {
      scroller.scrollTo({
        left: scroller.scrollLeft - scroller.children[1].offsetWidth,
        behavior: 'smooth'
      });
    }
    isDragging = false;
  });

  let isDesktopScrolling;
  scroller.addEventListener('scroll', (event) => {
    const target = event.target;
    const offsetWidth = target.offsetWidth;

    const checkPos = () => {
      [...target.children].map(e => {
        const toCenter = Math.abs(window.outerWidth / 2 - e.getBoundingClientRect().left - e.getBoundingClientRect().width / 2);
        const toCenter2 = window.outerWidth / 2 - e.getBoundingClientRect().left - e.getBoundingClientRect().width / 2;
        const viewport = toCenter / offsetWidth * 100;
        const viewport2 = toCenter2 / offsetWidth * 100;
        e.style.setProperty('--viewport', viewport);
        e.style.setProperty('--viewport2', viewport2);
      });
    };
    checkPos();
    scrollUpdate();

    if(screen.width >= 768 ) {
      clearTimeout(isDesktopScrolling);
      isDesktopScrolling = setTimeout(() => {
        onScrollStop();
      }, 100);

      function onScrollStop() {
        scroller.scrollTo({
          left: scroller.children[0].offsetWidth * Math.round(scroller.scrollLeft / scroller.children[0].offsetWidth),
          behavior: 'smooth'
        });
      };
    }
  });

  let startX, deltaX, currentX, halfOfCard, startY, deltaY, currentY, isHorizontalScroll;

  const onTouchStart = (event) => {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
    deltaX = 0;
    currentX = 0;
    currentY = 0;
    halfOfCard = 0;
    deltaY = 0;
    isHorizontalScroll = undefined;
  }

  const onTouchMove = (event) => {
    if (event.touches.length > 1) return;

    isDragging = true;
    currentX = event.touches[0].pageX;
    currentY = event.touches[0].pageY;
    deltaX = currentX - startX;
    deltaY = currentY - startY;
    const scrollDelta = currentX - startX > 0 ? -1 : 1;
    halfOfCard = screen.width <= 768 ? (scroller.children[0].offsetWidth/2) * scrollDelta : 0;
    if (typeof isHorizontalScroll === 'undefined') isHorizontalScroll = Math.abs(deltaY) > Math.abs(deltaX);

    if (!isHorizontalScroll) {
      event.preventDefault();
      scroller.scrollLeft -= deltaX;
    }

    startX = currentX;
    startY = currentY;
  }

  const onTouchEnd = () => {
    if (!isHorizontalScroll && isDragging) {
      setTimeout(() => {
        scroller.scrollTo({
          left: scroller.children[0].offsetWidth * Math.round(scroller.scrollLeft / scroller.children[0].offsetWidth) + halfOfCard,
          behavior: 'smooth'
        });
      }, 0);
    }
    isDragging = false;
  }

  scroller.addEventListener('touchstart', onTouchStart, { passive: false });
  scroller.addEventListener('touchmove', onTouchMove, { passive: false });
  scroller.addEventListener('touchend', onTouchEnd, { passive: false });
}

document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll('[data-scroll="scroller"]');
  carousels.forEach((element) => setCarousel(element));
});
