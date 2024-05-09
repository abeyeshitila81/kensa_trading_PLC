import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helper/baseURL"
import { toast } from "react-toastify";
export const useGlobalContent = createContext();
let LogoutTimer;
function GlobalContext({ children }) {
  const [tokenExpiredTime, setTokenExpiredTime] = useState();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [countProduct, setCountProduct]=useState(0)
  const navigate = useNavigate();
  const Login = useCallback((result, expiredToken) => {
    setUser(result?.existUser);
    setToken(result?.token);
    const tokenExpiredDated =
      expiredToken instanceof Date
        ? expiredToken
        : new Date(new Date().getTime() + 1000 *60*60*12);
    setTokenExpiredTime(tokenExpiredDated);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        result: result,
        expiration: tokenExpiredDated.toISOString(),
      })
    );
  }, []);
  const Logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };
  useEffect(() => {
    const userData = localStorage.getItem("userData") || "";

    if (userData) {
      const userDataParse = JSON.parse(userData);
      Login(userDataParse.result, userDataParse.expiration);
    } else {
      return;
    }
  }, [Login]);
  useEffect(() => {
    if (token && tokenExpiredTime) {
      const remainTime = tokenExpiredTime?.getTime() - new Date().getTime();
      LogoutTimer = setTimeout(Logout, remainTime);
    } else {
      clearTimeout(LogoutTimer);
    }
  }, [token, tokenExpiredTime, Logout]);

  const fetchDataCount=async(token)=>{
   
    try {
      const response=await fetch(`${baseURL}/cart/count-product`,
  {
      method:"GET",
      headers:{
        Authorization: "Bearer "+ token,
      "Content-Type": "application/json",},
  })
  const data=await response?.json()
  if(data && data?.count){
      setCountProduct(data.count)
     
  }
  } catch (error) {
      console.log(error.message)
      toast.error(error.message)
  }
  
   
      
    
}
  return (
    <useGlobalContent.Provider value={{ Login, Logout, user, token ,countProduct, fetchDataCount}}>
      {children}
    </useGlobalContent.Provider>
  );
}

export default GlobalContext;
