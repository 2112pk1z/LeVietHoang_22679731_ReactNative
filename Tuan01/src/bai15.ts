export class Book {
    title: string;
    author: string;
  
    constructor(title: string, author: string) {
      this.title = title;
      this.author = author;
    }
  }
  
  export class User {
    id: number;
    name: string;
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  }
  
  export class Library {
    books: Book[] = [];
    users: User[] = [];
  
    addBook(book: Book): void {
      this.books.push(book);
      console.log("Them sach " + book.title + " thanh cong!");
    }
  }
  