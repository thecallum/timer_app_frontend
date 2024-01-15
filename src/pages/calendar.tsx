import { Calendar } from "@/features/calendar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Calendar</title>
      </Head>
      <Calendar />
    </>
  );
}
