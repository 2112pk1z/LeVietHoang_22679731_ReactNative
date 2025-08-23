"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = exports.Animal = void 0;
class Animal {
    constructor(name) {
        this.name = name;
    }
}
exports.Animal = Animal;
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log("gau gau");
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    meow() {
        console.log("meo meo");
    }
}
exports.Cat = Cat;
