import { useSelector } from "react-redux"
import useFetchFeed from "../hooks/useFetchFeed"
import UserCard from "./UserCard"
import type { User } from "../types"

const Feed = () => {
  useFetchFeed()
  const users:User[]  =useSelector(store => store?.feed)
  return (
  <div className="pt-20 flex justify-center gap-2  items-  ">
    {users?.map((user)=>
    (

    <UserCard user={user}/>
    ))}
  </div>
  )
}

export default Feed