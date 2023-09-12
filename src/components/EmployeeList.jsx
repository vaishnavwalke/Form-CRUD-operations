import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
const EmployeeList = () => {
  // State to store the fetched data
  const [employeeData, setEmployeeData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Make a GET request to fetch the data
    axios
      .get("https://sweede.app/DeliveryBoy/Get-Employee/")
      .then((response) => {
        // Set the fetched data in the state
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []); // The empty array [] as the second argument ensures this effect runs only once

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowPopup(employee.id);
    // console.log(employee.id);
    navigate(`/edit/` + employee.id);
  };

  const handleViewClick = (employee) => {
    e;
    console.log("View clicked for employee:", employee);
  };

  const handleDeleteClick = (employee) => {
    console.log(employee);
    const id = employee;
    axios
      .delete("https://sweede.app/DeliveryBoy/delete-Employee/" + id)
      .then((response) => {
        console.log("Record deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting record: ", error);
      });
    //console.log("Delete clicked for employee:", employee);
  };
  return (
    <>
      <Header>Employee List</Header>
      <Liste>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th className="actions-column"> </th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.FirstName + " " + employee.LastName}</td>

                <td>{employee.DOB}</td>

                <td>{employee.StartDate}</td>
                <td>{employee.EndDate}</td>

                <td>{employee.Description}</td>
                <td>
                  <div
                    onClick={() => handleEditClick(employee)}
                    className="edit-icon"
                  >
                    <BsThreeDotsVertical />
                  </div>
                  {showPopup === employee.id && (
                    <PopUp>
                      <div>
                        <button>View</button>
                      </div>
                      <div>
                        <button onClick={() => handleEditClick(employee.id)}>
                          Edit
                        </button>
                      </div>
                      <div>
                        <button onClick={() => handleDeleteClick(employee.id)}>
                          Delete
                        </button>
                      </div>
                    </PopUp>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Liste>
      {/* {selectedEmployee && (
        <Popup>
          <ul>
            <li onClick={() => handleViewClick(selectedEmployee)}>View</li>
            <li onClick={() => handleEditClick(selectedEmployee)}>Edit</li>
            <li onClick={() => handleDeleteClick(selectedEmployee)}>Delete</li>
          </ul>
          <button onClick={() => setSelectedEmployee(null)}>Close</button>
        </Popup>
      )} */}
    </>
  );
};

export default EmployeeList;

const Header = styled.h2`
  color: var(--Dark-blue_01, #314363);
  font-family: Montserrat;
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 63px */
  margin-top: 118px;
  margin-left: 115px;
`;
const Liste = styled.div`
  width: 1330px;
  min-height: 655px;

  border-radius: 30px;
  border: 1px solid #d5d5d5;
  background: #fff;
  margin-left: 115px;
  margin-top: 24px;
  table {
    margin-top: 94px;
    width: 100%;
    border-collapse: collapse;
    th {
      padding: 8px; /* Add padding to header cells for spacing */
      text-align: center; /* Center-align the content */
      border-bottom: 1px solid #d5d5d5; /* Add a horizontal line below headers */
      color: #263857; /* Text color */
      font-family: Montserrat, sans-serif; /* Font family */
      font-size: 20px; /* Font size */
      font-style: normal; /* Font style */
      font-weight: 500; /* Font weight */
      line-height: 140%; /* Line height */
      letter-spacing: 0.2px; /* Letter spacing */
    }

    td {
      width: 113px; /* Width for cells */
      height: 129px; /* Height for cells */
      flex-shrink: 0; /* Prevent cells from shrinking */
      color: var(--Grey_03, #7e98ba); /* Text color for cells */
      font-family: Montserrat, sans-serif; /* Font family for cells */
      font-size: 13px; /* Font size for cells */
      font-style: normal; /* Font style for cells */
      font-weight: 500; /* Font weight for cells */
      line-height: 140%; /* Line height for cells */
      letter-spacing: 0.13px; /* Letter spacing for cells */
      padding: 8px; /* Add padding to cells for spacing */
      text-align: center; /* Center-align the content */
      border: none;
      &::before {
        content: "\f141"; /* Unicode for the three dots icon */
        font-family: "FontAwesome"; /* Use an appropriate icon font */
        font-size: 18px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #263857;
      }
      .edit-icon {
        //margin-right: 28px; // Position the 3-dots icon 28px from the right
        cursor: pointer;
        //margin-left: 180px;
      }
      .popUp {
        width: 103px;
        height: 97px;
        border-radius: 6px;
        border: 1px solid #f4f4f4;
        background: #fff;
        gap: 29px;
      }
    }

    tr {
      height: 129.8px;
      border-bottom: 1px solid #d5d5d5; /* Border style with stroke-width and stroke color */
      width: 1330.018px; /* Set the width */
      height: 0px; /* Set the height */
      transform: rotate(0.31deg); /* Apply rotation if needed */
      flex-shrink: 0;
      stroke-width: 1px;
      stroke: #d5d5d5; /* Set the height/distance between rows */
    }

    /* Style the last row to remove the border */
    tr:last-child {
      border-bottom: none;
    }
    .actions-column {
      width: 80px;
      padding-left: 50px; // Adjust the width of the actions column
    }

    td .edit-icon {
      //margin-right: 28px; // Position the 3-dots icon 28px from the right
      cursor: pointer;
      //margin-left: 180px;
    }

    .popUp {
      width: 103px;
      height: 97px;
      border-radius: 6px;
      border: 1px solid #f4f4f4;
      background: #fff;
    }
    PopUp {
      width: 103px;
      height: 97px;
      border-radius: 6px;
      border: 1px solid #f4f4f4;
      background: #fff;
      gap: 29px;
    }
  }
`;
const PopUp = styled.div`
  width: 103px;
  height: 97px;
  border-radius: 6px;
  border: 1px solid #f4f4f4;
  background: #fff;
  gap: 29px;
`;
