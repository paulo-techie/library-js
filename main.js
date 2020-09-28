let myLibrary = [];

const addbookForm = document.querySelector('#addbook-form');
const addbookBtn = document.querySelector('#addbook-btn');
const submitBtn = document.querySelector('#submit-btn');

addbookForm.style.display = "none";

addbookBtn.addEventListener('click', function() {
  addbookForm.style.display = "block";
});
submitBtn.addEventListener('click', function(e)  {
  addBookToLibrary;
  e.preventDefault();
});

function Book(author, title, pages, readStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const pages = document.querySelector('#pages').value;
  const readStatus = document.querySelector('#readStatus').checked;
  myLibrary.push(new Book(author, title, pages, readStatus));
}