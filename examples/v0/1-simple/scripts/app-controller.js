"use strict";

(function () {

    //-------------------------
    // App Controller
    //-------------------------

    var AppController = function ($scope) {

        $scope.filename1 = "AngularJS UI Grid data";
        $scope.filename2 = "JQuery DataTables data";
        $scope.filename3 = "JQuery DataTables data (complex headers)";

        var types = {
            'ui-grid': function() { return uigrid_data; },
            'datatables': function() { return datatables_data; },
            'datatables-complex': function() { return datatables_data_complex_headers; }
        };

        /**
         * clickHandler
         *
         * @param type
         */
        this.clickHandler = function(type, filename) {

            var data = types[type]();

            var FileCreator     = window.JSFile.FileCreator;
            var FileDownloader  = window.JSFile.FileDownloader;
            var workbook        = FileCreator.createWorkbook(data);

            FileDownloader.downloadWorkbook(workbook, filename);
        };
    };

    AppController.$inject = ['$scope'];

    angular.module('App').controller('AppController', AppController);

    var uigrid_data = [
        {
            "name": "My Sheet",
            "headers": [
                {
                    "name": "firstname",
                    "displayName": "First Name",
                    "width": 275,
                    "align": "left"
                },
                {
                    "name": "surname",
                    "displayName": "Last Name",
                    "width": 275,
                    "align": "left"
                },
                {
                    "name": "Card[0].card_number",
                    "displayName": "Card",
                    "width": 274,
                    "align": "left"
                }
            ],
            "data": [
                [
                    {
                        "value": "Raven"
                    },
                    {
                        "value": "Abbott"
                    },
                    {
                        "value": "1000010000013"
                    }
                ],
                [
                    {
                        "value": "Paige"
                    },
                    {
                        "value": "Gleason"
                    },
                    {
                        "value": "1000010000020"
                    }
                ],
                [
                    {
                        "value": "Timothy"
                    },
                    {
                        "value": "Eichmann"
                    },
                    {
                        "value": "1000010000037"
                    }
                ],
                [
                    {
                        "value": "Timothy"
                    },
                    {
                        "value": "Eichmann"
                    },
                    {
                        "value": "1000010000044"
                    }
                ],
                [
                    {
                        "value": "Archibald"
                    },
                    {
                        "value": "Hudson"
                    },
                    {
                        "value": "1000010000051"
                    }
                ],
                [
                    {
                        "value": "Archibald"
                    },
                    {
                        "value": "Hudson"
                    },
                    {
                        "value": "1000010000068"
                    }
                ],
                [
                    {
                        "value": "Eloisa"
                    },
                    {
                        "value": "Mayert"
                    },
                    {
                        "value": "1000010000075"
                    }
                ],
                [
                    {
                        "value": "Eloisa"
                    },
                    {
                        "value": "Mayert"
                    },
                    {
                        "value": "1000010000082"
                    }
                ],
                [
                    {
                        "value": "Oceane"
                    },
                    {
                        "value": "Doyle"
                    },
                    {
                        "value": "1000010000099"
                    }
                ],
                [
                    {
                        "value": "Richmond"
                    },
                    {
                        "value": "Streich"
                    },
                    {
                        "value": "1000010000105"
                    }
                ],
                [
                    {
                        "value": "Richmond"
                    },
                    {
                        "value": "Streich"
                    },
                    {
                        "value": "1000010000112"
                    }
                ]
            ],
            "columns": [
                {
                    "name": "firstname",
                    "displayName": "First Name",
                    "filter": {
                        "placeholder": "Search this column",
                        "condition": 16,
                        "flags": {
                            "caseSensitive": false
                        },
                        "$$hashKey": "object:42"
                    },
                    "type": "string"
                },
                {
                    "name": "surname",
                    "displayName": "Last Name",
                    "filter": {
                        "placeholder": "Search this column",
                        "condition": 16,
                        "flags": {
                            "caseSensitive": false
                        },
                        "$$hashKey": "object:46"
                    },
                    "type": "string"
                },
                {
                    "name": "Card[0].card_number",
                    "displayName": "Card",
                    "filter": {
                        "placeholder": "Search this column",
                        "condition": 16,
                        "flags": {
                            "caseSensitive": false
                        },
                        "$$hashKey": "object:50"
                    },
                    "type": "string"
                }
            ]
        },
        {
            "headers": [
                {
                    "name": "a",
                    "displayName": "A",
                    "width": 200,
                    "align": "left"
                },
                {
                    "name": "b",
                    "displayName": "B",
                    "width": 500,
                    "align": "right"
                }
            ],
            "data": [
                [
                    {
                        "value": "a1"
                    },
                    {
                        "value": "b1"
                    }
                ],
                [
                    {
                        "value": "a2"
                    },
                    {
                        "value": "b2"
                    }
                ],
                [
                    {
                        "value": "a3"
                    },
                    {
                        "value": "b3"
                    }
                ],
            ],
            "columns": [
                {
                    "name": "a",
                    "displayName": "A",
                    "type": "string"
                },
                {
                    "name": "b",
                    "displayName": "B",
                    "type": "string"
                }
            ]
        }
    ];

    var datatables_data = {
        "headers": [
            [
                {
                    "value": "Name",
                    "width": 7,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Position",
                    "width": 11,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Office",
                    "width": 9,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Age",
                    "width": 6,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Start date",
                    "width": 13,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Salary",
                    "width": 9,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                }
            ]
        ],
        "data": [
            [
                {
                    "value": "Tiger Nixon"
                },
                {
                    "value": "System Architect"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "61"
                },
                {
                    "value": "2011/04/25"
                },
                {
                    "value": "$320,800"
                }
            ],
            [
                {
                    "value": "Garrett Winters"
                },
                {
                    "value": "Accountant"
                },
                {
                    "value": "Tokyo"
                },
                {
                    "value": "63"
                },
                {
                    "value": "2011/07/25"
                },
                {
                    "value": "$170,750"
                }
            ],
            [
                {
                    "value": "Ashton Cox"
                },
                {
                    "value": "Junior Technical Author"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "66"
                },
                {
                    "value": "2009/01/12"
                },
                {
                    "value": "$86,000"
                }
            ],
            [
                {
                    "value": "Cedric Kelly"
                },
                {
                    "value": "Senior Javascript Developer"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "22"
                },
                {
                    "value": "2012/03/29"
                },
                {
                    "value": "$433,060"
                }
            ],
            [
                {
                    "value": "Airi Satou"
                },
                {
                    "value": "Accountant"
                },
                {
                    "value": "Tokyo"
                },
                {
                    "value": "33"
                },
                {
                    "value": "2008/11/28"
                },
                {
                    "value": "$162,700"
                }
            ],
            [
                {
                    "value": "Brielle Williamson"
                },
                {
                    "value": "Integration Specialist"
                },
                {
                    "value": "New York"
                },
                {
                    "value": "61"
                },
                {
                    "value": "2012/12/02"
                },
                {
                    "value": "$372,000"
                }
            ],
            [
                {
                    "value": "Herrod Chandler"
                },
                {
                    "value": "Sales Assistant"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "59"
                },
                {
                    "value": "2012/08/06"
                },
                {
                    "value": "$137,500"
                }
            ],
            [
                {
                    "value": "Rhona Davidson"
                },
                {
                    "value": "Integration Specialist"
                },
                {
                    "value": "Tokyo"
                },
                {
                    "value": "55"
                },
                {
                    "value": "2010/10/14"
                },
                {
                    "value": "$327,900"
                }
            ],
            [
                {
                    "value": "Colleen Hurst"
                },
                {
                    "value": "Javascript Developer"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "39"
                },
                {
                    "value": "2009/09/15"
                },
                {
                    "value": "$205,500"
                }
            ],
            [
                {
                    "value": "Sonya Frost"
                },
                {
                    "value": "Software Engineer"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "23"
                },
                {
                    "value": "2008/12/13"
                },
                {
                    "value": "$103,600"
                }
            ],
            [
                {
                    "value": "Jena Gaines"
                },
                {
                    "value": "Office Manager"
                },
                {
                    "value": "London"
                },
                {
                    "value": "30"
                },
                {
                    "value": "2008/12/19"
                },
                {
                    "value": "$90,560"
                }
            ],
            [
                {
                    "value": "Quinn Flynn"
                },
                {
                    "value": "Support Lead"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "22"
                },
                {
                    "value": "2013/03/03"
                },
                {
                    "value": "$342,000"
                }
            ],
            [
                {
                    "value": "Charde Marshall"
                },
                {
                    "value": "Regional Director"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "36"
                },
                {
                    "value": "2008/10/16"
                },
                {
                    "value": "$470,600"
                }
            ],
            [
                {
                    "value": "Haley Kennedy"
                },
                {
                    "value": "Senior Marketing Designer"
                },
                {
                    "value": "London"
                },
                {
                    "value": "43"
                },
                {
                    "value": "2012/12/18"
                },
                {
                    "value": "$313,500"
                }
            ],
            [
                {
                    "value": "Tatyana Fitzpatrick"
                },
                {
                    "value": "Regional Director"
                },
                {
                    "value": "London"
                },
                {
                    "value": "19"
                },
                {
                    "value": "2010/03/17"
                },
                {
                    "value": "$385,750"
                }
            ]
        ]
    };

    var datatables_data_complex_headers = {
        "headers": [
            [
                {
                    "value": "Name",
                    "rows": 2,
                    "width": 7,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Position",
                    "rows": 2,
                    "width": 11,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Stuff",
                    "cols": 3,
                    "width": 8
                },
                {
                    "value": "",
                    "width": 3
                }
            ],
            [
                {
                    "value": "Office",
                    "width": 9,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Age",
                    "width": 6,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Start date",
                    "width": 13,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                },
                {
                    "value": "Salary",
                    "width": 9,
                    "style": {
                        "borders": {
                            "bottom": {
                                "style": "thick"
                            }
                        }
                    }
                }
            ]
        ],
        "data": [
            [
                {
                    "value": "Tiger Nixon"
                },
                {
                    "value": "System Architect"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "61"
                },
                {
                    "value": "2011/04/25"
                },
                {
                    "value": "$320,800"
                }
            ],
            [
                {
                    "value": "Garrett Winters"
                },
                {
                    "value": "Accountant"
                },
                {
                    "value": "Tokyo"
                },
                {
                    "value": "63"
                },
                {
                    "value": "2011/07/25"
                },
                {
                    "value": "$170,750"
                }
            ],
            [
                {
                    "value": "Ashton Cox"
                },
                {
                    "value": "Junior Technical Author"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "66"
                },
                {
                    "value": "2009/01/12"
                },
                {
                    "value": "$86,000"
                }
            ],
            [
                {
                    "value": "Cedric Kelly"
                },
                {
                    "value": "Senior Javascript Developer"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "22"
                },
                {
                    "value": "2012/03/29"
                },
                {
                    "value": "$433,060"
                }
            ],
            [
                {
                    "value": "Airi Satou"
                },
                {
                    "value": "Accountant"
                },
                {
                    "value": "Tokyo"
                },
                {
                    "value": "33"
                },
                {
                    "value": "2008/11/28"
                },
                {
                    "value": "$162,700"
                }
            ],
            [
                {
                    "value": "Brielle Williamson"
                },
                {
                    "value": "Integration Specialist"
                },
                {
                    "value": "New York"
                },
                {
                    "value": "61"
                },
                {
                    "value": "2012/12/02"
                },
                {
                    "value": "$372,000"
                }
            ],
            [
                {
                    "value": "Herrod Chandler"
                },
                {
                    "value": "Sales Assistant"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "59"
                },
                {
                    "value": "2012/08/06"
                },
                {
                    "value": "$137,500"
                }
            ],
            [
                {
                    "value": "Rhona Davidson"
                },
                {
                    "value": "Integration Specialist"
                },
                {
                    "value": "Tokyo"
                },
                {
                    "value": "55"
                },
                {
                    "value": "2010/10/14"
                },
                {
                    "value": "$327,900"
                }
            ],
            [
                {
                    "value": "Colleen Hurst"
                },
                {
                    "value": "Javascript Developer"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "39"
                },
                {
                    "value": "2009/09/15"
                },
                {
                    "value": "$205,500"
                }
            ],
            [
                {
                    "value": "Sonya Frost"
                },
                {
                    "value": "Software Engineer"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "23"
                },
                {
                    "value": "2008/12/13"
                },
                {
                    "value": "$103,600"
                }
            ],
            [
                {
                    "value": "Jena Gaines"
                },
                {
                    "value": "Office Manager"
                },
                {
                    "value": "London"
                },
                {
                    "value": "30"
                },
                {
                    "value": "2008/12/19"
                },
                {
                    "value": "$90,560"
                }
            ],
            [
                {
                    "value": "Quinn Flynn"
                },
                {
                    "value": "Support Lead"
                },
                {
                    "value": "Edinburgh"
                },
                {
                    "value": "22"
                },
                {
                    "value": "2013/03/03"
                },
                {
                    "value": "$342,000"
                }
            ],
            [
                {
                    "value": "Charde Marshall"
                },
                {
                    "value": "Regional Director"
                },
                {
                    "value": "San Francisco"
                },
                {
                    "value": "36"
                },
                {
                    "value": "2008/10/16"
                },
                {
                    "value": "$470,600"
                }
            ],
            [
                {
                    "value": "Haley Kennedy"
                },
                {
                    "value": "Senior Marketing Designer"
                },
                {
                    "value": "London"
                },
                {
                    "value": "43"
                },
                {
                    "value": "2012/12/18"
                },
                {
                    "value": "$313,500"
                }
            ],
            [
                {
                    "value": "Tatyana Fitzpatrick"
                },
                {
                    "value": "Regional Director"
                },
                {
                    "value": "London"
                },
                {
                    "value": "19"
                },
                {
                    "value": "2010/03/17"
                },
                {
                    "value": "$385,750"
                }
            ]
        ]
    };
})();