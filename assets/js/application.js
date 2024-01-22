if (document.readyState !== "loading") { initTransitionView() }
document.addEventListener("DOMContentLoaded", initTransitionView);

function initTransitionView() {
  if (screen.width > 748) {
    const navbar_links = document.querySelectorAll('[data-link="nav-link"]')
    const transition_links = document.querySelectorAll('[data-link="transition"]')

    transition_links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const name = e.target.href.split('/').filter(word => word !== '').pop()
        link.style.setProperty("view-transition-name", name)

        setTimeout(function() { window.location.href = e.target.href; });
      });
    });
  }
}
