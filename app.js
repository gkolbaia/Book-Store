function Store(warehouse,storeMoney,dayTime){
this.warehouse = warehouse;
this.storeMoney = storeMoney;
this.dayTime = dayTime;
}
var storeWarehouse = new Store({
    book1:5,
    book2:7,
    book3:8,
    book4:9,
    book5:12,
    book6:6.20,
    book7:12.90,
    book8:11,
    book9:2.60,
    book10:3.80,

},
78.50,true);
Store.prototype.openClose = function(x){
    storeWarehouse.dayTime = x;
}


if(storeWarehouse.dayTime){
    Store.prototype.bubuyingBook = function(book,price){
        this.warehouse[book] = price;
        this.storeMoney -= price;
    }
    Store.prototype.sellBook = function(book){
        if(storeWarehouse.warehouse[book]){
        delete storeWarehouse.warehouse[book];
        }else{
            console.log('We Dont Have That Book');
        }
    }
};
//storeWarehouse.bubuyingBook('book11',5);
//storeWarehouse.sellBook('book1');
//console.log(storeWarehouse);







