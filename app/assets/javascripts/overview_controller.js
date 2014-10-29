projectApp.controller("OverviewController", ["$scope", "Restangular", function($scope, Restangular) {

    $scope.showFilter = false;
    $scope.hideAffected=true;
    $scope.filterStatus = undefined;
    $scope.searchTask = undefined;

    $scope.clearFilter = function(){
        $scope.filterStatus = undefined;
        $scope.searchTask = undefined;
    };

    $scope.toggleDisplayFilter = function(){
    	if($scope.showFilter){
			$scope.closeFilter();
    	} else {
    		$scope.showFilter = true;
    		$scope.clearFilter();
    	}
    };

    $scope.closeFilter = function(){
        $scope.clearFilter();
        $scope.showFilter = false;
    };

    $scope.changeFilterStatus = function(){
        if ($scope.filterStatus === null){
            $scope.filterStatus = undefined;
        }
    };


}]);