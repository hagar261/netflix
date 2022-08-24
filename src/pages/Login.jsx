import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'


const Login = ({getUserData}) => {

  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let[errorList,setErrorList]=useState([]);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });


  const getUser = (e) => {
    let myUser = { ...user }; // spread operator
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(myUser);
  };

  const validateForm = () => {
    const schema = Joi.object({
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })  
    return schema.validate(user , {abortEarly:false});
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let validationResult = validateForm();
    console.log(validationResult);

    if(validationResult.error){

      setErrorList(validationResult.error.details)

    }else{

      setLoading(validationResult.error);

      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message === "success") {
      
        var token = data.token;
        localStorage.setItem('token' , token);
        getUserData();
        navigate("/");
        setLoading(false);

      } else {
        setError(data.message);
        setLoading(false);
      }
      console.log(data);
    }
  };


  return (
    <>
    <div className="w-full h-screen">
    <img
      className="hidden sm:block absolute w-full object-cover"
      src="https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/5465b2b8-e9b3-411d-80f9-d5839f259e05/EG-en-20220801-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      alt="/"
    />
    <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
    <div className="fixed w-full px-4 py-24 z-50">
      <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
        <div className="max-w-[320px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <form onSubmit={submitForm} className="w-full flex flex-col py-4">
          {errorList.map((error,index)=><li key={index} className='bg-red-100 border border-red-400 text-red-400 px-4 py-1 rounded relative' >{error.message}</li>)}
          {error ? (
            <div
              class="bg-red-100 border border-red-400 text-red-400 px-4 py-1 rounded relative"
              role="alert"
            >
              <strong class="font-bold">{error}</strong>
            </div>
          ) : (
            ""
          )}
            <input
            onChange={getUser}
            name="email"
              className="p-3 my-2 bg-gray-700 rounded"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            
            <input
              onChange={getUser}
              name="password"
              className="p-3 my-2 bg-gray-700 rounded"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            
            <button className="bg-red-600 py-3 my-6 rounded font-bold">
            {loading ? (
              <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            ) : (
              "Sign In"
            )}
            </button>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>
                <input className="mr-2" type="checkbox" />
                Remember me
              </p>
              <p>Need Help?</p>
            </div>
            <p className="py-8">
              <span className="text-gray-600">New to Netflix?</span>{" "}
              <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </div>
    </>
  )
};

export default Login;
