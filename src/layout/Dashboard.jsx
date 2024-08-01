import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaArrowUp,
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaList,
  FaUpload,
  FaUser,
} from "react-icons/fa";
import { FaPersonRifle } from "react-icons/fa6";
import { logoutUser, monitorAuthState } from "../features/authActions";
import useAdmin from "../hooks/useAdmin";
const Dashboard = () => {
  const { user } = useSelector((state) => state.app);
  const [isAdmin] = useAdmin();
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
      {isAdmin ? (
        <div>
          <div className="w-64 h-[400px] ml-20 mt-12 rounded-md border-2 bg-gray-600 shadow-lg shadow-sky-600">
            <div className="avatar online mt-8 ml-16">
              <div className="w-32  rounded-full ">
                <img className="cursor-pointer" src={user?.photoURL} />
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
                <NavLink to="/dashboard/admin/allusers">
                  <button className="btn btn-outline  text-white">
                    <FaPersonRifle className="-ml-2" />
                    Profile
                  </button>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline bg-gray-800  text-white"
                  >
                    <FaArrowUp className="-ml-2" /> Logout
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      ) : (
        <div>
          <div className="w-64 h-[400px] ml-20 mt-12 rounded-md border-2 bg-gray-600 shadow-lg shadow-sky-600">
            <div className="avatar online mt-8 ml-16">
              <div className="w-32  rounded-full ">
                <img className="cursor-pointer" src={user?.photoURL} />
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
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline bg-gray-800  text-white"
                  >
                    <FaArrowUp className="-ml-2" /> Logout
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
      )}

      <div className="flex-1 p-6">
        {isAdmin ? (
          <div>
            <NavLink to="/dashboard/admin/allusers">
              <button className="btn btn-outline shadow-md shadow-sky-600 rounded-none mt-6 ml-4 text-white">
                <FaUser /> All Users
              </button>
            </NavLink>
            <NavLink to="/dashboard/admin/primiumusers">
              <button className="btn btn-outline rounded-none shadow-md shadow-sky-600 mt-6 ml-4 text-white">
                <FaUser />
                Premium Users
              </button>
            </NavLink>
            <NavLink to="/dashboard/admin/movieslist">
              <button className="btn btn-outline rounded-none shadow-md shadow-sky-600 mt-6 ml-4 text-white">
                <FaList /> Movies List
              </button>
            </NavLink>
            <NavLink to="/dashboard/admin/addmovies">
              <button className="btn btn-outline rounded-none shadow-md shadow-sky-600 mt-6 ml-4 text-white">
                <FaUpload /> Upload movies
              </button>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/dashboard/profile">
              <button className="btn btn-outline rounded-none shadow-md shadow-sky-600 mt-6 ml-4 text-white">
                History
              </button>
            </NavLink>
            <NavLink to="/dashboard/profile/likedmovies">
              <button className="btn btn-outline rounded-none shadow-md shadow-sky-600 mt-6 ml-4 text-white">
                Liked movies
              </button>
            </NavLink>
            <NavLink to="/dashboard/profile/latestmovies">
              <button className="btn btn-outline rounded-none shadow-md shadow-sky-600 mt-6 ml-4 text-white">
                Latest movies
              </button>
            </NavLink>
          </div>
        )}

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
