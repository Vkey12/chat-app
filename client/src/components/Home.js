import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import IncomeContainer from "./IncomeContainer";
import BalanceContainer from "./BalanceContainer";
import TotalExpensesContainer from "./TotalExpensesContainer";
import DownloadButton from "./DownloadButton";

function Home({ income, setIncome, expenses, setExpenses, handleDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const fetchExpensesData = () => {
    fetch("http://127.0.0.1:5000/transactions", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => setExpenses(data))
      .catch((error) =>
        console.error("Error fetching expenses data:", error)
      );
  };

  const addExpense = (expense) => {
    fetch("http://127.0.0.1:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: JSON.stringify(expense),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the expenses state with the newly added expense
        setExpenses((prevExpenses) => [...prevExpenses, data]);
        alert("Expense successfully added!");
      })
      .catch((error) => console.error("Error:", error));
  };
  
  useEffect(() => {
    fetchExpensesData();
  }, [fetchExpensesData]);

  useEffect(() => {
    const filtered = expenses.filter((expense) =>
      Object.values(expense).some(
        (field) =>
          typeof field === "string" &&
          field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredExpenses(filtered);
  }, [expenses, searchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = event.target.amount.value;
    const date = event.target.date.value;
    const category = event.target.category.value;

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addExpense({ description, amount, date, category_id: category }); // Assuming 'category' is the ID
    event.target.reset();
  };

  const handleDeleteExpense = (trans_id) => {
    fetch(`http://127.0.0.1:5000/transactions/${trans_id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          setExpenses(expenses.filter((expense) => expense.id !== trans_id));
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="main-content">
      <header>
        <h1>Budget Planner</h1>
      </header>

      <div className="summaryDiv">
        <IncomeContainer income={income} onIncomeChange={setIncome} />
        <BalanceContainer
          income={income}
          totalExpenses={expenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
          )}
        />
        <TotalExpensesContainer
          totalExpenses={expenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0
          )}
        />
      </div>

      <div className="expensesContainer">
        <div className="expensesDiv">
          <div className="expenses">
            <p className="head">ADD A NEW EXPENSE</p>
            <form onSubmit={handleSubmit}>
              <div className="inputDiv">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter a brief description"
                />
              </div>
              <div className="inputDiv">
                <p>Category</p>
                <select name="category">
                  <option value="">Select a category</option>
                  <option value="Leisure">Leisure</option>
                  <option value="Basic">Basic</option>
                  <option value="Savings">Savings</option>
                </select>
              </div>
              <div className="inputDiv">
                <p>Amount</p>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter an amount"
                />
              </div>
              <div className="inputDiv">
                <p>Date</p>
                <input type="date" name="date" placeholder="Enter the date" />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>

      <div className="historyDiv">
        <h2>BUDGET HISTORY</h2>
        <div>
          <input
            className="search"
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="history">
          <table className="table">
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
              {filteredExpenses.map((expense, index) => (
                <ExpenseItem
                  key={index}
                  description={expense.description}
                  category={expense.category}
                  amount={expense.amount}
                  date={expense.date}
                  onDelete={() => handleDeleteExpense(expense.id)}
                />
              ))}
            </tbody>
          </table>
          {/* DownloadButton component */}
          <DownloadButton expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default Home;

