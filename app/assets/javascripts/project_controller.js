
projectApp.controller("ProjectController", ["$scope","Restangular", "$modal", function($scope, Restangular, $modal) {

    $scope.project_display = undefined;
    $scope.allList = [];
    $scope.allMembers = [];
    $scope.allProjects = [];
    $scope.newProject = {title: ""};
    $scope.statusList = ['New', 'To start', 'In progress', 'Pending', 'Done'];
    $scope.showOverviewPage = false;
    $scope.isMyProject = false;
    $scope.currentUser = ngCurrentUser;
    console.log(ngCurrentUser);


    $scope.selectProject = function(project){
        $scope.showOverviewPage = false;
        $scope.project_display = project;
        $scope.allLists = $scope.project_display.getList('lists').$object;
        $scope.allMembers = $scope.project_display.getList('members').$object;
        $scope.isMyProject = ($scope.currentUser.id === $scope.project_display.user_id);
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
        $scope.showOverviewPage = false;
        $scope.editProject = {title: ""};

        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalEditProjectCtrl',
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
          controller: 'ModalEditProjectCtrl',
          size: size,
          resolve: {
            project: function () {
              return Restangular.copy($scope.project_display);
            }
          }
        });

        modalInstance.result.then(
            function (editProject) { 
                console.dir(editProject);
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

    $scope.openAddMember = function (size) {

        var modalInstance = $modal.open({
          templateUrl: 'myModalAddMember.html',
          controller: 'ModalAddMemberCtrl',
          size: size,
          scope: $scope
        });
    };

    $scope.displayOverview = function(){
      Restangular.all('tasks').getList().then(function(result){
        $scope.projectsOverview = result;
        $scope.showOverviewPage = true;
      });
    }


}]);

projectApp.controller('ModalEditProjectCtrl', ["$scope", "$modalInstance", "project", function ($scope, $modalInstance, project) {

  $scope.editProject = project;

  $scope.ok = function () {
    $modalInstance.close($scope.editProject);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

projectApp.controller('ModalAddMemberCtrl', ["$scope", "$modalInstance", "Restangular", function ($scope, $modalInstance, Restangular) {
    
    Restangular.all('users').getList().then(function(result){
      $scope.users = result;
      //Init variable is_member on each user
      for(var i = 0; i< $scope.users.length; i++){
        $scope.users[i].is_member = false;
        for(var j = 0; j< $scope.allMembers.length; j++){
          if($scope.allMembers[j].user_id === $scope.users[i].id){
            $scope.users[i].is_member = true;
          }
        }
      }
    });
    $scope.searchText="";


    $scope.addMember = function(user){
        var newMember = { user_id: user.id, project_id: $scope.project_display.id };
        Restangular.all('members').post(newMember).then(function(result){
            $scope.allMembers.push(result);
            user.is_member = true; 
        });
    };

    $scope.removeMember = function(member){
        Restangular.one('members', member.id).remove().then(function(result){
            $scope.allMembers.splice($scope.allMembers.indexOf(member), 1);
            //Update is_member on the corresponding user
            for(var i = 0; i< $scope.users.length; i++){
              if($scope.users[i].id === member.user_id){
                  $scope.users[i].is_member = false;
              }
            }
        });
    };

    $scope.ok = function () {
        $modalInstance.close();
    };
}]);