import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";
import { createUser } from "../../features/authActions";

const SignUp = () => {
  const [displayName, setdisplayName] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email, password, displayName, photoURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email, password, displayName, photoURL);
    dispatch(createUser(email, password, displayName, photoURL));
    e.target.reset();
    navigate("/");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="pl-44 pt-20">
          <img
            className="w-[75%] h-[55%] "
            src="/src/images/r-girl.png"
            alt=""
          />
        </div>

        {/* Register form */}
        <div className="w-[500px] ">
          <div className="absolute -ml-12 -mt-28 w-[1px] h-[710px] bg-gray-300"></div>
          <div className=" pr-10">
            <h2 className="text-center text-gray-400 text-3xl font-normal -ml-[44px] mb-10 ">
              Adventure starts here
            </h2>
            <p className="-mt-6 -ml-2 mb-5 text-gray-400">
              Make your time entertaining and fun!
            </p>
          </div>

          <form className="-ml-2" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text -mb-6  text-sm font-sm text-gray-500">
                  Name
                </span>
              </label>
              <br />
              <input
                type="text"
                name="displayName"
                placeholder=" "
                className="input border mb-5  border-[#d0cbda] rounded-md p-3 w-[375px] h-[35px]"
                required
                onChange={(e) => setdisplayName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text -mb-6  text-sm font-sm text-gray-500">
                  photoURL
                </span>
              </label>
              <br />
              <input
                type="text"
                name="photoURL"
                placeholder=" "
                className="input border mb-5  border-[#d0cbda] rounded-md p-3 w-[375px] h-[35px]"
                required
                onChange={(e) => setphotoURL(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text -mb-6  text-sm font-sm text-gray-500">
                  Email
                </span>
              </label>
              <br />
              <input
                type="email"
                name="email"
                placeholder=" "
                className="input border mb-5  border-[#d0cbda] rounded-md p-3 w-[375px] h-[35px]"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="">
              <label className="label">
                <span className="label-text text-sm font-sm text-gray-500">
                  Password
                </span>
                <br />
              </label>
              <input
                type="password"
                name="password"
                placeholder=" "
                className="input border border-[#d0cbda] rounded-md mb-5 p-3 w-[375px] h-[35px]"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-[#8A67F1]"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* <Link to='/login'> */}
            <div className=" mt-6">
              {/* <Link to="/"> */}
              <button className="btn rounded-md mb-5  w-[375px] h-[35px] bg-[#675DD8]    text-white font-medium text-center">
                Sign Up
              </button>
              {/* </Link> */}
            </div>
          </form>
          <div className="-ml-6">
            <p className=" text-center text-gray-500">
              Have an account ?
              <Link className="text-[#8A67F1] font-md ml-1" to="/">
                Login
              </Link>
            </p>
          </div>
          <div className="flex mt-10 ml-1">
            <hr className="w-40 mr-2" />
            <span className="-mt-3 mr-1 ">or</span>
            <hr className="w-40 ml-1" />
          </div>

          {/* <div className="flex gap-4 justify-center -ml-8 mt-10 items-center">
            <FaFacebook className="text-blue-500 text-xl" />
            <FaTwitter className="text-sky-500 text-xl" />
            <FaLinkedin className="text-blue-700 text-xl" />
            <FaGoogle className="text-red-500 text-xl" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
