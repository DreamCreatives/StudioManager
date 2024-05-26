import { CID, DROPDOWNS } from "../constants.json"

export const editConfig = [
    {
        "equipmentDetail": {
            fields: [
                {
                    fieldLabel: "Equipment name",
                    fieldType: "text",
                    fieldName: "name",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "Quantity",
                    fieldType: "text",
                    fieldName: "quantity",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "Total quantity",
                    fieldType: "text",
                    fieldName: "initialQuantity",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "Equipment type",
                    fieldType: "number",
                    fieldName: "equipmentTypeId",
                    isClass: true,
                    classDataUrl: DROPDOWNS.EQUIPMENT_TYPE,
                }
            ],
            rerouteOnCancel: 'equipment-list',
            baseUrl: CID.EQUIPMENT,
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
                    fieldValue: ''
                },
                {
                    fieldKey: 'quantity',
                    fieldValue: ''
                },
                {
                    fieldKey: 'initialQuantity',
                    fieldValue: ''
                },
                {
                    fieldKey: 'equipmentTypeId',
                    fieldValue: ''
                }
            ]
        },
        "equipmentTypeDetail": {
            fields: [
                {
                    fieldLabel: "Name",
                    fieldType: "text",
                    fieldName: "name",
                    isClass: false,
                    classDataUrl: '',
                }
            ],
            rerouteOnCancel: 'equipment-types-list',
            baseUrl: CID.EQUIPMENT_TYPE,
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
                    fieldValue: ''
                },
            ]
        },
        "equipmentReservationDetail": {
            fields: [
                {
                    fieldLabel: "Equipment",
                    fieldType: "text",
                    fieldName: "equipmentId",
                    isClass: true,
                    classDataUrl: DROPDOWNS.EQUIPMENT,
                },
                {
                    fieldLabel: "Start date",
                    fieldType: "date",
                    fieldName: "startDate",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "End date",
                    fieldType: "date",
                    fieldName: "endDate",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "Quantity",
                    fieldType: "number",
                    fieldName: "quantity",
                    isClass: false,
                    classDataUrl: '',
                }
            ],
            rerouteOnCancel: 'equipment-reservations-calendar',
            baseUrl: CID.EQUIPMENT_RESERVATION,
            formBuilderGroupFields: [
                {
                    fieldKey: "equipmentId",
                    fieldValue: ""
                },
                {
                    fieldKey: "startDate",
                    fieldValue: ""
                },
                {
                    fieldKey: "endDate",
                    fieldValue: ""
                },
                {
                    fieldKey: "quantity",
                    fieldValue: ""
                }
            ]
        },
        "printerDetail": {
            fields: [
                {
                    fieldLabel: "Printer name",
                    fieldType: "text",
                    fieldName: "printerName",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "Type",
                    fieldType: "number",
                    fieldName: "printerTypeName",
                    isClass: false,
                    classDataUrl: '',
                }
            ],
            rerouteOnCancel: '',
            baseUrl: '',
            formBuilderGroupFields: []
        },
        "stlFileDetail": {
            fields: [
                {
                    fieldLabel: "Name",
                    fieldType: "text",
                    fieldName: "stlFiletName",
                    isClass: false,
                    classDataUrl: '',
                }
            ],
            rerouteOnCancel: '',
            baseUrl: '',
            formBuilderGroupFields: []
        }
    }
]