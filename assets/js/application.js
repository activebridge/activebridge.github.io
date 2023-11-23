
document.addEventListener("DOMContentLoaded", function () {
  function setCarousel(scroller_class, children_class) {
    const scroller = document.querySelector(scroller_class);
    const all_scroller_child = Array.from(scroller.children)
    const children = scroller.querySelectorAll(children_class);
    scroller.firstElementChild.appendChild(children[children.length - 1].cloneNode(true));
    scroller.lastElementChild.appendChild(children[0].cloneNode(true));

    scroller.addEventListener("click", event => {
      event.target.closest('section').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    });

    function observeElements() {
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('in-view', entry.isIntersecting)

          const currentIndex = all_scroller_child.indexOf(entry.target);
          const prevIndex = currentIndex - 1 < 0 ? all_scroller_child.length - 1 : currentIndex - 1;
          const nextIndex = currentIndex + 1 >= all_scroller_child.length ? 0 : currentIndex + 1;
          const prevElement = all_scroller_child[prevIndex];
          const nextElement = all_scroller_child[nextIndex];

          if (entry.isIntersecting) {
            prevElement.classList.add('previous-in-view');
            nextElement.classList.add('next-in-view');
          } else {
            prevElement.classList.remove('previous-in-view');
            nextElement.classList.remove('next-in-view');
          }

          if (entry.target == scroller.lastElementChild && entry.isIntersecting) {
            children[0].scrollIntoView(false);
          } else if (entry.target == scroller.firstElementChild && entry.isIntersecting) {
            children[children.length - 1].scrollIntoView(false);
          }
        })
      }, {
          threshold: 0.9,
      })
      all_scroller_child.forEach(div => observer.observe(div))
    }

    observeElements();
  }

  setCarousel('.carousel-scroll__scroller', '.carousel-scroll__item');
});
