describe("FileDownloader", function() {

    var Service;

    beforeEach(function() {

        // services (that we want to test)
        Service = window.JSFile.FileDownloader;

        // mocks
        spyOn(window.XLSX, 'write')
            .and.returnValue("AAA");
    });

    //--------------------------------------------
    // downloadWorkbook
    //--------------------------------------------

    describe("downloadWorkbook", function() {

        it("should throw an error if no workbook is passed", function () {
            expect(function () {
                var result = Service.downloadWorkbook();
            }).toThrowError(Service.MESSAGE_WORKBOOK_IS_REQUIRED);
        });

        it("should throw an error if workbook is not an instance of JSFile.Workbook", function () {
            expect(function () {
                var result = Service.downloadWorkbook({});
            }).toThrowError(Service.MESSAGE_WORKBOOK_MODEL_IS_INVALID);
        });
    });
});