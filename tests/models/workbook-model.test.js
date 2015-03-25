describe("Workbook Model", function() {

    var Model, WorksheetModel;
    var data = [
        {
            "name": "Sheet Name",
            "headers": [[{"value": "First Name"}]],
            "data": [[{"value": "John"}]],
            "columns": [{"type": "string"}]
        }
    ];

    // services (that we want to test)
    beforeEach(function() {
        Model = window.JSFile.Workbook;
        WorksheetModel = window.JSFile.Worksheet;
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

        it("should call JSFile.FileUtil.transformData with data", function () {

            spyOn(window.JSFile.FileUtil, 'transformData');

            var data = ["A"];
            var result = new Model(data);

            expect(window.JSFile.FileUtil.transformData).toHaveBeenCalledWith(data);
        });

        it("should populate the SheetNames property", function () {

            spyOn(window.JSFile.FileUtil, 'transformData').and.returnValue(data);

            var result = new Model(data);

            expect(result.SheetNames[0]).toEqual("Sheet Name");
        });

        it("should create a new instance of JSFile.Worsheet for each item in the Sheets array", function () {

            spyOn(window.JSFile.FileUtil, 'transformData').and.returnValue(data);

            var result = new Model(data);

            expect(result.Sheets["Sheet Name"] instanceof WorksheetModel).toBeTruthy();
        });
    });
});