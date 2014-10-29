
projectApp.controller("ListController", ["$scope","Restangular", function($scope, Restangular) {

    $scope.showFormNewList = undefined;
    $scope.newList = "";    
    $scope.showFilter = false;

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

    $scope.toggleDisplayFilter = function(){
    	if($scope.showFilter){
			$scope.showFilter = false;
    	} else {
    		$scope.showFilter = true;
    	}
    };

    $scope.closeFilter = function(){
        $scope.filterStatus = undefined;
        $scope.filterMember = undefined;
        $scope.searchTask = undefined;
        $scope.showFilter = false;
    };

    $scope.clearFilter = function(){
        $scope.filterStatus = undefined;
        $scope.filterMember = undefined;
        $scope.searchTask = undefined;
    };

    $scope.changeFilterStatus = function(){
        if ($scope.filterStatus === null){
            $scope.filterStatus = undefined;
        }
    };

    $scope.changeFilterMember = function(){
        if ($scope.filterMember === null){
            $scope.filterMember = undefined;
        }
    };

}]);