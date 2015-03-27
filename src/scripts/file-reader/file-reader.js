"use strict";

// dependency checks
if (typeof _ === 'undefined') {
    throw new Error("Please include Lodash (https://github.com/lodash/lodash)");
}
if (typeof XLSX === 'undefined') {
    throw new Error("Please include js-xlsx (https://github.com/SheetJS/js-xlsx)");
}
if (typeof XLS === 'undefined') {
    throw new Error("Please include js-xls (https://github.com/SheetJS/js-xls)");
}