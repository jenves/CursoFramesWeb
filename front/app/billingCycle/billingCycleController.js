angular.module('primeiraApp').controller('BillingCycleCtrl',['$http', 'msgs', 'tabs', function($http, msgs, tabs){
  const vm = this;
  const url = "http://localhost:3003/api/billingCycles";

  vm.create = create;
  vm.refresh = refresh;
  vm.showTabUpdate = showTabUpdate;
  vm.showTabDelete = showTabDelete;
  vm.excluir = excluir;
  vm.update = update;
  vm.addCredit = addCredit;
  vm.cloneCredit = cloneCredit;
  vm.deleteCredit = deleteCredit;
  vm.addDebt = addDebt;
  vm.cloneDebt = cloneDebt
  vm.deleteDebt = deleteDebt;

  function refresh(){
    vm.billingCycles = {credits: [{}], debts: [{}]};
    _getBillingCycles();
    tabs.show(vm, {tabList: true, tabCreate : true})
  }

  function _getBillingCycles(){
    $http.get(url).then(function(response){
      vm.billingCycles = response.data;
      vm.billingCycle = {}; //zera o bind do formulario.
    })
  }

  function create() {
    $http.post(url, vm.billingCycle).then(function(response){
      msgs.addSuccess('Operação realizada com Sucesso.')
      refresh();
    },function(response) {
        msgs.addError(response.data.errors)
    })
  }refresh();

  function showTabUpdate(billingCycle) {
    vm.billingCycle = billingCycle
    tabs.show(vm, {tabUpdate: true})
  }

  function showTabDelete(billingCycle){
    vm.billingCycle = billingCycle
    tabs.show(vm, {tabDelete: true})
  }

  function excluir(){
    const deleteUrl = `${url}/${vm.billingCycle._id}`
    $http.delete(deleteUrl, vm.billingCycle).then(function(response){
      refresh();
      msgs.addSuccess('Operação Realizada com Sucesso.')
    },function(response){
      msgs.addError(response.data.errors)
    })
  }

  function update(){
    const updateUrl = `${url}/${vm.billingCycle._id}`
    $http.put(updateUrl, vm.billingCycle).then(function(response){
      refresh();
      msgs.addSuccess('Operação Realizada com Sucesso.')
    },function(response){
      msgs.addError(response.data.errors)
    })
  }

  function addCredit(index){
      vm.billingCycles.credits.splice(index + 1, 0, {})
  }

  function cloneCredit(index, {name, value}){
      vm.billingCycles.credits.splice(index + 1, 0, {name, value})
  }

  function deleteCredit(index){
    if(vm.billingCycles.credits.length > 1){
      vm.billingCycles.credits.splice(index, 1)
    }
  }

  function addDebt(index){
      vm.billingCycles.debts.splice(index + 1, 0, {})
  }

  function cloneDebt(index, {name, value}){
      vm.billingCycles.debts.splice(index + 1, 0, {name, value, status})
  }

  function deleteDebt(index){
    if(vm.billingCycles.debts.length > 1){
      vm.billingCycles.debts.splice(index, 1)
    }
  }


}])
