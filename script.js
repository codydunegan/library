const toggleBookModal = () => {
    newBookModal.classList.toggle('show-modal');
}

const addBook = () => {
    if (bookname.value === '' || author.value === '' || pages.value < 1) { 
        return; 
    }
    
    let newbook = Object.create(book);
    newbook.title = bookname.value;
    newbook.author = author.value;
    newbook.pages = pages.value;

    myLibrary.push(newbook);
    repopulateShelves();

    newBookModal.classList.remove('show-modal');

    bookname.value = '';
    author.value = '';
    pages.value = 0;
}

const windowClick = (event) => {
    if (event.target === newBookModal) {
        toggleBookModal();
    }
}

const repopulateShelves = () => {
    content.innerText = '';

    if (myLibrary.length > 0) {
        for (let [index, book] of myLibrary.entries()) {
            let bookElement = document.createElement('div');
            bookElement.classList.add('book');
    
            let bookTitle = document.createElement('h3');
            bookTitle.innerText = book.title;
            bookElement.appendChild(bookTitle);
    
            let bookAuthorDiv = document.createElement('div');
            let bookAuthor = document.createElement('span');
            bookAuthor.innerText = "Author: ";
            bookAuthorDiv.appendChild(bookAuthor);
            bookAuthor.insertAdjacentText('afterend', book.author);
            bookElement.appendChild(bookAuthorDiv);
    
            let bookPagesDiv = document.createElement('div');
            let bookPages = document.createElement('span');
            bookPages.innerText = "# of Pages: ";
            bookPagesDiv.appendChild(bookPages);
            bookPages.insertAdjacentText('afterend', book.pages);
            bookElement.appendChild(bookPagesDiv);
    
            let bookButtonsDiv = document.createElement('div');
            bookButtonsDiv.classList.add('bookbuttons');
    
            let toggleButton = document.createElement('button');
            toggleButton.classList.add('togglebook');
    
            if (book.read) {
                toggleButton.classList.add('read');
            }
            toggleButton.setAttribute('data-book', index);
    
            let toggleIcon = document.createElement('span');
            toggleIcon.classList.add('iconify-inline');
            toggleIcon.setAttribute('data-icon', 'mdi:book-cancel-outline');
            toggleButton.appendChild(toggleIcon);
    
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('deletebook');
            deleteButton.setAttribute('data-book', index);
    
            let deleteIcon = document.createElement('span');
            deleteIcon.classList.add('iconify-inline');
            deleteIcon.setAttribute('data-icon', 'mdi:delete-empty');
            deleteButton.appendChild(deleteIcon);
    
            bookButtonsDiv.appendChild(toggleButton);
            toggleButton.addEventListener('click', toggleRead);
    
            bookButtonsDiv.appendChild(deleteButton);
            deleteButton.addEventListener('click', deleteBook);
    
            bookElement.appendChild(bookButtonsDiv);
    
            content.appendChild(bookElement);
        }
    }
    else {
        let nobooks = document.createElement('div');
        nobooks.classList.add('nobooks');
        nobooks.innerText = 'No books found :(';

        content.appendChild(nobooks);
    }

}

const toggleRead = (event) => {
    let btn = event.currentTarget;
    let index = btn.getAttribute('data-book');

    let book = myLibrary[index];
    book.read = !book.read;

    btn.classList.remove('read');
    if (book.read) {
        btn.classList.add('read');
    }
}

const deleteBook = (event) => {
    let btn = event.currentTarget;
    let index = btn.getAttribute('data-book');

    let book = myLibrary[index];

    let filter = myLibrary.filter(b => b !== book);
    myLibrary = filter;

    repopulateShelves();
}

window.addEventListener('click', windowClick);

const addbookButton = document.querySelector('#addbook');
addbookButton.addEventListener('click', toggleBookModal);

const addBookFinalButton = document.querySelector('#addbookFinal');
addBookFinalButton.addEventListener('click', addBook);

const bookname = document.querySelector('#bookname');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');

const newBookModal = document.querySelector('.newbookmodal');

const content = document.querySelector('#content');

let myLibrary = [];

const book = {
    title: 'New Book',
    author: 'Unknown',
    pages: 1, 
    read: false
}

const lotr = Object.create(book);
lotr.title = "The Lord of the Rings";
lotr.author = "J. R. R. Tolkien";
lotr.pages = 1178;
lotr.read = true;

myLibrary.push(lotr);
repopulateShelves();
