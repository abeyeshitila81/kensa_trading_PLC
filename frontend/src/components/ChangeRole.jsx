import React, { useContext, useState } from "react";
import { baseURL } from "../helper/baseURL";
import { useGlobalContent } from "../useContext/useContext";
import { IoMdClose } from "react-icons/io";

export default function ChangeRole(props) {
  const [selectRole, setSelectRole] = useState();
  const { token, user } = useContext(useGlobalContent);
  const handleUpdate = async () => {
    const { _id: userID, name, email, role } = props.userDetail;
    console.log(userID, name, email, role);
    try {
      const response = await fetch(`${baseURL}/user//update-role`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, name, email, role: selectRole }),
      });
      const data = await response.json();

      props.callFunction();
      

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-60
     bg-slate-200 flex justify-center items-center" >
      <div className="mt-6 bg-white opacity-100 px-8 rounded w-1/3 py-2" 
      >
        {/* onClick={(ev)=>{ ev.stopPropagation(), ev.preventDefault()}} */}
        <h1 className="relative w-full ">
          Change Role User <span onClick={props.onClose} className="absolute cursor-pointer p-3 text-2xl right-2 top-1 text-red-500 "><IoMdClose/></span>
        </h1>
        <p>name :{props?.userDetail.name}</p>
        <p>email :{props?.userDetail.email}</p>
        <div className="flex">
          <p>Role :</p>
          <select
            value={selectRole}
            onChange={(ev) => setSelectRole(ev.target.value)}
          >
            <option defaultValue={props?.userDetail.role}>{props?.role || "..."}</option>
            <option value="ADMIN">Admin</option>
            <option value="GENERAL">General</option>
          </select>
        </div>
        <button
          className="bg-sky-400 rounded-full text-white px-3 py-1"
          onClick={()=>{handleUpdate(), props.onClose()}}
        >
          change role
        </button>
      </div>
    </div>
  );
}
