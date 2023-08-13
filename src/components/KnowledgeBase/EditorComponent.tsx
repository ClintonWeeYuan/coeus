import { FC, useState } from 'react';
import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import { TiptapExtensions } from '@/components/KnowledgeBase/extensions';
import { TiptapEditorProps } from '@/components/KnowledgeBase/props';
// import DEFAULT_EDITOR_CONTENT from '@/components/KnowledgeBase/default-content';
// import useLocalStorage from '@/components/hooks/useLocalStorage';
// import { Transaction } from "prosemirror-state";
// import { Editor } from "@tiptap/core"
import { Card } from "@tremor/react";
import { trpc } from "@/utils/trpc";
import useUser from "@/components/hooks/useUser";
import { toast } from "sonner";

interface Props {
  savedContent: JSONContent,
  title: string,
  pageId: string,
}

const EditorComponent: FC<Props> = ({ savedContent, title, pageId }) => {
  // const [content, setContent] = useLocalStorage(
  //   'content',
  //   DEFAULT_EDITOR_CONTENT,
  // );
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  // const [saveStatus, setSaveStatus] = useState('Saved');
  //
  // const [hydrated, setHydrated] = useState(false);
  const [jsonContent, setJSONContent] = useState<JSONContent>();

  const { mutate } = trpc.page.updatePage.useMutation();
  const { user } = useUser();

  const publishPage = () => {
    mutate({ owner: user?.id || "", pageId: pageId, content: jsonContent, title: currentTitle });
    toast.success("Successfully published!")
  }

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: savedContent,
    // onUpdate: (e : { editor : Editor, transaction: Transaction }) => {
    onUpdate: ({ editor }) => {
      // setSaveStatus('Unsaved');
      setJSONContent(editor?.getJSON());

      // const selection = e.editor.state.selection;
      // const lastTwo = getPrevText(e.editor, {
      //     chars: 2,
      // });
      // if (lastTwo === '++' && !isLoading) {
      //     e.editor.commands.deleteRange({
      //         from: selection.from - 2,
      //         to: selection.from,
      //     });
      //     complete(
      //         getPrevText(e.editor, {
      //             chars: 5000,
      //         }),
      //     );
      //     // complete(e.editor.storage.markdown.getMarkdown());
      //     va.track('Autocomplete Shortcut Used');
      // } else {
      //     debouncedUpdates(e);
      // }
    },
    autofocus: 'end',
  }, [savedContent]);

  return (
    <>
      <div className="flex justify-between mb-4">
        <input className="input input-ghost input-2xl text-2xl w-full md:w-3/4" placeholder="Title here"
               value={currentTitle} onChange={(e) => setCurrentTitle(e.currentTarget.value)}/>
        <button type="button" onClick={() => publishPage()}
                className="fixed bottom-4 left-4 md:relative md:bottom-0 z-20 md:left-0 btn btn-primary">Publish
        </button>
      </div>
      <Card className="w-full min-h-32">
        <EditorContent editor={editor}/>
      </Card>
    </>
  );
};
export default EditorComponent;
