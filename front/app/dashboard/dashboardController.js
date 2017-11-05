angular.module("primeiraApp").controller("dashboardCtrl", ['$scope', '$http',function($scope, $http){
  const vm = this;
  vm.getSummary = getSummary;

  function getSummary(){
    const url = "http://localhost:3003/api/billingSummary";
    $http.get(url).then(function(response){
       vm.credit = response.data.credit;
       vm.debt = response.data.debt;
       vm.total =  vm.credit - vm.debt;
    })
  }
  getSummary();

}])
