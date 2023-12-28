if (document.readyState !== "loading") { initBlogPageListener() }
document.addEventListener("DOMContentLoaded", initBlogPageListener);

function initBlogPageListener() {
  const navbar_links = document.querySelectorAll('[data-link="blog-link"]')

  navbar_links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tag = e.target.dataset.tag;
      const posts = document.querySelectorAll('.posts__post');
      e.target.classList.toggle('active')

      document.startViewTransition(() => {
        posts.forEach(post => {
          const postTags = post.dataset.tags.split(' ');
          if (postTags.includes(tag)) {
            post.classList.toggle('hide')
          } else {
          }
        });
      });
    })
  });
}
