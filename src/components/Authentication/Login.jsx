import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, monitorAuthState } from "../../features/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email, password);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="pl-44 pt-20">
          <img
            className="w-[75%] h-[55%] "
            src="/src/images/log-boy.png"
            alt=""
          />
        </div>

        {/* Login form */}
        <div className="w-[500px] mt-8">
          <div className="absolute -ml-12 -mt-20 w-[1px] h-[510px] bg-gray-300"></div>
          <div className="-mt-20 pr-10">
            <h2 className="text-center text-gray-300 text-3xl font-normal -ml-[90px] mb-10 ">
              Welcome to Vuexy!
            </h2>
            <p className="-mt-6 mb-5 text-gray-400">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-sm font-sm text-gray-500">
                  Email
                </span>
                <br />
              </label>
              <input
                type="email"
                name="email"
                placeholder=""
                className="input border border-[#d0cbda] mb-5   rounded-md p-3 w-[375px] h-[35px]"
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
                placeholder=""
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

            <Link to="/">
              <div className=" mt-6">
                <button className="btn rounded-md mb-5  w-[375px] h-[35px] bg-[#675DD8]    text-white font-medium text-center">
                  <span className="-mt-4">Login</span>
                </button>
              </div>
            </Link>
          </form>
          <div className="-ml-6">
            <p className=" text-center text-gray-500">
              New on our platform ?
              <Link className="text-[#8A67F1] font-md ml-1" to="/signup">
                Create an account
              </Link>
            </p>
          </div>
          <div className="flex mt-10 ml-4">
            <hr className="w-40 mr-2" />
            <span className="-mt-3 mr-1 ">or</span>
            <hr className="w-40 ml-1" />
          </div>

          {/* <div className="flex gap-4 justify-center -ml-6 mt-10 items-center">
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

export default Login;
