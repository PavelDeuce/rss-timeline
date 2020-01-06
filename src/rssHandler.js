export default (rssDocument, value) => {
  const items = rssDocument.querySelectorAll('item');
  const title = rssDocument.querySelector('channel > description').textContent;
  const description = rssDocument.querySelector('channel > title').textContent;

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
