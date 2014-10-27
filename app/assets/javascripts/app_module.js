var projectApp = angular.module("projectApp", ["dndLists", "restangular", 'ui.bootstrap']);

projectApp.config(function(RestangularProvider) {
    RestangularProvider.setRequestInterceptor(function(elem, operation) {
        if (operation === "remove") {
            return undefined;
        } 
        return elem;
    });
});

// Display a confirmation dialog box when using ng-confirm-click="my message" directive
projectApp.directive('ngConfirmClick', [function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);