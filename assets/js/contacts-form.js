window.onload = () => {
  document.getElementById("contactsForm").addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('contactEmail');
    formData.delete('contactEmail');

    let queryParams = new URLSearchParams(formData).toString().replace(/\+/g, '%20');
    window.location.href = `mailto:${email}?${queryParams}`;
    e.target.reset();
  });
};
