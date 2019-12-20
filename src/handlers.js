import validator from 'validator';
import loadRSS from './rssLoader';
import { isEnteredSource } from './utils';

const checkInput = (event, state) => {
  const currentState = state;
  const { value } = event.target;
  currentState.isValidInput = validator.isURL(value) && !isEnteredSource(currentState, value);
};

const formSubmit = (state) => (event) => {
  event.preventDefault();

  const currentState = state;
  const { value } = event.target['input-url'];
  currentState.link = value;

  loadRSS(currentState)
    .then(() => {
      currentState.loading.status = 'success';
    })
    .catch((error) => {
      currentState.loading.status = 'failed';
      currentState.loading.errorMessage = error;
    });
};

const findFeed = (state) => (event) => {
  const currentState = state;
  const { target } = event;

  currentState.modalData = currentState.allFeeds.find((feed) => feed.link === target.dataset.href);
};

export {
  checkInput,
  formSubmit,
  findFeed,
};
