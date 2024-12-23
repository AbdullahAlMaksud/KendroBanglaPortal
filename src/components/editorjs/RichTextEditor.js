"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamically import EditorJS and tools to avoid SSR issues
const EditorJS = dynamic(() => import("@editorjs/editorjs"), { ssr: false });
const Header = dynamic(() => import("@editorjs/header"), { ssr: false });
const Checklist = dynamic(() => import("@editorjs/checklist"), { ssr: false });
const Code = dynamic(() => import("@editorjs/code"), { ssr: false });
const ImageTool = dynamic(() => import("@editorjs/image"), { ssr: false });
const Quote = dynamic(() => import("@editorjs/quote"), { ssr: false });
const RawTool = dynamic(() => import("@editorjs/raw"), { ssr: false });
const Table = dynamic(() => import("@editorjs/table"), { ssr: false });

const RichTextEditor = ({ editorRef }) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_IMGBB_API_KEY) {
      console.error("IMGBB API key is missing.");
      return;
    }

    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      placeholder: "এখান থেকে ব্লগ লেখা শুরু করুন...",
      onReady: () => {
        if (editorRef) editorRef.current = editor;
      },
      tools: {
        header: { class: Header, inlineToolbar: true },
        code: Code,
        quote: { class: Quote, inlineToolbar: true },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                try {
                  const formData = new FormData();
                  formData.append("image", file);

                  const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                      method: "POST",
                      body: formData,
                    }
                  );

                  const result = await response.json();

                  if (result.success) {
                    return { success: 1, file: { url: result.data.url } };
                  } else {
                    console.error("Image upload failed:", result);
                    return { success: 0, message: "Image upload failed" };
                  }
                } catch (error) {
                  console.error("Error uploading image:", error);
                  return { success: 0, message: "Error uploading image" };
                }
              },
            },
          },
        },
        table: { class: Table, inlineToolbar: true },
        raw: RawTool,
        checklist: { class: Checklist, inlineToolbar: true },
      },
    });

    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
      }
      if (editorRef) editorRef.current = null;
    };
  }, [editorRef]);

  return (
    <div>
      <div
        id="editorjs"
        className="p-4 bg-primary min-h-[calc(100vh-655px)]"
      ></div>
    </div>
  );
};

export default RichTextEditor;
