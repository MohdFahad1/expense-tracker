import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const AddExpense = () => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

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
      <Button disabled={!(name && amount)} className="mt-3 w-full">
        Add Expense
      </Button>
    </div>
  );
};

export default AddExpense;
