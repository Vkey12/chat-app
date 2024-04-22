import React, { useState } from "react";
import "../IncomeContainer.css"; 

function IncomeContainer({ income, onIncomeChange }) {
  // Setting state to manage editing & new income
  const [isEditing, setEditing] = useState(false);
  const [newIncome, setNewIncome] = useState(income);

  // When 'EDIT' button is clicked
  const handleEditClick = () => {
    setEditing(true);
  };

  // When 'Done' button is clicked
  const handleDoneClick = () => {
    setEditing(false);
    onIncomeChange(newIncome);
  };

  // Handling changes
  const handleChange = (event) => {
    setNewIncome(event.target.value);
  };

  // Format income with commas
  const formattedIncome = newIncome.toLocaleString("en-US");

  return (
    <div className="IncomeContainer">
      <div className="text">
        <h3>Monthly income </h3>
        {isEditing ? (
          <input type="number" value={newIncome} onChange={handleChange} />
        ) : (
          // Displaying the income value with commas
          <div>
            <h2>{formattedIncome}</h2>
          </div>
        )}
      </div>
      {/* To edit or do done */}
      {!isEditing ? (
        <button onClick={handleEditClick}>Edit</button>
      ) : (
        <button onClick={handleDoneClick}>Done</button>
      )}
    </div>
  );
}

export default IncomeContainer;
