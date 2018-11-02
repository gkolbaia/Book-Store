function Person(){
    var personMoney = (Math.random() * Math.floor(10)).toFixed(2);
    
    this.enterStore = function(inOrOut){
        this.personIn = inOrOut;
    }
    this.personBuying = function(product,amount){
        if(personMoney>=this.inStore.warehouse.returnProducts()[product]['price']){
            this.inStore.sellProduct(product,amount);
            personMoney-=this.inStore.warehouse.returnProducts()[product]['price'];
        }else{
            console.log('sorry you have no enough money')
        }   
    }
    this.personInOrOut = function(){
    if(this.personIn){
    this.inStore = new Store();

    }else{
        if(confirm('You are not in our store, would you like to come in?')){
            this.inStore = new Store();
        }else{console.log('BB')}
    }
}
}

function Warehouse(){
    var products = {};
    var money;
    this.addProduct = function(product,amount,price){
        if(products[product]){
            products[product]['amount'] +=amount;
        }else{
         products[product] = {
             'amount':amount,
             'price':price
         }
        }
    }
    this.removeProduct = function(product,amount){
     if(products[product]){
         if(products[product]['amount']==amount){
             money = amount * products[product]['price'];
            delete products[product];
     }else if(products[product]['amount'] > amount){
        money = amount * products[product]['price'];
        products[product]['amount'] -=amount;
     }else {
         if(confirm('We have only '+products[product]['amount']+' '+product+ ' woudl you like To Buy?')){  
            money = amount * products[product]['price'];
            delete products[product];
         }
     }
    }else{
        console.log('We dont have That product');
    }
    }
    this.returnProducts = function(){
        return products;
    }
    this.returnMoney = function(){
        return money;
    }
}
function Store(){
    this.warehouse = new Warehouse();
    var budget = 100;
    this.StoreOpen = true;
    this.openClose = function(openOrClose){
        this.StoreOpen = openOrClose
    }
    this.sellProduct = function(product,amount){
        if(this.StoreOpen){   
            this.warehouse.removeProduct(product,amount); 
            budget += this.warehouse.returnMoney();
        }else{
            console.log('We Are Closed');
        } 
    }
    this.buyingProduct = function(product,amount,price){
       if(this.StoreOpen){
           if(budget>= amount * price){
               this.warehouse.addProduct(product,amount,price);
               budget -= amount * price;
           }else{
               console.log('We Dont Have Enough Money');
           }
       }else{
        console.log('We Are Closed');
    }
    }
    this.returnBudget = function(){
        return budget;
    }
}
//var person1 = new Person();
//person1.enterStore(true);
//person1.personInOrOut();

//person1.inStore.buyingProduct('book1',4,5);
//person1.inStore.buyingProduct('book2',4,5);
//person1.personBuying('book1', 2);
//console.log(person1.inStore.warehouse.returnProducts());
//console.log(person1.inStore.returnBudget());



