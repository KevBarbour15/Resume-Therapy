import "./index.css";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./authentication/Register";
import EmployeeHome from "./pages/employee-pages/EmployeeHome";
import EmployeeRegister from "./authentication/EmployeeRegister";
import EmployeeSignIn from "./authentication/EmployeeSignIn";

// Users Imports
import PasswordReset from "./authentication/PasswordReset";
import SignIn from "./authentication/SignIn";
import UserMessages from "./pages/user-pages/Messages/UserMessages";
import MeetReviewers from "./pages/user-pages/MeetReviewers/MeetReviewers";
import VirtualCall from "./pages/user-pages/VirtualCall";
import UserProfile from "./pages/user-pages/UserProfile/UserProfile";
import BookAppointment from "./pages/user-pages/Appointments/BookAppointment";

// Employee Imports
import UserConnections from "./pages/user-pages/Connections/UserConnections";
import EmployeeProfile from "./pages/employee-pages/EmployeeProfile/EmpProfile";
import EmployeeAvailability from "./pages/employee-pages/Availability/EmpAvailability";
import EmployeeConnections from "./pages/employee-pages/EmployeeConnections/EmployeeConnections";
import EmployeePending from "./pages/employee-pages/EmployeePending/EmployeePending";
import EmployeeMessages from "./pages/employee-pages/EmployeeMessages/EmpMessages";
import EmployeeVirtualCall from "./pages/employee-pages/EmployeeVirtualCall/EmployeeVirtualCall";
import DashLayout from "./pages/user-pages/DashLayout";
import EmployeeDashLayout from "./pages/employee-pages/EmployeeDashLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/EmployeeRegister" element={<EmployeeRegister />} />
        <Route path="/EmployeeSignIn" element={<EmployeeSignIn />} />
        <Route path="/PasswordReset" element={<PasswordReset />} />
        <Route path="/EmployeeHome" element={<EmployeeHome />} />
      </Routes>

      <Routes>
        <Route path="/UserDash" element={<DashLayout />}>
          <Route path="/UserDash/MeetReviewers" element={<MeetReviewers />} />
          <Route path="/UserDash/Messages" element={<UserMessages />} />
          <Route path="/UserDash/VirtualCall" element={<VirtualCall />} />
          <Route path="/UserDash/Profile" element={<UserProfile />} />
          <Route path="/UserDash/Connections" element={<UserConnections />} />
          <Route
            path="/UserDashh/BookAppointment"
            element={<BookAppointment />}
          />
        </Route>
      </Routes>

      <Routes>
        <Route path="/reviewer-dash" element={<EmployeeDashLayout />}>
          <Route path="/reviewer-dash/profile" element={<EmployeeProfile />} />
          <Route
            path="/reviewer-dash/availability"
            element={<EmployeeAvailability />}
          />
          <Route
            path="/reviewer-dash/connections"
            element={<EmployeeConnections />}
          />
          <Route
            path="/reviewer-dash/pending-connections"
            element={<EmployeePending />}
          />
          <Route
            path="/reviewer-dash/Messages"
            element={<EmployeeMessages />}
          />
          <Route
            path="/reviewer-dash/virtual-call"
            element={<EmployeeVirtualCall />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
