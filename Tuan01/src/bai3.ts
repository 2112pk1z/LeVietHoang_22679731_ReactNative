export class Car {
    brand: string;
    model: string;
    year: number;
    constructor(brand: string, model: string, year: number) {
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

