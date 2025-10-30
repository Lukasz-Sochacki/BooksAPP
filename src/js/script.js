const select = {
  templateOf: {
    book: '#template-book',
  },
  containerOf: {
    book: '.books-list',
  },
  images: {
    book: '.book__image',
  },
};

const classNames = {
  book: {
    favoriteBook: 'favorite',
  },
};

const templates = {
  bookList: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

const render = function () {
  for (let book in dataSource.books) {
    let booksElements = dataSource.books[book];

    const generatedHTML = templates.bookList(booksElements);

    booksElements = utils.createDOMFromHTML(generatedHTML);

    const bookContainer = document.querySelector(select.containerOf.book);

    bookContainer.appendChild(booksElements);
  }
};

render();

const initActions = function () {
  const favoriteBooks = [];

  const bookList = document.querySelector(select.containerOf.book);
  bookList.addEventListener('dblclick', function (event) {
    const clickedElement = event.target.offsetParent;

    event.preventDefault();

    const bookAttribute = clickedElement.getAttribute('data-id');
    console.log(bookAttribute);

    if (
      favoriteBooks.includes(bookAttribute) &&
      clickedElement.classList.contains(classNames.book.favoriteBook)
    ) {
      clickedElement.classList.remove(classNames.book.favoriteBook);

      favoriteBooks.splice(favoriteBooks.indexOf(bookAttribute), 1);
    } else {
      clickedElement.classList.add(classNames.book.favoriteBook);
      favoriteBooks.push(bookAttribute);
    }
    console.log(favoriteBooks);
  });
};

initActions();
