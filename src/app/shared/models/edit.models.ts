export interface EditField {
    label: string;
    type: string;
    name: string;
    isClass: boolean;
    options: {id: string, name: string, selected: boolean}[];
}