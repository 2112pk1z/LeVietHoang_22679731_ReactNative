export class Account {
    public accountNumber: string;
    private balance: number;
    readonly bankName: string;

    constructor(accountNumber: string, balance: number, bankName: string) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.bankName = bankName;
    }
    
}