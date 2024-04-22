import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ExpenseItem from "./components/ExpenseItem";
import IncomeContainer from "./components/IncomeContainer";
import BalanceContainer from "./components/BalanceContainer";
import TotalExpensesContainer from "./components/TotalExpensesContainer";
import DownloadButton from "./components/DownloadButton";
import Login from './components/Login';
import Signup from './components/Signup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faChartPie,
  faHouse,
  faFolderOpen,
  faBell,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import "./sidebar.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if user is logged in
  const [expenses, setExpenses] = useState([]); // Stores the list of expenses
  const [income, setIncome] = useState(90000); // Stores the total income value
  const [searchTerm, setSearchTerm] = useState(""); // Stores the current search term for filtering expenses
  const [filteredExpenses, setFilteredExpenses] = useState([]); // Stores the filtered list of expenses based on search term
  const [isSidebarActive, setIsSidebarActive] = useState(false); // State to manage sidebar visibility

  // Effect to fetch expenses data on component mount
  useEffect(() => {
    if (localStorage.getItem("authToken")) { // Check if user is logged in
      setIsLoggedIn(true);
    }
    fetchExpensesData();
  }, []);

  // Function to fetch expenses data from the backend
  const fetchExpensesData = () => {
    fetch("https://projbackend-idpk.vercel.app/expenses", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use authToken for secured endpoints
      },
    })
    .then((resp) => resp.json())
    .then((data) => setExpenses(data))
    .catch((error) => console.error("Error fetching expenses data:", error));
  };

  // Handle user login and store authToken
  const handleLogin = (token) => {
    localStorage.setItem("authToken", token); // Store the token in localStorage
    setIsLoggedIn(true); // Set the loggedIn state to true
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    setIsLoggedIn(false); // Set the loggedIn state to false
  };

  // Calculates the total expenses from the list
  const calculateTotalExpenses = () => {
    return expenses.reduce(
      (total, expense) => total + parseFloat(expense.amount), 0
    );
  };

  // Handles changes in income input
  const handleIncomeChange = (newIncome) => {
    setIncome(parseFloat(newIncome)); // Parse and set new income
  };

  // Handles the form submission for new expenses
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

    addExpense({ description, amount, date, category });
    event.target.reset();
  };

  // Effect to filter expenses based on search term
  useEffect(() => {
    const filtered = expenses.filter((expense) =>
      Object.values(expense).some(
        (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredExpenses(filtered);
  }, [expenses, searchTerm]);

  // Deletes an expense by index
  const handleDelete = (index) => {
    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  // Toggles the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  if (!isLoggedIn) {
    return (
      <Router>
        <Switch>
          <Route path="/signup" component={() => <Signup onLogin={handleLogin} />} />
          <Route path="/" component={() => <Login onLogin={handleLogin} />} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <div className={`app-container ${isSidebarActive ? "sidebar-active" : ""}`}>
        <div className="sidebar">
          <div className="logo-details">
            <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: "white" }} />
            <span className="logo_name">Black Hole</span>
          </div>
          <ul className="nav-links">
            <li onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faHouse} style={{ marginLeft: "20px" }} />
              <span className="links_name">Home</span>
            </li>
            <li onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faChartPie} style={{ marginLeft: "20px" }} />
              <span className="links_name">Statistics</span>
            </li>
            <li onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faFolderOpen} style={{ marginLeft: "20px" }} />
              <span className="links_name">Resources</span>
            </li>
            <li onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBell} style={{ marginLeft: "20px" }} />
              <span className="links_name">Notifications</span>
            </li>
            <li onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} style={{ marginLeft: "20px" }} />
              <span className="links_name">Log Out</span>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <header>
            <h1>Budget Planner</h1>
          </header>
          <div className="summaryDiv">
            <IncomeContainer income={income} onIncomeChange={handleIncomeChange} />
            <BalanceContainer income={income} totalExpenses={calculateTotalExpenses()} />
            <TotalExpensesContainer totalExpenses={calculateTotalExpenses()} />
          </div>
          <div className="expensesContainer">
            <div className="expensesDiv">
              <div className="expenses">
                <p className="head">ADD A NEW TRANSACTION</p>
                <form onSubmit={handleSubmit}>
                  <div className="inputDiv">
                    <p>Description</p>
                    <input type="text" name="description" placeholder="Enter a brief description" />
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
                    <input type="number" name="amount" placeholder="Enter an amount" />
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
                placeholder="Search Transaction..."
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
                      onDelete={() => handleDelete(index)}
                    />
                  ))}
                </tbody>
              </table>
              <DownloadButton expenses={expenses} />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;