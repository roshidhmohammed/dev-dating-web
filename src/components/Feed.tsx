import { useSelector } from "react-redux";
import useFetchFeed from "../hooks/useFetchFeed";
import UserCard from "./UserCard";
import type { RootState } from "../utils/store";
import type { UserData } from "../types";

const Feed = () => {
  useFetchFeed();
  const users = useSelector((store:RootState):UserData[] |null => store?.feed);

  console.log(users)

  if (!users) return;

  if (users?.length === 0)
    return (
      <h1 className=" font-bold text-center text-white pt-40">
        No connections found
      </h1>
    );
  return (
    <div className="  flex justify-center items-center py-20">

      <UserCard user={users[0]} />
    </div>
  );
};

export default Feed;
