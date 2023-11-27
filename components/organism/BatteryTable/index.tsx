import {DataTable} from "@/components/atom/DataTable";
import {useQuery} from "@tanstack/react-query";
import {getBatteries} from "@/services/battery";

export const Table = () => {
    const {data:data, isLoading} = useQuery({
        queryKey: ['get-battery'],
        queryFn: getBatteries,
    })
    return <DataTable data={data.} loading={isLoading}/>
}
