import React from "react";

const BudgetItem = ({ budget }) => {
  return (
    <div className="p-5 border rounded-lg">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget.emoji}
          </h2>
          <div>
            <h2>{budget.name}</h2>
            <h2>0 Item</h2>
          </div>
          <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
