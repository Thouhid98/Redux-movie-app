import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Allusers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: totalusers = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["totalusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allusers");
      return res.data;
    },
  });

  // console.log(totalusers);

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        // Swal.fire({
        //   title: "Make Admin Successfull!",
        //   text: `${user.name} is an Admin Now`,
        //   icon: "success",
        //   timer: 2500,
        // });
      }
    });
  };

  return (
    <div className="ml-4 mt-6  p-8 border-2">
      <div>
        <h2 className="text-4xl mt-1 font-serif">Users List</h2>
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
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {totalusers.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              className="cursor-pointer"
                              // onClick={gotoProfile}
                              src={user?.photoURL}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.displayName}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <td>
                      {user.role === "admin" ? (
                        <button className="btn btn-success text-white btn-xs ml-6">
                          Admin
                        </button>
                      ) : (
                        <th>
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="btn btn-primary btn-xs text-white"
                          >
                            Make Admin
                          </button>
                        </th>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
