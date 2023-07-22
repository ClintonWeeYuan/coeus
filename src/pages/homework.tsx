import { Inter } from "next/font/google";
import { ReactElement } from "react";
import Layout from "@/src/components/Layout";
import { NextPageWithLayout } from "@/src/pages/_app";

const inter = Inter({ subsets: ["latin"] });

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
