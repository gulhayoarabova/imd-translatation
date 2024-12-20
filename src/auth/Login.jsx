/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { instance, setAuthToken } from "../api/api.instance.js";
import store from "../store/store.jsx";
import { useNavigate } from "react-router";
const Login = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { superuser, setSuperuser, setToken , fetchUser } = store();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((pre) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    instance
      .post("auth/login", data)
      .then((res) => {
        setToken(res.data?.token);
        setSuperuser(res.data?.is_superuser);
        console.log(res.data);
        fetchUser()
        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (

    <div class="flex h-screen items-center ">
      {/* <!-- Left Pane --> */}
      
      <div class="w-[100%] lr:w-[50%] bg-gradient-to-b from-[#f9ffff] via-[#c4ecef]  to-[#46c4be] h-[100vh] lg:w-[60%] flex items-center justify-center  ">
        <div className="w-[90%] md:w-[55%]">

          <form onSubmit={handleSubmit} class="space-y-6 ">

            <div className="bg-white py-6 px-5 space-y-7 rounded-[15px] border border-[transparent]  ring-8 ring-gray-50/50 ring-opacity-50">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-[16px] font-medium text-gray-700">
                  Foydalanuvchi nomi
                </label>
                <div className="relative">
                  <i
                    className="fa-regular fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-[15px]"
                    style={{ color: "#000000" }}
                  ></i>
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => handleChange(e)}
                    required
                    name="username"
                    className="bg-[#f1f5f9] text-[15px] mt-1 pl-10 p-2 w-full border-gray-50 rounded-[10px] focus:border-[1px] focus:border-[#3bd4cc] focus:outline-none focus:ring-4 focus:ring-[#bffcf9]/50 transition-colors duration-300"
                  />
                </div>
              </div>



            </div>
            <div className="bg-white py-6 px-5 space-y-7 rounded-[15px] border border-[transparent]  ring-8 ring-gray-50/50 ring-opacity-50">
             <div className="space-y-2">
                <label htmlFor="password" className="block text-[16px] font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <i
                    className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: "#000000" }}
                  ></i>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => handleChange(e)}
                    required
                    name="password"
                    className="bg-[#f1f5f9] text-[15px] mt-1 pl-10 p-2 w-full border-gray-50 rounded-[10px] focus:border-[1px] focus:border-[#3bd4cc] focus:outline-none focus:ring-4 focus:ring-[#bffcf9]/50 transition-colors duration-300"
                  />
                </div>
              </div>
             </div>


            <div className="flex justify-center ">
              <button type="submit" 
             className="w-full text-[18px] text-[#e45156] bg-[#fae2e3] flex gap-3 font-[500] justify-center items-center py-3.5 px-6 text-sm  border-[1.5px] rounded-[10px] ring-8 ring-[#fae2e3]/50 hover:cursor-pointer  transition-all duration-600 ease-in-out  group-hover:cursor:pointer">

                {!loading ? "Kirish" : "Yuklanmoqda"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div class="hidden lg:flex items-center  justify-center flex-1 ">
          <div class="w-[70%] text-center">
          {/* <iframe className="w-[100%] h-[100vh]" src="https://lottie.host/embed/5591d7a5-eef6-4c54-b7ec-d1263ddd8467/2BbKMd0BWd.lottie"></iframe> */}
          <iframe className="w-[100%] h-[100vh]" src="https://lottie.host/embed/a5c165ef-72c3-40e8-bbab-0b83576e8316/K70fAGkpBo.lottie"></iframe>
          </div>
        </div>

    </div>

  );
};



export default Login;
