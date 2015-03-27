"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    // supported file types

    module.supported_file_types = {
        'txt': 'text/plain',
        'csv': 'text/csv',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xls': 'application/vnd.ms-excel',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet'
    };

})(window.JSFile);