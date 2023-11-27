"use client"
import {DataTable} from "../../molecule/DataTable";
import {useQuery} from "@tanstack/react-query";
import {getBatteries} from "@/services/battery";
import {BatteryCharging, Activity} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";

export const BatteryTable = () => {
    const {data: data, isLoading} = useQuery({
        queryKey: ["getBatteries"],
        queryFn: getBatteries,
        enabled: true,
    })
    return <>
        <div className="container flex gap-5 mb-10">
            <div className="w-1/2">
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                       <h1> Total Capacity</h1>
                        <BatteryCharging/>
                    </div>
                    <div className="p-6 pt-0">
                        {isLoading ? <Skeleton className="h-4 w-full" /> :
                           <p className="text-2xl font-bold">
                               {data?.totalWattCapacity.toLocaleString('en-US')}
                           </p>
                        }
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h1>Average Watt</h1>
                        <Activity/>
                    </div>
                    <div className="p-6 pt-0">
                        {isLoading ? <Skeleton className="h-4 w-full" /> :
                            <p className="text-2xl font-bold">
                                {data?.averageWattCapacity.toLocaleString('en-US')}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </div>
        <DataTable data={data} loading={isLoading}/>
    </>
}
