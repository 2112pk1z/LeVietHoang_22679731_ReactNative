"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monkey = exports.Lion = exports.Animal = void 0;
class Animal {
    makeSound() {
        console.log("con vat keu");
    }
}
exports.Animal = Animal;
class Lion extends Animal {
    makeSound() {
        console.log("Graw");
    }
}
exports.Lion = Lion;
class Monkey extends Animal {
    makeSound() {
        console.log("ki ki ki");
    }
}
exports.Monkey = Monkey;
