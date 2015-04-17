describe("FileUtil", function() {

    var Util;

    // services (that we want to test)
    beforeEach(function() {
        Util = window.JSFile.FileUtil;
    });

    //--------------------------------------------
    // transformData
    //--------------------------------------------

    describe("transformData (angularjs-ui-grid)", function() {

        _.forEach(window.test_data, function (data) {

            // root

            it("should return indexed array of worksheets", function () {
                var result = Util.transformData(data);
                expect(_.isArray(result)).toBeTruthy();
            });

            // sheet properties

            it("each sheet should contain a columns property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0], 'columns')).toBeTruthy();
            });
            it("each sheet should contain a data property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0], 'data')).toBeTruthy();
            });
            it("each sheet should contain a headers property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0], 'headers')).toBeTruthy();
            });
            it("each sheet should contain a name property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0], 'name')).toBeTruthy();
            });

            // data

            it("each data property should contain an indexed array of rows", function () {
                var result = Util.transformData(data);
                expect(_.isArray(result[0].data)).toBeTruthy();
            });
            it("each data.row should contain an indexed array of columns", function () {
                var result = Util.transformData(data);
                expect(_.isArray(result[0].data[0])).toBeTruthy();
            });
            it("each data.row should contain an indexed array of columns", function () {
                var result = Util.transformData(data);
                expect(_.isArray(result[0].data[0])).toBeTruthy();
            });
            it("each data.column should contain a value property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0].data[0][0], 'value')).toBeTruthy();
            });
            it("data.column.value should not be an object", function () {
                var result = Util.transformData(data);
                expect(_.isObject(result[0].data[0][0].value)).toBeFalsy();
            });

            // headers

            it("each headers property should contain an indexed array of rows", function () {
                var result = Util.transformData(data);
                expect(_.isArray(result[0].headers)).toBeTruthy();
            });
            it("each headers.row should contain an indexed array of columns", function () {
                var result = Util.transformData(data);
                expect(_.isArray(result[0].headers[0])).toBeTruthy();
            });

            it("each headers.row.column should contain a value property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0].headers[0][0], 'value')).toBeTruthy();
            });
            it("each headers.row.column should contain a rowspan property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0].headers[0][0], 'rowspan')).toBeTruthy();
            });
            it("each headers.row.column should contain a colspan property", function () {
                var result = Util.transformData(data);
                expect(_.has(result[0].headers[0][0], 'colspan')).toBeTruthy();
            });
        });
    });

    //--------------------------------------------
    // transformWorksheetHeadersArray
    //--------------------------------------------

    describe("transformWorksheetHeadersArray", function() {

        var headers = [
            [
                {value: "First",      rowspan: 1, colspan: 1},
                {value: "Name",       rowspan: 3, colspan: 1},
                {value: "Position",   rowspan: 2, colspan: 1},
                {value: "Stuff",      rowspan: 1, colspan: 3},
                {value: "",           rowspan: 1, colspan: 1}
            ],
            [
                {value: "Second",     rowspan: 1, colspan: 1},
                {value: "Office",     rowspan: 1, colspan: 1},
                {value: "Age",        rowspan: 1, colspan: 1},
                {value: "Start date", rowspan: 1, colspan: 1},
                {value: "Salary",     rowspan: 1, colspan: 1}
            ]
        ];

        var expected_result = [
            [
                {value: "First",      rowspan: 1, colspan: 1},
                {value: "Name",       rowspan: 3, colspan: 1},
                {value: "Position",   rowspan: 2, colspan: 1},
                {value: "Stuff",      rowspan: 1, colspan: 3},
                {}, // inserted
                {}, // inserted
                {value: "",           rowspan: 1, colspan: 1}
            ],
            [
                {value: "Second",     rowspan: 1, colspan: 1},
                {}, // inserted
                {}, // inserted
                {value: "Office",     rowspan: 1, colspan: 1},
                {value: "Age",        rowspan: 1, colspan: 1},
                {value: "Start date", rowspan: 1, colspan: 1},
                {value: "Salary",     rowspan: 1, colspan: 1}
            ],
            [
                {},
                {}
            ]
        ];

        it("should return as expected", function () {
            var result = Util.transformWorksheetHeadersArray(headers);
            expect(expected_result).toEqual(result);
        });
    });

    //--------------------------------------------
    // convertWorksheetHeadersArrayToObject
    //--------------------------------------------

    describe("convertWorksheetHeadersArrayToObject", function() {

        var headers = [
            [
                {value: "First",      rowspan: 1, colspan: 1},
                {value: "Name",       rowspan: 3, colspan: 1},
                {value: "Position",   rowspan: 2, colspan: 1},
                {value: "Stuff",      rowspan: 1, colspan: 3},
                {}, // inserted
                {}, // inserted
                {value: "",           rowspan: 1, colspan: 1}
            ],
            [
                {value: "Second",     rowspan: 1, colspan: 1},
                {}, // inserted
                {}, // inserted
                {value: "Office",     rowspan: 1, colspan: 1},
                {value: "Age",        rowspan: 1, colspan: 1},
                {value: "Start date", rowspan: 1, colspan: 1},
                {value: "Salary",     rowspan: 1, colspan: 1}
            ],
            [
                {},
                {}
            ]
        ];

        var expected_result = {
            A1: "First",
            B1: "Name",
            C1: "Position",
            D1: "Stuff",
            G1: "",
            A2: "Second",
            D2: "Office",
            E2: "Age",
            F2: "Start date",
            G2: "Salary"
        };

        it("should return as expected", function () {
            var result = Util.convertWorksheetHeadersArrayToObject(headers);
            expect(expected_result).toEqual(result);
        });
    });

    //--------------------------------------------
    // calculateWorksheetHeadersMerges
    //--------------------------------------------

    describe("calculateWorksheetHeadersMerges", function() {

        var headers = [
            [
                {value: "First",      rowspan: 1, colspan: 1},
                {value: "Name",       rowspan: 3, colspan: 1},
                {value: "Position",   rowspan: 2, colspan: 1},
                {value: "Stuff",      rowspan: 1, colspan: 3},
                {}, // inserted
                {}, // inserted
                {value: "",           rowspan: 1, colspan: 1}
            ],
            [
                {value: "Second",     rowspan: 1, colspan: 1},
                {}, // inserted
                {}, // inserted
                {value: "Office",     rowspan: 1, colspan: 1},
                {value: "Age",        rowspan: 1, colspan: 1},
                {value: "Start date", rowspan: 1, colspan: 1},
                {value: "Salary",     rowspan: 1, colspan: 1}
            ],
            [
                {},
                {}
            ]
        ];

        var expected_result = [
            {
                s: {c: 1, r: 0}, // me
                e: {c: 1, r: 2}  // my merge
            },
            {
                s: {c: 2, r: 0}, // me
                e: {c: 2, r: 1}  // my merge
            },
            {
                s: {c: 3, r: 0}, // me
                e: {c: 5, r: 0}  // my merge
            }
        ];

        it("should return as expected", function () {
            var result = Util.calculateWorksheetHeadersMerges(headers);
            expect(expected_result).toEqual(result);
        });
    });

    //--------------------------------------------
    // nextLetter
    //--------------------------------------------

    describe("nextLetter", function() {

        it("should return B", function () {
            var result = Util.nextLetter("A");
            expect(result).toEqual("B");
        });
        it("should return b", function () {
            var result = Util.nextLetter("a");
            expect(result).toEqual("b");
        });
        it("should return AB", function () {
            var result = Util.nextLetter("AA");
            expect(result).toEqual("AB");
        });
        it("should return ab", function () {
            var result = Util.nextLetter("aa");
            expect(result).toEqual("ab");
        });
        it("should return aab", function () {
            var result = Util.nextLetter("aaa");
            expect(result).toEqual("aab");
        });
        it("should return aaab", function () {
            var result = Util.nextLetter("aaaa");
            expect(result).toEqual("aaab");
        });

        // with increment

        it("should return C", function () {
            var result = Util.nextLetter("A", 2);
            expect(result).toEqual("C");
        });
        it("should return D", function () {
            var result = Util.nextLetter("A", 3);
            expect(result).toEqual("D");
        });
        it("should return AD", function () {
            var result = Util.nextLetter("AA", 3);
            expect(result).toEqual("AD");
        });
    });

    //--------------------------------------------
    // letterToNumber
    //--------------------------------------------

    describe("letterToNumber", function() {

        it("should return 1", function () {
            var result = Util.letterToNumber("a");
            expect(result).toEqual(1);
        });
        it("should return 2", function () {
            var result = Util.letterToNumber("B");
            expect(result).toEqual(2);
        });
        it("should return 1", function () {
            var result = Util.letterToNumber("AA");
            expect(result).toEqual(1);
        });
    });

    //--------------------------------------------
    // numberToLetter
    //--------------------------------------------

    describe("numberToLetter", function() {

        it("should return a", function () {
            var result = Util.numberToLetter(1);
            expect(result).toEqual("a");
        });
        it("should return b", function () {
            var result = Util.numberToLetter(2);
            expect(result).toEqual("b");
        });
        it("should return A", function () {
            var result = Util.numberToLetter(1, true);
            expect(result).toEqual("A");
        });
        it("should return B", function () {
            var result = Util.numberToLetter(2, true);
            expect(result).toEqual("B");
        });
    });

    //--------------------------------------------
    // transformFilenameAndExtension
    //--------------------------------------------

    describe("transformFilenameAndExtension", function() {

        it("should return an object", function () {
            var result = Util.transformFilenameAndExtension("asasasas", 'xlsx');
            expect(_.isObject(result)).toBeTruthy();
        });
        it("result should have a filename property", function () {
            var result = Util.transformFilenameAndExtension("asasasas", 'xlsx');
            expect(_.has(result, 'filename')).toBeTruthy();
        });
        it("result should have a file_extension property", function () {
            var result = Util.transformFilenameAndExtension("asasasas", 'xlsx');
            expect(_.has(result, 'file_extension')).toBeTruthy();
        });

        it("should throw an error if file_name is not provided", function () {
            expect(function () {
                Util.transformFilenameAndExtension();
            }).toThrowError(Util.MESSAGE_FILE_NAME_IS_REQUIRED);
        });

        it("should throw an error if file_extension is not supported", function () {
            expect(function () {
                Util.transformFilenameAndExtension('asdasds', 'aaaa');
            }).toThrowError(Util.MESSAGE_UNSUPPORTED_FILE_EXTENSION);
        });

        it("should throw an error if file_name contains a valid extension that does not match file_extension", function () {
            expect(function () {
                Util.transformFilenameAndExtension('asdasds.xls', 'xlsx');
            }).toThrowError(Util.MESSAGE_FILE_EXTENSION_MISMATCH);
        });

        it("should throw an error if file_name does not contains a valid and file_extension is not provided", function () {
            expect(function () {
                Util.transformFilenameAndExtension('asdasds.asdsa');
            }).toThrowError(Util.MESSAGE_FILE_EXTENSION_IS_REQUIRED);
        });

        it("should add file_extension to filename is not set", function () {
            var result = Util.transformFilenameAndExtension('aaa', 'xls');
            expect(result.filename).toEqual('aaa.xls');
        });

        it("should not add file_extension if already set in filename", function () {
            var result = Util.transformFilenameAndExtension('aaa.xls', 'xls');
            expect(result.filename).toEqual('aaa.xls');
        });

        it("should not add file_extension if already set in filename, if file_extension if not provided", function () {
            var result = Util.transformFilenameAndExtension('aaa.xls');
            expect(result.filename).toEqual('aaa.xls');
        });

        it("should return extracted extension", function () {
            var result = Util.transformFilenameAndExtension('aaa.xls');
            expect(result.file_extension).toEqual('xls');
        });
    });

    //--------------------------------------------
    // getFileExtension
    //--------------------------------------------

    describe("getFileExtension", function() {

        it("should throw an error if mimetype is unsupported", function () {
            expect(function () {
                Util.getFileExtension('asdasds');
            }).toThrowError(Util.MESSAGE_UNSUPPORTED_FILE_MIMETYPE);
        });

        it("should return txt", function () {
            var result = Util.getFileExtension('text/plain');
            expect(result).toEqual('txt');
        });
        it("should return csv", function () {
            var result = Util.getFileExtension('text/csv');
            expect(result).toEqual('csv');
        });
        it("should return xlsx", function () {
            var result = Util.getFileExtension('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(result).toEqual('xlsx');
        });
        it("should return xls", function () {
            var result = Util.getFileExtension('application/vnd.ms-excel');
            expect(result).toEqual('xls');
        });
        it("should return ods", function () {
            var result = Util.getFileExtension('application/vnd.oasis.opendocument.spreadsheet');
            expect(result).toEqual('ods');
        });
    });

    //--------------------------------------------
    // getFileMimeType
    //--------------------------------------------

    describe("getFileMimeType", function() {

        it("should throw an error if extension is unsupported", function () {
            expect(function () {
                Util.getFileMimeType('asdasds');
            }).toThrowError(Util.MESSAGE_UNSUPPORTED_FILE_EXTENSION);
        });

        it("should return text/plain", function () {
            var result = Util.getFileMimeType('txt');
            expect(result).toEqual('text/plain');
        });
        it("should return text/csv", function () {
            var result = Util.getFileMimeType('csv');
            expect(result).toEqual('text/csv');
        });
        it("should return application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", function () {
            var result = Util.getFileMimeType('xlsx');
            expect(result).toEqual('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        });
        it("should return application/vnd.ms-excel", function () {
            var result = Util.getFileMimeType('xls');
            expect(result).toEqual('application/vnd.ms-excel');
        });
        it("should return application/vnd.oasis.opendocument.spreadsheet", function () {
            var result = Util.getFileMimeType('ods');
            expect(result).toEqual('application/vnd.oasis.opendocument.spreadsheet');
        });
    });
});
