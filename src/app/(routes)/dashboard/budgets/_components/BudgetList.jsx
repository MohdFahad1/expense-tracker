import React from "react";
import CreateBudget from "./CreateBudget";

const BudgetList = () => {
  return (
    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <CreateBudget />
    </div>
  );
};

export default BudgetList;
