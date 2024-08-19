"use client"
import { Control } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { FieldType } from './forms/PatientForm'
import React from 'react'
import Image from 'next/image'

interface CustomProps {
    control: Control<any>,
    fieldType: FieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,

}

const RenderField  = ({ field, props}: {field: any; props: CustomProps}) => {
    const {fieldType, iconSrc, iconAlt, placeholder,} = props;
    switch (fieldType){
        case FieldType.INPUT:
        return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
               {iconSrc && (
                <Image 
                  src={iconSrc}
                  height={24}
                  width={24}
                  alt={iconAlt || 'icon'}
                  className='ml-2'
                />
               )}
               <FormControl>
                <Input 
                placeholder={placeholder}
                {...field}
                className='shad-input border-0'
                />
               </FormControl>
            </div>
        )
        default:
            break
    }
}

const CustomField = (props: CustomProps) => {
    const { control, fieldType, name, label} = props;
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex-1'>
            {fieldType !== FieldType.CHECKBOX && label  && (
                <FormLabel>{label}</FormLabel>
            )}

            <RenderField  field={field} props={props}/>
            < FormMessage className='shad-error'/>
          </FormItem>
        )}
      />
  )
}

export default CustomField