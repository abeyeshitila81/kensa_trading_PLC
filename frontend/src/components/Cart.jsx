import React, { useEffect, useState, useContext } from "react";
import { baseURL } from "../helper/baseURL";
import { useGlobalContent } from "../useContext/useContext";
import displayETBCurrent from "../helper/displayCurrency";
import { toast } from "react-toastify";
export default function Cart() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { countProduct, token,fetchDataCount } = useContext(useGlobalContent);
  const loadingProduct = new Array(countProduct).fill(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/cart/product-from-cart`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      if (data && data.product) {
        setProduct(data.product);
        // toast.success(data.msg)
      }
      setLoading(false);
    
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(product)
  const increaseQuantity = async (id, qty) => {
    try {
      const response = await fetch(`${baseURL}/cart/update-from-cart`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: qty + 1, _id: id }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        fetchData();
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };
  const decreaseQuantity = async (id, qty) => {
    if (qty =>2) {
      try {
        const response = await fetch(`${baseURL}/cart/update-from-cart`, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: qty - 1, _id: id }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          fetchData();
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
        setLoading(false);
      }
    }
  };
  const deleteFromCart=async(id, token)=>{
    try {
      const response =await fetch(`${baseURL}/cart/delete-from-cart`,
    {
      method:"DELETE",
      headers:{"Content-Type":"application/json", Authorization:"Bearer "+token},
      body:JSON.stringify({_id:id})
    })
    fetchData()
    fetchDataCount(token)
   
    } catch (error) {
        console.log(error.message);
        toast.error(error.message);
    }
  }
  const totalQuantity=product?.reduce((prev, curr)=> prev + curr.quantity, 0);
  const totalPrice=product?.reduce((prev, curr)=>prev +(curr.quantity * curr.productId.sellingPrice), 0)
  return (
    <div className="container flex md:flex-row flex-col gap-2 mx-auto h-full w-full px-3 ">
      {product?.length === 0 && !loading && (
        <div className="w-full h-full bg-slate-400">
          <p> No To Add To Cart</p>
        </div>
      )}
      {/* product list from cart*/}
      <div className="bg-white w-full md:w-2/3 h-full mt-2 ">
        {loading ? (
          loadingProduct.map((el, index) => (
            <div
              className="w-full h-44 bg-slate-300  animate-pulse my-4"
              key={index + el}
            ></div>
          ))
        ) : (
          <div>
            {product?.map((el) => (
              <div
                className="w-full h-44 flex gap-2 bg-gray-100 my-4 relative"
                key={el?._id}
              >
                <button className="absolute top-2 right-2 text-red-600 bg-white rounded-full px-3 py-
                 hover:bg-red-500 hover:text-white " onClick={()=>deleteFromCart(el._id, token)}>delete</button>
                <img src={el?.productId?.productImage[0]} alt="..." />
                <div className="flex flex-col gap-3 items-center">
                  <p className="font-bold text-center">
                    {el?.productId?.productName}{" "}
                  </p>
                  <p className="text-gray-400">{el?.productId?.category} </p>
                  <div className="flex justify-between w-full">
                  <p className="font-semibold text-sky-800 ">
                    {displayETBCurrent(el.productId.sellingPrice)}
                  </p>
                  <p className="font-semibold text-red-400">
                    {displayETBCurrent(el.productId.sellingPrice * el.quantity)}
                  </p>
                  </div>
                 
                  <div className="">
                    <button
                      className="p-2 m-2 bg-red-600 rounded-md text-white text-2xl hover:font-extrabold
                    hover:bg-white hover:text-red-500 border-none text-center px-4"
                      onClick={() => decreaseQuantity(el._id, el?.quantity)}
                    >
                      -
                    </button>
                    <span className="m-3 font-bold text-2xl">
                      {el?.quantity}
                    </span>
                    <button
                      className="p-2 m-2 bg-green-600 rounded-md text-white text-2xl hover:font-extrabold
                   hover:bg-white hover:text-green-500 border-none text-center px-4"
                      onClick={() => increaseQuantity(el._id, el?.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Total Price */}
      <div className="bg-slate-200 w-full md:w-1/3  md:mt-2 md:h-40 mt-6 rounded-md">
      <h2 className="bg-red-500 text-white text-center p-2">Summary of quantity and Price</h2>
       <div className="flex justify-between mx-auto items-center my-6 w-2/3">
        <p>Quantity</p>
        <p>{totalQuantity}</p>
       </div>
       <div className="flex justify-between mx-auto items-center my-6 w-2/3">
        <p>Total Price</p>
        <p>{displayETBCurrent(totalPrice)}</p>
       </div>
       <button className="bg-sky-500 w-full text-white py-2 ">Payment</button>
      </div>
    </div>
  );
}
