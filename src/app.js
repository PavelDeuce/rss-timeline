import { watch } from 'melanke-watchjs';
import { formSubmit, findFeed, checkInput } from './handlers';
import {
  renderFeeds,
  renderSources,
  renderModal,
  renderInputValidation,
  renderError,
} from './renderers';

export default () => {
  const state = {
    isValidInput: false,
    enteredSources: [],
    allFeeds: [],
    loading: {
      status: '',
      errorMessage: '',
    },
    link: '',
    modalData: {
      title: '',
      description: '',
    },
  };

  const sourceForm = document.querySelector('#source-form');
  const inputUrl = document.querySelector('#input-url');
  const rssFlow = document.querySelector('#rss-flow');

  watch(state, 'isValidInput', () => renderInputValidation(state));
  watch(state, 'allFeeds', () => renderFeeds(state));
  watch(state, 'modalData', () => renderModal(state));
  watch(state, 'enteredSources', () => renderSources(state));
  watch(state, 'loading', () => renderError(state));

  inputUrl.addEventListener('input', (event) => checkInput(event, state));
  rssFlow.addEventListener('click', findFeed(state));
  sourceForm.addEventListener('submit', formSubmit(state));
};
