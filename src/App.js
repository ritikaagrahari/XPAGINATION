import React, { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const rowsPerPage = 10;

  // Fetch employee data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Employee Data Table</h2>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ backgroundColor: "teal", color: "white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          Previous
        </button>
        <span style={{ margin: "0 15px" }}>{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: "teal", color: "white" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
