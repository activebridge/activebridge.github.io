document.addEventListener("DOMContentLoaded", initCarousels );

function initCarousels() {
  carousels = document.querySelectorAll('#page-carousel')
  carousels.forEach((element) => {setCarousel(element)})
}

function setCarousel(nodeElement) {
  const scroller = nodeElement
  scroller.innerHTML = scroller.innerHTML + scroller.innerHTML
  scroller.scrollLeft = 1700;

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

  function checkElementUnderWindow() {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        console.log(entry.target.getBoundingClientRect())
        entry.target.classList.toggle('scaling-up', entry.isIntersecting);
      })
    }, {
      root: scroller,
      rootMargin: "-100px",
      threshold: 1,
    })
    Array.from(scroller.children).forEach(div => observer.observe(div));
  }
  checkElementUnderWindow()
}

function loop({ target, target: { scrollLeft, scrollWidth, offsetWidth } }) {
  const progress = scrollLeft / (scrollWidth - offsetWidth) * 100
  if (window.scrollProgress === progress) return
  // target.style.scrollSnapType = 'none'
  clearTimeout(window.scrollSnapTimeout)
  window.scrollSnapTimeout = setTimeout(() => {
    // target.scrollTo({ left: 1000, behavior: 'smooth' })
  }, 100)

  const isForward = (window.scrollProgress <= progress)
  window.scrollProgress = progress;

  [...target.children].map(e => {
    const toCenter = Math.abs(window.outerWidth / 2 - e.getBoundingClientRect().left - e.getBoundingClientRect().width / 2)
    const toCenter2 = (window.outerWidth / 2 - e.getBoundingClientRect().left - e.getBoundingClientRect().width / 2)
    const viewport = toCenter / offsetWidth * 100
    const viewport2 = toCenter2 / offsetWidth * 100
    e.style.setProperty('--viewport', viewport)
    e.style.setProperty('--viewport2', viewport2)
  })
  target.style.setProperty('--scroll', Math.floor(progress))
  if (offsetWidth + scrollLeft >= scrollWidth - offsetWidth && isForward) {
    target.scrollLeft = scrollLeft - scrollWidth / 2
    window.scrollProgress = 0
    return
  }
  if (scrollLeft <= offsetWidth && !isForward) {
    target.scrollLeft = scrollLeft + scrollWidth / 2
    window.scrollProgress = 100
  }
}
