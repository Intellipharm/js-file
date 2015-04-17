window.JSFile = window.JSFile || {};

(function(module) {
    'use strict';

    /**
     * FileUtil Class
     *
     * @constructor
     */
    var FileUtil = function() {

        var self = this;
        var message_prefix = "FileUtil: ";

        this.MESSAGE_UNSUPPORTED_FILE_MIMETYPE      = message_prefix + "file mimetype is not supported";
        this.MESSAGE_UNSUPPORTED_FILE_EXTENSION     = message_prefix + "file extension is not supported";
        this.MESSAGE_FILE_NAME_IS_REQUIRED          = message_prefix + "file_name is required";
        this.MESSAGE_FILE_EXTENSION_MISMATCH        = message_prefix + "the extension contained in the file_name argument does not match the file_extension argument";
        this.MESSAGE_FILE_EXTENSION_IS_REQUIRED     = message_prefix + "an file extension must be provided, either as part of the filename or as the file_extension argument";

        // data alternatives (these will be used as replacements for missing data)

        var data_alternatives = {
            sheet: {
                columns:    [],
                data:       [],
                headers:    [],
                name:       []
            },
            headers: {
                colspan:    ['cols'],
                rowspan:    ['rows'],
                value:      ['display_name', 'name', 'label']
            },
            columns: {
                type:       []
            }
        };

        ///////////////////////////////////////////////////////////
        //
        // public methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * transformData
         *
         * @param data
         */
        this.transformData = function(data) {

            // convert root to indexed array
            if (!_.isArray(data)) {
                data = [data];
            }

            // loop sheets
            _.forEach(data, function (item, index) {

                // transform sheet
                data[index] = transformSheet(item, index);

                // headers should contain array of rows
                if (!_.isArray(item.headers[0])) {
                    data[index].headers = [item.headers];
                }

                // headers
                _.forEach(data[index].headers, function (item_header_rows, header_row_index) {

                    // columns
                    _.forEach(item_header_rows, function(item_header_column, header_column_index) {

                        // transform
                        data[index].headers[header_row_index][header_column_index] = transformHeader(item_header_column);

                    });
                });
            });

            return data;
        };

        /**
         * transformFilenameAndExtension
         *
         * @param filename
         * @param file_extension
         * @returns {*}
         */
        this.transformFilenameAndExtension = function(filename, file_extension) {

            if (_.isUndefined(filename) || _.isNull(filename) || filename === "") {
                throw new Error(this.MESSAGE_FILE_NAME_IS_REQUIRED);
            }

            if (!_.isUndefined(file_extension) && !_.includes(_.keys(module.supported_file_types), file_extension)) {
                throw new Error(this.MESSAGE_UNSUPPORTED_FILE_EXTENSION);
            }

            // search filename for extension
            var file_name_extension = /[^.]+$/.exec(filename);

            // if possible filename extension matches supported extensions, then extract
            if (_.includes(_.keys(module.supported_file_types), file_name_extension[0])) {

                // extension found in file_name does not match file_extension
                if (!_.isUndefined(file_extension) && file_name_extension[0] !== file_extension) {
                    throw new Error(this.MESSAGE_FILE_EXTENSION_MISMATCH);
                }

                // remove extension from filename
                filename  = /(.*)\.[^.]+$/.exec(filename)[1];

                // set file_extension
                file_extension = file_name_extension[0];
            }

            // if filename extension does not match supported extensions and no file_extension was provided
            else if (_.isUndefined(file_extension)) {
                throw new Error(this.MESSAGE_FILE_EXTENSION_IS_REQUIRED);
            }

            // add extension to filename
            filename += '.' + file_extension;

            return {
                filename: filename,
                file_extension: file_extension
            };
        };

        /**
         * nextLetter
         *
         * @param letter
         * @param increment
         * @returns {*}
         */
        this.nextLetter = function(letter, increment) {

            if (_.isUndefined(increment)) {
                increment = 1;
            }

            return letter.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(arr) {
                var char = arr.charCodeAt(0);
                switch(char){
                    case 90: return 'A';
                    case 122: return 'a';
                    default: return String.fromCharCode((char + increment));
                }
            });
        };

        /**
         * letterToNumber
         *
         * @param letter
         * @returns {number}
         */
        this.letterToNumber = function(letter) {
            if (letter === letter.toLowerCase()) {
                return letter.charCodeAt(0) - 96;
            }
            return letter.charCodeAt(0) - 64;
        };

        /**
         * numberToLetter
         *
         * @param number
         * @param uppercase
         * @returns {letter}
         */
        this.numberToLetter = function(number, uppercase) {
            if (uppercase) {
                return String.fromCharCode(number + 64);
            }
            return String.fromCharCode(number + 96);
        };

        /**
         * transformWorksheetHeadersArray
         * inserts blank items based on rowspans & colspans
         *
         * @param headers
         * @returns {Array}
         */
        this.transformWorksheetHeadersArray = function(headers) {

            _.forEach(headers, function (row, row_index) {
                _.forEach(row, function (column, column_index) {

                    // add rows
                    if (column.rowspan > 1) {

                        for (var row_count = 1; row_count < column.rowspan; row_count++) {

                            var next_row = row_index + row_count;

                            // create next row if does not exist
                            if (!_.has(headers, next_row)) {
                                headers[next_row] = [];

                                // create next row columns
                                for (var i = 0; i < column_index; i++) {
                                    headers[next_row].push({});
                                }
                            }

                            // splice into next row
                            headers[next_row].splice(column_index, 0, {});
                        }
                    }

                    // add columns
                    if (column.colspan > 1) {

                        for (var column_count = 1; column_count < column.colspan; column_count++) {

                            var next_column = column_index + column_count;

                            // splice into next column
                            headers[row_index].splice(next_column, 0, {});
                        }
                    }
                });
            });

            return headers;
        };

        /**
         * convertWorksheetHeadersArrayToObject
         *
         * @param headers
         * @returns {{}}
         */
        this.convertWorksheetHeadersArrayToObject = function(headers) {

            var result = {};

            _.forEach(headers, function (row, row_index) {

                var letter = "A";

                _.forEach(row, function(column) {

                    // add value (if exists)
                    if (_.has(column, 'value')) {
                        result[letter + (row_index + 1)] = column.value;
                    }

                    // increment letter
                    letter = self.nextLetter(letter);
                });

            });

            return result;
        };

        /**
         * calculateWorksheetHeadersMerges
         *
         * @param headers
         * @returns {Array}
         */
        this.calculateWorksheetHeadersMerges = function(headers) {

            var result = [];

            _.forEach(headers, function (row, row_index) {
                _.forEach(row, function (column, column_index) {

                    // if has rowspan or colspan greater than 1
                    if ((_.has(column, 'rowspan') && column.rowspan > 1) || (_.has(column, 'colspan') && column.colspan > 1)) {

                        result.push({
                            s: {c: column_index, r: row_index}, // start
                            e: {c: column_index + (column.colspan - 1), r: row_index + (column.rowspan - 1)}  // end
                        });
                    }
                });
            });

            return result;
        };

        /**
         * getFileExtension
         *
         * @param mimetype
         * @returns {*}
         */
        this.getFileExtension = function(file_mimetype) {

            if (!_.includes(_.values(module.supported_file_types), file_mimetype)) {
                throw new Error(this.MESSAGE_UNSUPPORTED_FILE_MIMETYPE);
            }

            return _.findKey(module.supported_file_types, function(n) {
                return n === file_mimetype;
            });
        };

        /**
         * getFileMimeType
         *
         * @param file_extension
         * @returns {*}
         */
        this.getFileMimeType = function(file_extension) {

            if (!_.includes(_.keys(module.supported_file_types), file_extension)) {
                throw new Error(this.MESSAGE_UNSUPPORTED_FILE_EXTENSION);
            }

            return module.supported_file_types[file_extension];
        };

        ///////////////////////////////////////////////////////////
        //
        // private methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * transformSheet
         *
         * @param data
         * @param index
         */
        var transformSheet = function(data, index) {

            // get keys
            var keys = _.keys(data);

            // name
            if (!_.has(data, 'columns') || _.isUndefined(data.columns)) {
                data.columns = findAlternativeData(data, keys, data_alternatives.sheet.columns, []);
            }
            // data
            if (!_.has(data, 'data') || _.isUndefined(data.data)) {
                data.data = findAlternativeData(data, keys, data_alternatives.sheet.data, []);
            }
            // headers
            if (!_.has(data, 'headers') || _.isUndefined(data.headers)) {
                data.headers = findAlternativeData(data, keys, data_alternatives.sheet.headers, []);
            }
            // name
            if (!_.has(data, 'name') || _.isUndefined(data.name)) {
                data.name = findAlternativeData(data, keys, data_alternatives.sheet.name, "sheet" + (index + 1));
            }

            return {
                columns:    data.columns,
                data:       data.data,
                headers:    data.headers,
                name:       data.name
            };
        };

        /**
         * transformHeader
         *
         * @param data
         */
        var transformHeader = function(data) {

            var _data = {};
            var keys = [];

            // loop fields

            _.forEach(data, function (item, key) {

                // convert item keys & values to snake case
                if (!_.isObject(item)) {
                    var k     = _.snakeCase(key);
                    _data[k]  = item;
                    keys.push(k);
                }
            });

            // value
            if (!_.has(_data, 'value')) {
                _data.value = findAlternativeData(_data, keys, data_alternatives.headers.value);
            }
            // rowspan
            if (!_.has(_data, 'rowspan')) {
                _data.rowspan = parseInt(findAlternativeData(_data, keys, data_alternatives.headers.rowspan, 1));
            }
            // colspan
            if (!_.has(_data, 'colspan')) {
                _data.colspan = parseInt(findAlternativeData(_data, keys, data_alternatives.headers.colspan, 1));
            }

            return {
                value:      _data.value,
                rowspan:    _data.rowspan,
                colspan:    _data.colspan
            };
        };

        /**
         * findAlternativeData
         *
         * @param data
         * @param keys
         * @param alternatives
         * @param default_value
         * @returns {*}
         */
        var findAlternativeData = function(data, keys, alternatives, default_value) {

            var result = !_.isUndefined(default_value) ? default_value : "";

            _.forEach(alternatives, function (alternative) {

                if (_.includes(keys, alternative)) {
                    result = data[alternative];
                    return false; // break
                }
            });

            return result;
        };
    };

    // create singleton
    module.FileUtil = new FileUtil();

})(window.JSFile);
