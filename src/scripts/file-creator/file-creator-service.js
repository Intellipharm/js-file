"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    /**
     * FileCreator Class
     *
     * @constructor
     */
    var FileCreator = function() {

        var self = this;

        /**
         * createWorkbook
         *
         * @param data
         * @returns {window.JSFile.Workbook}
         */
        this.createWorkbook = function(data) {

            // transform data
            data = module.FileUtil.transformData(data);

            // create workbook
            var workbook = new module.Workbook();

            // sheets
            _.forEach(data, function(sheet, index) {

                workbook.SheetNames.push(sheet.name);
                workbook.Sheets[sheet.name] = new module.Worksheet();

                // transform headers array
                var headers = module.FileUtil.transformWorksheetHeadersArray(sheet.headers);

                // count letters
                var letter_count = [];
                _.forEach(headers, function (item, key, obj) {
                    letter_count.push(item.length);
                });

                // calculate worksheet merges
                workbook.Sheets[sheet.name]['!merges'] = module.FileUtil.calculateWorksheetHeadersMerges(headers);

                // set body row starting point
                var cell_number = headers.length + 1;

                // convert header array to object
                headers = module.FileUtil.convertWorksheetHeadersArrayToObject(headers);

                // set worksheet header data
                _.forEach(headers, function (value, key, obj) {
                    // TODO: add column type support
                    workbook.Sheets[sheet.name][key] = {t: 's', v: value};
                });

                // set worksheet body data

                _.forEach(sheet.data, function(row) {

                    var cell_letter = 'A';
                    var _letter_count = 0;

                    _.forEach(row, function(item) {

                        // add data
                        workbook.Sheets[sheet.name][cell_letter + cell_number] = {v: item.value, t: 's'};

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
                workbook.Sheets[sheet.name]['!ref'] = XLSX.utils.encode_range({
                    s: {c: 0, r: 0}, // start
                    e: {c: (highest_letter - 1), r: (cell_number - 2)} // end
                });
            });

            return workbook;
        };

        ///**
        // * formatCell
        // * TODO: add column type support
        // *
        // * @param value
        // * @param column
        // * @returns {{v: *}}
        // */
        //var formatCell = function (value, column) {
        //    var cell = {v: value};
        //
        //    switch (column.type) {
        //        case 'number':
        //            cell.t = 'n';
        //            break;
        //        case 'currency':
        //            cell.t = 'n';
        //            cell.v = numeral(value).format('$0,0.00');
        //            cell.z = '$#,##0.00';
        //            break;
        //
        //        case 'date':
        //            cell.t = 'd';
        //            break;
        //
        //        default:
        //            cell.t = 's';
        //            break;
        //    }
        //
        //    return cell;
        //};


        ///////////////////////////////////////////////////////////
        //
        // helper methods
        //
        ///////////////////////////////////////////////////////////

    };

    // create singleton
    module.FileCreator = new FileCreator();

})(window.JSFile);
