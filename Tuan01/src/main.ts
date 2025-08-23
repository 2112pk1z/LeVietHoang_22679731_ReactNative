import { Person } from "./bai1";
import { Student } from "./bai2";
import { Car } from "./bai3";
import { Rectangle } from "./bai4";
import { BankAccount } from "./bai5";
import { Product } from "./bai8";
import { Dog, Cat } from "./bai11";
import { Bird, Fish } from "./bai12";
import { Square, Circle } from "./bai13";
import { Book, User, Library } from "./bai15";

//Cau1:
// var p = new Person("Hoang", 21);
// p.display();

//Cau2:
// var s = new Student("Hoang", 21, "A");
// s.information();

//Cau3:
// var c = new Car("Mecerdes", "Maybach S450", 2010);
// c.display()

//Cau4:
// var r = new Rectangle(10, 15)
// console.log("Chu vi:", r.chuVi());
// console.log("Dien tich:", r.dienTich());

//Cau 5:
// var b = new BankAccount(100000)
// console.log("So du hien tai: " + b.balance);
// b.deposit(20000);
// b.withdraw(30000);

//Cau8:
// var products: Product[] = [
//     new Product("A", 50),
//     new Product("B", 300),
//     new Product("C", 200),
// ];
// var products1 = products.filter(p => p.price > 100);
// console.log("San pham co gia lon hon 100: ");
// products1.forEach(p => {console.log(p);
// })

//Cau11:
// const dog = new Dog("Shiba");
// const cat = new Cat("golden");

// dog.bark();
// cat.meow();

//Cau12:
// const bird = new Bird("Dai bang");
// const fish = new Fish("Ca vang");

// bird.fly(); 
// fish.swim(); 

//Cau13:
// const square = new Square(5);
// const circle = new Circle(3);

// console.log("Dien tich hinh vuong:", square.area());
// console.log("Dien tich hinh tron:", circle.area());  

//Cau15:
const library = new Library();
const book1 = new Book("Book 1", "Hoang");
const book2 = new Book("Book 2", "Hoang");
library.addBook(book1);
library.addBook(book2);
console.log("Danh sach sach co trong thu vien:");
library.books.forEach(b => console.log(b));



