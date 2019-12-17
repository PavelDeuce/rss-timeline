import validator from 'validator';
import WatchJS from 'melanke-watchjs';
import axios from 'axios';
import rssParser from './rssParser';
import rssRender from './rssRender';
import renderModal from './renderModal';

const { watch } = WatchJS;

const corsUrl = 'https://cors-anywhere.herokuapp.com/';
const updateInterval = 5000;

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
  const modalWindow = document.querySelector('#modal-window');

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

  const rssLoad = (link, interval = updateInterval) => {
    axios.get(`${corsUrl}${link}`)
      .then(({ data }) => {
        const parsedData = rssParser(data);
        const renderedData = rssRender(parsedData);
        rssFlow.innerHTML = renderedData.join('\n');
        inputUrl.value = '';
        state.enteredSources = [...state.enteredSources, link];
      })
      .then(() => {
        setTimeout(() => {
          rssLoad(link);
        }, interval);
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

  rssFlow.addEventListener('click', (event) => {
    renderModal(event.target, modalWindow);
  });

  watch(state, 'error', () => {
    if (state.error) {
      loadingContainer.classList.remove('d-none');
      buttonSubmit.setAttribute('disabled', 'disabled');
    }
  });
};
