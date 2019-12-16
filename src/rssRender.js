const rssContainer = document.querySelector('#rss-container');

export default (data) => data.map((item) => {
  const newContainer = document.createElement('div');
  newContainer.classList.add('card', 'card-body');

  const title = document.createElement('h2');
  title.classList.add('text-center');
  title.innerText = item.title;

  const link = document.createElement('a');
  link.setAttribute('href', item.link);
  link.classList.add('text-right');
  link.innerText = 'Source';

  const modalButton = document.createElement('button');
  modalButton.setAttribute('type', 'button');
  modalButton.setAttribute('value', 'Learn more');
  modalButton.setAttribute('data-toggle', 'modal');
  modalButton.setAttribute('data-target', '#modal-window');
  modalButton.setAttribute('tabindex', '0');
  modalButton.setAttribute('data-description', item.description);
  modalButton.setAttribute('data-title', item.title);
  modalButton.classList.add('btn', 'btn-primary', 'btnModal');

  newContainer.appendChild(title);
  newContainer.appendChild(modalButton);
  newContainer.appendChild(link);

  return newContainer.outerHTML;
});
