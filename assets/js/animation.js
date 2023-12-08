document.addEventListener("DOMContentLoaded", function () {
  function initSnakeAnimation (svg_class_name, container_class_name) {
    let container = document.querySelector(container_class_name)
    let path = document.querySelector(svg_class_name);
    let pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength + " " + pathLength;
    path.style.strokeDashoffset = pathLength;

    function scrollAnimation (event) {
      if (document.documentElement.scrollTop >= container.offsetTop) {
        let scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop - container.offsetTop) / (container.scrollHeight - document.documentElement.clientHeight);
        let drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
      }
    }

    window.addEventListener('scroll', scrollAnimation);
  }

  if (document.querySelector('.solutions')) {
    initSnakeAnimation(".svg-path", ".solutions-first-animated-cards")
    initSnakeAnimation(".second-svg-path", ".solutions-second-animated-cards") }
  else{
    initSnakeAnimation(".services-animation-svg", ".services-animated_cards")
    }
});
