import React from "react";
import "../TotalExpenseContainer.css";

function TotalExpensesContainer({ totalExpenses }) {
  return (
    <div className="TotalExpenseContainer">
      <h3>Total Expenses</h3>
      <div>
        <h2>{totalExpenses}</h2>
      </div>
    </div>
  );
}

export default TotalExpensesContainer;
