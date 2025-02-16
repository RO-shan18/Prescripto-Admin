import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { Appcontext } from "../../context/AppContext";

const Dashboard = () => {
  const {
    Admintoken,
    dashboarddata,
    getDashboardData,
    backendurl,
  } = useContext(AdminContext);

  const { formatdate } = useContext(Appcontext);

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
      getDashboardData();
    }
  }, [Admintoken]);

  console.log(dashboarddata);

  return (
    dashboarddata && (
      <div className="flex flex-col m-7 gap-9 min-w-[80vw]">
        <div className="flex gap-x-10">
          <div className="flex  items-center  border border-solid p-4 rounded-lg">
            <img src={assets?.doctor_icon} alt="doctorimage" />
            <div> <p className="text-xl text-gray-600 ">{dashboarddata?.doctors}</p>
            <p className="text-gray-400">doctors</p></div>
          </div>
          <div className="flex items-center border border-solid p-4 rounded-lg">
            <img src={assets?.appointments_icon} alt="appointmentimage" />
            <div><p className="text-xl text-gray-600">{dashboarddata?.appointment}</p>
            <p className="text-gray-400">appointments</p></div>
          </div>
          <div className="flex items-center border border-solid p-4 rounded-lg">
            <img src={assets?.patients_icon} alt="peopleimage" />
            <div><p className="text-xl text-gray-600">{dashboarddata?.users}</p>
            <p className="text-gray-400">patients</p></div>
          </div>
        </div>
        <div className="flex flex-col border border-solid">
          <div className="flex gap-3 border-b-2 border-solid p-4">
            <img src={assets?.list_icon} alt="listimage" />
            <p>Latest appointments</p>
          </div>
          <div className="flex flex-col gap-3 py-3">
            {dashboarddata?.recentappointment?.map((data, index) => {
              return (
                <div key={index} className="flex justify-between items-center px-4">
                  <div className="flex gap-3 items-center">
                  <img className="w-12 rounded-full" src={data?.userData?.image} alt="userimage" />
                  <div className="text-sm">
                    <p>{data?.userData?.name}</p>
                    <p className="text-gray-600">Booking on {formatdate(data?.slotDate)}</p>
                  </div>
                  </div>
                  {data?.Cancelled ? (
                    <p className="text-red-300 text-sm">Cancelled</p>
                  ) : (
                    <button onClick={() => cancelappointment(data?._id)}>
                      <img src={assets?.cancel_icon} alt="cancel icon" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
