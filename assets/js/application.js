if (document.readyState !== "loading") { initTransitionView() }
document.addEventListener("DOMContentLoaded", initTransitionView);

function initTransitionView() {
  if (screen.width > 700) {
    const navbar_links = document.querySelectorAll(".transition-link")
    navbar_links.forEach((link) => {
      link.addEventListener('click', async (e) => {
        const url = e.target.href
        e.preventDefault();

        if (!document.startViewTransition) {
          window.location.href = url;
          return;
        }
        const transition = document.startViewTransition(async () => {
          await switchToPage(url);
        });
        animateFromMiddle(transition);
      })
  });

  async function animateFromMiddle(transition) {
    try {
      await transition.ready;

      document.documentElement.animate(
        {
          clipPath: [`inset(50%)`, `inset(0)`],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    } catch (err) {
  }
  }

  async function switchToPage(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) { window.location.href = url; }

      const htmlContent = await response.text();
      const newContent = document.createElement('div');
      newContent.innerHTML = htmlContent;
      const mainContent = document.querySelector('.main-section');
      const scripts = newContent.querySelector('.main-section').firstElementChild.getAttribute('data-script')

      if(scripts) {
          JSON.parse(scripts).forEach((file_name) => {
            addScriptToPage(file_name)
          }
        );
      }
      addScriptToPage('application')
      mainContent.innerHTML = ''
      window.scrollTo(0,0);
      mainContent.appendChild(newContent.querySelector('.main-section'));
      window.history.replaceState({backButtonPresse : true}, '', url);
    } catch (error) {
      window.location.href = url;
    }
  }
 }
}

function addScriptToPage (file_name) {
  let script = document.createElement('script')
  script.src = `/assets/js/${file_name}.js`
  document.body.appendChild(script);
}
