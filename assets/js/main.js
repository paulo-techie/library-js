const addbookForm    = document.querySelector('#addbook-form');
const addbookBtn     = document.querySelector('#addbook-btn');
const booksContainer = document.querySelector('#books-list');

const storedLibrary = JSON.parse(localStorage.getItem('library')) || [];

let myLibrary = storedLibrary.map(({ author, title, pages, readStatus }) => {
  return new Book(author, title, pages, readStatus);
});

function renderBook(book) {
  const rootNode = bookRenderer.createStructure({
    onRemove() {
      myLibrary = myLibrary.filter(item => item !== book);
      localStorage.setItem('library', JSON.stringify(myLibrary));
      rootNode.remove();
    },
    onReadToggle() {
      book.toggleRead();
      localStorage.setItem('library', JSON.stringify(myLibrary));
      bookRenderer.update(rootNode, book);
    }
  });

  booksContainer.appendChild(rootNode);
  bookRenderer.update(rootNode, book);
}

myLibrary.forEach((book) => renderBook(book));

function addBookToLibrary({ title, pages, author, readStatus }) {
  const book = new Book(author, title, pages, readStatus);

  myLibrary.push(book);
  localStorage.setItem('library', JSON.stringify(myLibrary));

  renderBook(book);
}

addbookBtn.addEventListener('click', () => {
  addbookForm.style.display = 'block';
});

addbookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const author     = document.querySelector('#author'),
        title      = document.querySelector('#title'),
        pages      = document.querySelector('#pages'),
        readStatus = document.querySelector('#readStatus');

  addBookToLibrary({
    author: author.value,
    title: title.value,
    pages: pages.value,
    readStatus: readStatus.checked,
  });

  author.value       = title.value = pages.value = '';
  readStatus.checked = false;
});
