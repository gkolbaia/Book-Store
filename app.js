function Person(name) {
    this.name = name;
    var personMoney = (Math.random() * Math.floor(10)).toFixed(2);
    this.personIsIn = '';
    this.enterStore = function (groceryName) {
        this.groceryName = groceryName;
        if (this.personIsIn != groceryName.name) {
            if (groceryName.personPermission(this)) {
                this.personIsIn = groceryName.name;
            } else {
                throw "you are not allowed"
            }
        } else {
            throw "you are already in store";
        }
    }
    this.quitStore = function (groceryName) {
        if (this.personIsIn = groceryName.name) {
            this.personIsIn = '';
            groceryName.peopleAmountInStore -= this.name;
        } else {
            throw "you are not in that store";
        }
    }
    this.personBuying = function (product, amount) {
        if (personMoney >= this.groceryName.warehouse.returnProducts()[product]['price']) {
            this.groceryName.sellProduct(product, amount);
            personMoney -= this.groceryName.warehouse.returnProducts()[product]['price'];
        } else {
            console.log('sorry you have no enough money')
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
function Store(name) {
    this.name = name;
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


var store1 = new Store('magazia');
var person1 = new Person('irakli');
store1.personPermission(person1);
person1.enterStore(store1);
store1.buyingProduct('book1', 4, 5);
store1.buyingProduct('book2', 4, 5);
person1.personBuying('book1', 2);
console.log(store1.warehouse.returnProducts());
console.log(store1.returnBudget());
console.log(person1.personIsIn);

