"use client";

import { useAuth } from "@/context/auth";
import React, { useState, useEffect } from "react";
import CardInfo from "./_components/CardInfo";
import axios from "axios";
import Chart from "./_components/Chart";
import BudgetItem from "./budgets/_components/BudgetItem";

const Dashboard = () => {
  const [auth] = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, [auth]);

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
    <div className="p-5">
      <h2 className="font-bold text-3xl capitalize">
        Hi, {auth.user?.username} ✌️
      </h2>
      <p className="text-gray-500">
        Here&apos;s what happening with your money
      </p>

      <CardInfo budgets={budgets} expenses={expenses} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className="md:col-span-2">
          <Chart budgets={budgets} expenses={expenses} />
        </div>
        <div>
          {budgets.map((budget) => (
            <BudgetItem budget={budget} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
