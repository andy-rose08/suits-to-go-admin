"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";

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

  return <div className="p-4">Modal</div>;
};

export default SetUpPage;
