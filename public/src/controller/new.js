angular.module('contactsApp')
    .controller('NewController', function ($scope, Contact, $location) {
        $scope.contact = new Contact({
            firstName: ['', 'text'],
            lastName: ['', 'text'],
            email: ['', 'email'],
            homePhone: ['', 'tel'],
            cellPhone: ['', 'tel'],
            birthday: ['', 'date'],
            website: ['', 'url'],
            address: ['', 'text']
        });


        $scope.save = function () {
            if ($scope.newContact.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.contact.$save();
                $location.url('/contacts');
            }
        };

    });
