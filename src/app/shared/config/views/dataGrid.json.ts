import { CID } from "../constants.json"

export const dataGridConfig = [
    {
        "equipmentList": {
            dataGridName: 'Equipment list',
            reroutePath: 'equipment-list',
            headers: ["ID", "Name", "Quantity", "Total quantity", 'Equipment type'],
            dataGridFieldsNames: ['id', 'name', 'quantity', 'initialQuantity', 'equipmentType'],
            data: [],
            getUrl: CID.EQUIPMENT,
        },
        "equipmentTypes": {
            dataGridName: 'Equipment types',
            reroutePath: 'equipment-types-list',
            headers: ["ID", "Name"],
            dataGridFieldsNames: ['id', 'name'],
            data: [],
            getUrl: CID.EQUIPMENT_TYPE
        },
        "printersList": {
            dataGridName: 'Printers list',
            reroutePath: 'printers-list',
            headers: ["ID", "Printer name", "Printer IP"],
            dataGridFieldsNames: ['id', 'name', 'quantity'],
            data: [[1, "Ender 3", "test ip"], [2, "Ender 3 V2", "test ip 2"]],
            getUrl: ''
        },
        "stlFilesList": {
            dataGridName: 'STL files list',
            reroutePath: 'stl-files-list',
            headers: ["ID", "STL file name", "size"],
            dataGridFieldsNames: ['id', 'name', 'quantity'],
            data: [[1, "Ender 3", "test ip"], [2, "Ender 3 V2", "test ip 2"]],
            getUrl: ''
        }
    }
]