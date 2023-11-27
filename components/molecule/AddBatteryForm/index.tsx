"use client"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import React from "react";
import {object, string, number} from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {BatteryRequest} from "@/interfaces";

const schema = object({
    name: string().required("Name is required"),
    postalcode: string().required("Postal code is required"),
    capacity: number().required("Capacity is required."),
})
export const AddBatteryForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
    })
    const submitData = async (data: BatteryRequest) => {
        console.log("form data", data)
        // const formData = { ...data, token }
        // mutate(formData)
    }
    return (
        <Dialog>
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
                            <label htmlFor="postalcode" className="text-right">
                                Postal code
                            </label>
                            <div className="col-span-2">
                                <Input
                                    id="postalcode"
                                    placeholder="44600"
                                    className="col-span-3"
                                    type="text"
                                    {...register("postalcode")}
                                />
                                {errors.postalcode ?
                                    <span
                                        className="text-sm font-medium text-destructive">{errors.postalcode.message}</span> : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label htmlFor="capacity" className="text-right">
                                Capacity(Watt)
                            </label>
                            <div className="col-span-2">
                                <Input
                                    id="capacity"
                                    placeholder="1000"
                                    className="col-span-3"
                                    type="number"
                                    {...register("capacity")}
                                />
                                {errors.capacity ?
                                    <span
                                        className="text-sm font-medium text-destructive">{errors.capacity.message}</span> : null}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
