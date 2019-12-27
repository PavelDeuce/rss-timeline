const isEnteredSource = (state, source) => state.enteredSources.some(
  (feed) => feed.link === source,
);
const isSourceExist = (state) => state.enteredSources.some(
  (feed) => feed.link === state.link,
);

const isFeedExist = (state, latestSource) => latestSource
 && state.allFeeds.some((feed) => feed.link === latestSource.link);

const findSource = (state) => state.enteredSources.find((source) => source.link === state.link);

const parseRSS = (data) => {
  const domParser = new DOMParser();
  return domParser.parseFromString(data, 'application/xml');
};

export {
  isEnteredSource,
  isSourceExist,
  isFeedExist,
  findSource,
  parseRSS,
};
