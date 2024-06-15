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
    const fetchBudgets = async () => {
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

    fetchBudgets();
  }, [auth]);

  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <CreateBudget />
      <div>
        {budgets.map((budget) => (
          <BudgetItem budget={budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
