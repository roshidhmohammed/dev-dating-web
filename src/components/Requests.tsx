import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/slices/requestsSlice";
import { axiosInstance } from "../utils/apis/axiosInstance";
import { toast } from "sonner";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    await axiosInstance
      .get(`user/connection/received`, { withCredentials: true })
      .then((res) => {
        dispatch(addRequests(res.data.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(removeRequests());
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status: string, requestId: string) => {
    await axiosInstance
      .post(
        `request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        fetchRequests();
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  if (!requests) return;
  if (requests?.length === 0)
    return (
      <h1 className=" font-bold text-center text-white pt-40">
        No requests found
      </h1>
    );

  return (
    <div className="mt-20">
      <h1 className=" text-center mb-5 text-2xl font-bold">Requests</h1>
      <div className=" flex justify-start flex-col items-center gap-5">
        {requests?.map((request) => (
          <div
            key={request.senderId._id}
            className="bg-base-200 p-3 md:w-1/3 w-full rounded-lg flex j items-center gap-3 relative"
          >
            <img
              src={request?.senderId.profilePic}
              alt=""
              className=" h-20 w-20 rounded-full"
            />
            <div className="">
              <div className=" flex gap-1 justify-between w-full">
                <div className=" ">
                  <div className=" flex gap-2">
                    <h1>{request.senderId.firstName}</h1>
                    <h1>{request.senderId.lastName}</h1>
                  </div>
                  <div className=" flex gap-2 ">
                    <h1>{request?.senderId.age},</h1>
                    <h1>{request?.senderId.gender}</h1>
                  </div>
                </div>
                <div className="absolute right-3 flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("accepted", request?._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("rejected", request?._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
