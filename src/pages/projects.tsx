import { Projects } from "@/features/projects";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <Projects />
    </>
  );
}
