export class Employee {
    name: string;
    salary: number;
  
    constructor(name: string, salary: number) {
      this.name = name;
      this.salary = salary;
    }
}
  
export class Manager extends Employee {
    constructor(name: string, salary: number) {
      super(name, salary);
    }
  
    manageTeam(): void {
      console.log("manage");
    }
}
  
export class Developer extends Employee {
    constructor(name: string, salary: number) {
      super(name, salary);
    }
  
    writeCode(): void {
      console.log("write code");
    }
}
  