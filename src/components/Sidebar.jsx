import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {Admintoken} = useContext(AdminContext)
  return (
    <div>
      {
         Admintoken && 
         <ul className='flex flex-col gap-3 mt-2 w-[15vw]  border-r-2 h-[90vh]'>
            <NavLink className={({isActive}) => `flex gap-3 px-2 py-2 ${isActive ? "bg-gray-200 border-r-8 border-primary" :""}`} to={"/admin-dashboard"}>
                <img src={assets.home_icon}/>
                <li>Dashboard</li>
            </NavLink>
            <NavLink className={({isActive}) => `flex gap-3 px-2 py-2 ${isActive ? "bg-gray-200 border-r-8 border-primary" :""}`} to={"/admin-allappointment"}>
                <img src={assets.appointment_icon}/>
                <li>Appointment</li>
            </NavLink>
            <NavLink className={({isActive}) => `flex gap-3 px-2 py-2 ${isActive ? "bg-gray-200 border-r-8 border-primary" :""}`} to={"/admin-adddoctor"}>
                <img src={assets.add_icon}/>
                <li>AddDoctor</li>
            </NavLink>
            <NavLink className={({isActive}) => `flex gap-3 px-2 py-2 ${isActive ? "bg-gray-200 border-r-8 border-primary" :""}`} to={"/admin-doctorlist"}>
               <img src={assets.people_icon}/>
                <li>DoctorList</li>
            </NavLink>
         </ul>
      }
    </div>
  )
}

export default Sidebar
