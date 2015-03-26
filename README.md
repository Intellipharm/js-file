# js-file

JSFile handles file creation, downloading and reading in the browser using the SheetJS/JS-XLXS & SheetJS/JS-XLX libraries.


## Dependencies
js-file depends on [Lodash](https://github.com/lodash/lodash), [js-xlsx](https://github.com/SheetJS/js-xlsx), [js-xls](https://github.com/SheetJS/js-xls) 


## Installation

```js
bower install js-file --save
```
```html
<script src='bower_components/js-file/dist/js-file.min.js'></script>
```


## Getting Started

#### To create an xlxs workbook

Create an instance of window.JSFile.Workbook, and pass the following data as the first argument:

```js
[
    // repeat for each sheet
    {
        "name": "Sheet Name",
        "headers": [        
            // repeat for each header row
            [
                // repeat for each header
                {
                    "value": "First Name" // alternatives: displayName, display_name, name, label 
                }
            ]
        ],
        "data": [
            // repeat for each row
            [            
                // repeat for each column
                {
                    "value": "John"
                }
            ]
        ],
        "columns": [        
            // repeat for each column
            {
                "type": "string"
            }
        ]
    }
];

```


#### To download an xlxs workbook

Call window.JSFile.FileDownloader.downloadWorkbook with the result of the above method as the first argument, and whatever you want the file to be called as the second argument.


## JSFile.Workbook

Model used to create workbook.


## JSFile.FileDownloader API

### public constants

MESSAGE_WORKBOOK_IS_REQUIRED
MESSAGE_WORKBOOK_MODEL_IS_INVALID


### public methods

#### downloadWorkbook(workbook, filename)

Initiates a download when passed an instance of the JSFile.Workbook model.

| param      | type             | description                                                    |
| ---------- | ---------------- | -------------------------------------------------------------- |
| workbook   | JSFile.Workbook  | Workbook created using JSFile.FileCreator.createWorkbook       |
| filename   | string           | Name of the file                                               |


## JSFile.FileReader API

### public constants

MESSAGE_FILE_DATA_IS_REQUIRED
MESSAGE_FILE_TYPE_IS_REQUIRED
MESSAGE_UNSUPPORTED_FILE_TYPE
MESSAGE_FILE_READ_ERROR


### public methods

#### getFileType(type)

Returns a file type (either xlxs, xlx, csv, ods or txt) by matching provided argument to list of known file types.

| param  | type    | description                                  |
| ------ | ------- | -------------------------------------------- |
| type   | string  | File type to use when matching against list  |


#### getWorksheetNames(file_data, file_type)

Returns a list of worksheet names.

| param     | type    | description                                  |
| --------- | ------- | -------------------------------------------- |
| file_data | object  | Data to read and analyse                     |
| file_type | string  | Type of file_data                            |


#### fileToArray(file_data, file_type)

Converts a file into a javascript array. Currently supports xlxs, xlx, csv, ods, txt.

| param                  | type           | description                                        |
| ---------------------- | -------------- | -------------------------------------------------- |
| file_data              | object         | Data to read and convert to array                  |
| file_type              | string         | Type of file_data                                  |
| worksheet_has_headings | array|boolean  | whether or not sheet/s has/have a heading row      |
| group_by               | string         | how to group the data (row or column) *coming soon |
