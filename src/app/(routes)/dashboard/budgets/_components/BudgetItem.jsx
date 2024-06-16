import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget, item, spentAmount }) => {
  const calculateProgressPerc = () => {
    const perc = (spentAmount / budget?.amount) * 100;
    return perc.toFixed(2);
  };

  return (
    <Link href={`/dashboard/expenses/${budget?._id}`}>
      <div className="p-5 border rounded-lg cursor-pointer hover:shadow-md">
        <div className="flex gap-2">
          <div className="flex gap-2 items-center justify-between w-full">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {budget?.emoji}
            </h2>
            <div className="flex justify-between w-full">
              <div>
                <h2 className=" font-bold capitalize">{budget?.name}</h2>
                <h2 className="flex items-center gap-1 text-xm text-gray-500">
                  {item} {item > 1 ? <span>Items</span> : <span>Item</span>}
                </h2>
              </div>

              <div>
                <h2 className="font-bold text-primary text-lg">
                  ${budget?.amount}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between mb-1">
            <h2 className="text-xs text-slate-400">${spentAmount} Spent</h2>
            <h2 className="text-xs text-slate-400">
              ${budget?.amount > spentAmount ? budget.amount - spentAmount : 0}{" "}
              Remaining
            </h2>
          </div>
          <div className="w-full h-2 bg-slate-300 rounded-full">
            <div
              className=" h-2 bg-primary rounded-full"
              style={{
                width: `${
                  calculateProgressPerc() > 100 ? 100 : calculateProgressPerc()
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
