if (document.readyState !== "loading") { initTransitionView() }
document.addEventListener("DOMContentLoaded", initTransitionView);

function initTransitionView() {
  if (screen.width > 768) {
    setActiveNavLink();
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

function setActiveNavLink() {
  const navbar_links = document.querySelectorAll('[data-link="nav-link"]');
  const currentUrl = window.location.href;
  navbar_links.forEach(function(link) {

    if (currentUrl.includes(link.href)) {
      link.classList.add("active");
    }
  });
}
