import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React from "react";

const CardInfo = ({ budgets, expenses }) => {
  const totalBudgetAmount = budgets.reduce(
    (sum, budget) => sum + budget.amount,
    0
  );

  const totalExpenseAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <>
      {budgets?.length > 0 ? (
        <div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-7 border rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-xm">Total Budget</h2>
                <h2 className="font-bold text-2xl">${totalBudgetAmount}</h2>
              </div>
              <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
            </div>

            <div className="p-7 border rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-xm">Total Spent</h2>
                <h2 className="font-bold text-2xl">${totalExpenseAmount}</h2>
              </div>
              <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
            </div>

            <div className="p-7 border rounded-lg flex items-center justify-between">
              <div>
                <h2 className="text-xm">No. of Budgets</h2>
                <h2 className="font-bold text-2xl">{budgets.length}</h2>
              </div>
              <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((items, index) => (
            <div className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardInfo;
