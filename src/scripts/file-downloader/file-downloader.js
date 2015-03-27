"use strict";

// dependency checks
if (typeof _ === 'undefined') {
    throw new Error("Please include Lodash (https://github.com/lodash/lodash)");
}
if (typeof XLSX === 'undefined') {
    throw new Error("Please include js-xlsx (https://github.com/SheetJS/js-xlsx)");
}
if (typeof Blob === 'undefined') {
    throw new Error("Please include blob (https://github.com/eligrey/Blob.js/)");
}
if (typeof saveAs === 'undefined') {
    throw new Error("Please include file-saver (https://github.com/eligrey/FileSaver.js/)");
}