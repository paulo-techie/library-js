const bookRenderer = {
  createStructure(callbacks = {}) {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const titleDiv = document.createElement('h5');
    const contentDiv = document.createElement('p');
    const removeButton = document.createElement('button');
    const readStatusToggleButton = document.createElement('button');

    removeButton.innerHTML = 'Remove';

    card.classList.add('card', 'my-3');
    cardBody.classList.add('card-body');
    titleDiv.classList.add('title', 'card-title');
    contentDiv.classList.add('content', 'card-text');
    removeButton.classList.add('remove', 'btn', 'btn-danger', 'mr-2');
    readStatusToggleButton.classList.add('toggle-read-status', 'btn', 'btn-warning');


    card.appendChild(cardBody);
    cardBody.appendChild(titleDiv);
    cardBody.appendChild(contentDiv);
    cardBody.appendChild(removeButton);
    cardBody.appendChild(readStatusToggleButton);

    removeButton.addEventListener('click', () => {
      if (callbacks.onRemove) {
        callbacks.onRemove();
      }
    });

    readStatusToggleButton.addEventListener('click', () => {
      if (callbacks.onReadToggle) {
        callbacks.onReadToggle();
      }
    });

    return card;
  },

  update(rootNode, book) {
    const titleDiv = rootNode.querySelector('.title');
    const contentDiv = rootNode.querySelector('.content');
    const readStatusButton = rootNode.querySelector('.toggle-read-status');

    titleDiv.innerHTML = `${book.title} (${book.readStatus ? 'Read' : 'Not Read'})`;
    contentDiv.innerHTML = `By ${book.author}<br /> ${book.pages} pages.`;
    readStatusButton.innerHTML = book.readStatus ? 'Set as unread' : 'Set as read';
  },
};

export default bookRenderer;