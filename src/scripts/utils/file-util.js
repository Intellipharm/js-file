"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    /**
     * FileUtil Class
     *
     * @constructor
     */
    var FileUtil = function() {

        var self = this;

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
                value:      ['display_name', 'name']
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
            _.forEach(data, function (item, index, obj) {

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
                        //var s = "";
                        //if (item_header_column.value.length < 4) {
                        //    s = (header_row_index + " ::: " + item_header_column.value + "\t\t" + item_header_column.rowspan + "\t" + item_header_column.colspan);
                        //} else {
                        //    s = (header_row_index+" ::: "+item_header_column.value+"\t"+item_header_column.rowspan+"\t"+item_header_column.colspan);
                        //}
                        //console.log(s+" ");

                        // transform column
                        //if (!_.has(data[index].columns, header_column_index)) {
                        //    data[index].columns[header_column_index] = {};
                        //}
                        //
                        //data[index].columns[header_column_index] = transformColumn(data[index].columns[header_column_index], item_header_column);

                    });

                    //if (_.has(data[index].columns, header_column_index)
                    //item.columns = transformColumn(data[index].columns, data[index].headers);
                });
                //console.log(data[index].columns);
            });

            return data;
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
                                for (var i=0; i<column_index; i++) {
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

                _.forEach(row, function(column, column_index) {

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
         * transformSheet
         *
         * @param data
         * @param index
         */
        var transformSheet = function(data, index) {

            // get keys
            var keys = _.keys(data);

            // name
            if (!_.has(data, 'columns')) {
                data.columns = findAlternativeData(data, keys, data_alternatives.sheet.columns, []);
            }
            // data
            if (!_.has(data, 'data')) {
                data.data = findAlternativeData(data, keys, data_alternatives.sheet.data, []);
            }
            // headers
            if (!_.has(data, 'headers')) {
                data.headers = findAlternativeData(data, keys, data_alternatives.sheet.headers, []);
            }
            // name
            if (!_.has(data, 'name')) {
                data.name = findAlternativeData(data, keys, data_alternatives.sheet.name, "sheet" + (index+1));
            }

            return {
                columns:    data.columns,
                data:       data.data,
                headers:    data.headers,
                name:       data.name
            };
        };

        /**
         * transformColumn
         *
         * @param column
         * @param header
         * @returns {{type: *}}
         */
        var transformColumn = function(column, header) {

            return {
                type: _.has(column, 'type') ? column.type : (_.has(header, 'type') ? header.type : 'string')
            }
        };

        /**
         * transformHeader
         *
         * @param data
         */
        var transformHeader = function(data) {

            var _data = {};
            var keys= [];

            // loop fields

            _.forEach(data, function (item, key, obj) {

                // convert item keys & values to snake case
                if (!_.isObject(item)) {
                    var key     = _.snakeCase(key);
                    _data[key]  = item;
                    keys.push(key);
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
        }
    };

    // create singleton
    module.FileUtil = new FileUtil();

})(window.JSFile);