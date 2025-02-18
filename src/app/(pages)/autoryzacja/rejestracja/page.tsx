import { RegisterForm } from "@/app/components/register-form";
import Link from "next/link";

 

 
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <img src="logo.png" className="text-white" />
            </div>
            GadgetCar
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block bg-white">
        <img
          src="/radio.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover  dark:grayscale"
        />
      </div>
    </div>
  );
}
