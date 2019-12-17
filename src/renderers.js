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

  if (state.errorMessage) {
    const errorContainer = `
      <div class="d-flex justify-content-center">
        <p>Something went wrong:</p>
        <p>${state.errorMessage}</p>
      </div>
    `;
    buttonSubmit.setAttribute('disabled', 'disabled');
    loadingContainer.innerHTML = errorContainer;
    setTimeout(() => {
      window.location.reload();
    }, errorDelay);
  }
};

export {
  renderFeeds,
  renderSources,
  renderModal,
  renderError,
};
