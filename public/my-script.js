{
    //"globals": { // Globals variables.
    //        "jasmine": true,
    //        "angular": true,
    //        "browser": true,
    //        "element": true,
    //        "by":true,
    //        "io":true,
    //        "_":false,
    //        "$":false
    //    }
}

var myApp = angular.module("myApp", []);

myApp.run(function ($rootScope) {
    console.log("myApp initialized with run()");
});

var Task = function (defaults) {
    defaults = defaults || {};
    this.name = defaults.name || '';
    this.description = defaults.description || '';
    this.completed = defaults.completed || false;
    this.toggleMarkCompleted = function () {
        this.completed = !this.completed;
    }
};

myApp.value("Task", Task);

myApp.controller("myController", function ($scope, $http, Task) {
    console.log("In myController");
    console.log("arguments = ", arguments);

    $scope.author = "Nirmal Davis V";

    /*    
    //    $scope.tasks = {
    //            "items" : [
    //                {
    //                "id": 1,
    //                "name": "Home Loan",
    //                "description": "Need to make payment of Rs 35,000 to SBI"
    //                },
    //                {
    //                "id": 2,
    //                "name": "BESCOM",
    //                "description": "Need to make payment of Electircity to BESCOM"
    //                }, 
    //                {
    //                "id": 3,
    //                "name": "ICICI Credit Card",
    //                "description": "Need to make credit card payment of to ICICI"
    //                }, 
    //                {
    //                "id": 4,
    //                "name": "BSNL",
    //                "description": "Need to make land line phone payment of to BSNL"
    //                }, 
    //                {
    //                "id": 5,
    //                "name": "Airtel",
    //                "description": "Need to make mobile phone payment of to Airtel"
    //                },
    //            ]
    //    };
    */



    $scope.setCurrentTask = function (task) {
        //        console.log("Current selected task : " + task.description);
        $scope.currentTask = task;
    };

    var promise = $http.get(/items/);
    promise.then(function (response) {
        console.log("response.data " + response.data);

        /*        
        //        response.data.map(function(task){
        //            console.log("task : " + task);
        //        });

        //iterating over array using for-of        
        //for(item of response.data) {
        //               console.log("item : ", item);
        //        }
        //        
        //        //iterating over array using forEach
        //        response.data.forEach(function(entry) {
        //            console.log("entry : ", entry);
        //        });
        */

        $scope.tasks = [];

        for (item of response.data) {
            $scope.tasks.push(new Task(item));
        }

        //        $scope.tasks = response.data;

    });

    $scope.searchTasks = function (task) {
        //        console.log("Search Text is ", $scope.searchText);
        //        for( i = 0; i < $scope.tasks; i++) {
        //            if($scope.tasks[i].name.indexOf($scope.searchText) >= 0) {
        //                
        //            }
        //        }


    };

    myApp.filter("taskFilter", function () {
        return function (tasks, searchStr) {
            console.log("In taskFilter");
            return true;
        }
    });

    $scope.markDone = function (task) {
        //        task.completed = !task.completed;

        task.toggleMarkCompleted();
        console.log("In markDone ", task.completed);
    }


    //Default sort tasks order
    $scope.tasksSortOrder = {
        "type": "name"
    };

});