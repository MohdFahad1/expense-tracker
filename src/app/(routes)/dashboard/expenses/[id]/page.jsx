"use client";

import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import axios from "axios";

const Expenses = ({ params }) => {
  const [budgetData, setBudgetData] = useState();
  useEffect(() => {
    fetchSingleBudget();
  }, [params]);

  const fetchSingleBudget = async () => {
    try {
      const budgetId = params.id;

      if (!budgetId) {
        return;
      }

      const response = await axios.get(
        `/api/singlebudget?budgetId=${budgetId}`
      );

      if (response.status === 200) {
        setBudgetData(response.data.budgetData);
      }
    } catch (error) {
      console.error("Error fetching budgets: ", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">My Expenses</h2>
      <div>
        <BudgetItem budget={budgetData} />
      </div>
    </div>
  );
};

export default Expenses;
