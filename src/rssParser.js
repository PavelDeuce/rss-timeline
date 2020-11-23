export const getDomDocument = (data) => {
  const domParser = new DOMParser();
  return domParser.parseFromString(data, 'application/xml');
};

export default (data, value) => {
  const doc = getDomDocument(data);

  const items = doc.querySelectorAll('item');
  const title = doc.querySelector('channel > description').textContent;
  const description = doc.querySelector('channel > title').textContent;

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
