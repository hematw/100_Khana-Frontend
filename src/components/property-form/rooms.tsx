// import React from 'react'


// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, UseFormRegister, UseFormReturn } from "react-hook-form"
// import { z } from "zod"

// import { toast } from "@/hooks/use-toast"
// import { Button } from "@/components/ui/button"
import {
    FormDescription,
    FormLabel,
} from "@/components/ui/form"
import { IPropertyForm } from "./add-home"
import { UseFormReturn } from "react-hook-form"
import { useState } from "react"


function Rooms({ form }: { form: UseFormReturn<IPropertyForm> }) {
    return (
        <div>
            <FormLabel>Number of Rooms</FormLabel>
            <FormDescription>
                Select the total number of rooms available in the property, including bedrooms, living rooms, and other spaces.            </FormDescription>
            <div className="flex justify-evenly flex-wrap gap-8 p-8">
                <NumberInput value={form.watch("numOfLivingRooms")} onChange={(value) => form.setValue("numOfLivingRooms", value)} label="Living Rooms" />
                <NumberInput value={form.watch("numOfBedRooms")} onChange={(value) => form.setValue("numOfBedRooms", value)} label="Bedrooms" />
                <NumberInput value={form.watch("numOfKitchens")} onChange={(value) => form.setValue("numOfKitchens", value)} label="Kitchens" />
                <NumberInput value={form.watch("numOfBaths")} onChange={(value) => form.setValue("numOfBaths", value)} label="Bathrooms" />
            </div>
        </div>
    )
}
export default Rooms


import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input"

const NumberInput = ({ label, value, min = 0, max = 10, onChange }:
    { label: string, value: number, min?: number, max?: number, onChange: (value: number) => void }) => {
    // const [value, setValue] = useState(0);

    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-lg font-medium">{label}</span>
            <div className="text-center border border-gray-300 rounded-lg p-4 bg-white shadow-md">
                <Input className="font-semibold h-24 w-24 border text-center !text-7xl" value={value} />
                <div className="flex gap-4 mt-4 justify-center">
                    <button
                        onClick={handleDecrement}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleIncrement}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};