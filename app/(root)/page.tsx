"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const SetUpPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return (
    <div
      className={(cn("text-6xl font-semibold drop-shadow-md"), font.className)}
    >
      Home Page
    </div>
  );
};

export default SetUpPage;
