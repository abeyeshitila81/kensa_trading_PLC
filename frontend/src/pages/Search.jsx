import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { baseURL } from '../helper/baseURL'
import SearchProduct from '../components/SearchProduct'
export default function Search() {
    const [products,setProducts]=useState([])
    const [loading, setLoading]=useState(false)
    const query=useLocation()
    const fetchData=async()=>{
        setLoading(true)
        try {
            const response=await fetch(`${baseURL}/product/search${query.search}`)
            const data=await response.json()
            if(data && data.products){
                setProducts(data.products)
            }
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchData()
    },[query])
    console.log(products)
  return (
    <div>
        {/* product not Found */}
        {
            products.length===0 && !loading &&  (
                <div className='w-full py-2 bg-white text-center px-2 mx-auto'>
                    <h2> No Data</h2>
                </div>
            )
        }
        {/* product found Loading */}
       <p>Search length {products.length}</p>
        {
            products.length!==0 && loading &&  (
                <div className='w-full py-2 bg-white text-center px-2 mx-auto'>
                    <h2>Loading ...</h2>
                </div>
            )
        }
        {/* product display */}
        <SearchProduct products={products} loading={loading}/>
    </div>
  )
}
