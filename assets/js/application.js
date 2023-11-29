document.addEventListener("DOMContentLoaded", function () {
  function setCarousel (scroller_class) {
    const scroller = document.querySelector(scroller_class);
    scroller.children[1].scrollIntoView(false)

    function updateSort(scroller) {
      let scrollWidth = scroller.scrollWidth;
      let scrollLeft = scroller.scrollLeft;
      let width = scroller.offsetWidth;
      let items = scroller.children;

      if (scrollLeft === 0) {
        scroller.prepend(items[items.length - 1]);
        scroller.scrollLeft = scrollLeft + items[items.length - 1].offsetWidth;
      }
      if (scrollLeft + width == scrollWidth) {
        scroller.append(items[0]);
        scroller.scrollLeft = scrollLeft - items[0].offsetWidth;
      }
    }

    let lastscroll;
    scroller.addEventListener("scroll", function() {
      let el = this;

      if (lastscroll) {
        clearTimeout(lastscroll);
      }
      lastscroll = setTimeout(function() {
        updateSort(el);
      }, 60);
    });

    scroller.addEventListener("click", event => {
      event.target.closest('li').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    });

    updateSort(scroller);
  }

  setCarousel('.carousel-scroll__scroller')
});
