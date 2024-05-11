export const editConfig = [
    {
        "equipmentDetail": {
            fields: [
                {
                    fieldLabel: "Equipment name",
                    fieldType: "text",
                    fieldName: "equipmentName"
                },
                {
                    fieldLabel: "Type",
                    fieldType: "number",
                    fieldName: "equipmentType"
                }
            ],
            rerouteOnCancel: 'equipment-list',
            baseUrl: '',
            formBuilderGroupFields: [
                {
                    fieldKey: 'equipmentName',
                    fieldValue: ''
                },
                {
                    fieldKey: 'equipmentType',
                    fieldValue: ''
                }
            ]
        },
        "equipmentTypeDetail": {
            fields: [
                {
                    fieldLabel: "Name",
                    fieldType: "text",
                    fieldName: "name"
                }
            ],
            rerouteOnCancel: 'equipment-types-list',
            baseUrl: 'http://localhost:5001/api/v1/Equipment/Types',
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
                    fieldValue: ''
                },
            ]
        },
        "printerDetail": {
            fields: [
                {
                    fieldLabel: "Printer name",
                    fieldType: "text",
                    fieldName: "printerName"
                },
                {
                    fieldLabel: "Type",
                    fieldType: "number",
                    fieldName: "printerTypeName"
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
                    fieldName: "stlFiletName"
                }
            ],
            rerouteOnCancel: '',
            baseUrl: '',
            formBuilderGroupFields: []
        }
    }
]