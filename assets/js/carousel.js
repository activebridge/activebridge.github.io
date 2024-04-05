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
  items.length <= 6 && (setElements(), setElements(), setElements());

  scroller.scrollLeft = 2000;

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

  const addFrameElements = () => {
    let items = Array.from(scroller.querySelectorAll('[data-scroll="item"]'));
    scroller.firstElementChild.appendChild(items[items.length - 2].cloneNode(true));
    scroller.children[1].appendChild(items[items.length - 1].cloneNode(true));
    scroller.children[scroller.children.length -2].appendChild(items[0].cloneNode(true));
    scroller.lastElementChild.appendChild(items[1].cloneNode(true));
  }
  addFrameElements();

  function checkElementUnderWindow() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('scaling-up', entry.isIntersecting);
      })
    }, {
      root: scroller,
      rootMargin: "-100px",
      threshold: 1,
    })
    Array.from(scroller.children).forEach(div => observer.observe(div));
  }
  if (!CSS.supports('animation-timeline: --item')) { checkElementUnderWindow(); }

  const setHiddden = () => { scroller.style.overflow = 'hidden'; };
  const setScroll = () => { scroller.style.overflow = 'scroll'; };

  function observeElements() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target === scroller.children[scroller.children.length-1] && entry.isIntersecting) {
          setHiddden();
          scroller.children[1].scrollIntoView({ behavior: "instant", block: "nearest", inline: "nearest" });
          setTimeout(function() { setScroll() }, 100);
        } else if (entry.isIntersecting && entry.target === scroller.firstElementChild) {
          setHiddden();
          scroller.children[scroller.children.length-3].scrollIntoView({ behavior: "instant", block: "nearest", inline: "nearest" });
          setTimeout(function() { setScroll() }, 100);
        }
      })
    }, {
      root: null,
      rootMargin: "-50px",
      threshold: 0.2,
    })
    Array.from(scroller.children).forEach(div => observer.observe(div));
  }

  observeElements();
}
