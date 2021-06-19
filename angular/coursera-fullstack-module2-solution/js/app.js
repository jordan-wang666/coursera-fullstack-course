(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', toBuy)
    .controller('AlreadyBoughtController', alreadyBought)
    .service('ShoppingListCheckOffService', checkOf);
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
function toBuy(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getItemsToBeBought()

  toBuyList.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function alreadyBought(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function checkOf() {
  var service = this;

  var itemsToBeBought = [
    { name: "chocolate", quantity: 25},
    { name: "cake", quantity: 20},
    { name: "cookies", quantity: 10},
    { name: "coffee", quantity: 5},
    { name: "popcorn", quantity: 5}
  ];

  var boughtItems = [];

  service.buyItem = function (index) {
    var item = itemsToBeBought[index];
    boughtItems.push(item);
    itemsToBeBought.splice(index, 1);
  };

  service.getItemsToBeBought = function () {
    return itemsToBeBought;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}
})();