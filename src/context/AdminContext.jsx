
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {

    //Doctor's data
    const [doctordata, setdoctordata] = useState([]);
 
    const [Admintoken, setAdmintoken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

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
                    toast.success(data.message);
                    getDoctors();
                }
            }catch(err){
                toast.error(err.message);
            }
    }

    const value = {
    Admintoken, setAdmintoken, backendurl, doctordata, checkavailability, getDoctors
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider