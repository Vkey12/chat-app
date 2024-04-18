import React from "react";
import '../BalanceContainer.css';
import '../BalanceContainer.css';


function BalanceContainer({ income, totalExpenses }) {
  const availableBalance = income - totalExpenses;

  return (
    <div className="BalanceContainer">
      <h3>Available Balance</h3>
      <div>
        <h2>{availableBalance.toLocaleString('en-US')}</h2>
      </div>
    </div>
  );
}

export default BalanceContainer;
