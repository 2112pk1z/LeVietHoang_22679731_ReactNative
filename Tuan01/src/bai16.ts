export class Box<T> {
    private value: T;
  
    constructor(value: T) {
      this.value = value;
    }
  
    setValue(value: T): void {
      this.value = value;
    }
  
    getValue(): T {
      return this.value;
    }
}