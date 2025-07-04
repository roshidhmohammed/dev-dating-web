import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/apis/axiosInstance";
import { removeUser } from "../../utils/slices/userSlice";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch()
  const navigate= useNavigate()

  const handleLogout = async() =>{
    await axiosInstance.post("logout", {}, {withCredentials:true})
    .then((res)=>{
      dispatch(removeUser())
      toast.success(res.data)
      navigate("/login")
    })
    .catch((error)=>{
      toast.error(error.response.data)
    })
  }
  return (
    <div className="navbar bg-neutral shadow-sm fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Dev Dating</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end mx-5">
        {/* <a className="btn rounded-full">Profile</a> */}
        {/* {user?.profilePic ? (
 <Link to="/profile">


   <img src={user?.profilePic} alt="" className="h-10 w-10 rounded-full hover:cursor-pointer" />
 </Link>
    ) :(
      <Link to="/profile">
      
<CgProfile className=" text-3xl hover:cursor-pointer"/>
      </Link>

    )} */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt=""
                  className="h-10 w-10 rounded-full hover:cursor-pointer"
                />
              ) : (
                <CgProfile className=" text-3xl hover:cursor-pointer" />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between flex">
              
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
             <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li onClick={()=> handleLogout()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
