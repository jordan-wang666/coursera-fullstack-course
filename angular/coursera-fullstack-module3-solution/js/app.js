(function () {
  "use strict";

  angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItemsDirective)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;
    controller.searchFor = "";
    controller.searchResult = "";
    controller.found = [];

    controller.search = function () {
      if (controller.searchFor && controller.searchFor.length > 0) {
        controller.searchResult = "";
        var promise = MenuSearchService.getMatchedMenuItems(controller.searchFor);

        promise.then(function (result) {
          controller.found = result;
          if (controller.found.length === 0) {
            controller.searchResult = "Nothing found (matching \"" + controller.searchFor + "\")";
          }
        });
      }
      else {
        controller.searchResult = "Nothing found";
      }
    };

    controller.dontWant = function (index) {
      console.log("Index: ", index);
      controller.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
        .then(function (response) {
          var menuItems = response.data;
          var foundItems = filterOnDescription(menuItems.menu_items, searchTerm);

          return foundItems;
        });
    };

    function filterOnDescription(list, searchTerm) {
      var newList = [];

      for (var i = 0; i < list.length; i++) {
        if (list[i].description.indexOf(searchTerm) > 0) {
          newList.push(list[i]);
        }
      }
      return newList;
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "itemList.html",
      scope: {
        list: "<",
        title: "@title",
        result: "@result",
        dontWant: "&"
      },
    };
    return ddo;
  }
})();