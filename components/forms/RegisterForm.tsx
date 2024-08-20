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
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FieldType } from "./PatientForm"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { RadioGroupItem } from "../ui/radio-group"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { FileUploader } from "../FileUploader"

 
const RegisterForm = ({ user }: { user:User} ) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
        ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className=" space-y-4">
            <h1 className="header"> Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about you.</p>
        </section>
        <section className=" space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Personal Information 
                </h2>
            </div>
        </section>
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="name"
       label= "Full name"
       placeholder="john doe"
       iconSrc="/assets/icons/user.svg"
       iconAlt="user"
      />
      <div className="flex flex-col gap-6  xl:flex-row">
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
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
      < CustomField 
       fieldType={FieldType.DATE_PICKER}
       control={form.control}
       name="birthDate"
       label="Date of birth"
      />
      < CustomField 
       fieldType={FieldType.SKELETON}
       control={form.control}
       name="gender"
       label="Gender"
       renderSkeleton={(field) => (
        <FormControl>
            <RadioGroup className="flex h-11 gap-6 xl:justify-between"
            onValueChange={field.onChange}
            defaultValue={field.value}>
                {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option} className="cursor-pointer">{option}</label>
                    </div>
                ))}
            </RadioGroup>
        </FormControl>
       )}
      />

      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="address"
       label="Address"
       placeholder="14th street, Ruiru "
      />
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="occupation"
       label="Occupation"
       placeholder="Teacher"
      />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="emergencyContactName"
       label="Emergency contact name"
       placeholder="Guardian's name"
      />
      < CustomField 
       fieldType={FieldType.PHONE_INPUT}
       control={form.control}
       name="emergencyContactNumber"
       label="Emergency contact number"
       placeholder="+254712345678"
      />
      </div>
      <section className=" space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Medical Information
                </h2>
            </div>
        </section>
     <CustomField 
       fieldType={FieldType.SELECT}
       control={form.control}
       name="primaryPhysician"
       label="Primary Physician"
       placeholder="select a physician"
      >
        {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                    <Image 
                        src={doctor.image}
                        alt={doctor.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                </div>
            </SelectItem>
        ))}
      </CustomField>


      <div className="flex flex-col gap-6 xl:flex-row">
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="insuranceProvider"
       label="Insurance Provider"
       placeholder="NHIF"
      />
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="insurancePolicyNumber"
       label="Insurance Policy Number"
       placeholder="AQ2488380K"
      />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
      < CustomField 
       fieldType={FieldType.TEXTAREA}
       control={form.control}
       name="allergies"
       label="Allergies (if any)"
       placeholder="Pollen,Penicillin"
      />
      < CustomField 
       fieldType={FieldType.TEXTAREA}
       control={form.control}
       name="currentMedication"
       label="Current Medication (if any)"
       placeholder="Paracetamol 500mg, Ibuprofen 200mg"
      />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
      < CustomField 
       fieldType={FieldType.TEXTAREA}
       control={form.control}
       name="familyMedicalHistory"
       label="Family Medical History"
       placeholder="Father had heart disease"
      />
      < CustomField 
       fieldType={FieldType.TEXTAREA}
       control={form.control}
       name="pastMedicalHistory"
       label="Past Medical History"
       placeholder="Tonsillectomy"
      />
      </div>
      <section className=" space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Identification and Verification
                </h2>
            </div>
        </section>
        <CustomField 
       fieldType={FieldType.SELECT}
       control={form.control}
       name="identificationType"
       label="Identification Type"
       placeholder="select an identification type"
      >
        {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
                  {type}
            </SelectItem>
        ))}
      </CustomField>
      < CustomField 
       fieldType={FieldType.INPUT}
       control={form.control}
       name="identificationNumber"
       label="Identification Number"
       placeholder="12345678"
      />
      <CustomField
            fieldType={FieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
          <section className=" space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">
                    Consent and Privacy
                </h2>
            </div>
        </section>
        < CustomField 
       fieldType={FieldType.CHECKBOX}
       control={form.control}
       name="treatmentConsent"
       label="I consent to receive treatment for my health condition"
      />
      < CustomField 
       fieldType={FieldType.CHECKBOX}
       control={form.control}
       name="disclosureConsent"
       label="I consent to receive treatment for my health condition"
      />
      < CustomField 
       fieldType={FieldType.CHECKBOX}
       control={form.control}
       name="privacyConsent"
       label="I consent to receive treatment for my health condition"
      />
      <SubmitButton isLoading={isLoading}>Get started </SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm