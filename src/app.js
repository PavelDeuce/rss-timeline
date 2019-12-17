import { watch } from 'melanke-watchjs';
import { inputValidation, formSubmit, findFeed } from './handlers';
import { checkInput } from './contollers';
import {
  renderFeeds,
  renderSources,
  renderModal,
  renderError,
} from './renderers';

const sourceForm = document.querySelector('#source-form');
const inputUrl = document.querySelector('#input-url');
const rssFlow = document.querySelector('#rss-flow');

export default () => {
  const state = {
    isValidInput: true,
    enteredSources: [],
    allFeeds: [],
    errorMessage: '',
    link: '',
    modalData: {
      title: '',
      description: '',
    },
  };

  watch(state, 'isValidInput', () => inputValidation(state));
  watch(state, 'allFeeds', () => renderFeeds(state));
  watch(state, 'modalData', () => renderModal(state));
  watch(state, 'enteredSources', () => renderSources(state));
  watch(state, 'errorMessage', () => renderError(state));

  inputUrl.addEventListener('input', (event) => checkInput(event, state));
  rssFlow.addEventListener('click', findFeed(state));
  sourceForm.addEventListener('submit', formSubmit(state));
};
