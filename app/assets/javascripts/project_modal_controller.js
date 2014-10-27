projectApp.controller('ModalDemoCtrl', function ($scope, $modal, $log, Restangular) {

  $scope.open = function (size) {
    $scope.newProject = {title: ""};

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        project: function () {
          return $scope.newProject;
        }
      }
    });

    modalInstance.result.then(function (newProject) {
        console.log("new project="+newProject.title);
        console.log($scope.project_display.title);
        Restangular.all('projects').post(newProject).then(function(result) {
                $scope.allProjects.push(result);
                $scope.selectProject(result);
            });
    }, function () {

    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

projectApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, project) {

  $scope.newProject = project;

  $scope.ok = function () {
    $modalInstance.close($scope.newProject);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});