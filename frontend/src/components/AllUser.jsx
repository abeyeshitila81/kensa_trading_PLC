import React, { useContext, useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";

import ChangeRole from './ChangeRole'
import { baseURL } from '../helper/baseURL'
import { useGlobalContent } from '../useContext/useContext';
export default function AllUser() {
    const [allUser, setAllUser]=useState(null)
    const [openUpdate, setOpenUpdate]=useState(false)
    const [userDetail, setUserDetail]=useState({
      name:"",
      email:"",
      role:"",
      userId:""
    })
    const {token}=useContext(useGlobalContent)
   
    const fetchData=async()=>{
      try {
        const response=await fetch(`${baseURL}/user/`,
        {
        headers:{"Authorization":`Bearer ${token}`}
       })

       if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
       const data=await response.json()
       if(data && data.users){
         setAllUser(data.users)
       }else{
         console.log("All user not fetch ")
       }
      } catch (error) {
        console.log("error", error.message)
      }
     
      }
    useEffect(()=>{
      fetchData()
    },[])
    const onClose=(ev)=>{
     ev.stopPropagation()
     setOpenUpdate(false)
    }
  return (
       <div className='full'>
          <table className='w-full bg-white border'>
            <thead>
            <tr>
                <th> No</th>
                <th> Name</th>
                <th> Email</th>
                <th> Role</th>
                <th> Action</th>
            </tr>
            </thead>
            <tbody>
            {allUser && allUser.map((item, index)=>(
           <tr key={item?._id} >
                <td>{index+1}</td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>
                  <button type='button' className='cursor-pointer' onClick={()=>{
                      setUserDetail(item)
                      setOpenUpdate(true)
                    }
                    }><MdEdit/></button>
                </td>
           
            </tr>))}
            </tbody>
            </table>
            <div className='  '>
           { openUpdate && <ChangeRole onClose={onClose} userDetail={userDetail} callFunction={fetchData}/>}
            </div>
    </div>
  )
}
