"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    /**
     * Workbook Model
     *
     * @param data
     * @constructor
     */
    module.Workbook = function(data) {

        if (_.isUndefined(data) || _.isNull(data)) {
            throw new Error()
        }

        var self = this;

        this.SheetNames = [];
        this.Sheets = {};

        // transform data
        data = module.FileUtil.transformData(data);

        // sheets
        _.forEach(data, function(sheet) {

            self.SheetNames.push(sheet.name);
            self.Sheets[sheet.name] = new module.Worksheet(sheet);
        });
    };

})(window.JSFile);
