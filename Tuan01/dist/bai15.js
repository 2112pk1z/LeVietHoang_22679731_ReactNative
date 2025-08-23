"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = exports.User = exports.Book = void 0;
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
exports.Book = Book;
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.User = User;
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log("Them sach " + book.title + " thanh cong!");
    }
}
exports.Library = Library;
