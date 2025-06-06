import React from "react";
import "./app.css";
import Login from "./Component/Login/Login";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import OtpScreen from "./Component/Login/OtpScreen";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Projects from "./Component/Dashboard/Projects";

const App = () => {
  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="verifyotp" element={<OtpScreen />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
