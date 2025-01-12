import React, { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setAdmintoken, backendurl } = useContext(AdminContext);

  const [state, setstate] = useState("Admin");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onsubmithandler = async (event) => {
    event.preventDefault();

    try {

      if (state === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login",{email,password}, {withCredentials : true});

        if (data.success) {
          localStorage.setItem("token", data.Admintoken);
          setAdmintoken(data.Admintoken);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {

      }
    } catch (err) {}
  };

  return (
    <form
      onSubmit={onsubmithandler}
      className="min-h-[90vh] flex items-center justify-center "
    >
      <div className="flex flex-col items-start gap-y-2 border border-gray-400 rounded-lg shadow-lg py-6 px-8 ">
        <p className="text-xl text-primary font-semibold text-center mb-1">
          {state} Login
        </p>
        <div>
          <p className="text-sm text-gray-500 mb-1">Email: </p>
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="w-full border-gray-900 rounded-md py-1"
            type="email"
          />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Password: </p>
          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="w-full border-gray-900 rounded-md py-1"
            type="password"
          />
        </div>
        <button className="bg-primary text-white w-full text-center py-2 rounded-md">
          Login
        </button>
        {state === "Admin" ? (
          <p className="text-sm">
            Doctor Login?
            <span
              onClick={() => setstate("Doctor")}
              className="text-primary cursor-pointer underline"
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Admin Login?
            <span
              onClick={() => setstate("Admin")}
              className="text-primary cursor-pointer underline"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
