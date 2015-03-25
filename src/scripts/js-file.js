"use strict";

// dependency checks
if (typeof _ === 'undefined') {
    throw new Error("Please include Lodash (https://github.com/lodash/lodash)");
}
if (typeof XLSX === 'undefined') {
    throw new Error("Please include js-xlsx (https://github.com/SheetJS/js-xlsx)");
}

window.JSFile = {};