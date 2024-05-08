export interface WizardDestroyed {
    save: boolean;
    savedFields: Object;
}

export interface WizardField {
    label: string;
    type: string;
    name: string;
}