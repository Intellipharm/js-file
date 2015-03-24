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

Call window.JSFile.FileCreator.createWorkbook with the following data structure:

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

Call window.JSFile.FileDownloader.downloadWorkbook with the result of the above method.

## API

#### JSFile.Workbook(data)

Model used to create workbook.


#### JSFile.FileCreator

###### createWorkbook(data)

| param  | type   | description                                  |
| ------ | ------ | -------------------------------------------- |
| data   | array  | Data to use when creating the workbook       |


#### JSFile.FileDownloader

###### downloadWorkbook(workbook, filename)

Initiates a download when passed an instance of the JSFile.Workbook model.

| param      | type             | description                                                    |
| ---------- | ---------------- | -------------------------------------------------------------- |
| workbook   | JSFile.Workbook  | Workbook created using JSFile.FileCreator.createWorkbook       |
| filename   | string           | Name of the file                                               |


#### JSFile.FileReader

Converts a file into json. Curently only supports xlxs, xlx, csv, ods.