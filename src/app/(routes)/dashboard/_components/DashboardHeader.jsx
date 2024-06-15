"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const router = useRouter();
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

  return (
    <div className="p-5 border-b-2 shadow-sm flex justify-between">
      <div></div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default DashboardHeader;
