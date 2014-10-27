
projectApp.controller("ListController", ["$scope","Restangular", function($scope, Restangular) {

    $scope.showFormNewList = undefined;
    $scope.newList = "";

    $scope.addList = function(){
        $scope.showFormNewList = true;
    };

    $scope.createNewList = function(){
        if ($scope.newList !== ""){
            var order=1;
            if ($scope.allLists.length >0){
                order = $scope.allLists[$scope.allLists.length-1].order_in_project+1
            }
            var myNewList = {  title: $scope.newList, 
                            project_id: $scope.project_display.id,
                            order_in_project: order
                        };
            Restangular.all('lists').post(myNewList).then(function(result) {
                result.tasks = [];
                $scope.allLists.push(result);
            });
        }
        $scope.showFormNewList = false;
        $scope.newList = "";
    };

    $scope.cancelAddList = function(){
        $scope.newList = "";
        $scope.showFormNewList = false;
    };

    $scope.deleteList = function(list) {
        Restangular.one('lists', list.id).remove().then(function(result){
            $scope.allLists.splice($scope.allLists.indexOf(list), 1);
        });
    };

}]);