import React from "react";

const Addmovies = () => {
  return (
    <div className="ml-4 mt-6 w-[800px]  p-12 border-2">
      <div>
        <h2 className="text-4xl mb-5 font-serif">Upload Movies</h2>
        <div>
          <div className=" mb-20  rounded-xl">
            <form className="">
              <div>
                <input
                  type="text"
                  placeholder="Movie Name"
                  className="input input-bordered w-[700px] mb-4"
                  required
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered w-[700px] mb-4 "
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Rating"
                  className="input input-bordered w-[700px] mb-4"
                />
              </div>

              <div className="form-control ">
                <input
                  type="text"
                  placeholder="Jonra"
                  className="input input-bordered w-[700px] mb-4"
                />
              </div>
              <div className="form-control ">
                <input
                  type="text"
                  placeholder="Plot Point"
                  className="input input-bordered w-[700px] mb-4"
                />
              </div>

              <div className="form-control w-[700px]">
                <textarea
                  className="textarea textarea-bordered h-24 mb-4"
                  placeholder="Story Line"
                  required
                ></textarea>
              </div>

              <div className="form-control w-[850px]">
                <input
                  type="datetime-local"
                  placeholder="Relase Date"
                  className="input input-bordered w-[415px] mb-4"
                />
              </div>

              <div className=" mb-4">
                <input type="file" className="file-input w-full max-w-xs" />
              </div>

              <button className="btn bg-sky-600 btn-outline text-white">
                Add Movie
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addmovies;
