import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { monitorAuthState } from "../../features/authActions";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Tflix</div>
      </Link>

      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="text-center rounded-md bg-gray-800"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      {user ? (
        <div>
          <div className="avatar online mt-2">
            <div className="w-12 rounded-full ">
              <Link to="/dashboard/profile">
                <img className="cursor-pointer" src={user.photoURL} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="avatar offline -mt-3">
          <div className="w-9 rounded-full">
            <img
              className=" "
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
          <Link to="/login">
            <button className="absolute -ml-[40px] mt-8 font-semibold">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
