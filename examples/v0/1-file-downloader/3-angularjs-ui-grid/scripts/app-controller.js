"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope) {

        $scope.sample_data = [
            {
                "firstName": "Cox",
                "lastName": "Carney",
                "company": "Enormo",
                "employed": true
            },
            {
                "firstName": "Lorraine",
                "lastName": "Wise",
                "company": "Comveyer",
                "employed": false
            },
            {
                "firstName": "Nancy",
                "lastName": "Waters",
                "company": "Fuelton",
                "employed": false
            }
        ];

        // table options
        $scope.grid_options = {
            enableMenu: true,
            data: $scope.sample_data,
            exporterXlsxFileName: "My File",
            exporterXlsxSheetName: "My Sheet",
            // columns
            columnDefs: [
                {name: 'firstName', displayName: 'First Name'},
                {name: 'lastName', displayName: 'Last Name'},
                {name: 'company', displayName: 'Company'},
                {name: 'employed', displayName: 'Is Employed'}
            ]
        };
    };

    AppController.$inject = ['$scope'];

    angular.module('App').controller('AppController', AppController);

})();