"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomField from "../CustomField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FieldType {
    INPUT = "input",
    SELECT = "select",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    TEXTAREA = "textarea",
    DATE_PICKER = "date_picker",
    PHONE_INPUT = "phoneInput",
    SKELETON = "skeleton"
}
 
const PatientForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
        const userData = { name, email, phone };

       const user =  await createUser(userData);

       if(user) router.push(`/patients/${user.$id}/register`)
        
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <section className=" space-y-2">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="name"
       label="Full name"
       placeholder="john doe"
       iconSrc="/assets/icons/user.svg"
       iconAlt="user"
      />
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="email"
       label="Email"
       placeholder="johndoe@gmail.com"
       iconSrc="/assets/icons/email.svg"
       iconAlt="email"
      />
      < CustomField 
       fieldType={FieldType.PHONE_INPUT}
       control={form.control}
       name="phone"
       label="Phone number"
       placeholder="+254712345678"
      />
      <SubmitButton isLoading={isLoading}>Get started </SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm