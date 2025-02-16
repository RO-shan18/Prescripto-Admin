
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {

    //Doctor's data
    const [doctordata, setdoctordata] = useState([]);
    const [dashboarddata, setdashboarddata] = useState([]);
    const [Admintoken, setAdmintoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const [appointment, setappointment] = useState([]);
    const backendurl = 'http://localhost:3000';

    const getDoctors = async() =>{
        try{    
            const {data} = await axios.get(backendurl + "/api/admin/all-doctor", {withCredentials : true});
            setdoctordata(data?.message);
        }catch(err){
            toast.error("ERR" + err.message);
        }
    }

    const checkavailability = async(id)=>{
        try{
            const {data} = await axios.post(backendurl + "/api/admin/check-availability", {id}, {withCredentials:true});
        
                if(data.message){
                    toast.success(data?.message);
                    getDoctors();
                }
            }catch(err){
                toast.error(err.message);
            }
    }

    const getAllAppointment = async()=>{
        try{
            const {data} = await axios.get(backendurl + "/api/admin/getappointment", {withCredentials:true});

            if(data?.message){
                toast.success(data?.message);
                setappointment(data?.message);
            }
        }catch(err){
            toast.error(err.message);
        }
    }

    const ageconverter = (dob)=>{
        const today = new Date();
        const birthdate = new Date(dob);

        const age = today.getFullYear() - birthdate.getFullYear();
        return age;
    }

    const getDashboardData = async()=>{
        try{
            const{data} = await axios.get(backendurl + "/api/admin/getdashboarddata",{withCredentials:true});

            if(data?.success){
                setdashboarddata(data?.message);
            }
        }catch(err){
           toast.error(err.message);
        }
    }

    const value = {
    Admintoken, setAdmintoken, backendurl, doctordata, checkavailability, getDoctors, appointment, getAllAppointment, setappointment, ageconverter, dashboarddata, setdashboarddata, getDashboardData
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider