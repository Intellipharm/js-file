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
        it("should return as expected", function () {
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
            var result = Util.transformWorksheetHeadersArray(headers);
            expect(expected_result).toEqual(result);
        });

        it("should return as expected again", function () {
            var headers = [
                [
                    {value: "Category", rowspan: 2},
                    {value: "Apotex Share", colspan: 3},
                    {value: "Innovator Share", colspan: 3},
                    {value: "Other Share", colspan: 3}
                ],
                [
                    {value: "U"},
                    {value: "$"},
                    {value: "%"},
                    {value: "U"},
                    {value: "$"},
                    {value: "%"},
                    {value: "U"},
                    {value: "$"},
                    {value: "%"}
                ]
            ];

            var expected_result = [
                [
                    {value: "Category", rowspan: 2},
                    {value: "Apotex Share", colspan: 3},
                    {}, // inserted
                    {}, // inserted
                    {value: "Innovator Share", colspan: 3},
                    {}, // inserted
                    {}, // inserted
                    {value: "Other Share", colspan: 3},
                    {}, // inserted
                    {}, // inserted
                ],
                [
                    {}, // inserted
                    {value: "U"},
                    {value: "$"},
                    {value: "%"},
                    {value: "U"},
                    {value: "$"},
                    {value: "%"},
                    {value: "U"},
                    {value: "$"},
                    {value: "%"},
                ]
            ];
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
            var result = Util.getFileExtension('txt', 'text/plain');
            expect(result).toEqual('txt');
        });
        it("should return csv", function () {
            var result = Util.getFileExtension('csv', 'text/csv');
            expect(result).toEqual('csv');
        });
        it("should return xlsx", function () {
            var result = Util.getFileExtension('xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(result).toEqual('xlsx');
        });
        it("should return xls", function () {
            var result = Util.getFileExtension('xls', 'application/vnd.ms-excel');
            expect(result).toEqual('xls');
        });
        it("should return csv on windows", function () {
            var result = Util.getFileExtension('csv', 'application/vnd.ms-excel');
            expect(result).toEqual(navigator.platform.indexOf('Win') !== -1 ? 'csv' : 'xls');
        });
        it("should return ods", function () {
            var result = Util.getFileExtension('ods', 'application/vnd.oasis.opendocument.spreadsheet');
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

    //--------------------------------------------
    // nextColumn
    //--------------------------------------------

    describe("nextColumn", function () {

        it("should return B", function () {
            var result = Util.nextColumn("A");
            expect(result).toEqual("B");
        });

        it("should return C", function () {
            var result = Util.nextColumn("B");
            expect(result).toEqual("C");
        });

        it("should return J", function () {
            var result = Util.nextColumn("I");
            expect(result).toEqual("J");
        });

        it("should return N", function () {
            var result = Util.nextColumn("M");
            expect(result).toEqual("N");
        });

        it("should return AA", function () {
            var result = Util.nextColumn("Z");
            expect(result).toEqual("AA");
        });

        it("should return AB", function () {
            var result = Util.nextColumn("AA");
            expect(result).toEqual("AB");
        });

        it("should return AC", function () {
            var result = Util.nextColumn("AB");
            expect(result).toEqual("AC");
        });

        it("should return AK", function () {
            var result = Util.nextColumn("AJ");
            expect(result).toEqual("AK");
        });

        it("should return AN", function () {
            var result = Util.nextColumn("AM");
            expect(result).toEqual("AN");
        });

        it("should return BA", function () {
            var result = Util.nextColumn("AZ");
            expect(result).toEqual("BA");
        });

        it("should return BB", function () {
            var result = Util.nextColumn("BA");
            expect(result).toEqual("BB");
        });

        it("should return BC", function () {
            var result = Util.nextColumn("BB");
            expect(result).toEqual("BC");
        });

        it("should return BK", function () {
            var result = Util.nextColumn("BJ");
            expect(result).toEqual("BK");
        });

        it("should return BN", function () {
            var result = Util.nextColumn("BM");
            expect(result).toEqual("BN");
        });

        it("should return CA", function () {
            var result = Util.nextColumn("BZ");
            expect(result).toEqual("CA");
        });

        it("should return CB", function () {
            var result = Util.nextColumn("CA");
            expect(result).toEqual("CB");
        });

        it("should return CC", function () {
            var result = Util.nextColumn("CB");
            expect(result).toEqual("CC");
        });

        it("should return CK", function () {
            var result = Util.nextColumn("CJ");
            expect(result).toEqual("CK");
        });

        it("should return CN", function () {
            var result = Util.nextColumn("CM");
            expect(result).toEqual("CN");
        });

        it("should return DA", function () {
            var result = Util.nextColumn("CZ");
            expect(result).toEqual("DA");
        });

        it("should return DB", function () {
            var result = Util.nextColumn("DA");
            expect(result).toEqual("DB");
        });

        it("should return DC", function () {
            var result = Util.nextColumn("DB");
            expect(result).toEqual("DC");
        });

        it("should return DK", function () {
            var result = Util.nextColumn("DJ");
            expect(result).toEqual("DK");
        });

        it("should return DN", function () {
            var result = Util.nextColumn("DM");
            expect(result).toEqual("DN");
        });

        it("should return EA", function () {
            var result = Util.nextColumn("DZ");
            expect(result).toEqual("EA");
        });

        it("should return EB", function () {
            var result = Util.nextColumn("EA");
            expect(result).toEqual("EB");
        });

        it("should return EC", function () {
            var result = Util.nextColumn("EB");
            expect(result).toEqual("EC");
        });

        it("should return EK", function () {
            var result = Util.nextColumn("EJ");
            expect(result).toEqual("EK");
        });

        it("should return EN", function () {
            var result = Util.nextColumn("EM");
            expect(result).toEqual("EN");
        });

        it("should return FA", function () {
            var result = Util.nextColumn("EZ");
            expect(result).toEqual("FA");
        });

        it("should return FB", function () {
            var result = Util.nextColumn("FA");
            expect(result).toEqual("FB");
        });

        it("should return FC", function () {
            var result = Util.nextColumn("FB");
            expect(result).toEqual("FC");
        });

        it("should return FK", function () {
            var result = Util.nextColumn("FJ");
            expect(result).toEqual("FK");
        });

        it("should return FN", function () {
            var result = Util.nextColumn("FM");
            expect(result).toEqual("FN");
        });

        it("should return GA", function () {
            var result = Util.nextColumn("FZ");
            expect(result).toEqual("GA");
        });

        it("should return GB", function () {
            var result = Util.nextColumn("GA");
            expect(result).toEqual("GB");
        });

        it("should return GC", function () {
            var result = Util.nextColumn("GB");
            expect(result).toEqual("GC");
        });

        it("should return GK", function () {
            var result = Util.nextColumn("GJ");
            expect(result).toEqual("GK");
        });

        it("should return GN", function () {
            var result = Util.nextColumn("GM");
            expect(result).toEqual("GN");
        });

        it("should return HA", function () {
            var result = Util.nextColumn("GZ");
            expect(result).toEqual("HA");
        });

        it("should return HB", function () {
            var result = Util.nextColumn("HA");
            expect(result).toEqual("HB");
        });

        it("should return HC", function () {
            var result = Util.nextColumn("HB");
            expect(result).toEqual("HC");
        });

        it("should return HK", function () {
            var result = Util.nextColumn("HJ");
            expect(result).toEqual("HK");
        });

        it("should return HN", function () {
            var result = Util.nextColumn("HM");
            expect(result).toEqual("HN");
        });

        it("should return IA", function () {
            var result = Util.nextColumn("HZ");
            expect(result).toEqual("IA");
        });

        it("should return IB", function () {
            var result = Util.nextColumn("IA");
            expect(result).toEqual("IB");
        });

        it("should return IC", function () {
            var result = Util.nextColumn("IB");
            expect(result).toEqual("IC");
        });

        it("should return IK", function () {
            var result = Util.nextColumn("IJ");
            expect(result).toEqual("IK");
        });

        it("should return IN", function () {
            var result = Util.nextColumn("IM");
            expect(result).toEqual("IN");
        });

        it("should return JA", function () {
            var result = Util.nextColumn("IZ");
            expect(result).toEqual("JA");
        });

        it("should return JB", function () {
            var result = Util.nextColumn("JA");
            expect(result).toEqual("JB");
        });

        it("should return JC", function () {
            var result = Util.nextColumn("JB");
            expect(result).toEqual("JC");
        });

        it("should return JK", function () {
            var result = Util.nextColumn("JJ");
            expect(result).toEqual("JK");
        });

        it("should return JN", function () {
            var result = Util.nextColumn("JM");
            expect(result).toEqual("JN");
        });

        it("should return KA", function () {
            var result = Util.nextColumn("JZ");
            expect(result).toEqual("KA");
        });

        it("should return KB", function () {
            var result = Util.nextColumn("KA");
            expect(result).toEqual("KB");
        });

        it("should return KC", function () {
            var result = Util.nextColumn("KB");
            expect(result).toEqual("KC");
        });

        it("should return KK", function () {
            var result = Util.nextColumn("KJ");
            expect(result).toEqual("KK");
        });

        it("should return KN", function () {
            var result = Util.nextColumn("KM");
            expect(result).toEqual("KN");
        });

        it("should return LA", function () {
            var result = Util.nextColumn("KZ");
            expect(result).toEqual("LA");
        });

        it("should return LB", function () {
            var result = Util.nextColumn("LA");
            expect(result).toEqual("LB");
        });

        it("should return LC", function () {
            var result = Util.nextColumn("LB");
            expect(result).toEqual("LC");
        });

        it("should return LK", function () {
            var result = Util.nextColumn("LJ");
            expect(result).toEqual("LK");
        });

        it("should return LN", function () {
            var result = Util.nextColumn("LM");
            expect(result).toEqual("LN");
        });

        it("should return MA", function () {
            var result = Util.nextColumn("LZ");
            expect(result).toEqual("MA");
        });

        it("should return MB", function () {
            var result = Util.nextColumn("MA");
            expect(result).toEqual("MB");
        });

        it("should return MC", function () {
            var result = Util.nextColumn("MB");
            expect(result).toEqual("MC");
        });

        it("should return MK", function () {
            var result = Util.nextColumn("MJ");
            expect(result).toEqual("MK");
        });

        it("should return MN", function () {
            var result = Util.nextColumn("MM");
            expect(result).toEqual("MN");
        });

        it("should return NA", function () {
            var result = Util.nextColumn("MZ");
            expect(result).toEqual("NA");

        });

        it("should return NB", function () {
            var result = Util.nextColumn("NA");
            expect(result).toEqual("NB");
        });

        it("should return NC", function () {
            var result = Util.nextColumn("NB");
            expect(result).toEqual("NC");
        });

        it("should return NK", function () {
            var result = Util.nextColumn("NJ");
            expect(result).toEqual("NK");
        });

        it("should return NN", function () {
            var result = Util.nextColumn("NM");
            expect(result).toEqual("NN");
        });

        it("should return OA", function () {
            var result = Util.nextColumn("NZ");
            expect(result).toEqual("OA");
        });

        it("should return PB", function () {
            var result = Util.nextColumn("PA");
            expect(result).toEqual("PB");
        });

        it("should return PC", function () {
            var result = Util.nextColumn("PB");
            expect(result).toEqual("PC");
        });

        it("should return PK", function () {
            var result = Util.nextColumn("PJ");
            expect(result).toEqual("PK");
        });

        it("should return PN", function () {
            var result = Util.nextColumn("PM");
            expect(result).toEqual("PN");
        });

        it("should return QA", function () {
            var result = Util.nextColumn("PZ");
            expect(result).toEqual("QA");
        });

        it("should return QB", function () {
            var result = Util.nextColumn("QA");
            expect(result).toEqual("QB");
        });

        it("should return QC", function () {
            var result = Util.nextColumn("QB");
            expect(result).toEqual("QC");
        });

        it("should return QK", function () {
            var result = Util.nextColumn("QJ");
            expect(result).toEqual("QK");
        });

        it("should return QN", function () {
            var result = Util.nextColumn("QM");
            expect(result).toEqual("QN");
        });

        it("should return RA", function () {
            var result = Util.nextColumn("QZ");
            expect(result).toEqual("RA");
        });

        it("should return RB", function () {
            var result = Util.nextColumn("RA");
            expect(result).toEqual("RB");
        });

        it("should return RC", function () {
            var result = Util.nextColumn("RB");
            expect(result).toEqual("RC");
        });

        it("should return RK", function () {
            var result = Util.nextColumn("RJ");
            expect(result).toEqual("RK");
        });

        it("should return RN", function () {
            var result = Util.nextColumn("RM");
            expect(result).toEqual("RN");
        });

        it("should return SA", function () {
            var result = Util.nextColumn("RZ");
            expect(result).toEqual("SA");
        });

        it("should return SB", function () {
            var result = Util.nextColumn("SA");
            expect(result).toEqual("SB");
        });

        it("should return SC", function () {
            var result = Util.nextColumn("SB");
            expect(result).toEqual("SC");
        });

        it("should return SK", function () {
            var result = Util.nextColumn("SJ");
            expect(result).toEqual("SK");
        });

        it("should return SN", function () {
            var result = Util.nextColumn("SM");
            expect(result).toEqual("SN");
        });

        it("should return TA", function () {
            var result = Util.nextColumn("SZ");
            expect(result).toEqual("TA");
        });

        it("should return TB", function () {
            var result = Util.nextColumn("TA");
            expect(result).toEqual("TB");
        });

        it("should return TC", function () {
            var result = Util.nextColumn("TB");
            expect(result).toEqual("TC");
        });

        it("should return TK", function () {
            var result = Util.nextColumn("TJ");
            expect(result).toEqual("TK");
        });

        it("should return TN", function () {
            var result = Util.nextColumn("TM");
            expect(result).toEqual("TN");
        });

        it("should return UA", function () {
            var result = Util.nextColumn("TZ");
            expect(result).toEqual("UA");
        });

        it("should return UB", function () {
            var result = Util.nextColumn("UA");
            expect(result).toEqual("UB");
        });

        it("should return UC", function () {
            var result = Util.nextColumn("UB");
            expect(result).toEqual("UC");
        });

        it("should return UK", function () {
            var result = Util.nextColumn("UJ");
            expect(result).toEqual("UK");
        });

        it("should return UN", function () {
            var result = Util.nextColumn("UM");
            expect(result).toEqual("UN");
        });

        it("should return VA", function () {
            var result = Util.nextColumn("UZ");
            expect(result).toEqual("VA");
        });

        it("should return VB", function () {
            var result = Util.nextColumn("VA");
            expect(result).toEqual("VB");
        });

        it("should return VC", function () {
            var result = Util.nextColumn("VB");
            expect(result).toEqual("VC");
        });

        it("should return VK", function () {
            var result = Util.nextColumn("VJ");
            expect(result).toEqual("VK");
        });

        it("should return VN", function () {
            var result = Util.nextColumn("VM");
            expect(result).toEqual("VN");
        });

        it("should return WA", function () {
            var result = Util.nextColumn("VZ");
            expect(result).toEqual("WA");
        });

        it("should return WB", function () {
            var result = Util.nextColumn("WA");
            expect(result).toEqual("WB");
        });

        it("should return WC", function () {
            var result = Util.nextColumn("WB");
            expect(result).toEqual("WC");
        });

        it("should return WK", function () {
            var result = Util.nextColumn("WJ");
            expect(result).toEqual("WK");
        });

        it("should return WN", function () {
            var result = Util.nextColumn("WM");
            expect(result).toEqual("WN");
        });

        it("should return XA", function () {
            var result = Util.nextColumn("WZ");
            expect(result).toEqual("XA");
        });

        it("should return XB", function () {
            var result = Util.nextColumn("XA");
            expect(result).toEqual("XB");
        });

        it("should return XC", function () {
            var result = Util.nextColumn("XB");
            expect(result).toEqual("XC");
        });

        it("should return XK", function () {
            var result = Util.nextColumn("XJ");
            expect(result).toEqual("XK");
        });

        it("should return XN", function () {
            var result = Util.nextColumn("XM");
            expect(result).toEqual("XN");
        });

        it("should return YA", function () {
            var result = Util.nextColumn("XZ");
            expect(result).toEqual("YA");
        });

        it("should return YB", function () {
            var result = Util.nextColumn("YA");
            expect(result).toEqual("YB");
        });

        it("should return YC", function () {
            var result = Util.nextColumn("YB");
            expect(result).toEqual("YC");
        });

        it("should return YK", function () {
            var result = Util.nextColumn("YJ");
            expect(result).toEqual("YK");
        });

        it("should return YN", function () {
            var result = Util.nextColumn("YM");
            expect(result).toEqual("YN");
        });

        it("should return ZA", function () {
            var result = Util.nextColumn("YZ");
            expect(result).toEqual("ZA");
        });

        it("should return ZB", function () {
            var result = Util.nextColumn("ZA");
            expect(result).toEqual("ZB");
        });

        it("should return ZC", function () {
            var result = Util.nextColumn("ZB");
            expect(result).toEqual("ZC");
        });

        it("should return ZK", function () {
            var result = Util.nextColumn("ZJ");
            expect(result).toEqual("ZK");
        });

        it("should return ZN", function () {
            var result = Util.nextColumn("ZM");
            expect(result).toEqual("ZN");
        });

        it("should return ZZ", function () {
            var result = Util.nextColumn("ZY");
            expect(result).toEqual("ZZ");
        });
    });

});
