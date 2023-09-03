import { ReactElement } from 'react';
import Layout from '@/components/Layout/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import { trpc } from "@/utils/trpc";
import useUser from "@/components/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";

const KnowledgeBase: NextPageWithLayout = () => {
  const { user } = useUser()
  const router = useRouter();
  const { data } = trpc.page.getAllPages.useQuery(user && user.id ? user.id : 0);
  const {mutateAsync} = trpc.page.createPage.useMutation({
    onSuccess : async (data) => {
      await router.push(`/knowledgebase/${data?.id.toString()}`)
    },
    onError : async (error) => {
      toast.error(error.message);
    }
  });
  console.log(data)

  const createNewPage = async () => {
    await mutateAsync({ownerId: user?.id || 0, title: "", content: ""})
  }

  return (
    <>
      <div className="relative">
        {
          data?.map((page) => (
            <Link key={page.id.toString()} href={`/knowledgebase/${page.id.toString()}`}>
              <div
                className="px-4 py-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4">
                {page.title.length > 0 ? page.title : "Untitled"}
              </div>

            </Link>
          ))
        }
        <button className="btn btn-primary" type="button" onClick={createNewPage}>Create Page</button>
      </div>
    </>
  );
};

KnowledgeBase.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KnowledgeBase;
