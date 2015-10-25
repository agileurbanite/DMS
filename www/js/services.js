angular.module('starter')
.service('StoresService', function($timeout, $http) {
  var stores = [
    {
      storeId: 1,
      title: 'Best Buy'
    }
  ];
  return {
    getList: function() {
      return $timeout(function() {
        return stores;
      }, 1500);
    },
    getProducts: function(id) {
      return $http.get('http://api.bestbuy.com/v1/products((search=touchscreen&search=apple)&salePrice<1000)?show=name,sku,salePrice,image&format=json&apiKey=ggejz4drzrwtkp4czw92vh2w');
    }
  }
})
.service('UserService', function($http, DMS) {
  return {
    register: function(user) {
      var userInfo = {};
      angular.extend(user, {
        "should_send_modo_descript": 1,
        "is_modo_terms_agree": 1
      });
      userInfo = _.omit(user, 'pwd')
      return $http.post(DMS.baseUrl + '/api/register', userInfo);
    }
  }
})
.service('CardService', function($http, DMS) {
  return {
    add: function(card) {
      return $http.post(DMS.baseUrl + '/api/card/add', card);
    }
  }
})
.service('CoinService', function($http, DMS) {
  return {
    add: function(card) {
      return $http.post(DMS.baseUrl + '/api/card/add', card);
    }
  }
})
.factory("Users", function($firebaseArray, DMS) {
  var usersRef = new Firebase(DMS.firebaseUrl + "/users");
  return function(userid) {
    return $firebaseArray(usersRef.child(userid));
  }
})
.factory("User", function($firebaseObject, DMS){
  return function(userid) {
    var ref = new Firebase(DMS.firebaseUrl + "/users/" + userid);
    return $firebaseObject(ref);
  }
})
.factory('Products', function($firebaseArray, DMS) {
  var productsRef = new Firebase(DMS.firebaseUrl + "/products");
  return function(store) {
    return $firebaseArray(productsRef.child(store));
  }
})
.factory('Bags', function($firebaseArray, DMS) {
  var bagsRef = new Firebase(DMS.firebaseUrl + "/bags");
  return function(store) {
    return $firebaseArray(bagsRef.child(store));
  }
})
.factory('BagsUpdate', function($firebaseArray, DMS) {
  return function(store, obj) {
    var bagsRef = new Firebase(DMS.firebaseUrl + "/bags");
    $firebaseArray(bagsRef.child(store)).$add(obj)
  }
})
.factory('BagFire', function($firebaseObject, DMS) {
  var bagsRef = new Firebase(DMS.firebaseUrl + "/bags");
  return function(store) {
    return $firebaseObject(bagsRef.child(store));
  }
})