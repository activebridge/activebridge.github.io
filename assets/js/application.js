if (document.readyState !== "loading") { initTransitionView() }
document.addEventListener("DOMContentLoaded", initTransitionView);

function initTransitionView() {
  if (screen.width > 748) {
    const navbar_links = document.querySelectorAll('[data-link="nav-link"]')
    const transition_links = document.querySelectorAll('[data-link="transition"]')

    transition_links.forEach((link) => {
      const name = link.href.split('/').filter(word => word !== '').pop()
      link.style.setProperty("view-transition-name", name)
    });

    navbar_links.forEach((link) => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();

        await performTransition(e, transition_links);
      });
    });

    async function performTransition(e, transition_links) {

      function transitionPromise(links) {
        return new Promise(resolve => {
          links.forEach((link) => {
            link.style.setProperty("view-transition-name", "")
          });
          setTimeout(resolve, 100);
        });
      }

      await transitionPromise(transition_links);

      window.location.href = e.target.href;
    }
  }
}
