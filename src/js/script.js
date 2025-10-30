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
  form: {
    book: 'section.filters',
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
const filters = [];

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
    // console.log(bookAttribute);

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

  const filtersForm = document.querySelector(select.form.book);

  filtersForm.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (
      clickedElement.tagName == 'INPUT' &&
      clickedElement.type == 'checkbox' &&
      clickedElement.name == 'filter'
    ) {
      if (clickedElement.checked == true) {
        filters.push(clickedElement.value);
      } else {
        filters.splice(filters.indexOf(clickedElement.value), 1);
      }
      console.log(filters);
    }
    filterBooks();
  });
};

initActions();

const filterBooks = function () {
  // DLACZEGO OF A NIE IN?!
  for (let book of dataSource.books) {
    let shouldBeHidden = false;

    // let bookElements = dataSource.books[book];

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }
    const bookImage = document.querySelector(
      '.book__image[data-id="' + book.id + '"]'
    );
    if (shouldBeHidden == true) {
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }
  }
};
