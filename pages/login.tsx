import { GetServerSideProps, NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useState } from "react";
import nookies from "nookies";
import Router from "next/router";

export const getServerSideProps = async (context: NextPageContext) => {
  const cookies = nookies.get(context);
  if (cookies.token) {
    //context.res.writeHead(302, {Location: '/dashboard'})
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {},
  };
};

const login: NextPage = () => {
  const [field, setField] = useState<Object>({});
  const [progress, setProgress] = useState<boolean>(false);

  function setValue(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value,
    });

    console.log(field);
  }

  async function doLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProgress(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(field),
    });

    const res = await req.json();
    if (res.jwt) {
      nookies.set(null, "token", res.jwt);
      Router.replace("/dashboard");
    }
    setProgress(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={doLogin} className="px-5 py-7">
            {progress && <div className="absolute inset-0 z-10 bg-white/50" />}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="identifier"
              onChange={setValue}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="password"
              onChange={setValue}
            />
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
          <div className="p-5">
            <a
              href={`${process.env.NEXT_PUBLIC_URL}/api/connect/github`}
              className="transition duration-200 mx-5 py-2 px-6 cursor-pointer font-normal text-sm rounded-lg text-gray-500 border-gray-700 border border-opacity-60"
            >
              Log in with Github
            </a>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1 items-center">
              <div className="text-center">
                <Link href="/register">
                  <button className="mx-5 py-2 px-6 cursor-pointer font-normal text-sm rounded-lg text-gray-500 border-gray-700 border border-opacity-60">
                    <span className="inline-block">Register</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
