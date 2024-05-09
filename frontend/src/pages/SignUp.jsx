import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { FaImage, FaRegEye, FaEyeSlash, FaEye, FaCloudUploadAlt } from "react-icons/fa";
import { MdConfirmationNumber } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { useGlobalContent } from "../useContext/useContext";
import { baseURL } from "../helper/baseURL";
import { uploadImage } from "../helper/baseURL";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { Login } = useContext(useGlobalContent);
  const navigate = useNavigate();
  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    if (isLogin) {
      const { email, password } = data;
     
      const response = await fetch(`${baseURL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (result && result.existUser) {
        Login(result);
        toast.success(result.msg);
        console.log("login successfully");
        navigate("/");
      } else {
        toast.error(result.msg);
      }
    } else {
      if (data.password === data.confirmPassword) {
        const response = await fetch(`${baseURL}/user/sign-up`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result && result.newUser) {
          console.log("sign up successfully");
          toast.success(result.msg);
          setIsLogin(true);
         
        }
      } else {
        toast.error(result.msg);
        console.log("password not match");
      }
    }
  };
  const handleImage = async (ev) => {
    try {
      const file = ev.target.files[0];
      const uploadImageFromCloud = await uploadImage(file);
      console.log("Uploaded image URL:", uploadImageFromCloud.url);
      setData((prev) => ({
        ...prev,
        image: uploadImageFromCloud.url,
      }));
      console.log("data.image", data.image)
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };
  useEffect(() => {
    console.log("Updated data.image:", data.image);
  }, [data.image]);
  return (
    <div className="my-10">
      <div className="w-[21rem] mx-auto bg-slate-400  py-6 px-2 rounded">
        <form className="gap-10" onSubmit={handleOnSubmit}>
          {!isLogin && (
            <>
              <div className="flex items-center text-xl  bg-white rounded my-5">
                <label className="text-3xl pr-2 text-sky-500">
                  <FaImage />
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(ev) => handleImage(ev)}
                  placeholder="Enter Your image"
                  className="  outline-none focus:outline pl-2 border-l-2"
                />
              </div>
              <div className="flex items-center text-xl  bg-white rounded  my-5">
                <label className="text-3xl pr-2 text-sky-500">
                  <CiUser />
                </label>
                <input
                  type="text"
                  value={data.name}
                  name="name"
                  onChange={handleOnChange}
                  placeholder="Enter Your Name"
                  className="  outline-none focus:outline pl-2 border-l-2"
                />
              </div>
            </>
          )}
          <div className="flex items-center text-xl  bg-white rounded  my-5">
            <label className="text-3xl pr-2 text-sky-500">
              <MdEmail />
            </label>
            <input
              type="email"
              value={data.email}
              name="email"
              onChange={handleOnChange}
              placeholder="Enter Your Email"
              className="  outline-none focus:outline pl-2 border-l-2"
            />
          </div>
          <div className="flex items-center text-xl  bg-white rounded  my-5">
            <label className="text-3xl pr-2 text-sky-500">
              <RiLockPasswordFill />
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={data.password}
              name="password"
              onChange={handleOnChange}
              placeholder="Enter Your password"
              className="  outline-none focus:outline pl-2 border-l-2"
            />
            <span
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {!isLogin && (
            <div className="flex items-center text-xl  bg-white rounded  my-5">
              <label className="text-3xl pr-2 text-sky-500">
                <MdConfirmationNumber />
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleOnChange}
                placeholder="Enter Your confirm password"
                className="  outline-none focus:outline pl-2 border-l-2"
              />
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
          <Link
            to="/forget-password"
            className=" w-full text-right hover:underline hover:text-sky-900 block"
          >
            {" "}
            forget password
          </Link>
          <div className="flex gap-3 my-4">
            <p>
              {" "}
              {isLogin
                ? " Already have an account"
                : "Don't have an account"}{" "}
            </p>
            <button className="bg-sky-500 text-white px-3 py-1 hover:bg-sky-600 rounded-full">
              sign {isLogin ? "In" : " Up"}
            </button>
          </div>
        </form>
        <div className=" flex gap-5">
          <p>
            {" "}
            {isLogin ? "Don't have an account" : "Already have an account"}{" "}
          </p>{" "}
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-sky-600 underline hover:font-bold"
          >
            {" "}
            sign {isLogin ? "Up" : " In"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
