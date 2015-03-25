"use strict";

window.JSFile = window.JSFile || {};

(function(module) {

    /**
     * FileDownloader Class
     *
     * @constructor
     */
    var FileDownloader = function() {

        var self = this;

        this.MESSAGE_WORKBOOK_IS_REQUIRED = "workbook param is required for FileDownloader.downloadWorkbook";
        this.MESSAGE_WORKBOOK_MODEL_IS_INVALID = "workbook param my be an instance of JSFile.Workbook";

        /**
         * downloadWorkbook
         *
         * @param workbook
         * @param file_name
         */
        this.downloadWorkbook = function(workbook, file_name) {

            // validate args
            if (_.isUndefined(workbook) || _.isNull(workbook)) {
                throw new Error(this.MESSAGE_WORKBOOK_IS_REQUIRED);
            }
            if (!(workbook instanceof module.Workbook)) {
                throw new Error(this.MESSAGE_WORKBOOK_MODEL_IS_INVALID);
            }

            // arg defaults
            if (_.isUndefined(file_name)) {
                file_name = 'download.xlsx';
            }

            if (!_.endsWith(file_name, '.xlsx')) {
                file_name += '.xlsx';
            }

            // initiate file download
            // TODO: add config to specify output format
            var workbook_output = XLSX.write(workbook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
            var array_buffer = convertStringToArrayBuffer(workbook_output);

            downloadFile(file_name, array_buffer);
        };


        ///////////////////////////////////////////////////////////
        //
        // helper methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * convertStringToArrayBuffer
         *
         * @param str
         * @returns {ArrayBuffer}
         */
        function convertStringToArrayBuffer(str) {
            var array_buffer = new ArrayBuffer(str.length);
            var view = new Uint8Array(array_buffer);
            for (var i = 0; i != str.length; ++i) {
                view[i] = str.charCodeAt(i) & 0xFF;
            }
            return array_buffer;
        }

        /**
         * downloadFile (from Angular UI Data Grid)
         * TODO: research this and clean up
         *
         * @param file_name
         * @param array_buffer
         * @returns {*}
         */
        var downloadFile = function (file_name, array_buffer) {

            var D = document;
            var a = D.createElement('a');
            var strMimeType = 'application/octet-stream;charset=utf-8';
            var rawFile;

            // IE10+
            if (navigator.msSaveBlob) {
                return navigator.msSaveBlob(new Blob(["\ufeff", array_buffer], {
                    type: strMimeType
                }), file_name);
            }

            //html5 A[download]
            if ('download' in a) {

                var blob = new Blob([array_buffer], {
                    type: strMimeType
                });
                rawFile = URL.createObjectURL(blob);
                a.setAttribute('download', file_name);
            } else {
                rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(array_buffer);
                a.setAttribute('target', '_blank');
            }

            a.href = rawFile;
            a.setAttribute('style', 'display:none;');
            D.body.appendChild(a);
            setTimeout(function() {
                if (a.click) {
                    a.click();
                    // Workaround for Safari 5
                } else if (document.createEvent) {
                    var eventObj = document.createEvent('MouseEvents');
                    eventObj.initEvent('click', true, true);
                    a.dispatchEvent(eventObj);
                }
                D.body.removeChild(a);

            }, 100);
        };
    };

    module.FileDownloader = new FileDownloader();

})(window.JSFile);
