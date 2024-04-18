import React, { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList() {
// Using useState with an empty array to store the expenses as they are being posted or deleted
  const [expenses, setExpenses] = useState([]);

  // Fetching the expenses already posted in the database
  useEffect(() => {
    // Fetch sends a get request to the flask expense endpoint to show all the expenses
    fetch('/expenses')
    // Error if there is a server response error in retrieving the expense list
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        return response.json();
      })
       // Successful retrieval of the expense list
      .then(data => {
        setExpenses(data);
      })
      // Error catching
      .catch(error => {
        console.error('Error fetching expenses:', error);
      });
  }, []); // Empty dependency array to avoid recursion

  // Defining the add expense function and updating state with the expense added
  const handleAddExpense = (newExpense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  // Defining the delete expense function and updating state with the expense deleted
  const handleDeleteExpense = (deletedExpenseId) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== deletedExpenseId));
  };

  return (
    // Displaying the entire expense list
    <div>
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              id={expense.id} 
              description={expense.description}
              category={expense.category}
              amount={expense.amount}
              date={expense.date}
              onAddExpense={handleAddExpense} 
              onDelete={handleDeleteExpense} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;