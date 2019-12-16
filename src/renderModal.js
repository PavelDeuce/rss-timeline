export default (data, document) => {
  const title = data.dataset.title;
  const description = data.dataset.description;

  const titleTag = document.querySelector('.modal-title');
  titleTag.textContent = title;

  const bodyTag = document.querySelector('.modal-body');
  bodyTag.textContent = description;
};
