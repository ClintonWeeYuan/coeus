import { Inter } from "next/font/google";
import { ReactElement } from "react";
import Layout from "@/src/components/Layout";
import { NextPageWithLayout } from "@/src/pages/_app";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
  return (
    <div className="">
      <p>Hello There</p>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
