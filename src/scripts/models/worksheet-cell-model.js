window.JSFile = window.JSFile || {};

(function(module) {
    'use strict';

    /**
     * WorksheetCell Model
     *
     * @param data
     * @constructor
     */
    module.WorksheetCell = function(data) {

        var MESSAGE_DATA_IS_REQUIRED = "data param is required for WorksheetCell model";
        var MESSAGE_VALUE_IS_REQUIRED = "data.value param is required for WorksheetCell model";

        if (_.isUndefined(data) || _.isNull(data)) {
            throw new Error(MESSAGE_DATA_IS_REQUIRED);
        }
        if (!_.has(data, 'value')) {
            throw new Error(MESSAGE_VALUE_IS_REQUIRED);
        }

        this.t = _.has(data, 'type') ? data.type : 's';
        this.v = '';
        
        if (data.value !== null) {
            this.v = data.value;
        }
    };

})(window.JSFile);
