export class Animal {
    makeSound(): void {
      console.log("con vat keu");
    }
}
  
export class Lion extends Animal {
    makeSound(): void {
      console.log("Graw");
    }
}
  
export class Monkey extends Animal {
    makeSound(): void {
      console.log("ki ki ki");
    }
}