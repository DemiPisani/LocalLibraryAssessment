function getTotalBooksCount(books) {
  return books.reduce((accumulator, book) => accumulator +1, 0);
 }
 
 function getTotalAccountsCount(accounts) {
   return accounts.reduce((accumulator, user) => accumulator +1, 0);
 }
 
 function getBooksBorrowedCount(books) {
   return books.filter((book) => book.borrows[0].returned ===false).length;
 }
 
 function getMostCommonGenres(books) {
   let result = {};
   books.forEach((book) => {
     if (result[book.genre]) {
       result[book.genre]++
     }
     else {
       result[book.genre] = 1;
     }
       });
    result = Object.entries(result).map(([name, count]) => {
        return {name,count}
     });
       return result.sort((a, b) => b.count - a.count).slice(0, 5);
 }
 
 function getMostPopularBooks(books) {
   let popularBooks = [];
    let result = books.map((book) => {
                return { name: book.title, count: book.borrows.length };
                }).sort((bookA,bookB ) => (bookA.count < bookB.count ? 1 : -1));
   return result.slice(0, 5);
   }
 
 function getMostPopularAuthors(books, authors) {
     let result = [];
   authors.forEach((author) => {
     let authorList = {
        name: `${author.name.first} ${author.name.last}`, count: 0
     };
     books.forEach((book) => {
      if (book.authorId === author.id) {
        authorList.count += book.borrows.length;
      }
     });
     result.push(authorList);
   });
   result = result.sort((authorA, authorB) => authorB.count - authorA.count);
   return result.slice(0, 5);
 }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
