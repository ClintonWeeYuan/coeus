import { ReactElement } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "@/pages/_app";

const Homework: NextPageWithLayout = () => {
  return (
    <div className="">
      <p>Homework</p>
    </div>
  );
};

Homework.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Homework;
