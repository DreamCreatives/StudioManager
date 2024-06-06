export interface DataGrid {
    dataGridName: string;
    reroutePath: string;
    headers: string[];
    dataGridFieldsNames: string[];
    data: (string | number)[][];
    getUrl: string;
}

export interface Edit {
    fields: {
        fieldLabel: string;
        fieldType: string;
        fieldName: string;
        isClass: boolean;
        isRequired: boolean;
        classDataUrl: string;
    }[],
    rerouteOnCancel: string;
    baseUrl: string;
    formBuilderGroupFields: {
        fieldKey: string;
        fieldValue: string;
    }[]
}

export interface Wizard {
    title: string;
    fields: {
        fieldLabel: string;
        fieldType: string;
        fieldName: string;
        isClass: boolean;
        isRequired: boolean;
        classDataUrl: string;
    }[],
    formBuilderGroupFields: {
        fieldKey: string;
        fieldValue: string | number;
    }[]
}

export interface Calendar {
    calendarName: string;
    reroutePath: string;
    getUrl: string;
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