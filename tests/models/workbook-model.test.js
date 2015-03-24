describe("Workbook Model", function() {

    var Model;

    // services (that we want to test)
    beforeEach(function() {
        Model = window.JSFile.Workbook;
    });

    //--------------------------------------------
    // constructor
    //--------------------------------------------

    describe("constructor", function() {

        // root

        it("should return and instance of Workbook model", function () {
            var result = new Model();
            expect(result instanceof Model).toBeTruthy();
        });
    });
});