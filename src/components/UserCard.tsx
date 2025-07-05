import { useDispatch } from "react-redux";
import type { User } from "../types";
import { axiosInstance } from "../utils/apis/axiosInstance";
import { removeUserFromFeed } from "../utils/slices/feedSlice";
import { toast } from "sonner";

const UserCard = ({ user }: User) => {
  const { _id, firstName, lastName, profilePic, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleRequest = async (status: string, userId: string) => {
    await axiosInstance
      .post(`request/send/${status}/${userId}`, {}, { withCredentials: true })
      .then(() => {
        dispatch(removeUserFromFeed(userId));
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  return (
    <div className="card bg-base-200 shadow-sm">
      <figure>
        <img src={profilePic} alt="profile" className="h-full w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <h2 className="card-title">{age + ", " + gender}</h2>}
        <p>{about}</p>
        <div className="card-actions justify-center gap-5">
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignored
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
