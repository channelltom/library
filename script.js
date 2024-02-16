const shelf = document.getElementsByClassName(".shelf-container");

var myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = myLibrary.length + 1;

  function cardId() {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(id) {
  console.log(id);
  for (let item of myLibrary) {
    if (item.id === id) {
      console.log("deleting");
    }
  }
}

var shelfElement = document.querySelector("#shelf");
shelfElement.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    console.log("test");
    var children = event.target.parentNode.children;
    for (let item of children) {
      console.log(item);
      if (item.classList == "id") {
        var id = parseInt(item.innerText);
      }
    }
    removeBookFromLibrary(id);
  }
});

function clearBookCards() {
  var books = document.getElementsByClassName("book-card");
  for (let i = 0; i < books.length; i++) {
    console.log("deleting book cards");
    books[i].parentNode.removeChild(books[i]);
  }
}

function createCard(book) {
  var card = document.createElement("div");
  card.classList.add("book-card");
  for (let [key, value] of Object.entries(book)) {
    var newElement = document.createElement("div");
    newElement.classList.add(key);
    newElement.innerText = book[key];
    card.appendChild(newElement);
  }
  var bookBtn = document.createElement("button");
  bookBtn.classList.add("delete");
  bookBtn.innerText = "Delete";
  card.appendChild(bookBtn);
  console.log(book.id);
  document.getElementById("shelf").appendChild(card);
}

function showForm() {
  document.getElementById("form").style.display = "block";
}

function hideForm() {
  document.getElementById("form").style.display = "none";
}

document.getElementById("form").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    var newBook = null;
    const form = event.target;
    const formFields = form.elements;

    const title = formFields.titleField;
    const author = formFields.authorField;
    const pages = formFields.pagesField;
    const isRead = formFields[3];

    var newBook = new Book(
      title.value,
      author.value,
      pages.value,
      isRead.value,
    );

    addBookToLibrary(newBook);
    createCard(newBook);
    // createBookCards(myLibrary);

    hideForm();
  },
  false,
);
