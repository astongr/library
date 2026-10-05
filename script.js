const myLibrary = [];

function Book(title, author, pages, read, cover = "cover-placeholder.svg") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function toggleRead() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read, cover) {
  const newBook = new Book(title, author, pages, read, cover);
  myLibrary.push(newBook);
}

const readGrid = document.querySelector("#read-books-grid");
const unreadGrid = document.querySelector("#unread-books-grid");

function createBookCard(book) {
  const cover = document.createElement("img");
  cover.src = book.cover;
  cover.alt = "Cover of Book";
  cover.classList.add("book-cover");

  const card = document.createElement("div");
  card.classList.add("book-card");

  const content = document.createElement("div");
  content.classList.add("card-content");

  const title = document.createElement("p");
  title.textContent = book.title;
  title.classList.add("book-title");

  const author = document.createElement("p");
  author.textContent = book.author;
  author.classList.add("book-author");

  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  pages.classList.add("book-pages");

  const readStatus = document.createElement("p");
  readStatus.textContent = book.read ? "Already read" : "Not read yet";
  readStatus.classList.add("book-read");

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("card-buttons");

  const removeButton = createRemoveButton(book);
  const toggleButton = createToggleButton(book);

  card.appendChild(cover);
  card.appendChild(content);
  content.appendChild(title);
  content.appendChild(author);
  content.appendChild(pages);
  content.appendChild(readStatus);
  buttonGroup.appendChild(removeButton);
  buttonGroup.appendChild(toggleButton);
  content.appendChild(buttonGroup);
  return card;
}

function createRemoveButton(book) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.dataset.id = book.id;
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", function (e) {
    pendingRemoveId = e.target.dataset.id;
    confirmText.textContent =
      "Are you sure you want to remove " + book.title + "?";
    confirmDialog.showModal();
  });
  return removeButton;
}

function createToggleButton(book) {
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle Read";
  toggleButton.dataset.id = book.id;
  toggleButton.classList.add("toggle-btn");

  toggleButton.addEventListener("click", function (e) {
    const id = e.target.dataset.id;
    const found = myLibrary.find(function (book) {
      return book.id === id;
    });
    found.toggleRead();
    displayBooks();
  });
  return toggleButton;
}

function displayBooks() {
  readGrid.innerHTML = "";
  unreadGrid.innerHTML = "";
  myLibrary.forEach(function (book) {
    const card = createBookCard(book);
    if (book.read) {
      readGrid.appendChild(card);
    } else {
      unreadGrid.appendChild(card);
    }
  });
}

const bookForm = document.querySelector("#book-form");

const bookDialog = document.querySelector("#book-dialog");
const modalButton = document.querySelector("#modal-button");
modalButton.addEventListener("click", function () {
  bookDialog.showModal();
});
const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener("click", function () {
  bookForm.reset();
  bookDialog.close();
});

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const titleValue = document.querySelector("#title").value;
  const authorValue = document.querySelector("#author").value;
  const pagesValue = Number(document.querySelector("#pages").value);
  const readValue = document.querySelector("#read").checked;

  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);

  displayBooks();
  bookForm.reset();
  bookDialog.close();
});

// --- Confirmation modal for removing a book ---
let pendingRemoveId = null;
const confirmDialog = document.querySelector("#confirm-dialog");
const confirmText = document.querySelector("#confirm-text");
const confirmRemoveBtn = document.querySelector("#confirm-remove-btn");
const confirmCancelBtn = document.querySelector("#confirm-cancel-btn");

confirmRemoveBtn.addEventListener("click", function () {
  const index = myLibrary.findIndex(function (book) {
    return book.id === pendingRemoveId;
  });
  myLibrary.splice(index, 1);
  displayBooks();
  confirmDialog.close();
});

confirmCancelBtn.addEventListener("click", function () {
  confirmDialog.close();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true, "hobbit-cover.jpg");
addBookToLibrary("Dune", "Frank Herbert", 412, false, "dune-cover.jpg");
addBookToLibrary(
  "Harry Potter and the Half-Blood Prince",
  "J.K. Rowling",
  607,
  true,
  "harrypotter-cover.jpg",
);
addBookToLibrary(
  "The Name of the Wind",
  "Patrick Rothfuss",
  670,
  true,
  "nameofthewind-cover.jpg",
);
addBookToLibrary(
  "The Wise Man's Fear",
  "Patrick Rothfuss",
  1008,
  false,
  "wisemansfear-cover.jpg",
);
addBookToLibrary("Death Masks", "Jim Butcher", 448, true, "deathmasks-cover.jpg");
addBookToLibrary(
  "Mistborn: The Final Empire",
  "Brandon Sanderson",
  541,
  false,
  "mistborn-cover.jpg",
);
addBookToLibrary(
  "Angels & Demons",
  "Dan Brown",
  624,
  false,
  "angels-demons-cover.jpg",
);

displayBooks();
