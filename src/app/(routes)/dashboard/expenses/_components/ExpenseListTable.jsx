import axios from "axios";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const ExpenseListTable = ({ budgetId }) => {
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    fetchExpenseList();
  }, [budgetId]);

  const fetchExpenseList = async () => {
    try {
      const response = await axios.get(`/api/expenselist?budgetId=${budgetId}`);
      if (response.status === 200) {
        setExpenseList(response.data.expenses);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getUTCFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenseList.map((expense) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2" key={expense._id}>
          <h2 className="capitalize">{expense.name}</h2>
          <h2>${expense.amount}</h2>
          <h2>{formatDate(expense.createdAt)}</h2>
          <h2>
            <Trash className="text-red-600" />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
