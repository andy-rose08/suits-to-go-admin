import { auth, UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b bg-[#252440] dark:bg-[#0D1A26] text-[#FFD700]">
      <div className="flex h-16 items-center px-4 flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col items-start sm:items-center sm:space-y-2  sm:flex-row sm:mt-[-8px]">
          <StoreSwitcher items={stores} className="mb-2 sm:mb-0" />
          <MainNav className="mx-6 mb-2 sm:mb-0 " />
        </div>
        <div className="ml-auto flex items-center space-x-4 sm:block">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
