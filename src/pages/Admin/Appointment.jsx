import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { Appcontext } from "../../context/AppContext";

const Appointment = () => {
  const { appointment, getAllAppointment, Admintoken, ageconverter, backendurl } =
    useContext(AdminContext);

  const {formatdate} = useContext(Appcontext);

  const cancelappointment = async(appointmentid)=>{
    try{
      const {data} = await axios.post(backendurl + "/api/admin/cancelAppointment", {appointmentid}, {withCredentials:true});

      if(data?.success){
        toast.success(data?.message);
        getAllAppointment();
      }else{
        toast.error(data?.message)
      }

    }catch(err){
      console.log(err)
      toast.error(err)
    }
  }

  useEffect(() => {
    if (Admintoken) {
      getAllAppointment();
    }
  }, [Admintoken]);

  return (
    <div>
      <div className="flex flex-col m-10 gap-5">
        <p className="text-xl font-semibold">All Appointments</p>
        <div className="border border-solid p-2 min-w-[80vw]">
          <div className="grid grid-cols-[1fr_3fr_1fr_2fr_3fr_1fr_2fr] font-semibold border-b border-solid p-2">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          <div>
            {appointment.map((data, index) => {
              return (
                <div className="grid grid-cols-[1fr_3fr_1fr_2fr_3fr_1fr_2fr] items-center">
                  <p>{index + 1}</p>
                  <div className=" flex justify-start items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={data?.userData?.image}
                      alt="userimage"
                    />
                    <p>{data?.userData?.name}</p>
                  </div>
                  <p>{ageconverter(data?.userData?.DOB)}</p>
                  <p>
                    {formatdate(data?.slotDate) + " | "}
                    {data?.slotTime}
                  </p>
                  <div className="flex justify-start items-center">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={data?.docData?.image}
                      alt="docimage"
                    />
                    <p>{data?.docData?.name}</p>
                  </div>
                  <p>${data?.docData?.fees}</p>
                  {data?.Cancelled ? (
                    <p className="text-red-300">Cancelled</p>
                  ) : (
                    <button onClick={()=> cancelappointment(data?._id)}><img src={assets?.cancel_icon} alt="cancel icon" /></button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
