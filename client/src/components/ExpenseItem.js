import React from "react";
import "../TotalExpenseContainer.css";

function ExpenseItem(props) {
  const { description, amount, date, category, onDelete } = props;

  const handleDelete = () => {
    onDelete();
  };

  return (
    <tr className="items">
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>{date}</td>

      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </tr>
  );
}

export default ExpenseItem;
