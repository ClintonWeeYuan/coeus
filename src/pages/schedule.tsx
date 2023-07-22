import { Inter } from "next/font/google";
import { ReactElement } from "react";
import Layout from "@/src/components/Layout";
import { NextPageWithLayout } from "@/src/pages/_app";

const inter = Inter({ subsets: ["latin"] });

const Schedule: NextPageWithLayout = () => {
  return (
    <div className="">
      <p>Schedule</p>
    </div>
  );
};

Schedule.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Schedule;
