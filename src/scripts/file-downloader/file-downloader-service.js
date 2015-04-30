window.JSFile = window.JSFile || {};

(function(module) {
    'use strict';

    /**
     * FileDownloader Class
     *
     * @constructor
     */
    var FileDownloader = function() {

        var self = this;
        var message_prefix = "FileDownloader: ";

        this.MESSAGE_WORKBOOK_IS_REQUIRED       = message_prefix + "workbook param is required for FileDownloader.downloadWorkbook";
        this.MESSAGE_WORKBOOK_MODEL_IS_INVALID  = message_prefix + "workbook param must be an instance of JSFile.Workbook";
        this.MESSAGE_FILE_NAME_IS_REQUIRED      = message_prefix + "file_name is required";
        this.CURRENTLY_UNSUPPORTED_FILE_TYPE    = message_prefix + "this file type is currently not supported.";
        this.UNSUPPORTED_BROWSER_FEATURE_AND_NO_FALLBACK = message_prefix + "browser does support the required feature and no fallback method was provided";

        ///////////////////////////////////////////////////////////
        //
        // public methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * downloadWorkbook
         *
         * @param workbook
         * @param filename
         * @param file_extension
         */
        this.downloadWorkbook = function(workbook, filename, file_extension) {

            // validate args
            if (_.isUndefined(workbook) || _.isNull(workbook)) {
                throw new Error(this.MESSAGE_WORKBOOK_IS_REQUIRED);
            }
            if (!(workbook instanceof module.Workbook)) {
                throw new Error(this.MESSAGE_WORKBOOK_MODEL_IS_INVALID);
            }
            if (_.isUndefined(filename) || _.isNull(filename) || filename === "") {
                throw new Error(this.MESSAGE_FILE_NAME_IS_REQUIRED);
            }

            // transform file data (name & extension)
            var file_data = module.FileUtil.transformFilenameAndExtension(filename, file_extension);

            // create file array buffer
            var file_array_buffer = this.create_file_handlers[file_data.file_extension](workbook, file_data.file_extension);

            // get file mime_type
            var file_mimetype = module.FileUtil.getFileMimeType(file_data.file_extension);

            // initiate download
            initiateFileDownload(file_array_buffer, file_data.filename, file_mimetype);
        };

        ///////////////////////////////////////////////////////////
        //
        // private methods
        //
        ///////////////////////////////////////////////////////////

        /**
         * convertStringToArrayBuffer
         *
         * @param str
         * @returns {ArrayBuffer}
         */
        var convertStringToArrayBuffer = function(str) {
            var array_buffer = new ArrayBuffer(str.length);
            var view = new Uint8Array(array_buffer);
            for (var i = 0; i !== str.length; ++i) {
                view[i] = str.charCodeAt(i) & 0xFF;
            }
            return array_buffer;
        };

        /**
         * createXlsxFile
         *
         * @param workbook
         * @param file_extension
         */
        var createXlsxFile = function(workbook, file_extension) {
            var workbook_output = XLSX.write(workbook, {bookType: file_extension, bookSST: false, type: 'binary'});
            return convertStringToArrayBuffer(workbook_output);
        };

        /**
         * createOdsFile
         *
         * @param workbook
         * @param file_extension
         */
        var createOdsFile = function() {
            throw new Error(this.CURRENTLY_UNSUPPORTED_FILE_TYPE);
        };

        /**
         * createXlsFile
         *
         * @param workbook
         * @param file_extension
         */
        var createXlsFile = function() {
            throw new Error(this.CURRENTLY_UNSUPPORTED_FILE_TYPE);
        };

        /**
         * createTxtFile
         *
         * @param workbook
         * @param file_extension
         */
        var createTxtFile = function() {
            throw new Error(this.CURRENTLY_UNSUPPORTED_FILE_TYPE);
        };

        /**
         * createCsvFile
         *
         * @param workbook
         * @param file_extension
         */
        var createCsvFile = function() {
            throw new Error(this.CURRENTLY_UNSUPPORTED_FILE_TYPE);
        };

        /**
         * initiateFileDownload
         *
         * @param array_buffer
         * @param filename
         * @param file_mimetype
         */
        var initiateFileDownload = function(file_array_buffer, filename, file_mimetype) {
            // create Blob
            var blob = new Blob([file_array_buffer], {type: file_mimetype});

            // Blob is natively supported by all but ie8 & ie9
            // Blob.js creates a shim for ie8 & ie9
            // TODO: add seperate handling for text & csv

            // if browser is IE10+
            if (window.navigator.msSaveBlob) {

                // initiate ie10 download
                return window.navigator.msSaveBlob(blob, filename);
            }

            // adownload is not supported by browser (ie8, ie9, Safari)
            if (!Modernizr.adownload || !window.saveAs) {

                // no initiateFileDownloadFallback method is defined
                if (_.isUndefined(self.initiateFileDownloadFallback)) {
                    throw new Error(self.UNSUPPORTED_BROWSER_FEATURE_AND_NO_FALLBACK);
                }

                // call initiate download fallback
                return self.initiateFileDownloadFallback(blob, filename);
            }

            // initiate download
            return window.saveAs(blob, filename);
        };

        ///////////////////////////////////////////////////////////
        //
        // init
        //
        ///////////////////////////////////////////////////////////

        // handlers mapped by file type

        this.create_file_handlers = {
            xlsx:   createXlsxFile,
            ods:    createOdsFile,
            xls:    createXlsFile,
            txt:    createTxtFile,
            csv:    createCsvFile
        };
    };

    module.FileDownloader = new FileDownloader();

})(window.JSFile);
