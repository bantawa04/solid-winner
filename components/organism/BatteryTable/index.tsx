"use client"
import {DataTable} from "../../molecule/DataTable";
import {useQuery} from "@tanstack/react-query";
import {getBatteries} from "@/services/battery";
import axios from "axios";
export const BatteryTable = () => {
    const {data: data, isLoading} = useQuery({
        queryKey: ["getBatteries"],
        queryFn: getBatteries,
        enabled: true,
    })
    return <DataTable data={data} loading={isLoading}/>
}
