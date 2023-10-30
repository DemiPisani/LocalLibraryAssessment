function findAccountById(accounts, id) {
  return accounts.find((account) => account.id.includes(id)); 
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastA, lastB) => lastA.name.last.toLowerCase() > lastB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let sum = 0;
  const booksBorrowedByAccount = books.forEach((book) => {
    if (!!book.borrows) {
      book.borrows.forEach((accounts) => {
        if (accounts.id === account.id) {
          sum++;
        }
      });
    }
  });
  return sum;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let result = borrowedBooks.map((book) => {
    return { ...book, author: getMostPopularAuthors(book, authors)};
  });
  return result;
}

function getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
