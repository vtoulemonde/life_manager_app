projectApp.controller("TaskController", ["$scope","Restangular", function($scope, Restangular) {
    var baseTask = Restangular.all('tasks');
    $scope.showForm = undefined;

    $scope.addTask = function(list){
        $scope.showForm = list.id;
    };

    $scope.createNewTask = function(list){
        if(list.newTaskTitle !=="" && list.newTaskTitle !== undefined){
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

    $scope.deleteTask = function(task, list, index){
        Restangular.one('tasks', task.id).remove().then(function(result){
            list.tasks.splice(index, 1);
            list.customPOST({tasks: list.tasks}, "update_order", {}, {});
        });
    };
}]);