import { rssLoad } from './contollers';

const inputUrl = document.querySelector('#input-url');

const inputValidation = (state) => {
  const buttonSubmit = document.querySelector('#button-submit');

  buttonSubmit.disabled = !state.isValidInput;
  if (state.isValidInput) {
    inputUrl.classList.add('is-valid');
    inputUrl.classList.remove('is-invalid');
  } else {
    inputUrl.classList.add('is-invalid');
    inputUrl.classList.remove('is-valid');
  }
};

const formSubmit = (state) => (event) => {
  event.preventDefault();

  const currentState = state;
  const { value } = event.target['input-url'];
  currentState.link = value;
  rssLoad(currentState);
};

const findFeed = (state) => (event) => {
  const currentState = state;
  const { target } = event;

  currentState.modalData = currentState.allFeeds.find((feed) => feed.link === target.dataset.href);
};

export {
  inputValidation,
  formSubmit,
  findFeed,
};
