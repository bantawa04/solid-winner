"use client"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader2, Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import React, {useState} from "react";
import {object, string, number} from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {BatteryRequest} from "@/interfaces";
import {useMutation, useQueryClient, QueryClientProvider } from '@tanstack/react-query';

import {createBattery} from "@/services/battery";

const schema = object({
    name: string().required("Name is required"),
    postcode: string().required("Postal code is required"),
    wattCapacity: number().required("Capacity is required."),
})
export const AddBatteryForm: React.FC = () => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    })
    const submitData = async (data: BatteryRequest) => {
        mutate(data)
    }

    const {isPending:loading , mutate} = useMutation(
        {
            mutationFn: createBattery,
            onSuccess: () => {
                setOpen(!open)
                reset()
                queryClient.invalidateQueries({ queryKey: ['getBatteries'] })
            },
        }
    )


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="ml-4">
                    <Plus className="mr-2 h-4 w-4" color="#ffffff"/>
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px]">
                <form onSubmit={handleSubmit(submitData)}>
                    <DialogHeader>
                        <DialogTitle>Add new battery</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 items-baseline gap-4">
                            <label htmlFor="name" className="text-right">
                                Name
                            </label>
                            <div className="col-span-2">

                                <Input
                                    id="name"
                                    placeholder="Duracell"
                                    className="col-span-3"
                                    {...register("name")}
                                    type="text"
                                />
                                {errors.name ?
                                    <span className="text-sm font-medium text-destructive">{errors.name.message}.</span>
                                    : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="postcode" className="text-right">
                                Postal code
                            </label>
                            <div className="col-span-2">
                                <Input
                                    id="postcode"
                                    placeholder="44600"
                                    className="col-span-3"
                                    type="text"
                                    {...register("postcode")}
                                />
                                {errors.postcode ?
                                    <span
                                        className="text-sm font-medium text-destructive">{errors.postcode.message}</span> : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="wattCapacity" className="text-right">
                                Capacity(Watt)
                            </label>
                            <div className="col-span-2">
                                <Input
                                    id="wattCapacity"
                                    placeholder="1000"
                                    className="col-span-3"
                                    type="number"
                                    {...register("wattCapacity")}
                                />
                                {errors.wattCapacity ?
                                    <span
                                        className="text-sm font-medium text-destructive">{errors.wattCapacity.message}</span> : null}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading?
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :null} Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
