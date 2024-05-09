import React, { useState, useContext } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import {toast} from "react-toastify"
import { category } from "../helper/category";
import { useGlobalContent } from '../useContext/useContext';

import { uploadImage } from "../helper/baseURL";
import { baseURL } from "../helper/baseURL";
export default function UploadProduct(props) {
    const [imageSize, setImageSize]=useState("")
    const [openImageSize, setOpenImageSize]=useState(false)
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    sellingPrice: "",
  });
  const {token}=useContext(useGlobalContent)
  const handleSetData = (ev) => {
    const { name, value } = ev.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleImage = async (ev) => {
    const file = ev.target.files[0];
    const uploadImageFromCloud = await uploadImage(file);
    console.log(uploadImageFromCloud);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageFromCloud.url],
      };
    });
  };
  const handleDeleteImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };
 const handleSubmitData=async(ev)=>{
    ev.preventDefault()
try {
  const response =await fetch(`${baseURL}/product/create`,
  {
    method:"POST",
    headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`},
    body:JSON.stringify(data)
  })
  const responseData=await response.json()
  if(responseData){
    toast.success(responseData.msg)
    props.callFunction()
  }
} catch (error) {
  toast.error(error.message)
  console.log(error.message)
}
 }
  return (
    <div className="bg-gray-900  bg-opacity-70 w-full min-h-fit absolute inset-0 pb-9  bottom-0" 
     onClick={props.OnClose}>
      <div className="flex justify-between w-[80%] mx-auto  top-[-4px] pt-4 px-3 
       items-start absolute mt-2 inset-x-3 in bg-white box-border" onClick={ev=>ev.stopPropagation()}>
          <h1>Upload Product</h1>
          <button
            className="bg-red-500 text-white rounded-full p-2"
            onClick={props.OnClose}
          >
            <IoIosClose />
          </button>
        </div>
      <div className="max-w-[80%] h-full mx-auto  bg-white overflow-scroll" onClick={ev=>ev.stopPropagation()}>
      
        <form onSubmit={(event) => {
          props.OnClose();
          handleSubmitData(event);
        }} className="w-[70%] mx-auto mt-16 px-2 pb-10 h-full " 
        >
          <div className="flex flex-col py-2">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleSetData}
              id="productName"
              placeholder="Enter Your Product Name"
              className="rounded outline-none py-1 border-2 bg-gray-100"
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="brandName">Brand Name:</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleSetData}
              id="brandName"
              placeholder="Enter Your Brand Name"
              className="rounded outline-none py-1 border-2 bg-gray-100"
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="category">Category:</label>
            <select
              type="text"
              id="category"
              name="category"
              value={data.category}
              onChange={handleSetData}
              className="rounded outline-none py-1 border-2 bg-gray-100"
              required
            >
                <option value={""}>Select Category</option>
              {category.map((item, index) => (
                <option value={item.value} key={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="imageUpload">Image Upload:</label>
            <label className="bg-gray-100 py-3 border-2" id="imageUpload">
              <span className="w-full flex justify-center items-center gap-4 py-2 mx-auto">
                <FaCloudUploadAlt className="text-5xl" />
                <span>upload image</span>
              </span>
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                onChange={(ev) => handleImage(ev)}
                placeholder="Enter Your Product Name"
                className="rounded outline-none py-1 border-2 bg-gray-100 hidden"
              
              />
            </label>
          </div>

          {data.productImage ? (
            <div className="flex items-center gap-3">
              {data?.productImage?.map((item, index) => (
                <div className="group relative"  key={item + index}>
                  <img
                    src={item}
                    alt="item-image"
                    width={80}
                    height={80}
                   
                    onClick={()=>{
                        setImageSize(item)
                        setOpenImageSize(true)
                    }}
                  />
                  <span
                    className="absolute top-2 right-2 text-white bg-red-500 rounded-full cursor-pointer hidden group-hover:block"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <MdOutlineDeleteForever />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500 text-sm">
              *Please upload image of product
            </p>
          )}

          <div className="flex flex-col py-2">
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              value={data.description}
              onChange={handleSetData}
              id="description"
              placeholder="Enter Your  Description"
              className="rounded outline-none py-1 border-2 resize-none bg-gray-100"
            >
            </textarea>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="price">Price of product:</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleSetData}
              id="price"
              placeholder="Enter Your Price"
              className="rounded outline-none py-1 border-2 bg-gray-100"
              required
            />

          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="sellingPrice">Selling Price:</label>
            <input
              type="number"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleSetData}
              id="sellingPrice"
              placeholder="Enter Your Selling Price"
              className="rounded outline-none py-1 border-2 bg-gray-100"
              required
            />
            
          </div>
          <button type="submit" className="bg-sky-500 text-white rounded-lg p-2 hover:bg-sky-600" 
          >Upload Product</button>
        </form> 
        {openImageSize &&  <div onClick={(ev)=>{
            setOpenImageSize(false)
            }} className=" h-full item-center absolute inset-40 bg-slate-900 bg-opacity-40 items-center ">
        <button
            className="bg-red-500 absolute text-white rounded-full p-2 top-2  right-2"
            onClick={(ev) => {
                setOpenImageSize(false);
            }}
          >
            <IoIosClose />
          </button>
       <div className="flex justify-center items-center mt-6 rounded-3xl bg-none" >
       <img src={imageSize} alt="name" className="w-[20rem] h-[20rem] flex justify-center items-center" onClick={(ev)=>{ev.stopPropagation()}}/>
       </div>
         
        </div>
}
      </div>
    </div>
  );
}
