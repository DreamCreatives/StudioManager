export const wizardConfig = [
    {
        "addEquipmentList": {
            title: 'Create equipment',
            fields: [
                {
                    fieldLabel: "Name",
                    fieldType: "text",
                    fieldName: "name"
                },
                // {
                //     fieldLabel: "Equipment type",
                //     fieldType: "text",
                //     fieldName: "equipmentType"
                // },
                {
                    fieldLabel: "Quantity",
                    fieldType: "number",
                    fieldName: "quantity"
                },
            ],
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
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
                    fieldName: "name"
                },
            ],
            formBuilderGroupFields: [
                {
                    fieldKey: 'name',
                    fieldValue: ''
                },
            ]
        }
    }
]