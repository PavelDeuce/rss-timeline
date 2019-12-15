const domParser = new DOMParser();

export default (data) => {
  const xml = domParser.parseFromString(data, 'application/xml');
  const items = xml.querySelectorAll('item');
  return Array.from(items).map((item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    return { title, link, description };
  });
};
