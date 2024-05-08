export const viewsConfig = [
    {
        "dataGrid": {
            "equipmentList": {
                dataGridName: 'Equipment list',
                reroutePath: 'equipment-list',
                headers: ["ID", "Name"],
                data: [[1, 'test equ'], [2, 'test'], [3, 'test'], [4, 'test']],
                getUrl: ''
            },
            "equipmentTypes": {
                dataGridName: 'Equipment types',
                reroutePath: 'equipment-types-list',
                headers: ["ID", "Name"],
                data: [[1, 'test equ type'], [2, 'test'], [3, 'test'], [4, 'test']],
                getUrl: 'http://localhost:5001/api/v1/Equipment/Types'
            },
            "printersList": {
                dataGridName: 'Printers list',
                reroutePath: 'printers-list',
                headers: ["ID", "Printer name", "Printer IP"],
                data: [[1, "Ender 3", "test ip"], [2, "Ender 3 V2", "test ip 2"]],
                getUrl: ''
            },
            "stlFilesList": {
                dataGridName: 'STL files list',
                reroutePath: 'stl-files-list',
                headers: ["ID", "STL file name", "size"],
                data: [[1, "Ender 3", "test ip"], [2, "Ender 3 V2", "test ip 2"]],
                getUrl: ''
            }
        },
        "edit": {
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
        },
        "wizard": {
            "addEquipmentList": {
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
        },
    }
]