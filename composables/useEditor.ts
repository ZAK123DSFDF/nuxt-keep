// File: composables/useEditor.js
import { ref, provide, inject } from "vue"
import EditorJS from "@editorjs/editorjs"
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import List from "@editorjs/list"

export const useEditor = () => {
  const editorInstanceRef = ref<any>(null)

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Let's take a note!",
      tools: {
        paragraph: {
          class: Paragraph,
          tunes: ["textAlignment"],
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["textAlignment"],
          config: {
            placeholder: "Enter a Header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
    })

    editorInstanceRef.value = editor
  }

  provide("editor", { initEditor, editorInstanceRef })

  return {
    initEditor,
    editorInstanceRef,
  }
}
export const useEditorContext = () => {
  return inject("editor")
}
