import axios from 'axios';
import _ from 'lodash';
import processRSS from './rssHandler';
import {
  isSourceExist,
  findSource,
  isFeedExist,
} from './utils';

const loadRSS = (state) => {
  const corsUrl = 'https://cors-anywhere.herokuapp.com';
  const updateInterval = 5000;
  const currentState = state;

  return axios.get(`${corsUrl}/${state.link}`)
    .then(({ data }) => {
      const { link } = currentState;
      const processedData = processRSS(data, link);

      if (!isSourceExist(currentState)) {
        currentState.enteredSources = [...currentState.enteredSources, processedData.feed];
        currentState.allFeeds = [...processedData.mappedItems, ...state.allFeeds];
      } else {
        const updatedSource = findSource(currentState);
        const [latestSource] = _.differenceWith(
          processedData.mappedItems, updatedSource.mapppedItems, _.isEqual,
        );
        const isNewFeedAdded = latestSource && !isFeedExist(state, latestSource);
        if (isNewFeedAdded) {
          currentState.allFeeds = [latestSource, ...state.allFeeds];
        }
      }
    })
    .then(() => setTimeout(loadRSS, updateInterval, currentState));
};

export default loadRSS;
