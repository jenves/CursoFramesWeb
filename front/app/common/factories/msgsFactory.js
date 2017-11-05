angular.module('primeiraApp').factory('msgs',['toastr', function(toastr){

  function _addMsg(msgs, title, method){
    if(msgs instanceof Array){
      msgs.forEach(msg => toastr[method](msg, title))
    }else{
      toastr[method](msgs, title)
    }
  }

  function addSuccess(msgs){
    _addMsg(msgs, 'Sucesso', 'success')
  }

  function addError(msgs){
    _addMsg(msgs, 'Error', 'error')
  }

  return {
    addSuccess : addSuccess,
    addError : addError
  }

}]);
