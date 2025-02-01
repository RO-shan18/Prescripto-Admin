import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Doctorlist = () => {

const {doctordata, checkavailability, getDoctors} = useContext(AdminContext);

useEffect(()=>{
  if(doctordata)
  getDoctors();

},[])

if(doctordata.length === 0){
  return <p>Not found any doctor</p>
}

  return (
    <div className='flex flex-col gap-4 '>
      <h1 className='px-28 font-semibold text-xl'>All Doctors</h1>
      <div className='flex flex-wrap rounded-lg justify-center items-center  gap-8 '>
        {
          doctordata.map((data, index)=>{
            return(
              <div className='border-2 border-gray-200 rounded-lg' key={index}>
                 <img className='w-48 rounded-lg bg-blue-100' src={data?.image} />

                 <div className='flex flex-col items-start px-3 py-4'>
                  <div className='flex gap-2'>
                    <input type="checkbox" onChange={()=> checkavailability(data?._id)} checked={data?.available} />
                    <p className='text-lg '>Available</p>
                    </div>
                    <h2 className='text-lg font-semibold'>{data?.name}</h2>
                    <p className='text-sm text-gray-600'>{data?.speciality}</p>
                 </div>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default Doctorlist
