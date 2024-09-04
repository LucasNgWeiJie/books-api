const apiUrl = 'http://127.0.0.1:3000/api/books';


// Function to get all books
function getAllBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('books-list');
            booksList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.id}: ${book.title} by ${book.author}`;
                booksList.appendChild(li);
            });
        });
}

// Function to get a book by ID
function getBookById() {
    const bookId = document.getElementById('get-book-id').value;
    fetch(`${apiUrl}/${bookId}`)
        .then(response => response.json())
        .then(data => {
            const bookDetail = document.getElementById('book-detail');
            if (data) {
                bookDetail.textContent = `ID: ${data.id}, Title: ${data.title}, Author: ${data.author}`;
            } else {
                bookDetail.textContent = 'Book not found';
            }
        });
}

// Function to add a new book
function addBook() {
    const title = document.getElementById('new-book-title').value;
    const author = document.getElementById('new-book-author').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
    })
        .then(response => response.json())
        .then(data => {
            const addBookResponse = document.getElementById('add-book-response');
            addBookResponse.textContent = `Added: ${data.title} by ${data.author}`;
            getAllBooks();  // Refresh the book list
        });
}

// Function to update an existing book
function updateBook() {
    const id = document.getElementById('update-book-id').value;
    const title = document.getElementById('update-book-title').value;
    const author = document.getElementById('update-book-author').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
    })
        .then(response => response.json())
        .then(data => {
            const updateBookResponse = document.getElementById('update-book-response');
            updateBookResponse.textContent = `Updated: ${data.title} by ${data.author}`;
            getAllBooks();  // Refresh the book list
        });
}

// Function to delete a book
function deleteBook() {
    const id = document.getElementById('delete-book-id').value;

    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            const deleteBookResponse = document.getElementById('delete-book-response');
            deleteBookResponse.textContent = 'Book deleted';
            getAllBooks();  // Refresh the book list
        });
}
