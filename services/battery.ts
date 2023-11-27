import {BatteriesResponse, BatteryRequest} from "@/interfaces";
const url = process.env.API_URL || "http://localhost:8000/api"
export const getBatteries = async (): Promise<BatteriesResponse> => {

    try {
        const response = await fetch(`${url}/battery`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })

        return await response.json();

    } catch (error) {
        throw new Error("Failed to fetch batteries data.");
    }
};

export const createBattery = async (request: BatteryRequest) => {
    try {
        const response = await fetch(`${url}/battery`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        throw new Error("Failed to fetch batteries data.");
    }
};