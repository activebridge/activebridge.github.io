document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    let height = scrollY - motionSection.offsetTop
    if (height > 0) {
      let motionPercent = (height / 820) * 100
      let percent = 100 - motionPercent

      document.querySelector('path').style.strokeDashoffset = (percent / 100) * 4000
    }
  });
});
