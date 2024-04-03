import { SignIn } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function Page() {
  return (
    
      <SignIn
        appearance={{
          elements: {
            headerSubtitle: "text-[#252440] dark:text-white",
            formButtonPrimary:
              "w-full border-4 bg-[#FFD700] dark:bg-[#0D1A26] hover:bg-[#ADD8E6] dark:hover:bg-[#ADD8E6] border-[#252440] dark:border-white hover:border-[#FFD700] dark:hover:border-[#FFD700] transition duration-300 ease-in-out hover:text-[#252440] dark:hover:text-[#FFD700]",
            footerActionLink:
              "text-[#FFD700] dark:text-white hover:text-[#ADD8E6] dark:hover:text-[#ADD8E6] transition duration-300 ease-in-out",
              footerActionText: "text-[#252440] dark:text-white",
            formFieldInput:
              "border-2 border-[#252440] dark:border-white focus:border-[#FFD700] dark:focus:border-[#FFD700] focus:outline-none text-[#252440] dark:text-white",
            formFieldLabel: "text-[#252440] dark:text-white",
            dividerRow: "text-[#252440] dark:text-white",
            dividerText: "text-[#252440] dark:text-white",
            dividerLine: "bg-[#FFD700] dark:bg-white",
            headerTitle: "text-[#252440] dark:text-white",
            socialButtonsBlockButton:
              "border-2 border-[#252440] dark:border-white hover:border-[#FFD700] dark:hover:border-[#FFD700] transition duration-300 ease-in-out",
            socialButtonsBlockButtonText: "text-[#252440] dark:text-white",
            socialButtonsBlockButtonArrow: "text-[#FFD700] dark:text-white",
            card: "dark:bg-[#1A2634]",
          },
        }}
      />
   
  );
}
