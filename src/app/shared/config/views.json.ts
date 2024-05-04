export const viewsConfig = [
    {
        "dataGrid": {
            "equipmentList": {
                dataGridName: 'Equipment list',
                reroutePath: 'equipment-list',
                headers: ["ID", "Name"],
                data: [[1, 'test equ'], [2, 'test'], [3, 'test'], [4, 'test']]
            },
            "equipmentTypes": {
                dataGridName: 'Equipment types',
                reroutePath: 'equipment-types-list',
                headers: ["ID", "Name"],
                data: [[1, 'test equ type'], [2, 'test'], [3, 'test'], [4, 'test']]
            },
            "printersList": {
                dataGridName: 'Printers list',
                reroutePath: 'printers-list',
                headers: ["ID", "Printer name", "Printer IP"],
                data: [[1, "Ender 3", "test ip"], [2, "Ender 3 V2", "test ip 2"]]
            },
            "stlFilesList": {
                dataGridName: 'STL files list',
                reroutePath: 'stl-files-list',
                headers: ["ID", "STL file name", "size"],
                data: [[1, "Ender 3", "test ip"], [2, "Ender 3 V2", "test ip 2"]]
            }
        },
        "edit": {
            "equipmentDetail": {
                fields: {
                    "Equipment Name": "text",
                    "Type": "number"
                }
            },
            "equipmentTypeDetail": {
                fields: {
                    "Name": "text"
                }
            },
            "printerDetail": {
                fields: {
                    "Printer Name": "text",
                    "Type": "number"
                }
            },
            "stlFileDetail": {
                fields: {
                    "Name": "text"
                }
            }
        },
        "wizard": {

        },
    }
]