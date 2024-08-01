import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useSelector((state) => state.app);

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg">...loading</span>
    );
  }

  const { data: watchedMovies = [], refetch } = useQuery({
    queryKey: ["watchedMovies"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/watchedmovies/profile/${user?.email}`
      );
      return res.data;
    },
  });
  console.log(watchedMovies);
  return (
    <div className="ml-4 mt-6  p-8 border-2">
      <div>
        <h2 className="text-4xl mt-1 font-serif">
          Watched Movies {watchedMovies.length}{" "}
        </h2>
        <div>
          <div className="overflow-x-auto w-[800px]">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Genre</th>
                  <th>Released Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {watchedMovies.map((movies, index) => (
                  <tr key={movies._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={movies.selectMovieOrShow.Poster}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {movies.selectMovieOrShow.Title}
                          </div>
                          <div className="text-sm opacity-50">
                            {movies.selectMovieOrShow.imdbRating}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {movies.selectMovieOrShow.Genre}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {movies.selectMovieOrShow.Director}
                      </span>
                    </td>
                    <td>{movies.selectMovieOrShow.Released}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Profile;
