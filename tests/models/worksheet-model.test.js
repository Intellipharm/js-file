describe("Worksheet Model", function() {

    var Model;
    var data = {
        "name": "Sheet Name",
        "headers": [[{"value": "First Name"}]],
        "data": [[{"value": "John"}]],
        "columns": [{"type": "string"}]
    };
    var transformWorksheetHeadersArray_result = [
        [{"value": "First Name", "rowspan": 1, "colspan": 1}]
    ];
    var calculateWorksheetHeadersMerges_result = [
        "A"
    ];
    var convertWorksheetHeadersArrayToObject_result = {A1: "First Name"};

    beforeEach(function() {

        // model
        Model = window.JSFile.Worksheet;

        // mocks
        spyOn(window.JSFile.FileUtil, 'transformWorksheetHeadersArray')
            .and.returnValue(transformWorksheetHeadersArray_result);

        spyOn(window.JSFile.FileUtil, 'calculateWorksheetHeadersMerges')
            .and.returnValue(calculateWorksheetHeadersMerges_result);

        spyOn(window.JSFile.FileUtil, 'convertWorksheetHeadersArrayToObject')
            .and.returnValue(convertWorksheetHeadersArrayToObject_result);

        spyOn(window.JSFile.FileUtil, 'nextLetter')
            .and.returnValue("B");
    });

    //--------------------------------------------
    // constructor
    //--------------------------------------------

    describe("constructor", function() {

        it("should throw an error if no data is passed", function () {
            expect(function () {
                var result = new Model();
            }).toThrowError();
        });

        it("should call JSFile.FileUtil.transformWorksheetHeadersArray with data.headers", function () {

            var result = new Model(data);
            expect(window.JSFile.FileUtil.transformWorksheetHeadersArray).toHaveBeenCalledWith(data.headers);
        });

        it("should call JSFile.FileUtil.calculateWorksheetHeadersMerges with result of JSFile.FileUtil.transformWorksheetHeadersArray", function () {

            var result = new Model(data);
            expect(window.JSFile.FileUtil.calculateWorksheetHeadersMerges).toHaveBeenCalledWith(transformWorksheetHeadersArray_result);
        });

        it("should set !merges property", function () {

            var result = new Model(data);
            expect(result['!merges']).toEqual(calculateWorksheetHeadersMerges_result);
        });

        it("should call JSFile.FileUtil.convertWorksheetHeadersArrayToObject with result of JSFile.FileUtil.transformWorksheetHeadersArray", function () {

            var result = new Model(data);
            expect(window.JSFile.FileUtil.convertWorksheetHeadersArrayToObject).toHaveBeenCalledWith(transformWorksheetHeadersArray_result);
        });

        it("should set property for each header", function () {

            var result = new Model(data);
            expect(!_.isUndefined(result['A1'])).toBeTruthy();
        });

        it("each header property should be an instance of JSFile.WorksheetCell", function () {

            var result = new Model(data);
            expect(result['A1'] instanceof JSFile.WorksheetCell).toBeTruthy();
        });

        it("should set property for each data.data", function () {

            var result = new Model(data);

            expect(!_.isUndefined(result['A2'])).toBeTruthy();
        });

        it("each data property should be an instance of JSFile.WorksheetCell", function () {

            var result = new Model(data);
            expect(result['A2'] instanceof JSFile.WorksheetCell).toBeTruthy();
        });

        it("should call JSFile.FileUtil.nextLetter with A", function () {

            var result = new Model(data);
            expect(window.JSFile.FileUtil.nextLetter).toHaveBeenCalledWith("A");
        });

        it("should set !ref property", function () {

            var result = new Model(data);
            expect(!_.isUndefined(result['!ref'])).toBeTruthy();
        });
    });
});