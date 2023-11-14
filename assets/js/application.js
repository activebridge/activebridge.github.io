document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.getElementById('header').classList.add('mobile-only');
  } else {
    document.getElementById('header').classList.add('desktop-only');
  };
});
