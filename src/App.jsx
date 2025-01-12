import React, { useContext } from "react";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import Appointment from "./pages/Admin/Appointment";
import Doctorlist from "./pages/Admin/Doctorlist";

const App = () => {
  const {Admintoken} = useContext(AdminContext);
  return (
    <div>
      {Admintoken ? (
        <div>
          <ToastContainer />
          <Navbar/>

          <div className="flex items-start ">
             <Sidebar/>
             <Routes>
              <Route path="/" element={<></>} />
              <Route path="/admin-dashboard" element={<Dashboard/>} />
              <Route path="/admin-adddoctor" element={<AddDoctor/>} />
              <Route path="/admin-allappointment" element={<Appointment/>} />
              <Route path="/admin-doctorlist" element={<Doctorlist/>} />
             </Routes>
          </div>

        </div>
      ) : (
        <div>
          <Login/>
          <ToastContainer/>
        </div>
      )}
    </div>
  );
};

export default App;
