import { Login } from "@/features/auth/login";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />;
    </>
  );
}
