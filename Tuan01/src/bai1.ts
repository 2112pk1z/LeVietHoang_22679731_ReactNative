class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
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