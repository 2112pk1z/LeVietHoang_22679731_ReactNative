"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    display() {
        console.log("ten: " + this.name);
        console.log("tuoi: " + this.age);
    }
}
var p = new Person("Hoang", 21);
p.display();
