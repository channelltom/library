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
    var bookCard = event.target.parentElement.parentElement;
    for (let item of bookCard.children) {
      if (item.classList == "id") {
        var id = parseInt(item.innerText);
      }
    }
    bookCard.remove();
    removeBookFromLibrary(id);
  }
  if (event.target.classList.contains("toggle")) {
    console.log("toggle button");
    if (event.target.innerText === "Read") {
      event.target.innerText = "Unread";
    } else {
      event.target.innerText = "Read";
    }
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
  console.log(book);
  for (let [key, value] of Object.entries(book)) {
    var newElement = document.createElement("div");
    newElement.classList.add(key);
    newElement.innerText = value;
    if (key === "title") {
      newElement.style.fontWeight = "800";
    } else if (key === "author") {
      newElement.innerText = `by ${value}`;
    } else if (key === "pages") {
      newElement.innerText = `${value} pages`;
    }
    if (key === "id" || key === "read") {
      newElement.style.display = "none";
    }
    card.appendChild(newElement);
  }
  var btnContainer = document.createElement("div");
  var delBtn = document.createElement("button");
  var readToggle = document.createElement("button");
  btnContainer.classList.add("btn-container");
  delBtn.classList.add("delete");
  delBtn.innerText = "Delete";
  readToggle.classList.add("toggle");
  readToggle.innerText = book.read;
  btnContainer.appendChild(delBtn);
  btnContainer.appendChild(readToggle);
  card.appendChild(btnContainer);
  document.getElementById("shelf").appendChild(card);
}

const modal = document.querySelector(".form-modal");
const addbtn = document.querySelector(".add-btn");

addbtn.addEventListener("click", () => {
  modal.showModal();
  showForm();
});

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
    var isRead = formFields[3].checked;
    console.log(isRead);
    if (isRead) {
      var readValue = "Read";
    } else {
      var readValue = "Unread";
    }

    var newBook = new Book(title.value, author.value, pages.value, readValue);

    addBookToLibrary(newBook);
    createCard(newBook);

    modal.close();
  },
  false,
);
