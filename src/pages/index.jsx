import Head from "next/head";
import React from "react";
import GanttChart from "../components/GanttChart/GanttChart";
import DataProvider from "../components/DataProvider/DataProvider";

/* Домашнаяя страница */
const Home = () => (
  <>
    <Head>
      <title>Gantt_Chart</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main>
      <DataProvider>
        <GanttChart />
      </DataProvider>
    </main>
  </>
);

export default Home;
