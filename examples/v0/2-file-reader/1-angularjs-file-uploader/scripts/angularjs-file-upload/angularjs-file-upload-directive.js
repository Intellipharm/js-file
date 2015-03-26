(function() {
    'use strict';

	//----------------------------------
	// angularjsFileUpload Directive
	//----------------------------------

	var angularjsFileUpload = function(MESSAGE_UPGRADE_BROWSER) {

		return {
            scope: {
                file_name: "=fileName",
                file_type: "=fileType",
                file_data: "=fileData"
            },
			link: function (scope, element, attr, ctrl) {

                // dependency checks

                if (!Modernizr.filereader) {
                    console.error(MESSAGE_UPGRADE_BROWSER);
                    return false;
                }

                // bindings

				element.bind("change", function (change_event) {

					var reader = new FileReader();

                    /**
                     * onload
                     * @param event
                     */
					reader.onload = function(event) {
						var file_data   = event.target.result;

                        // set scope bindings & apply
                        scope.file_data = file_data;
						scope.$apply();
					};

                    // get file
                    var file = change_event.target.files[0];

                    // set scope bindings
                    scope.file_name = file.name;
                    scope.file_type = file.type;

                    // read
					reader.readAsBinaryString(file);
				});
			}
		};
	};

    angularjsFileUpload.$inject = ['MESSAGE_UPGRADE_BROWSER'];

	angular.module('AngularJSFileUpload')
		.directive('angularjsFileUpload', angularjsFileUpload);

})();
