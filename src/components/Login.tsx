// Form handling and validation
import { useForm } from "react-hook-form";

// Typescript
import type { LoginFormData } from "../types";

// api
import { axiosInstance } from "../utils/apis/axiosInstance";

// React Icons
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux"

// React sonner for alert
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/slices/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate()

  const handleLogin = async (data: LoginFormData) => {
    await axiosInstance
      .post(
        "login",
        { emailId: data.emailId, password: data.password },
        { withCredentials: true }
      )
      .then((res) => {
        navigate("/")
        dispatch(addUser(res.data.data))
        toast.success(res.data.message);
      })
      .catch((error) => { 
        toast.error(error.response.data);
      });
  };

  // useEffect(()=>{
  //   return ()=>{
  //   setTimeout(()=>{
  //       toast.dismiss()
  //   }, 1000)
  //   }
  // })

  return (
    <div className=" flex  justify-center flex-col items-center h-screen">
      <div className="card bg-primary text-primary-content sm:w-96 ">
        <div className="card-body ">
          <h2 className="card-title flex justify-center text-2xl mb-3">
            Login
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className=" flex flex-col gap-2 mb-5 ">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Email</legend>
                <input
                  {...register("emailId", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter the valid email",
                    },
                  })}
                  type="text"
                  className="input"
                  placeholder="Enter your email"
                />
                <p className=" text-red-700 font-bold ">
                  {errors?.emailId?.message}
                </p>
              </fieldset>

              <fieldset className="fieldset relative">
                <legend className="fieldset-legend text-lg">Password</legend>
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Enter the password"
                />
                {!showPassword ? (
                  <FaLock
                    className=" absolute right-6 top-4 text-gray-100 cursor-pointer "
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaUnlock
                    className=" absolute right-6 top-4 text-gray-100 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
                <p className=" text-red-700 font-bold ">
                  {errors?.password?.message}
                </p>
              </fieldset>
            </div>
            <div className="card-actions justify-center">
              <button type="submit" className="btn px-5">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
