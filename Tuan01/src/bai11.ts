
export class Animal {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
}
  
export class Dog extends Animal {
    constructor(name: string) {
      super(name);
    }
  
    bark(): void {
      console.log("gau gau");
    }
}
  
export class Cat extends Animal {
    constructor(name: string) {
      super(name);
    }
  
    meow(): void {
      console.log("meo meo");
    }
}
  