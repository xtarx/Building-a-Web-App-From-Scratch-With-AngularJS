angular.module('contactsApp')
    .value('FieldTypes', {
        text: ['Text', 'should be text'],
        email: ['Email', 'should be an email address'],
        number: ['Number', 'should be a number'],
        date: ['Date', 'should be a date'],
        datetime: ['Datetime', 'should be a datetime'],
        time: ['Time', 'should be a time'],
        month: ['Month', 'should be a month'],
        week: ['Week', 'should be a week'],
        url: ['URL', 'should be a URL'],
        tel: ['Phone Number', 'should be a phone number'],
        color: ['Color', 'should be a color']
    })
    .directive('formField', function ($timeout, FieldTypes) {
        return {
            restrict: 'EA',
            templateUrl: 'views/formField.html',
            replace: true, // if set to false, HTML is going to be placed inside the html tag
            scope: {
                record: '=', // 2 way binding so changes are made to the contact(record) object
                field: '@', // 1 way binding-- no need to save back to them
                live: '@',
                required: '@'
            },
            link: function ($scope, element, attr) { // function to be availabe during the compilation of directive
                $scope.$on('record:invalid', function () {
                    $scope[$scope.field].$setDirty(); //scope.field is the formname in ng-form
                });

                $scope.types = FieldTypes;

                $scope.remove = function (field) { //pass this function to the directive
                    delete $scope.record[field];
                    $scope.blurUpdate();
                };

                $scope.blurUpdate = function () {
                    if ($scope.live !== 'false') { //use string comp. since its a string
                        $scope.record.$update(function (updatedRecord) {
                            $scope.record = updatedRecord; //sends value to server and set the returned value to scope's record value
                        });
                    }
                };
                var saveTimeout;
                $scope.update = function () {
                    $timeout.cancel(saveTimeout); 
                    saveTimeout = $timeout($scope.blurUpdate, 1000);
                };
            }
        };
    });
