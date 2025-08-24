"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai20_1 = require("./bai20");
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
// const library = new Library();
// const book1 = new Book("Book 1", "Hoang");
// const book2 = new Book("Book 2", "Hoang");
// library.addBook(book1);
// library.addBook(book2);
// console.log("Danh sach sach co trong thu vien:");
// library.books.forEach(b => console.log(b));
//Cau16:
// const numberBox = new Box(100);
// const stringBox = new Box("Hoang");
// console.log(numberBox);
// console.log(stringBox);
//Cau17:
// const loggerA = Logger.getInstance();
// const loggerB = Logger.getInstance();
// loggerA.log("Started");
// loggerB.log("Clicked");
// console.log(loggerA === loggerB);
//Cau18:
// console.log(MathUtil.add(10, 5));       
// console.log(MathUtil.subtract(10, 5));  
// console.log(MathUtil.multiply(10, 5));  
// console.log(MathUtil.divide(10, 5));   
// console.log(MathUtil.divide(10, 0));  
//Cau19:
// let animals: Animal[] = [new Lion(), new Monkey(), new Animal()];
// for (let a of animals) {
//     a.makeSound();
// }
//Cau20:
let c = new bai20_1.Carr();
let b = new bai20_1.Bike();
c.start();
c.stop();
b.start();
b.stop();
