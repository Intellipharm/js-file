"use strict";

(function () {

    $(document).ready(function() {

        $('#table1').DataTable();
        intellipharm.download.dataTablesButton({
            container: '#table1button',
            table: '#table1'
        })

        $('#table2').DataTable({
            "columns": [
                { "type": "string" },
                { "type": "string" },
                { "type": "string" },
                { "type": "num" },
                { "type": "date" },
                { "type": "num" }
            ]
        });
        intellipharm.download.dataTablesButton({
            container: '#table2button',
            table: '#table2'
        })
    });

})();