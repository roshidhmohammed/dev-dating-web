import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/apis/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/slices/userSlice";
import { useEffect } from "react";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    await axiosInstance
      .get("profile/view", { withCredentials: true })
      .then((res) => {
        dispatch(addUser(res.data));
      })
      .catch((error) => {
        if (error.status === 401) {
          dispatch(addUser(null));
          navigate("/auth/login");
        }
      });
  };

  useEffect(() => {
    fetchUser();
  });
  return (
    <div className="  flex justify-between items-center  flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
