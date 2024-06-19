"use client";

import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import axios from "axios";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Expenses = ({ params }) => {
  const router = useRouter();
  const [budgetData, setBudgetData] = useState();
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    fetchSingleBudget();
    fetchExpenseList();
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

  const fetchExpenseList = async () => {
    try {
      const response = await axios.get(
        `/api/expenselist?budgetId=${params.id}`
      );
      if (response.status === 200) {
        setExpenseList(response.data.expenses);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDeleteBudget = async () => {
    try {
      const response = await axios.delete(
        `/api/deletebudget?budgetId=${params.id}`
      );

      if (response.status === 200) {
        toast(response.data.message);
        router.push("/dashboard/budgets");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="p-5 md:p-10">
      <div className="flex justify-between">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-1">
          <Link href={"/dashboard/budgets"}>
            <ArrowLeft />
          </Link>{" "}
          My Expenses
        </h2>

        <div className="flex items-center gap-2">
          <EditBudget budgetData={budgetData} refreshData={fetchSingleBudget} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex items-center gap-1" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteBudget}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetData ? (
          <BudgetItem budget={budgetData} />
        ) : (
          <div className="h-[145px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}

        <AddExpense budgetId={params.id} refreshData={fetchExpenseList} />
      </div>
      <div>
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList}
          refreshData={fetchExpenseList}
        />
      </div>
    </div>
  );
};

export default Expenses;
