import { HttpHeaders } from "@angular/common/http";

export interface HttpResponseType {
    body: string | null;
    headers: HttpHeaders;
    ok: boolean;
    status: number;
    statusText: string;
    type: number;
    url: string;
}

export interface ClassField {
    id: string;
    name: string;
}

export interface Pagination {
    limit: number;
    page: number;
    total: number;
}

export interface Equipment {
    name: string;
    quantity: number;
    initialQuantity: number;
    imageUrl: string;
    equipmentType: {
        id: string;
        name: string;
    }
}

export interface EquipmentType {
    name: string;
}

export interface EquipmentReservation {
    startDate: string;
    endDate: string;
    quantity: number;
    equipment: ClassField;
}

export interface CalendarEvent {
    endDate: string;
    id: string;
    quantity: number;
    startDate: string;
    equipment: ClassField;
}

export interface EquipmentEdit extends Equipment {
    id: string;
}

export interface EquipmentTypeEdit extends EquipmentType { 
    id: string;
}

export interface EquipmentReservationEdit extends EquipmentReservation {
    id: string;
}

export interface DataGridPaginationConfig {
    data: Equipment[];
    pagination: Pagination;
}

export interface CalendarPaginationConfig {
    data: CalendarEvent[];
    pagination: Pagination;
}

export interface CalendarParams {
    startDate: string;
    endDate: string;
}
