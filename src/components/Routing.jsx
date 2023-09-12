import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Form,
} from "react-router-dom";
import EmployeeList from "./EmployeeList";
import SelectEmployee from "./SelectEmployee";
import Home from "./Home";
import EditForm from "./EditForm";
const Routing = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/EmployeeList">EmployeeList</Link>
            </li>
            <li>
              <Link to="/SelectEmployee">SelectEmployee</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/EmployeeList" element={<EmployeeList />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/SelectEmployee" element={<SelectEmployee />} />
      </Routes>
    </Router>
  );
};

export default Routing;
