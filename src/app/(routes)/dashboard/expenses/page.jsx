"use client";

import React, { useState, useEffect } from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useAuth } from "@/context/auth";
import axios from "axios";

const Expenses = () => {
  const [auth] = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, [auth]);

  const fetchExpenses = async () => {
    try {
      const userId = auth.user?.id;

      if (!userId) {
        return;
      }

      const response = await axios.get(`/api/all-expenses?userId=${userId}`);

      if (response) {
        setExpenses(response.data.expenses);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="p-5 md:p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <p className="font-bold">Latest Expenses</p>

      {expenses.length > 0 ? (
        <ExpenseListTable expenseList={expenses} />
      ) : (
        <div className="mt-5 w-full flex flex-col gap-5">
          {[1, 2, 3].map((items, index) => (
            <div key={index}>
              <div className="h-[30px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
