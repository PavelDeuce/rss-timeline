const domParser = new DOMParser();

export default (data, state) => {
  const xml = domParser.parseFromString(data, 'application/xml');
  const items = xml.querySelectorAll('item');
  const description = xml.querySelector('channel > title').textContent;
  const title = xml.querySelector('channel > description').textContent;

  const mappedItems = [...items].map((item) => ({
    link: item.querySelector('link').textContent,
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
  }));
  return {
    feed: {
      link: state.link,
      title,
      description,
    },
    mappedItems,
  };
};
