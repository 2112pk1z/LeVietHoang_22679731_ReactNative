export class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    display() {
        console.log("name: " + this.name);
        console.log("age: " + this.age);
    }
}

