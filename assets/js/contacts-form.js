const closeModal = () => { window.modalwindow.close() }

window.contactsForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let modal = window.modalwindow;
  const formData = new FormData(this);
  fetch(this.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('body')
    })
  })
  .then(response => response.text())
  .then(data => {
    modal.showModal();
    modal.querySelector('.message').textContent = data;
    this.reset();
  })
  .catch(error => console.error('Error:', error));
});
