var projectApp = angular.module("projectApp", ["dndLists", "restangular"]);

projectApp.controller("ProjectController", ["$scope","Restangular", function($scope, Restangular) {

    var baseProject = Restangular.all('projects');
    var baseList = Restangular.all('lists');
    var baseTask = Restangular.all('tasks');

    $scope.showForm = undefined;
    $scope.showFormNewList = undefined;
    $scope.project_display = undefined;
    $scope.newList = "";
    $scope.allList = [];

    $scope.selectProject = function(project){
        $scope.project_display = project;
        $scope.allLists = $scope.project_display.getList('lists').$object;
    };

    baseProject.getList().then(function(result) { 
        if(result.length > 0){
          $scope.allProjects = result;
          $scope.selectProject($scope.allProjects[0]);
        }
    });

    $scope.moveTask = function(task, previous_list, previous_index){
        previous_list.tasks.splice(previous_index, 1);
        var new_list, new_index;
        
        for(var i= 0; i< $scope.allLists.length; i++){
            for(var j= 0; j< $scope.allLists[i].tasks.length; j++){
                if($scope.allLists[i].tasks[j].id === task.id){
                    new_index = j;
                    new_list = $scope.allLists[i];
                    $scope.allLists[i].tasks[j].list_id = new_list.id;
                }
            }
        }
        //update order in the previous and next list
        if (previous_list.id !== new_list.id){
            previous_list.customPOST({tasks: previous_list.tasks}, "update_order", {}, {});
        }
        new_list.customPOST({tasks: new_list.tasks}, "update_order", {}, {});
    };

    $scope.addTask = function(list){
        $scope.showForm = list.id;
    };

    $scope.createNewTask = function(list){
        if(list.newTaskTitle !==""){
            var order=1;
            if (list.tasks.length >0){
                order = list.tasks[list.tasks.length-1].order_in_list+1
            }
            var newTask = { title: list.newTaskTitle, 
                            list_id: list.id, 
                            order_in_list: order
                        }
            baseTask.post(newTask).then(function(result) {
                list.tasks.push(result);
            });
        }
        $scope.showForm = undefined;
        list.newTaskTitle = "";
    };

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
            baseList.post(myNewList).then(function(result) {
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


}]);