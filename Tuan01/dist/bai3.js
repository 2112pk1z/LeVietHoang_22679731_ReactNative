"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    display() {
        console.log("brand: " + this.brand);
        console.log("model: " + this.model);
        console.log("year: " + this.year);
    }
}
exports.Car = Car;
