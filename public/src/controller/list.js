angular.module('contactsApp')
    .controller('ListController', function ($scope, Contact, $location) {
        $scope.contacts = Contact.query();
        $scope.fields = ['firstName', 'lastName'];
        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        }
        $scope.sort.field = "firstName";
        $scope.sort.field = false; //false thus dec order

        $scope.show = function (id) {
            $location.url('/contact/' + id);
        }
        
    
    });
