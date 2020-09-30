
const bookRenderer = {
  createStructure(callbacks = {}) {
    const bookDiv                = document.createElement('div'),
          titleDiv               = document.createElement('div'),
          authorDiv              = document.createElement('div'),
          pagesDiv               = document.createElement('div'),
          readStatusDiv          = document.createElement('div'),
          removeButton           = document.createElement('button'),
          readStatusToggleButton = document.createElement('button');
  
    removeButton.innerHTML = 'Remove';
  
    titleDiv.classList.add('title');
    authorDiv.classList.add('author');
    pagesDiv.classList.add('pages');
    readStatusDiv.classList.add('read-status');
    removeButton.classList.add('remove');
    readStatusToggleButton.classList.add('toggle-read-status');

  
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readStatusDiv);
    bookDiv.appendChild(removeButton);
    bookDiv.appendChild(readStatusToggleButton);
  
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
  
    return bookDiv;
  },

  update(rootNode, book) {
    const titleDiv         = rootNode.querySelector('.title'),
          authorDiv        = rootNode.querySelector('.author'),
          pagesDiv         = rootNode.querySelector('.pages'),
          readStatusDiv    = rootNode.querySelector('.read-status'),
          readStatusButton = rootNode.querySelector('.toggle-read-status');

    titleDiv.innerHTML         = book.title;
    authorDiv.innerHTML        = book.author;
    pagesDiv.innerHTML         = book.pages;
    readStatusDiv.innerHTML    = book.readStatus ? 'Read' : 'Not Read';
    readStatusButton.innerHTML = book.readStatus ? 'Set as unread' : 'Set as read';
  }
};