import { SignIn } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            "w-full border-4 bg-[#FFD700] hover:bg-[#ADD8E6] border-[#252440] hover:border-[#FFD700] transition duration-300 ease-in-out hover:text-[#252440]",
          footerActionLink:
            "text-[#FFD700] hover:text-[#ADD8E6] transition duration-300 ease-in-out",
          formFieldInput:
            "border-2 border-[#252440] focus:border-[#FFD700] focus:outline-none text-[#252440]",
          dividerRow: "text-[#252440]",
          dividerLine: "bg-[#FFD700]",
          headerTitle: "text-[#252440]",
          socialButtonsBlockButton:"border-2 border-[#252440] hover:border-[#FFD700] transition duration-300 ease-in-out",
          socialButtonsBlockButtonText:"text-[#252440]",
          socialButtonsBlockButtonArrow:"text-[#FFD700]",
          card: "opacity-95",
        },
      }}
    />
  );
}
