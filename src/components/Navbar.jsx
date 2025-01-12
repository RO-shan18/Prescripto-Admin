import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import {assets} from "../assets/assets"
import {useNavigate} from "react-router-dom"

const Navbar = () => {

  const {Admintoken, setAdmintoken} = useContext(AdminContext)
  const navigate = useNavigate();

  const logout = ()=>{
      navigate("/")
      Admintoken && setAdmintoken('');
      Admintoken && localStorage.removeItem("token");
  }
  return (
    <div className='flex justify-between px-5 py-2 pb-4 items-center border-b-2'>
        <div className='flex gap-3 items-center justify-center'>
            <img className='w-40 ' src={assets.admin_logo}/>
            <p className='text-sm border border-black rounded-full px-2 py-1 '>{Admintoken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className='px-5 py-2 bg-primary rounded-full text-white '>Logout</button>
    </div>
  )
}

export default Navbar
