
import React, { useState } from "react";

import scrollTo from "../helper/scrollTo";
import displayETBCurrency from "../helper/displayCurrency";
import { Link } from "react-router-dom";
export default function FilterProduct({ products, loading }) {
    const loadingProduct=new Array(12).fill(null)

  return (
    <div className="container  px-3 py-2 mx-auto relative overflow-y-scroll ">
      <h1> Display Product </h1>
{
    loading ? (
        <div className="container w-[97%] p-2 mx-auto bg-white flex items-center overflow-scroll scrollbar-none transition-all gap-2" >
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
    <div className="container w-[97%] p-2 mx-auto bg-white grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 justify-between items-center overflow-scroll scrollbar-none transition-all " >
        {products  ? (
          products.map((product, index) => (
            <Link to={`/product-detail/${product?._id}`}
              key={product._id}
              className="gap-4 p-2 min-w-[200px] md:min-w-[200px] bg-white rounded-sm shadow "
              onClick={scrollTo}
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[100px] md:min-w-[125px] flex justify-center ">
                <img
                  src={product?.productImage[0]}
                  className="object-scale-down h-full scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col justify-center text-justify gap-4">
                <p className="font-semibold text-ellipsis mix-blend-multiply">
                  {product?.productName}
                </p>
                <p text-gray-500 text-sm>{product?.category}</p>
                <div className="flex gap-4 ">
                  <p className="text-sky-500 text-sm ">
                    {displayETBCurrency(product.sellingPrice)}
                  </p>
                  <p className="text-gray-500 line-through text-sm">
                    {displayETBCurrency(product.price)}
                  </p>
                </div>
                <button className="bg-sky-500 text-white rounded-md p-2 hover:bg-sky-600">
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
