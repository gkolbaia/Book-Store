function Person(name) {
    this.name = name;
    var personMoney = (Math.random() * Math.floor(10)).toFixed(2);
    this.groceryName = null;
    this.enterStore = function (groceryName) {

        if (this.groceryName != null) {
            throw 'you are already in store';
        } else
            if (groceryName.personPermission(this)) {
                this.groceryName = groceryName;
            }
    }
    this.quitStore = function (groceryName) {

        if (this.groceryName != null) {
            this.groceryName = null;
            groceryName.peopleAmountInStore -= this.name;
        }
    }
    this.chekBook = function (product) {
      if(this.groceryName.warehouse.returnProducts()[product]){
          return true;
      }else{
          return false;
      }
    }
    this.personBuying = function (product, amount) {
        if (this.chekBook(product)) {
            if (personMoney >= this.groceryName.warehouse.returnProducts()[product]['price']) {
                personMoney -= this.groceryName.warehouse.returnProducts()[product]['price'];
                this.groceryName.sellProduct(product, amount);
                
            } else {
                console.log('sorry you have no enough money')
            }
        } else {
            console.log('we dont have that book')
        }
    }
}
function Warehouse() {
    var products = {};
    var money;
    this.addProduct = function (product, amount, price) {
        if (products[product]) {
            products[product]['amount'] += amount;
        } else {
            products[product] = {
                'amount': amount,
                'price': price
            }
        }
    }
    this.removeProduct = function (product, amount) {
        if (products[product]) {
            if (products[product]['amount'] == amount) {
                money = amount * products[product]['price'];
                delete products[product];
            } else if (products[product]['amount'] > amount) {
                money = amount * products[product]['price'];
                products[product]['amount'] -= amount;
            } else {
                if (confirm('We have only ' + products[product]['amount'] + ' ' + product + ' woudl you like To Buy?')) {
                    money = amount * products[product]['price'];
                    delete products[product];
                }
            }
        } else {
            console.log('We dont have That product');
        }
    }
    this.returnProducts = function () {
        return products;
    }
    this.returnMoney = function () {
        return money;
    }
}
function Store() {
    this.warehouse = new Warehouse();
    var budget = 100;
    this.StoreOpen = true;
    this.peopleAmountInStore = [];

    this.openClose = function (openOrClose) {
        this.StoreOpen = openOrClose
    }
    this.sellProduct = function (product, amount) {
        if (this.StoreOpen) {
            this.warehouse.removeProduct(product, amount);
            budget += this.warehouse.returnMoney();
        }
    }
    this.buyingProduct = function (product, amount, price) {
        if (this.StoreOpen) {
            if (budget >= amount * price) {
                this.warehouse.addProduct(product, amount, price);
                budget -= amount * price;
            } else {
                console.log('We Dont Have Enough Money');
            }
        } else {
            console.log('We Are Closed');
        }
    }
    this.personPermission = function (person) {

        if (this.peopleAmountInStore.length >= 6 || person.name == 'giorgi') {
            return false;
        } else {
            this.peopleAmountInStore.push(person.name);
            //this.permission = true;
            return true;
        }
    }
    this.returnBudget = function () {
        return budget;
    }
}


var store1 = new Store();
var person1 = new Person('irakli');
//var store2 = new Store();
store1.personPermission(person1);
person1.enterStore(store1);
store1.buyingProduct('book1', 4, 1);
store1.buyingProduct('book2', 4, 5);
person1.personBuying('book1', 10 );
console.log(store1.warehouse.returnProducts());
console.log(store1.returnBudget());


