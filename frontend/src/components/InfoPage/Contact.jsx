import React from 'react'
import { CgMail } from "react-icons/cg";
import { FaPhone } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
export default function Contact() {
  return (
    <section className='w-3/4 mx-auto'>
      <div className='text-center'>
         <h1 > Contact us</h1>
         <p>Complete the form to contact us</p>
      </div>
      <div className=' md:w-[70%] mt-10 mx-auto flex xl:flex-row flex-col gap-3 items-center justify-between'>
        <div className=' grid grid-cols-1 gap-5'>
         <h2 className='font-bold text-2xl'> Info</h2>
         <div className='flex items-center text-gray-500 gap-3'> <FaPhone/> <p>0912454441</p></div>
         <div className='flex items-center text-gray-500 gap-3'> <FaPhone/> <p>0911918316</p></div>
                    <div className='flex items-center text-gray-500 gap-3'> <CgMail/> <p>alexitemesgen@gmail.com</p></div>
           <div className='flex items-center text-gray-500 gap-3'> <CiLocationOn/> <p>Addis Ababa , Ethiopia, Tefera building 2nd flor</p></div>
        </div>
        <form className='shadow-lg px-3 py-5 ml-3 bg-white rounded-md'>
          <div className=' items-center flex md:flex-row flex-col justify-between gap-3 '>
            <input type='text' name='name'placeholder='Enter Your Name'
           className='border-none  bg-slate-100 text-black focus:outline-1 outline-sky-400 px-3 py-1 '  />
            <input type='email' name='email'placeholder='Enter Your Email'
           className='border-none  bg-slate-100 text-black focus:outline-1 outline-sky-400 px-3 py-1 ' />
          </div>
          <div className='flex my-2 items-center'>
          <input  name='subject'placeholder='Enter Your Subject'
          className='border-none  bg-slate-100 text-black focus:outline-1 outline-sky-400 px-3 py-1'/>
          </div>
          <div className='flex items-center my-2'>
            <textarea   cols={30} placeholder='Description' className=' resize-none border-none w-full bg-slate-100 text-black focus:outline-1 outline-sky-400 px-2 py-1'>
            </textarea>
          </div>
          <button className='bg-sky-500 text-white px-3 py-2 hover:bg-sky-700 rounded-md'> Send Message</button>
        </form>
      </div>
    </section>
  )
}
