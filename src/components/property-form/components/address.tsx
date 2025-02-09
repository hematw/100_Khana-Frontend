// import React from 'react'


// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm, UseFormRegister, UseFormReturn } from "react-hook-form"
// import { z } from "zod"

// import { toast } from "@/hooks/use-toast"
// import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IPropertyForm } from "../add-home"
import { UseFormReturn } from "react-hook-form"
import { MultiSelect } from "../../multi-select"
import { useEffect, useState } from "react"
import axiosIns from "@/axios"


type TFacility = {
    name: string,
    _id: string,
    description: string,
    icon: string,
}


function Address({ form }: { form: UseFormReturn<IPropertyForm> }) {
    const [facilities, setFacilities] = useState<TFacility[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data } = await axiosIns.get('/facilities')
                console.log(data)
                setFacilities(data.facilities)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCategories()
    }, [])

    return (
        <>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Enter your house’s total area (m<sup>2</sup>).</FormLabel>
                        <FormControl>
                            <Input placeholder="Penthouse in Bamiyan" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Set your asking price.</FormLabel>
                        <FormControl>
                            <Input placeholder="Big House like a palace" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Select the features and amenities your property includes.</FormLabel>
                        <MultiSelect
                            value={field.value}
                            options={facilities.map(c => ({ label: c.name, value: c._id }))}
                            onValueChange={field.onChange}
                            placeholder="Facilities"
                        />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>How would you like to list your property? (For Sale, Rent, or Mortgage)</FormLabel>
                        <MultiSelect
                            value={field.value}
                            options={["Rental", "Sale", "Mortgage"].map(item => ({ label: item, value: item }))}
                            onValueChange={field.onChange}
                            placeholder="Listing Type"
                        />
                    </FormItem>
                )}
            />
        </>
    )
}
export default Address
