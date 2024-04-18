import React, { useState, useEffect } from "react";
import ExpenseItem from "./components/ExpenseItem";
import IncomeContainer from "./components/IncomeContainer";
import BalanceContainer from "./components/BalanceContainer";
import TotalExpensesContainer from "./components/TotalExpensesContainer";
import DownloadButton from "./components/DownloadButton";
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
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(90000);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    fetchExpensesData();
  }, []);

  const fetchExpensesData = () => {
    fetch("https://your-domain.com/transactions", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
    })
      .then((resp) => resp.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses data:", error));
  };

  const addExpense = (expense) => {
    fetch("https://your-domain.com/transactions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(expense)
    })
    .then(response => response.json())
    .then(data => {
      setExpenses((prevExpenses) => [...prevExpenses, data]);
      alert("Expense successfully added!");
    })
    .catch((error) => console.error('Error:', error));
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const handleIncomeChange = (newIncome) => {
    setIncome(parseFloat(newIncome));
  };

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

  const handleDelete = (trans_id) => {
    fetch(`https://your-domain.com/transactions/${trans_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
    .then(response => {
      if(response.ok) {
        setExpenses(expenses.filter(expense => expense.id !== trans_id));
      }
    })
    .catch((error) => console.error('Error:', error));
  };

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };
  return (
    <div className={`app-container ${isSidebarActive ? "sidebar-active" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-details">
          <FontAwesomeIcon icon={faMoneyBillWave} style={{ color: "white" }} />
          <span className="logo_name">COINMATE</span>
        </div>
        <ul className="nav-links">
          <li onClick={toggleSidebar}>
            <div>
              <FontAwesomeIcon icon={faHouse} style={{ marginLeft: "20px" }} />{" "}
              <span className="links_name">Home</span>
            </div>
          </li>
          <li onClick={toggleSidebar}>
            <div>
              <FontAwesomeIcon
                icon={faChartPie}
                style={{ marginLeft: "20px" }}
              />
              <span className="links_name">Statistics</span>
            </div>
          </li>
          <li onClick={toggleSidebar}>
            <div>
              <FontAwesomeIcon
                icon={faFolderOpen}
                style={{ marginLeft: "20px" }}
              />
              <span className="links_name">Resources</span>
            </div>
          </li>
          <li onClick={toggleSidebar}>
            <div>
              <FontAwesomeIcon icon={faBell} style={{ marginLeft: "20px" }} />
              <span className="links_name">Notifications</span>
            </div>
          </li>
          <li onClick={toggleSidebar}>
            <div>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ marginLeft: "20px", marginTop: "800px" }}
              />
              <span className="links_name" style={{ marginTop: "800px" }}>
                Log Out
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <h1>Budget Planner</h1>
        </header>

        <div className="summaryDiv">
          <IncomeContainer
            income={income}
            onIncomeChange={handleIncomeChange}
          />
          <BalanceContainer
            income={income}
            totalExpenses={calculateTotalExpenses()}
          />
          <TotalExpensesContainer totalExpenses={calculateTotalExpenses()} />
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
                    onDelete={() => handleDelete(expense.id)}
                  />
                ))}
              </tbody>
            </table>
          
         
              {/* DownloadButton component */}
              <DownloadButton expenses={expenses} />
          </div>
            
        </div>
      </div>
    </div>
  );
}

export default App;