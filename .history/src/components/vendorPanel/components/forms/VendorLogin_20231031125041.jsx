/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiFillPhone } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../Baseurl";

const VendorLogin = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${Baseurl}api/v1/login`, {
        phone,
        password,
      });
      localStorage.setItem("token", data.token);

      showMsg("Success", "Welcome Admin", "success");
      setLoading(false);
      navigate("/vendorDashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#242424]">
        <form
          className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-[#444444] p-5 md:py-10 "
          onSubmit={submitHandler}
        >
          <p className="text-3xl text-[#fff]"> Admin Panel </p>
          <section className="py-7 space-y-6">
            {/* Email */}
            <form onSubmit={submitHandler}></form>
          
  
          </section>
        </form>
      </div>
    </>
  );
};

export default VendorLogin;
