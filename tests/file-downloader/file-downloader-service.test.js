describe("FileDownloader", function() {

    var Service, workbook;

    beforeEach(function() {

        // services (that we want to test)
        Service = window.JSFile.FileDownloader;
    });

    //--------------------------------------------
    // downloadWorkbook
    //--------------------------------------------

    describe("downloadWorkbook", function() {

        beforeEach(function() {

            // mocks
            spyOn(window.XLSX, 'write').and.returnValue("AAA");
            spyOn(window.JSFile, 'Workbook').and.returnValue("AAA");
            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension').and.returnValue({filename: 'aaa.xls', file_extension: 'xls'});
            spyOn(Service.create_file_handlers, 'xlsx').and.returnValue("AAA");
            spyOn(Service.create_file_handlers, 'ods').and.returnValue("AAA");
            spyOn(Service.create_file_handlers, 'xls').and.returnValue("AAA");
            spyOn(Service.create_file_handlers, 'txt').and.returnValue("AAA");
            spyOn(Service.create_file_handlers, 'csv').and.returnValue("AAA");
            spyOn(window, 'Blob').and.returnValue("AAA");
            spyOn(window, 'saveAs').and.returnValue("AAA");

            window.navigator.msSaveBlob = false;

            workbook = new window.JSFile.Workbook();
        });

        it("should throw an error if no workbook is passed", function () {
            expect(function () {
                var result = Service.downloadWorkbook();
            }).toThrowError(Service.MESSAGE_WORKBOOK_IS_REQUIRED);
        });

        it("should throw an error if workbook is not an instance of JSFile.Workbook", function () {
            expect(function () {
                var result = Service.downloadWorkbook({}, '', 'xlsx');
            }).toThrowError(Service.MESSAGE_WORKBOOK_MODEL_IS_INVALID);
        });

        it("should throw an error if file_name is not provided", function () {
            expect(function () {
                var result = Service.downloadWorkbook(workbook);
            }).toThrowError(Service.MESSAGE_FILE_NAME_IS_REQUIRED);
        });

        it("should call FileUtil.transformFilenameAndExtension with file_name & file_extension", function () {
            var result = Service.downloadWorkbook(workbook, 'a', 'xls');
            expect(window.JSFile.FileUtil.transformFilenameAndExtension).toHaveBeenCalledWith('a', 'xls');
        });
    });

    //--------------------------------------------
    // downloadWorkbook (create file)
    //--------------------------------------------

    describe("downloadWorkbook (create file)", function() {

        beforeEach(function() {

            // mocks
            spyOn(window.XLSX, 'write').and.returnValue("AAA");
            spyOn(window.JSFile, 'Workbook').and.returnValue("AAA");
            spyOn(window, 'Blob').and.returnValue("AAA");
            spyOn(window, 'saveAs').and.returnValue("AAA");

            window.navigator.msSaveBlob = false;

            workbook = new window.JSFile.Workbook();
        });

        it("should call create_file_handlers.xlsx if file_extension is xlsx", function () {

            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension')
                .and.returnValue({filename: "aaa.xlsx", file_extension: 'xlsx'});

            spyOn(Service.create_file_handlers, 'xlsx').and.returnValue([]);

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(Service.create_file_handlers.xlsx).toHaveBeenCalledWith(workbook, 'xlsx');
        });

        it("should call create_file_handlers.ods if file_extension is ods", function () {

            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension')
                .and.returnValue({filename: "aaa.ods", file_extension: 'ods'});

            spyOn(Service.create_file_handlers, 'ods').and.returnValue([]);

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(Service.create_file_handlers.ods).toHaveBeenCalledWith(workbook, 'ods');
        });

        it("should call create_file_handlers.xls if file_extension is xls", function () {

            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension')
                .and.returnValue({filename: "aaa.xls", file_extension: 'xls'});

            spyOn(Service.create_file_handlers, 'xls').and.returnValue([]);

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(Service.create_file_handlers.xls).toHaveBeenCalledWith(workbook, 'xls');
        });

        it("should call create_file_handlers.txt if file_extension is txt", function () {

            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension')
                .and.returnValue({filename: "aaa.txt", file_extension: 'txt'});

            spyOn(Service.create_file_handlers, 'txt').and.returnValue([]);

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(Service.create_file_handlers.txt).toHaveBeenCalledWith(workbook, 'txt');
        });

        it("should call create_file_handlers.csv if file_extension is csv", function () {

            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension')
                .and.returnValue({filename: "aaa.csv", file_extension: 'csv'});

            spyOn(Service.create_file_handlers, 'csv').and.returnValue([]);

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(Service.create_file_handlers.csv).toHaveBeenCalledWith(workbook, 'csv');
        });
    });

    //--------------------------------------------
    // downloadWorkbook (initiate file download)
    //--------------------------------------------

    describe("downloadWorkbook (initiate file download)", function() {

        beforeEach(function() {

            // mocks
            spyOn(window.XLSX, 'write').and.returnValue("AAA");
            spyOn(window.JSFile, 'Workbook').and.returnValue("AAA");
            spyOn(window.JSFile.FileUtil, 'transformFilenameAndExtension')
                .and.returnValue({filename: 'aaa.xlsx', file_extension: 'xlsx'});
            spyOn(Service.create_file_handlers, 'xlsx').and.returnValue("AAA");
            spyOn(window.JSFile.FileUtil, 'getFileMimeType').and.returnValue("AAA");
            spyOn(window, 'Blob').and.returnValue("AAA");
            spyOn(window, 'saveAs').and.returnValue("AAA");

            window.navigator.msSaveBlob = false;

            workbook = new window.JSFile.Workbook();
        });

        it("should call JSFile.FileUtil.getFileMimeType with file_extension", function () {

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(window.JSFile.FileUtil.getFileMimeType).toHaveBeenCalledWith('xlsx');
        });

        it("should call window.navigator.msSaveBlob with instance of Blob and filename (if navigator.msSaveBlob, which mean browser is IE and version 10+)", function () {

            // mocks
            window.navigator.msSaveBlob = function() {};
            spyOn(window.navigator, 'msSaveBlob');

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(window.navigator.msSaveBlob).toHaveBeenCalled();
            expect(window.navigator.msSaveBlob.calls.mostRecent().args[0] instanceof window.Blob).toBeTruthy();
            expect(window.navigator.msSaveBlob.calls.mostRecent().args[1]).toEqual('aaa.xlsx');
        });

        it("should throw an error if !Modernizr.adownload and no initiateFileDownloadFallback is provided", function () {
            expect(function () {
                // mocks
                Modernizr.adownload = false;

                var result = Service.downloadWorkbook(workbook, 'a', 'b');
            }).toThrowError(Service.UNSUPPORTED_BROWSER_FEATURE_AND_NO_FALLBACK);
        });

        it("should call JSFile.FileDownloader.initiateFileDownloadFallback with instance of Blob and filename, if provided and !Modernizr.adownload", function () {

            // mocks
            Modernizr.adownload = false;
            Service.initiateFileDownloadFallback = function() {};
            spyOn(Service, 'initiateFileDownloadFallback');

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(Service.initiateFileDownloadFallback).toHaveBeenCalled();
            expect(Service.initiateFileDownloadFallback.calls.mostRecent().args[0] instanceof window.Blob).toBeTruthy();
            expect(Service.initiateFileDownloadFallback.calls.mostRecent().args[1]).toEqual('aaa.xlsx');
        });

        it("should call saveAs with instance of Blob and filename if Modernizr.adownload", function () {

            // mocks
            Modernizr.adownload = true;

            var result = Service.downloadWorkbook(workbook, 'a', 'b');
            expect(window.saveAs).toHaveBeenCalled();
            expect(window.saveAs.calls.mostRecent().args[0] instanceof window.Blob).toBeTruthy();
            expect(window.saveAs.calls.mostRecent().args[1]).toEqual('aaa.xlsx');
        });

    });
});