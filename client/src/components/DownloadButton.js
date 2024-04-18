import React from "react";

const DownloadButton = ({ expenses }) => {
  const downloadExpenses = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Description,Category,Amount,Date\n" +
      expenses.map(expense =>
        `${expense.description},${expense.category},${expense.amount},${expense.date}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button class = "download-button" onClick={downloadExpenses}>
      Download Expenses
    </button>
  );
};

export default DownloadButton;
