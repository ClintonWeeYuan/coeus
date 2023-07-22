import { ReactElement, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { trpc } from "@/utils/trpc";

const Dashboard: NextPageWithLayout = () => {
  const { mutate } = trpc.user.createUser.useMutation();

  const handleClick = async () => {
    const res = await mutate({ firstName, lastName, email });
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="">
      <input
        className="input input-primary"
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.currentTarget.value);
        }}
      />
      <input
        className="input input-primary"
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.currentTarget.value);
        }}
      />
      <input
        className="input input-primary"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        Click
      </button>
      <p>Dashboard</p>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
