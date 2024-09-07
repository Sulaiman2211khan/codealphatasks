let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add a book to the library
const addBookToLibrary = () => {
  let notification = alert("Add your book details");
  let name = String(prompt("Add your book name?"));
  let author = String(prompt("Add the author?"));

  let pages = parseInt(prompt("Add the pages?"));
  if (Number.isNaN(pages)) {
    return 0;
  }
  let read = String(prompt("What is your reading status?"));
  let newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
};

// Function to display the library
const displayLibrary = (library) => {
  let table = document.getElementById("tableData");
  table.innerHTML = ''; // Clear table before displaying data

  library.forEach((book, index) => {
    let row = table.insertRow(index);
    row.insertCell(0).innerHTML = book.name;
    row.insertCell(1).innerHTML = book.author;
    row.insertCell(2).innerHTML = book.pages;
    row.insertCell(3).innerHTML = book.read;
  });
};

// Search functionality
const searchByName = () => {
  let searchValue = document.getElementById("searchName").value.toLowerCase();
  let filteredBooks = myLibrary.filter(book => book.name.toLowerCase().includes(searchValue));
  displayLibrary(filteredBooks);
};

const searchByAuthor = () => {
  let searchValue = document.getElementById("searchAuthor").value.toLowerCase();
  let filteredBooks = myLibrary.filter(book => book.author.toLowerCase().includes(searchValue));
  displayLibrary(filteredBooks);
};

// Event listeners
document.getElementById("dataButton").addEventListener("click", addBookToLibrary);
document.getElementById("showButton").addEventListener("click", () => displayLibrary(myLibrary));
document.getElementById("searchNameButton").addEventListener("click", searchByName);
document.getElementById("searchAuthorButton").addEventListener("click", searchByAuthor);

// Delete the first row of the table (as per your delete function)
const myDeleteFunction = () => {
  let table = document.getElementById("tableData");
  if (table.rows.length > 0) {
    table.deleteRow(0);
  }
};
