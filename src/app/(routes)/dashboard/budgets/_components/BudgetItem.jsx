import React from "react";

const BudgetItem = ({ budget }) => {
  return (
    <div
      className="p-5 border rounded-lg cursor-pointer hover:shadow-md"
      key={budget._id}
    >
      <div className="flex gap-2">
        <div className="flex gap-2 items-center justify-between w-full">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget.emoji}
          </h2>
          <div className="flex justify-between w-full">
            <div>
              <h2 className=" font-bold capitalize">{budget.name}</h2>
              <h2 className="text-xm text-gray-500">0 Item</h2>
            </div>

            <div>
              <h2 className="font-bold text-primary text-lg">
                ${budget.amount}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between mb-1">
          <h2 className="text-xs text-slate-400">$0 Spend</h2>
          <h2 className="text-xs text-slate-400">${budget.amount} Remaining</h2>
        </div>
        <div className="w-full h-2 bg-slate-300 rounded-full">
          <div className="w-[40%] h-2 bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
