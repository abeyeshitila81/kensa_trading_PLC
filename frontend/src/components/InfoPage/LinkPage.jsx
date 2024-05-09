import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import Backdrop from './Backdrop';

export default function LinkPage() {
  const [isOpen, setIsOpen] = useState(false);

  const openBackdrop = () => {
    setIsOpen(true); // Open the backdrop
  };

  const closeBackdrop = () => {
    setIsOpen(false); // Close the backdrop
  };

  return (
    <div>
      {isOpen && <Backdrop onClose={closeBackdrop} />}

      <div className='flex item-center w-[80%] text-white mx-auto gap-4 py-1'>
        <button className='flex items-center gap-2' onClick={openBackdrop}>
          <RxHamburgerMenu className='text-3xl'/> <span className='md:inline hidden' >All In One</span>
        </button>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/customer-service"}>Customer service</Link>
        <Link>More Info</Link>
      </div>
    </div>
  );
}
