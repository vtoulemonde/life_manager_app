projectApp.controller("TaskController", ["$scope","Restangular", "$modal", function($scope, Restangular, $modal) {
    
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
                            order_in_list: order,
                            status: $scope.statusList[0]
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

    $scope.openEditTask = function (task, list, index) {
        $scope.editTask = Restangular.copy(task);

        var modalInstance = $modal.open({
          templateUrl: 'myModalEditTask.html',
          controller: 'ModalEditTaskCtrl',
          scope: $scope
        });

        modalInstance.result.then(function (editTask) { 
                Restangular.one("tasks", editTask.id).customPUT(editTask, '', {}, {}).then(function(result) {
                    list.tasks[index] = result;
                });
            }, function () {
                //Do nothing when cancel
            }
        );
    };
}]);


projectApp.controller('ModalEditTaskCtrl', ["$scope", "$modalInstance", function ($scope, $modalInstance) {
    
  $scope.ok = function () {
    // console.log(param)
    $modalInstance.close($scope.editTask);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);