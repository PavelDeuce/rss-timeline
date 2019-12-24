const domParser = new DOMParser();

export default (data, value) => {
  const xml = domParser.parseFromString(data, 'application/xml');
  const items = xml.querySelectorAll('item');

  const title = xml.querySelector('channel > description').textContent;
  const description = xml.querySelector('channel > title').textContent;

  const mappedItems = [...items].map((item) => ({
    link: item.querySelector('link').textContent,
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
  }));
  return {
    feed: {
      link: value,
      title,
      description,
    },
    mappedItems,
  };
};
