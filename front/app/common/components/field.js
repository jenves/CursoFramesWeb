angular.module('primeiraApp').component('field', {
  bindings: {
    grid: '@',
    id: '@',
    label: '@',
    placeholder: '@',
    type :'@',
    model : '=',
    readonly : '<'
  },
  controller: [
    'gridSystem',
    function(gridSystem) {
      this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
    }
  ],
  template: `
  <div class="{{$ctrl.gridClasses}}">
    <div class="form-group">
      <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
      <input id="{{$ctrl.id}}" ng-model="$ctrl.model" type="{{$ctrl.type}}"
       ng-readonly="$ctrl.readonly" class="form-control" placeholder="{{$ctrl.placeholder}}">
    </div>
  </div>
  `
});
