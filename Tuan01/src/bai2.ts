import { Person } from "./bai1";

export class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name,age);
        this.grade = grade;
    }

    information() {
        console.log("name: " + this.name);
        console.log("age: " + this.age);
        console.log("grade: " + this.grade);
    }
}


