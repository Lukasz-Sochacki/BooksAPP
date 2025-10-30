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

const determineRatingBgc = function (rating) {
  if (rating < 6) {
    return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  } else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  } else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
  } else if (rating > 9) {
    return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  }
};

const render = function () {
  for (let book of dataSource.books) {
    // DLACZEGO book.rating?! A nie sam rating?
    const ratingBgc = determineRatingBgc(book.rating);
    const ratingWidth = book.rating * 10;

    book.ratingWidth = ratingWidth; //dlaczego tak?
    book.ratingBgc = ratingBgc; //dlaczego tak?

    const generatedHTML = templates.bookList(book);

    book = utils.createDOMFromHTML(generatedHTML);

    const bookContainer = document.querySelector(select.containerOf.book);

    bookContainer.appendChild(book);
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
  //DLACZEGO OF A NIE IN?! Edit: dopiero zobaczyłem, że w dataSource.book to tablica...
  for (let book of dataSource.books) {
    let shouldBeHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }
    const bookImage = document.querySelector(
      '.book__image[data-id="' + book.id + '"]'
      // MUSIAŁEM SELEKTOR Z DANYM ATRYBUTEM ZAPISAĆ DO ZMIENNEJ, BO BEZ TEGO WYKONANIE POLECENIA W INSTRUKCJI PONIŻEJ NIE DZIAŁAŁO np
      // .book__image[data-id="id-of-the-book-here"]
    );
    if (shouldBeHidden == true) {
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }
  }
};
