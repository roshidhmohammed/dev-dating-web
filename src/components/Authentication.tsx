// Form handling and validation
import { useForm } from "react-hook-form";

// Typescript
import type { AuthData } from "../types";

// api
import { axiosInstance } from "../utils/apis/axiosInstance";

// React Icons
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { useDispatch } from "react-redux";

// React sonner for alert
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addUser } from "../utils/slices/userSlice";
import { useState } from "react";

const Authentication = () => {
  const { name } = useParams();
  console.log(name);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();
  const navigate = useNavigate();

  const handleLogin = async (data: AuthData) => {
    if (name === "login") {
      await axiosInstance
        .post(
          "login",
          { emailId: data.emailId, password: data.password },
          { withCredentials: true }
        )
        .then((res) => {
          navigate("/");
          dispatch(addUser(res.data.data));
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    } else {
      await axiosInstance
        .post(
          "sign-up",
          {
            firstName: data.firstName,
            lastName: data?.lastName,
            emailId: data.emailId,
            password: data.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          dispatch(addUser(res.data.data));
          navigate("/profile");
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  };

  return (
    <div className=" flex  justify-center flex-col items-center h-screen">
      <div className="card bg-primary text-primary-content sm:w-96 ">
        <div className="card-body ">
          <h2 className="card-title flex justify-center text-2xl mb-3">
            {name === "login" ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className=" flex flex-col gap-2 mb-5 ">
              {name === "register" && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">
                      First Name
                    </legend>
                    <input
                      {...register("firstName", {
                        required: "First Name is required",
                        minLength: {
                          value: 2,
                          message: "Please enter the valid first name",
                        },
                      })}
                      type="text"
                      className="input"
                      placeholder="Enter your first name"
                    />
                    <p className=" text-red-700 font-bold ">
                      {errors?.firstName?.message}
                    </p>
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">
                      Last Name
                    </legend>
                    <input
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                      type="text"
                      className="input"
                      placeholder="Enter your last name"
                    />
                    <p className=" text-red-700 font-bold ">
                      {errors?.lastName?.message}
                    </p>
                  </fieldset>
                </>
              )}

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
                {name === "login" ? "Login" : "Register"}
              </button>
            </div>

            <div>
              {name === "login" ? (
                <div className=" mt-3 ">
                  <p className=" text-center">
                    Create an account
                    <Link to="/auth/register">
                      <span className=" underline cursor-pointer ml-2 font-bold">
                        Register
                      </span>
                    </Link>
                  </p>
                </div>
              ) : (
                <div className=" mt-3 ">
                  <p className=" text-center">
                    Already a user?
                    <Link to="/auth/login">
                      <span className=" underline cursor-pointer ml-2 font-bold">
                        Login
                      </span>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
