export class MathUtil {
    static add(a: number, b: number): number {
      return a + b;
    }
  
    static subtract(a: number, b: number): number {
      return a - b;
    }
  
    static multiply(a: number, b: number): number {
      return a * b;
    }
  
    static divide(a: number, b: number): number | void {
      if (b === 0) {
        console.log("Khong the chia cho 0");
        return;
      }
      return a / b;
    }
}
