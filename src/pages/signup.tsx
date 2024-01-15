import { Signup } from "@/features/auth/signup";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Signup />;
    </>
  );
}
