import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseURL } from '../helper/baseURL'
import { toast } from 'react-toastify'
import { FaStar , FaStarHalf} from "react-icons/fa";

import displayETBCurrency from '../helper/displayCurrency'
import RecommendProduct from './RecommendProduct';
import AddToCart from '../helper/addToCart';
export default function ProductDetail() {
    const [product, setProduct]=useState({})
    const [singleImage, setSingleImage]=useState()
    const [loading, setLoading]=useState(false)
    const [zoomPosition, setZoomPosition]=useState({
        x:0,
        y:0
    })
    const [zoomOpen, setZoomOpen]=useState(false)
    const loadingProduct=new Array(4).fill(null)
    const startProduct=new Array(5).fill(null)
    const {id}=useParams()
    const navigate=useNavigate()
    const addToCart=AddToCart()

    const fetchData=async()=>{

        try {
            setLoading(true)
            const response=await fetch(`${baseURL}/product/product-detail/${id}`)
            const data=await response.json()
         
            if(data && data.product){
              setProduct(data.product)
              setSingleImage(data.product.productImage[0])
              setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
     fetchData()
    },[id])
    const handleMoveMouse=(ev)=>{
        setZoomOpen(true)
        const {left, top, width, height}=ev.target.getBoundingClientRect()
        
        const x=(ev.clientX-left)/width
        const y=(ev.clientY-top)/height
        setZoomPosition({x, y})
    }
    const handleAddToCart=async(ev, id)=>{
        await addToCart(ev, id)
      }
      const handleBuyAndAddToCart=async(ev, id)=>{
        await addToCart(ev, id)
        navigate("/cart")
      }
  return (
    <div> 
        <div className='flex flex-col md:flex-row gap-3 shadow-2xl  w-auto rounded-lg p-1 bg-white md:72 '> 
               <div className='h-full flex md:flex-row-reverse flex-col gap-4  '>
               <div className='h-full w-full md:w-72  min-h-72  relative'>
               {loading ? 
                    (
                            <div className='h-full w-full min-h-72  p-2  bg-slate-300 animate-pulse ' >
                            </div>
                    ) 
                    :(
                        <>
                        <img src={`${singleImage}`}  alt='...' 
                        onMouseMove={handleMoveMouse}
                        onMouseLeave={()=>setZoomOpen(false)}
                        className='w-full h-full object-scale-down mix-blend-multiply'/>
                        
                           { zoomOpen && 
                            (
                                <div className='hidden sm:block absolute bg-slate-300 w-full h-full min-w-[300px] min-h-24 -right-[310px] top-0 '>
                                <div className={`w-full h-full min-h-24 min-w-[400px] mix-blend-multiply`} style={{
                                 backgroundImage:`url("${singleImage}")`,
                                 backgroundRepeat:"no-repeat",
                                 backgroundPosition:`${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`
                                }}>
             
                                </div>
                             </div>
                            )}
                        </> 
                    )}
               
              
                </div>
                <div className='flex md:flex-col flex-row  gap-2  '>
                    {loading ? 
                    (
                        loadingProduct.map((product, index)=>(
                            <div className='h-full w-24 bg-slate-300 animate-pulse ' key={index}>

                            </div>
                        ))
                    ) 
                    :
                     (
                        product?.productImage?.map((imageUrl, index)=>(
                            <div className=' h-full w-full  bg-slate-100  ' key={imageUrl}>
                            <img src={`${imageUrl}`}  alt='...'
                            onMouseEnter={()=>setSingleImage(imageUrl)}
                            onClick={()=>setSingleImage(imageUrl)}
                             className=' sm:max-h-20 object-scale-down mix-blend-multiply'/>
                             
                            </div>
                        ))
                     )}
                </div>
                
            </div>
            {
                loading ? 
                (
                <div className='flex flex-col w-[300px] gap-6 justify-start items-center'>
                <p className=' rounded-xl px-3 bg-slate-300 animate-pulse p-1 h-full w-full'></p>
                <p className=' rounded-xl px-3 bg-slate-300 animate-pulse p-1 h-full w-full'></p>
                <div className=' flex gap-2'>
                   {startProduct.map((product, index)=>(
                       index <3 ?
                       <span className=' px-3 bg-slate-300 animate-pulse p-3 rounded-full h-full w-full'/> : 
                       <span className=' px-3 bg-slate-300 animate-pulse p-3 rounded-full h-full w-full'/>
                   ))}
                </div>
                <div className='flex w-full gap-2'>
                <p className='rounded-xl px-3 bg-slate-300 animate-pulse p-2 h-full w-full'></p>
                <p className='rounded-xl px-3 bg-slate-300 animate-pulse p-2 h-full w-full'></p>
                </div>
                <div className='flex w-full gap-2'>
                <p className='rounded-xl px-3 bg-slate-300 animate-pulse p-2 h-full w-full'></p>
                <p className='rounded-xl px-3 bg-slate-300 animate-pulse p-2 h-full w-full'></p>
                </div>
                
                <p className='rounded-xl px-3 bg-slate-300 animate-pulse  h-full w-full'></p>
               </div>
                ) :
                (
                <div className='flex flex-col gap-6 justify-start items-center'>
                    <p className='bg-sky-100 rounded-full text-slate-600 px-3'>{product.category}</p>
                    <p className=' rounded-full font-bold text-2xl px-3'>{product.productName}</p>
                    <div className='flex text-sky-500 cursor-pointer'>
                       {startProduct.map((product, index)=>(
                           index <3 ?<FaStar key={index}/> : <FaStarHalf key={index}/>
                       ))}
                    </div>
                    <div className='flex gap-2'>
                    <p className='text-sky-600 font-bold text-2xl'>{displayETBCurrency(product.sellingPrice)}</p>
                    <p className='line-through text-slate-600 font-light text-2xl'>{displayETBCurrency(product.price)}</p>
                    </div>
                    <div  className='flex gap-2'>
                       <button className='border-2 hover:border-sky-500  px-3 py-1
                        bg-white text-sky-700 hover:border-none w-24 hover:bg-sky-600 hover:px-3
                         hover:text-white rounded-md' onClick={(ev)=>handleBuyAndAddToCart(ev, product._id)}>Buy</button>
                       <button className='border-2 hover:border-sky-500  px-3 py-1
                        hover:bg-white hover:text-sky-700 w-26 hover:border-none bg-sky-600 hover:px-3
                         text-white rounded-md' onClick={(ev)=>handleAddToCart(ev, product._id)}>Add to cart</button>
                    </div>
                    <p className='text-ellipsis'>{product.description}</p>
                   </div>
                )
            }
          
        </div>
        <RecommendProduct category={product?.category} heading={"Recommended Products "}/>
    </div>
  )
}
