"use client"
import { useEffect } from 'react';
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from '@/components/PassKeyModal';

export default function Home({ searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  useEffect(() => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.textContent = currentYear.toString();
    }
  }, []);

  return (
    <div className="flex h-screen max-h-screen">
      {/*--- TODO: OTP VERIFICATION | PasskeyModal  ---*/}
      {isAdmin && <PasskeyModal />}
     <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © <span id="year"></span> care plus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
      </div>
     </section>
     <Image 
       src="/assets/images/onboarding-img.png"
       height={1000}
       width={1000}
       alt="patient"
       className="side-img max-w-[45%]"
     
     />
    </div>
  );
}
