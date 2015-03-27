"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    /**
     * FileReader Class
     *
     * @constructor
     */
    var FileReader = function() {

        var self = this;
        var message_prefix = "FileReader: ";

        this.MESSAGE_FILE_DATA_IS_REQUIRED  = message_prefix + "file_data param is required";
        this.MESSAGE_FILE_TYPE_IS_REQUIRED  = message_prefix + "file_type param is required";
        this.MESSAGE_UNSUPPORTED_FILE_TYPE  = message_prefix + "file type is not supported";
        this.MESSAGE_FILE_READ_ERROR        = message_prefix + "could not read file. Either file data is invalid, or file_type does not match file_data.";


        ///////////////////////////////////////////////////////////
        //
        // public methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * getWorksheetNames
         *
         * @param file_data
         * @param file_type
         * @returns {*}
         */
        this.getWorksheetNames = function (file_data, file_type) {

            // validate args
            if (_.isUndefined(file_data) || _.isNull(file_data)) {
                throw new Error(this.MESSAGE_FILE_DATA_IS_REQUIRED);
            }
            if (_.isUndefined(file_type) || _.isNull(file_type)) {
                throw new Error(this.MESSAGE_FILE_TYPE_IS_REQUIRED);
            }

            file_type = file_type.toLowerCase();

            if (!_.includes(_.keys(this.get_worksheet_names_handlers), file_type)) {
                throw new Error(this.MESSAGE_UNSUPPORTED_FILE_TYPE);
            }

            return this.get_worksheet_names_handlers[file_type](file_data);
        };

        /**
         * fileToArray
         *
         * @param file_data
         * @param file_type
         * @param array|boolean worksheet_has_headings
         * @param group_by TODO: add support for this (group by row: [0: {A:a1, B:b1}] or group by column: {A: [0:a1, 1:a2]}
         * @returns {*}
         */
        this.fileToArray = function (file_data, file_type, worksheet_has_headings, group_by) {

            // validate args
            if (_.isUndefined(file_data) || _.isNull(file_data)) {
                throw new Error(this.MESSAGE_FILE_DATA_IS_REQUIRED);
            }
            if (_.isUndefined(file_type) || _.isNull(file_type)) {
                throw new Error(this.MESSAGE_FILE_TYPE_IS_REQUIRED);
            }

            // arg defaults
            group_by = !_.isUndefined(group_by) ? group_by.toLowerCase() : "row";

            file_type = file_type.toLowerCase();

            if (!_.includes(_.keys(this.file_to_array_handlers), file_type)) {
                throw new Error(this.MESSAGE_UNSUPPORTED_FILE_TYPE);
            }

            return this.file_to_array_handlers[file_type](file_data, worksheet_has_headings, group_by);
        };


        ///////////////////////////////////////////////////////////
        //
        // private methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * txtToArray
         *
         * @param data
         * @param array|boolean worksheet_has_headings
         * @param group_by
         * @returns {*|Array}
         */
        var txtToArray = function(text, worksheet_has_headings, group_by) {

            var data = text.split(/\n/);
            _.forEach(data, function (item, index, data) {
                data[index] = item.split(/,/);
            });

            // has got a heading row?
            var has_heading_row;
            if (_.isArray(worksheet_has_headings)) {
                has_heading_row = !_.isUndefined(worksheet_has_headings[0]) && worksheet_has_headings[0] === true ? true : false;
            } else {
                has_heading_row = worksheet_has_headings === true ? true : false;
            }

            if (has_heading_row) {
                var result = [];
                var headings = data[0];
                _.forEach(data, function (row, row_index) {
                    var _row = {};
                    _.forEach(row, function (column, column_index) {
                        _row[headings[column_index]] = column;
                    });
                    result.push(_row);
                });
                return [{
                    name:       "Sheet1",
                    headings:   result.shift(),
                    data:       result
                }];
            }

            return [{
                name:       "Sheet1",
                headings:   [],
                data:       data
            }];
        };

        /**
         * xlsxToArray
         *
         * @param data
         * @param worksheet_has_headings
         * @param group_by
         * @returns {Array}
         */
        var xlsxToArray = function(data, worksheet_has_headings, group_by) {
            var result = [];

            try {
                var workbook_data = XLSX.read(data, {type: 'binary'});
                result = workbookDataToArray(workbook_data, worksheet_has_headings, group_by);
            } catch (error) {
                throw new Error(this.MESSAGE_FILE_READ_ERROR);
            }

            return result;
        };

        /**
         * xlsToArray
         *
         * @param data
         * @param worksheet_has_headings
         * @param group_by
         * @returns {Array}
         */
        var xlsToArray = function(data, worksheet_has_headings, group_by) {
            var result = [];

            try {
                var workbook_data = XLS.read(data, {type: 'binary'});
               result = workbookDataToArray(workbook_data, worksheet_has_headings, group_by);
            } catch (error) {
                throw new Error(this.MESSAGE_FILE_READ_ERROR);
            }

            return result;
        };

        /**
         * workbookDataToArray
         *
         * @param data
         * @param array|boolean worksheet_has_headings
         * @param group_by
         * @returns {Array}
         */
        var workbookDataToArray = function(data, worksheet_has_headings, group_by) {

            var result = [];
            var index = 0;

            // loop worksheets
            _.forEach(data.Sheets, function (worksheet, worksheet_name) {

                // has worksheet got headings?
                var has_heading_row;
                if (_.isArray(worksheet_has_headings)) {
                    has_heading_row = !_.isUndefined(worksheet_has_headings[index]) && worksheet_has_headings[index] === true ? true : false;
                } else {
                    has_heading_row = worksheet_has_headings === true ? true : false;
                }

                var sheet = [];
                var headings = {};
                var row = has_heading_row ? {} : [];
                var previous_row_number = 0;

                // loop worksheet properties
                _.forEach(worksheet, function (item, key) {

                    // skip items that do not have a value property
                    if (_.isUndefined(item.v)) {
                        return;
                    }

                    // get column name & row number
                    var parts = key.match(/([A-Za-z]+)([0-9]+)/);
                    var column_letter = parts[1];
                    var row_number = parseInt(parts[2]);

                    // get headings
                    if (has_heading_row && row_number === 1) {
                        headings[column_letter] = item.v;
                    }

                    // get rows
                    if (!has_heading_row || row_number > 1) {

                        // if new row
                        if (row_number > previous_row_number) {
                            row = has_heading_row ? {} : [];
                            sheet.push(row);
                        }

                        // add to row
                        if (has_heading_row) {
                            row[headings[column_letter]] = item.v;
                        } else {
                            row.push(item.v);
                        }
                    }

                    previous_row_number = row_number;
                });

                result.push({
                    name:       worksheet_name,
                    headings:   headings,
                    data:       sheet
                });

                index++;
            });

            return result;
        };

        /**
         * getXlsxWorksheetNames
         *
         * @param data
         * @returns {Array}
         */
        var getXlsxWorksheetNames = function(data) {
            var result = [];

            try {
                var workbook_data = XLSX.read(data, {type: 'binary'});

                // loop worksheets
                _.forEach(workbook_data.Sheets, function (worksheet, worksheet_name) {
                    result.push(worksheet_name);
                });
            } catch (error) {
                throw new Error(this.MESSAGE_FILE_READ_ERROR);
            }

            return result;
        };

        /**
         * getXlsWorksheetNames
         *
         * @param data
         * @returns {Array}
         */
        var getXlsWorksheetNames = function(data) {
            var result = [];

            try {
                var workbook_data = XLS.read(data, {type: 'binary'});

                // loop worksheets
                _.forEach(workbook_data.Sheets, function (worksheet, worksheet_name) {
                    result.push(worksheet_name);
                });
            } catch (error) {
                throw new Error(this.MESSAGE_FILE_READ_ERROR);
            }

            return result;
        };


        ///////////////////////////////////////////////////////////
        //
        // init
        //
        ///////////////////////////////////////////////////////////

        // handlers mapped by file type

        this.file_to_array_handlers = {
            xlsx:   xlsxToArray,
            ods:    xlsxToArray,
            xls:    xlsToArray,
            txt:    txtToArray,
            csv:    txtToArray
        };
        this.get_worksheet_names_handlers = {
            xlsx:   getXlsxWorksheetNames,
            ods:    getXlsxWorksheetNames,
            xls:    getXlsWorksheetNames
        };
    };

    module.FileReader = new FileReader();

})(window.JSFile);

