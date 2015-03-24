describe("FileCreator", function() {

    var Service, Model;

    // services (that we want to test)
    beforeEach(function() {
        Service = window.JSFile.FileCreator;
        Model = window.JSFile.Workbook;
    });

    //--------------------------------------------
    // createWorkbook
    //--------------------------------------------

    describe("createWorkbook", function() {

        _.forEach(window.test_data, function (data) {

            // root

            it("should return and instance of Workbook model", function () {
                var result = Service.createWorkbook(data);
                expect(result instanceof Model).toBeTruthy();
            });
        });
    });
});