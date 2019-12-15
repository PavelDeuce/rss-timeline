import validator from 'validator';
import WatchJS from 'melanke-watchjs';
import axios from 'axios';
import rssParser from './rssParser';
import rssRender from './rssRender';

const { watch } = WatchJS;

const corsUrl = 'https://cors-anywhere.herokuapp.com/';

export default () => {
  const state = {
    isValidInput: true,
    enteredSources: [],
    error: null,
  };

  const inputUrl = document.querySelector('#field-url');
  const buttonSubmit = document.querySelector('#button-submit');
  const sourceForm = document.querySelector('#source-form');
  const rssFlow = document.querySelector('#rss-flow');
  const loadingContainer = document.querySelector('#loading-container');

  inputUrl.addEventListener('input', () => {
    const { value } = inputUrl;
    const isEnteredSource = (source) => state.enteredSources.includes(source);
    state.isValidInput = validator.isURL(value) && !isEnteredSource(value);
  });

  watch(state, 'isValidInput', () => {
    buttonSubmit.disabled = !state.isValidInput;
    if (state.isValidInput) {
      inputUrl.classList.remove('border-danger');
    } else {
      inputUrl.classList.add('border-danger');
    }
  });

  const rssLoad = (link) => {
    axios.get(`${corsUrl}${link}`)
      .then(({ data }) => {
        const parsedData = rssParser(data);
        const renderedData = rssRender(parsedData);
        rssFlow.innerHTML = renderedData.join('\n');
        inputUrl.value = '';
        state.enteredSources = [...state.enteredSources, link];
      })
      .catch((error) => {
        state.error = error;
      });
  };

  sourceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = inputUrl;
    rssLoad(value);
  });

  watch(state, 'error', () => {
    if (state.error) {
      loadingContainer.classList.remove('d-none');
      buttonSubmit.setAttribute('disabled', 'disabled');
    }
  });
};
