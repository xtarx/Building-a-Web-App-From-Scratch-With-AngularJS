angular.module('contactsApp')
    .controller('SingleController', function ($scope, $location, Contact, $routeParams) {
    $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) }); 
    $scope.delete = function () {
            $scope.contact.$delete();
            $location.url('/contacts');
        }
    });
