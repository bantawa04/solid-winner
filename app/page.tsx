import {BatteryTable} from "@/components/organism/BatteryTable";

export default function Home() {

    return (
        <>
            <main className="flex min-h-screen flex-col items-center px-24 py-10">
               <BatteryTable/>
            </main>
        </>
    )
}
