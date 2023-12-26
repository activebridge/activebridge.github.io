if (document.readyState !== "loading") { initBlogPageListener() }
document.addEventListener("DOMContentLoaded", initBlogPageListener);

function initBlogPageListener() {
  document.querySelector('.blog-main__header-description').classList.add('active');
  const navbar_links = document.querySelectorAll('[data-link="blog-link"]')

  navbar_links.forEach((link) => {
    link.addEventListener('click', async (e) => {
      const url = e.target.href
      const makeScroll = e.target.parentNode.classList.contains('pagination')
      e.preventDefault();

      document.startViewTransition(async () => {
        await switchToCollection(url, makeScroll);
      });
    })
  });
}

async function switchToCollection(url, makeScroll) {
  try {
    const response = await fetch(url);

    if (!response.ok) { window.location.href = url; }

    const htmlContent = await response.text();
    const newContent = document.createElement('div');
    newContent.innerHTML = htmlContent;
    const mainContent = document.querySelector('.blog-content');

    mainContent.innerHTML = ''
    mainContent.appendChild(newContent.querySelector('.blog-content'));

    if (makeScroll) { window.scrollTo(0, mainContent.offsetTop -100); }

    window.history.replaceState({ backButtonPresse: true }, '', url);

    initBlogPageListener();
  } catch (error) {
    window.location.href = url;
  }
}
