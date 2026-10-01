const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function toggleRead() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const libraryContainer = document.querySelector("#library");

function displayBooks() {
  libraryContainer.innerHTML = "";
  myLibrary.forEach(function (book) {
    const card = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;

    const readStatus = document.createElement("p");
    readStatus.textContent = book.read ? "Already read" : "Not read yet";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.dataset.id = book.id;

    removeButton.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      const index = myLibrary.findIndex(function (book) {
        return book.id === id;
      });
      myLibrary.splice(index, 1);
      displayBooks();
    });

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Read";
    toggleButton.dataset.id = book.id;

    toggleButton.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      const found = myLibrary.find(function (book) {
        return book.id === id;
      });
      found.toggleRead();
      displayBooks();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readStatus);
    card.appendChild(removeButton);
    card.appendChild(toggleButton);

    libraryContainer.appendChild(card);
  });
}

const bookForm = document.querySelector("#book-form");

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const titleValue = document.querySelector("#title").value;
  const authorValue = document.querySelector("#author").value;
  const pagesValue = Number(document.querySelector("#pages").value);
  const readValue = document.querySelector("#read").checked;

  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);

  displayBooks();
  bookForm.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
