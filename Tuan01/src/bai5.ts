export class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(soTien: number) {
        this.balance += soTien;
        console.log("Da cong " + soTien + ". So du hien tai la: " + this.balance);
        
    }

    withdraw(soTien: number) {
        if(soTien > this.balance) {
            console.log("khong du tien");
        }
        else {
            this.balance -= soTien;
            console.log("Da rut " + soTien + ". So du hien tai la: " + this.balance);
        }
    }
}

