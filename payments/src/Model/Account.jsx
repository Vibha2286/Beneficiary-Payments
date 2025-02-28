class Account {
    constructor(number, balance) {
      this.number = number;
      this.balance = balance;
    }
    static fromJson(json) {
      return new Account(json.number, json.balance);
    }
  }
  
  export default Account;
  