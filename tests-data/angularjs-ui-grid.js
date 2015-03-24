"use strict";

window.test_data = window.test_data || {};

(function(data) {

    data['angularjs-ui-grid'] = [
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
                    "type": "num"
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
})(window.test_data);