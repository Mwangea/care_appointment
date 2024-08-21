import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Link from "next/link";

interface SearchParamProps {
  params: { userId: string };
}

const Register = async ({ params: { userId } }: SearchParamProps) => {
  try {
    const user = await getUser(userId);
    const patient = await getPatient(userId);

    if (patient) redirect(`/patients/${userId}/new-appointment`);

    return (
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />

            <RegisterForm user={user} />

            <p className="copyright py-12">©2024 care plus</p>
          </div>
        </section>

        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[480px]"
        />
      </div>
    );
  } catch (error) {
    console.error("An error occurred in the Register component:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
};

export default Register;