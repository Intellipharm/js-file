"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    /**
     * Worksheet Model
     *
     * @param data
     * @constructor
     */
    module.Worksheet = function(data) {

        var MESSAGE_DATA_IS_REQUIRED = "data param is required for Worksheet model";

        if (_.isUndefined(data) || _.isNull(data)) {
            throw new Error(MESSAGE_DATA_IS_REQUIRED);
        }

        var self = this;

        this['!merges'] = [];
        this['!ref'] = [];

        // transform headers array
        var headers = module.FileUtil.transformWorksheetHeadersArray(data.headers);

        // count letters
        var letter_count = [];
        _.forEach(headers, function (item, key, obj) {
            letter_count.push(item.length);
        });

        // calculate worksheet merges
        this['!merges'] = module.FileUtil.calculateWorksheetHeadersMerges(headers);

        // set body row starting point
        var cell_number = headers.length + 1;

        // convert header array to object
        headers = module.FileUtil.convertWorksheetHeadersArrayToObject(headers);

        // set worksheet header data
        _.forEach(headers, function (value, key, obj) {

            // TODO: add column type support (new module.WorksheetCell({type: "s"})
            self[key] = new module.WorksheetCell({type: 's', value: value});
        });

        // set worksheet body data

        _.forEach(data.data, function(row) {

            var cell_letter = 'A';
            var _letter_count = 0;

            _.forEach(row, function(item) {

                // add data
                self[cell_letter + cell_number] = new module.WorksheetCell({type: 's', value: item.value});

                // increment letter
                cell_letter = module.FileUtil.nextLetter(cell_letter);

                // count letters
                _letter_count++;
            });

            letter_count.push(_letter_count);

            // increment cell number
            cell_number++;
        });

        // get highest letter
        var highest_letter = _.max(letter_count);

        // set worksheet range
        this['!ref'] = XLSX.utils.encode_range({
            s: {c: 0, r: 0}, // start
            e: {c: (highest_letter - 1), r: (cell_number - 2)} // end
        });
        
    };

})(window.JSFile);
