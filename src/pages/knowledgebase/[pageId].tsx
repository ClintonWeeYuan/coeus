import { NextPageWithLayout } from "@/pages/_app";
import useUser from "@/components/hooks/useUser";
import { trpc } from "@/utils/trpc";
import EditorComponent from "@/components/KnowledgeBase/EditorComponent";
import { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

const KnowledgePage: NextPageWithLayout = () => {
  const { user } = useUser()
  const router = useRouter()
  console.log(router.query.pageId)
  const pageId = Array.isArray(router.query.pageId) ? "" : router.query.pageId || ""
  const { data } = trpc.page.getPage.useQuery({
    owner: user?.id || "",
    pageId: pageId,
  }, {staleTime: 10});
  console.log(data)
  return (
    <>
      <div className="relative">
        {
          data && <EditorComponent pageId={pageId} title={data[0].title} savedContent={data[0].content}/>
        }
      </div>
    </>
  );
};

KnowledgePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KnowledgePage;
