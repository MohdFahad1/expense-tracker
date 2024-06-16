import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ budgetId }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const handleCreateExpense = async () => {
    try {
      const response = await axios.post(`/api/expense`, {
        name,
        amount,
        budgetId,
      });

      if (response) {
        toast(response.data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-lg text-black font-semibold my-1">Expense Name</h2>
        <Input
          placeholder="e.g.  Home Decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-lg text-black font-semibold my-1">
          Expense Amount
        </h2>
        <Input
          placeholder="e.g.  $5000"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-3 w-full"
        onClick={handleCreateExpense}
      >
        Add Expense
      </Button>
    </div>
  );
};

export default AddExpense;
