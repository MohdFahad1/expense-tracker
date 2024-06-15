"use client";

import { useAuth } from "@/context/auth";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const [auth, setAuth] = useAuth();
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

  const path = usePathname();

  return (
    <div className="h-screen p-5 border-2">
      <div className="flex gap-1 items-center justify-center">
        <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
        <h1 className="text-2xl font-semibold text-primary">Budget Tracker</h1>
      </div>
      <div className="mt-5">
        {menuList.map((items) => (
          <Link href={items.path} key={items.id}>
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
      </div>
      <div className="fixed bottom-10">
        <pre className="px-4">{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </div>
  );
};

export default Sidebar;
