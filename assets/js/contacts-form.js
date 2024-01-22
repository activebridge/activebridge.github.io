document.addEventListener("DOMContentLoaded", sendEmail);

function sendEmail() {
  document.getElementById("contacts-form").addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    let mailtoLink = 'mailto:katatsu12@gmail.com?';

    for (let [key, value] of formData.entries()) {
      mailtoLink += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }

    mailtoLink = mailtoLink.slice(0, -1);

    window.location.href = mailtoLink;
    e.target.reset();
  });
}
