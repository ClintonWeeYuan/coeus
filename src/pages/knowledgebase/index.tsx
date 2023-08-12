import { ReactElement } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import { trpc } from "@/utils/trpc";
import useUser from "@/components/hooks/useUser";
import Link from "next/link";

const KnowledgeBase: NextPageWithLayout = () => {
  const {user} = useUser()
  const {data} = trpc.page.getAllPages.useQuery({owner: user?.id || ""});
  console.log(data)
  return (
    <>
      <div className="relative">
        {
          data?.map((page) => (
            <Link  key={page._id.toString()} href={`/knowledgebase/${page._id.toString()}`}>
            <div  className="px-4 py-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4">
              {page.title}
            </div>
            </Link>
          ))
        }
      </div>
    </>
  );
};

KnowledgeBase.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KnowledgeBase;
