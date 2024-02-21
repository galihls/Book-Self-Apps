let books = JSON.parse(localStorage.getItem("books")) || [];

const form = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const isCompleteInput = document.querySelector("#isComplete");
const incompleteBooks = document.querySelector("#incomplete-books");
const completedBooks = document.querySelector("#completed-books");
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterBooks);

function renderBooks() {
  incompleteBooks.innerHTML = "";
  completedBooks.innerHTML = "";

  for (const book of books) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.dataset.id = book.id;
    bookElement.innerHTML = `
                        <h3>${book.title}</h3>
                        <p>${book.author}, ${book.year}</p>
                        <button onclick="deleteBook('${
                          book.id
                        }')">Delete</button>
                        <button onclick="toggleComplete('${book.id}')">${
      book.isComplete ? "Mark as incomplete" : "Mark as complete"
    }</button>
                `;

    if (book.isComplete) {
      completedBooks.appendChild(bookElement);
    } else {
      incompleteBooks.appendChild(bookElement);
    }
  }
}

function filterBooks() {
  const searchValue = searchInput.value.toLowerCase();

  for (const book of books) {
    const bookElement = document.querySelector(`.book[data-id='${book.id}']`);
    const title = book.title.toLowerCase();

    if (bookElement) {
      if (title.indexOf(searchValue) > -1) {
        bookElement.style.display = "";
      } else {
        bookElement.style.display = "none";
      }
    }
  }
}

function addBook(e) {
  e.preventDefault();

  const newBook = {
    id: +new Date(),
    title: titleInput.value,
    author: authorInput.value,
    year: parseInt(yearInput.value),
    isComplete: isCompleteInput.checked,
  };

  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  form.reset();
  renderBooks();
}

function deleteBook(id) {
  books = books.filter((book) => book.id !== +id);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

function toggleComplete(id) {
  const book = books.find((book) => book.id === +id);
  book.isComplete = !book.isComplete;
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

form.addEventListener("submit", addBook);
window.addEventListener("load", renderBooks);
