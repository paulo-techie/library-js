let myLibrary = [];

const addbookForm = document.querySelector('#addbook-form');
const addbookBtn = document.querySelector('#addbook-btn');
const submitBtn = document.querySelector('#submit-btn');
const booksContainer = document.querySelector('#books-list');

addbookForm.style.display = 'none';

function Book(author, title, pages, readStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
  this.node = null;
  this.removeCallback = null;
}

Book.prototype.initializeHTML = function initializeHTML() {
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const pagesDiv = document.createElement('div');
  const readStatusDiv = document.createElement('div');
  const removeButton = document.createElement('button');
  const readStatusToggleButton = document.createElement('button');

  removeButton.innerHTML = 'Remove';
  readStatusToggleButton.innerHTML = 'Toggle read';

  titleDiv.classList.add('title');
  authorDiv.classList.add('author');
  pagesDiv.classList.add('pages');
  readStatusDiv.classList.add('read-status');
  removeButton.classList.add('remove');
  readStatusToggleButton.classList.add('toggle-read-status');

  removeButton.innerHTML = 'Remove';

  bookDiv.appendChild(titleDiv);
  bookDiv.appendChild(authorDiv);
  bookDiv.appendChild(pagesDiv);
  bookDiv.appendChild(readStatusDiv);
  bookDiv.appendChild(removeButton);
  bookDiv.appendChild(readStatusToggleButton);

  removeButton.addEventListener('click', () => {
    bookDiv.parentNode.removeChild(bookDiv);
    if (this.removeCallback) {
      this.removeCallback(this);
    }
  });

  readStatusToggleButton.addEventListener('click', () => {
    this.toggleRead();
    this.updateHTML();
  });

  this.node = bookDiv;
};

Book.prototype.toggleRead = function toggleRead() {
  this.readStatus = !this.readStatus;
};

Book.prototype.onRemove = function onRemove(callback) {
  this.removeCallback = callback;
};

Book.prototype.updateHTML = function render() {
  const titleDiv = this.node.querySelector('.title');
  const authorDiv = this.node.querySelector('.author');
  const pagesDiv = this.node.querySelector('.pages');
  const readStatusDiv = this.node.querySelector('.read-status');
  const readStatusButton = this.node.querySelector('.toggle-read-status');

  titleDiv.innerHTML = this.title;
  authorDiv.innerHTML = this.author;
  pagesDiv.innerHTML = this.pages;
  readStatusDiv.innerHTML = this.readStatus ? 'Read' : 'Not Read';
  readStatusButton.innerHTML = this.readStatus ? 'Set as unread' : 'Set as read';
};

Book.prototype.renderIn = function renderIn(parent) {
  parent.appendChild(this.node);
};

Book.prototype.remove = function remove() {
  const bookContainer = booksContainer.querySelector(`data-id=["${this.id}"]`);
  bookContainer.parentNode.removeChild(bookContainer);
};

function addBookToLibrary() {
  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const pages = document.querySelector('#pages').value;
  const readStatus = document.querySelector('#readStatus').checked;
  const book = new Book(author, title, pages, readStatus);

  book.initializeHTML();
  book.updateHTML(booksContainer);
  book.renderIn(booksContainer);
  book.onRemove((book) => {
    myLibrary = myLibrary.filter(item => item !== book);
  });
  myLibrary.push(book);
}

addbookBtn.addEventListener('click', () => {
  addbookForm.style.display = 'block';
});
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
});
