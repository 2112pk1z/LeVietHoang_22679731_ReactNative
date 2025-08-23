export interface Flyable {
    fly(): void;
  }
  
  export interface Swimmable {
    swim(): void;
  }
  
  export class Bird implements Flyable {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    fly(): void {
      console.log(`${this.name} bay`);
    }
  }
  
  export class Fish implements Swimmable {
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    swim(): void {
      console.log(`${this.name} boi`);
    }
  }
  