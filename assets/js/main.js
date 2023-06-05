const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const form = document.querySelector('form');
const booksListElement = document.querySelector('.listOfBooks');

let listOfBooks = [];

const storeToLocalStorage = () => {
  const listInJson = JSON.stringify(listOfBooks);
  localStorage.setItem('books', listInJson);
};

const removeElement = (id) => {
  listOfBooks = listOfBooks.filter((el) => el.id !== id);
  document.getElementById(id).remove();
  storeToLocalStorage();
};

const bookElement = (title, author, id) => {
  const element = document.createElement('li');
  element.id = id;
  element.innerHTML = `
      <p>${title}</p>
      <p>${author}</p>
      <button>remove</button>
      <hr>
  `;
  element.querySelector('button').addEventListener('click', () => removeElement(id));
  return element;
};

const printElements = () => {
  booksListElement.innerHTML = '';
  listOfBooks.forEach((el) => {
    booksListElement.appendChild(bookElement(el.title, el.author, el.id));
  });
};

const addToList = (title, author) => {
  listOfBooks.push({
    title,
    author,
    id: new Date().toISOString(),
  });

  printElements();
  titleInput.value = null;
  authorInput.value = null;
  storeToLocalStorage();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (titleInput.value.trim().length === 0 || authorInput.value.trim().length === 0) {
    alert('No value provided');
    return;
  }
  addToList(titleInput.value, authorInput.value);
});

window.addEventListener('load', () => {
  const getFromLocalStorage = JSON.parse(localStorage.getItem('books'));
  if (getFromLocalStorage) {
    listOfBooks = getFromLocalStorage;
    printElements();
  }
});
