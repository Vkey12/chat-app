import React, { useState } from 'react';

function ExpenseItem(props) {
  // Defining the props passed to the function
  const { description, amount, date, category, onDelete, onAddExpense } = props;
  // Setting state to handle category selection 
  const [selectedCategory, setSelectedCategory] = useState('');
  // Setting state to handle fetch actions 
  const [isLoading, setIsLoading] = useState(false);

  // Defining the add expense function
  const handleAddExpense = () => {
    // Setting he state to true to load the expense being added
    setIsLoading(true);
    // Fetch sends a post request to the flask expense endpoint to add the new expense being added
    fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        amount,
        date,
        category
      }),
    })
    // Error if there is a server response error in adding the expense
    .then(response => {
      setIsLoading(false);
      if (!response.ok) {
        throw new Error('Failed to add expense');
      }
      // Successful addition of an expense
      onAddExpense({
        description,
        amount,
        date,
        category
      });
    })
    // Error catching
    .catch(error => {
      setIsLoading(false);
      console.error('Error adding expense:', error);
    });
  };

   // Defining the delete expense function
  const handleDeleteExpense = () => {
    // Fetch sends a delete request to the flask expense endpoint to delete an expense
      fetch(`/expenses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // Error if there is a server response error in deleting the expense
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      // Successful deletion of an expense
      onDelete(id);
    })
    .catch(error => {
      setIsLoading(false);
      console.error('Error deleting expense:', error);
    });
  };

  // Defining the expense category selection function and updating state with the selected category
  const handleCategorySelection = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory); 
  };

  return (
    // Displaying the expense item fields to add/delete
    <tr className="items">
      <td>{description}</td>
      <td>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="basic">Basic</option>
          <option value="leisure">Leisure</option>
          <option value="savings">Savings</option>
        </select>
      </td>
      <td>{amount}</td>
      <td>{date}</td>

    // Buttons to add and delete the expenses
      <td>
        <button className="add-button" onClick={handleAddExpense} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </td>
      <td>
        <button className="delete-button" onClick={handleDeleteExpense}>Delete</button>
      </td>
    </tr>
  );
}

export default ExpenseItem;