import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ({ budgetId }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  const handleCreateExpense = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/expense`, {
        name,
        amount,
        budgetId,
      });

      if (response) {
        toast(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setLoading(false);
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
        {loading ? <Loader className="animate-spin" /> : "Add Expense"}
      </Button>
    </div>
  );
};

export default AddExpense;
