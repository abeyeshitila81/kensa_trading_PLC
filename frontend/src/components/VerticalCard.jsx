import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import AddToCart from "../helper/addToCart";

import { baseURL } from "../helper/baseURL";
import displayETBCurrency from "../helper/displayCurrency";
import { Link } from "react-router-dom";
export default function VerticalCard({ category, heading }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]=useState(true)

    const loadingProduct=new Array(12).fill(null)
    const addToCart=AddToCart()

  const scrollElement=useRef()
  const scrollLeft = () => {
   scrollElement.current.scrollLeft -=100
  
  };
  const scrollRight = () => {
    scrollElement.current.scrollLeft +=100
  };
  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `${baseURL}/product/category-one/${category}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const dataResponse = await response.json();
    
    if (dataResponse && dataResponse.products) {
      setProducts(dataResponse.products);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container  px-3 py-2 mx-auto relative ">
      <h1> {heading}</h1>
      <div className="md:flex absolute  top-[40%] w-full p-3  mx-auto hidden justify-between">
          <button
            className="p-2 z-10 rounded-full bg-gray-700 text-white cursor-pointer hover:scale-105 hover:bg-slate-400"
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </button>
          <button
            className="p-2 z-10 rounded-full bg-gray-700 text-white cursor-pointer hover:scale-105 hover:bg-slate-400 "
            onClick={scrollRight}
          >
            <FaAngleRight />
          </button>
        </div>

{
    loading ? (
        <div className="container w-[97%] p-2 mx-auto bg-white flex items-center overflow-scroll scrollbar-none transition-all gap-2" ref={scrollElement}>
        {
          loadingProduct.map((product, index) => (
            <div
              key={index}
              className="gap-2 flex flex-col p-2 min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow "
            >
              <div className="bg-slate-300 h-48 p-4 min-w-[100px] md:min-w-[125px] flex justify-center rounded-md animate-pulse">
                
              </div>
              <div className="flex flex-col justify-center w-full h-full text-justify gap-4">
                <p className="font-semibold text-ellipsis p-3 rounded-md animate-pulse bg-slate-300 w-full h-full">
                  
                </p>
                <p className=" p-3 rounded-md animate-pulse bg-slate-300 w-full h-full"></p>
                <div className="flex gap-4 ">
                  <p className="text-sky-500 text-sm p-3 rounded-md animate-pulse bg-slate-300 w-full h-full">
                   
                  </p>
                  <p className="text-gray-500 line-through text-sm p-3 rounded-md animate-pulse bg-slate-300 w-full h-full">
                    
                  </p>
                </div>
                <button className=" text-white py-4 p-2 bg-slate-300 rounded-full">
                  
                </button>
              </div>
            </div>
          ))
         }
      </div>
    )
    :(
<div className="container w-[97%] p-2 mx-auto bg-white flex items-center overflow-scroll scrollbar-none transition-all gap-2" ref={scrollElement}>
        {products && products.length ? (
          products.map((product, index) => (
            <Link
            to={`/product-detail/${product._id}`}
              key={product._id}
              className="gap-4 p-2 min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow cursor-pointer "
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[100px] md:min-w-[125px] flex justify-center ">
                <img
                  src={product.productImage[0]}
                  className="object-scale-down h-full scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col justify-center text-justify gap-4 w-[75%] mx-auto">
                <p className="font-semibold text-ellipsis mix-blend-multiply">
                  {product.productName}
                </p>
                <p text-gray-500 text-sm>{category}</p>
                <div className="flex gap-4 ">
                  <p className="text-sky-500 text-sm ">
                    {displayETBCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-gray-500 line-through text-sm">
                    {displayETBCurrency(product.price)}
                  </p>
                </div>
                <button className="bg-sky-500 text-white rounded-md p-2 hover:bg-sky-600"  
                onClick={(ev)=>addToCart(ev, product._id)}>
                  Add to cart
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div> product not found </div>
        )}
      </div>
    )
}

      
    </div>
  );
}
