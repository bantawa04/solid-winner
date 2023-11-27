import {number, string} from "yup";

export interface Battery {
    id: string
    name: string
    postcode: string
    wattCapacity: number
}

export interface BatteriesResponse {
    message?: string
    batteries?: Battery[];
    totalWattCapacity?: number;
    averageWattCapacity?: number;
}

export interface BatteryRequest {
    name: string
    postcode: string
    wattCapacity: number
}