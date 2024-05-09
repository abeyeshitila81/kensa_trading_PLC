    import React, { useEffect, useRef, useState, useContext } from "react";
    import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
    import { baseURL } from "../helper/baseURL";
    import AddToCart from "../helper/addToCart";
    import displayETBCurrency from "../helper/displayCurrency";
    import { Link } from "react-router-dom";
    export default function HorizontalCard({ category, heading }) {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(false);
      const addToCart = AddToCart();
      const scrollElement = useRef();
      const loadingProduct = new Array(12).fill(null);

      const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 100;
      };
      const scrollRight = () => {
        scrollElement.current.scrollLeft += 100;
      };
      const fetchData = async () => {
        setLoading(true);
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
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

      return (
        <div className="container  px-3 py-2 mx-auto relative overflow-hidden h-full ">
          <h1> {heading}</h1>
          <div className="md:flex  absolute  top-1/3 w-full p-2  mx-auto hidden justify-between">
            <button
              className="p-2 z-30  rounded-full bg-gray-700 text-white cursor-pointer hover:scale-105 hover:bg-slate-400"
              onClick={scrollLeft}
            >
              <FaAngleLeft />
            </button>
            <button
              className="p-2 z-30 rounded-full bg-gray-700 text-white cursor-pointer hover:scale-105 hover:bg-slate-400 "
              onClick={scrollRight}
            >
              <FaAngleRight />
            </button>
          </div>
          {loading ? (
            <div
              className="container w-[97%] p-2 mx-auto  flex items-center
               overflow-scroll scrollbar-none transition-all gap-2"
              ref={scrollElement}
            >
              {loadingProduct.map((product, index) => (
                <div
                  key={index}
                  className="flex gap-2 w-full min-w-[280px] md:min-w-[320px] h-36 bg-white pr-2 shadow rounded-lg "
                >
                  <div className="bg-slate-300 h-full p-4 min-w-[100px] md:min-w-[125px] animate-pulse rounded-md"></div>
                  <div className="flex flex-col gap-2 w-full h-20 pt-4 ">
                    <p className="font-semibold text-ellipsis animate-pulse h-full w-full rounded-lg bg-slate-300 p-3"></p>
                    <p className="font-semibold text-ellipsis animate-pulse h-full w-full rounded-lg bg-slate-300 p-3"></p>
                    <div className="flex gap-4 xl:flex-row flex-col ">
                      <p className="text-red-500 text-sm animate-pulse h-full w-full rounded-lg bg-slate-300 p-3"></p>
                      <p className="text-gray-500  text-sm animate-pulse h-full w-full rounded-lg bg-slate-300 p-2"></p>
                    </div>
                    <button className=" text-white  p-3 animate-pulse h-full w-full rounded-lg bg-slate-300  "></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="container w-[97%] p-2 mx-auto bg-white
               flex items-center overflow-scroll scrollbar-none  transition-all gap-2 h-auto"
              ref={scrollElement}
            >
              {products && products.length ? (
                products.map((product, index) => (
                  <Link
                    to={`/product-detail/${product._id}`}
                    key={product._id}
                    className="flex flex-col sm:flex-row z-20 gap-4 min-w-[280px] md:min-w-[320px]
                     bg-gray-100 rounded-sm shadow-md mx-3 transition-all p-2"
                  >
                    <div className="h-full min-w-[100px]  flex items-center justify-center">
                      <img
                        src={product.productImage[0]}
                        className=" h-44 sm:h-32  object-scale-down cursor-pointer hover:scale-110 "
                        alt="..."
                      />
                    </div>
                    <div className="flex items-center flex-col gap-1 md:gap-4">
                      <p className="font-semibold text-ellipsis ">
                        {product.productName}
                      </p>
                      <div className="flex gap-4 xl:flex-row sm:flex-col  flex-row">
                        <p className="text-sky-500 text-sm ">
                          {displayETBCurrency(product.sellingPrice)}
                        </p>
                        <p className="text-gray-500 line-through text-sm">
                          {displayETBCurrency(product.price)}
                        </p>
                      </div>
                      <button
                        className="bg-sky-500 w-[6rem]  mx-auto text-white rounded-md p-2 h-10 hover:bg-sky-600"
                        onClick={(ev) => {
                          addToCart(ev, product._id);
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </Link>
                ))
              ) : (
                <div> product not found </div>
              )}
            </div>
          )}
        </div>
      );
    }
