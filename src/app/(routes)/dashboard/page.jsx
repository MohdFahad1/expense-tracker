"use client";

import { useAuth } from "@/context/auth";
import React, { useState, useEffect } from "react";
import CardInfo from "./_components/CardInfo";
import axios from "axios";

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
      const response = await axios.get("/api/allexpenses");

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
      <p className="text-gray-500">Here&apos;s what hepping with your money</p>

      <CardInfo budgets={budgets} expenses={expenses} />
    </div>
  );
};

export default Dashboard;
