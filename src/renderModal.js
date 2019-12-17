export default (data, document) => {
  const { title } = data.dataset;
  const { description } = data.dataset;

  const titleTag = document.querySelector('.modal-title');
  titleTag.textContent = title;

  const bodyTag = document.querySelector('.modal-body');
  bodyTag.textContent = description;
};
