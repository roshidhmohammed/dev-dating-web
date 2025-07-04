import { useEffect } from "react";
import { axiosInstance } from "../utils/apis/axiosInstance";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/slices/feedSlice";
import { toast } from "sonner";

const useFetchFeed = () => {
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    await axiosInstance
      .get("user/feed", { withCredentials: true })
      .then((res) => {
        dispatch(addUsers(res.data));
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  useEffect(() => {
    fetchFeedData();
  }, []);
};

export default useFetchFeed;
