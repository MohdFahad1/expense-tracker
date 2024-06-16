"use client";

import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import axios from "axios";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";

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
    <div className="p-5 md:p-10">
      <h2 className="text-3xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetData ? (
          <BudgetItem budget={budgetData} />
        ) : (
          <div className="h-[145px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}

        <AddExpense budgetId={params.id} />
      </div>
      <div>
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable budgetId={params.id} />
      </div>
    </div>
  );
};

export default Expenses;
