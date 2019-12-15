const rssContainer = document.querySelector('#rss-container');

export default (data) => data.map((item) => {
  const newContainer = rssContainer.cloneNode(true);

  const title = document.createElement('h2');
  title.classList.add('text-center');
  title.innerText = item.title;

  const link = document.createElement('a');
  link.setAttribute('href', item.link);
  link.classList.add('text-right');
  link.innerText = 'Source';

  const description = document.createElement('p');
  description.innerText = item.description;

  newContainer.appendChild(title);
  newContainer.appendChild(description);
  newContainer.appendChild(link);

  return newContainer.outerHTML;
});
