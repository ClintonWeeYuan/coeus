import { NextPageWithLayout } from "@/pages/_app";
import { trpc } from "@/utils/trpc";
import EditorComponent from "@/components/KnowledgeBase/EditorComponent";
import { ReactElement } from "react";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/common/LoadingScreen";
import { JSONContent } from "@tiptap/react";

const KnowledgePage: NextPageWithLayout = () => {
  const router = useRouter()
  console.log(router.query.pageId)
  const pageId = Array.isArray(router.query.pageId) ? 0 : router.query.pageId ? parseInt(router.query.pageId) : 0
  const { data, isLoading } = trpc.page.getPage.useQuery(pageId, {staleTime: 10});
  console.log(data)
  return (
    <>
      <div className="relative h-full">
        {
          isLoading ? <LoadingScreen/>  : (data && !isLoading) ? <EditorComponent pageId={pageId} title={data.title} savedContent={data.content as JSONContent}/> : <></>
        }
      </div>
    </>
  );
};

KnowledgePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KnowledgePage;
