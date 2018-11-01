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
function Store(StoreOpen){
    var budget = 100;
    this.StoreOpen = StoreOpen;
    this.sellProduct = function(product,amount){
        if(this.StoreOpen){   
            warehouse.removeProduct(product,amount); 
            budget += warehouse.returnMoney();
        }else{
            console.log('We Are Closed');
        } 
    }
    this.buyingProduct = function(product,amount,price){
       if(this.StoreOpen){
           if(budget>= amount * price){
               warehouse.addProduct(product,amount,price);
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
//var warehouse = new Warehouse();
//var store = new Store(true);
//store.buyingProduct('book1',4,5);
//store.sellProduct('book1',4)
//console.log(warehouse.returnProducts());
//console.log(store.returnBudget());


