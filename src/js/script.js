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
  const booksImage = bookList.querySelectorAll(select.images.book);

  for (let bookImage of booksImage) {
    bookImage.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const bookAttribute = bookImage.getAttribute('data-id');

      if (
        favoriteBooks.includes(bookAttribute) &&
        bookImage.classList.contains(classNames.book.favoriteBook)
      ) {
        bookImage.classList.remove(classNames.book.favoriteBook);

        favoriteBooks.splice(favoriteBooks.indexOf(bookAttribute), 1);
      } else {
        bookImage.classList.add(classNames.book.favoriteBook);
        favoriteBooks.push(bookAttribute);
      }
      console.log(favoriteBooks);
    });
  }
};

initActions();
