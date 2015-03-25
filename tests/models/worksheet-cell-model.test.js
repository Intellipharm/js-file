describe("Worksheet Model", function() {

    var Model;

    beforeEach(function() {

        // model
        Model = window.JSFile.WorksheetCell;
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

        it("should throw an error if no data.value is passed", function () {
            expect(function () {
                var result = new Model({});
            }).toThrowError();
        });

        it("should set t & v properties if correct data is passed", function () {

            var result = new Model({type: 's', value: 'AAA'});
            expect(result.t).toEqual('s');
            expect(result.v).toEqual('AAA');
        });


    });
});