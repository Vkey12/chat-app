import React from "react";
import "../TotalExpenseContainer.css";

function TotalExpensesContainer({ totalExpenses }) {
  return (
    <div className="total-expense-container">
      <h3 className="title">Total Expenses</h3>
      <div className="expense-amount">
        <h2>{totalExpenses}</h2>
      </div>
    </div>
  );
}

export default TotalExpensesContainer;
