import { FormGroup } from "@angular/forms";

export interface WizardDestroyed {
    save: boolean;
    savedFields: Object;
}

export interface WizardData  {
    title: string;
    formGroup: FormGroup;
    fields: WizardField[];
}

export interface WizardField {
    label: string;
    type: string;
    name: string;
    isClass: boolean;
    options: {id: string, name: string}[]
}