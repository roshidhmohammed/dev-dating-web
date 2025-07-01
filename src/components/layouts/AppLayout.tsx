import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/apis/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/slices/userSlice";
import { useEffect } from "react";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    await axiosInstance
      .get("profile/view", { withCredentials: true })
      .then((res) => {
        dispatch(addUser(res.data));
      })
      .catch((error) => {
        if (error.status === 401) {
          dispatch(addUser(null));
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchUser();
  });
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
