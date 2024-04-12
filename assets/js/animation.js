document.addEventListener("DOMContentLoaded", connectAnimationToPage);
if (document.readyState !== "loading") { connectAnimationToPage(); }

function initSnakeAnimation (path, container) {
  let pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength + " " + pathLength;
  path.style.strokeDashoffset = pathLength;

  function scrollAnimation () {
    let scrollHeigth = container.scrollHeight > 1800 ? container.scrollHeight - document.documentElement.clientHeight : document.documentElement.clientHeight
    let scrollPercentage = (document.documentElement.scrollTop - container.offsetTop + 200) / scrollHeigth;
    let drawLength = pathLength * scrollPercentage;
    path.style.strokeDashoffset = pathLength - drawLength;
  }

  window.addEventListener('scroll', scrollAnimation);
}

function connectAnimationToPage () {
  animatioBlocks = document.querySelectorAll('[data-animation="snake"]')

  animatioBlocks.forEach((element) => {
    const svg = element.querySelector('.svg-path')
    initSnakeAnimation(svg, element)
  })
}
