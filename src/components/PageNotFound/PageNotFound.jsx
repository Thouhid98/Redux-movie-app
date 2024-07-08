import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PageNotFound = () => {
  return (
    <div>
      <Header></Header>
      <section className="flex items-center h-full p-16 bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-white text-9xl  ">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl mb-5">
              Sorry, we couldn't find this page.
            </p>

            <a
              rel="noopener noreferrer"
              href="/"
              className="px-8 py-3 font-semibold rounded dark:bg-primary"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default PageNotFound;
