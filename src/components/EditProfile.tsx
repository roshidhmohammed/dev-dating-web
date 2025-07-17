import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/apis/axiosInstance";
import { RiEditFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "sonner";
import type { RootState } from "../utils/store";
import type { UserData } from "../types/types";
// import  User  from "../types";

const EditProfile = () => {
  const user = useSelector((store:RootState):UserData | null => store.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>();

  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      profilePic: user?.profilePic,
      age: user?.age,
      gender: user?.gender,
    });
  }, [user]);

  const saveProfile = async (data:UserData) => {
    console.log(data);
    await axiosInstance
      .patch(
        "profle/edit",
        {
          firstName: data?.firstName,
          lastName: data?.lastName,
          age: data?.age,
          // profilePic:data?.profilePic,
          gender: data?.gender,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card w-96 bg-base-300 shadow-sm">
      <div className="card-body">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold">Edit Profile</h2>
        </div>
        <div className="avatar mt-5 relative">
          <div className="w-full rounded">
            <img src={user?.profilePic} />
          </div>
          <div className=" absolute bottom-1 z-50 right-1 bg-white p-2 rounded-md hover:bg-gray-200 hover:cursor-pointer">
            <RiEditFill className=" text-2xl  text-black  " />
          </div>
        </div>
        <form
          className=" mt-5 flex flex-col gap-4"
          onSubmit={handleSubmit(saveProfile)}
        >
          <div className=" flex flex-col">
            <label>First Name</label>
            <input
              {...register("firstName", {
                required: "First Name is required",
                minLength: {
                  value: 3,
                  message: "Please enter the valid first name",
                },
              })}
              name="firstName"
              type="text"
              placeholder="Enter Your First Name"
              className="input input-lg input-accent mt-2"
            />
            <p className=" text-red-700 font-bold ">
              {errors?.firstName?.message}
            </p>
          </div>
          <div className=" flex flex-col">
            <label>Last Name</label>
            <input
              {...register("lastName", {
                required: "Last Name is required",
                minLength: {
                  value: 2,
                  message: "Please enter the valid last name",
                },
              })}
              type="text"
              placeholder="Enter Your Last Name"
              className="input input-lg input-accent mt-2"
            />
            <p className=" text-red-700 font-bold ">
              {errors?.lastName?.message}
            </p>
          </div>

          <div className=" flex flex-col">
            <label>Age</label>
            <input
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "Age should be greater than 18",
                },
              })}
              type="number"
              placeholder="Enter Your age"
              className="input input-lg input-accent mt-2"
            />
            <p className=" text-red-700 font-bold ">{errors?.age?.message}</p>
          </div>

          <div className=" flex flex-col">
            <label>Gender</label>
            <select
              {...register("gender", {
                required: "Gender is required",
              })}
              defaultValue="Color scheme"
              className="select select-accent mt-2 select-lg"
            >
              <option>{user?.gender}</option>
              {user?.gender === "male" ? (
                <option value={"female"}>Female</option>
              ) : (
                <option value={"male"}>male</option>
              )}
            </select>
            <p className=" text-red-700 font-bold ">
              {errors?.gender?.message}
            </p>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary btn-block">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
