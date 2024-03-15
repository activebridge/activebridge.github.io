document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector('.post-content__navigation')
  const headersArr = Array.from(document.querySelectorAll("h2"));

  headersArr.forEach((header) => {
    let linkName = document.createTextNode(header.innerHTML);
    const link = document.createElement('a');
    link.appendChild(linkName);
    header.id = `_${header.id}`;
    link.href = '#' + header.id;
    navbar.appendChild(link)
  })

  scrollToElement();
  copyLink();
  setShareLinks();

  window.addEventListener('scroll', () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          document.querySelector(`a[href="#${id}"]`).classList.add('active');
        } else {
          document.querySelector(`a[href="#${id}"]`).classList.remove('active');
        }
      });
    });

    headersArr.forEach((link) => {
      observer.observe(link);
    });
  });

  function scrollToElement () {
    let navBlock = document.querySelector('.post-content__navigation');

    navBlock.addEventListener("click", function (e) {
      e.preventDefault();

      const elementId = e.target.getAttribute('href');
      const positionOfElement = document.querySelector(elementId).offsetTop;

      window.scrollTo({
        top: positionOfElement - 90,
        behavior: "smooth"
      });
    });
  }

  function copyLink () {
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".modal__close");

    document.querySelector('[data-link="clone"]').addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        const url = e.target.closest('a').getAttribute('href');
        await navigator.clipboard.writeText(url);
        const message = 'Link copied: ' + url;
        addModalMessage (message, modal)
      } catch (error) {
        const message = 'Please try again';
        addModalMessage (message, modal)
      }
    });
    closeButton.addEventListener("click", () => { toggleModal(modal) });
  }
});

function toggleModal (modal) {
  modal.classList.toggle("show-modal");
}

function addModalMessage (message, modal) {
  modal.querySelector('.modal__message').textContent = message;
  toggleModal(modal);
}

function setShareLinks(){
  let links = document.querySelectorAll('[data-link="share"]');

  links.forEach((link) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const width = 800;
      const height = 600;
      const left = (window.screen.width / 2) - (width / 2);
      const top = (window.screen.height / 2) - (height / 2);

      window.open(this.getAttribute('href'), '', [
        'scrollbars=yes',
        'width=' + width,
        'height=' + height,
        'top=' + top,
        'left=' + left,
      ]);
    });
  });
}
