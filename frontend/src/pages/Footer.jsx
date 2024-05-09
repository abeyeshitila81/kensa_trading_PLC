import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="container justify-center mx-auto py-4 text-center bg-sky-600 text-white">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center container mx-auto  py-2">
         <div className="">
          <h1 className="font-bold text-xl text-start "> Get To Know Us</h1>
          <div className="grid grid-cols-1 text-sm place-items-start">
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>About</Link>
            <Link to={"/blog"}>Blog</Link>
            <Link to={"/career"}>Careers</Link>
            <Link to={"/service"}>Service</Link>
          </div>
         </div>
         <div>
          <h1 className="font-bold text-xl text-start">Make Money with our  product</h1>
          <div className="grid grid-cols-1 text-sm place-items-start ">
            <Link >Sell products</Link>
            <Link >Sell onLine</Link>
            <Link >Become Affiliate</Link>
            <Link >Advertise Products</Link>
            <Link >Self Publish with us</Link>
          </div>
         </div>
         <div>
          <h1 className="font-bold text-xl text-start">Payment method for product</h1>
          <div className="grid grid-cols-1 text-sm place-items-start">
            <Link >By Business Card </Link>
            <Link >PayPal</Link>
            <Link >TeleBirr</Link>
            <Link >CBE Birr</Link>
            <Link >Other Bank transfer</Link>
          </div>
         </div>
         <div>
          <h1 className="font-bold text-xl text-start">Let Us Help You</h1>
          <div className="grid grid-cols-1 text-sm place-items-start">
            <Link >Your Account </Link>
            <Link >Your Order</Link>
            <Link >Shipping rate </Link>
            <Link >Assistant</Link>
            <Link >Manage your content</Link>
          </div>
         </div>
      </div>
      </footer>
  )
}
