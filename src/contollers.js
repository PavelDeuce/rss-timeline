import validator from 'validator';
import axios from 'axios';
import _ from 'lodash';
import rssParser from './rssParser';
import {
  isEnteredSource,
  isSourceExist,
  findSource,
  isFeedExist,
} from './utils';

const checkInput = (event, state) => {
  const currentState = state;
  const { value } = event.target;
  currentState.isValidInput = validator.isURL(value) && !isEnteredSource(currentState, value);
};

const rssLoad = (state) => {
  const corsUrl = 'https://cors-anywhere.herokuapp.com';
  const updateInterval = 5000;
  const currentState = state;

  return axios.get(`${corsUrl}/${state.link}`)
    .then(({ data }) => {
      const parsedData = rssParser(data, currentState);

      if (!isSourceExist(currentState)) {
        currentState.enteredSources = [...currentState.enteredSources, parsedData.feed];
        currentState.allFeeds = [...parsedData.mappedItems, ...state.allFeeds];
      } else {
        const updatedSource = findSource(currentState);
        const [latestSource] = _.differenceWith(
          parsedData.mappedItems, updatedSource.mapppedItems, _.isEqual,
        );
        const isNewFeedAdded = latestSource && !isFeedExist(state, latestSource);
        if (isNewFeedAdded) {
          currentState.allFeeds = [latestSource, ...state.allFeeds];
          console.log('gay');
        }
      }
    })
    .then(() => setTimeout(rssLoad, updateInterval, currentState))
    .catch((error) => {
      currentState.errorMessage = error;
    });
};

export {
  checkInput,
  rssLoad,
};
