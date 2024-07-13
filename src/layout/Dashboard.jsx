import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { FaPersonRifle } from "react-icons/fa6";
import { logoutUser, monitorAuthState } from "../features/authActions";
const Dashboard = () => {
  const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);
  return (
    <div className="flex min-h-screen ">
      <div>
        <div className="w-64 h-[400px] ml-20 mt-12 rounded-md border-2 bg-gray-600 shadow-lg shadow-sky-600">
          <div className="avatar online mt-8 ml-16">
            <div className="w-32  rounded-full ">
              <img
                className="cursor-pointer"
                // onClick={gotoProfile}
                src={user?.photoURL}
              />
            </div>
          </div>
          <div className="text-white text-center mt-3  ">
            <h2 className=" font-serif">{user?.displayName}</h2>
            <h2 className=" font-serif">{user?.email}</h2>

            <p className="flex gap-3 my-2 ml-[88px]">
              <FaFacebook className=" text-white  " />
              <FaLinkedin className=" text-white  " />
              <FaGoogle className=" text-white  " />
            </p>
          </div>

          <ul className="flex gap-2 ml-9 mt-8">
            <li>
              <NavLink to="/dashboard/profile">
                <button className="btn btn-outline  text-white">
                  <FaPersonRifle className="-ml-2" />
                  Profile
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink>
                {/* <FaHome></FaHome> */}
                <button
                  onClick={handleLogout}
                  className="btn btn-outline bg-blue-600  text-white"
                >
                  Logout
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
      <div className="flex-1 p-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <div className="">
          <h1 className="text-4xl font-serif  "> Your Profile</h1>
          <div className="text-white mt-3">
            <h2>
              <span className="text-gray-400 font-bold ">Name:</span> Md Thouhid
              Hussain
            </h2>
            <h2>
              <span className=" text-gray-400 font-bold">Email: </span>
              thouhidhussain98@gmail.com
            </h2>
          </div>
          <div className="mt-4">
            <h2 className="  text-4xl mt-5 font-serif">Connect </h2>
            <p className="flex gap-3 my-1">
              <FaFacebook className=" text-white text-xl" />
              <FaLinkedin className=" text-blue-500 text-xl" />
              <FcGoogle /> 
            </p>
          </div> */
}
