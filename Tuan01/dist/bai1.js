"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    display() {
        console.log("name: " + this.name);
        console.log("age: " + this.age);
    }
}
exports.Person = Person;
