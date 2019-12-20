const renderInputValidation = (state) => {
  const inputUrl = document.querySelector('#input-url');
  const buttonSubmit = document.querySelector('#button-submit');

  if (state.isValidInput) {
    buttonSubmit.removeAttribute('disabled');
    inputUrl.classList.remove('is-invalid');
    inputUrl.classList.add('is-valid');
  } else {
    buttonSubmit.setAttribute('disabled', 'disabled');
    inputUrl.classList.add('is-invalid');
    inputUrl.classList.remove('is-valid');
  }
};

const renderFeeds = (state) => {
  const rssFlow = document.querySelector('#rss-flow');
  const feeds = state.allFeeds.map(({ title, link }) => (
    `
    <div class="col-sm-6 mb-3">
    <div class="card">
      <div class="card-header">
        <h5>${title}</h5>
      </div>
      <div class="card-body">
        <button data-href=${link} class="btn btn-primary w-100" data-toggle="modal" data-target="#modal-window">Learn more</button>
      </div>
      <div>
        <a href=${link} class="ml-2">source</a>
      </div>
    </div>
    </div>
    `
  ));
  rssFlow.innerHTML = feeds.join('');
};

const renderSources = (state) => {
  const subscriptionsList = document.querySelector('#feed-subscriptions');
  const subscriptions = state.enteredSources.map((source) => (
    `
    <div class="mb-5">
      <h6>${source.title}</h6>
      <p>${source.description}</p>
    </div>
    `
  ));
  subscriptionsList.innerHTML = subscriptions.join('');
};

const renderModal = (state) => {
  const feedModalTitle = document.querySelector('#feed-modal-title');
  const feedModalBody = document.querySelector('#feed-modal-body');

  feedModalTitle.textContent = state.modalData.title;
  feedModalBody.textContent = state.modalData.description;
};

const renderError = (state) => {
  const errorDelay = 10000;

  const loadingContainer = document.querySelector('#loading-container');
  const buttonSubmit = document.querySelector('#button-submit');
  const sourceForm = document.querySelector('#source-form');

  if (state.loading.status === 'failed') {
    const errorContainer = `
      <div class="d-flex justify-content-center">
        <p>Something went wrong:</p>
        <p>${state.loading.errorMessage}</p>
      </div>
    `;
    buttonSubmit.setAttribute('disabled', 'disabled');
    loadingContainer.innerHTML = errorContainer;
    setTimeout(() => {
      window.location.reload();
    }, errorDelay);
  } else if (state.loading.status === 'success') {
    sourceForm.reset();
  }
};

export {
  renderFeeds,
  renderSources,
  renderModal,
  renderInputValidation,
  renderError,
};
