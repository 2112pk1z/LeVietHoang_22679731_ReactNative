"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(soTien) {
        this.balance += soTien;
        console.log("Da cong " + soTien + ". So du hien tai la: " + this.balance);
    }
    withdraw(soTien) {
        if (soTien > this.balance) {
            console.log("khong du tien");
        }
        else {
            this.balance -= soTien;
            console.log("Da rut " + soTien + ". So du hien tai la: " + this.balance);
        }
    }
}
exports.BankAccount = BankAccount;
