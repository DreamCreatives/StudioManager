export interface DataGrid {
    dataGridName: string;
    reroutePath: string;
    headers: string[];
    data: (string | number)[][];
}

export interface Edit {
    fields: {
        fieldLabel: string;
        fieldType: string;
        fieldName: string;
    }[],
    rerouteOnCancel: string;
    formBuilderGroupFields: {
        fieldKey: string;
        fieldValue: string;
    }[]
}

export interface Actions {
    actions: {
        displayName: string;
        actionName: string;
    }[];
}

export interface Action {
    displayName: string;
    actionName: string;
}