import { ReactElement } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "@/pages/_app";

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
