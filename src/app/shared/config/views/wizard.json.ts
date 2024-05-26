import { DROPDOWNS } from "../constants.json"

export const wizardConfig = [
    {
        "addEquipmentList": {
            title: 'Create equipment',
            fields: [
                {
                    fieldLabel: "Name",
                    fieldType: "text",
                    fieldName: "name",
                    isClass: false,
                    classDataUrl: '',
                },
                {
                    fieldLabel: "Equipment type",
                    fieldType: "text",
                    fieldName: "equipmentTypeId",
                    isClass: true,
                    classDataUrl: DROPDOWNS.EQUIPMENT_TYPE,
                },
                {
                    fieldLabel: "Quantity",
                    fieldType: "number",
                    fieldName: "quantity",
                    isClass: false,
                    classDataUrl: '',
                },
            ],
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
                    fieldValue: ''
                },
                {
                    fieldKey: 'equipmentTypeId',
                    fieldValue: ''
                },
                {
                    fieldKey: 'quantity',
                    fieldValue: ''
                },
            ]
        },
        "addEquipmentTypeList": {
            title: 'Create equipment type',
            fields: [
                {
                    fieldLabel: "Name",
                    fieldType: "text",
                    fieldName: "name",
                    isClass: false,
                    classDataUrl: '',
                },
            ],
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
                    fieldValue: ''
                },
            ]
        },
        "addEquipmentReservation": {
            title: "Add equipment reservation",
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
        }
    }
]