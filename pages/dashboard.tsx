import { NextPageContext } from "next";
import Router from "next/router";
import nookies from "nookies";

export const getServerSideProps = async (context: NextPageContext) => {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {},
  };
};

const dashboard = () => {
  function logout() {
    nookies.destroy(null, "token");
    Router.replace("/login");
  }
  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center text-4xl
    "
    >
      <h1>Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 rounded py-3 px-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default dashboard;
