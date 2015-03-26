"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope) {


        $scope.worksheet_names = ['A', 'B'];
        $scope.selected_worksheet = 'A';

        // form
        $scope.upload_file = {};
        $scope.worksheet_headings_option = 0;
        $scope.file_data;
        $scope.file_sheet_has_headings = [];
        $scope.calculated_type = "";
        $scope.message = "";
        $scope.result;

        /**
         * readFile
         */
        $scope.readFile = function() {
            $scope.result = window.JSFile.FileReader.fileToArray($scope.file_data, $scope.calculated_type, $scope.file_sheet_has_headings);
        };

        //-------------------------
        // watch upload_file
        //-------------------------

        $scope.$watch('upload_file', function(value) {

            if (_.has(value, 'name') && _.has(value, 'type') && _.has(value, 'data')) {

                $scope.file_data = value.data;
                $scope.calculated_type = window.JSFile.FileReader.getFileType(value.type);

                if (_.isNull($scope.calculated_type)) {
                    $scope.message = "Could not determine file type";
                    return false;
                }

                // not txt or csv && specify if each worksheet has headings individually
                if (!_.includes(['txt', 'csv'], $scope.calculated_type) && $scope.worksheet_headings_option === 0) {

                    $scope.worksheet_names = window.JSFile.FileReader.getWorksheetNames(value.data, $scope.calculated_type);

                    _.forEach($scope.worksheet_names, function (item, index) {
                        $scope.file_sheet_has_headings[index] = false;
                    });
                }

                // already specified if each worksheet has headings now
                else {
                    var all_file_sheet_have_headings = $scope.worksheet_headings_option == 1 ? true : false;
                    $scope.result = window.JSFile.FileReader.fileToArray($scope.file_data, $scope.calculated_type, all_file_sheet_have_headings);
                }
            }
        }, true);
    };

    AppController.$inject = ['$scope'];

    angular.module('App').controller('AppController', AppController);

})();