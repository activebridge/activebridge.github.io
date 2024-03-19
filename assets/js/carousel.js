if (document.readyState !== "loading") { initCarousels() }
document.addEventListener("DOMContentLoaded", initCarousels );

function initCarousels() {
  carousels = document.querySelectorAll('#page-carousel')
  carousels.forEach((element) => {setCarousel(element)})
}

function setCarousel(nodeElement) {
  const scroller = nodeElement
  let items = scroller.querySelectorAll('[data-scroll="item"]');
  let copyOfItems = Array.from(items);
  let reverseNewItems = [...copyOfItems].reverse();

  const setElements = () => {
    copyOfItems.forEach((item) => {
      scroller.insertBefore(item.cloneNode(true), items[0]);
    })
    reverseNewItems.forEach((item) => {
      scroller.insertBefore(item.cloneNode(true), items[items.length-1].nextSibling);
    })
  }
  setElements();
  items.length <= 6 && (setElements(), setElements());

  setTimeout(function() {
    scroller.scroll({ left: scroller.scrollLeft + scroller.children[1].offsetWidth, behavior: "smooth", });
  }, 50);

  const updateScale = () => {
    let items = scroller.querySelectorAll('[data-scroll="item"]');
    items.forEach((item, index) => {
      if (isElementUnderWindow(item)) {
        item.classList.add('scaling-up');
      } else {
        item.classList.remove('scaling-up');
      }
    });
  };

  function isElementUnderWindow(element) {
    const windowRect = scroller.parentElement.querySelector('.magnifying-overlay').getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return elementRect.left < windowRect.right && elementRect.right > windowRect.left;
  }

  function updateSort(scroller) {
    let scrollWidth = scroller.scrollWidth;
    let scrollLeft = scroller.scrollLeft;
    let width = scroller.offsetWidth;
    let items = scroller.querySelectorAll('[data-scroll="item"]');

    if (scrollLeft <= items[0].offsetWidth*4){
      scroller.style.overflow = 'hidden';

      copyOfItems.forEach((item) => {
        scroller.insertBefore(item.cloneNode(true), items[0]);
        scroller.removeChild(scroller.children[scroller.children.length -1]);
      })

      setTimeout(function() {
        scroller.style.overflow = 'scroll';
      });
    }

    if (scrollLeft + width >= scrollWidth - items[0].offsetWidth*4) {
      scroller.style.overflow = 'hidden';

      reverseNewItems.forEach((item) => {
        scroller.insertBefore(item.cloneNode(true), items[items.length-1].nextSibling);
        scroller.removeChild(scroller.children[1]);
      })

      setTimeout(function() {
        scroller.style.overflow = 'scroll';
      });
    }
  }

  let lastscroll;

  scroller.addEventListener("scroll", function() {
    let el = this;

    clearTimeout(lastscroll);
    lastscroll = setTimeout(function() {
      updateSort(el);

      if (!CSS.supports('animation-timeline: --item')) { updateScale(); }
    }, 60);
  });

  scroller.addEventListener("click", event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const middle = rect.width / 2;

    if (clickX > middle) {
      scroller.scroll({ left: scroller.scrollLeft + scroller.children[1].offsetWidth, behavior: "smooth", });
    } else {
      scroller.scroll({ left: scroller.scrollLeft - scroller.children[1].offsetWidth, behavior: "smooth", });
    }
  });
  updateSort(scroller);
}
