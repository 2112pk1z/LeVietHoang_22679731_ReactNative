"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai8_1 = require("./bai8");
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
var products = [
    new bai8_1.Product("A", 50),
    new bai8_1.Product("B", 300),
    new bai8_1.Product("C", 200),
];
var products1 = products.filter(p => p.price > 100);
console.log("San pham co gia lon hon 100: ");
products1.forEach(p => {
    console.log(p);
});
