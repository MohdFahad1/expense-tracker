"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutGrid,
  Menu,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth";

const DashboardHeader = () => {
  const [auth] = useAuth();
  const router = useRouter();
  const path = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");

      if (res.status === 200) {
        toast(res.data.message);
        localStorage.setItem("auth", "");
        router.push("/");
      } else {
        toast(res.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const menuList = [
    {
      id: "1",
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: "2",
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: "3",
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: "4",
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <div className="p-5 border-b-2 shadow-sm flex justify-between items-center">
      <div className="block md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="cursor-pointer">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <SheetHeader>
              <SheetDescription>
                <div className="mt-5">
                  {menuList.map((items) => (
                    <Link
                      href={items.path}
                      key={items.id}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <h2
                        className={`text-xl text-gray-500 font-medium flex gap-1 items-center cursor-pointer hover:text-primary hover:bg-blue-100 rounded-md px-4 py-3 mt-2 ${
                          path == items.path && "text-primary bg-blue-100"
                        }`}
                      >
                        <items.icon />
                        {items.name}
                      </h2>
                    </Link>
                  ))}
                  <div className="fixed bottom-10">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <UserRound
                        className="border-2 border-primary rounded-full"
                        size={30}
                        color="rgb(72, 69, 210)"
                      />
                      <h1 className="capitalize text-xl font-medium text-gray-500">
                        {auth.user?.username}
                      </h1>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div></div>
      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
        Logout
      </Button>
    </div>
  );
};

export default DashboardHeader;
