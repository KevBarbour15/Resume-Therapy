import "./index.scss";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./authentication/Register";
import EmployeeHome from "./pages/employee-pages/EmployeeHome";
import EmployeeRegister from "./authentication/EmployeeRegister";
import EmployeeSignIn from "./authentication/EmployeeSignIn";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Users Imports
import PasswordReset from "./authentication/PasswordReset";
import SignIn from "./authentication/SignIn";
import UserMessages from "./pages/user-pages/Messages/UserMessages";
import MeetReviewers from "./pages/user-pages/MeetReviewers/MeetReviewers";
import VirtualCall from "./pages/user-pages/VirtualCall/VirtualCall";
import UserProfile from "./pages/user-pages/UserProfile/UserProfile";
import BookAppointment from "./pages/user-pages/Appointments/BookAppointment";
import ChatGPTGuidance from "./pages/user-pages/ChatGPTGuidance/ChatGPTGuidance";
import DashLayout from "./pages/user-pages/DashLayout";

// Employee Imports
import UserConnections from "./pages/user-pages/Connections/UserConnections";
import EmployeeProfile from "./pages/employee-pages/EmployeeProfile/EmployeeProfile";
import EmployeeAvailability from "./pages/employee-pages/EmployeeAvailability/EmployeeAvailability";
import EmployeeConnections from "./pages/employee-pages/EmployeeConnections/EmployeeConnections";
import EmployeePending from "./pages/employee-pages/EmployeePending/EmployeePending";
import EmployeeMessages from "./pages/employee-pages/EmployeeMessages/EmployeeMessages";
import EmployeeVirtualCall from "./pages/employee-pages/EmployeeVirtualCall/EmployeeVirtualCall";
import EmployeeDashLayout from "./pages/employee-pages/EmployeeDashLayout";

//GSAP Plugins
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);


function App() {
  return (
    <div>
      <ToastContainer className="customToast" />
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
            path="/UserDash/BookAppointment"
            element={<BookAppointment />}
          />
          <Route
            path="/UserDash/ChatGPTGuidance"
            element={<ChatGPTGuidance />}
          />
        </Route>
      </Routes>

      <Routes>
        <Route path="/ReviewerDash" element={<EmployeeDashLayout />}>
          <Route path="/ReviewerDash/Profile" element={<EmployeeProfile />} />
          <Route
            path="/ReviewerDash/Availability"
            element={<EmployeeAvailability />}
          />
          <Route
            path="/ReviewerDash/Connections"
            element={<EmployeeConnections />}
          />
          <Route
            path="/ReviewerDash/PendingConnections"
            element={<EmployeePending />}
          />
          <Route path="/ReviewerDash/Messages" element={<EmployeeMessages />} />
          <Route
            path="/ReviewerDash/VirtualCall"
            element={<EmployeeVirtualCall />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
