"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai5_1 = require("./bai5");
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
var b = new bai5_1.BankAccount(100000);
console.log("So du hien tai: " + b.balance);
b.deposit(20000);
b.withdraw(30000);
