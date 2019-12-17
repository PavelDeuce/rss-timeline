export default (data, document) => {
  console.log(data);
  const { title } = data.dataset;
  const { description } = data.dataset;

  const titleTag = document.querySelector('.modal-title');
  titleTag.textContent = title;

  const bodyTag = document.querySelector('.modal-body');
  bodyTag.textContent = description;
};
