export const dataGridConfig = [
    {
        "equipmentList": {
            dataGridName: 'Equipment list',
            reroutePath: 'equipment-list',
            headers: ["ID", "Name", "Equipment type"],
            dataGridFieldsNames: ['id', 'name', 'quantity'],
            data: [[1, 'test equ', ''], [2, 'test',''], [3, 'test',''], [4, 'test','']],
            getUrl: 'http://localhost:5001/api/v1/Equipments'
        },
        "equipmentTypes": {
            dataGridName: 'Equipment types',
            reroutePath: 'equipment-types-list',
            headers: ["ID", "Name"],
            dataGridFieldsNames: ['id', 'name'],
            data: [[1, 'test equ type'], [2, 'test'], [3, 'test'], [4, 'test']],
            getUrl: 'http://localhost:5001/api/v1/Equipment/Types'
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