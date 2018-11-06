function Person(name) {
    this.name = name;
    var personMoney = (Math.random() * Math.floor(10)).toFixed(2);
    this.inStore = false;
    this.enterStore = function (groceryName) {
        this.personIn = groceryName;
        if (groceryName.StoreOpen) {
            if (store1.permission) {
                this.inStore = true;
            } else {
                console.log('Sorry you can not come in')
            }
        } else {
            console.log('sorry you can not come in , store is closed')
        }
    }
    this.quitStore = function () {
        if (this.store1) {
            this.store1 = false;
            store1.peopleAmountInStore -= this.name;
        }
    }
    this.personBuying = function (product, amount) {
        
        if(this.inStore){
            if (personMoney >= store1.warehouse.returnProducts()[product]['price']) {
            store1.sellProduct(product, amount);
            personMoney -= store1.warehouse.returnProducts()[product]['price'];
        } else {
            console.log('sorry you have no enough money')
        }
    }else{
        console.log('you are not in store');
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

        this.warehouse.removeProduct(product, amount);
        budget += this.warehouse.returnMoney();

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
    this.personPermission = function (person, permission) {

        if (this.peopleAmountInStore.length >= 6) {
            this.permission = false;
        } else {
            this.peopleAmountInStore.push(person.name);
            this.permission = permission
        }
    }
    this.returnBudget = function () {
        return budget;
    }
}


// var store1 = new Store();
// var person1 = new Person('giorgi');
// store1.personPermission(person1, true);
// person1.enterStore(store1);
// store1.buyingProduct('book1', 4, 5);
// store1.buyingProduct('book2', 4, 5);
// person1.personBuying('book1', 2);
// console.log(store1.warehouse.returnProducts());
// console.log(store1.returnBudget());



