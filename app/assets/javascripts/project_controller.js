
projectApp.controller("ProjectController", ["$scope","Restangular", "$modal", function($scope, Restangular, $modal) {

    $scope.project_display = undefined;
    $scope.allList = [];
    $scope.newProject = {title: ""};

    $scope.selectProject = function(project){
        $scope.project_display = project;
        $scope.allLists = $scope.project_display.getList('lists').$object;
    };

    Restangular.all('projects').getList().then(function(result) { 
        if(result.length > 0){
          $scope.allProjects = result;
          $scope.selectProject($scope.allProjects[0]);
        }
    });

    $scope.deleteProject = function(){
        Restangular.one('projects', $scope.project_display.id).remove().then(function(result){
            $scope.allProjects.splice($scope.allProjects.indexOf($scope.project_display), 1);
            if ($scope.allProjects.length > 0){
                $scope.selectProject($scope.allProjects[0]);
            } else {
                $scope.project_display = undefined;
                $scope.allLists = [];
            } 
        });
    };
  
    $scope.openNewProject = function (size) {
        $scope.editProject = {title: ""};

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          // templateUrl: 'projects/form_modal.html.erb',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            project: function () {
              return $scope.editProject;
            }
          }
        });

        modalInstance.result.then(function (newProject) {
            Restangular.all('projects').post(newProject).then(function(result) {
                    $scope.allProjects.unshift(result);
                    $scope.selectProject(result);
                });
        }, function () {
            //Do nothing when cancel
        });
    };

    $scope.openEditProject = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          // templateUrl: 'projects/form_modal.html.erb',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            project: function () {
              return Restangular.copy($scope.project_display);
            }
          }
        });

        modalInstance.result.then(
            function (editProject) { 
                editProject.put().then(
                function(result) {
                    $scope.allProjects.splice($scope.allProjects.indexOf($scope.project_display), 1);
                    $scope.project_display = result;
                    $scope.allProjects.unshift(result);
                });
            }, function () {
                //Do nothing when cancel
            }
        );
    };
}]);

projectApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, project) {

  // $scope.newProject = project;
  $scope.editProject = project

  $scope.ok = function () {
    $modalInstance.close($scope.editProject);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});