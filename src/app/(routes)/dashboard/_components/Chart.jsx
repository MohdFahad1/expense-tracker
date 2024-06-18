import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Chart = ({ budgets, expenses }) => {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Budget and Expense Distribution</h2>
      <div className="w-[300px] md:w-full h-[400px] md:h-auto">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={budgets}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#4845D2"
            />
            <Pie
              data={expenses}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              fill="#AFAEED"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
