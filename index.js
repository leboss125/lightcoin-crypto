let balance = 500.00;


// dependancy injection - passing an obj the things it needs
// easier for testibility and modularity


class Account {

  constructor(username) {
    this.transactions = [];
    // can't have money at the start unless u got mad hax
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach(transaction => {
      balance += transaction.value;
    });
    return balance;
  }

  addTransaction(transaction){
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    else {
      return false;
    }

  }

}

class Withdrawal extends Transaction {

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log('Starting  Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);