angular.module('starter')
.service('StoresService', function($timeout, $http) {
  var stores = [
    {
      storeId: 1,
      title: 'Target'
    },
    {
      storeId: 2,
      title: 'Best Buy'
    }
  ];
  var product = [
    {
      title: 'Macbook Pro',
      price: '2000.00'
    }
  ];
  return {
    getList: function() {
      return $timeout(function() {
        return stores;
      }, 1500);
    },
    getProducts: function(id) {
      return $http.get('http://api.bestbuy.com/v1/products((search=touchscreen&search=apple)&salePrice<1000)?show=name,sku,salePrice&format=json&apiKey=ggejz4drzrwtkp4czw92vh2w');
    }
  }
});