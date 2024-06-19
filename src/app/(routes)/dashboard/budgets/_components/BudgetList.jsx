"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useAuth } from "@/context/auth";
import axios from "axios";
import BudgetItem from "./BudgetItem";

const BudgetList = () => {
  const [auth] = useAuth();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgetList();
  }, [auth]);

  const fetchBudgetList = async () => {
    try {
      const userId = auth.user?.id;

      if (!userId) {
        return;
      }

      const response = await axios.get(`/api/fetchBudgets?userId=${userId}`);

      if (response.status === 200) {
        setBudgets(response.data.budgets);
      }
    } catch (error) {
      console.error("Error fetching budgets: ", error);
    }
  };

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <CreateBudget refreshData={fetchBudgetList} />
      {budgets?.length > 0
        ? budgets.map((budget) => (
            <BudgetItem budget={budget} key={budget._id} />
          ))
        : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 h-[145px] animate-pulse rounded-lg"
            ></div>
          ))}
    </div>
  );
};

export default BudgetList;
