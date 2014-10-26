var projectApp = angular.module("projectApp", ["dndLists", "restangular"]);

projectApp.controller("ProjectController", ["$scope","Restangular", function($scope, Restangular) {

    $scope.showForm = undefined;
    // $scope.newTaskTitle = "";

    // var baseProjects = Restangular.all('projects');
    var baseList = Restangular.all('lists');
    var baseTask = Restangular.all('tasks');

    baseList.getList().then(function(result) { 
        $scope.allLists = result;
        $scope.selected = null;
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
        //update order
        if (previous_list.id !== new_list.id){
            previous_list.customPOST({tasks: previous_list.tasks}, "update_order", {}, {});
        }
        new_list.customPOST({tasks: new_list.tasks}, "update_order", {}, {});
    };

    $scope.addTask = function(list){
        $scope.showForm = list.id;
    };

    $scope.createNewTask = function(list){
        // console.dir(list.tasks[list.length-1]);
        if(list.newTaskTitle !==''){
            var newTask = { title: list.newTaskTitle, 
                            list_id: list.id, 
                            order_in_list: list.tasks[list.tasks.length-1].order_in_list+1
                        }
            baseTask.post(newTask).then(function(result) {
                list.tasks.push(result);
                $scope.showForm = undefined;
                list.newTaskTitle = "";
            });
        } else {
            $scope.showForm = undefined;
            list.newTaskTitle = "";
        }
    };


}]);