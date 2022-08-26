import { GetServerSidePropsContext } from "next";
import nookies from "nookies";

export const getServerSideProps = async ({
  params,
  query,
  ...context
}: GetServerSidePropsContext) => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/${params?.provider}/callback?access_token=${query.access_token}`
  );
  const res = await req.json();

  if (res.jwt) {
    nookies.set(context, "token", res.jwt, {
      path: "/",
    });
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  console.log(res);

  return {
    props: {},
  };
};

const Connect = () => {
  return <div>[provider]</div>;
};

export default Connect;
