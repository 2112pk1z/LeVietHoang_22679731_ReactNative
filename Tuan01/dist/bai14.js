"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = exports.Manager = exports.Employee = void 0;
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
}
exports.Employee = Employee;
class Manager extends Employee {
    constructor(name, salary) {
        super(name, salary);
    }
    manageTeam() {
        console.log("manage");
    }
}
exports.Manager = Manager;
class Developer extends Employee {
    constructor(name, salary) {
        super(name, salary);
    }
    writeCode() {
        console.log("write code");
    }
}
exports.Developer = Developer;
