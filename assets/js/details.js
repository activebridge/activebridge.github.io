window.onload = () => {
    setTimeout(() => {
    const details = document.querySelectorAll('details');
    if (details.length > 0) {
      details[0].setAttribute('open', true);
    }
  }, 300);
};
