function Book(author, title, pages, readStatus) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.toggleRead = function toggleRead() {
  this.readStatus = !this.readStatus;
};

export default Book;