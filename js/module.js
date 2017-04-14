var app = angular.module('exampleApp', []);

app.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.filter('escape', function() {
    return window.encodeURIComponent;
});

app.factory('dataSource', ['$http', function($http) {
    var factory = [];

    factory.getFile = function(filename) {
        return $http.get(filename);

    };
    
    return factory;
}]);

app.controller('team', function($scope, dataSource) {

    dataSource.getFile("responses.csv").success(function(csv) {
        var csvData = Papa.parse(csv, {
            delimiter: ",",
            header: true,
            skipEmptyLines: true
        });
        $scope.data = csvData.data;
        console.log($scope.data);
    }).error(function(err) {
        console.error("Didn't load CSV file. Maybe it couldn't be found?");
    });;

});


app.controller('member', function($location, $scope, dataSource) {

    $scope.AppController = [];

    var name = $location.search()['name'];

    dataSource.getFile("responses.csv").then(function(response) {
    	var csv = response.data;
        var csvData = Papa.parse(csv, {
            delimiter: ",",
            header: true
        });
        $scope.member = csvData.data.find(function(e) {
            return name == (e['First Name'] + ' ' + e['Last Name']);
        });
        
    }).catch(function(err) {
        console.error("Didn't load CSV file. Maybe it couldn't be found?");
    });

	// setTimeout(function() {
// 
//             html2canvas(document.body).then(function(canvas) {
//     			 var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
// 				$('body').append($('<a href="data:image/png;' + image + '" download="' + $scope.member['Last Name'] + '.png">'+$scope.member['Last Name'] +'.png</a>'));
// 			});
//         }, 0);
        
 
    });
 
app.controller('courses', function($scope, dataSource) {

    dataSource.getFile("Courses2.csv").success(function(csv) {
        var csvData = Papa.parse(csv, {
            delimiter: ",",
            header: true,
            skipEmptyLines: true
        });
        $scope.data = csvData.data;
        console.log($scope.data);
    }).error(function(err) {
        console.error("Didn't load CSV file. Maybe it couldn't be found?");
    });;

});
